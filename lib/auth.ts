import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD_HASH =
  "$2a$12$X4rPmzYyGwWwXK4MjXJjXg7Wj7s";
const JWT_SECRET = process.env.JWT_SECRET || "portfolio_jwt_secret_key";
const SESSION_COOKIE_NAME = "portfolio_admin_session";

const ATTEMPT_STORE = new Map<string, { count: number }>();

export function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(
  password: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const match = await compare(password, ADMIN_PASSWORD_HASH);
    return { ok: match };
  } catch {
    return { ok: false, error: "Authentication failed." };
  }
}

export function createSession(): string {
  const iat = Math.floor(Date.now() / 1000);
  const exp = Math.floor(Date.now() / 1000) + 60 * 30;

  const payload = { iat, exp };
  return jwt.sign(payload, JWT_SECRET);
}

export function verifySession(token: string): { valid: boolean; payload?: any } {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return { valid: false };
    }

    return { valid: true, payload: decoded };
  } catch {
    return { valid: false };
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 30,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

// @typescript-eslint/no-explicit-any
export async function checkRateLimit(ip: string): Promise<{
  ok: boolean;
  attempts: number;
  error?: string;
  remaining?: any;
}> {
  const now = Date.now();
  const state = ATTEMPT_STORE.get(ip);

  if (!state) {
    ATTEMPT_STORE.set(ip, { count: 0, lockedUntil: 0, lastAttemptTime: now });
    return { ok: true, remaining: 15 };
  }

  if (state.lockedUntil > now) {
    const remaining = Math.ceil((state.lockedUntil - now) / 1000 / 60);
    return {
      ok: false,
      attempts: state.count,
      error: `Too many attempts. Try again in ${remaining} minutes.`,
    };
  }

  const timeSinceLastAttempt = now - (state.lastAttemptTime ?? 0);

  if (timeSinceLastAttempt < 5 * 60 * 1000) {
    return { ok: true, attempts: state.count };
  }

  return {
    ok: false,
    attempts: state.count,
    error: "Too many attempts. Please wait before trying again.",
  };
}

export function recordFailedAttempt(ip: string) {
  const state = ATTEMPT_STORE.get(ip);
  const now = Date.now();

  state.count += 1;

  if (state.count >= 3) {
    state.lockedUntil = now + 5 * 60 * 1000;
  }

  state.lastAttemptTime = now;
}

export function resetFailedAttempts(ip: string) {
  ATTEMPT_STORE.delete(ip);
}


  if (state.count >= 3) {
    return {
      ok: false,
      attempts: state.count,
      error: "Too many attempts. Please wait before trying again.",
    };
  }

  return {
    ok: true,
    attempts: state.count + 1,
  };
}
