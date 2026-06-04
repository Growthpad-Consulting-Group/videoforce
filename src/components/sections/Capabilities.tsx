"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SKILLS = [
  { label: "Content strategy",                percent: 99 },
  { label: "Content creation and production", percent: 99 },
  { label: "Content management",              percent: 99 },
  { label: "Content distribution",            percent: 99 },
];

/** Animated skill bar — grows from 0 to `percent`% when `active` */
function SkillBar({
  label,
  percent,
  active,
}: {
  label: string;
  percent: number;
  active: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const duration = 1400;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setWidth(eased * percent);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, percent]);

  return (
    <div className="clear-both">
      <span className="float-left text-[13px] mt-3 pb-1.5 font-semibold min-w-[100px] text-left text-white">
        {label}
      </span>
      <span className="float-right text-[12px] mt-3 pb-1.5 font-bold text-white mr-[5%]">
        {Math.round(width)}%
      </span>
      {/* Track */}
      <div className="relative block float-left w-[95%] h-[10px] overflow-hidden bg-white/20 rounded-sm mb-5 clear-both">
        {/* Animated fill */}
        <div
          className="h-[10px] bg-brand-yellow transition-none"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function Capabilities() {
  const barsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative float-left w-full py-[110px] bg-brand-pink overflow-hidden
      before:content-[''] before:absolute before:left-0 before:top-0 before:w-[30px] before:h-full before:bg-black/10
      after:content-[''] after:absolute after:right-0 after:top-0 after:w-[30px] after:h-full after:bg-black/10">

      <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
        <div className="flex flex-wrap mx-[-15px]">

          {/* Left — animated GIF */}
          <div className="w-full px-[15px] md:w-1/2">
            <div className="float-left w-full relative">
              <Image
                src="/images/all/2.gif"
                alt="Live streaming companies in Kenya"
                width={600}
                height={450}
                className="w-full h-auto"
                unoptimized
              />
            </div>
          </div>

          {/* Right — animated skill bars */}
          <div className="w-full px-[15px] md:w-1/2">
            <div ref={barsRef} className="float-left w-full relative mt-[50px]">
              <h3 className="text-left text-[20px] font-bold text-white pb-5 relative
                before:content-[''] before:absolute before:bottom-2 before:left-0
                before:w-[30px] before:h-0.5 before:bg-brand-yellow">
                OUR CAPABILITIES
              </h3>
              <p className="text-white/80 text-sm mb-6">
                We offer an end-to-end approach to the content lifecycle and cut
                through the complexity for improved speed to market and relevance, at scale.
              </p>

              <div className="space-y-1">
                {SKILLS.map((skill) => (
                  <SkillBar
                    key={skill.label}
                    label={skill.label}
                    percent={skill.percent}
                    active={active}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-black/8 z-0 pointer-events-none" />

      <div className="sec-lines">
        <div className="container full-height">
          {[...Array(5)].map((_, i) => <div key={i} className="line-item" />)}
        </div>
      </div>
    </section>
  );
}
