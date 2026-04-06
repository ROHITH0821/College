"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HomeSectionLink } from "@/components/navigation/HomeSectionLink";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useIntroGate } from "@/context/IntroGateContext";

const heroImage = "/hero-courtyard.jpg";

const easeCinematic = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const { introComplete } = useIntroGate();
  const reduceMotion = useReducedMotion() === true;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], ["0%", "14%"]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0.92]);

  const blurHidden = reduceMotion ? "blur(0px)" : "blur(14px)";
  const blurShow = "blur(0px)";
  const yLift = reduceMotion ? 14 : 40;

  const centerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0.06 : 0.14,
        delayChildren: reduceMotion ? 0 : 0.06,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: yLift, filter: blurHidden },
    show: {
      opacity: 1,
      y: 0,
      filter: blurShow,
      transition: { duration: reduceMotion ? 0.45 : 1.05, ease: easeCinematic },
    },
  };

  const buttonsVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 10 : 28, filter: blurHidden },
    show: {
      opacity: 1,
      y: 0,
      filter: blurShow,
      transition: { duration: reduceMotion ? 0.4 : 0.9, ease: easeCinematic },
    },
  };

  const play = introComplete;

  return (
    <section
      id="hero"
      className="relative m-0 h-full min-h-0 w-full overflow-hidden bg-[#1a1a1a] p-0"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 m-0 overflow-hidden p-0"
      >
        <div className="absolute inset-0 scale-[1.06]">
          <Image
            src={heroImage}
            alt="Campus courtyard with lawns, paths, and a modern academic building on a bright day"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 to-transparent"
        aria-hidden
      />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 grid min-h-[100svh] grid-rows-[1fr_auto] px-6 md:px-12 lg:pr-16 lg:pl-[calc(var(--sidebar-offset)+4rem)]"
      >
        {/* Headline — offset for utility bar + mobile header */}
        <div className="flex min-h-0 flex-col items-center justify-center px-0 pb-8 pt-[calc(env(safe-area-inset-top)+var(--utility-bar-inner)+3.5rem+0.75rem)] text-center md:pb-12 md:pt-[calc(var(--utility-bar-inner)+1rem)]">
          <motion.div
            className="mx-auto w-full max-w-4xl"
            initial="hidden"
            animate={play ? "show" : "hidden"}
            variants={centerVariants}
          >
            <motion.h1
              variants={lineVariants}
              className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Shaping the Future Through Innovation
            </motion.h1>
            <motion.p
              variants={lineVariants}
              className="mx-auto mt-5 max-w-[min(100%,36rem)] font-display text-pretty text-lg font-bold leading-snug tracking-tight text-white/95 md:mt-6 md:text-[1.35rem] md:leading-snug lg:text-[1.4rem]"
            >
              A research-led institution where bold ideas meet world-class labs, industry
              partnerships, and a vibrant student community.
            </motion.p>
            <motion.div
              variants={buttonsVariants}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:mt-9"
            >
              <Link
                href="/programs"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#1F3A5F] px-7 py-3 text-[0.9375rem] font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.5)] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-[#2a4a73] hover:shadow-[0_20px_48px_rgba(15,23,42,0.55)] active:translate-y-0"
              >
                Explore Programs
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <HomeSectionLink
                href="/#apply"
                id="apply"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#F68121] px-7 py-3 text-[0.9375rem] font-semibold text-white shadow-[0_16px_40px_rgba(180,70,0,0.45)] ring-1 ring-white/25 transition hover:-translate-y-0.5 hover:bg-[#e77818] hover:shadow-[0_20px_48px_rgba(180,70,0,0.5)] active:translate-y-0"
              >
                Apply Now
              </HomeSectionLink>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: reduceMotion ? 0.2 : 0.85, duration: 0.6 }}
          className="pointer-events-none flex justify-center pb-10 pt-2 md:pb-12"
          aria-hidden
        >
          <div className="hidden h-14 w-[1px] bg-gradient-to-b from-white/50 to-transparent md:block" />
        </motion.div>
      </motion.div>
    </section>
  );
}
