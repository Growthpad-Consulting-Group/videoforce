import { API_BASE, backendFetch } from "@/lib/api";
import {
  ADMIN_SESSION_COOKIE,
  isAdminConfigured,
  verifySessionToken,
} from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

// Render free instances can take ~50s to wake up; don't hang forever.
const BACKEND_TIMEOUT_MS = 60_000;

export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "Admin is not configured on the frontend: set ADMIN_SESSION_SECRET (same value as the backend's JWT_SECRET).",
      },
      { status: 500 }
    );
  }

  let body: string;
  try {
    body = await req.text();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  let backendRes: Response;
  try {
    backendRes = await backendFetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    return NextResponse.json(
      {
        error: timedOut
          ? "The API server took too long to respond. Please try again."
          : "Could not reach the API server. Please try again later.",
      },
      { status: timedOut ? 504 : 503 }
    );
  }

  let data: Record<string, unknown>;
  try {
    data = (await backendRes.json()) as Record<string, unknown>;
  } catch (err) {
    console.error(
      `[api] login: backend returned non-JSON response (${backendRes.status}) from ${API_BASE}`,
      err
    );
    return NextResponse.json(
      { error: `Invalid response from API server (status ${backendRes.status}).` },
      { status: 502 }
    );
  }

  if (!backendRes.ok) {
    return NextResponse.json(
      { error: typeof data.error === "string" ? data.error : "Login failed" },
      { status: backendRes.status }
    );
  }

  const setCookie = backendRes.headers.get("set-cookie") ?? "";
  const match = /vf_admin_session=([^;]+)/.exec(setCookie);
  if (!match) {
    console.error("[api] login: backend response missing Set-Cookie header");
    return NextResponse.json(
      { error: "Login succeeded but the API server did not issue a session." },
      { status: 500 }
    );
  }
  const token = decodeURIComponent(match[1]);

  // Without this check, a secret mismatch makes the dashboard silently bounce
  // back to the login page with no explanation.
  if (!verifySessionToken(token)) {
    console.error(
      "[api] login: session token from backend failed verification — ADMIN_SESSION_SECRET (frontend) does not match JWT_SECRET (backend)"
    );
    return NextResponse.json(
      {
        error:
          "Login succeeded but the session could not be verified. The frontend ADMIN_SESSION_SECRET must match the backend JWT_SECRET.",
      },
      { status: 500 }
    );
  }

  let rememberMe = true;
  try {
    const parsed = JSON.parse(body) as { rememberMe?: boolean };
    if (parsed.rememberMe === false) rememberMe = false;
  } catch {
    // default to remember
  }

  // Base `secure` on the actual protocol, so http deployments still keep the cookie.
  const proto =
    req.headers.get("x-forwarded-proto")?.split(",")[0].trim() ??
    req.nextUrl.protocol.replace(":", "");

  const res = NextResponse.json(data);
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: proto === "https",
    sameSite: "lax",
    maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
    path: "/",
  });
  return res;
}
