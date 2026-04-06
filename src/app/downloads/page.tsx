import type { Metadata } from "next";
import { QuickAccessSection } from "@/components/sections/QuickAccessSection";

export const metadata: Metadata = {
  title: "Downloads & Services",
  description: "Results, certificates, forms, and student services at CMR Engineering College.",
};

export default function DownloadsPage() {
  return (
    <>
      <section className="border-b border-[#1F3A5F]/10 bg-white px-6 py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F68121]">Downloads</p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-[#1F3A5F] md:text-4xl">
            Forms, results &amp; resources
          </h1>
          <p className="mt-4 text-[#5a6b82]">
            Access semester results, certificates, handbooks, and administrative forms.
          </p>
        </div>
      </section>
      <QuickAccessSection />
    </>
  );
}
