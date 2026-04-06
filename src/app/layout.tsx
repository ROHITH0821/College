import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/shell/AppShell";
import { IntroGateRoot } from "@/components/shell/IntroGateRoot";

/** UI body copy — one distinctive sans across all pages. */
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

/** Display / headings — geometric Syne sitewide (hero, sections, page titles). */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  /** Favicon: `src/app/icon.png` (App Router file convention). */
  metadataBase: new URL("https://cmr-engineering.example.edu"),
  title: {
    default: "CMR Engineering College | UGC Autonomous",
    template: "%s | CMR Engineering College",
  },
  description:
    "CMR Engineering College — UGC Autonomous. AICTE approved, JNTUH affiliated, NAAC & NBA accredited. Explore programs, placements, research, and campus life.",
  openGraph: {
    title: "CMR Engineering College | Explore to Invent",
    description:
      "UGC Autonomous institution with industry-aligned programs, advanced labs, and strong placement support.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} ${syne.variable} min-h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] font-sans">
        <IntroGateRoot>
          <AppShell>{children}</AppShell>
        </IntroGateRoot>
      </body>
    </html>
  );
}
