"use client";

import { useEffect, useRef } from "react";

export default function Loader() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hide = () => {
      const wrap = wrapRef.current;
      const main = document.getElementById("main");
      if (!wrap) return;
      wrap.style.transition = "opacity 0.3s ease";
      wrap.style.opacity = "0";
      setTimeout(() => {
        wrap.style.display = "none";
        // Reveal the main content by setting opacity directly (avoids needing #main.loaded CSS)
        if (main) {
          main.style.opacity = "1";
        }
      }, 350);
    };

    if (document.readyState === "complete") {
      setTimeout(hide, 300);
    } else {
      window.addEventListener("load", hide);
      const fallback = setTimeout(hide, 4000);
      return () => {
        window.removeEventListener("load", hide);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    /* .loader-wrap: fixed, full screen, z-200, bg-brand-pink */
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[200] overflow-hidden bg-[#bb0168]"
    >
      {/*
        .pin — the animated "Loading / VideoForce :" text
        position: absolute; top:50%; left:30%; margin-left:50px
        ::after pseudo "VideoForce : " and ::before animated "Loading" text
        are CSS-only with @keyframes pinanim — kept in globals.css @theme
      */}
      <div className="pin" />
    </div>
  );
}
