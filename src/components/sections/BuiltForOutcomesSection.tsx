"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, Lightbulb, Users2, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { OUTCOMES_PILLAR_IMAGES } from "@/constants/home-section-media";

const pillars: {
  key: keyof typeof OUTCOMES_PILLAR_IMAGES;
  title: string;
  subtitle: string;
  desc: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  imageAlt: string;
  accent: string;
}[] = [
  {
    key: "academics",
    title: "Academics",
    subtitle: "Rigorous learning that transfers to the workplace",
    desc: "Autonomous programmes, rigorous assessment, and labs aligned to industry and research priorities — so graduates leave credentialed and capable.",
    href: "/programs",
    cta: "Explore programmes",
    icon: BookOpen,
    imageAlt: "Students learning together with laptops in a bright academic setting",
    accent: "from-[#1F3A5F] to-[#2d5588]",
  },
  {
    key: "innovation",
    title: "Innovation",
    subtitle: "From ideas to prototypes and patents",
    desc: "Institution Innovation Council, incubation, and industry-led projects turn ideas into prototypes and patents — not just theory on a slide.",
    href: "/research",
    cta: "Research & innovation",
    icon: Lightbulb,
    imageAlt: "Laboratory glassware and research environment representing innovation",
    accent: "from-[#c45f0f] to-[#F68121]",
  },
  {
    key: "community",
    title: "Community",
    subtitle: "Growth beyond the syllabus",
    desc: "Clubs, NSS, sports, and leadership roles build confidence beyond the classroom — a campus culture that supports the whole student.",
    href: "/student-life",
    cta: "Student life",
    icon: Users2,
    imageAlt: "Students collaborating and celebrating as a team",
    accent: "from-[#3d7a2e] to-[#6DBE45]",
  },
];

export function BuiltForOutcomesSection() {
  const reduceMotion = useReducedMotion() === true;

  return (
    <section
      id="outcomes"
      className="scroll-mt-[var(--home-sticky-top)] relative overflow-hidden border-b border-[#1F3A5F]/10 bg-[#f4f7fb] px-6 py-16 md:px-12 md:py-24 lg:px-16"
    >
      {/* Ambient pattern — distinct from flat white sections */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(31,58,95,0.09) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-[480px] w-[480px] rounded-full bg-[#F68121]/[0.07] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[#1F3A5F]/[0.06] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1F3A5F]/10 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#1F3A5F]/80 shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-[#F68121] to-[#f59e4b]" aria-hidden />
            Outcomes framework
          </div>
          <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-[#1F3A5F] md:text-[2.35rem] lg:text-[2.65rem]">
            Built for outcomes —{" "}
            <span className="bg-gradient-to-r from-[#1F3A5F] via-[#2a4a73] to-[#F68121] bg-clip-text text-transparent">
              academics, innovation, and community
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#5a6b82] md:text-base">
            Degree pathways, research culture, and campus life work together — so students graduate
            with skills employers recognise and values that last.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-col gap-10 md:gap-14 lg:gap-16">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            const imageLeft = i % 2 === 0;
            const src = OUTCOMES_PILLAR_IMAGES[p.key];
            const step = String(i + 1).padStart(2, "0");

            return (
              <motion.article
                key={p.key}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid gap-0 overflow-hidden rounded-[1.75rem] border border-[#1F3A5F]/10 bg-white shadow-[0_20px_60px_-24px_rgba(31,58,95,0.2)] ring-1 ring-[#1F3A5F]/[0.04] md:grid-cols-2 md:items-stretch"
              >
                {/* Image panel */}
                <div
                  className={`relative min-h-[220px] w-full sm:min-h-[260px] md:min-h-[300px] ${
                    imageLeft ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <Image
                    src={src}
                    alt={p.imageAlt}
                    fill
                    className={`object-cover object-center transition duration-700 ease-out ${
                      reduceMotion ? "" : "group-hover:scale-[1.03]"
                    }`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f172a]/55 via-[#0f172a]/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0f172a]/25"
                    aria-hidden
                  />
                  <div
                    className={`pointer-events-none absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${p.accent} opacity-90`}
                    aria-hidden
                  />
                  <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 shadow-lg backdrop-blur-sm md:left-6 md:top-6">
                    <Icon className="h-6 w-6 text-[#1F3A5F]" aria-hidden />
                  </div>
                  <p
                    className="absolute bottom-4 left-4 font-display text-5xl font-bold tabular-nums leading-none text-white/25 md:bottom-6 md:left-6 md:text-6xl"
                    aria-hidden
                  >
                    {step}
                  </p>
                </div>

                {/* Copy panel */}
                <div
                  className={`relative flex flex-col justify-center bg-gradient-to-br from-white via-[#fafbfc] to-[#f0f4fa] px-6 py-8 md:px-10 md:py-10 lg:px-12 ${
                    imageLeft ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F68121]">
                    {p.title}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-[#1F3A5F] md:text-[1.65rem]">
                    {p.subtitle}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#5a6b82] md:text-[15px]">{p.desc}</p>
                  <Link
                    href={p.href}
                    className="group/cta mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#1F3A5F]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#1F3A5F] shadow-sm transition hover:border-[#F68121]/40 hover:bg-[#fff8f3] hover:text-[#c45f0f]"
                  >
                    {p.cta}
                    <ArrowUpRight className="h-4 w-4 transition group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="relative mt-14 text-center text-sm text-[#5a6b82]">
          <Link
            href="/partners"
            className="font-semibold text-[#1F3A5F] underline-offset-2 transition hover:text-[#F68121] hover:underline"
          >
            Recruiters & industry partners
          </Link>{" "}
          — employer logos and MoU collaborations.
        </p>
      </div>
    </section>
  );
}
