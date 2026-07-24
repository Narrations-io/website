"use client";

// /about — origin story, told through the same four build-stages of the N-mark used in
// the brand guidelines (docs/brand/narrations-brand-guidelines.print.html, "01 · The
// story" spread). Colors mirror NMark.tsx's light-tone constants (LIGHT_INK/ACCENT_LIGHT/
// LIGHT_BG) since these SVGs are a partial-construction variant of that same mark, not a
// new brand element — kept in sync manually if NMark.tsx's palette ever changes.
//
// Below `lg` the four cards become ONE mark that builds itself. The stacked cards ran
// 2505px = 2.97 phone screens, and 342px of each 523px card was the aspect-square tile —
// two thirds of the scrolling was empty card around a small SVG, repeated four times.
// Now a single mark sticks below the nav and advances stage by stage as the four stories
// scroll past it: dashed outline → solid halves → the diagonal → the finished mark. The
// SVGs ARE construction stages, so the visual earns its space instead of repeating.
// Measured 2505px → 1363px (1.6 screens). At `lg` the original 4-across grid is untouched.
//
// `stage` takes a uid because the fourth stage defines SVG clipPaths by id, and the mark
// renders twice (sticky + grid). Without it both instances would emit the same ids and the
// second would silently resolve against the first.

import { useEffect, useRef, useState } from "react";
const INK = "#0E1311";
const ACCENT = "#1F6B4C";
const BG = "#FAFAF8";

const STEPS = [
  {
    label: "2016",
    title: "One person, one obsession",
    body: "In 2016, after a master's in planning, our founder taught herself to design and build a website so she could write about a technology still in its earliest days: decentralized systems.",
    stage: (uid: string) => (
      <svg viewBox="0 0 120 120">
        <polygon
          points="26,26 70,26 70,40 40,40 40,94 26,94"
          fill="none"
          stroke={INK}
          strokeWidth="1.4"
          strokeDasharray="3 3"
          opacity={0.55}
        />
        <polygon
          points="94,94 50,94 50,80 80,80 80,26 94,26"
          fill="none"
          stroke={INK}
          strokeWidth="1.4"
          strokeDasharray="3 3"
          opacity={0.55}
        />
      </svg>
    ),
  },
  {
    label: "Early days",
    title: "A following, then a career",
    body: "That first blog grew into a following of people who wanted to learn the space, which took her to Upwork, where she became a Top Rated Plus writer in the top 3% globally, with 70+ five-star reviews across 100+ projects.",
    stage: (uid: string) => (
      <svg viewBox="0 0 120 120">
        <polygon points="26,26 70,26 70,40 40,40 40,94 26,94" fill={ACCENT} />
        <polygon points="94,94 50,94 50,80 80,80 80,26 94,26" fill={ACCENT} />
      </svg>
    ),
  },
  {
    label: "Digital assets",
    title: "Every hat the work needed",
    body: "From there she worked with startups, institutions and some of the fastest-growing companies in digital assets, wearing every hat the work needed: content, editorial, marketing and growth.",
    stage: (uid: string) => (
      <svg viewBox="0 0 120 120">
        <polygon points="26,26 70,26 70,40 40,40 40,94 26,94" fill={ACCENT} />
        <polygon points="94,94 50,94 50,80 80,80 80,26 94,26" fill={ACCENT} />
        <line x1="44" y1="44" x2="76" y2="76" stroke={ACCENT} strokeWidth="4" />
      </svg>
    ),
  },
  {
    label: "Today",
    title: "Ten years, one company",
    body: "Ten years and 200+ projects later, Narrations is run by two core pillars leading an 8-person remote-first team, with a dozen contract-based teammates and partnerships with industry-leading service providers.",
    stage: (uid: string) => (
      <svg viewBox="0 0 120 120">
        <defs>
          <clipPath id={`${uid}-clipL`}>
            <polygon points="26,26 70,26 70,40 40,40 40,94 26,94" />
          </clipPath>
          <clipPath id={`${uid}-clipR`}>
            <polygon points="94,94 50,94 50,80 80,80 80,26 94,26" />
          </clipPath>
        </defs>
        <polygon points="26,26 70,26 70,40 40,40 40,94 26,94" fill={ACCENT} />
        <polygon points="94,94 50,94 50,80 80,80 80,26 94,26" fill={ACCENT} />
        <polygon points="26,26 70,26 70,40 40,40" fill={INK} />
        <polygon points="50,80 80,80 94,94 50,94" fill={INK} />
        <rect
          x="23"
          y="31"
          width="20"
          height="4"
          fill={BG}
          transform="rotate(45 33 33)"
          clipPath={`url(#${uid}-clipL)`}
        />
        <rect
          x="77"
          y="85"
          width="20"
          height="4"
          fill={BG}
          transform="rotate(45 87 87)"
          clipPath={`url(#${uid}-clipR)`}
        />
        <line x1="44" y1="44" x2="76" y2="76" stroke={ACCENT} strokeWidth="4" />
      </svg>
    ),
  },
];

export default function AboutOrigin() {
  const [active, setActive] = useState(0);
  const storyRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Whichever story sits nearest the middle of the viewport sets the mark's stage.
  // A scroll listener rather than an IntersectionObserver: "nearest to centre" is a
  // comparison across all four blocks, which a per-element observer callback can only
  // approximate through a tuned rootMargin band. Reading all four positions together
  // states the rule directly. rAF-throttled and passive, so it never blocks scrolling.
  // Only meaningful below `lg`, where the sticky mark renders.
  useEffect(() => {
    let frame = 0;
    const sync = () => {
      frame = 0;
      const centre = window.innerHeight / 2;
      let nearest = 0;
      let best = Infinity;
      storyRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - centre);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      setActive(nearest);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="bg-green-50 py-24 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
            The origin
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.75rem]">
            One person, ten years, narrating.
          </h2>
        </div>

        {/* Below `lg`: one sticky mark that builds, with the stories scrolling past. */}
        <div className="mt-12 lg:hidden">
          <div className="sticky top-20 z-10 -mx-6 bg-green-50/95 px-6 pb-4 pt-2 backdrop-blur-[2px]">
            {/* All four stages are stacked and cross-faded rather than swapped, so the
                transition is a plain opacity change (no keyframes in globals.css, which
                would couple this component to a second file on deploy). Each gets its own
                uid, so no two clipPath ids collide. Decorative — the stories carry the
                meaning — hence aria-hidden. */}
            <div
              aria-hidden
              className="relative mx-auto flex h-[132px] w-[132px] items-center justify-center rounded-[14px] border border-line bg-paper p-5 shadow-card"
            >
              {STEPS.map(({ label, stage }, i) => (
                <div
                  key={label}
                  className={`absolute h-3/4 w-3/4 motion-safe:transition-opacity motion-safe:duration-500 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {stage(`sticky-${i}`)}
                </div>
              ))}
            </div>
            {/* Progress marks — which of the four stages is showing. */}
            <div className="mt-3 flex justify-center gap-1.5" aria-hidden>
              {STEPS.map(({ label }, i) => (
                <span
                  key={label}
                  className={`h-1 rounded-pill transition-all duration-300 ${
                    i === active ? "w-6 bg-green-500" : "w-1.5 bg-ink-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-2xl space-y-14">
            {STEPS.map(({ label, title, body }, i) => (
              <div
                key={label}
                ref={(el) => {
                  storyRefs.current[i] = el;
                }}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-green-500">
                  {label}
                </span>
                <h3 className="mt-1 text-[17px] font-semibold text-ink-900">{title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-700">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* `lg`+: the original 4-across grid, unchanged. */}
        <div className="mt-14 hidden gap-5 lg:grid lg:grid-cols-4">
          {STEPS.map(({ label, title, body, stage }) => (
            <div key={label} className="flex flex-col gap-3.5">
              <div className="flex aspect-square items-center justify-center rounded-[14px] border border-line bg-paper p-5 shadow-card">
                <div className="h-3/4 w-3/4">{stage("grid")}</div>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-green-500">
                {label}
              </span>
              {/* Steps with the body below it. When the body alone moved to 16px from md,
                  this 15px title rendered SMALLER than its own paragraph — a hierarchy
                  inversion. 17px keeps the title above the body at every viewport. */}
              <h3 className="-mt-2 text-[15px] font-semibold text-ink-900 md:text-[17px]">
                {title}
              </h3>
              {/* Was a hard-coded text-[13px] at every viewport — this is the page's main
                  narrative copy and was rendering at Caption size. Now on the Body scale
                  (15px phone → 16px from md) with the design system's 1.6 leading. */}
              {/* md:text-[16px] not md:text-base — the `text-base` utility ships its own
                  line-height (24px) which won out over leading-[1.6], measuring 1.5 on
                  desktop. The bare px size leaves the 1.6 leading intact. */}
              <p className="text-[15px] leading-[1.6] text-ink-700 md:text-[16px]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
