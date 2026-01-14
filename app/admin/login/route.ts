import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSession, setSessionCookie, clearSessionCookie, recordFailedAttempt } from "../../../lib/auth";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (username !== "admin") {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const verified = await verifyPassword(password);

  if (!verified.ok) {
    await recordFailedAttempt(ip);

    return NextResponse.json(
      { error: verified.error || "Invalid credentials." },
      { status: 401 }
    );
  }

  const token = createSession();
  await setSessionCookie(token);

  const res = NextResponse.json({ token });
  return res;
}
