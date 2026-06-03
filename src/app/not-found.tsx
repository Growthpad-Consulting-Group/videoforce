import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 – Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-dark2 px-6 text-center">
      <p className="mb-2 text-7xl font-black text-brand-pink/20">404</p>
      <h1 className="mb-3 text-2xl font-light text-white">Page not found</h1>
      <p className="mb-8 text-sm text-white/40">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block rounded-full border-2 border-brand-pink bg-brand-pink px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-pink"
      >
        Back to Home
      </Link>
    </div>
  );
}
