"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: `/#${string}`;
};

export function scrollToHomeSectionElement(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** After client navigation to `/#id` from another route — wait for the home page to mount. */
export function scheduleScrollToHomeSectionElement(id: string) {
  const maxMs = 4000;
  const start = performance.now();
  const tick = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (performance.now() - start < maxMs) {
      requestAnimationFrame(tick);
    }
  };
  requestAnimationFrame(tick);
}

/**
 * Homepage section anchors (`/#section-id`). On `/`, smooth-scroll in place; otherwise `Link`
 * handles client-side navigation (no full document reload).
 */
export function HomeSectionLink({ href, onClick, ...props }: Props) {
  const pathname = usePathname();
  const id = href.slice(2);
  const atHome = pathname === "/";

  return (
    <Link
      href={href}
      scroll={false}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;

        if (atHome) {
          e.preventDefault();
          scrollToHomeSectionElement(id);
          window.history.replaceState(null, "", href);
        } else {
          scheduleScrollToHomeSectionElement(id);
        }
      }}
    />
  );
}
