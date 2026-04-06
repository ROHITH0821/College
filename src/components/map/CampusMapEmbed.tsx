"use client";

import { ExternalLink, MapPinned } from "lucide-react";
import {
  getGoogleMapsEmbedUrl,
  getGoogleMapsOpenUrl,
} from "@/constants/location";

type Props = {
  className?: string;
  /** Shorter height on stacked layouts */
  compact?: boolean;
};

export function CampusMapEmbed({ className = "", compact = false }: Props) {
  const embedSrc = getGoogleMapsEmbedUrl();
  const openHref = getGoogleMapsOpenUrl();

  return (
    <div className={className}>
      <div
        className={`relative w-full overflow-hidden rounded-2xl border border-[#1F3A5F]/12 bg-white/60 shadow-[0_20px_60px_rgba(31,58,95,0.1)] ring-1 ring-[#1F3A5F]/[0.06] backdrop-blur-sm ${
          compact ? "min-h-[220px]" : "min-h-[280px] md:min-h-[360px]"
        }`}
      >
        <iframe
          title="Campus location on Google Maps"
          src={embedSrc}
          className="absolute inset-0 h-full w-full border-0 grayscale-[0.15] contrast-[1.02]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={openHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1F3A5F] transition hover:text-[#F68121]"
      >
        <MapPinned className="h-4 w-4 shrink-0 text-[#F68121]" aria-hidden />
        Open in Google Maps
        <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
      </a>
    </div>
  );
}
