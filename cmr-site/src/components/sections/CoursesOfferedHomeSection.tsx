"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { COURSE_CARD_IMAGES } from "@/constants/home-section-media";

const courses: { title: string; level: string; slug: string }[] = [
  { title: "Computer Science & Engineering", level: "B.Tech", slug: "programs" },
  { title: "Electronics & Communication Engineering", level: "B.Tech", slug: "programs" },
  { title: "CSE – Artificial Intelligence & Machine Learning", level: "B.Tech", slug: "programs" },
  { title: "CSE – Data Science", level: "B.Tech", slug: "programs" },
  { title: "Information Technology", level: "B.Tech", slug: "programs" },
  { title: "CSE – Cyber Security", level: "B.Tech", slug: "programs" },
  { title: "Very Large Scale Integration (VLSI)", level: "M.Tech", slug: "programs" },
  { title: "Computer Science & Engineering", level: "M.Tech", slug: "programs" },
  { title: "PhD programmes", level: "Research", slug: "research" },
];

function courseImageKey(title: string, level: string) {
  return `${title}-${level}`;
}

export function CoursesOfferedHomeSection() {
  const reduceMotion = useReducedMotion() === true;

  return (
    <section
      id="courses"
      className="scroll-mt-[var(--home-sticky-top)] border-b border-[#1F3A5F]/10 bg-[#f8fafc] px-6 py-16 md:px-12 md:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F68121]">
              Courses offered
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-[#1F3A5F] md:text-4xl">
              Programmes at a glance
            </h2>
            <p className="mt-3 max-w-xl text-[#5a6b82]">
              Undergraduate, postgraduate, and doctoral pathways aligned with industry and research
              priorities — explore full curriculum details on Academics.
            </p>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#1F3A5F]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#1F3A5F] shadow-sm transition hover:border-[#F68121]/40 hover:text-[#F68121] md:self-auto"
          >
            View all programmes
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => {
            const k = courseImageKey(c.title, c.level);
            const img =
              (COURSE_CARD_IMAGES as Record<string, string>)[k] ??
              COURSE_CARD_IMAGES["Computer Science & Engineering-B.Tech"];
            return (
              <motion.li
                key={`${c.title}-${c.level}`}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  href={`/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1F3A5F]/10 bg-white shadow-[0_2px_12px_rgba(31,58,95,0.05)] transition hover:border-[#F68121]/35 hover:shadow-[0_12px_40px_rgba(31,58,95,0.08)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1F3A5F]/10">
                    <Image
                      src={img}
                      alt={c.title}
                      fill
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={92}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#1F3A5F]/[0.06] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1F3A5F]/80">
                      <GraduationCap className="h-3.5 w-3.5" aria-hidden />
                      {c.level}
                    </span>
                    <span className="mt-3 text-sm font-semibold leading-snug text-[#1F3A5F] group-hover:text-[#F68121]">
                      {c.title}
                    </span>
                    <span className="mt-2 text-xs font-semibold text-[#F68121] opacity-0 transition group-hover:opacity-100">
                      Read more →
                    </span>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
