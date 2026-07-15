import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import AboutStatement from "@/components/about/AboutStatement";
import AboutOrigin from "@/components/about/AboutOrigin";

export const metadata: Metadata = {
  title: "About, Narrations",
  description:
    "Narrations began as a Web3 content, marketing and growth firm in 2016 and is now an AI platform company, platform-first, services-backed.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface">
      <SiteNav theme="light" />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-[1200px] items-center gap-2 px-6 pt-6 text-sm text-ink-500"
      >
        <Link href="/" className="transition hover:text-ink-900">
          Home
        </Link>
        <span aria-hidden>/</span>
        <span className="font-medium text-ink-900">About</span>
      </nav>

      <AboutOrigin />
      <AboutStatement />

      {/* Investor / founders inquiry CTA (light-green, matches enterprise light sections) */}
      <section className="relative overflow-hidden border-t border-line bg-green-50 text-ink-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(31,107,76,0.12),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 py-24 text-center md:py-28">
          <h2 className="mx-auto max-w-[32ch] text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.75rem]">
            To know more about our founder, team and dataroom for
            investment opportunities, contact us.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-pill bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              Contact us <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
