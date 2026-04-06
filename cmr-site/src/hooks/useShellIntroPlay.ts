"use client";

import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useIntroGate } from "@/context/IntroGateContext";

/** True after home intro ends, or immediately on any non-home route. */
export function useShellIntroPlay() {
  const { introComplete } = useIntroGate();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion() === true;
  const play = introComplete || pathname !== "/";
  return { play, reduceMotion };
}
