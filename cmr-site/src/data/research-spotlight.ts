/**
 * Research spotlight — projects shown on /research with imagery and detail copy.
 * Replace images with campus lab photography when available.
 */
export type ResearchSpotlight = {
  id: string;
  title: string;
  desc: string;
  tag: string;
  accent: string;
  tagTone: "orange" | "green" | "violet" | "sky";
  image: string;
  imageAlt: string;
  detail: string;
  bullets: readonly string[];
};

export const RESEARCH_SPOTLIGHTS: readonly ResearchSpotlight[] = [
  {
    id: "mobility",
    tag: "AI & Robotics",
    title: "Autonomous mobility stack",
    desc: "Edge perception models for campus shuttles with safety guarantees.",
    accent: "from-[#F68121]/35 via-[#F68121]/5 to-transparent",
    tagTone: "orange",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Researchers working with robotic hardware and laptops in a technology lab",
    detail:
      "Faculty and students co-develop perception stacks that fuse LiDAR and vision on edge GPUs, with formal safety cases for low-speed autonomous shuttles and last-mile delivery pilots on campus.",
    bullets: [
      "Industry advisory from mobility OEM partners",
      "Student teams own dataset curation and model distillation",
      "Safety reviews aligned with SAE levels for pilot routes",
    ],
  },
  {
    id: "materials",
    tag: "Materials",
    title: "Climate-resilient materials",
    desc: "Lightweight composites tested for aerospace supply chains.",
    accent: "from-[#6DBE45]/40 via-[#6DBE45]/8 to-transparent",
    tagTone: "green",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Hands-on materials and chemistry lab work with glassware and instruments",
    detail:
      "Materials science collaborates with mechanical engineering on fibre-reinforced composites — accelerated ageing in environmental chambers and fatigue testing tied to supplier qualification workflows.",
    bullets: [
      "Shared characterization lab with microscopy suite",
      "UG projects feed into sponsored durability studies",
      "Open samples archive for coursework demos",
    ],
  },
  {
    id: "hci",
    tag: "HCI",
    title: "Inclusive learning tech",
    desc: "Adaptive tutoring systems evaluated across regional classrooms.",
    accent: "from-[#7c3aed]/35 via-[#7c3aed]/8 to-transparent",
    tagTone: "violet",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Students collaborating at laptops in a bright seminar room",
    detail:
      "Human–computer interaction researchers run field studies with schools — measuring engagement, accessibility, and learning gains when interfaces adapt to reading level and pacing.",
    bullets: [
      "IRB-reviewed protocols for classroom trials",
      "Co-design workshops with teachers each semester",
      "Open instrumentation for replication studies",
    ],
  },
  {
    id: "energy",
    tag: "Energy Systems",
    title: "Grid-aware microgrids",
    desc: "Campus-scale storage orchestration for peak shaving and renewables.",
    accent: "from-sky-400/40 via-sky-500/10 to-transparent",
    tagTone: "sky",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Electrical engineer reviewing equipment and wiring in an industrial setting",
    detail:
      "Power systems faculty model dispatch strategies for hybrid solar–storage assets — tying coursework in control theory to live telemetry from pilot installations.",
    bullets: [
      "Digital twin of campus feeders for student projects",
      "Partnerships with DISCOMs for internship pipelines",
      "Open datasets for forecasting competitions",
    ],
  },
] as const;

export const RESEARCH_PIPELINE_STEPS = [
  { id: "ideate", label: "Ideate", blurb: "Problem discovery & grants" },
  { id: "prototype", label: "Prototype", blurb: "Labs & maker spaces" },
  { id: "pilot", label: "Pilot", blurb: "Field & industry trials" },
  { id: "publish", label: "Publish", blurb: "Patents & papers" },
] as const;
