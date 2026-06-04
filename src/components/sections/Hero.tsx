"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";

export default function Hero() {
  return (
    /*
      .hero-wrap: float-left w-full h-screen overflow-hidden relative z-4 bg-brand-pink
      Responsive: md:pb-[60px], desktop pb-[80px]
    */
    <div
      className="float-left w-full h-screen overflow-hidden relative z-[4] bg-[#bb0168] pb-[80px] md:pb-[60px]"
      id="sec1"
    >
      {/* .hero-inner .full-height */}
      <div className="overflow-hidden w-full h-full relative">

        {/* ── Left text content — .half-hero-wrap ────────────────────── */}
        {/*
          position: absolute; left: 25%; top: 29%; z-index: 10
          Responsive: md: left:10% top:20%, sm: left:5% right:5% top:15%
        */}
        <div className="absolute left-[5%] right-[5%] top-[15%] z-[10] md:left-[25%] md:right-auto md:top-[29%]">
          {/*
            h1: color:#fff, font-size:50px, font-weight:600, line-height:70px, pb-[30px], relative
            ::before: position:absolute top:-30px left:0 w:[50px] h:[4px] border 1px solid rgba(255,255,255,0.21)
            Responsive: md:text-[34px] md:leading-[50px], sm:text-[26px] sm:leading-[40px]
          */}
          <h1 className="text-white text-[50px] font-semibold leading-[70px] pb-[30px] relative
            before:content-[''] before:absolute before:top-[-30px] before:left-0 before:w-[50px] before:h-[4px] before:border before:border-white/20
            md:text-[34px] md:leading-[50px] max-sm:text-[26px] max-sm:leading-[40px]">
            <Image
              src="/images/logo2.png"
              width={180}
              height={60}
              alt="Best video production companies in Nairobi"
              className="inline-block"
            />
            <br />
            Video content for
            <br />
            <span className="text-[#fac921]">digital</span> audiences.
          </h1>

          {/* h4: bg rgba(0,0,0,0.21), text-white/70, uppercase, letter-spacing */}
          <h4 className="px-[30px] py-[15px] bg-black/20 text-left text-[11px] float-left uppercase text-white/70 tracking-[6px] font-semibold">
            From script to screen. (And everything in-between)
          </h4>

          <div className="clear-both" />

          <Button variant="color" float href="/contacts" className="mt-[50px]">
            Contact Us
          </Button>
        </div>

        {/* ── Video background — .media-container ────────────────────── */}
        {/* position: absolute; inset:0; z-index:2; overflow:hidden */}
        <div className="absolute inset-0 z-[2] overflow-hidden">
          {/* .video-holder: absolute inset:0 z-1 */}
          <div className="absolute inset-0 z-[1]">
            {/* Mobile fallback — .mob-bg: hidden on desktop, block on mobile */}
            <div
              className="hidden max-md:block absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/bg/1.jpg)" }}
            />
            {/* Desktop video — .video-container absolute inset:0 */}
            <div className="absolute inset-0">
              {/* .bgvid: w-full h-full object-cover */}
              <video autoPlay loop muted playsInline className="w-full h-full object-cover max-md:hidden">
                <source
                  src="https://embed-fastly.wistia.com/deliveries/ffc22458e43ca14b13443c2ef80a44b691c5c73c.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>

        {/* Dark overlay — .overlay: absolute inset:0 bg-black/40 z-3 */}
        <div className="absolute inset-0 bg-black/40 z-[3]" />

        {/* ── Decorative rotating words — hidden on mobile ─────────── */}
        <div className="hidden md:block absolute right-[53px] top-[43%] z-[20] text-brand-yellow text-[10px] tracking-[10px] uppercase font-medium rotate-90 whitespace-nowrap">
          {/* .hero-decor-word — position:absolute top:0 left:0, cycles opacity via CSS animation */}
          <div className="hero-decor-word absolute top-0 left-0" style={{ animationDelay: "0s" }}>Animation</div>
          <div className="hero-decor-word absolute top-0 left-0" style={{ animationDelay: "1.7s" }}>
            <span>Voiceovers</span>
          </div>
          <div className="hero-decor-word absolute top-0 left-0" style={{ animationDelay: "3.4s" }}>Photography</div>
          <div className="hero-decor-word absolute top-0 left-0" style={{ animationDelay: "5.1s" }}>
            <span>Video Ads</span>
          </div>
        </div>

        {/* ── Phone number strip — hidden on mobile ────────────────── */}
        <a
          href="tel:+254701850850"
          className="hidden md:block absolute z-[20] left-[40%] top-[40px] pl-[80px] cursor-pointer overflow-hidden group"
        >
          {/* Yellow bar decorating the left side */}
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[40px] h-[2px] bg-brand-yellow block" />

          {/* Phone number — slides up and fades on hover */}
          <span className="block text-white tracking-[10px] text-[10px] uppercase transition-all duration-200 group-hover:-translate-y-full group-hover:opacity-0">
            +254 701 850 850
          </span>
          {/* "Call Us" tooltip — slides in from below on hover */}
          <span className="absolute left-[80px] top-0 block text-brand-yellow tracking-[10px] text-[10px] uppercase transition-all duration-200 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            Call Us
          </span>
        </a>

        {/* .pattern-bg: absolute bottom:0 right:0 w-1/2 h-[30%] z-3 bg-pattern opacity-20 */}
        <div className="pattern-bg" />

        {/* .hero-line-dec: absolute decorative white line */}
        <div className="absolute bottom-[50px] left-[35%] w-[60px] h-px bg-white/40 z-[26] -ml-[30px]" />
      </div>
    </div>
  );
}
