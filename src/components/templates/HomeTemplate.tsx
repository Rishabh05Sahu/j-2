import { HeroSection } from "@/components/organisms/HeroSection";
import { ConciergeIntro } from "@/components/organisms/ConciergeIntro";
import { FeaturedCollections } from "@/components/organisms/FeaturedCollections";
import { BestSellers } from "@/components/organisms/BestSellers";
import { CategoryStrip } from "@/components/organisms/CategoryStrip";
import { BrandStory } from "@/components/organisms/BrandStory";

export function HomeTemplate() {
  return (
    <>
      <HeroSection />
      <ConciergeIntro />
      <FeaturedCollections />
      <BestSellers />
      <CategoryStrip />
      <BrandStory />
    </>
  );
}
