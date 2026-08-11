import { backendFetch } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

async function proxyToBackend(req: NextRequest, slug: string, init?: RequestInit) {
  const cookie = req.headers.get("cookie") ?? "";
  try {
    const backendRes = await backendFetch(
      `/api/admin/blog/${encodeURIComponent(slug)}`,
      {
        ...init,
        headers: {
          "Content-Type": "application/json",
          cookie,
          ...(init?.headers ?? {}),
        },
      }
    );
    const data = (await backendRes.json()) as unknown;
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json({ error: "Could not reach API server" }, { status: 503 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  return proxyToBackend(req, slug, { method: "PUT", body: await req.text() });
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  return proxyToBackend(req, slug, { method: "DELETE" });
}
