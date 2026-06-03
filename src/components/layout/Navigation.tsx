"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const NAV_LINKS = [
  { href: "/#sec1", label: "Home" },
  { href: "/#sec2", label: "About Us" },
  { href: "/#sec3", label: "Our Services" },
  { href: "/#sec4", label: "Case Studies" },
  { href: "/#sec5", label: "Reviews" },
  { href: "/#sec6", label: "Clients" },
  { href: "/contacts", label: "Contact Us" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Dark semi-transparent overlay behind panel */}
      <div
        className={`nav-overlay${isOpen ? " open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in nav panel — background #4c0f66 */}
      <div className={`nav-holder${isOpen ? " open" : ""}`}>

        {/* Logo inside nav panel */}
        <Link className="header-logo" href="/" onClick={onClose}>
          <Image src="/images/logo2.png" alt="Video Force" width={200} height={60} />
        </Link>

        {/* Nav links with sliding hover effect */}
        <div className="nav-inner-wrap">
          <nav className="nav-inner sound-nav" id="menu">
            <ul>
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} onClick={onClose} className="nav-link-item">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Large "MENU" watermark — rotated vertically at bottom of panel */}
        <div className="nav-title">
          <span>Menu</span>
        </div>
      </div>
    </>
  );
}
