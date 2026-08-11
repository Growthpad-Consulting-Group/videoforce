import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message Sent",
  description: "Thank you for contacting Video Force Kenya. We'll be in touch soon.",
};

export default function ThankYouPage() {
  return (
    <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-brand-purple px-6 py-24 text-center sm:px-10">
      {/* Faint rotated watermark, consistent with footer's brand treatment */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[120px] font-bold uppercase tracking-[6px] text-white/5 sm:block md:text-[180px]"
      >
        VideoForce
      </span>

      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-6 text-[10px] font-semibold uppercase tracking-[3px] text-brand-yellow">
          <span className="pr-[10px]">01.</span>Message sent
        </span>

        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-brand-yellow text-brand-purple">
          <Icon icon="fa6-solid:check" className="text-3xl" />
        </div>

        <h1 className="mb-4 text-3xl font-light text-white sm:text-4xl md:text-5xl">
          Thanks for reaching out!
        </h1>
        <p className="mb-10 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
          We&apos;ve received your message and one of our strategists will get back
          to you within 1 business day.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button href="/" variant="color">
            Back to Home
          </Button>
          <Button href="/#sec4" variant="flat">
            See Our Work
          </Button>
        </div>
      </div>
    </div>
  );
}
