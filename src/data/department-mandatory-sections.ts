/**
 * Mandatory “Department Information” sections — same structure for every department
 * (reference: official CMREC department pages).
 */

export type MandatorySectionId =
  | "rules"
  | "newsletter"
  | "syllabus"
  | "feedback"
  | "fdp"
  | "placements"
  | "academic-activities"
  | "obe"
  | "sdg"
  | "higher-ed"
  | "notifications"
  | "e-resources"
  | "other-links"
  | "innovation-teaching"
  | "rnd"
  | "faculty-appraisal"
  | "visiting-faculty"
  | "co-academic"
  | "events"
  | "faculty-list";

export type MandatorySectionDef = {
  id: MandatorySectionId;
  /** Label; use `{code}` placeholder for department code where needed */
  label: string;
  column: "left" | "right" | "full";
  /** If true, replace `{code}` in label with department code */
  usesDeptCode?: boolean;
};

/** Order matches reference: left column, right column, then full-width faculty list. */
export const MANDATORY_DEPARTMENT_SECTIONS: MandatorySectionDef[] = [
  { id: "rules", label: "Rules & Regulations", column: "left" },
  { id: "newsletter", label: "Department NewsLetter", column: "left" },
  { id: "syllabus", label: "Syllabus", column: "left" },
  { id: "feedback", label: "Feedback System", column: "left" },
  { id: "fdp", label: "FDP / Training / STTPS", column: "left" },
  { id: "placements", label: "{code} Placements", column: "left", usesDeptCode: true },
  { id: "academic-activities", label: "Academic Activities", column: "left" },
  { id: "obe", label: "Outcome Based Education (OBE)", column: "left" },
  { id: "sdg", label: "Sustainable Development Goals", column: "left" },
  { id: "higher-ed", label: "Higher Education", column: "left" },
  { id: "notifications", label: "Notification & Circulars", column: "right" },
  { id: "e-resources", label: "E-Resources", column: "right" },
  { id: "other-links", label: "Other Imp Links", column: "right" },
  { id: "innovation-teaching", label: "Innovation in Teaching and Learning", column: "right" },
  { id: "rnd", label: "Research and Development", column: "right" },
  { id: "faculty-appraisal", label: "Faculty Performance Appraisal", column: "right" },
  { id: "visiting-faculty", label: "Visiting / Adjunct Faculty", column: "right" },
  { id: "co-academic", label: "Co-Academic Activities", column: "right" },
  { id: "events", label: "Events", column: "right" },
  { id: "faculty-list", label: "Department Faculty List", column: "full" },
];

export function formatSectionLabel(
  def: MandatorySectionDef,
  deptCode: string
): string {
  if (def.usesDeptCode) {
    return def.label.replace("{code}", deptCode);
  }
  return def.label;
}

/** Placeholder copy for each section — replace with CMS/PDF links in production. */
export function getMandatorySectionBody(
  id: MandatorySectionId,
  deptName: string,
  deptCode: string
): string {
  const common = `Official documents for ${deptName} will be linked here (PDFs, forms, and circulars) as published by the department.`;

  const map: Record<MandatorySectionId, string> = {
    rules: `Academic and conduct rules, examination regulations, and department-specific policies. ${common}`,
    newsletter: `Department newsletter issues: achievements, student activities, and announcements. ${common}`,
    syllabus: `Autonomous / affiliated programme syllabi, course outcomes, and CO–PO mappings for ${deptCode}. ${common}`,
    feedback: `Student and stakeholder feedback channels, survey summaries, and action-taken reports (OBE). ${common}`,
    fdp: `Faculty Development Programmes, STTPs, workshops attended and organised by ${deptCode} faculty. ${common}`,
    placements: `Placement statistics, recruiter visits, training schedules, and student preparation activities specific to ${deptCode}. See also the central Placements page for campus-wide information.`,
    "academic-activities": `Time tables, academic calendar highlights, guest lectures, and academic events for the department.`,
    obe: `Outcome Based Education framework: COs, POs, attainment analysis, and continuous improvement records.`,
    sdg: `Mapping of department initiatives to UN Sustainable Development Goals (SDGs) and sustainability-related activities.`,
    "higher-ed": `Higher education pathways: PG admissions guidance, competitive exams, and research opportunities for graduates.`,
    notifications: `Latest notifications, circulars, and deadlines issued by the department or institution.`,
    "e-resources": `Digital learning resources: lecture notes, video links, question banks, and open-access material for students.`,
    "other-links": `Important external links: affiliating university, regulatory bodies, and partner portals.`,
    "innovation-teaching": `Innovative pedagogy: project-based learning, flipped classrooms, and ICT tools used in ${deptCode}.`,
    rnd: `Research projects, funded work, publications, and collaboration highlights from ${deptName}.`,
    "faculty-appraisal": `Annual performance appraisal process, criteria, and summaries as per institutional policy.`,
    "visiting-faculty": `Profiles and schedules of visiting, adjunct, and emeritus faculty engaged with the department.`,
    "co-academic": `Co-curricular activities: clubs, competitions, and skill programmes run alongside the curriculum.`,
    events: `Department and student events: seminars, conferences, hackathons, and cultural programmes.`,
    "faculty-list": `Complete list of regular and contractual faculty with designations. Use the Faculty directory for detailed profiles and contact information.`,
  };
  return map[id];
}
