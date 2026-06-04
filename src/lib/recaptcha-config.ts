/** Public reCAPTCHA v2 site key (safe to expose in the browser). */
export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";

export function isRecaptchaConfigured(): boolean {
  return RECAPTCHA_SITE_KEY.length > 0;
}

/** Both site and secret keys must be set for server-side verification. */
export function isRecaptchaServerConfigured(): boolean {
  return (
    isRecaptchaConfigured() &&
    Boolean(process.env.RECAPTCHA_SECRET_KEY?.trim())
  );
}
