// /about — proof-stats + brand-mark panel. Stands in for a photography section
// (this repo has no licensed photo library, and fabricating imagery of "our
// people/work" is off-limits — the brand mark stands in instead).
//
// Every stat is founder track record from before the LLC was registered in 2024,
// and the labels say so. Deck §1.
const STATS = [
  { value: "200+", label: "projects by the founders" },
  { value: "10+", label: "founder years in digital assets" },
  { value: "50,000+", label: "assets the founders delivered" },
  { value: "20+", label: "countries reached" },
];

// Client logos in the frame, darkened (not the white-filter variant) since this
// frame sits on a light bg. Only Ledger and Sui are contracted under Narrations
// LLC — the caption below the grid says so.
const CLIENTS = [
  { src: "/brands/uniform/binance.png", alt: "Binance" },
  { src: "/brands/uniform/ledger.png", alt: "Ledger" },
  { src: "/brands/uniform/sui.png", alt: "Sui" },
  {
    src: "/brands/uniform/internet-computer.png",
    alt: "Internet Computer (ICP)",
    sizeCls: "h-[30px] md:h-[34px]",
  },
  { src: "/brands/uniform/skrill.png", alt: "Skrill", sizeCls: "h-[18px] md:h-[20px]" },
  { src: "/brands/uniform/frankfurt-school.png", alt: "Frankfurt School" },
];

export default function AboutStatement() {
  return (
    <section className="overflow-hidden bg-sunken py-20 md:py-24">
      {/* Giant outlined watermark (N = Interlock mark + "arrations"), light-theme
          counterpart of the dark watermark on /brand.
          Phone step-down: the old clamp floor of 96px made the lockup ~500px wide inside
          the ~358px box at 390px, so it was sliced at BOTH edges and read as a fragment.
          Below sm the floor drops (16vw ≈ 62px at 390px → lockup ≈ 4.49em ≈ 280px inside
          the 358px padded box) so the whole word reads. From sm up the original clamp is
          unchanged — desktop is identical. */}
      <div
        aria-hidden
        className="pointer-events-none mb-14 flex w-full select-none items-center justify-center overflow-hidden whitespace-nowrap px-4 text-[clamp(44px,16vw,96px)] sm:text-[clamp(96px,14vw,220px)] md:mb-20"
      >
        <svg
          viewBox="26 26 68 68"
          style={{ height: "0.72em", width: "0.72em", flexShrink: 0, marginRight: "0.02em" }}
          fill="none"
          stroke="rgba(31,107,76,0.35)"
          strokeWidth="1.6"
          strokeLinejoin="miter"
        >
          <polygon points="26,26 70,26 70,40 40,40 40,94 26,94" />
          <polygon points="94,94 50,94 50,80 80,80 80,26 94,26" />
          <line x1="44" y1="44" x2="76" y2="76" stroke="#1F6B4C" />
        </svg>
        <span
          className="font-semibold leading-none tracking-[-0.04em] text-transparent"
          style={{ WebkitTextStroke: "1px rgba(31,107,76,0.35)" }}
        >
          arrations
        </span>
      </div>

      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-2 lg:items-stretch lg:gap-16">
        <div className="flex flex-col lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
              Proof of work
            </p>
            <p className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-ink-900 md:text-[2rem]">
              A decade of founder work, from startups to industry leaders.
            </p>
          </div>

          <p className="mt-12 text-[13px] font-medium text-ink-500">
            Founder work and Narrations clients.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-8">
            {CLIENTS.map(({ src, alt, sizeCls }) => (
              <div key={alt} className="flex items-center">
                <img
                  src={src}
                  alt={alt}
                  className={`${sizeCls ?? "h-[26px] md:h-[30px]"} w-auto max-w-full object-contain opacity-70 [filter:brightness(0)]`}
                />
              </div>
            ))}
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-6 rounded-[28px] border border-line bg-green-50 p-6 shadow-card sm:gap-8 sm:p-8 md:p-10">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <dd className="text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">
                {value}
              </dd>
              <p className="mt-2 text-sm leading-6 text-ink-500">{label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
