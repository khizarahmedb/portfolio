import { getDatabase, hasMongoConfig } from "./mongodb";

type RateLimitConfig = {
  windowMs: number;
  max: number;
};

type RateLimitState = {
  count: number;
  resetAt: number;
};

type RateLimitRecord = {
  key: string;
  count: number;
  resetAt: number;
};

const inMemoryStore = new Map<string, RateLimitState>();

const checkMemoryLimit = (key: string, config: RateLimitConfig) => {
  const now = Date.now();
  const existing = inMemoryStore.get(key);

  if (!existing || now > existing.resetAt) {
    inMemoryStore.set(key, { count: 1, resetAt: now + config.windowMs });
    return { ok: true, remaining: config.max - 1 };
  }

  if (existing.count >= config.max) {
    return { ok: false, remaining: 0 };
  }

  existing.count += 1;
  return { ok: true, remaining: config.max - existing.count };
};

const checkMongoLimit = async (key: string, config: RateLimitConfig) => {
  const db = await getDatabase();
  const collection = db.collection<RateLimitRecord>("rate_limits");
  const now = Date.now();

  const existing = await collection.findOne({ key });

  if (!existing || now > existing.resetAt) {
    await collection.updateOne(
      { key },
      {
        $set: {
          key,
          count: 1,
          resetAt: now + config.windowMs,
        },
      },
      { upsert: true }
    );
    return { ok: true, remaining: config.max - 1 };
  }

  if (existing.count >= config.max) {
    return { ok: false, remaining: 0 };
  }

  await collection.updateOne({ key }, { $inc: { count: 1 } });
  return { ok: true, remaining: config.max - (existing.count + 1) };
};

export function createRateLimiter(config: RateLimitConfig) {
  return {
    async check(key: string) {
      if (!hasMongoConfig) {
        return checkMemoryLimit(key, config);
      }

      try {
        return await checkMongoLimit(key, config);
      } catch {
        return checkMemoryLimit(key, config);
      }
    },
  };
}
