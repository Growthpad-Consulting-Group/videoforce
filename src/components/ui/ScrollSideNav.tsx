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
        setIsSticky(window.scrollY >= window.innerHeight - 80);
        return;
      }
      const rect = hero.getBoundingClientRect();
      const stickyTop = window.innerWidth <= 1024 ? 60 : 0;
      setIsSticky(rect.bottom - 80 <= stickyTop);
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
    /*
      scroll-nav-wrap:
        not-sticky: position:absolute top:100vh translateY(-100%) height:80px left:80px right:0 bg-brand-purple z-99
        sticky:     position:fixed   top:0                        height:80px left:0   right:0 bg-brand-purple z-99
      @1024px: left:0 always; sticky top:60px
    */
    <div
      className={[
        "h-[80px] bg-brand-purple z-[99] right-0 flex",
        isSticky
          ? "fixed top-0 left-0"
          : "absolute top-[100vh] -translate-y-full left-[80px] max-md:left-0",
      ].join(" ")}
    >
      {/* Scroll down indicator — .scroll-down-wrap */}
      <div className="float-left h-full relative ml-[50px] pr-[50px] pt-[28px] border-r border-white/10 flex items-start gap-5">
        {/* .mousey */}
        <div className="float-left w-5 h-[30px] rounded-md px-1.5 border-2 border-white/40 shrink-0">
          {/* .scroller — uses mouse-scroll animation from @theme */}
          <div className="relative left-1/2 top-1.5 -ml-[1.5px] w-[3px] h-1.5 rounded-full bg-white animate-[mouse-scroll_2.2s_cubic-bezier(.15,.41,.69,.94)_infinite]" />
        </div>
        <span className="relative top-2 text-[#e4dfdf] font-semibold uppercase text-[10px] tracking-[2px] whitespace-nowrap">
          Scroll Down
        </span>
      </div>

      {/* Section nav links — .scroll-nav */}
      <nav className="float-left pt-[23px] pl-[40px] h-full border-r border-white/10 bg-brand-pink">
        <ul className="flex list-none m-0 p-0">
          {sections.map((section) => (
            <li key={section.id} className="float-left mr-2.5">
              <a
                href={`#${section.id}`}
                className={[
                  "float-left px-[35px] py-[13px] font-semibold text-[10px] uppercase tracking-[2px] relative transition-all duration-300",
                  // ::before — static grey 15px line
                  "before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[15px] before:h-0.5 before:-translate-y-1/2 before:bg-white/[0.091] before:z-[1]",
                  // ::after — yellow line that expands when active
                  "after:content-[''] after:absolute after:top-1/2 after:left-0 after:h-0.5 after:-translate-y-1/2 after:z-[2] after:transition-all after:duration-300",
                  activeId === section.id
                    ? "text-brand-yellow after:w-[15px] after:bg-brand-pink"
                    : "text-[#e4dfdf] after:w-0",
                ].join(" ")}
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
