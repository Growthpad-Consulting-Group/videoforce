"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navigation from "./Navigation";
import ShareOverlay from "../ui/ShareOverlay";

const SOCIAL_LINKS = [
  { icon: "fa6-brands:facebook-f", label: "Facebook",  href: "https://facebook.com" },
  { icon: "fa6-brands:instagram",  label: "Instagram", href: "https://instagram.com" },
  { icon: "fa6-brands:youtube",    label: "YouTube",   href: "https://youtube.com" },
  { icon: "fa6-brands:linkedin",   label: "LinkedIn",  href: "https://linkedin.com" },
];

export default function Header() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const HamburgerBtn = (
    <button
      onClick={() => setMenuOpen(v => !v)}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      className="flex flex-col items-center justify-center gap-[5px] cursor-pointer bg-transparent border-none p-2"
    >
      <span className={`block w-[28px] h-[2px] bg-white transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
      <span className={`block h-[2px] bg-white transition-all duration-200 ${menuOpen ? "opacity-0 w-0" : "w-[20px]"}`} />
      <span className={`block w-[28px] h-[2px] bg-white transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
    </button>
  );

  return (
    <>
      {/* ─── MOBILE top bar (< md) ─────────────────────────────────────── */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 h-[60px] z-[100] grid grid-cols-3 items-center px-4"
        style={{ background: "rgba(72,15,102,0.95)" }}
      >
        {/* Left — Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="Video Force" width={40} height={40} priority className="object-contain" />
        </Link>

        {/* Center — Hamburger */}
        <div className="flex items-center justify-center">
          {HamburgerBtn}
        </div>

        {/* Right — Contact icon */}
        <div className="flex items-center justify-end">
          <a href="/contacts" className="flex items-center justify-center w-10 h-10 text-brand-yellow" aria-label="Contact">
            <Icon icon="fa6-regular:envelope" className="text-lg" />
          </a>
        </div>
      </header>

      {/* Mobile spacer — pushes content below the fixed top bar */}
      <div className="md:hidden h-[60px]" />

      {/* ─── DESKTOP left sidebar (≥ md) ──────────────────────────────── */}
      <header
        className="hidden md:flex fixed top-0 left-0 w-[80px] h-full z-[100] flex-col items-center"
        style={{ background: "rgba(72,15,102,0.85)" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center w-[80px] h-[80px] shrink-0">
          <Image src="/images/logo.png" alt="Video Force Kenya" width={46} height={46} priority className="object-contain" />
        </Link>

        {/* Hamburger + MENU label */}
        <div className="mt-6">
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex flex-col items-center gap-[5px] cursor-pointer bg-transparent border-none p-0 group"
          >
            <span className={`block w-[28px] h-[2px] bg-white transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-[2px] bg-white transition-all duration-200 ${menuOpen ? "opacity-0 w-0" : "w-[20px] group-hover:w-[28px]"}`} />
            <span className={`block w-[28px] h-[2px] bg-white transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            <span className="mt-2 text-white/40 text-[9px] font-normal uppercase tracking-[2px] leading-none">Menu</span>
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Social icons */}
        <div className="w-px h-[50px] bg-white/[0.08] mb-4" />
        <ul className="flex flex-col items-center gap-4 list-none p-0 m-0">
          {SOCIAL_LINKS.map(({ icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-9 h-9 text-white/40 text-xs border border-white/[0.08] transition-all duration-300 hover:rounded-full hover:text-white hover:border-white/30"
              >
                <Icon icon={icon} />
              </a>
            </li>
          ))}
        </ul>

        {/* Share This */}
        <button
          onClick={() => setShareOpen(true)}
          aria-label="Share this page"
          className="w-[80px] py-3 mt-6 flex flex-col items-center justify-center gap-1 bg-brand-yellow border-none cursor-pointer shrink-0"
        >
          <Icon icon="fa6-solid:retweet" className="text-white text-lg" />
          <span
            className="text-white text-[8px] font-semibold uppercase tracking-[1px] leading-none"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Share This
          </span>
        </button>
      </header>

      <Navigation isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <ShareOverlay isOpen={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  );
}
