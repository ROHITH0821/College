"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Department } from "@/data/departments";

const THUMB_W = 168;
const THUMB_H = 120;

const focusCard =
  "rounded-2xl border border-[#1F3A5F]/12 bg-white shadow-sm outline-none transition hover:border-[#1F3A5F]/22 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#F68121] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export function DepartmentsShowcase({ departments }: { departments: Department[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="mx-auto grid max-w-6xl list-none gap-4 p-0 sm:grid-cols-2">
      {departments.map((d, index) => {
        const headingId = `dept-card-title-${d.slug}`;
        return (
          <motion.li
            key={d.slug}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              delay: reduceMotion ? 0 : index * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={`/departments/${d.slug}`}
              className={`group flex h-full flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:gap-5 sm:p-5 ${focusCard}`}
              aria-labelledby={headingId}
            >
              <div className="relative mx-auto aspect-[7/5] w-full max-w-[200px] shrink-0 overflow-hidden rounded-xl bg-[#f0f4f8] sm:mx-0 sm:w-[168px] sm:max-w-none">
                <Image
                  src={d.coverImage}
                  alt={d.coverAlt}
                  width={THUMB_W}
                  height={THUMB_H}
                  sizes="(max-width: 640px) 200px, 168px"
                  className="h-full w-full object-cover transition duration-300 group-hover:opacity-95"
                  priority={index < 2}
                  quality={85}
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c45f0f]">
                  {d.code}
                </p>
                <h2
                  id={headingId}
                  className="mt-1 font-display text-lg font-semibold leading-snug text-[#1F3A5F] transition group-hover:text-[#0f2744]"
                >
                  {d.name}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5a6b82]">{d.description}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F3A5F] underline-offset-2 group-hover:text-[#F68121] group-hover:underline">
                  Department page
                  <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
