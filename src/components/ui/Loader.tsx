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
        if (main) main.classList.add("loaded");
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
    <div className="loader-wrap" ref={wrapRef}>
      <div className="pin" />
    </div>
  );
}
