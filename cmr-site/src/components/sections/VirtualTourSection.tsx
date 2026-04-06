"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Cuboid, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  VIRTUAL_TOUR_SECTION_BG,
  VIRTUAL_TOUR_SECTION_PREVIEW,
} from "@/constants/virtual-tour-media";

export function VirtualTourSection() {
  const reduceMotion = useReducedMotion() === true;

  return (
    <section
      id="virtual-tour"
      className="relative overflow-hidden border-b border-[#1F3A5F]/10 bg-[#0a1628] px-6 py-20 md:px-12 md:py-24 lg:px-16"
      aria-labelledby="virtual-tour-home-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
      >
        <Image
          src={VIRTUAL_TOUR_SECTION_BG}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/92 to-[#0a1628]/75"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(246,129,33,0.12),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-[#F68121]">
            <Cuboid className="h-4 w-4" aria-hidden />
            Virtual tour
          </p>
          <h2
            id="virtual-tour-home-heading"
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl"
          >
            Roam the campus before you arrive
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
            A dedicated walkthrough of labs, learning spaces, and outdoor areas — built for
            applicants, parents, and visitors who want a feel for Medchal before stepping on site.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#6DBE45]" aria-hidden />
              <span>Scene-by-scene highlights with room for your future 360° embed</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#F68121]" aria-hidden />
              <span>Same address as our campus map — plan a visit after the online pass</span>
            </li>
          </ul>
          <Link
            href="/virtual-tour"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#F68121] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-[#e77818]"
          >
            Open full virtual tour
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
            <Image
              src={VIRTUAL_TOUR_SECTION_PREVIEW}
              alt="Campus courtyard and academic buildings — same setting explored in the virtual tour"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={88}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/85 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F68121]">
                Campus preview
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
                Walk labs &amp; learning spaces on the full tour
              </p>
            </div>
          </div>
          <div
            className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-full bg-[#6DBE45]/20 blur-2xl md:block"
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
