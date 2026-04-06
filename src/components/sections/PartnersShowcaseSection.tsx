"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MOU_CARD_IMAGES } from "@/constants/home-section-media";
import { PartnerLogo } from "@/components/sections/PartnerLogo";
import { RECRUITER_LOGOS } from "@/data/recruiter-logos";

const mous = [
  { name: "Industry AI & ML", focus: "Joint labs & faculty upskilling" },
  { name: "Cyber security partner", focus: "Secure SDLC & threat labs" },
  { name: "Internships partner", focus: "Year-round internship tracks" },
  { name: "Digital skills", focus: "Full-stack & cloud certifications" },
  { name: "RPA centre", focus: "Automation & process design" },
  { name: "Business English", focus: "Communication & workplace readiness" },
] as const;

type PartnersShowcaseSectionProps = {
  /** Use `h1` on the dedicated `/partners` page for a single document heading. */
  heading?: "h1" | "h2";
};

export function PartnersShowcaseSection({ heading = "h2" }: PartnersShowcaseSectionProps) {
  const reduceMotion = useReducedMotion() === true;
  const Title = heading;

  return (
    <section
      id="partners"
      className="scroll-mt-[var(--home-sticky-top)] border-b border-[#1F3A5F]/10 bg-white px-4 py-14 text-[#1F3A5F] sm:px-6 sm:py-16 md:px-12 md:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F68121]">
            Recruiters & partnerships
          </p>
          <Title className="mt-3 font-display text-3xl font-semibold text-[#1F3A5F] md:text-4xl">
            Trusted by leading employers & collaborators
          </Title>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#5a6b82] md:text-[15px]">
            Representative recruiters from campus placement drives; MoUs reflect training, research,
            and internship collaborations — aligned with{" "}
            <a
              href="https://cmrec.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F68121] underline-offset-2 hover:underline"
            >
              CMREC
            </a>{" "}
            industry connect. Logos are crisp vector artwork where available; you can swap in your own
            official press-kit files anytime.
          </p>
        </motion.div>

        <div className="mt-12">
          <h3 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#1F3A5F]/55">
            Recruiters
          </h3>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-5">
            {RECRUITER_LOGOS.map((r, i) => (
              <motion.li
                key={r.name}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
              >
                <PartnerLogo name={r.name} logoSrc={r.logoSrc} />
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <h3 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#1F3A5F]/55">
            MoUs & programmes
          </h3>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mous.map((m, i) => (
              <motion.li
                key={m.name}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="overflow-hidden rounded-2xl border border-[#1F3A5F]/10 bg-white shadow-[0_12px_40px_-12px_rgba(31,58,95,0.12)] transition hover:border-[#1F3A5F]/18 hover:shadow-[0_16px_48px_-16px_rgba(31,58,95,0.16)]"
              >
                <div className="relative aspect-[16/10] w-full bg-[#f0f4f8]">
                  <Image
                    src={MOU_CARD_IMAGES[i] ?? MOU_CARD_IMAGES[0]}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={92}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1F3A5F]/25 via-transparent to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="border-t border-[#1F3A5F]/08 bg-[#fafbfd] p-5">
                  <p className="text-sm font-semibold text-[#1F3A5F]">{m.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#5a6b82]">{m.focus}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-center text-sm text-[#5a6b82]">
          See full placement stories on{" "}
          <Link href="/placements" className="font-semibold text-[#F68121] hover:underline">
            Placements
          </Link>{" "}
          and research MoUs on{" "}
          <Link href="/research" className="font-semibold text-[#F68121] hover:underline">
            Research
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
