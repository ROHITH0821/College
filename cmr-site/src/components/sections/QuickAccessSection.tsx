"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Award, Download, FileSearch, Headphones } from "lucide-react";

const cards = [
  {
    title: "Results",
    desc: "Semester results and revaluation status.",
    icon: FileSearch,
    href: "/downloads",
    accent: "#F68121",
    bar: "from-[#F68121] via-[#f59e4b] to-[#F68121]/80",
  },
  {
    title: "Certificates",
    desc: "Digital credentials and transcripts.",
    icon: Award,
    href: "/downloads",
    accent: "#6DBE45",
    bar: "from-[#6DBE45] via-[#4ade80] to-[#6DBE45]/80",
  },
  {
    title: "Downloads",
    desc: "Forms, calendars, and handbook PDFs.",
    icon: Download,
    href: "/downloads",
    accent: "#1F3A5F",
    bar: "from-[#1F3A5F] via-[#3b5f8f] to-[#1F3A5F]/85",
  },
  {
    title: "Services",
    desc: "Hostel, transport, and IT help desk.",
    icon: Headphones,
    href: "/contact",
    accent: "#7c3aed",
    bar: "from-[#7c3aed] via-[#a78bfa] to-[#7c3aed]/85",
  },
] as const;

export function QuickAccessSection() {
  const reduceMotion = useReducedMotion() === true;

  return (
    <section
      id="quick-access"
      className="relative overflow-hidden border-b border-[#1F3A5F]/10 bg-[#eef2f7] px-6 py-20 md:px-12 md:py-28 lg:px-16"
    >
      {/* Soft backdrop */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(31,58,95,0.06),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,transparent_35%,transparent_65%,rgba(245,247,250,0.9)_100%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center md:mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F68121]/25 bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#c45f0f] shadow-sm backdrop-blur-sm md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F68121]" aria-hidden />
            Quick access
          </span>
          <h2 className="mt-6 font-display text-[1.65rem] font-semibold leading-[1.15] tracking-tight text-[#1F3A5F] sm:text-3xl md:text-4xl lg:text-[2.35rem]">
            Everything students need,
            <span className="block text-[#1F3A5F]/90">one tap away</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[#5a6b82] md:text-base">
            Results, documents, downloads, and campus services — organized for fast access.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-32px" }}
                transition={{ delay: reduceMotion ? 0 : i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={c.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#1F3A5F]/[0.07] bg-white shadow-[0_4px_24px_rgba(31,58,95,0.06),0_1px_0_rgba(255,255,255,0.8)_inset] ring-1 ring-black/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#1F3A5F]/12 hover:shadow-[0_20px_48px_rgba(31,58,95,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F68121]"
                >
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${c.bar}`}
                    aria-hidden
                  />
                  <div className="flex flex-1 flex-col p-6 pt-5 md:p-7 md:pt-6">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-inner"
                        style={{
                          background: `linear-gradient(145deg, ${c.accent}18 0%, ${c.accent}08 100%)`,
                          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6)`,
                        }}
                      >
                        <Icon
                          className="h-6 w-6"
                          style={{ color: c.accent }}
                          aria-hidden
                          strokeWidth={2}
                        />
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#1F3A5F]/8 bg-[#F5F7FA] text-[#1F3A5F]/40 transition group-hover:border-[#F68121]/30 group-hover:bg-[#FFF8F2] group-hover:text-[#F68121]">
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-[#1F3A5F] md:text-xl">
                      {c.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5a6b82] md:text-[15px]">
                      {c.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
