/**
 * Academic departments — each `/departments/[slug]` page includes the same mandatory
 * “Department Information” blocks (aligned with cmrec.ac.in department microsites).
 */

export type Department = {
  slug: string;
  /** Short code for labels e.g. "CSE Placements" */
  code: string;
  name: string;
  description: string;
  /** Cover image URL (optimized via `next/image`) */
  coverImage: string;
  /** Human-written alt text for the cover image — required for accessibility */
  coverAlt: string;
};

/** Hero image on `/departments` index (human alt required) */
export const DEPARTMENTS_PAGE_HERO = {
  image:
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=85",
  imageAlt:
    "Students walking past modern campus buildings on a sunny day, representing college life",
} as const;

export const DEPARTMENTS: Department[] = [
  {
    slug: "cse",
    code: "CSE",
    name: "Computer Science & Engineering",
    description: "AI/ML, cybersecurity, and core computing — labs, curriculum, and research.",
    coverImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=88",
    coverAlt:
      "Group of students collaborating around a table with laptops, discussing computer science and programming",
  },
  {
    slug: "ece",
    code: "ECE",
    name: "Electronics & Communication Engineering",
    description: "RF, VLSI, embedded systems, and communication technologies.",
    coverImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=88",
    coverAlt:
      "Engineering students in a lab using test equipment and working with electronic circuits and instruments",
  },
  {
    slug: "cse-aiml",
    code: "CSE (AI & ML)",
    name: "CSE – Artificial Intelligence & Machine Learning",
    description: "Deep learning, NLP, and intelligent systems aligned to industry needs.",
    coverImage:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2000&q=88",
    coverAlt:
      "Students and mentors in a workshop setting exploring laptops and AI-driven software together",
  },
  {
    slug: "cse-ds",
    code: "CSE (DS)",
    name: "CSE – Data Science",
    description: "Analytics, big data, and statistical learning for decision systems.",
    coverImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=88",
    coverAlt:
      "Team members standing at a whiteboard reviewing charts and data insights during a planning session",
  },
  {
    slug: "it",
    code: "IT",
    name: "Information Technology",
    description: "Software engineering, networks, and enterprise IT solutions.",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=88",
    coverAlt:
      "IT professionals collaborating at a shared desk with computers, discussing networks and systems",
  },
  {
    slug: "cse-cyber",
    code: "CSE (Cyber)",
    name: "CSE – Cyber Security",
    description: "Secure systems, ethical hacking, and resilience engineering.",
    coverImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2000&q=88",
    coverAlt:
      "Student or analyst focused on a laptop screen while working on cybersecurity or software tasks in an office",
  },
];

export function getDepartmentBySlug(slug: string): Department | undefined {
  return DEPARTMENTS.find((d) => d.slug === slug);
}

export function getAllDepartmentSlugs(): string[] {
  return DEPARTMENTS.map((d) => d.slug);
}
