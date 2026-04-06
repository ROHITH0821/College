"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Brain,
  Briefcase,
  Cpu,
  Database,
  Globe2,
  Network,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/** Stable Unsplash URLs (format + crop) — all people / campus / professional contexts */
const programs: readonly {
  title: string;
  tag: string;
  desc: string;
  icon: LucideIcon;
  image: string;
  photoAlt: string;
}[] = [
  {
    title: "Computer Science & Engineering",
    tag: "CSE",
    desc: "Systems, architecture, and full-stack engineering with industry mentors and modern labs.",
    icon: Cpu,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=85",
    photoAlt:
      "Students working together with laptops in a bright campus learning space",
  },
  {
    title: "Artificial Intelligence & ML",
    tag: "AI / ML",
    desc: "Deep learning, NLP, and responsible AI with dedicated GPU clusters and research cohorts.",
    icon: Brain,
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1600&q=85",
    photoAlt: "Two people collaborating over a laptop in a bright workspace",
  },
  {
    title: "Data Science",
    tag: "Data",
    desc: "Statistics, big data pipelines, and visualization at production scale with real datasets.",
    icon: Database,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85",
    photoAlt: "Colleagues meeting around a table to review data and strategy",
  },
  {
    title: "Cybersecurity & Networks",
    tag: "Security",
    desc: "Zero-trust design, ethical hacking, and secure cloud operations with hands-on ranges.",
    icon: Network,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=85",
    photoAlt: "Team collaborating on laptops in an open office",
  },
  {
    title: "Electronics & IoT",
    tag: "ECE",
    desc: "Embedded systems, robotics, and smart infrastructure projects from prototype to deployment.",
    icon: Globe2,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=85",
    photoAlt: "Hands working with electronics and tools in an engineering lab",
  },
  {
    title: "Business Administration",
    tag: "MBA",
    desc: "Leadership, analytics, and entrepreneurship with live industry cases and mentor studios.",
    icon: Briefcase,
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=85",
    photoAlt: "Professionals shaking hands in a business meeting",
  },
];

export function ProgramsSection() {
  return (
    <section
      id="programs"
      className="relative border-b border-[#1F3A5F]/10 bg-[#0a1628] text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-6 pt-20 md:px-10 md:pt-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F68121]">
            Academics &amp; Schools
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-[2.5rem]">
            Programs &amp; departments
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/70">
            Interdisciplinary tracks aligned with industry and research — each school below
            opens with a full visual so you can feel the space before you read the details.
          </p>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-[1600px] space-y-0 px-0 pb-20 pt-10 md:pb-28">
        {programs.map((p, i) => {
          const Icon = p.icon;
          const reverse = i % 2 === 1;
          return (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.04 }}
              className={`group flex min-h-[min(100vw,420px)] flex-col border-t border-white/10 md:min-h-[380px] lg:min-h-[440px] lg:flex-row lg:items-stretch ${
                reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              <Link
                href="/contact"
                className="relative flex w-full items-center justify-center px-5 pb-6 pt-2 md:px-8 md:pb-8 lg:w-[54%] lg:px-10 lg:py-10"
              >
                <div className="relative aspect-[4/3] w-full max-w-[720px] overflow-hidden rounded-2xl border-[3px] border-white bg-white shadow-[0_16px_48px_rgba(0,0,0,0.45)] ring-1 ring-white/40 lg:aspect-auto lg:h-[min(420px,52vh)] lg:min-h-[400px] lg:max-h-[480px]">
                  <Image
                    src={p.image}
                    alt={p.photoAlt}
                    fill
                    className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 54vw"
                    quality={88}
                    priority={i < 2}
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent md:h-28"
                    aria-hidden
                  />
                  <span className="absolute left-4 top-4 z-[1] inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-white/25 backdrop-blur-sm">
                    <Icon className="h-3.5 w-3.5 text-[#F68121]" aria-hidden />
                    {p.tag}
                  </span>
                </div>
              </Link>

              <div
                className={`flex flex-1 flex-col justify-center px-6 py-8 md:px-10 lg:w-[46%] lg:py-14 lg:pl-14 lg:pr-16 ${
                  reverse ? "lg:pl-16 lg:pr-14" : ""
                }`}
              >
                <h3 className="font-display text-2xl font-semibold leading-snug md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
                  {p.desc}
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#F68121] transition hover:gap-3"
                >
                  Explore program
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
