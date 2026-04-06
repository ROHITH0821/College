import type { Metadata } from "next";
import { ResearchSection } from "@/components/sections/ResearchSection";

export const metadata: Metadata = {
  title: "Research & Development",
  description:
    "Research centres, labs, and innovation at CMR Engineering College.",
};

export default function ResearchPage() {
  return (
    <>
      <ResearchSection />
    </>
  );
}
