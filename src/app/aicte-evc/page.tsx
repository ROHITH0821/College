import type { Metadata } from "next";
import { FileCheck, ExternalLink } from "lucide-react";
import { UtilityPageLayout } from "@/components/utility/UtilityPageLayout";

export const metadata: Metadata = {
  title: "AICTE EVC",
  description: "AICTE Extended Validation Cell — mandatory disclosures and compliance.",
};

export default function AicteEvcPage() {
  return (
    <UtilityPageLayout
      variant="emerald"
      eyebrow="Regulatory compliance"
      title="AICTE EVC"
      description="Extended Validation Cell resources and AICTE mandatory disclosure pathways."
      pattern="grid"
    >
      <div className="space-y-6 text-[#5a6b82]">
        <p className="leading-relaxed">
          Institutions publish mandatory information through AICTE’s channels. Use the official
          AICTE portal for validated documents and EVC workflows.
        </p>
        <div className="flex flex-col gap-4 rounded-2xl border border-[#1F3A5F]/10 bg-[#f0fdf9] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <FileCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#0d6b4f]" aria-hidden />
            <div>
              <p className="font-semibold text-[#1F3A5F]">AICTE — student & institutional corner</p>
              <p className="text-sm">Policies, approvals, and disclosure formats.</p>
            </div>
          </div>
          <a
            href="https://www.aicte-india.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0d6b4f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0a5a42]"
          >
            AICTE portal
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </UtilityPageLayout>
  );
}
