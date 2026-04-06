"use client";

import type { RecruiterLogo } from "@/data/recruiter-logos";

type Props = {
  name: RecruiterLogo["name"];
  logoSrc: RecruiterLogo["logoSrc"];
};

/**
 * Crisp brand logos (SVG = resolution-independent / “HD” in the browser).
 * Uses a plain <img> so external SVG/PNG CDNs work without Next Image SVG config.
 */
export function PartnerLogo({ name, logoSrc }: Props) {
  return (
    <span className="relative flex h-14 w-[140px] items-center justify-center rounded-lg border border-[#1F3A5F]/10 bg-white px-4 py-3 shadow-[0_2px_12px_rgba(31,58,95,0.08)] md:h-16 md:w-[168px]">
      <img
        src={logoSrc}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="h-10 w-auto max-h-11 max-w-[132px] object-contain object-center md:h-11 md:max-w-[148px]"
      />
      <span className="sr-only">{name}</span>
    </span>
  );
}
