import {
  getBearerToken,
  verifySignedToken,
} from '../_lib/auth.js';
import { ensureSchema, sql } from '../_lib/db.js';
import { addMemoryEvent, getMemoryUserById, touchMemoryUser } from '../_lib/chatMemory.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const tokenSecret = process.env.CHAT_TOKEN_SECRET;
  if (!tokenSecret) {
    return res.status(500).json({ error: 'CHAT_TOKEN_SECRET is not configured' });
  }

  try {
    const token = getBearerToken(req);
    const payload = verifySignedToken(token, tokenSecret);
    if (!payload?.sub) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = Number(payload.sub);

    try {
      await ensureSchema();

      const userQuery = await sql`
        SELECT id, username
        FROM chat_users
        WHERE id = ${userId}
        LIMIT 1
      `;

      const user = userQuery.rows[0];
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      await sql`
        UPDATE chat_users
        SET last_seen_at = NOW()
        WHERE id = ${user.id}
      `;

      await sql`
        INSERT INTO chat_events (event_type, user_id, payload)
        VALUES ('ring', ${user.id}, ${JSON.stringify({ username: user.username })}::jsonb)
      `;
    } catch (dbError) {
      console.error('chat/nudge db fallback', dbError);
      const user = touchMemoryUser(userId) || getMemoryUserById(userId);
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      addMemoryEvent({
        eventType: 'ring',
        userId: user.id,
        payload: { username: user.username },
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('chat/nudge error', error);
    return res.status(500).json({ error: 'Failed to create nudge event' });
  }
}
