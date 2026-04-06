"use client";

import { createContext, useContext, useMemo, useState } from "react";

type IntroGateContextValue = {
  introComplete: boolean;
  setIntroComplete: (value: boolean) => void;
};

const IntroGateContext = createContext<IntroGateContextValue | null>(null);

export function IntroGateProvider({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);
  const value = useMemo(
    () => ({ introComplete, setIntroComplete }),
    [introComplete]
  );
  return <IntroGateContext.Provider value={value}>{children}</IntroGateContext.Provider>;
}

export function useIntroGate() {
  const ctx = useContext(IntroGateContext);
  if (!ctx) {
    throw new Error("useIntroGate must be used within IntroGateProvider");
  }
  return ctx;
}
