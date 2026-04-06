/** Hotspots / scenes for the virtual tour page — local /public assets so previews always load. */
export type VirtualTourScene = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  imageAlt: string;
};

export const VIRTUAL_TOUR_SCENES: VirtualTourScene[] = [
  {
    id: "library",
    title: "Learning commons",
    blurb: "Reading bays, digital access, and quiet zones for deep work.",
    image: "/trust-and-featured.jpg",
    imageAlt: "Campus learning and collaboration spaces",
  },
  {
    id: "labs",
    title: "Labs & workshops",
    blurb: "Program-specific labs aligned to industry equipment and safety norms.",
    image: "/placements-showcase.png",
    imageAlt: "Laboratory and technical learning environment",
  },
  {
    id: "innovation",
    title: "Innovation studios",
    blurb: "Project rooms for clubs, hackathons, and interdisciplinary builds.",
    image: "/hero-courtyard.jpg",
    imageAlt: "Open campus courtyard and academic setting",
  },
  {
    id: "sports",
    title: "Sports & recreation",
    blurb: "Courts, fields, and indoor spaces for fitness between classes.",
    image: "/trust-recognition-v2.png",
    imageAlt: "Campus recognition and student outcomes",
  },
  {
    id: "campus",
    title: "Campus spine",
    blurb: "Walkways, greens, and connectivity between academic blocks.",
    image: "/hero-courtyard.jpg",
    imageAlt: "Tree-lined campus courtyard and buildings",
  },
  {
    id: "seminar",
    title: "Seminar halls",
    blurb: "Presentation-ready rooms for talks, juries, and industry sessions.",
    image: "/trust-recognition-logos.png",
    imageAlt: "Institutional accreditation and partnership marks",
  },
];
