import type { Metadata } from "next";
import { FacultyDirectory } from "@/components/faculty/FacultyDirectory";

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "Faculty profiles at CMR Engineering College — qualifications, research, teaching, and contact.",
};

export default function FacultyPage() {
  return (
    <>
      <FacultyDirectory />
    </>
  );
}
