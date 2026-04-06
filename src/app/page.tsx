import { HomeScrollLayout } from "@/components/home/HomeScrollLayout";
import { HomeStackSection } from "@/components/home/HomeStackSection";
import { MinimalIntro } from "@/components/intro/MinimalIntro";
import { AccreditationsSection } from "@/components/sections/AccreditationsSection";
import { BuiltForOutcomesSection } from "@/components/sections/BuiltForOutcomesSection";
import { CampusGallerySection } from "@/components/sections/CampusGallerySection";
import { CampusMapSection } from "@/components/sections/CampusMapSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HighlightsSection } from "@/components/sections/HighlightsSection";
import { InformationSection } from "@/components/sections/InformationSection";
import { QuickAccessSection } from "@/components/sections/QuickAccessSection";
import { VirtualTourSection } from "@/components/sections/VirtualTourSection";

export default function HomePage() {
  return (
    <>
      <MinimalIntro />
      <HomeScrollLayout hero={<HeroSection />}>
        <HomeStackSection stackIndex={0} isFirst>
          <AccreditationsSection />
        </HomeStackSection>
        <HomeStackSection stackIndex={1}>
          <HighlightsSection />
        </HomeStackSection>
        <HomeStackSection stackIndex={2}>
          <InformationSection />
        </HomeStackSection>
        <div className="relative z-20 bg-[#F5F7FA]">
          <BuiltForOutcomesSection />
          <div className="overflow-hidden rounded-t-3xl bg-white shadow-[0_-16px_48px_rgba(31,58,95,0.12)]">
            <CampusGallerySection />
          </div>
          <VirtualTourSection />
          <CampusMapSection />
          <QuickAccessSection />
          <FooterSection />
        </div>
      </HomeScrollLayout>
    </>
  );
}
