"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HomeLogoLink } from "@/components/brand/HomeLogoLink";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { Menu, Search } from "lucide-react";
import { useSiteSearch } from "@/context/SearchContext";
import { useShellIntroPlay } from "@/hooks/useShellIntroPlay";

type Props = {
  onMenuClick: () => void;
  navOpen: boolean;
};

/** Slight delay + tilt vs top bar — reveals after intro on home. */
export function MobileHeader({ onMenuClick, navOpen }: Props) {
  const { setOpen } = useSiteSearch();
  const { play } = useShellIntroPlay();
  const reduceMotion = useReducedMotion() === true;

  return (
    <motion.header
      initial={false}
      animate={
        play
          ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
          : {
              opacity: 0,
              y: reduceMotion ? 0 : -16,
              rotateX: reduceMotion ? 0 : -6,
              filter: reduceMotion ? "blur(0px)" : "blur(6px)",
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.2, delay: 0.04 }
          : {
              type: "spring",
              stiffness: 300,
              damping: 32,
              delay: 0.07,
              mass: 0.9,
            }
      }
      style={{ perspective: 900, transformStyle: "preserve-3d" }}
      className={`fixed left-0 right-0 top-[calc(env(safe-area-inset-top)+var(--utility-bar-inner))] z-[45] border-b border-[#1F3A5F]/10 bg-white shadow-sm lg:hidden ${
        play ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="flex h-14 items-center justify-between gap-2 px-3">
        <HomeLogoLink className="relative z-[1] flex h-10 min-h-[44px] min-w-0 flex-1 max-w-[220px] touch-manipulation items-center sm:max-w-[260px]">
          <SiteLogo className="h-10 w-auto max-w-full object-contain object-left" />
        </HomeLogoLink>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1F3A5F]/12 bg-[#F5F7FA] text-[#1F3A5F] transition hover:border-[#F68121]/40 active:scale-[0.98] touch-manipulation"
          aria-label="Open search"
        >
          <Search className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#1F3A5F]/12 bg-[#F5F7FA] text-[#1F3A5F] transition hover:border-[#F68121]/40 hover:text-[#1F3A5F] active:scale-[0.98] touch-manipulation"
          aria-expanded={navOpen}
          aria-controls="site-primary-nav"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </motion.header>
  );
}
