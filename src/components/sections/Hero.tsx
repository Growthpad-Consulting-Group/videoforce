"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero-wrap" id="sec1">
      {/* hero-inner must fill full viewport height */}
      <div className="hero-inner fl-wrap full-height">

        {/* ── Left text content ──────────────────────────────────────── */}
        <div className="half-hero-wrap">
          <h1>
            {/* Logo inside h1, exactly as original */}
            <img
              src="/images/logo2.png"
              width={180}
              alt="Best video production companies in Nairobi"
              style={{ display: "inline-block" }}
            />
            <br />
            Video content for
            <br />
            <span>digital</span> audiences.
          </h1>
          <h4>From script to screen. (And everything in-between)</h4>
          <div className="clearfix" />
          <Link
            href="/contacts"
            className="custom-scroll-link btn float-btn flat-btn color-btn mar-top"
          >
            Contact Us
          </Link>
        </div>

        {/* ── Right video background ─────────────────────────────────── */}
        <div className="media-container">
          <div className="video-mask" />
          <div className="video-holder">
            {/* Mobile fallback image */}
            <div
              className="bg mob-bg"
              style={{ backgroundImage: "url(/images/bg/1.jpg)" }}
            />
            {/* Desktop background video */}
            <div className="video-container">
              <video autoPlay loop muted playsInline className="bgvid">
                <source
                  src="https://embed-fastly.wistia.com/deliveries/ffc22458e43ca14b13443c2ef80a44b691c5c73c.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>

        {/* Dark overlay */}
        <div className="overlay" />

        {/* ── Decorative rotating words (right side, vertical) ──────── */}
        {/* Original renders all 4 divs; jQuery rotaterator shows one at a time.
            We show all 4 stacked — the CSS positions them absolutely on top of
            each other. A CSS animation cycles opacity to replicate rotaterator. */}
        <div className="hero-decor-let">
          <div className="hero-decor-word" style={{ animationDelay: "0s" }}>Animation</div>
          <div className="hero-decor-word" style={{ animationDelay: "1.7s" }}>
            <span>Voiceovers</span>
          </div>
          <div className="hero-decor-word" style={{ animationDelay: "3.4s" }}>Photography</div>
          <div className="hero-decor-word" style={{ animationDelay: "5.1s" }}>
            <span>Video Ads</span>
          </div>
        </div>

        {/* ── Phone number ──────────────────────────────────────────── */}
        <div className="hero-decor-numb">
          <span> +254 701 850 850 </span>
          <a
            href="tel:+254701850850"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-decor-numb-tooltip"
          >
            Call Us
          </a>
        </div>

        {/* Decorative elements */}
        <div className="pattern-bg" />
        <div className="hero-line-dec" />
      </div>
    </div>
  );
}
