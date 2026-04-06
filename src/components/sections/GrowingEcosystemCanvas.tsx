"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type EcosystemFeature = {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  icon: LucideIcon;
};

type Props = {
  features: EcosystemFeature[];
  active: number;
  onSelect: (index: number) => void;
};

/** Organic cubic path from center to (ex, ey) in viewBox 0–100 space */
function organicBranch(
  cx: number,
  cy: number,
  ex: number,
  ey: number,
  bendIndex: number,
): string {
  const dx = ex - cx;
  const dy = ey - cy;
  const len = Math.hypot(dx, dy) || 1;
  const px = (-dy / len) * (6 + (bendIndex % 3) * 1.5);
  const py = (dx / len) * (6 + (bendIndex % 3) * 1.5);
  const c1x = cx + dx * 0.32 + px * 0.55;
  const c1y = cy + dy * 0.32 + py * 0.55;
  const c2x = cx + dx * 0.68 + px * -0.35;
  const c2y = cy + dy * 0.68 + py * -0.35;
  return `M ${cx} ${cy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`;
}

export function GrowingEcosystemCanvas({ features, active, onSelect }: Props) {
  const reduceMotion = useReducedMotion() === true;
  const uid = useId().replace(/:/g, "");
  const gradActive = `eco-active-${uid}`;
  const gradIdle = `eco-idle-${uid}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothX = useSpring(mx, { stiffness: 32, damping: 20 });
  const smoothY = useSpring(my, { stiffness: 32, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const growth = useTransform(scrollYProgress, [0.08, 0.55], [0, 1]);
  const growthSpring = useSpring(growth, { stiffness: 40, damping: 28 });
  const layerY = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const layerYSpring = useSpring(layerY, { stiffness: 36, damping: 26 });
  const layerX = useTransform(smoothX, [-1, 1], [-5, 5]);
  const layerRotate = useTransform(smoothY, [-1, 1], [-1, 1]);
  const pathGroupOpacity = useTransform(growthSpring, [0, 0.12], [0.4, 1]);
  const seedScale = useTransform(growthSpring, [0, 1], [0.88, 1.06]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my, reduceMotion]);

  const n = features.length;
  const step = 360 / n;
  const cx = 50;
  const cy = 50;
  /** ViewBox radius — tuned so 8 nodes + card width stay inside the padded frame without clipping. */
  const radius = 40;

  const nodes = useMemo(
    () =>
      features.map((_, i) => {
        const deg = i * step - 90;
        const rad = (deg * Math.PI) / 180;
        return {
          x: cx + radius * Math.cos(rad),
          y: cy + radius * Math.sin(rad),
        };
      }),
    [features, step],
  );

  const paths = useMemo(
    () => nodes.map((end, i) => organicBranch(cx, cy, end.x, end.y, i)),
    [nodes],
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[1.75rem] border border-[#1F3A5F]/[0.08] bg-[linear-gradient(165deg,#ffffff_0%,#f4f8fc_42%,#eef4f9_100%)] p-4 shadow-[0_24px_70px_rgba(31,58,95,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-white/90 sm:p-5 md:p-6"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(246,129,33,0.07)_0%,transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(31,58,95,0.04)_0%,transparent_45%)]"
        aria-hidden
      />

      <motion.div
        className="relative mx-auto flex w-full max-w-[min(100%,540px)] flex-col gap-4 sm:gap-5"
        style={{ y: layerYSpring, x: layerX, rotate: layerRotate }}
      >
        {/* Graph layer: inset box so viewBox 0–100 matches card % positions (paths meet card centers). */}
        <div className="relative mx-auto w-full min-h-[min(88vw,420px)] sm:min-h-[min(86vw,440px)] md:min-h-[460px]">
          <div className="absolute inset-[6%]">
        <motion.svg
          className="absolute inset-0 text-[#1F3A5F]"
          viewBox="0 0 100 100"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
          style={{ opacity: reduceMotion ? 1 : pathGroupOpacity }}
        >
          <defs>
            <linearGradient id={gradActive} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1F3A5F" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#F68121" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#6DBE45" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id={gradIdle} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1F3A5F" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#1F3A5F" stopOpacity="0.22" />
            </linearGradient>
          </defs>

          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke={active === i ? `url(#${gradActive})` : `url(#${gradIdle})`}
              strokeWidth={active === i ? 0.85 : 0.38}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={reduceMotion ? 1 : growthSpring}
            />
          ))}
        </motion.svg>

        {/* Center seed — student potential */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative flex h-12 w-12 items-center justify-center md:h-14 md:w-14"
            style={{ scale: reduceMotion ? 1 : seedScale }}
          >
            <div
              className="pointer-events-none absolute inset-[-55%] rounded-full bg-[radial-gradient(circle,rgba(246,129,33,0.35)_0%,rgba(31,58,95,0.12)_45%,transparent_70%)] blur-md"
              aria-hidden
            />
            <motion.div
              animate={
                reduceMotion
                  ? {}
                  : {
                      boxShadow: [
                        "0 0 20px rgba(246,129,33,0.35), 0 0 40px rgba(31,58,95,0.2)",
                        "0 0 28px rgba(246,129,33,0.5), 0 0 52px rgba(31,58,95,0.28)",
                        "0 0 20px rgba(246,129,33,0.35), 0 0 40px rgba(31,58,95,0.2)",
                      ],
                    }
              }
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-9 w-9 rounded-full bg-gradient-to-br from-[#F68121] via-[#f59a4a] to-[#1F3A5F] shadow-[inset_0_1px_2px_rgba(255,255,255,0.45)] ring-2 ring-white/90 md:h-10 md:w-10"
            />
            <span className="sr-only">Growth from student potential</span>
          </motion.div>
        </div>

        {/* Branch nodes — glass cards */}
        {features.map((f, i) => {
          const Icon = f.icon;
          const nx = nodes[i].x;
          const ny = nodes[i].y;
          const isActive = active === i;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={isActive}
              aria-label={f.title}
              onClick={() => onSelect(i)}
              className="absolute z-[25] w-[6rem] -translate-x-1/2 -translate-y-1/2 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F68121] sm:w-[6.5rem] md:w-[7rem]"
              style={{
                left: `${nx}%`,
                top: `${ny}%`,
              }}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.05 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={`relative overflow-hidden rounded-xl border px-2 py-2 text-left shadow-[0_8px_28px_rgba(31,58,95,0.08)] backdrop-blur-md transition-shadow sm:rounded-2xl sm:px-2.5 sm:py-2.5 ${
                  isActive
                    ? "border-[#F68121]/45 bg-white/90 ring-2 ring-[#F68121]/25 shadow-[0_16px_44px_rgba(31,58,95,0.14)]"
                    : "border-[#1F3A5F]/[0.1] bg-white/75 hover:border-[#1F3A5F]/18"
                }`}
              >
                <div
                  className={`mb-1 flex h-7 w-7 items-center justify-center rounded-lg sm:mb-1.5 sm:h-8 sm:w-8 sm:rounded-xl md:h-9 md:w-9 ${
                    isActive
                      ? "bg-[#1F3A5F] text-white shadow-[0_4px_14px_rgba(31,58,95,0.25)]"
                      : "bg-[#1F3A5F]/[0.06] text-[#1F3A5F]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-[18px] md:w-[18px]" aria-hidden />
                </div>
                <p
                  className={`text-[8px] font-bold uppercase leading-tight tracking-[0.14em] sm:text-[9px] sm:tracking-[0.18em] md:text-[10px] ${
                    isActive ? "text-[#F68121]" : "text-[#F68121]/80"
                  }`}
                >
                  {f.tagline}
                </p>
                <p className="mt-0.5 font-display text-[10px] font-bold leading-snug text-[#1F3A5F] sm:mt-1 sm:text-[11px] md:text-xs">
                  {f.title}
                </p>
              </motion.div>
            </button>
          );
        })}
          </div>
        </div>

        {/* Active story — below the graph so it never covers blooms */}
        <div className="pointer-events-none w-full shrink-0 px-0.5">
          <AnimatePresence mode="wait">
            <motion.div
              key={features[active].id}
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto rounded-2xl border border-[#1F3A5F]/[0.1] bg-white/90 px-4 py-3 text-center shadow-[0_12px_40px_rgba(31,58,95,0.1)] ring-1 ring-white/90 backdrop-blur-md md:px-5 md:py-3.5"
            >
              <p className="text-pretty text-[12px] leading-relaxed text-[#4a5a6f] md:text-[13px]">
                {features[active].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <p className="sr-only" aria-live="polite">
        Focused strength: {features[active].title}
      </p>
    </div>
  );
}
