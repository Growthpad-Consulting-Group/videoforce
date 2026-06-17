"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
<<<<<<< HEAD
=======
import { useShareUrl } from "@/hooks/useShareUrl";
>>>>>>> master

const SHARE_LINKS = [
  {
    label: "Facebook",
    icon: "fa6-brands:facebook",
    href: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: "Twitter / X",
    icon: "fa6-brands:x-twitter",
    href: (url: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    label: "LinkedIn",
    icon: "fa6-brands:linkedin",
    href: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    label: "WhatsApp",
    icon: "fa6-brands:whatsapp",
    href: (url: string) =>
      `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
];

interface Props {
  title?: string;
}

export default function ShareButton({ title = "Video Force Kenya" }: Props) {
  const [open, setOpen] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User cancelled or API not supported — fall through to overlay
      }
    }
    setOpen((v) => !v);
  };

<<<<<<< HEAD
  const pageUrl =
    typeof window !== "undefined" ? window.location.href : "https://videoforce.co.ke";
=======
  const pageUrl = useShareUrl();
>>>>>>> master

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors cursor-pointer"
        aria-label="Share this page"
      >
        <Icon icon="fa6-regular:retweet" className="text-base" />
        <span>Share This</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-8 z-50 flex flex-col gap-3 rounded-lg bg-brand-dark p-4 shadow-xl border border-white/10"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">
                Share
              </p>
              {SHARE_LINKS.map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href(pageUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-brand-yellow transition-colors"
                >
                  <Icon icon={icon} className="text-lg" />
                  {label}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
