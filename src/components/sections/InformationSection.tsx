"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

/** Outdoor campus scene — distinct from Highlights (indoor study). URL verified (Unsplash). */
const DESK_IMAGE =
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=90";

export function InformationSection() {
  return (
    <section
      id="information"
      className="flex min-h-[100svh] flex-col justify-center border-b border-[#1F3A5F]/10 bg-gradient-to-b from-white via-[#fafbfd] to-[#F5F7FA] px-4 py-10 md:px-8 md:py-12"
    >
      <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 overflow-hidden rounded-3xl border border-[#1F3A5F]/10 bg-white shadow-[0_20px_60px_rgba(31,58,95,0.07)] md:mx-6 lg:mx-auto lg:min-h-[min(78vh,720px)] lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="order-2 flex flex-col justify-center px-8 py-12 md:px-12 md:py-16 lg:order-1 lg:pl-14 lg:pr-10"
        >
          <span
            className="mb-5 inline-block h-1 w-14 rounded-full bg-[#F68121]"
            aria-hidden
          />
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F68121]">
            Information Desk
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-[#1F3A5F] md:text-3xl">
            Admissions, scholarships &amp; campus visits
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#5a6b82] md:text-base">
            Download brochures, check eligibility, and book a guided tour. Our team
            usually replies within one business day.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/downloads"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#1F3A5F]/15 bg-white px-6 py-3.5 text-sm font-semibold text-[#1F3A5F] transition hover:border-[#F68121]/50 hover:text-[#1F3A5F]"
            >
              <FileText className="h-4 w-4" aria-hidden />
              View prospectus
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F68121] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#F68121]/25 transition hover:bg-[#e77818]"
            >
              Talk to admissions
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="order-1 flex w-full items-center justify-center p-5 md:p-8 lg:order-2 lg:min-h-[420px] lg:p-10"
        >
          <div className="relative aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-2xl border-[3px] border-white bg-white shadow-[0_12px_40px_rgba(31,58,95,0.12)] ring-1 ring-[#1F3A5F]/10 lg:aspect-[5/4] lg:max-h-[400px] lg:max-w-none">
            <Image
              src={DESK_IMAGE}
              alt="University campus with academic buildings and open space"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 45vw"
              quality={90}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
