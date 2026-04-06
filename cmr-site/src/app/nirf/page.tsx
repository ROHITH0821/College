import type { Metadata } from "next";
import { Award, BarChart3, TrendingUp } from "lucide-react";
import { UtilityPageLayout } from "@/components/utility/UtilityPageLayout";

export const metadata: Metadata = {
  title: "NIRF Ranking",
  description:
    "National Institutional Ranking Framework — CMR Engineering College performance and participation.",
};

export default function NirfPage() {
  return (
    <UtilityPageLayout
      variant="navy"
      eyebrow="National ranking"
      title="NIRF"
      description="Transparent metrics on teaching, learning, research, and outreach — aligned with MHRD’s National Institutional Ranking Framework."
      pattern="dots"
    >
      <div className="space-y-10">
        <p className="text-[#5a6b82] leading-relaxed">
          CMR Engineering College participates in NIRF submissions as applicable. Rankings are
          published on the official NIRF portal; use the quick links below for the latest
          national tables and our institutional statement.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: BarChart3, label: "Data categories", text: "TLR, RPC, GO, OI, PERCEPTION" },
            { icon: TrendingUp, label: "Trends", text: "Year-on-year institutional metrics" },
            { icon: Award, label: "Recognition", text: "Peer-reviewed national framework" },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-[#1F3A5F]/10 bg-[#F5F7FA] p-5 shadow-sm"
            >
              <c.icon className="h-8 w-8 text-[#F68121]" aria-hidden />
              <p className="mt-3 font-semibold text-[#1F3A5F]">{c.label}</p>
              <p className="mt-1 text-sm text-[#5a6b82]">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-[#1F3A5F]/12 bg-[#1F3A5F]/[0.03] p-6">
          <h2 className="font-display text-xl font-semibold text-[#1F3A5F]">
            Official resources
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-[#5a6b82]">
            <li>
              <a
                href="https://www.nirfindia.org/"
                className="font-medium text-[#1F3A5F] underline-offset-4 hover:text-[#F68121] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                NIRF India — national portal
              </a>
            </li>
            <li>
              <a
                href="https://cmrec.ac.in/"
                className="font-medium text-[#1F3A5F] underline-offset-4 hover:text-[#F68121] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                CMREC — institutional updates
              </a>
            </li>
          </ul>
        </div>
      </div>
    </UtilityPageLayout>
  );
}
