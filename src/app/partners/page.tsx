import type { Metadata } from "next";
import { PartnersShowcaseSection } from "@/components/sections/PartnersShowcaseSection";

export const metadata: Metadata = {
  title: "Recruiters & partners",
  description:
    "Employers, MoUs, and industry collaborations at CMR Engineering College — campus recruiters and training partnerships.",
};

export default function PartnersPage() {
  return (
    <>
      <PartnersShowcaseSection heading="h1" />
    </>
  );
}
