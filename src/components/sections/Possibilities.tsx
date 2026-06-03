"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { num: 400, label: "Videos Produced" },
  { num: 100, label: "Clients" },
  { num: 5,   label: "Years Experience" },
  { num: 10,  label: "Team Members" },
];

const ITEMS = [
  { icon: "fa6-solid:rocket",            label: "Launching Products", desc: "Make a splash when unveiling your latest product, service, or initiative. Our launch videos generate buzz and excite audiences." },
  { icon: "fa6-solid:bullhorn",           label: "Advertising",        desc: "Expand your reach and drive real results with targeted video ad campaigns across social media and YouTube." },
  { icon: "fa6-solid:hand-holding-heart", label: "Fundraising",        desc: "Tug at heartstrings and open wallets by sharing your cause through creative and inspiring fundraising videos." },
  { icon: "fa6-solid:chalkboard",         label: "Educating",          desc: "Foster deeper understanding and boost engagement with informative, entertaining explainer videos." },
];

/** Counts from 0 to `target` over `duration`ms once `active` becomes true */
function useCountUp(target: number, duration = 2000, active = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return value;
}

function StatItem({ num, label, active }: { num: number; label: string; active: boolean }) {
  const count = useCountUp(num, 2000, active);
  return (
    <div className="px-5 text-left mb-5">
      <div className="text-[44px] font-bold text-white tabular-nums">{count}+</div>
      <div className="mt-1.5 text-white/50 text-[10px] font-medium tracking-[2px] uppercase py-3 px-[30px] bg-black/30 relative
        before:content-[''] before:absolute before:top-1/2 before:left-[-40px] before:w-5 before:h-0.5 before:-translate-y-1/2 before:bg-brand-yellow">
        {label}
      </div>
    </div>
  );
}

export default function Possibilities() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  // Trigger count-up once the stats section enters the viewport
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative float-left w-full py-[120px] !bg-brand-pink overflow-hidden">
      {/* Right-side background image */}
      <div
        className="absolute top-0 right-0 w-[60%] h-[120%] bg-cover bg-center z-1"
        style={{ backgroundImage: "url(/images/bg/1.jpg)" }}
      />
      <div className="absolute top-0 right-0 w-[60%] h-full bg-black/50 z-2" />

      {/* "NUMBERS" rotated watermark */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-3 pointer-events-none select-none">
        <span
          className="block text-white/15 font-black text-[120px] tracking-[6px] uppercase whitespace-nowrap leading-none"
          style={{ transform: "rotate(-90deg)", transformOrigin: "left center" }}
        >
          NUMBERS
        </span>
      </div>

      <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
        {/* Heading */}
        <div className="pl-0 md:pl-[50px] mb-[50px] text-left relative">
          <h2 className="text-[40px] font-extrabold uppercase text-white pb-[30px]">
            DIVE INTO ENDLESS <br />
            <span className="text-brand-yellow">POSSIBILITIES,</span> ONE <br />
            FRAME AT A TIME
          </h2>
          <p className="text-white text-sm leading-[30px]">
            Video is one of the most versatile and impactful mediums out there.
            At Video Force, we help clients harness the potential of video for:
          </p>

          <ul className="mt-4 list-none p-0 space-y-3">
            {ITEMS.map(({ icon, label, desc }) => (
              <li key={label} className="text-white text-base leading-[30px]">
                <Icon icon={icon} className="text-brand-yellow mr-2 inline" />
                <span className="text-brand-yellow">{label} — </span>
                {desc}
              </li>
            ))}
          </ul>

          <p className="text-white text-sm leading-[30px] mt-3">
            We collaborate closely to create custom video content that delivers on your unique goals.
          </p>
        </div>

        {/* Stats — count up when they scroll into view */}
        <div ref={statsRef} className="flex flex-wrap gap-x-10 relative z-5">
          {STATS.map(({ num, label }) => (
            <StatItem key={label} num={num} label={label} active={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
