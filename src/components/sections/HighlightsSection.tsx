"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const CAMPUS_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=90";

const statPills = [
  {
    key: "p1",
    value: "94%",
    label: "Placement rate",
    accent: "from-[#F68121]/20 to-transparent",
    bar: "bg-[#F68121]",
  },
  {
    key: "p2",
    value: "120+",
    label: "Campus acres",
    accent: "from-[#6DBE45]/20 to-transparent",
    bar: "bg-[#6DBE45]",
  },
  {
    key: "p3",
    value: "85+",
    label: "Programs",
    accent: "from-[#1F3A5F]/15 to-transparent",
    bar: "bg-[#1F3A5F]",
  },
  {
    key: "p4",
    value: "42",
    label: "Research labs",
    accent: "from-[#7c3aed]/15 to-transparent",
    bar: "bg-[#7c3aed]",
  },
] as const;

function StatCard({
  item,
  index,
}: {
  item: (typeof statPills)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion() === true;
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.06 }}
      className={`relative overflow-hidden rounded-2xl border border-[#1F3A5F]/[0.08] bg-white p-5 shadow-[0_8px_32px_rgba(31,58,95,0.06)] ring-1 ring-[#1F3A5F]/[0.04]`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-80`}
        aria-hidden
      />
      <div className={`relative mb-3 h-1 w-10 rounded-full ${item.bar}`} aria-hidden />
      <p className="relative text-2xl font-bold tabular-nums tracking-tight text-[#1F3A5F] md:text-[1.75rem] md:leading-none">
        {item.value}
      </p>
      <p className="relative mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5a6b82]">
        {item.label}
      </p>
    </motion.div>
  );
}

export function HighlightsSection() {
  const reduceMotion = useReducedMotion() === true;

  return (
    <section
      id="highlights"
      className="relative flex min-h-0 flex-col border-b border-[#1F3A5F]/10 bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_45%,#fafbfc_100%)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 md:px-10 md:py-20 lg:px-12 lg:py-24">
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduceMotion ? 0 : 0.55 }}
          className="overflow-hidden rounded-[1.75rem] border border-[#1F3A5F]/10 bg-[#1F3A5F]/[0.03] shadow-[0_24px_80px_-24px_rgba(31,58,95,0.35)] ring-1 ring-[#1F3A5F]/[0.06]"
        >
          <div className="relative aspect-[16/10] min-h-[200px] w-full sm:aspect-[16/9] md:min-h-[280px]">
            <Image
              src={CAMPUS_IMAGE}
              alt="Students collaborating with laptops in a bright campus study space"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 72rem"
              loading="lazy"
              quality={85}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/55 via-transparent to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-12 md:px-8 md:pb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/90">
                University highlights
              </p>
              <p className="mt-2 max-w-xl font-display text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl">
                Momentum you can measure
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-10 max-w-xl text-center md:mt-12">
          <motion.p
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.05 }}
            className="font-display text-pretty text-[15px] font-bold leading-[1.55] tracking-tight text-[#3d4d5f] md:text-[1.125rem] md:leading-[1.6]"
          >
            Placements, scale, and research capacity—measurable outcomes from a campus committed to
            collaboration and discovery.
          </motion.p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {statPills.map((item, index) => (
            <StatCard key={item.key} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
