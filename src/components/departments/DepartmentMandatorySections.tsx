"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  BookOpen,
  Briefcase,
  CalendarDays,
  ClipboardCheck,
  FlaskConical,
  GraduationCap,
  Leaf,
  Library,
  Lightbulb,
  Link2,
  MessageSquare,
  Newspaper,
  PartyPopper,
  Scale,
  Search,
  Target,
  Trophy,
  TrendingUp,
  UserCircle2,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Department } from "@/data/departments";
import {
  type MandatorySectionDef,
  type MandatorySectionId,
  MANDATORY_DEPARTMENT_SECTIONS,
  formatSectionLabel,
  getMandatorySectionBody,
} from "@/data/department-mandatory-sections";

const SECTION_ICONS: Record<MandatorySectionId, LucideIcon> = {
  rules: Scale,
  newsletter: Newspaper,
  syllabus: BookOpen,
  feedback: MessageSquare,
  fdp: GraduationCap,
  placements: Briefcase,
  "academic-activities": CalendarDays,
  obe: Target,
  sdg: Leaf,
  "higher-ed": TrendingUp,
  notifications: Bell,
  "e-resources": Library,
  "other-links": Link2,
  "innovation-teaching": Lightbulb,
  rnd: FlaskConical,
  "faculty-appraisal": ClipboardCheck,
  "visiting-faculty": Users,
  "co-academic": Trophy,
  events: PartyPopper,
  "faculty-list": UserCircle2,
};

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#F68121]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffefb]";

function SectionBody({
  def,
  department,
}: {
  def: MandatorySectionDef;
  department: Department;
}) {
  const body = getMandatorySectionBody(def.id, department.name, department.code);

  return (
    <div className="space-y-4">
      <p className="max-w-prose text-[15px] leading-[1.65] text-[#5a6b82] md:text-base md:leading-relaxed">
        {body}
      </p>
      {def.id === "rnd" && (
        <p>
          <Link
            href="/research"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F3A5F] underline-offset-2 transition hover:text-[#F68121] hover:underline ${focusRing} rounded-sm`}
          >
            College research overview →
          </Link>
        </p>
      )}
      {def.id === "placements" && (
        <p>
          <Link
            href="/placements"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F3A5F] underline-offset-2 transition hover:text-[#F68121] hover:underline ${focusRing} rounded-sm`}
          >
            Placements & careers →
          </Link>
        </p>
      )}
      {def.id === "faculty-list" && (
        <p>
          <Link
            href="/faculty"
            className={`inline-flex items-center gap-2 rounded-full bg-[#1F3A5F] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2a4a73] ${focusRing} ring-offset-2 ring-offset-white`}
          >
            Open faculty directory
          </Link>
        </p>
      )}
    </div>
  );
}

function SearchField({
  id,
  label,
  value,
  onChange,
  onClear,
  placeholder,
  compactLabel,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  placeholder: string;
  compactLabel?: boolean;
}) {
  const hasQuery = value.trim().length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`mb-2 flex items-center gap-2 uppercase tracking-wide text-[#1F3A5F]/70 ${compactLabel ? "text-xs font-semibold" : "text-[11px] font-bold tracking-[0.2em] text-[#1F3A5F]/55"}`}
      >
        <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          aria-describedby={`${id}-hint`}
          className={`w-full rounded-xl border border-[#1F3A5F]/15 bg-white py-2.5 pl-3.5 pr-10 text-sm text-[#1F3A5F] placeholder:text-[#5a6b82]/60 transition ${compactLabel ? "md:py-2.5" : "py-2"} outline-none focus:border-[#1F3A5F]/30 focus:ring-2 focus:ring-[#F68121]/25 ${compactLabel ? "" : "border-[#1F3A5F]/12 bg-[#f8fafc] focus:bg-white"}`}
        />
        {hasQuery && (
          <button
            type="button"
            onClick={onClear}
            className={`absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#5a6b82] transition hover:bg-[#1F3A5F]/08 hover:text-[#1F3A5F] ${focusRing}`}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>
      <p id={`${id}-hint`} className="sr-only">
        Filters the list of department information topics. Use arrow keys when a topic is focused to move between topics.
      </p>
    </div>
  );
}

export function DepartmentMandatorySections({ department }: { department: Department }) {
  const ordered = MANDATORY_DEPARTMENT_SECTIONS;
  const [activeId, setActiveId] = useState<MandatorySectionId>(ordered[0]?.id ?? "rules");
  const [query, setQuery] = useState("");
  const reduceMotion = useReducedMotion();
  const mobileActiveRef = useRef<HTMLButtonElement | null>(null);
  const desktopActiveRef = useRef<HTMLButtonElement | null>(null);
  const searchMobileId = useId();
  const searchDesktopId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ordered;
    return ordered.filter((def) => {
      const label = formatSectionLabel(def, department.code).toLowerCase();
      return label.includes(q);
    });
  }, [ordered, query, department.code]);

  /** When the filter hides the current section, treat the first visible section as active until the user picks another. */
  const effectiveActiveId = useMemo((): MandatorySectionId => {
    if (filtered.length === 0) return activeId;
    if (filtered.some((s) => s.id === activeId)) return activeId;
    return filtered[0].id;
  }, [filtered, activeId]);

  const activeDef = useMemo(
    () => ordered.find((s) => s.id === effectiveActiveId) ?? ordered[0],
    [effectiveActiveId, ordered]
  );

  const activeIndex = useMemo(
    () => filtered.findIndex((s) => s.id === effectiveActiveId),
    [filtered, effectiveActiveId]
  );

  const navigateByKey = useCallback(
    (direction: 1 | -1) => {
      if (filtered.length === 0) return;
      const next = (activeIndex + direction + filtered.length) % filtered.length;
      setActiveId(filtered[next].id);
    },
    [filtered, activeIndex]
  );

  const handleNavKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (filtered.length === 0) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        navigateByKey(1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        navigateByKey(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveId(filtered[0].id);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveId(filtered[filtered.length - 1].id);
      }
    },
    [filtered, navigateByKey]
  );

  useLayoutEffect(() => {
    const mq = typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)") : null;
    const el = mq?.matches ? desktopActiveRef.current : mobileActiveRef.current;
    if (!el) return;
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [effectiveActiveId, reduceMotion]);

  const activeLabel = activeDef
    ? formatSectionLabel(activeDef, department.code)
    : "";

  const motionProps = reduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      className="relative overflow-hidden border-b border-[#1F3A5F]/10 bg-[#fffefb]"
      aria-labelledby="dept-info-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(246,129,33,0.12),transparent),radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(31,58,95,0.06),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-20 lg:px-16">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#F68121]">
            Explore
          </p>
          <h2
            id="dept-info-heading"
            className="mt-3 font-display text-2xl font-semibold text-[#1F3A5F] md:text-3xl"
          >
            Department Information
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#5a6b82] md:text-[15px]">
            Mandatory disclosures and resources for{" "}
            <span className="font-semibold text-[#1F3A5F]">{department.name}</span>. Choose a
            topic—on desktop use the list at the left; on mobile, scroll the chips. Arrow keys move
            between topics when the list is focused.
          </p>
          <p className="mt-2 text-xs text-[#5a6b82]/80">
            {ordered.length} topics · keyboard: ↑ ↓ ← → · Home · End
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 lg:mt-12 lg:flex-row lg:items-stretch lg:gap-0 lg:rounded-2xl lg:border lg:border-[#1F3A5F]/12 lg:bg-white/80 lg:shadow-[0_24px_80px_-32px_rgba(31,58,95,0.35)] lg:backdrop-blur-sm">
          {/* Mobile */}
          <div className="lg:hidden">
            <SearchField
              id={searchMobileId}
              label="Filter sections"
              value={query}
              onChange={setQuery}
              onClear={() => setQuery("")}
              placeholder="Search by name…"
              compactLabel
            />
            <nav
              className="mt-3 -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-px-1 pb-2 [scrollbar-width:thin] [scrollbar-color:rgba(31,58,95,0.2)_transparent]"
              aria-label="Department information sections"
              onKeyDown={handleNavKeyDown}
            >
              {filtered.length === 0 && (
                <p className="w-full snap-center rounded-xl border border-dashed border-[#1F3A5F]/20 px-4 py-6 text-center text-sm text-[#5a6b82]">
                  No sections match your search. Clear the filter to see all topics.
                </p>
              )}
              {filtered.map((def) => {
                const Icon = SECTION_ICONS[def.id];
                const label = formatSectionLabel(def, department.code);
                const isActive = def.id === effectiveActiveId;
                return (
                  <button
                    key={def.id}
                    ref={isActive ? mobileActiveRef : undefined}
                    type="button"
                    onClick={() => setActiveId(def.id)}
                    aria-pressed={isActive}
                    className={`flex min-h-[44px] min-w-[min(100%,220px)] max-w-[85vw] shrink-0 snap-start flex-col items-start gap-1 rounded-2xl border px-3.5 py-3 text-left transition ${
                      isActive
                        ? "border-[#F68121]/50 bg-gradient-to-br from-[#1F3A5F] to-[#152a4a] text-white shadow-md"
                        : "border-[#1F3A5F]/10 bg-white text-[#1F3A5F] hover:border-[#1F3A5F]/22"
                    } ${focusRing} ring-offset-2 ring-offset-[#fffefb]`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${isActive ? "text-[#F68121]" : "text-[#1F3A5F]/70"}`}
                      aria-hidden
                    />
                    <span className="text-xs font-semibold leading-snug">{label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Desktop rail */}
          <div className="hidden min-h-[min(560px,70vh)] w-full min-w-0 shrink-0 border-[#1F3A5F]/10 lg:sticky lg:top-[calc(env(safe-area-inset-top)+var(--utility-bar-inner)+4.5rem)] lg:flex lg:max-h-[calc(100vh-9rem)] lg:w-[min(100%,320px)] lg:self-start lg:flex-col lg:border-r lg:px-4 lg:py-5">
            <SearchField
              id={searchDesktopId}
              label="Find"
              value={query}
              onChange={setQuery}
              onClear={() => setQuery("")}
              placeholder="Filter sections…"
            />
            <nav
              className="mt-4 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1 [scrollbar-color:rgba(31,58,95,0.22)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[color-mix(in_oklab,#1f3a5f_22%,transparent)]"
              aria-label="Department information sections"
              onKeyDown={handleNavKeyDown}
            >
              {filtered.length === 0 && (
                <p className="rounded-xl border border-dashed border-[#1F3A5F]/18 px-3 py-8 text-center text-sm text-[#5a6b82]">
                  No matches. Try another keyword.
                </p>
              )}
              {filtered.map((def) => {
                const Icon = SECTION_ICONS[def.id];
                const label = formatSectionLabel(def, department.code);
                const isActive = def.id === effectiveActiveId;
                return (
                  <button
                    key={def.id}
                    ref={isActive ? desktopActiveRef : undefined}
                    type="button"
                    onClick={() => setActiveId(def.id)}
                    aria-pressed={isActive}
                    className={`group flex w-full min-h-[44px] items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                      isActive
                        ? "bg-[#1F3A5F] text-white shadow-sm"
                        : "text-[#1F3A5F] hover:bg-[#1F3A5F]/06"
                    } ${focusRing} ring-offset-2 ring-offset-white`}
                  >
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-white/15 text-[#F68121]"
                          : "bg-[#1F3A5F]/06 text-[#1F3A5F]/75 group-hover:bg-[#1F3A5F]/10"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1 pt-0.5 text-[13px] font-semibold leading-snug">
                      {label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1 lg:px-8 lg:py-8">
            {filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#1F3A5F]/15 bg-white/60 px-6 py-16 text-center text-[#5a6b82]">
                <p className="font-medium text-[#1F3A5F]">Nothing to show</p>
                <p className="mt-2 text-sm">Adjust or clear the search to pick a section.</p>
              </div>
            )}
            {filtered.length > 0 && activeDef && (
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={activeDef.id}
                  {...motionProps}
                  className="relative overflow-hidden rounded-2xl border border-[#1F3A5F]/10 bg-gradient-to-br from-white via-[#fafcff] to-[#f0f7ff] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] md:p-8"
                  aria-labelledby="dept-active-heading"
                  tabIndex={-1}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F68121]/10 blur-3xl"
                    aria-hidden
                  />
                  <header className="relative border-b border-[#1F3A5F]/08 pb-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#1F3A5F]/45">
                      Selected topic
                    </p>
                    <h3
                      id="dept-active-heading"
                      className="mt-2 font-display text-xl font-semibold text-[#1F3A5F] md:text-2xl"
                    >
                      {activeLabel}
                    </h3>
                  </header>
                  <div className="relative mt-6">
                    <SectionBody def={activeDef} department={department} />
                  </div>
                </motion.article>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
