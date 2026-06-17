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
<<<<<<< HEAD
=======
  { href: "/blog", label: "Blog" },
>>>>>>> master
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
      {/*
        .nav-overlay: fixed inset-0 z-[98] bg-[rgba(37,36,37,0.71)] hidden → block when open
      */}
      <div
        className={`fixed inset-0 z-[98] bg-[rgba(37,36,37,0.71)] transition-opacity duration-300 ${
          isOpen ? "block opacity-100" : "hidden opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/*
        .nav-holder: fixed top-0 left-[-1064px] bottom-0 z-[99] w-[600px]
        bg-[#4c0f66] overflow-auto py-[35px] pr-[30px] pl-[160px]
        transition: left 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease
        .open → left:0 opacity:1
      */}
      <div
        className={`fixed top-0 bottom-0 z-[99] w-[600px] bg-[#4c0f66] overflow-auto
          py-[35px] pr-[30px] pl-[160px] opacity-0
          transition-[left,opacity] duration-[600ms,400ms] ease-[cubic-bezier(0.22,1,0.36,1),ease]
          ${isOpen ? "left-0 opacity-100" : "left-[-1064px]"}`}
      >
        {/* Logo */}
        <Link className="block mb-8" href="/" onClick={onClose}>
          <Image src="/images/logo2.png" alt="Video Force" width={200} height={60} />
        </Link>

        {/* Nav links */}
        <nav id="menu">
          <ul className="m-0 p-0 list-none">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href} className="float-left w-full">
                <Link
                  href={href}
                  onClick={onClose}
                  className="group float-left w-full px-[10px] h-[50px] leading-[50px] font-semibold text-xs text-white uppercase tracking-[3px] transition-all duration-200 relative overflow-hidden hover:text-[#fac921]
                    after:content-[''] after:absolute after:top-0 after:left-[-10px] after:w-0 after:h-full after:bg-white/[0.071] after:transition-all after:duration-300 after:z-[-1]
                    hover:after:w-[calc(100%+10px)]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Large "MENU" watermark — rotated, bottom of panel */}
        <div className="absolute bottom-10 left-[-60px] pointer-events-none select-none">
          <span className="text-white/5 font-black text-[100px] uppercase tracking-[6px]"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            Menu
          </span>
        </div>
      </div>
    </>
  );
}
