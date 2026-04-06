import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type UtilityHeroVariant =
  | "navy"
  | "slate"
  | "orange"
  | "emerald"
  | "indigo"
  | "copper"
  | "rose"
  | "teal"
  | "sky"
  | "stone";

const HERO_GRADIENT: Record<UtilityHeroVariant, string> = {
  navy: "from-[#1F3A5F] via-[#152a4a] to-[#0a1a2e]",
  slate: "from-[#334155] via-[#1e293b] to-[#0f172a]",
  orange: "from-[#F68121] via-[#d96a0f] to-[#9a4a0a]",
  emerald: "from-[#0d6b4f] via-[#0a5a42] to-[#063d2a]",
  indigo: "from-[#3730a3] via-[#312e81] to-[#1e1b4b]",
  copper: "from-[#92400e] via-[#7c2d12] to-[#451a03]",
  rose: "from-[#9f1239] via-[#881337] to-[#4c0519]",
  teal: "from-[#0f766e] via-[#0d5c56] to-[#082f2c]",
  sky: "from-[#0369a1] via-[#075985] to-[#0c4a6e]",
  stone: "from-[#44403c] via-[#292524] to-[#1c1917]",
};

type Props = {
  title: string;
  eyebrow: string;
  description?: string;
  variant: UtilityHeroVariant;
  children: ReactNode;
  /** Optional pattern overlay for visual distinction */
  pattern?: "dots" | "grid" | "none";
};

export function UtilityPageLayout({
  title,
  eyebrow,
  description,
  variant,
  children,
  pattern = "dots",
}: Props) {
  const grad = HERO_GRADIENT[variant];
  const patternClass =
    pattern === "dots"
      ? "bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:20px_20px]"
      : pattern === "grid"
        ? "bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]"
        : "";

  return (
    <>
      <section
        className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-br ${grad} px-4 pb-14 pt-9 sm:px-6 sm:pb-16 sm:pt-10 md:px-12 md:pb-20 md:pt-12 lg:px-16`}
      >
        {pattern !== "none" && (
          <div
            className={`pointer-events-none absolute inset-0 opacity-60 ${patternClass}`}
            aria-hidden
          />
        )}
        <div className="relative mx-auto max-w-4xl">
          <nav className="mb-8 flex flex-wrap items-center gap-1 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
            <span className="font-medium text-white/95">{title}</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F68121]">{eyebrow}</p>
          <h1 className="mt-4 break-words font-display text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{description}</p>
          ) : null}
        </div>
      </section>

      <div className="relative z-[1] -mt-6 rounded-t-3xl border border-[#1F3A5F]/8 bg-white px-4 py-10 shadow-[0_-12px_40px_rgba(31,58,95,0.08)] sm:px-6 sm:py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-4xl">{children}</div>
      </div>
    </>
  );
}
