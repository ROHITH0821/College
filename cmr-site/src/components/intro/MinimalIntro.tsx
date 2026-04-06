"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useIntroGate } from "@/context/IntroGateContext";

/** Hold logo + tagline, then shutter slides up to reveal the site */
const HOLD_MS = 2100;
const SHUTTER_DURATION_S = 0.88;

const logoTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as const,
};

const taglineTransition = {
  duration: 0.5,
  delay: 0.35,
  ease: [0.16, 1, 0.3, 1] as const,
};

export function MinimalIntro() {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const { setIntroComplete } = useIntroGate();
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;
    if (prefersReduced) {
      setDone(true);
      setIntroComplete(true);
      return;
    }
    setMounted(true);
  }, [pathname, prefersReduced, setIntroComplete]);

  useEffect(() => {
    if (!mounted || exiting || done) return;
    const t = window.setTimeout(() => setExiting(true), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [mounted, exiting, done]);

  useEffect(() => {
    if (!exiting) return;
    const t = window.setTimeout(() => setDone(true), SHUTTER_DURATION_S * 1000 + 60);
    return () => window.clearTimeout(t);
  }, [exiting]);

  useEffect(() => {
    if (done) {
      setIntroComplete(true);
    }
  }, [done, setIntroComplete]);

  useEffect(() => {
    if (!mounted || done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted, done]);

  if (done || !mounted) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden px-6 will-change-transform ${
        exiting ? "pointer-events-none" : ""
      }`}
      style={{ height: "100dvh", top: 0, left: 0, right: 0 }}
      initial={{ y: 0 }}
      animate={{ y: exiting ? "-100%" : 0 }}
      transition={{
        duration: SHUTTER_DURATION_S,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      <div className="absolute inset-0 bg-[#ffffff]" aria-hidden />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-2 text-center md:max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={logoTransition}
          className="relative h-[min(44vw,240px)] w-[min(92vw,720px)] sm:h-[min(36vw,280px)] sm:w-[min(88vw,760px)] md:h-[min(320px,34vw)] md:w-[min(800px,86vw)]"
        >
          <SiteLogo
            className="h-full w-full object-contain object-center"
            style={{
              filter: "drop-shadow(0 4px 24px rgba(31, 58, 95, 0.06))",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={taglineTransition}
          className="mt-8 max-w-lg font-display text-[1.1rem] font-medium leading-snug tracking-tight text-[#1F3A5F]/95 sm:mt-10 sm:text-2xl md:text-[1.65rem]"
        >
          Explore to Invent
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...taglineTransition, delay: 0.48 }}
          className="mt-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#F68121]/90 sm:text-xs"
        >
          UGC Autonomous
        </motion.p>
      </div>
    </motion.div>
  );
}
