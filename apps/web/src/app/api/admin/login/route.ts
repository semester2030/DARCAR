import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  checkAdminLoginRateLimit,
  clearAdminLoginFailures,
  recordFailedAdminLogin,
  type AdminLoginRateLimitDecision,
} from "@/lib/admin-login-rate-limit";
import { signAdminSession } from "@/lib/admin-session";

function rateLimitedResponse(decision: Extract<AdminLoginRateLimitDecision, { allowed: false }>) {
  return NextResponse.json(
    { error: "TOO_MANY_LOGIN_ATTEMPTS" },
    {
      status: 429,
      headers: {
        "Retry-After": String(decision.retryAfterSeconds),
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(request: Request) {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) {
    return NextResponse.json({ error: "ADMIN_AUTH_NOT_CONFIGURED" }, { status: 503 });
  }

  const rateLimit = checkAdminLoginRateLimit(request);
  if (!rateLimit.allowed) {
    return rateLimitedResponse(rateLimit);
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body.password !== "string" || body.password !== password) {
    const afterFailure = recordFailedAdminLogin(request);
    if (!afterFailure.allowed) {
      return rateLimitedResponse(afterFailure);
    }
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  clearAdminLoginFailures(request);
  const token = await signAdminSession(secret);
  const jar = await cookies();
  jar.set("dc_admin", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}
