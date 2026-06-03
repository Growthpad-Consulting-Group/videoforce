"use client";

import { useEffect, useState } from "react";

/**
 * Uses IntersectionObserver to track which section is currently in view.
 * Replaces the jQuery singlePageNav + scrollToFixed plugins.
 *
 * @param sectionIds - Array of section element IDs (without #) to observe
 * @param threshold  - Intersection threshold (0–1). Default 0.4
 */
export function useActiveSection(
  sectionIds: string[],
  threshold = 0.4
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { threshold }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [sectionIds, threshold]);

  return activeId;
}
