import {
  getBearerToken,
  verifySignedToken,
} from '../_lib/auth.js';
import { ensureSchema, sql } from '../_lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminSecret = process.env.ADMIN_TOKEN_SECRET;
  if (!adminSecret) {
    return res.status(500).json({ error: 'ADMIN_TOKEN_SECRET is not configured' });
  }

  try {
    const token = getBearerToken(req);
    const payload = verifySignedToken(token, adminSecret);
    if (!payload || payload.role !== 'admin') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await ensureSchema();

    const usersQuery = await sql`
      SELECT
        u.id,
        u.username,
        u.role,
        u.created_at,
        u.last_seen_at,
        COUNT(m.id)::INT AS message_count
      FROM chat_users u
      LEFT JOIN chat_messages m ON m.user_id = u.id
      GROUP BY u.id
      ORDER BY u.last_seen_at DESC NULLS LAST, u.created_at DESC
      LIMIT 300
    `;

    const messagesQuery = await sql`
      SELECT
        m.id,
        m.user_id,
        m.username,
        m.body,
        m.created_at
      FROM chat_messages m
      ORDER BY m.created_at DESC
      LIMIT 500
    `;

    const statsQuery = await sql`
      SELECT
        (SELECT COUNT(*)::INT FROM chat_users) AS total_users,
        (SELECT COUNT(*)::INT FROM chat_messages) AS total_messages
    `;

    return res.status(200).json({
      stats: {
        totalUsers: statsQuery.rows[0]?.total_users || 0,
        totalMessages: statsQuery.rows[0]?.total_messages || 0,
      },
      users: usersQuery.rows.map((row) => ({
        id: row.id,
        username: row.username,
        role: row.role,
        createdAt: row.created_at,
        lastSeenAt: row.last_seen_at,
        messageCount: row.message_count,
      })),
      messages: messagesQuery.rows.map((row) => ({
        id: row.id,
        userId: row.user_id,
        username: row.username,
        body: row.body,
        createdAt: row.created_at,
      })),
    });
  } catch (error) {
    console.error('admin/overview error', error);
    return res.status(500).json({ error: 'Failed to fetch admin overview' });
  }
}
