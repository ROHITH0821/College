"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ACCREDITATION_LOGOS, type AccreditationLogo } from "@/data/accreditation-logos";
import { FeaturedMediaMarquee } from "@/components/sections/FeaturedMediaMarquee";

function AccreditationMark({ logo }: { logo: AccreditationLogo }) {
  if (logo.src.endsWith(".svg")) {
    return (
      <img
        src={logo.src}
        alt={logo.alt}
        className="max-h-[7.25rem] w-full max-w-full object-contain md:max-h-[8.25rem]"
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <div className="relative h-[7.25rem] w-full min-w-0 md:h-[8.25rem]">
      <Image
        src={logo.src}
        alt={logo.alt}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1280px) 22vw, 280px"
        className="object-contain object-center p-0.5"
        quality={92}
      />
    </div>
  );
}

export function AccreditationsSection() {
  return (
    <section
      id="accreditations"
      className="flex w-full flex-col self-start overflow-hidden rounded-t-3xl border-b border-[#1F3A5F]/10 bg-white"
      aria-labelledby="accreditations-heading"
    >
      <div className="w-full shrink-0 px-3 pt-6 sm:px-5 md:px-8 md:pt-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2
            id="accreditations-heading"
            className="font-display text-2xl font-semibold tracking-tight text-[#1F3A5F] md:text-3xl"
          >
            Trust &amp; Recognition
          </h2>
          <p className="mt-2 text-sm text-[#5a6b82]">
            Accreditations and rankings — official marks
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
        className="mt-5 w-full shrink-0 px-3 pb-0 sm:px-5 md:px-8 lg:px-10"
      >
        <ul
          className="grid w-full grid-cols-2 gap-x-2.5 gap-y-4 sm:grid-cols-4 sm:gap-x-3 sm:gap-y-5 md:gap-x-4 md:gap-y-6"
          aria-label="Accreditation and ranking logos"
        >
          {ACCREDITATION_LOGOS.map((logo, i) => (
            <motion.li
              key={logo.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.04, 0.35), duration: 0.4 }}
              className="flex min-h-0 flex-col items-stretch text-center"
            >
              <div className="flex min-h-[8.75rem] w-full items-center justify-center rounded-2xl border border-[#1F3A5F]/[0.1] bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-2.5 py-3 shadow-[0_4px_20px_rgba(31,58,95,0.06)] sm:px-3 md:min-h-[9.5rem] md:px-4 md:py-4">
                <div className="flex w-full items-center justify-center">
                  <AccreditationMark logo={logo} />
                </div>
              </div>
              <span className="mt-2.5 flex min-h-[2.75rem] items-start justify-center px-0.5 text-[10px] font-semibold uppercase leading-snug tracking-[0.1em] text-[#5a6b82] sm:text-[11px] md:mt-3 md:min-h-[3rem] md:text-xs">
                {logo.label}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <FeaturedMediaMarquee />
    </section>
  );
}
