import type { Metadata } from "next";
import Link from "next/link";
import { NewsPreviewSection } from "@/components/sections/NewsPreviewSection";

export const metadata: Metadata = {
  title: "Blog & updates",
  description:
    "News, workshops, and lab highlights from CMR Engineering College — campus stories and announcements.",
};

export default function BlogPage() {
  return (
    <>
      <section className="border-b border-[#1F3A5F]/10 bg-white px-6 py-12 md:px-12 md:py-16 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F68121]">Blog</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-[#1F3A5F] md:text-5xl">
            Campus news & updates
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#5a6b82]">
            Articles from departments, workshops, and student activities. For a full historical
            archive, see the official{" "}
            <a
              href="https://cmrec.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1F3A5F] underline-offset-2 hover:text-[#F68121] hover:underline"
            >
              CMREC website
            </a>
            .
          </p>
          <p className="mt-6">
            <Link
              href="/"
              className="inline-flex rounded-full bg-[#1F3A5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2a4a73]"
            >
              Back to home
            </Link>
          </p>
        </div>
      </section>
      <NewsPreviewSection />
    </>
  );
}
