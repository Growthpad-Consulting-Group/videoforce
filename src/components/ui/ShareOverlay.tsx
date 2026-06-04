"use client";

import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useShareUrl } from "@/hooks/useShareUrl";

const NETWORKS = [
  { icon: "fa6-brands:facebook-f", label: "Facebook" },
  { icon: "fa6-brands:x-twitter",  label: "Twitter / X" },
  { icon: "fa6-brands:linkedin",   label: "LinkedIn" },
  { icon: "fa6-brands:whatsapp",   label: "WhatsApp" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareOverlay({ isOpen, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const url = useShareUrl();

  const getHref = (label: string) => {
    const enc = encodeURIComponent(url);
    if (label === "Facebook")   return `https://www.facebook.com/sharer/sharer.php?u=${enc}`;
    if (label === "Twitter / X") return `https://twitter.com/intent/tweet?url=${enc}`;
    if (label === "LinkedIn")   return `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`;
    return `https://wa.me/?text=${enc}`;
  };

  return (
    <>
      {/* Backdrop — click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[199] bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel slides in from the left, sitting right of the 80px sidebar */}
      <div
        className={[
          "fixed top-0 bottom-0 z-[200] w-[360px]",
          "bg-brand-purple2 pt-[80px] px-[40px] pb-[40px]",
          "transition-[left] duration-400 ease-in-out",
          isOpen ? "left-[80px]" : "left-[-360px]",
        ].join(" ")}
        role="dialog"
        aria-label="Share this page"
      >
      {/* .share-title */}
      <div className="text-white text-[24px] font-bold mb-[30px]">Share</div>

      {/* .close-share */}
      <button
        onClick={onClose}
        className="absolute top-[30px] right-[30px] cursor-pointer text-white/50 text-xs uppercase tracking-[2px] hover:text-white transition-colors"
      >
        Close
      </button>

      {/* .share-container links */}
      <div>
        {NETWORKS.map(({ icon, label }) => (
          <a
            key={label}
            href={getHref(label)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            className="flex items-center gap-3 text-white/70 py-3 border-b border-dotted border-white/10 text-xs uppercase tracking-[2px] transition-colors duration-200 hover:text-brand-yellow"
          >
            <Icon icon={icon} className="text-base" />
            {label}
          </a>
        ))}
      </div>
    </div>
    </>
  );
}
