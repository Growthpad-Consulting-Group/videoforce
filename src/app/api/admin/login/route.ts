import { backendFetch } from "@/lib/api";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
    });
  } catch {
    return NextResponse.json({ error: "Could not reach API server" }, { status: 503 });
  }

  let data: Record<string, unknown>;
  try {
    data = (await backendRes.json()) as Record<string, unknown>;
  } catch (err) {
    console.error("[api] login: backend returned non-JSON response", err);
    return NextResponse.json({ error: "Invalid response from API server" }, { status: 502 });
  }

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  const setCookie = backendRes.headers.get("set-cookie") ?? "";
  const match = /vf_admin_session=([^;]+)/.exec(setCookie);
  if (!match) {
    console.error("[api] login: backend response missing Set-Cookie header");
    return NextResponse.json({ error: "Session setup failed" }, { status: 500 });
  }

  let rememberMe = true;
  try {
    const parsed = JSON.parse(body) as { rememberMe?: boolean };
    if (parsed.rememberMe === false) rememberMe = false;
  } catch {
    // default to remember
  }

  const res = NextResponse.json(data);
  res.cookies.set(ADMIN_SESSION_COOKIE, match[1], {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
    path: "/",
  });
  return res;
}
