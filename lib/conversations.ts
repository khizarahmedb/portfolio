import { ObjectId } from "mongodb";
import { getDatabase } from "./mongodb";

export type ConversationMessage = {
  role: "user" | "assistant";
  text: string;
  createdAt: Date;
};

export type ConversationGeo = {
  country?: string;
  countryCode?: string;
  region?: string;
  county?: string;
  city?: string;
  neighbourhood?: string;
  postcode?: string;
  road?: string;
  formattedAddress?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
};

export type ConversationRecord = {
  _id?: ObjectId;
  conversationId: string;
  ip: string;
  userAgent?: string;
  geo?: ConversationGeo;
  messages: ConversationMessage[];
  createdAt: Date;
  updatedAt: Date;
};

export async function ensureConversation(
  conversationId: string,
  payload: Omit<ConversationRecord, "_id" | "messages" | "createdAt" | "updatedAt">
) {
  const db = await getDatabase();
  const collection = db.collection<ConversationRecord>("conversations");
  const now = new Date();

  await collection.updateOne(
    { conversationId },
    {
      $setOnInsert: {
        conversationId,
        ip: payload.ip,
        userAgent: payload.userAgent,
        geo: payload.geo,
        messages: [],
        createdAt: now,
      },
      $set: {
        updatedAt: now,
      },
    },
    { upsert: true }
  );
}

export async function addConversationMessage(
  conversationId: string,
  message: ConversationMessage
) {
  const db = await getDatabase();
  const collection = db.collection<ConversationRecord>("conversations");
  const now = new Date();

  await collection.updateOne(
    { conversationId },
    {
      $push: {
        messages: message,
      },
      $set: {
        updatedAt: now,
      },
    }
  );
}

export async function listConversations(limit = 20) {
  const db = await getDatabase();
  const collection = db.collection<ConversationRecord>("conversations");
  return collection
    .find({}, { projection: { messages: 0 } })
    .sort({ updatedAt: -1 })
    .limit(limit)
    .toArray();
}

export async function getConversation(conversationId: string) {
  const db = await getDatabase();
  const collection = db.collection<ConversationRecord>("conversations");
  return collection.findOne({ conversationId });
}

export async function listConversationsPublic(limit = 20) {
  const db = await getDatabase();
  const collection = db.collection<ConversationRecord>("conversations");
  return collection
    .find(
      {},
      { projection: { messages: 0, ip: 0, geo: 0, userAgent: 0 } }
    )
    .sort({ updatedAt: -1 })
    .limit(limit)
    .toArray();
}

export async function getConversationPublic(conversationId: string) {
  const db = await getDatabase();
  const collection = db.collection<ConversationRecord>("conversations");
  return collection.findOne(
    { conversationId },
    { projection: { ip: 0, geo: 0, userAgent: 0 } }
  );
}
