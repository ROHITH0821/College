import type { Metadata } from "next";
import { WhyCmrecHomeSection } from "@/components/sections/WhyCmrecHomeSection";

export const metadata: Metadata = {
  title: "Why CMREC?",
  description:
    "Centres of excellence, IIC, placements, curriculum, campus life, and what sets CMR Engineering College apart.",
};

export default function WhyCmrecPage() {
  return (
    <>
      <WhyCmrecHomeSection />
    </>
  );
}
