import { backendFetch } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") ?? "";
  try {
    const backendRes = await backendFetch("/api/admin/contact-submissions", {
      headers: { "Content-Type": "application/json", cookie },
    });
    const data = (await backendRes.json()) as unknown;
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json({ error: "Could not reach API server" }, { status: 503 });
  }
}
