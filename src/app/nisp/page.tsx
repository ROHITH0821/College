import type { Metadata } from "next";
import { Lightbulb, Rocket, Target } from "lucide-react";
import { UtilityPageLayout } from "@/components/utility/UtilityPageLayout";

export const metadata: Metadata = {
  title: "NISP",
  description: "National Innovation and Startup Policy — entrepreneurship at CMR.",
};

export default function NispPage() {
  return (
    <UtilityPageLayout
      variant="teal"
      eyebrow="Innovation policy"
      title="NISP"
      description="Institutional innovation & startup policy — aligning curriculum, IP, and incubation with national goals."
      pattern="dots"
    >
      <div className="space-y-8">
        <p className="text-[#5a6b82] leading-relaxed">
          NISP frameworks encourage faculty–student startups, IP awareness, and industry
          co-creation. This page summarizes our institutional commitments; download the full
          policy PDF from downloads when published.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Lightbulb, title: "Ideation", body: "Idea labs & design thinking" },
            { icon: Rocket, title: "Incubation", body: "Mentors, seed support, and EDC" },
            { icon: Target, title: "Outcomes", body: "IP, competitions, and spin-offs" },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-[#0f766e]/25 bg-gradient-to-b from-[#ecfdf5] to-white p-5"
            >
              <c.icon className="h-7 w-7 text-[#0f766e]" aria-hidden />
              <p className="mt-3 font-display font-semibold text-[#1F3A5F]">
                {c.title}
              </p>
              <p className="mt-1 text-sm text-[#5a6b82]">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </UtilityPageLayout>
  );
}
