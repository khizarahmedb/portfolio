import {
  getBearerToken,
  parseRequestBody,
  verifySignedToken,
} from '../_lib/auth.js';
import { sanitizeChatMessage } from '../_lib/censorship.js';
import { ensureSchema, sql } from '../_lib/db.js';
import {
  addMemoryEvent,
  addMemoryMessage,
  countMemoryOnlineUsers,
  getMemoryUserById,
  listMemoryEventsSince,
  listMemoryMessages,
  touchMemoryUser,
  upsertMemoryUser,
} from '../_lib/chatMemory.js';

function toMessageRow(row) {
  return {
    id: row.id,
    name: row.username,
    chat: row.body,
    date: row.created_at,
    bot: Boolean(row.is_bot),
    dev: false,
  };
}

function toEventRow(row) {
  return {
    id: row.id,
    eventType: row.event_type || row.eventType,
    payload: row.payload,
    createdAt: row.created_at || row.createdAt,
  };
}

async function getUserFromToken(req) {
  const secret = process.env.CHAT_TOKEN_SECRET;
  if (!secret) {
    return { error: 'CHAT_TOKEN_SECRET is not configured', code: 500 };
  }

  const token = getBearerToken(req);
  const payload = verifySignedToken(token, secret);

  if (!payload?.sub) {
    return { error: 'Unauthorized', code: 401 };
  }

  return { payload };
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const auth = await getUserFromToken(req);
    if (auth.error) return res.status(auth.code).json({ error: auth.error });

    const userId = Number(auth.payload.sub);
    const sinceEventIdRaw = Number(req.query?.sinceEventId || 0);
    const sinceEventId = Number.isFinite(sinceEventIdRaw) ? sinceEventIdRaw : 0;

    try {
      await ensureSchema();

      await sql`
        UPDATE chat_users
        SET last_seen_at = NOW()
        WHERE id = ${userId}
      `;

      if (req.method === 'POST') {
        const body = parseRequestBody(req);
        const chatRaw = String(body.chat || '').trim();

        if (chatRaw.length < 1 || chatRaw.length > 100) {
          return res.status(400).json({ error: 'Message must be between 1 and 100 characters' });
        }

        const chat = sanitizeChatMessage(chatRaw).trim();
        if (chat.length < 1 || chat.length > 100) {
          return res.status(400).json({ error: 'Message must be between 1 and 100 characters' });
        }

        const userQuery = await sql`
          SELECT id, username
          FROM chat_users
          WHERE id = ${userId}
          LIMIT 1
        `;

        const user = userQuery.rows[0];
        if (!user) {
          return res.status(401).json({ error: 'Unauthorized user' });
        }

        const insertMessage = await sql`
          INSERT INTO chat_messages (user_id, username, body, is_bot)
          VALUES (${user.id}, ${user.username}, ${chat}, false)
          RETURNING id, username, body, created_at, is_bot
        `;

        const message = insertMessage.rows[0];

        await sql`
          INSERT INTO chat_events (event_type, user_id, payload)
          VALUES ('message', ${user.id}, ${JSON.stringify({ messageId: message.id })}::jsonb)
        `;

        return res.status(201).json({ message: toMessageRow(message) });
      }

      const messagesQuery = await sql`
        SELECT id, username, body, created_at, is_bot
        FROM chat_messages
        ORDER BY created_at DESC
        LIMIT 300
      `;

      const onlineUsersQuery = await sql`
        SELECT COUNT(*)::INT AS count
        FROM chat_users
        WHERE last_seen_at > NOW() - INTERVAL '5 minutes'
      `;

      const eventsQuery = await sql`
        SELECT id, event_type, payload, created_at
        FROM chat_events
        WHERE id > ${sinceEventId}
        ORDER BY id ASC
        LIMIT 100
      `;

      const messages = [...messagesQuery.rows].reverse().map(toMessageRow);
      const events = eventsQuery.rows.map(toEventRow);

      return res.status(200).json({
        messages,
        events,
        latestEventId: events.length > 0 ? events[events.length - 1].id : sinceEventId,
        onlineUsers: onlineUsersQuery.rows[0]?.count || 0,
      });
    } catch (dbError) {
      console.error('chat/messages db fallback', dbError);

      const tokenUsername = String(auth.payload.username || '').trim();
      const tokenUsernameNorm = tokenUsername.toLowerCase();
      let user =
        touchMemoryUser(userId) ||
        getMemoryUserById(userId) ||
        (tokenUsernameNorm ? upsertMemoryUser(tokenUsernameNorm, tokenUsername || 'Anonymous') : null);

      if (!user) {
        user = upsertMemoryUser(`user-${userId}`, tokenUsername || 'Anonymous');
      }

      if (req.method === 'POST') {
        const body = parseRequestBody(req);
        const chatRaw = String(body.chat || '').trim();

        if (chatRaw.length < 1 || chatRaw.length > 100) {
          return res.status(400).json({ error: 'Message must be between 1 and 100 characters' });
        }

        const chat = sanitizeChatMessage(chatRaw).trim();
        if (chat.length < 1 || chat.length > 100) {
          return res.status(400).json({ error: 'Message must be between 1 and 100 characters' });
        }

        const message = addMemoryMessage({
          userId: user.id,
          username: user.username,
          body: chat,
          isBot: false,
        });

        addMemoryEvent({
          eventType: 'message',
          userId: user.id,
          payload: { messageId: message.id },
        });

        return res.status(201).json({ message: toMessageRow(message) });
      }

      const messages = listMemoryMessages(300).map(toMessageRow);
      const events = listMemoryEventsSince(sinceEventId, 100).map(toEventRow);

      return res.status(200).json({
        messages,
        events,
        latestEventId: events.length > 0 ? events[events.length - 1].id : sinceEventId,
        onlineUsers: countMemoryOnlineUsers(),
      });
    }
  } catch (error) {
    console.error('chat/messages error', error);
    return res.status(500).json({ error: 'Failed to process chat messages' });
  }
}
