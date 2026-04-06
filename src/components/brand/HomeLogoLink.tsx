"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { scrollToHomeHeroTop } from "@/lib/home-hero";

type Props = Omit<ComponentProps<typeof Link>, "href">;

/**
 * Logo link to `/`. On the homepage, intercepts to scroll to the hero and clear hashes.
 * From other routes, uses default `Link` behaviour so Next.js performs client-side navigation
 * without a full document reload.
 */
export function HomeLogoLink({ onClick, ...props }: Props) {
  const pathname = usePathname();
  const atHome = pathname === "/";

  return (
    <Link
      href="/"
      scroll={!atHome}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (atHome) {
          e.preventDefault();
          scrollToHomeHeroTop();
        }
      }}
    />
  );
}
