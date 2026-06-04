import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 – Page Not Found",
};

export default function NotFound() {
  return (
    /*
      min-h-screen: fills the full viewport
      relative z-[10]: stacks above the fixed footer (z-2)
      bg-brand-purple: opaque background covers the footer behind it
      pb-[80px]: clears the subfooter bar height so no content is hidden
    */
    <div className="relative z-[10] flex min-h-screen flex-col items-center justify-center bg-brand-purple px-6 text-center pb-[80px]">
      <p className="mb-2 text-[140px] font-black leading-none text-brand-pink/20">404</p>
      <h1 className="mb-3 text-3xl font-light text-white">Page not found</h1>
      <p className="mb-8 text-sm text-white/40 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block border-2 border-brand-yellow bg-brand-yellow px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-yellow"
      >
        Back to Home
      </Link>
    </div>
  );
}
