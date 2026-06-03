"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import type { NavSection } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  sections: NavSection[];
}

export default function ScrollSideNav({ sections }: Props) {
  const activeId = useActiveSection(sections.map((s) => s.id));
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("sec1");
      if (!hero) {
        const threshold = window.innerHeight - 80;
        setIsSticky(window.scrollY >= threshold);
        return;
      }

      const rect = hero.getBoundingClientRect();
      const isMobile = window.innerWidth <= 1024;
      const stickyTop = isMobile ? 60 : 0;

      // Sticky top threshold is reached when the bottom edge of the hero (where the absolute menu sits)
      // reaches stickyTop + 80px (the height of the menu).
      if (rect.bottom - 80 <= stickyTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className={`scroll-nav-wrap${isSticky ? " scroll-nav-fixed" : ""}`}>
      {/* Scroll down indicator */}
      <div className="scroll-down-wrap">
        <div className="mousey">
          <div className="scroller" />
        </div>
        <span>Scroll Down</span>
      </div>

      {/* Side navigation links */}
      <nav className="scroll-nav scroll-init">
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                className={`scroll-link${activeId === section.id ? " act-scrlink" : ""}`}
                href={`#${section.id}`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
