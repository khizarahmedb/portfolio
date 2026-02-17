import { Signer } from '@aws-sdk/rds-signer';
import { attachDatabasePool } from '@vercel/functions';
import { awsCredentialsProvider } from '@vercel/functions/oidc';
import { Pool } from 'pg';

function templateToQuery(strings, values) {
  let text = '';
  const params = [];

  for (let index = 0; index < strings.length; index += 1) {
    text += strings[index];
    if (index < values.length) {
      params.push(values[index]);
      text += `$${params.length}`;
    }
  }

  return { text, values: params };
}

let pool;
let schemaInitPromise;

function createPool() {
  if (process.env.POSTGRES_URL) {
    return new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : undefined,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      keepAlive: true,
    });
  }

  if (
    process.env.PGHOST &&
    process.env.PGPORT &&
    process.env.PGDATABASE &&
    process.env.PGUSER
  ) {
    const signer = new Signer({
      hostname: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      username: process.env.PGUSER,
      region: process.env.AWS_REGION,
      credentials: awsCredentialsProvider({
        roleArn: process.env.AWS_ROLE_ARN,
      }),
    });

    return new Pool({
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: () => signer.getAuthToken(),
      ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : undefined,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      keepAlive: true,
    });
  }

  throw new Error('No supported Postgres configuration found in environment');
}

function getPool() {
  if (!pool) {
    pool = createPool();
    attachDatabasePool(pool);
  }

  return pool;
}

export async function sql(strings, ...values) {
  const { text, values: params } = templateToQuery(strings, values);
  return getPool().query(text, params);
}

export async function ensureSchema() {
  if (process.env.CHAT_SCHEMA_READY === '1') {
    return;
  }

  if (!schemaInitPromise) {
    schemaInitPromise = (async () => {
      const schemaState = await sql`
        SELECT
          to_regclass('public.chat_users') IS NOT NULL AS has_chat_users,
          to_regclass('public.chat_messages') IS NOT NULL AS has_chat_messages,
          to_regclass('public.chat_events') IS NOT NULL AS has_chat_events
      `;

      const state = schemaState.rows[0] || {};
      if (state.has_chat_users && state.has_chat_messages && state.has_chat_events) {
        return;
      }

      await getPool().query(`
        CREATE TABLE IF NOT EXISTS chat_users (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL,
          username_norm TEXT,
          password_hash TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'user',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        ALTER TABLE chat_users
        ADD COLUMN IF NOT EXISTS username_norm TEXT;
        CREATE UNIQUE INDEX IF NOT EXISTS chat_users_username_norm_uidx
        ON chat_users (username_norm);
        CREATE INDEX IF NOT EXISTS chat_users_username_lower_idx
        ON chat_users ((LOWER(username)));
        CREATE TABLE IF NOT EXISTS chat_messages (
          id BIGSERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES chat_users(id) ON DELETE CASCADE,
          username TEXT NOT NULL,
          body TEXT NOT NULL,
          is_bot BOOLEAN NOT NULL DEFAULT FALSE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS chat_messages_created_at_idx
        ON chat_messages (created_at DESC);
        CREATE TABLE IF NOT EXISTS chat_events (
          id BIGSERIAL PRIMARY KEY,
          event_type TEXT NOT NULL,
          user_id INTEGER REFERENCES chat_users(id) ON DELETE SET NULL,
          payload JSONB,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS chat_events_created_at_idx
        ON chat_events (created_at DESC);
      `);
    })();
  }

  await schemaInitPromise;
}
