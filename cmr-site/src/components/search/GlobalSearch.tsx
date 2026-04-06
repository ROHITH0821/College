"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  GraduationCap,
  Megaphone,
  Search,
  User,
  X,
} from "lucide-react";
import { HomeLogoLink } from "@/components/brand/HomeLogoLink";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSiteSearch } from "@/context/SearchContext";
import type { SearchCategory } from "@/data/search-index";
import { SEARCH_INDEX } from "@/data/search-index";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { getCategoryLabel, searchItems } from "@/lib/search";
import {
  scheduleScrollToHomeSectionElement,
  scrollToHomeSectionElement,
} from "@/components/navigation/HomeSectionLink";

const RECENT_KEY = "cmr-search-recent";
const CATEGORIES: (SearchCategory | "all")[] = [
  "all",
  "page",
  "course",
  "faculty",
  "announcement",
];

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string").slice(0, 8);
  } catch {
    return [];
  }
}

function saveRecent(title: string) {
  if (typeof window === "undefined") return;
  const prev = loadRecent().filter((t) => t.toLowerCase() !== title.toLowerCase());
  const next = [title, ...prev].slice(0, 8);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

function categoryIcon(cat: SearchCategory) {
  switch (cat) {
    case "page":
      return FileText;
    case "course":
      return GraduationCap;
    case "faculty":
      return User;
    case "announcement":
      return Megaphone;
    default:
      return BookOpen;
  }
}

export function GlobalSearch() {
  const { open, setOpen } = useSiteSearch();
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory | "all">("all");
  const [recent, setRecent] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);

  const debounced = useDebouncedValue(query, 180);

  const results = useMemo(() => {
    if (!debounced.trim()) return [];
    return searchItems(
      SEARCH_INDEX,
      debounced,
      category
    );
  }, [debounced, category]);


  useEffect(() => {
    if (open) {
      setRecent(loadRecent());
      setSelected(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery("");
      setCategory("all");
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [debounced, category]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const navigateTo = useCallback(
    (href: string, title: string) => {
      saveRecent(title);
      setOpen(false);
      if (href.startsWith("/#")) {
        const id = href.slice(2);
        if (pathname === "/") {
          scrollToHomeSectionElement(id);
          window.history.replaceState(null, "", href);
          return;
        }
        router.push(href, { scroll: false });
        scheduleScrollToHomeSectionElement(id);
        return;
      }
      router.push(href, { scroll: true });
    },
    [router, setOpen, pathname]
  );

  const resultsRef = useRef(results);
  const selectedRef = useRef(selected);

  useEffect(() => {
    resultsRef.current = results;
    selectedRef.current = selected;
  }, [results, selected]);

  useEffect(() => {
    if (!open) return;
    const onWin = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      const len = resultsRef.current.length;
      if (!len) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((i) => Math.min(i + 1, len - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = resultsRef.current[selectedRef.current];
        if (item) navigateTo(item.href, item.title);
      }
    };
    window.addEventListener("keydown", onWin, true);
    return () => window.removeEventListener("keydown", onWin, true);
  }, [open, setOpen, navigateTo]);

  useEffect(() => {
    if (!listRef.current || !results.length) return;
    const el = listRef.current.querySelector(`[data-result-index="${selected}"]`);
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selected, results.length]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close search"
            className="fixed inset-0 z-[200] bg-[#0f172a]/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="global-search-label"
            className="fixed inset-0 z-[201] flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden border-[#1F3A5F]/10 bg-white/98 shadow-[0_24px_80px_rgba(15,23,42,0.2)] backdrop-blur-2xl md:inset-x-auto md:left-1/2 md:top-[8vh] md:h-auto md:max-h-[min(92vh,720px)] md:w-full md:max-w-2xl md:-translate-x-1/2 md:rounded-2xl md:border md:border-white/60"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <div className="flex items-center gap-3 border-b border-[#1F3A5F]/10 px-4 py-3 md:px-5">
              <Search className="h-5 w-5 shrink-0 text-[#1F3A5F]/45" aria-hidden />
              <input
                ref={inputRef}
                id="global-search-label"
                type="search"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Search pages, courses, faculty, announcements…"
                className="min-w-0 flex-1 bg-transparent text-base text-[#1F3A5F] placeholder:text-[#1F3A5F]/40 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd className="hidden shrink-0 rounded-md border border-[#1F3A5F]/15 bg-[#F5F7FA] px-2 py-1 font-mono text-[10px] font-medium text-[#1F3A5F]/55 md:inline">
                Esc
              </kbd>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1F3A5F]/12 text-[#1F3A5F] transition hover:bg-[#F5F7FA] md:hidden"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto px-4 py-2.5 md:px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    category === c
                      ? "bg-[#1F3A5F] text-white shadow-md"
                      : "bg-[#F5F7FA] text-[#1F3A5F]/75 hover:bg-[#1F3A5F]/10"
                  }`}
                >
                  {c === "all" ? "All" : getCategoryLabel(c)}
                </button>
              ))}
            </div>

            <div
              ref={listRef}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-[env(safe-area-inset-bottom)] pt-1 md:px-3"
            >
              {!debounced.trim() && (
                <div className="space-y-4 px-3 py-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F68121]">
                    Recent
                  </p>
                  {recent.length === 0 ? (
                    <p className="text-sm text-[#5a6b82]">
                      Start typing — results update as you go.
                    </p>
                  ) : (
                    <ul className="space-y-1">
                      {recent.map((r) => (
                        <li key={r}>
                          <button
                            type="button"
                            className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-[#1F3A5F] transition hover:bg-[#1F3A5F]/[0.06]"
                            onClick={() => setQuery(r)}
                          >
                            {r}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F68121]">
                    Quick pages
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        { href: "/", label: "Home" },
                        { href: "/programs", label: "Programs" },
                        { href: "/information", label: "Admissions" },
                        { href: "/contact", label: "Contact" },
                      ] as const
                    ).map(({ href, label }) =>
                      href === "/" ? (
                        <HomeLogoLink
                          key={href}
                          className="rounded-full border border-[#1F3A5F]/12 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#1F3A5F] shadow-sm transition hover:border-[#F68121]/40"
                          onClick={() => setOpen(false)}
                        >
                          {label}
                        </HomeLogoLink>
                      ) : (
                        <Link
                          key={href}
                          href={href}
                          className="rounded-full border border-[#1F3A5F]/12 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#1F3A5F] shadow-sm transition hover:border-[#F68121]/40"
                          onClick={() => setOpen(false)}
                        >
                          {label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )}

              {debounced.trim() && results.length === 0 && (
                <p className="px-4 py-10 text-center text-sm text-[#5a6b82]">
                  No matches for &ldquo;{debounced}&rdquo;. Try another keyword or category.
                </p>
              )}

              {debounced.trim() &&
                results.length > 0 &&
                results.map((item, idx) => {
                  const showHeader =
                    idx === 0 || results[idx - 1]!.category !== item.category;
                  const Icon = categoryIcon(item.category);
                  const isActive = selected === idx;
                  return (
                    <div key={item.id} className={showHeader ? "mt-1 first:mt-0" : ""}>
                      {showHeader && (
                        <div className="flex items-center gap-2 px-3 py-2">
                          <Icon className="h-3.5 w-3.5 text-[#F68121]" aria-hidden />
                          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1F3A5F]/55">
                            {getCategoryLabel(item.category)}
                          </span>
                        </div>
                      )}
                      <ul className="space-y-0.5" role="listbox">
                        <li role="option" aria-selected={isActive}>
                          <button
                            type="button"
                            data-result-index={idx}
                            className={`flex w-full flex-col gap-0.5 rounded-xl px-3 py-2.5 text-left transition ${
                              isActive
                                ? "bg-[#1F3A5F] text-white shadow-md"
                                : "text-[#1F3A5F] hover:bg-[#1F3A5F]/[0.06]"
                            }`}
                            onMouseEnter={() => setSelected(idx)}
                            onClick={() => navigateTo(item.href, item.title)}
                          >
                            <span className="text-sm font-semibold">{item.title}</span>
                            <span
                              className={`line-clamp-2 text-xs ${
                                isActive ? "text-white/85" : "text-[#5a6b82]"
                              }`}
                            >
                              {item.description}
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  );
                })}
            </div>

            <div className="hidden border-t border-[#1F3A5F]/10 px-5 py-2.5 text-[11px] text-[#1F3A5F]/45 md:flex md:items-center md:justify-between">
              <span>
                <kbd className="rounded border border-[#1F3A5F]/15 bg-[#F5F7FA] px-1.5 py-0.5 font-mono">
                  ↑↓
                </kbd>{" "}
                navigate ·{" "}
                <kbd className="rounded border border-[#1F3A5F]/15 bg-[#F5F7FA] px-1.5 py-0.5 font-mono">
                  Enter
                </kbd>{" "}
                open
              </span>
              <span>
                <kbd className="rounded border border-[#1F3A5F]/15 bg-[#F5F7FA] px-1.5 py-0.5 font-mono">
                  ⌘K
                </kbd>{" "}
                toggle
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
