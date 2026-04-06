"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { IntroGateProvider, useIntroGate } from "@/context/IntroGateContext";

/** Marks intro as complete on non-home routes so shell chrome is not stuck hidden. */
function IntroPathSync() {
  const pathname = usePathname();
  const { setIntroComplete } = useIntroGate();

  useLayoutEffect(() => {
    if (pathname !== "/") setIntroComplete(true);
  }, [pathname, setIntroComplete]);

  return null;
}

export function IntroGateRoot({ children }: { children: React.ReactNode }) {
  return (
    <IntroGateProvider>
      <IntroPathSync />
      {children}
    </IntroGateProvider>
  );
}
