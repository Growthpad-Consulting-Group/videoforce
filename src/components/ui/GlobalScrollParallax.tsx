"use client";

import { useEffect } from "react";

export default function GlobalScrollParallax() {
  useEffect(() => {
    // Find all elements to animate
    const getElements = () => {
      const subtitles = document.querySelectorAll(".section-subtitle");
      const dataElements = document.querySelectorAll("[data-y]");
      
      const list: { el: HTMLElement; yRange: number }[] = [];
      
      subtitles.forEach((el) => {
        // Only add if not already has data-y to prevent double additions
        if (!el.hasAttribute("data-y")) {
          list.push({ el: el as HTMLElement, yRange: -250 });
        }
      });
      
      dataElements.forEach((el) => {
        const val = parseFloat(el.getAttribute("data-y") || "0");
        if (val !== 0) {
          list.push({ el: el as HTMLElement, yRange: val });
        }
      });
      
      return list;
    };

    let items = getElements();

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      
      items.forEach(({ el, yRange }) => {
        // Find the nearest parent section or hero wrapper to base scrolling offsets on
        const parent = el.closest("section, .hero-wrap");
        if (!parent) return;
        
        const parentRect = parent.getBoundingClientRect();
        
        // If parent is visible in viewport
        if (parentRect.top < viewportHeight && parentRect.bottom > 0) {
          const totalDistance = viewportHeight + parentRect.height;
          const scrolledDistance = viewportHeight - parentRect.top;
          const progress = Math.max(0, Math.min(1, scrolledDistance / totalDistance));
          
          // Translate centered around 0px when the parent is centered in screen
          const translateY = (progress - 0.5) * yRange;
          
          el.style.transform = `translate3d(0, ${translateY}px, 0)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    // Initial call
    handleScroll();

    // Query elements again after a short delay to account for hydration/dynamic renders
    const timer = setTimeout(() => {
      items = getElements();
      handleScroll();
    }, 150);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return null;
}
