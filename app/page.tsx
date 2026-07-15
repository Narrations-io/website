import type { Metadata } from "next";
import Hero from "@/components/newhome/Hero";
import ProductShowcaseSection from "@/components/sections/ProductShowcaseSection";
import BrandOrbitSection from "@/components/BrandOrbitSection";
import TechnologySection from "@/components/technology/TechnologySection";
import EngageBookSection from "@/components/EngageBookSection";

export const metadata: Metadata = {
  title: "Narrations, an AI company for the digital economy",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Hero = redesigned fold; inherits the site's single Satoshi typeface. */}
      <Hero />
      {/* Product showcase = tabbed drill-down; pick one product, see its
          dashboard view + distinct copy (one-at-a-time, Perspective-style) */}
      <ProductShowcaseSection />
      {/* Technology = the architecture stack (enterprise depth) */}
      <TechnologySection />
      {/* Brands = who we've worked with (social proof), right before the CTA */}
      <BrandOrbitSection />
      {/* Combined finale = engagement models (§4) + book-a-demo in one light
          two-column band, leading into the dark footer */}
      <EngageBookSection />
    </main>
  );
}
