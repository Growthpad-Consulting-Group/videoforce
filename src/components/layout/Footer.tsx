"use client";

import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

const SOCIAL = [
  { icon: "fa6-brands:facebook-f", label: "Facebook",  href: "https://facebook.com" },
  { icon: "fa6-brands:instagram",  label: "Instagram", href: "https://instagram.com" },
  { icon: "fa6-brands:x-twitter",  label: "Twitter/X", href: "https://twitter.com/growthpadea" },
  { icon: "fa6-brands:linkedin",   label: "LinkedIn",  href: "https://linkedin.com" },
];

export default function Footer() {
  const [email, setEmail]   = useState("");
  const [subMsg, setSubMsg] = useState("");
  const [showTop, setShowTop] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(520); // generous default

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    // Measure immediately and on resize
    const measure = () => setFooterHeight(el.offsetHeight);
    measure();

    // Also use ResizeObserver so dynamic content changes update the spacer
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Show scroll-to-top after 400px scroll
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setSubMsg("We will be in touch soon!");
      setEmail("");
    } catch {
      setSubMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Height emulator — keeps page content scrollable above the fixed footer */}
      <div className="z-1 float-left w-full relative" style={{ height: footerHeight }} />

      <footer
        ref={footerRef}
        className="fixed bg-brand-pink z-2 left-0 md:left-[80px] bottom-0 right-0 overflow-hidden"
      >
        <div className="relative z-3 pt-[60px] pb-[40px] md:pt-[110px] md:pb-[70px]">
          <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">

            <div className="flex flex-wrap -mx-[15px] gap-y-10 md:gap-y-0">

              {/* Col 1 — Brand name watermark — large vertical text on left edge */}
              <div className="w-full px-[15px] md:w-1/6 relative hidden md:block">
                {/*
                  "VIDEOFORCE" rotated -90deg, anchored to bottom-left of this column.
                  transformOrigin: bottom left means the text grows upward from the bottom.
                */}
                <span
                  className="absolute bottom-120 left-40 opacity-20 text-white font-bold text-[64px] tracking-[6px] uppercase whitespace-nowrap origin-bottom-left"
                  style={{ transform: "rotate(-90deg) translateX(-100%)" }}
                >
                  VideoForce
                </span>
              </div>

              {/* Col 2 — Last Twitts */}
              <div className="w-full px-[15px] md:w-5/12">
                <div className="float-left w-full relative text-left text-white text-xs font-semibold mb-5 pb-5 uppercase tracking-[2px] border-b border-dotted border-white/10">
                  <span className="pr-[10px] text-brand-yellow">01.</span>Last Twitts
                </div>
                <div className="float-left w-full relative">
                  <div className="float-left w-full relative" style={{ minHeight: 60, marginBottom: 16 }}>
                    <p className="text-left text-white/70 font-normal text-[11px]">
                      Follow us for the latest video content insights and updates.
                    </p>
                  </div>
                  <Button
                    variant="flat"
                    float
                    externalHref="https://twitter.com/growthpadea?lang=bg"
                    className="inline-flex items-center gap-2"
                  >
                    <Icon icon="fa6-brands:x-twitter" />
                    Follow
                  </Button>
                </div>
              </div>

              {/* Col 3 — Subscribe / Contacts */}
              <div className="w-full px-[15px] md:w-5/12">
                <div className="float-left w-full relative text-left text-white text-xs font-semibold mb-5 pb-5 uppercase tracking-[2px] border-b border-dotted border-white/10">
                  <span className="pr-[10px] text-brand-yellow">02.</span>Subscribe / Contacts
                </div>
                <div className="float-left w-full relative">
                  <p className="text-left text-white/70 font-normal">
                    Sign up for our email newsletters to access our perspective on video
                    content and strategy in an ever changing digital landscape delivered
                    to your Inbox monthly.
                  </p>

                  {/* Subscribe form */}
                  <div className="mt-7 flex float-left w-full relative">
                    <form
                      className="float-left w-full relative flex flex-col sm:flex-row"
                      id="subscribe"
                      onSubmit={handleSubscribe}
                    >
                      <input
                        type="text"
                        name="email"
                        id="subscribe-email"
                        placeholder="email"
                        spellCheck={false}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 min-w-0 border-none bg-white/10 px-5 py-[15px] text-white placeholder:text-white placeholder:font-normal placeholder:text-xs outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full sm:w-[35%] py-[15px] text-white border-none cursor-pointer bg-brand-purple text-xs uppercase tracking-widest font-semibold"
                      >
                        Send
                      </button>
                    </form>
                    {subMsg && <div className="text-white/70 text-xs mt-2 w-full">{subMsg}</div>}
                  </div>

                  {/* Contact details */}
                  <ul className="mt-5 pt-5 border-t border-dotted border-white/10 float-left w-full relative">
                    {[
                      { label: "Phone :", href: "tel:+254721314242",                   text: "+254721314242" },
                      { label: "Email :", href: "mailto:strategic@videoforce.co.ke",   text: "strategic@videoforce.co.ke" },
                      { label: "Address", href: "#",                                    text: "The Westwood Office, 6th Floor 6A, Comply Guide Advisory, Westlands, Nairobi, Kenya" },
                    ].map(({ label, href, text }) => (
                      <li
                        key={label}
                        className="flex flex-wrap w-full py-2 uppercase tracking-[2px] text-[11px] font-semibold"
                      >
                        <span className="text-left text-brand-purple pr-3 shrink-0">{label}</span>
                        <a href={href} className="text-left text-white break-words">{text}</a>
                      </li>
                    ))}
                  </ul>

                  {/* ── Social icons — added below contacts ── */}
                  <ul className="flex gap-3 list-none p-0 mt-7 float-left w-full">
                    {SOCIAL.map(({ icon, label, href }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="flex items-center justify-center w-9 h-9 border border-white/[0.08] text-white/40 text-xs transition-all duration-200 hover:rounded-full hover:text-white hover:border-white/30"
                        >
                          <Icon icon={icon} />
                        </a>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="bg-brand-purple h-[80px] z-3 px-4 md:px-[90px] flex items-center">
          <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
            <div className="text-white/70 font-medium text-[10px] uppercase tracking-[2px]">
              <span>&copy; VideoForce {new Date().getFullYear()} / All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Scroll-to-top — yellow square, slides up after 400px scroll ── */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={[
          "fixed bottom-0 right-0 w-[60px] h-[60px] z-[300]",
          "bg-brand-yellow text-white",
          "flex items-center justify-center",
          "transition-all duration-300 hover:brightness-110",
          showTop ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <Icon icon="fa6-solid:chevron-up" className="text-lg" />
      </button>
    </>
  );
}
