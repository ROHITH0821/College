"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  Briefcase,
  Cpu,
  FlaskConical,
  Leaf,
  Microscope,
  ShieldCheck,
  Users2,
  type LucideIcon,
} from "lucide-react";
import { GrowingEcosystemCanvas } from "@/components/sections/GrowingEcosystemCanvas";

const features: {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    id: "accredited",
    title: "Accredited & autonomous",
    tagline: "Trusted credentials",
    desc: "UGC Autonomous journey with NAAC, NBA, and programs aligned to industry needs.",
    icon: ShieldCheck,
  },
  {
    id: "labs",
    title: "Labs that stay current",
    tagline: "Build-ready infrastructure",
    desc: "Robotics, AI, IoT, and fabrication spaces updated around modern stacks.",
    icon: FlaskConical,
  },
  {
    id: "placements",
    title: "Placements with momentum",
    tagline: "Recruiter-ready talent",
    desc: "Campus drives, mock interviews, and alumni mentors who know the process.",
    icon: Briefcase,
  },
  {
    id: "research",
    title: "Research & innovation",
    tagline: "Beyond the syllabus",
    desc: "Centers, funded projects, and guidance for papers, patents, and prototypes.",
    icon: Microscope,
  },
  {
    id: "computing",
    title: "Computing & AI depth",
    tagline: "Modern platforms",
    desc: "GPU access, cloud sandboxes, and capstones tied to real product cycles.",
    icon: Cpu,
  },
  {
    id: "green",
    title: "Green campus mindset",
    tagline: "Reduce · reuse · recycle",
    desc: "Energy awareness, waste segregation, and open spaces for focus and wellbeing.",
    icon: Leaf,
  },
  {
    id: "community",
    title: "Student-first community",
    tagline: "Clubs & culture",
    desc: "Technical clubs, national events, and inclusive spaces to learn together.",
    icon: Users2,
  },
  {
    id: "support",
    title: "Merit & support",
    tagline: "Accessible pathways",
    desc: "Scholarships, mentoring, and counseling so students stay on track.",
    icon: Award,
  },
];

const AUTO_MS = 6000;

export function WhyChooseSection() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % features.length);
    }, AUTO_MS);
    return () => clearInterval(t);
  }, [reduceMotion]);

  return (
    <section
      id="why-choose"
      className="border-b border-[#1F3A5F]/10 bg-gradient-to-b from-[#e8f2ec] via-[#f4faf6] to-[#f0f4f8] px-4 py-14 sm:px-6 sm:py-16 md:px-12 md:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="max-w-xl lg:max-w-none lg:pt-2"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.42em] text-[#F68121] md:text-xs">
              Why Choose Us
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#1F3A5F] md:mt-4 md:text-4xl lg:text-[2.625rem]">
              Why CMR?
            </h2>
            <p className="mt-5 text-pretty text-base font-medium leading-relaxed text-[#1F3A5F]/92 md:mt-6 md:text-lg md:leading-relaxed">
              To continuously produce employable technical graduates with advanced skills
              that meet current and future needs — with ethics, sustainability, and
              curiosity at the center.
            </p>
            <div className="mt-6 rounded-2xl border border-[#1F3A5F]/[0.1] bg-white/70 p-4 shadow-[0_8px_32px_rgba(31,58,95,0.06)] ring-1 ring-white/80 backdrop-blur-sm md:mt-7 md:p-5">
              <p className="text-[13px] leading-relaxed text-[#5a6b82] md:text-sm">
                Watch the network grow from a single seed — scroll to unfurl branches, tap a
                bloom to focus, or let the story advance on its own.
                {reduceMotion ? "" : " Auto-advance every few seconds."}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-2.5 md:mt-8" aria-label="Jump to a highlight">
              {features.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  title={f.title}
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                  className={`flex h-11 min-w-[2.75rem] items-center justify-center rounded-full px-3 text-center text-xs font-bold tabular-nums transition active:scale-[0.97] md:h-10 md:min-w-[2.5rem] ${
                    active === i
                      ? "bg-[#1F3A5F] text-white shadow-[0_8px_24px_rgba(31,58,95,0.35)] ring-2 ring-[#F68121]/70 ring-offset-2 ring-offset-[#f4faf6]"
                      : "bg-white text-[#1F3A5F] shadow-sm ring-1 ring-[#1F3A5F]/12 hover:ring-2 hover:ring-[#F68121]/35"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55 }}
            className="relative mx-auto w-full max-w-[min(100%,540px)]"
          >
            <GrowingEcosystemCanvas features={features} active={active} onSelect={setActive} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
