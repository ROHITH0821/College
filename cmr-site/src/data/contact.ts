/** Visual for the contact page — human-centered alt required */
export const CONTACT_PAGE_VISUAL = {
  src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85",
  alt: "Students walking together and talking on a sunny college campus pathway",
} as const;

export const CONTACT_TOPICS = [
  { value: "", label: "Select a topic" },
  { value: "admissions", label: "Admissions & programmes" },
  { value: "visit", label: "Campus / city office visit" },
  { value: "general", label: "General enquiry" },
  { value: "media", label: "Media & partnerships" },
  { value: "other", label: "Other" },
] as const;
