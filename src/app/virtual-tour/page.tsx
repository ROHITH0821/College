import type { Metadata } from "next";
import { VirtualTourExperience } from "@/components/virtual-tour/VirtualTourExperience";

export const metadata: Metadata = {
  title: "Virtual Tour",
  description:
    "Explore CMR Engineering College online — immersive campus walkthrough, scenes, and visit planning.",
};

export default function VirtualTourPage() {
  return <VirtualTourExperience />;
}
