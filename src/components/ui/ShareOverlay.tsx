"use client";

import { Icon } from "@iconify/react";
import { useEffect } from "react";

const NETWORKS = [
  { icon: "fa6-brands:facebook-f", label: "Facebook", color: "#3b5998" },
  { icon: "fa6-brands:x-twitter",  label: "Twitter / X", color: "#000" },
  { icon: "fa6-brands:linkedin",   label: "LinkedIn", color: "#0077b5" },
  { icon: "fa6-brands:whatsapp",   label: "WhatsApp", color: "#25d366" },
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

  const url = typeof window !== "undefined" ? window.location.href : "https://videoforce.co.ke";

  const getHref = (label: string) => {
    const enc = encodeURIComponent(url);
    if (label === "Facebook") return `https://www.facebook.com/sharer/sharer.php?u=${enc}`;
    if (label === "Twitter / X") return `https://twitter.com/intent/tweet?url=${enc}`;
    if (label === "LinkedIn") return `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`;
    return `https://wa.me/?text=${enc}`;
  };

  return (
    <div className={`share-wrapper${isOpen ? " invis-share" : " isShare"}`}>
      <div className="share-title">Share</div>
      <div className="close-share soa" onClick={onClose} role="button" tabIndex={0}>
        <span>Close</span>
      </div>
      <div className="share-inner soa">
        <div className="share-container">
          {NETWORKS.map(({ icon, label }) => (
            <a
              key={label}
              href={getHref(label)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${label}`}
            >
              <Icon icon={icon} style={{ fontSize: 16 }} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
