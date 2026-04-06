/**
 * Campus gallery — representative college-life imagery (Unsplash).
 * Replace with your own campus photography when available.
 */
export type GalleryShot = {
  src: string;
  alt: string;
  label: string;
  /** Short tag for filters / UI */
  tag: "campus" | "labs" | "life" | "events";
};

export const GALLERY_SHOTS: GalleryShot[] = [
  {
    src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=85",
    alt: "Wide paved walkway between modern campus buildings with trees and students passing through",
    label: "Campus walkways",
    tag: "campus",
  },
  {
    src: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1600&q=85",
    alt: "Graduates in caps and gowns celebrating commencement day outdoors",
    label: "Convocation & celebrations",
    tag: "events",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85",
    alt: "Students collaborating at laptops in a seminar or project room",
    label: "Team projects & hackathons",
    tag: "life",
  },
  {
    src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=85",
    alt: "Laboratory session with glassware and hands-on science experiments",
    label: "Science & chemistry labs",
    tag: "labs",
  },
  {
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=85",
    alt: "Student coding on a laptop in a bright computer lab",
    label: "Computing suites",
    tag: "labs",
  },
  {
    src: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1600&q=85",
    alt: "Sunlit library with tables and shelves for quiet study",
    label: "Library & reading spaces",
    tag: "campus",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=85",
    alt: "Group of students around a table reviewing notes and laptops together",
    label: "Study groups",
    tag: "life",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85",
    alt: "Team at a whiteboard discussing ideas in a modern office-style classroom",
    label: "Design studios",
    tag: "labs",
  },
  {
    src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=85",
    alt: "Students playing volleyball outdoors on a sunny day",
    label: "Sports & recreation",
    tag: "events",
  },
  {
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1600&q=85",
    alt: "Students talking together at desks in a bright classroom between lectures",
    label: "Between classes",
    tag: "life",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
    alt: "Open-plan workspace with desks and natural light",
    label: "Innovation studios",
    tag: "campus",
  },
  {
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=85",
    alt: "Student focused on writing and textbooks during exam season",
    label: "Exam season focus",
    tag: "life",
  },
  {
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=85",
    alt: "Modern university buildings and walkways on a clear day",
    label: "Campus architecture",
    tag: "campus",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=85",
    alt: "Workshop or studio session with laptops and collaboration",
    label: "Workshops & bootcamps",
    tag: "events",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=85",
    alt: "Students presenting around a conference table with laptops",
    label: "Presentations & seminars",
    tag: "events",
  },
  {
    src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85",
    alt: "Team meeting in a bright office with laptops and discussion",
    label: "Industry connect sessions",
    tag: "life",
  },
];
