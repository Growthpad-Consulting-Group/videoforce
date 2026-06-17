import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(ADMIN_SESSION_COOKIE);
  return res;
}
