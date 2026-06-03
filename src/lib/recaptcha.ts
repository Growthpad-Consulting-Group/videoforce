/**
 * Verifies a reCAPTCHA v2 token server-side using Google's siteverify API.
 * Must only be called from server-side code (API routes, Server Actions).
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    throw new Error("RECAPTCHA_SECRET_KEY environment variable is not set");
  }

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }).toString(),
  });

  if (!res.ok) {
    throw new Error(`reCAPTCHA API returned HTTP ${res.status}`);
  }

  const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
  return data.success === true;
}
