import type { ImageLoaderProps } from "next/image";

/**
 * Bypasses Next.js's /_next/image optimizer (billed per unique source image
 * on Vercel) and uses ImageKit's own on-the-fly transform API instead, since
 * ImageKit already resizes/compresses everything we serve through next/image.
 */
export default function imageKitLoader({ src, width, quality }: ImageLoaderProps) {
  const params = [`w-${width}`, `q-${quality ?? 75}`];
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}tr=${params.join(",")}`;
}
