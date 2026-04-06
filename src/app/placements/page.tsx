import type { Metadata } from "next";
import { FooterSection } from "@/components/sections/FooterSection";
import { PlacementsSection } from "@/components/sections/PlacementsSection";

export const metadata: Metadata = {
  title: "Placements & Careers",
  description:
    "Placement support, recruiters, and career outcomes at CMR Engineering College.",
};

export default function PlacementsPage() {
  return (
    <>
      <PlacementsSection />
      <FooterSection />
    </>
  );
}
