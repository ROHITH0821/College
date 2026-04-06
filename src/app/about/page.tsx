import type { Metadata } from "next";
import { FooterSection } from "@/components/sections/FooterSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about CMR Engineering College — our mission, campus, and what sets us apart.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[#1F3A5F]/10 bg-white px-6 py-16 md:px-12 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F68121]">About Us</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-[#1F3A5F] md:text-5xl">
            CMR Engineering College
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#5a6b82]">
            A UGC Autonomous institution committed to academic excellence, research, and
            holistic student development. Explore our story and the values that drive our
            community.
          </p>
        </div>
      </section>
      <WhyChooseSection />
      <FooterSection />
    </>
  );
}
