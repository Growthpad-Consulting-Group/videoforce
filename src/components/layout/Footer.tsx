"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(520);

  // Measure actual footer height for the height-emulator
  useEffect(() => {
    const measure = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const action =
        "https://kwst.us18.list-manage.com/subscribe/post?u=42df802713d4826a4b137cd9e&id=815d11e811";
      const fd = new FormData();
      fd.append("EMAIL", email);
      await fetch(action, { method: "POST", body: fd, mode: "no-cors" });
      setSubMsg("We will be in touch soon!");
      setEmail("");
    } catch {
      setSubMsg("Something went wrong. Please try again.");
    }
  };

  const SOCIAL = [
    { icon: "fa6-brands:facebook-f", label: "Facebook" },
    { icon: "fa6-brands:instagram",  label: "Instagram" },
    { icon: "fa6-brands:youtube",    label: "YouTube" },
    { icon: "fa6-brands:linkedin",   label: "LinkedIn" },
  ];

  return (
    <>
      {/* Height emulator — pushes page content above the fixed footer */}
      <div className="height-emulator fl-wrap" style={{ height: footerHeight }} />

      <footer className="main-footer fixed-footer" ref={footerRef}>
        <div className="footer-inner fl-wrap">
          <div className="container">
            <div className="partcile-dec" data-parcount="90" />

            <div className="row">
              {/* Col 1 — Brand name (rotated via CSS) */}
              <div className="col-md-2">
                <div className="footer-title fl-wrap">
                  <span>VideoForce</span>
                </div>
              </div>

              {/* Col 2 — Last Twitts */}
              <div className="col-md-5">
                <div className="footer-header fl-wrap">
                  <span>01.</span>Last Twitts
                </div>
                <div className="footer-box fl-wrap">
                  {/* Twitter feed replaced with static CTA since twitterFetcher API is deprecated */}
                  <div
                    className="twitter-swiper-container fl-wrap"
                    id="twitts-container"
                    style={{ minHeight: 60, marginBottom: 16 }}
                  >
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
                      Follow us for the latest video content insights and updates.
                    </p>
                  </div>
                  <a
                    className="btn float-btn trsp-btn"
                    href="https://twitter.com/growthpadea?lang=bg"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                  >
                    <Icon icon="fa6-brands:x-twitter" />
                    Follow
                  </a>
                </div>
              </div>

              {/* Col 3 — Subscribe / Contacts */}
              <div className="col-md-5">
                <div className="footer-header fl-wrap">
                  <span>02.</span>Subscribe / Contacts
                </div>
                <div className="footer-box fl-wrap">
                  <p>
                    Sign up for our email newsletters to access our perspective on video
                    content and strategy in an ever changing digital landscape delivered
                    to your Inbox monthly.
                  </p>

                  <div className="subcribe-form fl-wrap">
                    <form className="fl-wrap" id="subscribe" onSubmit={handleSubscribe}>
                      <input
                        className="enteremail"
                        id="subscribe-email"
                        name="email"
                        placeholder="email"
                        spellCheck={false}
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button className="subscribe-button" id="subscribe-button" type="submit">
                        Send
                      </button>
                    </form>
                    {subMsg && (
                      <div className="subscribe-message">{subMsg}</div>
                    )}
                  </div>

                  <div className="footer-contacts fl-wrap">
                    <ul>
                      <li>
                        <span>Phone :</span>
                        <a href="tel:+254721314242">+254721314242</a>
                      </li>
                      <li>
                        <span>Email :</span>
                        <a href="mailto:strategic@videoforce.co.ke">strategic@videoforce.co.ke</a>
                      </li>
                      <li>
                        <span>Address</span>
                        <a href="#">7TH FLOOR, MITSUMI BUSINESS PARK, MUTHITHI ROAD, WESTLANDS NAIROBI</a>
                      </li>
                    </ul>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="subfooter fl-wrap">
          <div className="container">
            <div className="policy-box">
              <span>&copy; VideoForce {new Date().getFullYear()} / All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
