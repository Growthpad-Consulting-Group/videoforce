import { backendFetch } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const backendRes = await backendFetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await req.text(),
    });
    const data = (await backendRes.json()) as unknown;
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json({ error: "Could not reach API server" }, { status: 503 });
  }
}
