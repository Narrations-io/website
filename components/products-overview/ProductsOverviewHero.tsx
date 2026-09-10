import Link from "next/link";
import { ArrowRight } from "lucide-react";

// /products hero — light family, same shape as EnterpriseHero
// (eyebrow, big H1, body, one CTA). Narrations platform positioning (deck §9).
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
          AI writing platform
        </p>
        <h1 className="mt-4 max-w-[20ch] text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-ink-900">
          AI drafts that follow your company&rsquo;s rules.
        </h1>
        <p className="mt-5 max-w-[62ch] text-base leading-7 text-ink-500 md:text-lg md:leading-8">
          Narrations is an editor for everything your company writes: articles,
          campaigns, policies, support replies. Ask for a launch email and it
          drafts from your approved claims and pricing, flags a line that
          contradicts last month&rsquo;s terms, and keeps your fix.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#book-a-demo"
            className="inline-flex items-center gap-2 rounded-pill bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
          >
            Book a demo <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
