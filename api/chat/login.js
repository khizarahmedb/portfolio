import {
  createSignedToken,
  isValidUsername,
  normalizeUsername,
  normalizeUsernameKey,
  parseRequestBody,
  hashPassword,
} from '../_lib/auth.js';
import { ensureSchema, sql } from '../_lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const tokenSecret = process.env.CHAT_TOKEN_SECRET;
  if (!tokenSecret) {
    return res.status(500).json({ error: 'CHAT_TOKEN_SECRET is not configured' });
  }

  try {
    await ensureSchema();

    const body = parseRequestBody(req);
    const username = normalizeUsername(body.username);
    const usernameKey = normalizeUsernameKey(body.username);

    if (!isValidUsername(username)) {
      return res.status(400).json({ error: 'Username must be 3-20 characters (letters, numbers, spaces, _, ., -)' });
    }

    const existingUserQuery = await sql`
      SELECT id, username, password_hash, role
      FROM chat_users
      WHERE username_norm = ${usernameKey}
         OR (username_norm IS NULL AND LOWER(username) = ${usernameKey})
      LIMIT 1
    `;

    let user = existingUserQuery.rows[0];

    if (!user) {
      const hashedPassword = await hashPassword(`username-only:${usernameKey}`);
      const insertQuery = await sql`
        INSERT INTO chat_users (username, username_norm, password_hash, role, last_seen_at)
        VALUES (${username}, ${usernameKey}, ${hashedPassword}, 'user', NOW())
        RETURNING id, username, role
      `;
      user = insertQuery.rows[0];
    } else {
      if (!user.username_norm) {
        await sql`
          UPDATE chat_users
          SET username_norm = ${usernameKey}
          WHERE id = ${user.id}
        `;
      }

      await sql`
        UPDATE chat_users
        SET last_seen_at = NOW()
        WHERE id = ${user.id}
      `;
    }

    const token = createSignedToken(
      {
        sub: user.id,
        username: user.username,
        role: 'user',
      },
      tokenSecret,
      60 * 60 * 24 * 7
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role || 'user',
      },
    });
  } catch (error) {
    console.error('chat/login error', error);
    return res.status(500).json({ error: 'Failed to authenticate user' });
  }
}
