import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Pricing | Narrations",
  description:
    "Pricing is scoped to how you use Narrations: the platform in private beta, a deployment inside your own infrastructure, or an operator on your team. Tell us which and we'll send numbers.",
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
        title="Pricing is scoped. The beta is invite-only."
        subtitle="The platform is seats plus usage credits, with MCP access and your choice of models. Its tiers are unpublished because it is in private beta; they go public when self-serve opens. Enterprise AI is a build fee, then an operating contract. Operators are a monthly fee per person."
      />
    </main>
  );
}
