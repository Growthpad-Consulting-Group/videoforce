export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export function isRecaptchaConfigured(): boolean {
  return RECAPTCHA_SITE_KEY.length > 0;
}
