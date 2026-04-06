"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { TOP_UTILITY_LINKS } from "@/constants/top-utility-links";
import { useShellIntroPlay } from "@/hooks/useShellIntroPlay";

/** Navy strip — slides down + de-blurs after home intro. */
export function TopUtilityBar() {
  const { play } = useShellIntroPlay();
  const reduceMotion = useReducedMotion() === true;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const updateScrollHint = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const overflow = scrollWidth > clientWidth + 1;
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 2;
    setShowScrollHint(overflow && !atEnd);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollHint();
    const ro = new ResizeObserver(updateScrollHint);
    ro.observe(el);
    window.addEventListener("resize", updateScrollHint);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateScrollHint);
    };
  }, [updateScrollHint]);

  return (
    <motion.div
      role="navigation"
      aria-label="Quick links"
      initial={false}
      animate={
        play
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : {
              opacity: 0,
              y: reduceMotion ? 0 : -22,
              filter: reduceMotion ? "blur(0px)" : "blur(8px)",
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.2 }
          : {
              type: "spring",
              stiffness: 320,
              damping: 34,
              mass: 0.85,
              delay: 0,
            }
      }
      className={`fixed inset-x-0 top-0 z-[60] border-b border-white/10 bg-[#0c1f3a] pt-[env(safe-area-inset-top)] text-white shadow-[0_1px_0_rgba(0,0,0,0.2)] ${
        play ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/**
       * Below md: two rows — badge, then full-width link strip (horizontal scroll, no overlap).
       * md+: one row; links scroll in the remaining width when needed.
       */}
      <div className="mx-auto flex h-[var(--utility-bar-inner)] w-full max-w-full flex-col justify-center gap-1 px-2.5 py-1 md:flex-row md:items-center md:gap-3 md:px-4 md:py-0 lg:px-6">
        <span className="shrink-0 text-[10px] font-bold uppercase leading-tight tracking-[0.1em] text-white/95 md:text-[11px] md:tracking-[0.12em] lg:text-xs">
          EAMCET CODE: CMRN
        </span>

        <div className="relative min-h-0 min-w-0 w-full flex-1">
          <div
            ref={scrollRef}
            onScroll={updateScrollHint}
            className="touch-pan-x overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25"
          >
            <ul
              className={`flex w-max shrink-0 flex-nowrap items-center gap-x-3 md:ml-auto md:justify-end md:gap-x-4 lg:gap-x-5 ${
                showScrollHint ? "pr-8 md:pr-10" : "pr-1 md:pr-2"
              }`}
            >
              {TOP_UTILITY_LINKS.map((item) => (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    scroll
                    className="block whitespace-nowrap rounded px-0.5 py-0.5 text-[10px] font-semibold uppercase leading-none tracking-wide text-white/95 transition hover:text-[#F68121] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F68121] md:text-[11px] lg:text-[13px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {showScrollHint ? (
            <div
              className="pointer-events-none absolute inset-y-0 right-0 flex w-9 items-center justify-end bg-gradient-to-l from-[#0c1f3a] via-[#0c1f3a]/90 to-transparent pl-3 md:w-10"
              aria-hidden
            >
              <ChevronRight className="h-4 w-4 shrink-0 text-white/80 md:h-[18px] md:w-[18px]" strokeWidth={2.5} />
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
