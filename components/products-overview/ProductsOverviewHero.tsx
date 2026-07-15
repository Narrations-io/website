import Link from "next/link";
import { ArrowRight } from "lucide-react";

// /products hero — light family, same shape as EnterpriseHero
// (eyebrow, big H1, body, one CTA). Narrations Platform positioning (CLAUDE.md §2).
export default function ProductsOverviewHero() {
  return (
    <section className="relative overflow-hidden bg-surface text-ink-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_20%_40%,rgba(31,107,76,0.08),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
          Narrations platform
        </p>
        <h1 className="mt-4 max-w-[20ch] text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-ink-900">
          A platform with six products.
        </h1>
        <p className="mt-5 max-w-[62ch] text-base leading-7 text-ink-500 md:text-lg md:leading-8">
          Start with one product or run all six, each drafting from the foundation we built for
          your organisation, so you stay focused on the business and scale it rather than spend
          time on plumbing.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#book-a-demo"
            className="inline-flex items-center gap-2 rounded-pill bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
          >
            Get a demo <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
