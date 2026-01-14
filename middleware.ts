import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, checkRateLimit, recordFailedAttempt, resetFailedAttempts } from "./lib/auth";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const sessionToken = request.headers.get("cookie")?.match(/portfolio_admin_session=([^;]+)/)?.[1];
    const verified = sessionToken ? verifySession(sessionToken) : { valid: false };

    if (!verified.valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
    const limitCheck = await checkRateLimit(ip);

    if (!limitCheck.ok) {
      return NextResponse.json(
        { error: limitCheck.error || "Rate limit exceeded" },
        { status: 429 }
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
