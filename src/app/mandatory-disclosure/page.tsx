import type { Metadata } from "next";
import { UtilityPageLayout } from "@/components/utility/UtilityPageLayout";

export const metadata: Metadata = {
  title: "Mandatory Disclosure",
  description: "Statutory disclosures — approvals, affiliation, audits, and RTI.",
};

const ROWS = [
  ["AICTE approval letter", "PDF", "Annual"],
  ["JNTUH affiliation", "PDF", "Current AY"],
  ["NAAC accreditation", "PDF", "Cycle"],
  ["NBA accreditation", "PDF", "Programmes"],
  ["Audit statements", "PDF", "FY 2024–25"],
  ["Anti-ragging committee", "PDF", "Updated"],
] as const;

export default function MandatoryDisclosurePage() {
  return (
    <UtilityPageLayout
      variant="stone"
      eyebrow="Transparency"
      title="Mandatory Disclosure"
      description="Key documents published in line with UGC / AICTE norms. Replace with live PDFs from your ERP."
      pattern="dots"
    >
      <div className="overflow-hidden rounded-2xl border border-[#1F3A5F]/12">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#1F3A5F]/10 bg-[#F5F7FA] text-[#1F3A5F]">
              <th className="px-4 py-3 font-semibold">Document</th>
              <th className="px-4 py-3 font-semibold">Format</th>
              <th className="px-4 py-3 font-semibold">Validity / note</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([doc, fmt, note]) => (
              <tr key={doc} className="border-b border-[#1F3A5F]/8 hover:bg-[#F5F7FA]/50">
                <td className="px-4 py-3 font-medium text-[#1F3A5F]">{doc}</td>
                <td className="px-4 py-3 text-[#5a6b82]">{fmt}</td>
                <td className="px-4 py-3 text-[#5a6b82]">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-sm text-[#5a6b82]">
        For RTI applications, route requests through the statutory officer listed on the contact
        page.
      </p>
    </UtilityPageLayout>
  );
}
