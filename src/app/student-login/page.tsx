import type { Metadata } from "next";
import { Lock, LogIn } from "lucide-react";
import { UtilityPageLayout } from "@/components/utility/UtilityPageLayout";

export const metadata: Metadata = {
  title: "Student Login",
  description: "Access the student portal for academics, fees, and campus services.",
};

export default function StudentLoginPage() {
  return (
    <UtilityPageLayout
      variant="slate"
      eyebrow="Student portal"
      title="Student Login"
      description="Secure access to coursework, attendance, examinations, and student services."
      pattern="grid"
    >
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4 text-[#5a6b82]">
          <p className="leading-relaxed">
            Use your institute-issued credentials. For password reset, contact the IT help desk or
            your department coordinator.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-[#F68121]">•</span>
              Supported browsers: latest Chrome, Edge, Firefox, Safari
            </li>
            <li className="flex gap-2">
              <span className="text-[#F68121]">•</span>
              Do not share OTPs or passwords
            </li>
          </ul>
        </div>
        <div className="lg:col-span-3 rounded-2xl border border-[#1F3A5F]/12 bg-gradient-to-br from-white to-[#F5F7FA] p-8 shadow-[0_20px_50px_rgba(31,58,95,0.08)]">
          <div className="flex items-center gap-3 text-[#1F3A5F]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F3A5F] text-white">
              <LogIn className="h-6 w-6" aria-hidden />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#F68121]">Sign in</p>
              <p className="font-display text-lg font-semibold">
                Student portal
              </p>
            </div>
          </div>
          <form className="mt-8 space-y-4" action="#" method="post">
            <label className="block text-sm font-medium text-[#1F3A5F]">
              Register / Roll number
              <input
                type="text"
                name="user"
                autoComplete="username"
                className="mt-1.5 w-full rounded-xl border border-[#1F3A5F]/15 bg-white px-4 py-3 text-[#1F3A5F] outline-none ring-[#F68121]/0 transition focus:border-[#F68121]/50 focus:ring-2 focus:ring-[#F68121]/25"
                placeholder="e.g. 22XX1A0000"
              />
            </label>
            <label className="block text-sm font-medium text-[#1F3A5F]">
              Password
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                className="mt-1.5 w-full rounded-xl border border-[#1F3A5F]/15 bg-white px-4 py-3 outline-none transition focus:border-[#F68121]/50 focus:ring-2 focus:ring-[#F68121]/25"
              />
            </label>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F3A5F] py-3.5 text-sm font-semibold text-white transition hover:bg-[#2a4a73]"
            >
              <Lock className="h-4 w-4" aria-hidden />
              Continue (demo — wire to SSO)
            </button>
          </form>
        </div>
      </div>
    </UtilityPageLayout>
  );
}
