"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY_SHOTS, type GalleryShot } from "@/data/gallery-shots";

function ShotCard({
  shot,
  onOpen,
}: {
  shot: GalleryShot;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="relative block w-[min(85vw,420px)] shrink-0 cursor-zoom-in overflow-hidden rounded-2xl border-0 bg-transparent p-0 text-left shadow-[0_24px_70px_rgba(31,58,95,0.12)] outline-none ring-[#1F3A5F]/0 transition focus-visible:ring-2 focus-visible:ring-[#F68121]"
    >
      <span className="relative block aspect-[4/3] w-full">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="420px"
          className="object-cover transition duration-700 hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute bottom-0 left-0 p-6 font-display text-lg font-semibold text-white">
          {shot.label}
        </span>
      </span>
    </button>
  );
}

function SnapThumb({
  shot,
  onOpen,
}: {
  shot: GalleryShot;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative w-[min(72vw,280px)] shrink-0 snap-center cursor-zoom-in overflow-hidden rounded-xl border border-[#1F3A5F]/10 bg-white p-0 shadow-[0_12px_40px_rgba(31,58,95,0.08)] outline-none transition hover:border-[#F68121]/40 focus-visible:ring-2 focus-visible:ring-[#F68121]"
    >
      <span className="relative block aspect-[4/3] w-full">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="280px"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-90" />
        <span className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white drop-shadow-sm">
          {shot.label}
        </span>
      </span>
    </button>
  );
}

function GalleryLightbox({
  shot,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  shot: GalleryShot;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={shot.label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative max-h-[90vh] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-1 -top-12 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-0 md:top-0"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black shadow-2xl md:aspect-video">
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>
        <div className="mt-4 flex flex-col gap-2 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xl font-semibold">{shot.label}</p>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/85">{shot.alt}</p>
          </div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/50">
            {index + 1} / {total}
          </p>
        </div>
        <div className="mt-4 flex justify-center gap-3">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export type CampusGallerySectionProps = {
  /** `page` — dual marquee rows, snap strip, full copy. `embed` — single row (home). */
  variant?: "embed" | "page";
};

export function CampusGallerySection({ variant = "embed" }: CampusGallerySectionProps) {
  const reduceMotion = useReducedMotion() === true;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const shots = GALLERY_SHOTS;
  const rowA = shots;
  const rowB = [...shots].reverse();

  const loopA = reduceMotion ? rowA : [...rowA, ...rowA];
  const loopB = reduceMotion ? rowB : [...rowB, ...rowB];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i == null) return i;
      return i <= 0 ? shots.length - 1 : i - 1;
    });
  }, [shots.length]);
  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i == null) return i;
      return i >= shots.length - 1 ? 0 : i + 1;
    });
  }, [shots.length]);

  const openAt = (i: number) => setLightboxIndex(i);

  const isPage = variant === "page";

  return (
    <section
      id="gallery"
      className="border-b border-[#1F3A5F]/10 bg-white px-0 py-24 md:px-12 lg:px-16"
    >
      <div className="mx-auto mb-12 max-w-6xl px-6 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F68121]">
            Campus & Infrastructure
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1F3A5F] md:text-4xl">
            Spaces designed for focus and flow
          </h2>
          <p className="mt-4 max-w-2xl text-[#5a6b82]">
            {reduceMotion
              ? "Scroll horizontally to explore studios, labs, and social spaces across our LEED-inspired campus."
              : isPage
                ? "Two continuous rows scroll in opposite directions. Scroll the strip below or tap any photo to view it larger."
                : "A continuous tour of studios, labs, and social spaces across our LEED-inspired campus — tap any image for a closer look."}
          </p>
        </motion.div>
      </div>

      <div
        className={
          reduceMotion
            ? "gallery-scroll overflow-x-auto px-6 pb-4 pt-2 md:px-12 lg:px-16 [scrollbar-width:thin]"
            : "overflow-hidden px-6 pt-2 md:px-12 lg:px-16"
        }
      >
        <div
          className={
            reduceMotion
              ? "flex w-max gap-5 pb-4"
              : "flex w-max animate-gallery-marquee gap-5 pb-4"
          }
        >
          {loopA.map((s, i) => (
            <ShotCard
              key={`a-${s.label}-${i}`}
              shot={s}
              onOpen={() => openAt(i % shots.length)}
            />
          ))}
        </div>
      </div>

      {isPage && !reduceMotion && (
        <div className="mt-6 overflow-hidden px-6 pt-2 md:px-12 lg:px-16">
          <div className="flex w-max animate-gallery-marquee-reverse gap-5 pb-4">
            {loopB.map((s, i) => (
              <ShotCard
                key={`b-${s.label}-${i}`}
                shot={s}
                onOpen={() => openAt(shots.indexOf(s))}
              />
            ))}
          </div>
        </div>
      )}

      {isPage && (
        <div className="mx-auto mt-16 max-w-6xl px-6 md:px-0">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F68121]">
            Browse & scroll
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-[#1F3A5F] md:text-3xl">
            Snap through every scene
          </h3>
          <p className="mt-2 max-w-2xl text-[#5a6b82]">
            Drag sideways — each card snaps into place. Same photos as the rows above; ideal for
            trackpads and phones.
          </p>
        </div>
      )}

      {isPage && (
        <div className="gallery-scroll mt-8 overflow-x-auto px-6 pb-4 pt-2 md:px-12 lg:px-16 [scrollbar-width:thin]">
          <div className="flex w-max snap-x snap-mandatory gap-4 pb-4">
            {shots.map((s, i) => (
              <SnapThumb key={`snap-${s.label}-${i}`} shot={s} onOpen={() => openAt(i)} />
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {lightboxIndex != null && shots[lightboxIndex] && (
          <GalleryLightbox
            key="gallery-lightbox"
            shot={shots[lightboxIndex]}
            index={lightboxIndex}
            total={shots.length}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
