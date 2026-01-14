import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;

export const hasMongoConfig = Boolean(uri);

const client = uri ? new MongoClient(uri) : null;

const clientPromise =
  client && (global._mongoClientPromise ?? client.connect());

if (clientPromise && !global._mongoClientPromise) {
  global._mongoClientPromise = clientPromise;
}

export async function getMongoClient() {
  if (!clientPromise) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  return clientPromise;
}

export async function getDatabase() {
  const clientInstance = await getMongoClient();
  const dbName = process.env.MONGODB_DB || "portfolio";
  return clientInstance.db(dbName);
}
