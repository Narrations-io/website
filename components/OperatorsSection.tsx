import { ArrowRight } from "lucide-react";
import EngagementCards from "@/components/ui/EngagementCards";

// Homepage §4 — Operators band. Platform-first, services-backed: the three
// engagement models (deck §13 — SaaS / Enterprise AI / forward-deployed
// operators).
// Cards are extracted into EngagementCards so product pages reuse them.

export default function OperatorsSection() {
  return (
    <section className="bg-green-50">
      <div className="mx-auto max-w-[1100px] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.5rem]">
            Run it yourself, or with one of our operators.
          </h2>
          <p className="mx-auto mt-4 max-w-[60ch] text-base leading-7 text-black/55">
            Use the platform, run it inside your own infrastructure, or have an
            operator set it up with your team. Your rules stay yours in every
            case.
          </p>
        </div>

        <div className="mt-12">
          <EngagementCards />
        </div>

        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-pill bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
          >
            Talk to an operator <ArrowRight size={16} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
