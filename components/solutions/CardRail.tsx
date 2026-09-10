"use client";

// Generic card grid that becomes a swipeable snap rail below `sm`, driven by an
// arrow control that prints the active card's title. Generalised from the old
// ResourcesIndustryRail so /solutions can use it twice — once for who it's for,
// once for the industries we start in.
//
// Stacked full-width these sections ran well over a phone screen; the rail keeps
// them to one. At `sm`+ the identical <ul> reverts to a plain 2/3-col grid, so
// tablet and desktop are untouched.

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type RailCard = { title: string; body: string };

export default function CardRail({
  items,
  label,
}: {
  items: RailCard[];
  /** Singular noun for the arrow aria-labels, e.g. "segment" or "industry". */
  label: string;
}) {
  const railRef = useRef<HTMLUListElement | null>(null);
  const [active, setActive] = useState(0);
  const LAST = items.length - 1;

  // Derive the active card from scroll position so swiping and the arrows stay
  // in sync (the rail is a real scroller, not a transform track).
  const onScroll = useCallback(() => {
    const rail = railRef.current;
    const card = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !card) return;
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
        {items.map(({ title, body }) => (
          <li
            key={title}
            className="w-[82%] shrink-0 snap-start rounded-[20px] border border-line bg-paper p-6 shadow-card sm:w-auto sm:shrink"
          >
            <h3 className="text-[15px] font-semibold text-ink-900">{title}</h3>
            <p className="mt-2 text-[15px] leading-6 text-ink-700">{body}</p>
          </li>
        ))}
      </ul>

      {/* Phone-only cycle control. The label is capped and truncated so a long
          card title can't push the arrows off a 390px viewport. */}
      <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label={`Previous ${label}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>
        <p
          aria-live="polite"
          title={items[active].title}
          className="min-w-[150px] max-w-[210px] truncate text-center text-[15px] font-semibold tracking-tight text-ink-900"
        >
          {items[active].title}
        </p>
        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === LAST}
          aria-label={`Next ${label}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} aria-hidden />
        </button>
      </div>
    </>
  );
}
