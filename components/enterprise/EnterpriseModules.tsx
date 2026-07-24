"use client";

// Example Enterprise AI dashboard modules, expanded with a line each
// (Master KB §3.2). Illustrative examples, not a fixed set: a build is
// shaped around the client's own verticals.
//
// Below `sm` the six cards are a horizontal scroll-snap row driven by an
// arrow control, mirroring the homepage product tabs (9c058e4). Stacked
// full-width they ran 1248px — 1.48 phone screens — while tablet and desktop
// both fit inside one. At `sm`+ the list reverts to the plain 2/3-col grid.

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Module = { title: string; body: string };

const MODULES: Module[] = [
  {
    title: "Content & editorial",
    body: "Long-form, web and creative in your brand voice, with editorial review.",
  },
  {
    title: "Marketing & distribution",
    body: "Campaigns, SEO and GEO, social and lifecycle, run from your own dashboard.",
  },
  {
    title: "Investor materials & dataroom",
    body: "Whitepapers, decks and an access-controlled dataroom for investor diligence.",
  },
  {
    title: "Market intelligence & diligence",
    body: "Narrative detection, competitor profiles and decision-ready research on your markets.",
  },
  {
    title: "Operations & workflow",
    body: "Support, SOPs and internal coordination, with approvals built in.",
  },
  {
    title: "Compliance & comms",
    body: "Policy, disclosure and people-facing comms routed through approval gates.",
  },
];

export default function EnterpriseModules() {
  const railRef = useRef<HTMLUListElement | null>(null);
  const [active, setActive] = useState(0);
  const LAST = MODULES.length - 1;

  // Derive the active card from scroll position so swiping and the arrows stay
  // in sync (the rail is a real scroller, not a transform track).
  const onScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild as HTMLElement | null;
    if (!card) return;
    const stride = card.offsetWidth + 16; // gap-4
    setActive(Math.min(LAST, Math.max(0, Math.round(rail.scrollLeft / stride))));
  }, [LAST]);

  // The rail only exists below `sm`; above it the same <ul> is a static grid,
  // so reset the index when the arrows disappear to avoid a stale label.
  useEffect(() => {
    const wide = matchMedia("(min-width: 640px)");
    const sync = () => wide.matches && setActive(0);
    sync();
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  }, []);

  const go = useCallback((next: number) => {
    const rail = railRef.current;
    const card = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !card) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({
      left: next * (card.offsetWidth + 16),
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  return (
    <section className="bg-dbg text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden />
            Example dashboards
          </p>
          <h2 className="mx-auto mt-3 max-w-none text-3xl font-bold leading-tight tracking-tight text-white md:whitespace-nowrap md:text-[2.25rem]">
            A dedicated dashboard for every vertical.
          </h2>
          <p className="mt-4 text-base leading-7 text-[--d-text-mid]">
            We build a dashboard for each function that matters to your business.
            These are examples, not a fixed set.
          </p>
        </div>

        {/* Phone: snap rail (cards at 82% so the next one peeks, signalling the
            swipe). `sm`+: the identical markup resolves back to the grid. */}
        <ul
          ref={railRef}
          onScroll={onScroll}
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-x-visible lg:grid-cols-3"
        >
          {MODULES.map(({ title, body }) => (
            <li
              key={title}
              className="w-[82%] shrink-0 snap-start rounded-[16px] border border-[--d-border] bg-dpanel p-5 sm:w-auto sm:shrink"
            >
              <h3 className="text-[15px] font-semibold text-[--d-text-hi]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[--d-text-mid]">{body}</p>
            </li>
          ))}
        </ul>

        {/* Phone-only cycle control — dark-world tokens, matching this section */}
        <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Previous dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-pill border border-[--d-border] bg-dpanel text-[--d-text-hi] transition-colors hover:bg-dpanel2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <p
            aria-live="polite"
            className="min-w-[150px] text-center text-[15px] font-semibold tracking-tight text-[--d-text-hi]"
          >
            {MODULES[active].title}
          </p>
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === LAST}
            aria-label="Next dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-pill border border-[--d-border] bg-dpanel text-[--d-text-hi] transition-colors hover:bg-dpanel2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
