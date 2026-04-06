"use client";

import {
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  Download,
  Handshake,
  FileText,
  GraduationCap,
  Home,
  ImageIcon,
  Layers,
  LayoutGrid,
  Cuboid,
  Mail,
  MapPin,
  Microscope,
  ChevronDown,
  Search,
  Sparkles,
  Users,
  UsersRound,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HomeLogoLink } from "@/components/brand/HomeLogoLink";
import { SiteLogo } from "@/components/brand/SiteLogo";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconYouTube,
} from "@/components/icons/SocialBrandIcons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SIDEBAR_WIDTH_PX } from "@/constants/layout";
import { useSiteSearch } from "@/context/SearchContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { HomeSectionLink } from "@/components/navigation/HomeSectionLink";
import { useShellIntroPlay } from "@/hooks/useShellIntroPlay";
import { DEPARTMENTS } from "@/data/departments";

/** Scroll-spy targets on the homepage only (fixed hero + stacked sections). */
const HOME_SCROLL_SPY_IDS = [
  "hero",
  "accreditations",
  "highlights",
  "information",
  "outcomes",
  "gallery",
  "virtual-tour",
  "campus-map",
  "quick-access",
] as const;

const NO_SCROLL_SPY: string[] = [];

const NAV = [
  { key: "home", label: "Home", href: "/", path: "/", icon: Home, homeSection: "hero" },
  { key: "about", label: "About Us", href: "/about", path: "/about", icon: Building2 },
  {
    key: "about-college",
    label: "About CMREC",
    href: "/about-college",
    path: "/about-college",
    icon: BarChart3,
  },
  {
    key: "courses-offered",
    label: "Courses offered",
    href: "/courses",
    path: "/courses",
    icon: Layers,
  },
  {
    key: "why-cmrec",
    label: "Why CMREC?",
    href: "/why-cmrec",
    path: "/why-cmrec",
    icon: Sparkles,
  },
  { key: "blog", label: "Blog & updates", href: "/blog", path: "/blog", icon: FileText },
  {
    key: "information",
    label: "Admissions & information",
    href: "/information",
    path: "/information",
    icon: GraduationCap,
  },
  { key: "academics", label: "Academics", href: "/programs", path: "/programs", icon: BookOpen },
  {
    key: "departments",
    label: "Departments",
    href: "/departments",
    path: "/departments",
    icon: LayoutGrid,
  },
  {
    key: "faculty",
    label: "Faculty",
    href: "/faculty",
    path: "/faculty",
    icon: UsersRound,
  },
  {
    key: "research",
    label: "Research and Development",
    href: "/research",
    path: "/research",
    icon: Microscope,
  },
  {
    key: "students",
    label: "Students Corner",
    href: "/student-life",
    path: "/student-life",
    icon: Users,
  },
  {
    key: "placements",
    label: "Employment Corner",
    href: "/placements",
    path: "/placements",
    icon: Briefcase,
  },
  {
    key: "partners",
    label: "Recruiters & partners",
    href: "/partners",
    path: "/partners",
    icon: Handshake,
  },
  {
    key: "events",
    label: "Events & Updates",
    href: "/student-life#events",
    path: "/student-life",
    icon: CalendarDays,
  },
  { key: "gallery", label: "Gallery", href: "/gallery", path: "/gallery", icon: ImageIcon },
  {
    key: "virtual-tour",
    label: "Virtual Tour",
    href: "/virtual-tour",
    path: "/virtual-tour",
    icon: Cuboid,
  },
  {
    key: "map",
    label: "Campus map",
    href: "/#campus-map",
    path: "/",
    icon: MapPin,
    homeSection: "campus-map",
  },
  { key: "contact", label: "Contact Us", href: "/contact", path: "/contact", icon: Mail },
  { key: "downloads", label: "Downloads", href: "/downloads", path: "/downloads", icon: Download },
] as const;

type SidebarProps = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { setOpen: openSearch } = useSiteSearch();
  const { play } = useShellIntroPlay();
  const reduceMotion = useReducedMotion() === true;
  const scrollSpyIds = pathname === "/" ? HOME_SCROLL_SPY_IDS : NO_SCROLL_SPY;
  const activeSectionId = useScrollSpy(scrollSpyIds);

  const asideRef = useRef<HTMLElement>(null);
  const deptWrapRef = useRef<HTMLDivElement>(null);
  const [deptFlyoutOpen, setDeptFlyoutOpen] = useState(false);
  const [deptFlyoutPos, setDeptFlyoutPos] = useState({ top: 0, left: 0 });
  const [deptPortalReady, setDeptPortalReady] = useState(false);
  const deptCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDeptPortalReady(true);
  }, []);

  /**
   * Position uses viewport coordinates. The flyout is portaled to `document.body` so `position: fixed`
   * is not trapped by the Framer Motion sidebar wrapper (transform/filter creates a fixed containing block
   * and would shift `top`/`left` vs getBoundingClientRect).
   */
  const updateDeptFlyoutPos = useCallback(() => {
    const el = deptWrapRef.current;
    const aside = asideRef.current;
    if (!el) return;
    const row = el.getBoundingClientRect();
    const left = aside ? aside.getBoundingClientRect().right : row.right;
    setDeptFlyoutPos({ top: row.top, left });
  }, []);

  const cancelDeptClose = useCallback(() => {
    if (deptCloseTimerRef.current) {
      clearTimeout(deptCloseTimerRef.current);
      deptCloseTimerRef.current = null;
    }
  }, []);

  const openDeptFlyout = useCallback(() => {
    cancelDeptClose();
    updateDeptFlyoutPos();
    setDeptFlyoutOpen(true);
  }, [cancelDeptClose, updateDeptFlyoutPos]);

  const scheduleCloseDeptFlyout = useCallback(() => {
    deptCloseTimerRef.current = setTimeout(() => {
      setDeptFlyoutOpen(false);
    }, 220);
  }, []);

  useEffect(() => {
    if (!deptFlyoutOpen) return;
    updateDeptFlyoutPos();
    window.addEventListener("scroll", updateDeptFlyoutPos, true);
    window.addEventListener("resize", updateDeptFlyoutPos);
    return () => {
      window.removeEventListener("scroll", updateDeptFlyoutPos, true);
      window.removeEventListener("resize", updateDeptFlyoutPos);
    };
  }, [deptFlyoutOpen, updateDeptFlyoutPos]);

  useEffect(() => {
    return () => {
      if (deptCloseTimerRef.current) clearTimeout(deptCloseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setDeptFlyoutOpen(false);
    cancelDeptClose();
  }, [pathname, cancelDeptClose]);

  const isNavActive = (item: (typeof NAV)[number]) => {
    if ("homeSection" in item && item.homeSection) {
      return pathname === "/" && activeSectionId === item.homeSection;
    }
    if (item.key === "departments") {
      return pathname === "/departments" || pathname.startsWith("/departments/");
    }
    return pathname === item.path;
  };

  return (
    <motion.div
      initial={false}
      animate={
        play
          ? { opacity: 1, filter: "blur(0px)" }
          : { opacity: 0, filter: reduceMotion ? "blur(0px)" : "blur(10px)" }
      }
      transition={
        reduceMotion
          ? { duration: 0.2, delay: 0.1 }
          : {
              type: "spring",
              stiffness: 260,
              damping: 30,
              mass: 0.95,
              delay: 0.14,
            }
      }
      style={{ width: SIDEBAR_WIDTH_PX }}
      className={`fixed left-0 top-[calc(env(safe-area-inset-top)+var(--utility-bar-inner))] z-50 h-[calc(100dvh-env(safe-area-inset-top)-var(--utility-bar-inner))] min-h-0 ${play ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <aside
        ref={asideRef}
        className={`flex h-full w-full flex-col border-r border-[#1F3A5F]/12 bg-white shadow-[4px_0_24px_rgba(31,58,95,0.07)] transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
      {/* Logo band — separate white strip (reference layout) */}
      <div className="relative shrink-0 border-b border-[#1F3A5F]/10 bg-white px-4 py-4 pt-4">
        {onMobileClose && (
          <button
            type="button"
            onClick={onMobileClose}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-[#1F3A5F]/12 bg-[#F5F7FA] text-[#1F3A5F] transition hover:bg-white lg:hidden touch-manipulation"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        )}
        <HomeLogoLink
          onClick={onMobileClose}
          className="flex h-[56px] w-full max-w-[min(100%,280px)] items-center pr-12 lg:pr-0"
        >
          <SiteLogo className="h-[52px] w-auto max-w-full object-contain object-left" />
        </HomeLogoLink>
      </div>

      {/* Search — opens global command palette */}
      <div className="shrink-0 border-b border-[#1F3A5F]/10 bg-white px-3 pb-3 pt-1">
        <button
          type="button"
          onClick={() => {
            openSearch(true);
            onMobileClose?.();
          }}
          className="group flex w-full items-center gap-2.5 rounded-xl border border-[#1F3A5F]/10 bg-[#F5F7FA] px-3 py-2.5 text-left text-[13px] text-[#1F3A5F]/55 shadow-[inset_0_1px_2px_rgba(31,58,95,0.04)] transition hover:border-[#F68121]/35 hover:bg-white hover:text-[#1F3A5F]/75"
          aria-label="Open search"
        >
          <Search
            className="h-[17px] w-[17px] shrink-0 text-[#1F3A5F]/40 group-hover:text-[#F68121]"
            aria-hidden
          />
          <span className="min-w-0 flex-1 truncate">Search site…</span>
          <kbd className="hidden shrink-0 rounded border border-[#1F3A5F]/12 bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-[#1F3A5F]/45 lg:inline">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Navigation — light panel */}
      <nav
        id="site-primary-nav"
        className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto overflow-x-hidden overscroll-contain bg-[#F5F7FA] px-2 py-3"
        aria-label="Primary"
      >
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isNavActive(item);
          const navClass = `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium leading-snug transition-colors ${
            active
              ? "bg-white text-[#1F3A5F] shadow-sm ring-1 ring-[#1F3A5F]/10"
              : "text-[#1F3A5F]/85 hover:bg-white/90 hover:text-[#1F3A5F]"
          }`;
          const inner = (
            <>
              {active && (
                <span className="absolute inset-y-1 left-0 w-1 rounded-full bg-[#F68121]" />
              )}
              <Icon
                className={`relative z-10 h-[18px] w-[18px] shrink-0 ${
                  active ? "text-[#F68121]" : "text-[#1F3A5F]/50 group-hover:text-[#1F3A5F]/75"
                }`}
                aria-hidden
              />
              <span className="relative z-10">{item.label}</span>
            </>
          );
          if (item.key === "home") {
            return (
              <HomeLogoLink key={item.key} onClick={onMobileClose} className={navClass}>
                {inner}
              </HomeLogoLink>
            );
          }
          if (item.href.startsWith("/#")) {
            return (
              <HomeSectionLink
                key={item.key}
                href={item.href as `/#${string}`}
                onClick={onMobileClose}
                className={navClass}
              >
                {inner}
              </HomeSectionLink>
            );
          }
          if (item.key === "departments") {
            const deptInnerMobile = (
              <>
                {active && (
                  <span className="absolute inset-y-1 left-0 w-1 rounded-full bg-[#F68121]" />
                )}
                <Icon
                  className={`relative z-10 h-[18px] w-[18px] shrink-0 ${
                    active ? "text-[#F68121]" : "text-[#1F3A5F]/50"
                  }`}
                  aria-hidden
                />
                <span className="relative z-10 min-w-0 flex-1">{item.label}</span>
                <ChevronDown className="dept-chevron relative z-10 h-4 w-4 shrink-0 text-[#1F3A5F]/45 transition-transform duration-200" />
              </>
            );
            const deptLinks = (
              <ul className="space-y-0.5 pb-1 pt-0.5" role="list">
                <li>
                  <Link
                    href="/departments"
                    scroll
                    onClick={() => onMobileClose?.()}
                    className="block rounded-lg px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F68121] transition hover:bg-white/80"
                  >
                    All departments
                  </Link>
                </li>
                {DEPARTMENTS.map((d) => {
                  const deptActive = pathname === `/departments/${d.slug}`;
                  return (
                    <li key={d.slug}>
                      <Link
                        href={`/departments/${d.slug}`}
                        scroll
                        onClick={() => onMobileClose?.()}
                        className={`block rounded-lg px-2.5 py-2 text-left transition ${
                          deptActive
                            ? "bg-[#1F3A5F]/[0.08] ring-1 ring-[#1F3A5F]/15"
                            : "hover:bg-white/80"
                        }`}
                      >
                        <span className="block text-[11px] font-bold uppercase tracking-wide text-[#F68121]/90">
                          {d.code}
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-[#5a6b82] line-clamp-2">
                          {d.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            );
            return (
              <div key="departments" className="relative">
                <div
                  ref={deptWrapRef}
                  className="hidden lg:block"
                  onMouseEnter={openDeptFlyout}
                  onMouseLeave={scheduleCloseDeptFlyout}
                >
                  <Link
                    href="/departments"
                    scroll
                    onClick={() => {
                      cancelDeptClose();
                      setDeptFlyoutOpen(false);
                      onMobileClose?.();
                      if (pathname === "/departments") {
                        window.scrollTo({ top: 0, behavior: "auto" });
                      }
                    }}
                    className={navClass}
                  >
                    {inner}
                  </Link>
                </div>

                <details className="lg:hidden [&[open]_summary_.dept-chevron]:rotate-180">
                  <summary className={`${navClass} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>
                    {deptInnerMobile}
                  </summary>
                  <div className="border-l-2 border-[#F68121]/35 pl-2">{deptLinks}</div>
                </details>
              </div>
            );
          }
          return (
            <Link
              key={item.key}
              href={item.href}
              scroll
              onClick={() => {
                onMobileClose?.();
                if (pathname === item.path && !item.href.includes("#")) {
                  window.scrollTo({ top: 0, behavior: "auto" });
                }
              }}
              className={navClass}
            >
              {inner}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 space-y-3 border-t border-[#1F3A5F]/10 bg-[#F5F7FA] px-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <HomeSectionLink
          href="/#apply"
          onClick={onMobileClose}
          className="flex w-full items-center justify-center rounded-lg bg-[#F68121] px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-[#e77818] touch-manipulation"
        >
          Apply Now
        </HomeSectionLink>

        <div className="flex items-center justify-center gap-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1F3A5F]/15 bg-white text-[#1F3A5F] transition hover:border-[#F68121] hover:text-[#F68121]"
            aria-label="Instagram"
          >
            <IconInstagram className="h-4 w-4" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1F3A5F]/15 bg-white text-[#1F3A5F] transition hover:border-[#F68121] hover:text-[#F68121]"
            aria-label="Facebook"
          >
            <IconFacebook className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1F3A5F]/15 bg-white text-[#1F3A5F] transition hover:border-[#F68121] hover:text-[#F68121]"
            aria-label="LinkedIn"
          >
            <IconLinkedIn className="h-4 w-4" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1F3A5F]/15 bg-white text-[#1F3A5F] transition hover:border-[#F68121] hover:text-[#F68121]"
            aria-label="YouTube"
          >
            <IconYouTube className="h-4 w-4" />
          </a>
        </div>
      </div>
      </aside>

      {deptPortalReady &&
        createPortal(
          <div
            role="menu"
            aria-hidden={!deptFlyoutOpen}
            className={`fixed z-[100] max-h-[min(70vh,28rem)] w-[min(18.5rem,calc(100vw-var(--sidebar-offset)-0.5rem))] min-w-[15.5rem] overflow-y-auto rounded-xl border border-[#1F3A5F]/12 bg-white p-2 shadow-[0_12px_40px_rgba(31,58,95,0.2)] ring-1 ring-[#1F3A5F]/[0.08] transition-opacity duration-150 ${
              deptFlyoutOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            style={{ top: deptFlyoutPos.top, left: deptFlyoutPos.left }}
            onMouseEnter={cancelDeptClose}
            onMouseLeave={scheduleCloseDeptFlyout}
          >
            <Link
              href="/departments"
              className="mb-1 block rounded-lg px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F68121] transition hover:bg-[#F5F7FA]"
              onClick={() => {
                cancelDeptClose();
                setDeptFlyoutOpen(false);
                onMobileClose?.();
              }}
            >
              All departments
            </Link>
            <ul className="space-y-0.5" role="list">
              {DEPARTMENTS.map((d) => {
                const deptActive = pathname === `/departments/${d.slug}`;
                return (
                  <li key={d.slug}>
                    <Link
                      href={`/departments/${d.slug}`}
                      scroll
                      className={`block rounded-lg px-2.5 py-2 text-left transition ${
                        deptActive
                          ? "bg-[#1F3A5F]/[0.08] ring-1 ring-[#1F3A5F]/15"
                          : "hover:bg-[#F5F7FA]"
                      }`}
                      onClick={() => {
                        cancelDeptClose();
                        setDeptFlyoutOpen(false);
                        onMobileClose?.();
                      }}
                    >
                      <span className="block text-[11px] font-bold uppercase tracking-wide text-[#F68121]/90">
                        {d.code}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-[#5a6b82] line-clamp-2">
                        {d.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>,
          document.body
        )}
    </motion.div>
  );
}
