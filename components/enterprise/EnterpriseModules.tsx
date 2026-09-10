"use client";

// The six controls that ship with every Enterprise deployment (deck §10).
// Not example dashboards — these are the guarantees about where data lives, who
// can reach it and what runs without a person's sign-off.
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
    title: "Private deployment",
    body: "Runs on your own servers or cloud, under your own encryption keys. Your data never leaves and never trains a model.",
  },
  {
    title: "Approval gates",
    body: "Every action waits for a person's sign-off before it touches a live system. The check comes first; the log records it after.",
  },
  {
    title: "Permissions per connection",
    body: "People and agents reach only the sources, tools and rules they need. You set it per connection, not once for the whole platform.",
  },
  {
    title: "Rules checked at draft time",
    body: "Your approved rules, including what you decided not to say, are checked as each draft is written, on every part and model.",
  },
  {
    title: "Audit trail",
    body: "Every draft, edit, approval and agent action is logged. Search it, export it to your systems, keep it as long as auditors need.",
  },
  {
    title: "Usage you can see and cap",
    body: "See adoption, spend and output by team in real time. Set a limit per team before costs climb, and raise it for what works.",
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
            In every deployment
          </p>
          <h2 className="mx-auto mt-3 max-w-none text-3xl font-bold leading-tight tracking-tight text-white md:text-[2.25rem]">
            Built for institutions and governments.
          </h2>
          <p className="mt-4 text-base leading-7 text-[--d-text-mid]">
            Six controls that answer the questions your security team asks
            first: where the data lives, who can reach it, what runs without
            sign-off, and what gets logged.
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-[--d-border] bg-dpanel text-[--d-text-hi] transition-colors hover:bg-dpanel2 disabled:cursor-not-allowed disabled:opacity-40"
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-[--d-border] bg-dpanel text-[--d-text-hi] transition-colors hover:bg-dpanel2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
