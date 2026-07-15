// /about — origin story, told through the same four build-stages of the N-mark used in
// the brand guidelines (docs/brand/narrations-brand-guidelines.print.html, "01 · The
// story" spread). Colors mirror NMark.tsx's light-tone constants (LIGHT_INK/ACCENT_LIGHT/
// LIGHT_BG) since these SVGs are a partial-construction variant of that same mark, not a
// new brand element — kept in sync manually if NMark.tsx's palette ever changes.
const INK = "#0E1311";
const ACCENT = "#1F6B4C";
const BG = "#FAFAF8";

const STEPS = [
  {
    label: "2016",
    title: "One person, one obsession",
    body: "In 2016, after a master's in planning, our founder taught herself to design and build a website so she could write about a technology still in its earliest days: decentralized systems.",
    stage: (
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
    stage: (
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
    stage: (
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
    stage: (
      <svg viewBox="0 0 120 120">
        <defs>
          <clipPath id="origin-clipL">
            <polygon points="26,26 70,26 70,40 40,40 40,94 26,94" />
          </clipPath>
          <clipPath id="origin-clipR">
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
          clipPath="url(#origin-clipL)"
        />
        <rect
          x="77"
          y="85"
          width="20"
          height="4"
          fill={BG}
          transform="rotate(45 87 87)"
          clipPath="url(#origin-clipR)"
        />
        <line x1="44" y1="44" x2="76" y2="76" stroke={ACCENT} strokeWidth="4" />
      </svg>
    ),
  },
];

export default function AboutOrigin() {
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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ label, title, body, stage }) => (
            <div key={label} className="flex flex-col gap-3.5">
              <div className="flex aspect-square items-center justify-center rounded-[14px] border border-line bg-paper p-5 shadow-card">
                <div className="h-3/4 w-3/4">{stage}</div>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-green-500">
                {label}
              </span>
              <h3 className="-mt-2 text-[15px] font-semibold text-ink-900">{title}</h3>
              <p className="text-[13px] leading-6 text-ink-700">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
