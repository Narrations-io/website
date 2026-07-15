import Link from "next/link";
import { ArrowRight } from "lucide-react";

// CTA finale for /enterprise — light-green family, matches EnterpriseExperimentSection.
export default function EnterpriseCTABand() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-green-50 text-ink-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(31,107,76,0.12),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 text-center md:py-28">
        <h2 className="mx-auto max-w-[20ch] text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.5rem]">
          Let's scope your Enterprise AI build.
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-base leading-7 text-ink-500">
          Tell us about your verticals, data and workflows, and we'll shape a
          custom AI system that runs inside your own infrastructure.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-pill bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
          >
            Talk to us about Enterprise AI <ArrowRight size={15} aria-hidden />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-pill border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-sunken"
          >
            Explore the products
          </Link>
        </div>
      </div>
    </section>
  );
}
