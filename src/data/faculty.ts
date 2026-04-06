/**
 * Representative faculty profiles — replace with CMS or official directory data.
 */

export type FacultyMember = {
  slug: string;
  name: string;
  prefix: string;
  designation: string;
  department: string;
  qualifications: string[];
  specialization: string[];
  experienceYears: number;
  email: string;
  phone?: string;
  imageUrl: string;
  /** One line for cards */
  tagline: string;
  bio: string;
  researchAreas: string[];
  teachingSubjects: string[];
  publicationsSummary?: string;
  officeHours?: string;
};

export const FACULTY_LIST: FacultyMember[] = [
  {
    slug: "dr-ananya-rao",
    prefix: "Dr.",
    name: "Ananya Rao",
    designation: "Professor",
    department: "Computer Science & Engineering",
    qualifications: ["Ph.D. (IISc Bangalore)", "M.Tech (CSE), JNTUH"],
    specialization: ["Machine learning", "Distributed systems", "Cloud computing"],
    experienceYears: 18,
    email: "ananya.rao@cmrec.ac.in",
    phone: "+91-40-XXXX-2101",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=90",
    tagline: "Research in ML & scalable systems; Ph.D. supervision.",
    bio: "Dr. Ananya Rao leads the advanced computing lab and mentors student teams for national hackathons. Her work focuses on trustworthy ML pipelines for campus analytics and industry collaborations.",
    researchAreas: [
      "Federated learning",
      "Distributed graph processing",
      "MLOps for education data",
    ],
    teachingSubjects: [
      "Design & Analysis of Algorithms",
      "Machine Learning",
      "Distributed Systems",
    ],
    publicationsSummary:
      "40+ publications in indexed journals and conferences; reviewer for IEEE and Springer venues.",
    officeHours: "Mon & Wed, 3:00 – 5:00 PM (CSE block, Level 2)",
  },
  {
    slug: "dr-vikram-singh",
    prefix: "Dr.",
    name: "Vikram Singh",
    designation: "Associate Professor",
    department: "Electronics & Communication Engineering",
    qualifications: ["Ph.D. (IIT Madras)", "B.Tech (ECE)"],
    specialization: ["RF & antennas", "IoT", "Embedded systems"],
    experienceYears: 12,
    email: "vikram.singh@cmrec.ac.in",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=90",
    tagline: "RF & IoT labs; industry projects with defence & telecom partners.",
    bio: "Dr. Vikram Singh coordinates the IoT innovation lab and supports student projects on wireless sensing and edge AI. He bridges curriculum labs with internship tracks at partner firms.",
    researchAreas: [
      "Antenna design",
      "Low-power wireless",
      "Embedded ML on edge devices",
    ],
    teachingSubjects: [
      "Analog & Digital Communications",
      "Microprocessors & Microcontrollers",
      "IoT Systems",
    ],
    publicationsSummary: "25+ papers; 3 granted patents in antenna structures.",
    officeHours: "Tue & Thu, 2:00 – 4:00 PM",
  },
  {
    slug: "dr-meera-krishnan",
    prefix: "Dr.",
    name: "Meera Krishnan",
    designation: "Dean — Academics",
    department: "Academic Affairs",
    qualifications: ["Ph.D. (Education Policy)", "M.Tech", "B.E."],
    specialization: ["Curriculum design", "NAAC & NBA", "Assessment reform"],
    experienceYears: 22,
    email: "meera.krishnan@cmrec.ac.in",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=90",
    tagline: "Autonomous curriculum, accreditation, and outcome-based education.",
    bio: "Dr. Meera Krishnan steers academic planning, OBE implementation, and liaison with affiliating university and regulators. She chairs the academic council and quality cell initiatives.",
    researchAreas: [
      "Engineering education research",
      "Competency frameworks",
      "Continuous improvement systems",
    ],
    teachingSubjects: ["Professional Ethics", "Seminar — Research Methods"],
    publicationsSummary: "Guided institutional reports for NAAC & NBA cycles.",
    officeHours: "By appointment (Dean’s office, Admin block)",
  },
  {
    slug: "dr-rahul-verma",
    prefix: "Dr.",
    name: "Rahul Verma",
    designation: "Head — Training & Placements",
    department: "Career Development Cell",
    qualifications: ["Ph.D. (Management)", "MBA"],
    specialization: ["Industry relations", "Internships", "Campus recruitment"],
    experienceYears: 15,
    email: "rahul.verma@cmrec.ac.in",
    phone: "+91-40-XXXX-2180",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=90",
    tagline: "Campus drives, internships, and employer partnerships.",
    bio: "Dr. Rahul Verma leads placement operations, soft-skills bootcamps, and recruiter engagement. He works with departments to align skill badges with hiring trends.",
    researchAreas: ["Graduate employability", "Internship analytics"],
    teachingSubjects: ["Employability Skills", "Industry Readiness Workshop"],
    publicationsSummary: "Speaker at national summits on campus hiring.",
    officeHours: "Mon–Fri, 10:00 AM – 5:00 PM (CDC)",
  },
  {
    slug: "dr-sanjay-patel",
    prefix: "Dr.",
    name: "Sanjay Patel",
    designation: "Assistant Professor",
    department: "Computer Science & Engineering (AI & ML)",
    qualifications: ["Ph.D. (NIT Warangal)", "M.Tech (AI)"],
    specialization: ["Deep learning", "Computer vision", "NLP"],
    experienceYears: 8,
    email: "sanjay.patel@cmrec.ac.in",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=90",
    tagline: "Vision & language models; student research groups.",
    bio: "Dr. Sanjay Patel runs the AI/ML elective track and supervises UG projects on vision and NLP. He collaborates with the IIC on innovation challenges.",
    researchAreas: ["Medical image analysis", "Multimodal learning"],
    teachingSubjects: [
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
    ],
    publicationsSummary: "15+ conference papers; datasets released open-source.",
    officeHours: "Wed & Fri, 4:00 – 6:00 PM",
  },
  {
    slug: "dr-kavya-reddy",
    prefix: "Dr.",
    name: "Kavya Reddy",
    designation: "Professor",
    department: "Electronics & Communication Engineering",
    qualifications: ["Ph.D. (JNTUH)", "M.E. (VLSI)"],
    specialization: ["VLSI design", "Signal processing", "Mixed-signal ICs"],
    experienceYears: 20,
    email: "kavya.reddy@cmrec.ac.in",
    imageUrl:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=90",
    tagline: "VLSI & signal processing; lab modernization lead.",
    bio: "Dr. Kavya Reddy heads the VLSI lab refresh and mentors M.Tech scholars. She coordinates industry workshops on Cadence and FPGA flows.",
    researchAreas: ["Low-power VLSI", "DSP for communications"],
    teachingSubjects: ["VLSI Design", "Digital Signal Processing", "CMOS Design"],
    publicationsSummary: "30+ publications; funded projects from agencies.",
    officeHours: "Mon, Wed, Fri — 11:00 AM – 1:00 PM",
  },
];

export function getFacultyBySlug(slug: string): FacultyMember | undefined {
  return FACULTY_LIST.find((f) => f.slug === slug);
}

export function getAllFacultySlugs(): string[] {
  return FACULTY_LIST.map((f) => f.slug);
}
