import { NextRequest } from "next/server";
import { hasMongoConfig } from "../../../lib/mongodb";
import { listConversationsPublic } from "../../../lib/conversations";

export async function GET(req: NextRequest) {
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

  const conversations = await listConversationsPublic(50);
  return Response.json({ conversations });
}
