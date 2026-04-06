"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  Clock,
  GraduationCap,
  Mail,
  Microscope,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FacultyMember } from "@/data/faculty";
import { FACULTY_LIST } from "@/data/faculty";

function FacultyCard({ member, index }: { member: FacultyMember; index: number }) {
  const reduceMotion = useReducedMotion() === true;

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.45 }}
      className="h-full"
    >
      <Link
        href={`/faculty/${member.slug}`}
        className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-[#1F3A5F]/10 bg-white shadow-[0_4px_24px_rgba(31,58,95,0.07)] ring-1 ring-[#1F3A5F]/[0.04] transition hover:border-[#F68121]/35 hover:shadow-[0_20px_50px_rgba(31,58,95,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F68121] focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-[#1F3A5F]/10 sm:aspect-[3/4]">
          <Image
            src={member.imageUrl}
            alt={`${member.prefix} ${member.name}, ${member.designation}`}
            fill
            className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={90}
          />
          {/* Default overlay — name */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/50 to-transparent p-6 pt-24 transition-opacity duration-300 group-hover:opacity-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F68121]">
              {member.department}
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-white">
              {member.prefix} {member.name}
            </p>
            <p className="mt-1 text-sm text-white/85">{member.designation}</p>
          </div>
          {/* Hover overlay — major details */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0c1a2e] via-[#0c1a2e]/92 to-[#1F3A5F]/75 p-6 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F68121]">
              Quick profile
            </p>
            <p className="mt-2 text-sm font-semibold tracking-tight text-white">
              {member.prefix} {member.name}
            </p>
            <ul className="mt-4 space-y-3 text-left text-xs leading-snug text-white/90">
              <li className="flex gap-2">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[#F68121]" aria-hidden />
                <span>
                  <span className="font-semibold text-white">Qualification: </span>
                  {member.qualifications[0]}
                </span>
              </li>
              <li className="flex gap-2">
                <Microscope className="mt-0.5 h-4 w-4 shrink-0 text-[#F68121]" aria-hidden />
                <span>
                  <span className="font-semibold text-white">Focus: </span>
                  {member.specialization.slice(0, 2).join(" · ")}
                </span>
              </li>
              <li className="flex gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#F68121]" aria-hidden />
                <span>
                  <span className="font-semibold text-white">Experience: </span>
                  {member.experienceYears}+ years
                </span>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#F68121]" aria-hidden />
                <span className="break-all">{member.email}</span>
              </li>
            </ul>
            <p className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#F68121]">
              View full profile
              <span aria-hidden className="transition group-hover:translate-x-0.5">
                →
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col border-t border-[#1F3A5F]/8 bg-[#fafbfc] p-5 group-hover:bg-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5a6b82]">
            {member.department}
          </p>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#5a6b82]">{member.tagline}</p>
          <span className="mt-3 text-xs font-semibold text-[#1F3A5F] group-hover:text-[#F68121]">
            Tap for biography →
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

export function FacultyDirectory() {
  const reduceMotion = useReducedMotion() === true;

  return (
    <section className="border-b border-[#1F3A5F]/10 bg-[#f1f5f9] px-4 py-14 sm:px-6 sm:py-16 md:px-12 md:py-24 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F68121]">Our people</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-[#1F3A5F] md:text-4xl">
            Faculty directory
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#5a6b82] md:text-base">
            Meet professors and academic leaders — hover a card for qualifications, focus areas, and
            contact, or open a profile for the full story.
          </p>
        </motion.div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FACULTY_LIST.map((member, i) => (
            <FacultyCard key={member.slug} member={member} index={i} />
          ))}
        </ul>

        <p className="mt-12 text-center text-sm text-[#5a6b82]">
          <Award className="inline h-4 w-4 -translate-y-px text-[#F68121]" aria-hidden /> Profiles are
          representative; replace with your official directory or CMS when ready.
        </p>
      </div>
    </section>
  );
}
