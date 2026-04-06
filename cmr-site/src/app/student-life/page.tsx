import type { Metadata } from "next";
import { StudentLifeSection } from "@/components/sections/StudentLifeSection";

export const metadata: Metadata = {
  title: "Student Life & Events",
  description:
    "Clubs, events, and student experience at CMR Engineering College.",
};

export default function StudentLifePage() {
  return (
    <>
      <StudentLifeSection />
    </>
  );
}
