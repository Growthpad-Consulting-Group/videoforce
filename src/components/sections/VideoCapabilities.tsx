"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { useEffect, useRef, useState } from "react";

const PIECHARTS = [
  { label: "Advertising", percent: 99 },
  { label: "Fundraising", percent: 99 },
  { label: "Educating",   percent: 99 },
];

const SIZE   = 150;
const STROKE = 40;
const R      = (SIZE - STROKE) / 2;
const CIRC   = 2 * Math.PI * R;

/** Animates a donut SVG arc from 0 to `percent` over `duration`ms */
function DonutChart({
  percent,
  label,
  active,
}: {
  percent: number;
  label: string;
  active: boolean;
}) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const duration = 1800;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayed(eased * percent);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, percent]);

  const filled = (displayed / 100) * CIRC;
  const gap    = 2;

  return (
    <div className="flex flex-col items-center mr-0 md:mr-[90px] mb-5">
      {/* SVG donut */}
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Track */}
          <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="#eee" strokeWidth={STROKE} />
          {/* Animated arc */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="#fac921"
            strokeWidth={STROKE}
            strokeLinecap="butt"
            strokeDasharray={`${Math.max(0, filled - gap)} ${CIRC - Math.max(0, filled - gap)}`}
            strokeDashoffset={0}
          />
        </svg>
        {/* Percentage label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[18px] font-bold text-brand-purple">
            {Math.round(displayed)}%
          </span>
        </div>
      </div>

      {/* Label */}
      <h4 className="mt-3 border border-[#eee] px-5 py-1.5 text-xs font-semibold text-[#666] text-center bg-white min-w-[100px] tracking-[1px]">
        {label}
      </h4>
    </div>
  );
}

export default function VideoCapabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section>
      <SectionTitle subtitle="// attainments" />

      <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
        <div ref={sectionRef} className="float-left w-full relative mb-[50px] py-[10px]">
          <div className="flex flex-wrap mx-[-15px]">

            {/* Left — description */}
            <div className="w-full px-[15px] md:w-1/2 lg:w-1/3">
              <div className="float-left w-full relative">
                <h3 className="float-left text-[24px] text-left font-bold">
                  Some of the capabilities of a video
                </h3>
                <span className="float-left w-full pt-[10px] text-[11px] leading-6 pb-[10px] font-medium text-[#131212] text-left">
                  A video can be used in your business in the following illustrated ways
                </span>
              </div>
            </div>

            {/* Right — animated donut charts */}
            <div className="w-full px-[15px] md:w-2/3">
              <div className="flex flex-wrap items-start gap-5">
                {PIECHARTS.map(({ label, percent }) => (
                  <DonutChart key={label} percent={percent} label={label} active={active} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="sec-lines">
        <div className="container full-height">
          {[...Array(5)].map((_, i) => <div key={i} className="line-item" />)}
        </div>
      </div>
    </section>
  );
}
