"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { TOP_UTILITY_LINKS } from "@/constants/top-utility-links";
import { useShellIntroPlay } from "@/hooks/useShellIntroPlay";

/** Navy strip — slides down + de-blurs after home intro. */
export function TopUtilityBar() {
  const { play } = useShellIntroPlay();
  const reduceMotion = useReducedMotion() === true;

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
      <div className="mx-auto flex h-[var(--utility-bar-inner)] max-w-[100vw] flex-nowrap items-center justify-between gap-x-3 overflow-x-auto px-3 sm:px-4 lg:px-6 [scrollbar-width:thin]">
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-white/95 sm:text-xs">
          EAMCET CODE: CMRN
        </span>
        <div className="flex min-w-0 flex-1 justify-end overflow-x-auto sm:flex-none sm:overflow-visible">
          <ul className="flex w-max min-w-0 max-w-full flex-nowrap items-center justify-end gap-x-0 text-[11px] font-semibold uppercase tracking-wide text-white/95 sm:text-xs md:text-[13px]">
            {TOP_UTILITY_LINKS.map((item, i) => (
              <li key={item.href} className="flex items-center">
                {i > 0 && (
                  <span className="mx-1.5 h-3 w-px shrink-0 bg-white/25 sm:mx-2" aria-hidden />
                )}
                <Link
                  href={item.href}
                  scroll
                  className="shrink-0 rounded px-0.5 py-0.5 transition hover:text-[#F68121] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F68121]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
