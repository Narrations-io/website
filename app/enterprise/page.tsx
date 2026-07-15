import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import EnterpriseHero from "@/components/enterprise/EnterpriseHero";
import EnterpriseModules from "@/components/enterprise/EnterpriseModules";
import EnterpriseExperimentSection from "@/components/enterprise/EnterpriseExperimentSection";
import EnterpriseStages from "@/components/enterprise/EnterpriseStages";
import EnterpriseCTABand from "@/components/enterprise/EnterpriseCTABand";
import DashboardSection from "@/components/DashboardSection";

export const metadata: Metadata = {
  title: "Enterprise AI, Narrations",
  description:
    "Custom AI dashboards shaped around your verticals, data, workflows and team, running inside your own infrastructure, with full control over knowledge, permissions and governance.",
};

export default function EnterprisePage() {
  return (
    <main className="min-h-screen bg-dbg">
      {/* Dark nav on the dark page (default theme) */}
      <SiteNav />

      {/* Breadcrumb — dark styling */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-[1200px] items-center gap-2 px-6 pt-2 text-sm text-white/50"
      >
        <Link href="/" className="transition hover:text-white">
          Home
        </Link>
        <span aria-hidden>/</span>
        <span className="font-medium text-white">Enterprise AI</span>
      </nav>

      <EnterpriseHero />
      {/* Moved off the homepage — scripted live demo of the command center. */}
      <DashboardSection />
      <EnterpriseModules />
      {/* Agent A/B test + safe-rollout node diagram */}
      <EnterpriseExperimentSection />
      <EnterpriseStages />
      <EnterpriseCTABand />
    </main>
  );
}
