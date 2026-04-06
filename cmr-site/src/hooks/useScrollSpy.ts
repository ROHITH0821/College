"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is active. If `hero` is included, it is driven by scroll
 * position (fixed hero stays in view, so it is not reliable with IntersectionObserver alone).
 */
export function useScrollSpy(sectionIds: readonly string[], offset = 120) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const hasHero = sectionIds.includes("hero");
    const otherIds = sectionIds.filter((id) => id !== "hero");

    const elements = otherIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const heroStillPrimary = () => {
      if (!hasHero) return false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      return y < vh * 0.98;
    };

    const applyHeroIfNeeded = () => {
      if (heroStillPrimary()) {
        setActiveId("hero");
        return true;
      }
      return false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (applyHeroIfNeeded()) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    const onScroll = () => {
      applyHeroIfNeeded();
    };

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    applyHeroIfNeeded();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionIds, offset]);

  return activeId;
}
