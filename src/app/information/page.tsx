import type { Metadata } from "next";
import { InformationSection } from "@/components/sections/InformationSection";

export const metadata: Metadata = {
  title: "Admissions & Information",
  description:
    "Admissions, scholarships, campus visits, and information desk at CMR Engineering College.",
};

export default function InformationPage() {
  return (
    <>
      <InformationSection />
    </>
  );
}
