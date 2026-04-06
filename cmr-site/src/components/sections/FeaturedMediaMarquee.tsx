"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  FEATURED_MEDIA_LOGOS,
  type FeaturedMediaLogo,
} from "@/data/featured-media-logos";

function faviconSources(domain: string): string[] {
  const d = domain.trim();
  const base = [
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(d)}&sz=256`,
    `https://logo.clearbit.com/${d}`,
    `https://icons.duckduckgo.com/ip3/${d}.ico`,
  ];
  if (d.startsWith("www.")) {
    const bare = d.slice(4);
    base.push(
      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(bare)}&sz=256`,
      `https://logo.clearbit.com/${bare}`,
      `https://icons.duckduckgo.com/ip3/${bare}.ico`,
    );
  }
  return base;
}

function DomainOutletLogo({
  domain,
  alt,
  className,
}: {
  domain: string;
  alt: string;
  className: string;
}) {
  const sources = useMemo(() => faviconSources(domain), [domain]);
  const [idx, setIdx] = useState(0);

  if (idx >= sources.length) {
    return (
      <span className="max-w-[12rem] px-1 text-center text-[10px] font-semibold leading-snug text-[#1F3A5F]/85 md:text-[11px]">
        {alt}
      </span>
    );
  }

  return (
    <img
      src={sources[idx]}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setIdx((i) => i + 1)}
    />
  );
}

function OutletLogo({ logo }: { logo: FeaturedMediaLogo }) {
  const imgClass =
    "max-h-[3.75rem] w-auto max-w-[min(100%,11rem)] object-contain object-center opacity-[0.96] md:max-h-[4.5rem] md:max-w-[12rem]";
  /** Wide horizontal wordmark — needs extra max-width so it doesn’t look cropped */
  const svgClass =
    "max-h-[2.85rem] w-auto max-w-[min(100%,15rem)] object-contain object-center opacity-[0.96] md:max-h-[3.75rem] md:max-w-[17rem]";
  if (logo.kind === "svg") {
    return (
      <img
        src={logo.src}
        alt={logo.alt}
        className={svgClass}
        width={260}
        height={48}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return <DomainOutletLogo domain={logo.domain} alt={logo.alt} className={imgClass} />;
}

/** Repeat logos so one segment is wider than typical viewports — avoids empty space on the right of the marquee. */
function buildSeamlessMarqueeTrack(logos: typeof FEATURED_MEDIA_LOGOS, segmentRepeat = 4) {
  const segment: typeof FEATURED_MEDIA_LOGOS = [];
  for (let r = 0; r < segmentRepeat; r++) segment.push(...logos);
  return [...segment, ...segment];
}

function MarqueeRow({
  track,
  reverse,
}: {
  track: ReturnType<typeof buildSeamlessMarqueeTrack>;
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_0.5%,black_99.5%,transparent)]">
      <div
        className={`flex w-max gap-2.5 sm:gap-3 md:gap-3.5 ${
          reverse ? "animate-media-marquee-reverse" : "animate-media-marquee"
        } motion-reduce:animate-none`}
      >
        {track.map((logo, i) => (
          <div
            key={`${logo.id}-${i}`}
            className="flex h-[5.25rem] w-[13rem] shrink-0 items-center justify-center overflow-visible rounded-xl border border-[#1F3A5F]/[0.1] bg-white px-3 py-2 shadow-[0_2px_12px_rgba(31,58,95,0.07)] md:h-[5.75rem] md:w-[14.5rem] md:px-4"
          >
            <OutletLogo logo={logo} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeaturedMediaMarquee() {
  const reduceMotion = useReducedMotion() === true;
  const logos = FEATURED_MEDIA_LOGOS;
  const track1 = useMemo(() => {
    const mid = Math.ceil(logos.length / 2);
    return buildSeamlessMarqueeTrack(logos.slice(0, mid), 4);
  }, [logos]);
  const track2 = useMemo(() => {
    const mid = Math.ceil(logos.length / 2);
    return buildSeamlessMarqueeTrack(logos.slice(mid), 4);
  }, [logos]);
  const mid = Math.ceil(logos.length / 2);
  const row1Logos = logos.slice(0, mid);
  const row2Logos = logos.slice(mid);

  return (
    <div
      className="-mt-2.5 border-t border-[#1F3A5F]/10 bg-[linear-gradient(180deg,#ffffff_0%,#fafbfc_100%)] pt-0 pb-5 md:pb-7 lg:pb-9"
      aria-labelledby="featured-media-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        className="w-full px-3 pt-1 text-center sm:px-5 md:px-8 lg:px-10"
      >
        <h3
          id="featured-media-heading"
          className="font-display text-lg font-semibold tracking-tight text-[#1F3A5F] md:text-xl"
        >
          Featured on
        </h3>
        <p className="mt-0 text-xs text-[#5a6b82] md:text-sm">
          Coverage across leading outlets — trust and recognition
        </p>
      </motion.div>

      {reduceMotion ? (
        <div className="mt-1 flex flex-col gap-2 px-3 sm:px-5 md:mt-1.5 md:gap-2.5 md:px-8 lg:px-10">
          <div className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-4 md:gap-3">
            {row1Logos.map((logo) => (
              <div
                key={logo.id}
                className="flex h-[5.25rem] w-full min-w-0 items-center justify-center overflow-visible rounded-xl border border-[#1F3A5F]/[0.1] bg-white px-2 py-2 shadow-[0_2px_12px_rgba(31,58,95,0.07)] sm:px-3 md:h-[5.75rem] md:px-4"
              >
                <OutletLogo logo={logo} />
              </div>
            ))}
          </div>
          <div className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3 md:gap-3">
            {row2Logos.map((logo) => (
              <div
                key={logo.id}
                className="flex h-[5.25rem] w-full min-w-0 items-center justify-center overflow-visible rounded-xl border border-[#1F3A5F]/[0.1] bg-white px-2 py-2 shadow-[0_2px_12px_rgba(31,58,95,0.07)] sm:px-3 md:h-[5.75rem] md:px-4"
              >
                <OutletLogo logo={logo} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-1 flex flex-col gap-2 px-3 sm:gap-2.5 sm:px-5 md:mt-1.5 md:px-8 lg:px-10">
          <MarqueeRow track={track1} />
          <MarqueeRow track={track2} reverse />
        </div>
      )}
    </div>
  );
}
