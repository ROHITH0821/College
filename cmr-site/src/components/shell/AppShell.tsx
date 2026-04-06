"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SearchProvider } from "@/context/SearchContext";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { MobileHeader } from "@/components/shell/MobileHeader";
import { TopUtilityBar } from "@/components/shell/TopUtilityBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  /**
   * After any client-side route change, scroll the main document to the top so the new page
   * starts at the correct position. Skip when the URL has a hash so `/#section`, `/page#id`, etc.
   * keep working (HomeSectionLink and the browser handle those). `setTimeout(0)` runs after the
   * address bar updates so we don’t win over hash navigation.
   */
  useLayoutEffect(() => {
    const t = window.setTimeout(() => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) return;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <SearchProvider>
      <div className="relative min-h-screen">
        <TopUtilityBar />
        <GlobalSearch />
        <MobileHeader
          onMenuClick={() => setMobileNavOpen(true)}
          navOpen={mobileNavOpen}
        />
        {mobileNavOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[1px] lg:hidden"
            onClick={() => setMobileNavOpen(false)}
          />
        )}
        <Sidebar
          mobileOpen={mobileNavOpen}
          onMobileClose={() => setMobileNavOpen(false)}
        />
        <div className="min-h-screen bg-[#F5F7FA] pl-[var(--sidebar-offset)] pt-[calc(env(safe-area-inset-top)+var(--utility-bar-inner)+3.5rem)] transition-[padding] duration-300 ease-out lg:pt-[var(--utility-bar-inner)]">
          {children}
        </div>
      </div>
    </SearchProvider>
  );
}
