import type { Metadata } from "next";
import { CoursesOfferedHomeSection } from "@/components/sections/CoursesOfferedHomeSection";

export const metadata: Metadata = {
  title: "Courses offered",
  description:
    "B.Tech, M.Tech, and PhD programmes at CMR Engineering College — CSE, ECE, AI/ML, Data Science, and more.",
};

export default function CoursesPage() {
  return (
    <>
      <CoursesOfferedHomeSection />
    </>
  );
}
