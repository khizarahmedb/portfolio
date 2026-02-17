import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';

const encoder = new TextEncoder();

function toBase64Url(value) {
  const raw = typeof value === 'string' ? value : JSON.stringify(value);
  return Buffer.from(raw).toString('base64url');
}

function fromBase64Url(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function signValue(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

export function createSignedToken(payload, secret, expiresInSeconds = 60 * 60 * 12) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };
  const encodedHeader = toBase64Url(header);
  const encodedBody = toBase64Url(body);
  const unsignedToken = `${encodedHeader}.${encodedBody}`;
  const signature = signValue(unsignedToken, secret);

  return `${unsignedToken}.${signature}`;
}

export function verifySignedToken(token, secret) {
  if (!token || typeof token !== 'string') return null;
  const segments = token.split('.');
  if (segments.length !== 3) return null;

  const [encodedHeader, encodedBody, receivedSignature] = segments;
  const unsignedToken = `${encodedHeader}.${encodedBody}`;
  const expectedSignature = signValue(unsignedToken, secret);

  const expectedBuffer = Buffer.from(expectedSignature);
  const receivedBuffer = Buffer.from(receivedSignature);

  if (
    expectedBuffer.length !== receivedBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
  ) {
    return null;
  }

  let payload;
  try {
    payload = JSON.parse(fromBase64Url(encodedBody));
  } catch {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (!payload?.exp || payload.exp < now) return null;

  return payload;
}

export function getBearerToken(req) {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeader || typeof authHeader !== 'string') return '';
  if (!authHeader.toLowerCase().startsWith('bearer ')) return '';
  return authHeader.slice(7).trim();
}

export function parseRequestBody(req) {
  if (!req?.body) return {};
  if (typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

export function normalizeUsername(input) {
  return String(input || '')
    .trim()
    .replace(/\s+/g, ' ');
}

export function normalizeUsernameKey(input) {
  return normalizeUsername(input).toLowerCase();
}

export function isValidUsername(input) {
  const username = normalizeUsername(input);
  return /^[a-zA-Z0-9_. -]{3,20}$/.test(username);
}

export function isValidPassword(input) {
  const password = String(input || '');
  return password.length <= 256;
}

export async function hashPassword(input) {
  const roundsRaw = Number.parseInt(process.env.CHAT_BCRYPT_ROUNDS || '8', 10);
  const rounds = Number.isFinite(roundsRaw) ? Math.min(Math.max(roundsRaw, 4), 12) : 8;
  return bcrypt.hash(String(input), rounds);
}

export async function verifyPassword(input, hash) {
  return bcrypt.compare(String(input), String(hash));
}

export async function sha256Hex(input) {
  const data = encoder.encode(String(input || ''));
  const digestBuffer = await crypto.webcrypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digestBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function constantTimeEqual(left, right) {
  const a = Buffer.from(String(left || ''));
  const b = Buffer.from(String(right || ''));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
