import {
  constantTimeEqual,
  createSignedToken,
  parseRequestBody,
  sha256Hex,
  verifyPassword,
} from '../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminHash = process.env.ADMIN_PASSWORD_BCRYPT_HASH;
  const adminSha256 = String(
    process.env.ADMIN_PASSWORD_SHA256 || process.env.VITE_ADMIN_PASSWORD_SHA256 || ''
  )
    .trim()
    .toLowerCase();
  const adminSecret = process.env.ADMIN_TOKEN_SECRET;

  if ((!adminHash && !adminSha256) || !adminSecret) {
    return res.status(500).json({ error: 'Admin auth secrets are not configured' });
  }

  try {
    const body = parseRequestBody(req);
    const password = String(body.password || '');

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    let validPassword = false;

    if (adminHash) {
      try {
        validPassword = await verifyPassword(password, adminHash);
      } catch {
        validPassword = false;
      }
    }

    if (!validPassword && adminSha256) {
      const incomingPasswordHash = await sha256Hex(password);
      validPassword = constantTimeEqual(incomingPasswordHash, adminSha256);
    }

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid admin password' });
    }

    const token = createSignedToken(
      { role: 'admin', scope: 'chat:read' },
      adminSecret,
      60 * 60 * 8
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error('admin/login error', error);
    return res.status(500).json({ error: 'Failed to login admin' });
  }
}
