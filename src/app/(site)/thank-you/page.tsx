import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Message Sent",
  description: "Thank you for contacting Video Force Kenya. We'll be in touch soon.",
};

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-dark2 px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink/20 text-brand-pink">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-8 w-8"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 className="mb-3 text-3xl font-light text-white md:text-4xl">
        Message Sent!
      </h1>
      <p className="mb-8 max-w-md text-sm leading-relaxed text-white/50">
        Thanks for reaching out. We&apos;ve received your message and will get back to
        you within 1 business day.
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
