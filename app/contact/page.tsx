import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact, Narrations",
  description:
    "Get in touch with Narrations to explore the Narrations platform, build a private AI system or work with our operator team.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-dbg">
      {/* subtle radial green glow behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(31,107,76,0.22),transparent_70%)]"
      />
      <SiteNav />
      <ContactSection />
    </main>
  );
}
