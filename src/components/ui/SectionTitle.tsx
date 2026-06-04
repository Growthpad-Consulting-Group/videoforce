"use client";

import { useEffect, useRef } from "react";

interface SectionTitleProps {
  subtitle?: string
  eyebrow?: string
  title?: string
  titleHtml?: string
  description?: string
  dark?: boolean
  className?: string
}

export default function SectionTitle({
  subtitle,
  eyebrow,
  title,
  titleHtml,
  description,
  dark,
  className = '',
}: SectionTitleProps) {
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!subtitleRef.current) return;

    const el = subtitleRef.current;

    const onScroll = () => {
      const rect = el.closest("section")?.getBoundingClientRect()
                ?? el.parentElement?.getBoundingClientRect();
      if (!rect) return;

      // How far the section has scrolled through the viewport (0 = just entering, 1 = leaving)
      const progress = 1 - (rect.bottom / (rect.height + window.innerHeight));
      // Move the subtitle at 40% of the scroll speed — gentle parallax
      const translateY = progress * rect.height * 0.4;

      el.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialise on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Large watermark subtitle — parallax on scroll */}
      {subtitle && (
        <div
          ref={subtitleRef}
          className="absolute top-[50px] left-[40px] right-0 font-black uppercase opacity-[0.15] text-[9.5vw] leading-none text-[#ccc] pointer-events-none text-left will-change-transform"
        >
          {subtitle}
        </div>
      )}

      {/* Section heading block — yellow left bar + eyebrow + h2 + description */}
      {(eyebrow || title || titleHtml || description) && (
        <div
          className={`relative pl-[50px] py-5 mb-[50px] text-left
            before:content-[''] before:absolute before:top-0 before:left-[-2px]
            before:w-1 before:h-full before:bg-brand-yellow
            ${className}`}
        >
          {eyebrow && (
            <h3
              className={`relative pb-[30px] text-left font-semibold text-sm
                after:content-[''] after:absolute after:bottom-3 after:left-0
                after:w-[50px] after:border-b after:border-dotted after:border-[#666]
                ${dark ? "text-white/70" : "text-brand-purple"}`}
            >
              {eyebrow}
            </h3>
          )}
          {titleHtml ? (
            <h2
              className={`text-[40px] font-extrabold uppercase [&_span]:text-brand-yellow
                ${dark ? "text-white pb-[50px]" : "text-[rgb(50,58,69)] pb-[30px]"}`}
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
          ) : title ? (
            <h2
              className={`text-[40px] font-extrabold uppercase
                ${dark ? "text-white pb-[50px]" : "text-[rgb(50,58,69)] pb-[30px]"}`}
            >
              {title}
            </h2>
          ) : null}
          {description && (
            <p className={`text-left ${dark ? "text-white/70" : ""}`}>
              {description}
            </p>
          )}
        </div>
      )}
    </>
  );
}
