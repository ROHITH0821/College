import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CampusGallerySection } from "@/components/sections/CampusGallerySection";

export const metadata: Metadata = {
  title: "Campus Gallery",
  description: "Campus photos and virtual glimpses of CMR Engineering College.",
};

/** Full gallery page — light hero + expanded gallery (homepage uses compact embed). */
export default function GalleryPage() {
  return (
    <>
      <section className="border-b border-[#1F3A5F]/10 bg-white px-6 py-14 md:px-12 md:py-16 lg:px-16">
        <div className="relative mx-auto max-w-4xl">
          <nav
            className="mb-8 flex flex-wrap items-center gap-1 text-sm text-[#5a6b82]"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:text-[#1F3A5F]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
            <span className="font-medium text-[#1F3A5F]">Gallery</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F68121]">
            Campus &amp; infrastructure
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#1F3A5F] md:text-4xl lg:text-5xl">
            Explore the campus
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5a6b82]">
            Two scrolling rows, a snap-through strip, and a full set of campus-life scenes — drag,
            hover, and tap to explore.
          </p>
        </div>
      </section>

      <CampusGallerySection variant="page" />
    </>
  );
}
