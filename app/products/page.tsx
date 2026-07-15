import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import ProductsOverviewHero from "@/components/products-overview/ProductsOverviewHero";
import ProductsOverviewTabs from "@/components/products-overview/ProductsOverviewTabs";

export const metadata: Metadata = {
  title: "Products, Narrations",
  description:
    "AI solutions for every function: Content, Marketing, Operations, Finance, Intelligence and Communication, on one shared brand memory.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-surface">
      <SiteNav theme="light" />
      <ProductsOverviewHero />
      <ProductsOverviewTabs />
    </main>
  );
}
