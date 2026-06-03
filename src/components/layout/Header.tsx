"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navigation from "./Navigation";
import ShareOverlay from "../ui/ShareOverlay";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      {/* Fixed 80px vertical left sidebar */}
      <header className="main-header" style={{ textAlign: "center" }}>

        {/* Logo — uses logo.png (small icon version for 80px column) */}
        <Link
          className="logo-holder"
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
          }}
        >
          <Image
            src="/images/logo.png"
            alt="Video Force Kenya"
            width={50}
            height={50}
            priority
            style={{ width: 50, height: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Hamburger button — 3 lines + "MENU" text below, rotated vertically */}
        <div
          className="nav-button but-hol"
          style={{ margin: "30px auto 0", display: "block", cursor: "pointer" }}
          onClick={() => setMenuOpen(true)}
          role="button"
          aria-label="Open navigation menu"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setMenuOpen(true)}
        >
          <span className="nos" />
          <span className="ncs" />
          <span className="nbs" />
          {/* "MENU" text shown below the 3 lines, matching original */}
          <div className="menu-button-text">Menu</div>
        </div>

        {/* Social icons */}
        <div className="header-social">
          <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
            {[
              { icon: "fa6-brands:facebook-f", label: "Facebook" },
              { icon: "fa6-brands:instagram",  label: "Instagram" },
              { icon: "fa6-brands:youtube",    label: "YouTube" },
              { icon: "fa6-brands:linkedin",   label: "LinkedIn" },
            ].map(({ icon, label }) => (
              <li key={label} style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: 16 }}>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    color: "rgba(255,255,255,0.41)",
                    fontSize: 12,
                    border: "1px solid rgba(255,255,255,0.08)",
                    transition: "all 300ms linear",
                  }}
                >
                  <Icon icon={icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Share This — yellow bg with retweet icon + "SHARE THIS" text */}
        <div
          className="show-share showshare"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 80,
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "#fac921",
            padding: "12px 0",
            gap: 4,
          }}
          onClick={() => setShareOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Share this page"
          onKeyDown={(e) => e.key === "Enter" && setShareOpen(true)}
        >
          <Icon
            icon="fa6-regular:retweet"
            style={{ color: "#fff", fontSize: 18, display: "block" }}
          />
          <span style={{
            color: "#fff",
            fontSize: 8,
            fontWeight: 600,
            textTransform: "uppercase" as const,
            letterSpacing: 1,
            lineHeight: 1,
            writingMode: "vertical-rl" as const,
            transform: "rotate(180deg)",
            marginTop: 4,
          }}>
            Share This
          </span>
        </div>
      </header>

      <Navigation isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <ShareOverlay isOpen={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  );
}
