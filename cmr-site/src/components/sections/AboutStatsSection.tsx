"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ABOUT_STATS_IMAGE } from "@/constants/home-section-media";

const stats: { key: string; value: number; suffix: string; label: string }[] = [
  { key: "placed", value: 700, suffix: "+", label: "Students placed (AY)" },
  { key: "higher", value: 120, suffix: "+", label: "Higher education admits" },
  { key: "alumni", value: 5000, suffix: "+", label: "Alumni network" },
  { key: "companies", value: 300, suffix: "+", label: "Companies visited" },
  { key: "package", value: 42, suffix: " LPA", label: "Highest package" },
  { key: "intern", value: 500, suffix: "+", label: "Internship opportunities" },
];

/**
 * About snapshot + placement-style counters (aligned with cmrec.ac.in narrative).
 */
export function AboutStatsSection() {
  const reduceMotion = useReducedMotion() === true;

  return (
    <section
      id="about-stats"
      className="scroll-mt-[var(--home-sticky-top)] border-b border-[#1F3A5F]/10 bg-white px-6 py-16 md:px-12 md:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F68121]">
              About CMREC
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1F3A5F] md:text-4xl">
              A research-led engineering college in Hyderabad
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#5a6b82] md:text-lg">
              Established in 2010, CMR Engineering College is among Hyderabad&apos;s leading private
              engineering institutions, spread across a green{" "}
              <span className="font-semibold text-[#1F3A5F]/90">10-acre</span> campus. The college is
              approved by{" "}
              <abbr title="All India Council for Technical Education" className="no-underline">
                AICTE
              </abbr>
              , affiliated to JNTUH, and recognised for autonomy, accreditations, and strong industry
              connect — including Institution Innovation Council (IIC) initiatives and national
              rankings that reflect our commitment to quality education.
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(31,58,95,0.15)] ring-1 ring-[#1F3A5F]/10 lg:aspect-[5/4] lg:sticky lg:top-[calc(var(--home-sticky-top)+1rem)]"
          >
            <Image
              src={ABOUT_STATS_IMAGE}
              alt="Modern university campus with students and academic buildings"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 45vw"
              quality={92}
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1f3a5f]/35 via-transparent to-transparent"
              aria-hidden
            />
          </motion.div>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <motion.li
              key={s.key}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-2xl border border-[#1F3A5F]/10 bg-[#fafbfc] px-5 py-5 shadow-[0_2px_16px_rgba(31,58,95,0.06)]"
            >
              <p className="font-display text-3xl font-semibold tabular-nums text-[#1F3A5F] md:text-[2rem]">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#5a6b82]">
                {s.label}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
