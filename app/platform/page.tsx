import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import ProductsOverviewHero from "@/components/products-overview/ProductsOverviewHero";
import ProductsOverviewTabs from "@/components/products-overview/ProductsOverviewTabs";

export const metadata: Metadata = {
  title: "Platform: one ledger for everything you say | Narrations",
  description:
    "One platform for everything you say. Content, Marketing, Operations, Customer Support and AI Studio all draft from the Ledger, one record of what you decided.",
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
