"use client";

// The nine industry cards from /resources. The page itself is a server
// component (it exports `metadata`), so only the rail is a client island.
//
// Below `sm` the cards are a horizontal scroll-snap row driven by an arrow
// control, mirroring EnterpriseModules (commit 9c058e4). Stacked full-width
// the section measured 1901px at 390x844 — 2.25 phone screens — while tablet
// and desktop fit far less. At `sm`+ the identical <ul> reverts to the plain
// 2/3-col grid, so those viewports are untouched.

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Industry = { name: string; line: string };

export default function ResourcesIndustryRail({
  industries,
}: {
  industries: Industry[];
}) {
  const railRef = useRef<HTMLUListElement | null>(null);
  const [active, setActive] = useState(0);
  const LAST = industries.length - 1;

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
    <>
      {/* Phone: snap rail (cards at 82% so the next one peeks, signalling the
          swipe). `sm`+: the identical markup resolves back to the grid. */}
      <ul
        ref={railRef}
        onScroll={onScroll}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-x-visible lg:grid-cols-3"
      >
        {industries.map(({ name, line }) => (
          <li
            key={name}
            className="w-[82%] shrink-0 snap-start rounded-[20px] border border-line bg-paper p-6 shadow-card sm:w-auto sm:shrink"
          >
            <h3 className="text-[15px] font-semibold text-ink-900">{name}</h3>
            <p className="mt-2 text-[15px] leading-6 text-ink-700">{line}</p>
          </li>
        ))}
      </ul>

      {/* Phone-only cycle control — light-world tokens for this ground. The
          label is capped and truncated: the longest of the nine names
          ("RWA / tokenization & institutional") would otherwise push the
          arrows off a 390px viewport. */}
      <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Previous industry"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>
        <p
          aria-live="polite"
          title={industries[active].name}
          className="min-w-[150px] max-w-[210px] truncate text-center text-[15px] font-semibold tracking-tight text-ink-900"
        >
          {industries[active].name}
        </p>
        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === LAST}
          aria-label="Next industry"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} aria-hidden />
        </button>
      </div>
    </>
  );
}
