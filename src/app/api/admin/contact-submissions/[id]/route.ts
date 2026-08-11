import { backendFetch } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

async function proxyToBackend(req: NextRequest, id: string, init?: RequestInit) {
  const cookie = req.headers.get("cookie") ?? "";
  try {
    const backendRes = await backendFetch(
      `/api/admin/contact-submissions/${encodeURIComponent(id)}`,
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

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  return proxyToBackend(req, id, { method: "PATCH", body: await req.text() });
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  return proxyToBackend(req, id, { method: "DELETE" });
}
