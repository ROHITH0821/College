"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { scrollToHomeHeroTop } from "@/lib/home-hero";

type Props = Omit<ComponentProps<typeof Link>, "href">;

/**
 * Logo → `/`. Cross-route clicks use `router.push` so navigation stays App Router client-side
 * (no full document reload). On `/`, scroll to hero top and clear hash.
 */
export function HomeLogoLink({ onClick, ...props }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const atHome = pathname === "/";

  return (
    <Link
      href="/"
      prefetch
      scroll={false}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
        if (typeof e.button === "number" && e.button !== 0) return;

        if (atHome) {
          e.preventDefault();
          scrollToHomeHeroTop();
          return;
        }

        e.preventDefault();
        router.push("/", { scroll: true });
      }}
    />
  );
}
