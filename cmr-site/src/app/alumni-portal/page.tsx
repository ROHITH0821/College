import type { Metadata } from "next";
import { Heart, Network, Sparkles } from "lucide-react";
import { UtilityPageLayout } from "@/components/utility/UtilityPageLayout";

export const metadata: Metadata = {
  title: "Alumni Portal",
  description: "Stay connected with CMR — events, mentoring, and campus updates.",
};

export default function AlumniPortalPage() {
  return (
    <UtilityPageLayout
      variant="orange"
      eyebrow="Lifelong connection"
      title="Alumni Portal"
      description="Network with peers, mentor students, and follow campus milestones — inspired by community-first college sites like CMREC."
      pattern="none"
    >
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Network, t: "Directory", d: "Search batches and chapters" },
            { icon: Sparkles, t: "Events", d: "Reunions and webinars" },
            { icon: Heart, t: "Give back", d: "Mentoring & guest lectures" },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-2xl border border-[#F68121]/25 bg-gradient-to-br from-[#FFF8F2] to-white p-5"
            >
              <x.icon className="h-7 w-7 text-[#F68121]" aria-hidden />
              <p className="mt-3 font-semibold text-[#1F3A5F]">{x.t}</p>
              <p className="mt-1 text-sm text-[#5a6b82]">{x.d}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-[#1F3A5F] px-6 py-8 text-center text-white">
          <p className="font-display text-xl font-semibold">
            Registration opening soon
          </p>
          <p className="mt-2 text-sm text-white/80">
            Leave your email at the contact desk — we’ll notify you when alumni SSO goes live.
          </p>
        </div>
      </div>
    </UtilityPageLayout>
  );
}
