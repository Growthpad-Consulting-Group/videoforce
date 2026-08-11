import { backendFetch } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const cookie = req.headers.get("cookie") ?? "";
  try {
    const backendRes = await backendFetch(`/api/admin/users/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { cookie },
    });
    const data = (await backendRes.json()) as unknown;
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json({ error: "Could not reach API server" }, { status: 503 });
  }
}
