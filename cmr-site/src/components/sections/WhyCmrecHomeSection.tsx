"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  Cpu,
  GraduationCap,
  Leaf,
  Lightbulb,
  Microscope,
  Trophy,
  Users2,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { WHY_CMREC_BANNER, WHY_PILLAR_IMAGES } from "@/constants/home-section-media";

const pillars: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: "Centres of excellence",
    desc: "Industry-led labs and training partnerships for research and employability.",
    icon: Building2,
  },
  {
    title: "Institution Innovation Council",
    desc: "MHRD-aligned IIC ecosystem to turn student ideas into prototypes.",
    icon: Lightbulb,
  },
  {
    title: "Placements & internships",
    desc: "Campus drives, mock interviews, and internships from the first year onward.",
    icon: Trophy,
  },
  {
    title: "Industry-ready curriculum",
    desc: "Emerging-tech tracks, capstones, and certification pathways.",
    icon: Cpu,
  },
  {
    title: "360° student development",
    desc: "Clubs, sports, NSS, and leadership opportunities beyond the classroom.",
    icon: Users2,
  },
  {
    title: "Green campus",
    desc: "Reduce · reuse · recycle — sustainability woven into campus life.",
    icon: Leaf,
  },
  {
    title: "Scholarships & support",
    desc: "Merit and need-based assistance with mentoring and counselling.",
    icon: GraduationCap,
  },
  {
    title: "Research & IP",
    desc: "Guidance for papers, patents, and funded projects with faculty mentors.",
    icon: Microscope,
  },
];

export function WhyCmrecHomeSection() {
  const reduceMotion = useReducedMotion() === true;

  return (
    <section
      id="why-cmrec"
      className="scroll-mt-[var(--home-sticky-top)] border-b border-[#1F3A5F]/10 bg-white px-6 py-16 md:px-12 md:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F68121]">
            Why CMREC?
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#1F3A5F] md:text-4xl">
            Built for outcomes — academics, innovation, and community
          </h2>
          <p className="mt-4 text-lg italic leading-relaxed text-[#5a6b82]">
            &ldquo;To continuously produce employable technical graduates with advanced skills to meet
            current and future technological needs of society.&rdquo;
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="relative mt-10 w-full overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(31,58,95,0.12)] ring-1 ring-[#1F3A5F]/10"
        >
          <Image
            src={WHY_CMREC_BANNER}
            alt="Students collaborating in a campus learning space"
            width={2400}
            height={1029}
            sizes="(max-width: 1280px) 100vw, 1152px"
            className="block h-auto w-full object-cover object-[center_28%]"
            quality={92}
            priority={false}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1f3a5f]/45 to-transparent"
            aria-hidden
          />
        </motion.div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            const photo = WHY_PILLAR_IMAGES[i] ?? WHY_PILLAR_IMAGES[0];
            return (
              <motion.li
                key={p.title}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="overflow-hidden rounded-2xl border border-[#1F3A5F]/10 bg-[#fafbfc] shadow-sm"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={photo}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={90}
                  />
                </div>
                <div className="p-5">
                  <Icon className="h-6 w-6 text-[#F68121]" aria-hidden />
                  <h3 className="mt-3 text-sm font-semibold text-[#1F3A5F]">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#5a6b82]">{p.desc}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
