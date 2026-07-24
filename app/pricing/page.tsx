import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Pricing, Narrations",
  description:
    "Narrations pricing is consultative and quote-based, there are no published tiers. Tell us what you're building and we'll send pricing.",
};

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-dbg">
      {/* subtle radial green glow behind the hero (matches /contact) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(31,107,76,0.22),transparent_70%)]"
      />
      <SiteNav />
      <ContactSection
        eyebrow="Pricing"
        title="Pricing is scoped to your engagement."
        subtitle="Narrations pricing is consultative: we scope your needs and quote per engagement across the platform (SaaS), Enterprise AI and forward-deployed operators. There are no published tiers. Tell us what you're building and we'll send pricing."
      />
    </main>
  );
}
