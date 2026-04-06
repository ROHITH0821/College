import type { Metadata } from "next";
import { FooterSection } from "@/components/sections/FooterSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";

export const metadata: Metadata = {
  title: "Programs & Academics",
  description:
    "Explore undergraduate and postgraduate programs, schools, and academic pathways at CMR Engineering College.",
};

export default function ProgramsPage() {
  return (
    <>
      <ProgramsSection />
      <FooterSection />
    </>
  );
}
