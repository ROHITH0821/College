import type { Metadata } from "next";
import { KeyRound, Shield } from "lucide-react";
import { UtilityPageLayout } from "@/components/utility/UtilityPageLayout";

export const metadata: Metadata = {
  title: "Staff Login",
  description: "Faculty and staff access to MIS, HR, and academic administration.",
};

export default function StaffLoginPage() {
  return (
    <UtilityPageLayout
      variant="indigo"
      eyebrow="Internal access"
      title="Staff Login"
      description="Restricted access for faculty, administrative staff, and department heads."
      pattern="dots"
    >
      <div className="flex flex-col gap-8 lg:flex-row-reverse lg:items-start">
        <aside className="shrink-0 rounded-2xl border border-[#1F3A5F]/10 bg-[#1F3A5F] p-6 text-white lg:w-72">
          <Shield className="h-10 w-10 text-[#F68121]" aria-hidden />
          <h2 className="mt-4 font-display text-xl font-semibold">
            Security notice
          </h2>
          <p className="mt-2 text-sm text-white/80">
            Institutional VPN may be required off-campus. Report suspicious activity to IT
            security immediately.
          </p>
        </aside>
        <div className="min-w-0 flex-1 space-y-6">
          <p className="text-[#5a6b82] leading-relaxed">
            Use LDAP / SSO credentials issued by the college. Session timeout applies per policy.
          </p>
          <div className="rounded-2xl border-2 border-dashed border-[#1F3A5F]/15 bg-[#F5F7FA]/80 p-8">
            <div className="flex items-center gap-3 text-[#1F3A5F]">
              <KeyRound className="h-6 w-6 text-[#F68121]" aria-hidden />
              <span className="font-semibold">Staff authentication</span>
            </div>
            <form className="mt-6 space-y-4" action="#" method="post">
              <input
                type="email"
                name="email"
                autoComplete="username"
                placeholder="Institute email"
                className="w-full rounded-lg border border-[#1F3A5F]/15 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F68121]/30"
              />
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                className="w-full rounded-lg border border-[#1F3A5F]/15 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F68121]/30"
              />
              <button
                type="button"
                className="w-full rounded-lg bg-[#F68121] py-3 text-sm font-semibold text-white hover:bg-[#e77818]"
              >
                Sign in (demo)
              </button>
            </form>
          </div>
        </div>
      </div>
    </UtilityPageLayout>
  );
}
