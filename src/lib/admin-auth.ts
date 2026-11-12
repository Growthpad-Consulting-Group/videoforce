import { cookies } from "next/headers";
import crypto from "crypto";

export const ADMIN_SESSION_COOKIE = "vf_admin_session";

function getSecret(): string | undefined {
  // `||` (not `??`) so an empty ADMIN_SESSION_SECRET still falls back to JWT_SECRET
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.JWT_SECRET?.trim() ||
    undefined
  );
}

/** True when the frontend has a secret to verify session cookies. */
export function isAdminConfigured(): boolean {
  return Boolean(getSecret());
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (
    sigBuf.length !== expBuf.length ||
    !crypto.timingSafeEqual(sigBuf, expBuf)
  ) {
    return false;
  }

  try {
    const { exp } = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { exp: number };
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

/** True when a session cookie is present (valid or not). */
export async function hasAdminSessionCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}
