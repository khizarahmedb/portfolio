import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";
import { NextRequest } from "next/server";
import { createRateLimiter } from "../../../lib/rate-limit";
import {
  addConversationMessage,
  ensureConversation,
} from "../../../lib/conversations";
import { hasMongoConfig } from "../../../lib/mongodb";

const rateLimiter = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 15 });
const MAX_MESSAGE_CHARS = 1000;

const systemPrompt = `You are an AI assistant for Khizar Ahmed, a full-stack software developer.
Answer questions about Khizar's skills, projects, and experience using a concise, friendly tone.
Highlight measurable impact when possible and suggest visiting relevant portfolio pages.
If information is not available on the portfolio website, reply: "I don't have information regarding that."`;

const parseNumber = (value: string | null) => {
  if (!value) return undefined;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const getGeo = (req: NextRequest) => ({
  country: req.headers.get("x-vercel-ip-country") ?? undefined,
  region: req.headers.get("x-vercel-ip-country-region") ?? undefined,
  city: req.headers.get("x-vercel-ip-city") ?? undefined,
  latitude: parseNumber(req.headers.get("x-vercel-ip-latitude")),
  longitude: parseNumber(req.headers.get("x-vercel-ip-longitude")),
  timezone: req.headers.get("x-vercel-ip-timezone") ?? undefined,
});

const reverseGeocode = async (latitude?: number, longitude?: number) => {
  if (latitude === undefined || longitude === undefined) {
    return undefined;
  }

  try {
    const url =
      process.env.GEO_REVERSE_URL ??
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "portfolio-chat/1.0",
        "Accept-Language": "en",
      },
      signal: AbortSignal.timeout(2000),
    });

    if (!response.ok) {
      return undefined;
    }

    const data = (await response.json()) as {
      display_name?: string;
      address?: Record<string, string>;
    };

    const address = data.address ?? {};

    return {
      formattedAddress: data.display_name,
      neighbourhood:
        address.neighbourhood ?? address.suburb ?? address.quarter ?? undefined,
      postcode: address.postcode,
      road: address.road,
      city: address.city ?? address.town ?? address.village,
      county: address.county,
      region: address.state,
      country: address.country,
      countryCode: address.country_code?.toUpperCase(),
    };
  } catch {
    return undefined;
  }
};

const extractMessageText = (message: { parts?: Array<{ type: string; text?: string }> }) =>
  message.parts
    ?.filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("")
    .trim() ?? "";

const getLatestUserMessage = (messages: Array<{ role: string; parts?: Array<{ type: string; text?: string }> }>) => {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role === "user") {
      const text = extractMessageText(message);
      return text ? text : undefined;
    }
  }

  return undefined;
};

const formatAssistantError = (errorMessage: string) => {
  const lowered = errorMessage.toLowerCase();

  if (lowered.includes("quota") || lowered.includes("rate")) {
    return "AI service quota exceeded. Please try again shortly.";
  }

  if (lowered.includes("timeout")) {
    return "AI response timed out. Please try again.";
  }

  return "AI service error. Please try again.";
};

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

  let body: { id?: string; messages?: unknown[] } | null = null;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const conversationId =
    typeof body?.id === "string" ? body.id : `chat-${Date.now()}`;
  const messages = Array.isArray(body?.messages) ? body.messages : [];

  if (messages.length === 0) {
    return Response.json(
      { error: "No messages provided to chat API." },
      { status: 400 }
    );
  }

    const uiMessages = (messages as Array<{ id?: string; role?: string; parts?: unknown }>)
      .filter((message) => Array.isArray(message?.parts))
      .map(({ id, ...rest }) => rest) as Array<{
      role: string;
      parts?: Array<{ type: string; text?: string }>;
    }>;


  if (uiMessages.length === 0) {
    return Response.json(
      { error: "Invalid messages payload; missing message parts." },
      { status: 400 }
    );
  }

  const latestUserText = getLatestUserMessage(uiMessages);

  if (hasMongoConfig) {
    const userAgent = req.headers.get("user-agent") ?? undefined;
    const baseGeo = getGeo(req);
    const enrichedGeo = await reverseGeocode(
      baseGeo.latitude,
      baseGeo.longitude
    );
    const geo = enrichedGeo ? { ...baseGeo, ...enrichedGeo } : baseGeo;

    await ensureConversation(conversationId, {
      conversationId,
      ip,
      userAgent,
      geo,
    });

    if (latestUserText) {
      await addConversationMessage(conversationId, {
        role: "user",
        text: latestUserText,
        createdAt: new Date(),
      });
    }
  }

  if (latestUserText && latestUserText.length > MAX_MESSAGE_CHARS) {
    if (hasMongoConfig) {
      await addConversationMessage(conversationId, {
        role: "assistant",
        text: "Message too long. Please shorten your question.",
        createdAt: new Date(),
      });
    }

    return Response.json(
      { error: "Message exceeds length limit." },
      { status: 413 }
    );
  }

  const limit = await rateLimiter.check(ip);
  if (!limit.ok) {
    if (hasMongoConfig) {
      await addConversationMessage(conversationId, {
        role: "assistant",
        text: formatAssistantError("rate limit"),
        createdAt: new Date(),
      });
    }

    return Response.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 }
    );
  }

  const apiKey =
    process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "Missing GEMINI_API_KEY environment variable." },
      { status: 500 }
    );
  }

  try {
    const google = createGoogleGenerativeAI({ apiKey });
    const model = google("gemini-2.5-flash");
    const coreMessages = await convertToModelMessages(
      uiMessages as Array<Omit<import("ai").UIMessage, "id">>
    );

    const result = await streamText({
      model,
      system: systemPrompt,
      messages: coreMessages,
      timeout: { totalMs: 15000 },
      onFinish: async (event) => {
        if (!hasMongoConfig) return;

        const text = event.text?.trim();
        if (!text) return;

        await addConversationMessage(conversationId, {
          role: "assistant",
          text,
          createdAt: new Date(),
        });
      },
      onError: async (error) => {
        if (!hasMongoConfig) return;
        const message = error instanceof Error ? error.message : "Unknown error";
        const text = formatAssistantError(message);

        await addConversationMessage(conversationId, {
          role: "assistant",
          text,
          createdAt: new Date(),
        });
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    if (hasMongoConfig) {
      await addConversationMessage(conversationId, {
        role: "assistant",
        text: formatAssistantError(message),
        createdAt: new Date(),
      });
    }

    return Response.json(
      {
        error: "Chat request failed",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
