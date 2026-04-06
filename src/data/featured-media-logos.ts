/**
 * Featured outlets — `domain` rows load via plain &lt;img&gt; with fallbacks (Google favicon → Clearbit → DuckDuckGo).
 * Google News uses a Wikimedia SVG (vector).
 */
export type FeaturedMediaLogo =
  | {
      id: string;
      alt: string;
      kind: "domain";
      /** e.g. aninews.in — used to build favicon/logo URLs */
      domain: string;
    }
  | {
      id: string;
      alt: string;
      kind: "svg";
      src: string;
    };

export const FEATURED_MEDIA_LOGOS: FeaturedMediaLogo[] = [
  { id: "ani", alt: "ANI News", kind: "domain", domain: "aninews.in" },
  { id: "business-standard", alt: "Business Standard", kind: "domain", domain: "business-standard.com" },
  {
    id: "google-news",
    alt: "Google News",
    kind: "svg",
    /** Bundled in /public — avoids broken remote loads & Wikimedia 404s */
    src: "/featured-media/google-news.svg",
  },
  /** Andhra Jyothi — `abnandhrajyothy` typo breaks favicon resolution; use live host */
  { id: "abn", alt: "ABN Andhra Jyothi", kind: "domain", domain: "www.andhrajyothy.com" },
  { id: "the-print", alt: "The Print", kind: "domain", domain: "theprint.in" },
  { id: "etv-bharat", alt: "ETV Bharat", kind: "domain", domain: "etvbharat.com" },
  { id: "eenadu", alt: "Eenadu", kind: "domain", domain: "eenadu.net" },
];
