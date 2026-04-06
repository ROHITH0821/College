"use client";

import { ArrowUp, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { HomeLogoLink } from "@/components/brand/HomeLogoLink";
import { SiteLogo } from "@/components/brand/SiteLogo";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconYouTube,
} from "@/components/icons/SocialBrandIcons";
import Link from "next/link";
import { HomeSectionLink } from "@/components/navigation/HomeSectionLink";

const findItFast = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "About CMREC", href: "/about-college" },
  { label: "Courses offered", href: "/courses" },
  { label: "Departments", href: "/departments" },
  { label: "Why CMREC?", href: "/why-cmrec" },
  { label: "Admissions & information", href: "/information" },
  { label: "Academics", href: "/programs" },
  { label: "Faculty", href: "/faculty" },
  { label: "Research", href: "/research" },
  { label: "Students Corner", href: "/student-life" },
  { label: "Placements", href: "/placements" },
  { label: "Recruiters & partners", href: "/partners" },
  { label: "Events", href: "/student-life#events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Campus map", href: "/#campus-map" },
  { label: "Downloads", href: "/downloads" },
  { label: "Blog", href: "/blog" },
] as const;

const social = [
  { label: "Instagram", href: "https://instagram.com", icon: IconInstagram },
  { label: "Facebook", href: "https://facebook.com", icon: IconFacebook },
  { label: "LinkedIn", href: "https://linkedin.com", icon: IconLinkedIn },
  { label: "YouTube", href: "https://youtube.com", icon: IconYouTube },
] as const;

const legal = [
  { label: "Privacy policy", href: "/contact" },
  { label: "Terms of use", href: "/contact" },
  { label: "Refund policy", href: "/contact" },
] as const;

const footerLinkClass =
  "group inline-flex items-center gap-2 rounded-lg py-1.5 text-[13px] text-white/80 transition hover:bg-white/5 hover:text-white md:text-sm";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const icon = (
    <ChevronRight
      className="h-3.5 w-3.5 shrink-0 text-[#F68121]/90 transition group-hover:translate-x-0.5"
      aria-hidden
    />
  );
  if (href === "/") {
    return (
      <HomeLogoLink className={footerLinkClass}>
        {icon}
        {children}
      </HomeLogoLink>
    );
  }
  if (href.startsWith("/#")) {
    return (
      <HomeSectionLink href={href as `/#${string}`} className={footerLinkClass}>
        {icon}
        {children}
      </HomeSectionLink>
    );
  }
  return (
    <Link href={href} className={footerLinkClass}>
      {icon}
      {children}
    </Link>
  );
}

export function FooterSection() {
  const mid = Math.ceil(findItFast.length / 2);
  const colA = findItFast.slice(0, mid);
  const colB = findItFast.slice(mid);
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden bg-[#0c1f3a] text-white/90">
      {/* Brand spectrum bar */}
      <div
        className="h-1 w-full bg-gradient-to-r from-[#F68121] via-[#6DBE45] to-[#3b5f8f]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_-30%,rgba(246,129,33,0.14),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(31,58,95,0.35)_0%,transparent_40%,rgba(0,0,0,0.2)_100%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10 lg:gap-y-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <HomeLogoLink className="flex h-16 w-[min(100%,320px)] items-center justify-start rounded-xl bg-white px-2.5 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.25)] ring-1 ring-white/20 transition hover:ring-[#F68121]/40">
              <SiteLogo className="h-auto max-h-[44px] w-auto max-w-full object-contain object-left" />
            </HomeLogoLink>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F68121]/95">
              UGC Autonomous
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/78">
              A research-led institution committed to academic excellence, industry partnerships,
              and holistic development — approved by AICTE, affiliated to JNTUH, accredited by
              NAAC &amp; NBA.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {social.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/85 transition hover:border-[#F68121]/50 hover:bg-[#F68121]/15 hover:text-white"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F68121]/80" aria-hidden />
              <h3 className="font-display text-lg font-semibold text-white">
                Explore
              </h3>
            </div>
            <p className="mt-1 text-xs text-white/50">Programs, campus life, and resources</p>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-1 sm:gap-x-10">
              <ul className="space-y-0.5">
                {colA.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
              <ul className="space-y-0.5">
                {colB.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact card */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F68121]/80" aria-hidden />
              <h3 className="font-display text-lg font-semibold text-white">
                Reach us
              </h3>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm md:p-6">
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F68121]/15 text-[#F68121]">
                    <MapPin className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-white/82 leading-relaxed">
                    Survey No. 69, CMR Marg, Medchal Road, Hyderabad, Telangana 500043
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6DBE45]/15 text-[#6DBE45]">
                    <MapPin className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-white/82 leading-relaxed">
                    City office: HITEC City, Hyderabad (by appointment)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F68121]/15 text-[#F68121]">
                    <Mail className="h-4 w-4" aria-hidden />
                  </span>
                  <a
                    href="mailto:hello@cmr.example.edu"
                    className="break-all text-white/88 underline-offset-2 transition hover:text-white hover:underline"
                  >
                    hello@cmr.example.edu
                  </a>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F68121]/15 text-[#F68121]">
                    <Phone className="h-4 w-4" aria-hidden />
                  </span>
                  <a
                    href="tel:+914012345678"
                    className="tabular-nums text-white/88 transition hover:text-white"
                  >
                    +91 40 1234 5678
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter strip */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div className="max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F68121]">
              Newsletter
            </p>
            <p className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
              Campus news &amp; admission alerts
            </p>
            <p className="mt-2 text-sm text-white/60">
              Occasional updates — no spam. Unsubscribe anytime.
            </p>
          </div>
          <form
            className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:items-center md:mt-0 md:max-w-md md:flex-1 md:justify-end"
            action="#"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="footer-email" className="sr-only">
              Email for newsletter
            </label>
            <input
              id="footer-email"
              type="email"
              name="email"
              placeholder="Your email address"
              autoComplete="email"
              className="w-full rounded-xl border border-white/15 bg-[#0c1f3a]/80 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-[#F68121]/0 transition focus:border-[#F68121]/50 focus:ring-2 focus:ring-[#F68121]/25"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-[#F68121] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#F68121]/20 transition hover:bg-[#e77818]"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/50 md:text-[13px]">
            © {year} CMR Engineering College. All rights reserved.
          </p>
          <nav
            className="flex flex-wrap items-center gap-x-1 gap-y-2 text-xs text-white/55 md:text-[13px]"
            aria-label="Legal"
          >
            {legal.map((item, i) => (
              <span key={item.label} className="inline-flex items-center">
                {i > 0 ? (
                  <span className="mx-3 text-white/25 select-none" aria-hidden>
                    |
                  </span>
                ) : null}
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-wider text-[#F68121] transition hover:text-white md:self-center md:text-[13px]"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
