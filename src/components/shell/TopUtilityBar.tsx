"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TOP_UTILITY_LINKS } from "@/constants/top-utility-links";
import { useShellIntroPlay } from "@/hooks/useShellIntroPlay";

/** First N links shown inline on small screens; rest go under “More”. */
const PRIMARY_LINK_COUNT = 2;

/** Navy strip — slides down + de-blurs after home intro. */
export function TopUtilityBar() {
  const { play } = useShellIntroPlay();
  const reduceMotion = useReducedMotion() === true;
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const primaryLinks = TOP_UTILITY_LINKS.slice(0, PRIMARY_LINK_COUNT);
  const extraLinks = TOP_UTILITY_LINKS.slice(PRIMARY_LINK_COUNT);

  useEffect(() => {
    if (!moreOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  const linkClass =
    "whitespace-nowrap rounded px-0.5 py-1 text-[9px] font-semibold uppercase leading-none tracking-wide text-white/95 transition hover:text-[#F68121] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F68121] sm:text-[10px] sm:leading-tight md:text-[11px] lg:text-[13px]";

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
      <div className="mx-auto flex h-[var(--utility-bar-inner)] max-w-full items-center gap-2 overflow-visible px-2.5 sm:gap-3 sm:px-4 lg:px-6">
        <span
          className="max-w-[min(11rem,42vw)] shrink-0 truncate text-[9px] font-bold uppercase leading-tight tracking-[0.08em] text-white/95 sm:max-w-none sm:text-[10px] sm:tracking-[0.1em] md:text-[11px] md:leading-none md:tracking-[0.12em] lg:text-xs"
          title="EAMCET CODE: CMRN"
        >
          EAMCET CODE: CMRN
        </span>

        {/* Large screens: all links in one row (no horizontal scroll) */}
        <div className="hidden min-h-0 min-w-0 flex-1 items-center justify-end lg:flex">
          <ul className="flex w-full items-center justify-end gap-x-4 lg:gap-x-6">
            {TOP_UTILITY_LINKS.map((item) => (
              <li key={item.href} className="flex shrink-0 items-center">
                <Link href={item.href} scroll className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Small / medium: primary links + More (dropdown for the rest) */}
        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-end gap-2 lg:hidden">
          <ul className="flex w-max min-w-0 shrink-0 flex-nowrap items-center gap-x-2 sm:gap-x-3">
            {primaryLinks.map((item) => (
              <li key={item.href} className="flex shrink-0 items-center">
                <Link href={item.href} scroll className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {extraLinks.length > 0 && (
            <div ref={moreRef} className="relative shrink-0">
              <button
                type="button"
                id="utility-more-trigger"
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                aria-controls="utility-more-menu"
                onClick={() => setMoreOpen((o) => !o)}
                className="inline-flex items-center gap-0.5 rounded-md border border-white/20 bg-white/[0.06] px-1.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-white/95 transition hover:border-[#F68121]/50 hover:bg-white/[0.1] hover:text-[#F68121] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F68121] sm:text-[10px] sm:px-2"
              >
                More
                <ChevronDown
                  className={`h-3.5 w-3.5 shrink-0 text-white/80 transition-transform duration-200 sm:h-4 sm:w-4 ${moreOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              {moreOpen && (
                <div
                  id="utility-more-menu"
                  role="menu"
                  aria-labelledby="utility-more-trigger"
                  className="absolute right-0 top-full z-[70] mt-1 min-w-[min(18rem,calc(100vw-1rem))] rounded-lg border border-white/15 bg-[#0c1f3a] py-1 shadow-[0_16px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
                >
                  {extraLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      scroll
                      role="menuitem"
                      className="block px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-white/95 transition hover:bg-white/[0.08] hover:text-[#F68121] sm:text-xs"
                      onClick={() => setMoreOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
