import { NextRequest } from "next/server";
import { hasMongoConfig } from "../../../../lib/mongodb";
import { getConversationPublic } from "../../../../lib/conversations";

type RouteContext = {
  params: Promise<{
    conversationId: string;
  }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  const apiKey = process.env.CONVERSATIONS_API_KEY;
  const provided = req.headers.get("x-api-key");

  if (!apiKey || provided !== apiKey) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasMongoConfig) {
    return Response.json(
      { error: "MongoDB is not configured." },
      { status: 503 }
    );
  }

  const { conversationId } = await context.params;
  const conversation = await getConversationPublic(conversationId);

  if (!conversation) {
    return Response.json({ error: "Conversation not found." }, { status: 404 });
  }

  return Response.json({ conversation });
}
