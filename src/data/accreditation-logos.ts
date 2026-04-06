/**
 * Trust & recognition marks — high-resolution assets.
 * UGC, NAAC, NBA, NIRF, AICTE, JNTUH, Careers360: sourced from Wikimedia Commons / Wikipedia
 * (encyclopedia-hosted copies of widely published institutional marks). Replace with your
 * college’s official press-kit files in /public/accreditations/ if required.
 * ARIIA: vector placeholder (no stable Commons file); swap for the official MoE/ARIIA asset when available.
 */
export type AccreditationLogo = {
  id: string;
  label: string;
  /** Path under /public */
  src: string;
  alt: string;
};

export const ACCREDITATION_LOGOS: AccreditationLogo[] = [
  {
    id: "ugc",
    label: "UGC Autonomous",
    src: "/accreditations/ugc.png",
    alt: "University Grants Commission of India emblem — autonomous status",
  },
  {
    id: "naac",
    label: "NAAC Accredited",
    src: "/accreditations/naac.png",
    alt: "National Assessment and Accreditation Council logo",
  },
  {
    id: "nba",
    label: "Accredited by NBA",
    src: "/accreditations/nba.svg",
    alt: "National Board of Accreditation logo",
  },
  {
    id: "nirf",
    label: "NIRF Ranked",
    src: "/accreditations/nirf.png",
    alt: "National Institutional Ranking Framework India logo",
  },
  {
    id: "aicte",
    label: "AICTE",
    src: "/accreditations/aicte.png",
    alt: "All India Council for Technical Education logo",
  },
  {
    id: "jntuh",
    label: "JNTUH",
    src: "/accreditations/jntuh.png",
    alt: "Jawaharlal Nehru Technological University Hyderabad emblem",
  },
  {
    id: "careers360",
    label: "Careers360",
    src: "/accreditations/careers360.jpg",
    alt: "Careers360 education portal logo",
  },
  {
    id: "ariia",
    label: "ARIIA",
    src: "/accreditations/ariia.svg",
    alt: "ARIIA — Atal Ranking of Institutions on Innovation Achievements",
  },
];
