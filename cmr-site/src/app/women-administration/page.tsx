import type { Metadata } from "next";
import { HandHeart, Scale, Users } from "lucide-react";
import { UtilityPageLayout } from "@/components/utility/UtilityPageLayout";

export const metadata: Metadata = {
  title: "Women Administration",
  description: "ICC, anti-sexual harassment, and women’s welfare initiatives at CMR.",
};

export default function WomenAdministrationPage() {
  return (
    <UtilityPageLayout
      variant="rose"
      eyebrow="Equity & safety"
      title="Women Administration"
      description="Policies, committees, and support systems aligned with UGC and statutory requirements."
      pattern="dots"
    >
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#9f1239]/20 bg-[#fff1f2] p-6">
            <Scale className="h-8 w-8 text-[#9f1239]" aria-hidden />
            <h2 className="mt-4 font-display text-xl font-semibold text-[#1F3A5F]">
              Internal Complaints Committee
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5a6b82]">
              Confidential reporting, inquiry timelines, and appeals as per the Sexual Harassment
              of Women at Workplace Act.
            </p>
          </div>
          <div className="rounded-2xl border border-[#1F3A5F]/10 bg-white p-6 shadow-sm">
            <Users className="h-8 w-8 text-[#F68121]" aria-hidden />
            <h2 className="mt-4 font-display text-xl font-semibold text-[#1F3A5F]">
              Women’s development cell
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5a6b82]">
              Skill workshops, health camps, and leadership mentoring for students and staff.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-2xl bg-[#1F3A5F] px-6 py-5 text-white">
          <HandHeart className="h-10 w-10 shrink-0 text-[#F68121]" aria-hidden />
          <div>
            <p className="font-semibold">Need help?</p>
            <p className="mt-1 text-sm text-white/85">
              Contact the presiding officer through the college helpdesk or email the ICC
              coordinator (details on the notice board and student handbook).
            </p>
          </div>
        </div>
      </div>
    </UtilityPageLayout>
  );
}
