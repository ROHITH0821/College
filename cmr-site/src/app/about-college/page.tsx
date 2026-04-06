import type { Metadata } from "next";
import { AboutStatsSection } from "@/components/sections/AboutStatsSection";

export const metadata: Metadata = {
  title: "About CMREC & placement stats",
  description:
    "Campus overview, placement outcomes, and institution story — CMR Engineering College, Hyderabad.",
};

export default function AboutCollegePage() {
  return (
    <>
      <AboutStatsSection />
    </>
  );
}
