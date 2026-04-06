import type { Metadata } from "next";
import { ContactExperience } from "@/components/contact/ContactExperience";
import { FooterSection } from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach CMR Engineering College for admissions, visits, and general enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <ContactExperience />
      <FooterSection />
    </>
  );
}
