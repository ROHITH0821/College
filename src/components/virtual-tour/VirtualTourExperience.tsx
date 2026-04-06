"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Cuboid,
  MapPin,
  Play,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HomeSectionLink } from "@/components/navigation/HomeSectionLink";
import { VIRTUAL_TOUR_PAGE_HERO } from "@/constants/virtual-tour-media";
import { VIRTUAL_TOUR_SCENES } from "@/data/virtual-tour-scenes";

export function VirtualTourExperience() {
  const reduceMotion = useReducedMotion() === true;
  const [activeScene, setActiveScene] = useState(VIRTUAL_TOUR_SCENES[0].id);

  const current = VIRTUAL_TOUR_SCENES.find((s) => s.id === activeScene) ?? VIRTUAL_TOUR_SCENES[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1F3A5F]">
      {/* Immersive hero */}
      <header className="relative overflow-hidden bg-[#061018] pb-28 pt-16 text-white md:pb-36 md:pt-20 lg:pt-24">
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
          <Image
            src={VIRTUAL_TOUR_PAGE_HERO}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#061018]/20 via-[#061018]/75 to-[#061018]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(246,129,33,0.25),transparent_50%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
          <nav className="mb-10 text-sm text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-white/90">Virtual tour</span>
          </nav>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.4em] text-[#F68121]">
              <Cuboid className="h-4 w-4" aria-hidden />
              360° experience
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-[3.25rem]">
              Walk CMREC
              <span className="block text-white/90">before your first visit</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              Explore a curated path through learning spaces, labs, and outdoor areas. Drop in a
              Matterport or YouTube 360 embed below when your team is ready — the layout is built
              for it.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#tour-embed"
                className="inline-flex items-center gap-2 rounded-full bg-[#F68121] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:bg-[#e77818]"
              >
                Jump to tour player
                <Play className="h-4 w-4" fill="currentColor" aria-hidden />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Book an on-site visit
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main embed — unique “stage” frame */}
      <div className="relative z-10 mx-auto -mt-20 max-w-6xl px-6 md:-mt-24 md:px-10 lg:px-12">
        <motion.section
          id="tour-embed"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="overflow-hidden rounded-[1.5rem] border border-[#1F3A5F]/10 bg-white shadow-[0_40px_100px_rgba(15,23,42,0.12)]"
          aria-labelledby="embed-heading"
        >
          <div className="border-b border-[#1F3A5F]/08 bg-gradient-to-r from-[#1F3A5F] to-[#0c4a6e] px-6 py-4 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p id="embed-heading" className="text-xs font-bold uppercase tracking-[0.25em] text-[#F68121]">
                  Tour player
                </p>
                <p className="mt-1 text-sm text-white/85">
                  Replace this block with your iframe (Matterport, YouTube 360, etc.)
                </p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90">
                Embed-ready
              </span>
            </div>
          </div>

          <div className="relative aspect-video bg-[#0b1526]">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/25 backdrop-blur-sm">
                <Play className="ml-1 h-10 w-10 text-white" fill="currentColor" aria-hidden />
              </div>
              <p className="max-w-md text-sm leading-relaxed text-white/70">
                Paste your embed URL in{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-[#F68121]">
                  VirtualTourExperience
                </code>{" "}
                or drop an iframe here — aspect ratio is already set for widescreen tours.
              </p>
            </div>
            <div
              className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='%23fff' fill-opacity='.05' d='M0 0h12v12H0zm12 12h12v12H12z'/%3E%3C/svg%3E")`,
              }}
              aria-hidden
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#1F3A5F]/08 px-6 py-4 text-sm text-[#5a6b82] md:px-8">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#F68121]" aria-hidden />
              Survey No. 69, CMR Marg, Medchal Road — Hyderabad
            </span>
            <HomeSectionLink
              href="/#campus-map"
              className="font-semibold text-[#1F3A5F] hover:text-[#F68121]"
            >
              Open campus map →
            </HomeSectionLink>
          </div>
        </motion.section>
      </div>

      {/* Scene picker + preview */}
      <section
        className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:px-12"
        aria-labelledby="scenes-heading"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#F68121]">
              Highlights
            </p>
            <h2
              id="scenes-heading"
              className="mt-2 font-display text-2xl font-semibold md:text-3xl"
            >
              Choose a scene
            </h2>
            <p className="mt-2 max-w-xl text-[#5a6b82]">
              Tap a tile to preview the copy block — swap photos for your own campus shots anytime.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#5a6b82]">
            <Sparkles className="h-4 w-4 text-[#6DBE45]" aria-hidden />
            Interactive preview
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
          <ul className="flex flex-col gap-2">
            {VIRTUAL_TOUR_SCENES.map((scene) => {
              const on = scene.id === activeScene;
              return (
                <li key={scene.id}>
                  <button
                    type="button"
                    onClick={() => setActiveScene(scene.id)}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                      on
                        ? "border-[#F68121] bg-white shadow-[0_12px_40px_rgba(31,58,95,0.1)] ring-1 ring-[#F68121]/25"
                        : "border-transparent bg-white/60 hover:border-[#1F3A5F]/10 hover:bg-white"
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#F68121]/90">
                      {scene.id}
                    </span>
                    <span className="mt-1 block font-display text-lg font-semibold text-[#1F3A5F]">
                      {scene.title}
                    </span>
                    <span className="mt-1 block text-sm text-[#5a6b82]">{scene.blurb}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[#1F3A5F]/10 bg-[#e8eef5] shadow-inner lg:min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  quality={88}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="font-display text-2xl font-semibold text-white md:text-3xl">
                    {current.title}
                  </p>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/85">
                    {current.blurb}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="border-t border-[#1F3A5F]/10 bg-white py-16 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center md:px-10 lg:px-12">
          <h3 className="font-display text-2xl font-semibold text-[#1F3A5F] md:text-3xl">
            Ready to see it in person?
          </h3>
          <p className="max-w-xl text-[#5a6b82]">
            Admissions and campus visits are coordinated through our contact desk — mention
            “campus visit” in your message.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#1F3A5F] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#F68121]"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
