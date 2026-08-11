import { backendFetch } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

async function proxyToBackend(req: NextRequest, init?: RequestInit) {
  const cookie = req.headers.get("cookie") ?? "";
  try {
    const backendRes = await backendFetch("/api/admin/blog", {
      ...init,
      headers: {
        "Content-Type": "application/json",
        cookie,
        ...(init?.headers ?? {}),
      },
    });
    const data = (await backendRes.json()) as unknown;
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json({ error: "Could not reach API server" }, { status: 503 });
  }
}

export async function GET(req: NextRequest) {
  return proxyToBackend(req);
}

export async function POST(req: NextRequest) {
  return proxyToBackend(req, { method: "POST", body: await req.text() });
}
