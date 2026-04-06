"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/** Campus life / peer success — distinct from other sections; not stock laptop-only shots */
const PLACEMENT_PHOTO =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=90";

const recruiters = [
  "Accenture",
  "Amazon",
  "Capgemini",
  "Cognizant",
  "Deloitte",
  "Infosys",
  "JUSPAY",
  "PwC",
  "TCS",
] as const;

export function PlacementsSection() {
  return (
    <section
      id="placements"
      className="border-b border-[#1F3A5F]/10 bg-[#0c1f36] px-4 py-16 text-white md:px-10 md:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="relative flex min-h-[280px] items-center justify-center lg:min-h-[360px]"
          >
            <div className="relative aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-2xl border-[3px] border-white bg-white shadow-[0_20px_56px_rgba(0,0,0,0.4)] ring-1 ring-white/30 lg:aspect-[5/4] lg:max-h-[400px]">
              <Image
                src={PLACEMENT_PHOTO}
                alt="Diverse group of college students together on campus, representing student success and community"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 420px"
                quality={90}
                priority={false}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="flex flex-col justify-center"
          >
            <p className="text-5xl font-bold leading-none tracking-tight md:text-6xl lg:text-7xl">
              700+
            </p>
            <p className="mt-4 text-lg font-semibold leading-snug text-white/95 md:text-xl">
              Students Placed in Academic Year (2024–2025)
            </p>
            <p className="mt-5 text-sm leading-relaxed text-white/80 md:text-base">
              Hearty congratulations to the students placed through campus placement drives in{" "}
              {recruiters.slice(0, -1).join(", ")}, and {recruiters[recruiters.length - 1]} — and
              many more.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-[#F68121] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-[#e77818]"
              >
                View All Placements
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 text-center font-sans text-2xl font-extrabold tracking-tight text-white md:mt-16 md:text-3xl lg:text-4xl"
        >
          <span className="text-white">Think </span>
          <span className="text-[#F68121]">Placements</span>
          <span className="text-white"> Think CMR</span>
        </motion.p>

      </div>
    </section>
  );
}
