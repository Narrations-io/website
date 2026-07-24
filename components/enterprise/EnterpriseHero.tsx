import Link from "next/link";
import { ArrowRight } from "lucide-react";

// /enterprise hero — dark family (matches homepage EnterpriseAISection). Custom
// AI dashboards inside the client's own infrastructure (Master KB §3.2).
export default function EnterpriseHero() {
  return (
    <section className="relative overflow-hidden bg-dbg text-white">
      {/* Radial green glow — left-biased, matching the homepage Enterprise section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_20%_40%,rgba(31,107,76,0.16),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden />
          Enterprise AI
        </p>
        <h1 className="mt-4 max-w-[20ch] text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-white">
          Your own AI, inside your own infrastructure.
        </h1>
        <p className="mt-5 max-w-[62ch] text-base leading-7 text-[--d-text-mid] md:text-lg md:leading-8">
          For corporates, institutions and governments, we build custom AI
          dashboards shaped around your verticals, data and workflows,
          running in your own environment, with full control over knowledge,
          permissions and governance.
        </p>
        <div className="mt-8 flex flex-wrap">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-pill bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
          >
            Talk to us about Enterprise AI <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
