"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Cpu,
  FlaskConical,
  Landmark,
  Lightbulb,
  Rocket,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  RESEARCH_PIPELINE_STEPS,
  RESEARCH_SPOTLIGHTS,
  type ResearchSpotlight,
} from "@/data/research-spotlight";

const stats = [
  {
    value: "₹42 Cr+",
    label: "Sponsored research over five years",
    icon: Landmark,
  },
  {
    value: "120+",
    label: "Patents filed with student inventors",
    icon: Lightbulb,
  },
  {
    value: "20+",
    label: "National & global lab partnerships",
    icon: FlaskConical,
  },
] as const;

const PIPELINE_ICONS = [Sparkles, Cpu, Rocket, BookOpen] as const;

const tagToneClasses: Record<ResearchSpotlight["tagTone"], string> = {
  orange: "text-[#F68121] ring-[#F68121]/35 bg-[#F68121]/10",
  green: "text-[#6DBE45] ring-[#6DBE45]/35 bg-[#6DBE45]/10",
  violet: "text-[#7c3aed] ring-[#7c3aed]/35 bg-[#7c3aed]/10",
  sky: "text-sky-600 ring-sky-400/35 bg-sky-500/10",
};

function SpotlightPicker({
  items,
  selectedId,
  onSelect,
  reduceMotion,
}: {
  items: readonly ResearchSpotlight[];
  selectedId: string;
  onSelect: (id: string) => void;
  reduceMotion: boolean;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
      {items.map((p, i) => {
        const active = p.id === selectedId;
        return (
          <motion.button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            whileHover={reduceMotion ? undefined : { x: 4 }}
            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
            className={`relative w-[min(100%,320px)] shrink-0 rounded-2xl border text-left transition-colors lg:w-full ${
              active
                ? "border-[#1F3A5F] bg-white shadow-[0_16px_50px_rgba(31,58,95,0.12)] ring-2 ring-[#F68121]/25"
                : "border-[#1F3A5F]/10 bg-[#F5F7FA] hover:border-[#1F3A5F]/25 hover:bg-white"
            }`}
          >
            <div
              className={`h-1 w-full rounded-t-2xl bg-gradient-to-r ${p.accent}`}
              aria-hidden
            />
            <div className="p-5">
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] ring-1 ${tagToneClasses[p.tagTone]}`}
              >
                {p.tag}
              </span>
              <p className="mt-3 font-display text-lg font-semibold leading-snug text-[#1F3A5F]">
                {p.title}
              </p>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#5a6b82]">{p.desc}</p>
              <span
                className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${active ? "text-[#F68121]" : "text-[#1F3A5F]/70"}`}
              >
                {active ? "Selected" : "View focus"}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

function SpotlightDetail({
  project,
  reduceMotion,
}: {
  project: ResearchSpotlight;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      layout
      className="overflow-hidden rounded-[1.35rem] border border-[#1F3A5F]/10 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0b1526] md:aspect-[2/1]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.id}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority={project.id === RESEARCH_SPOTLIGHTS[0].id}
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1526]/90 via-[#0b1526]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F68121]">
                {project.tag}
              </p>
              <h4 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">
                {project.title}
              </h4>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-6 md:p-8">
        <p className="text-base leading-relaxed text-[#5a6b82] md:text-[1.05rem]">{project.detail}</p>
        <ul className="mt-6 space-y-3 border-t border-[#1F3A5F]/10 pt-6">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-sm leading-relaxed text-[#1F3A5F]">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6DBE45]"
                aria-hidden
              />
              {b}
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1F3A5F] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#1F3A5F]/20 transition hover:bg-[#F68121] hover:shadow-[#F68121]/25"
        >
          Discuss this stream
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </motion.div>
  );
}

export function ResearchSection() {
  const reduceMotion = useReducedMotion() === true;
  const [selectedId, setSelectedId] = useState(RESEARCH_SPOTLIGHTS[0].id);

  const selected = useMemo(
    () => RESEARCH_SPOTLIGHTS.find((p) => p.id === selectedId) ?? RESEARCH_SPOTLIGHTS[0],
    [selectedId],
  );

  return (
    <section id="research" className="relative border-b border-[#1F3A5F]/10">
      <div className="relative overflow-hidden bg-[#0b1526] px-6 pb-36 pt-20 text-white md:px-12 md:pb-40 md:pt-24 lg:px-16">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.28]" aria-hidden>
          <div className="relative h-full w-full min-h-[28rem]">
            <Image
              src="https://images.unsplash.com/photo-1581092160562-40aa08e66837?auto=format&fit=crop&w=2000&q=80"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
              quality={80}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b1526] via-[#0b1526]/92 to-[#0b1526]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(105deg, transparent 40%, rgba(109,190,69,0.2) 50%, transparent 60%)`,
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#1F3A5F]/45 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#6DBE45]/20 blur-3xl" aria-hidden />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F68121]">
              Research &amp; Innovation
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-[2.5rem]">
              Ideas validated in the real world
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
              From sponsored labs to patents — work that leaves the whiteboard and ships into
              prototypes, pilots, and publications. Explore streams below; each opens a lab-forward
              brief with student-facing outcomes.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-5">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -6,
                          transition: { type: "spring", stiffness: 400, damping: 24 },
                        }
                  }
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur-md transition-[box-shadow] duration-300 hover:border-[#6DBE45]/35 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                >
                  <div className="relative flex items-start gap-4">
                    <motion.span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15"
                      whileHover={reduceMotion ? undefined : { rotate: [0, -6, 6, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-5 w-5 text-[#6DBE45]" aria-hidden />
                    </motion.span>
                    <div>
                      <p className="font-display text-2xl font-semibold tracking-tight tabular-nums md:text-[1.75rem]">
                        {s.value}
                      </p>
                      <p className="mt-2 text-sm leading-snug text-white/70">{s.label}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm md:p-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
              Research pipeline
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {RESEARCH_PIPELINE_STEPS.map((step, stepIndex) => {
                const Icon = PIPELINE_ICONS[stepIndex];
                return (
                  <div
                    key={step.id}
                    className="relative flex gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4 transition hover:border-white/20"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F68121]/15 text-[#F68121]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-display text-base font-semibold text-white">
                        {step.label}
                      </p>
                      <p className="mt-0.5 text-xs text-white/55">{step.blurb}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-24 max-w-6xl px-4 pb-24 md:-mt-28 md:px-8 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="rounded-[1.75rem] border border-[#1F3A5F]/12 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] md:p-10"
        >
          <div className="mb-8 flex flex-col gap-2 border-b border-[#1F3A5F]/10 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6DBE45]">
                Spotlight projects
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-[#1F3A5F] md:text-2xl">
                Cross-disciplinary workstreams
              </h3>
              <p className="mt-2 max-w-xl text-sm text-[#5a6b82]">
                Pick a stream to see how it shows up in our labs — imagery, outcomes, and a direct
                line to partner conversations.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F3A5F] transition hover:text-[#F68121]"
            >
              Partner with our labs
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start lg:gap-12">
            <SpotlightPicker
              items={RESEARCH_SPOTLIGHTS}
              selectedId={selectedId}
              onSelect={setSelectedId}
              reduceMotion={reduceMotion}
            />
            <div className="min-h-[200px] lg:sticky lg:top-[calc(env(safe-area-inset-top)+var(--utility-bar-inner)+5rem)]">
              <SpotlightDetail project={selected} reduceMotion={reduceMotion} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
