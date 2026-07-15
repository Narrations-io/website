// /about — Legacy / track record (dark). Stat strip + named clients. All
// CONFIRMED (CLAUDE.md §8). id="work" + id="clients" so the footer Company
// anchors resolve.

const STATS = [
  { stat: "200+", label: "projects since 2016" },
  { stat: "10+", label: "years in Web3" },
  { stat: "50,000+", label: "assets across formats" },
  { stat: "20+", label: "countries" },
];

// Named clients — confirmed (write "Internet Computer (ICP)" in full).
// Logos, not names — same /brands/uniform/ assets + logo-white filter
// convention used on /products (ProductsOverviewTabs) and the homepage.
const CLIENTS = [
  { src: "/brands/uniform/binance.png", alt: "Binance" },
  { src: "/brands/uniform/ledger.png", alt: "Ledger" },
  { src: "/brands/uniform/sui.png", alt: "Sui" },
  {
    src: "/brands/uniform/internet-computer.png",
    alt: "Internet Computer (ICP)",
    sizeCls: "h-[26px] md:h-[34px]",
  },
  { src: "/brands/uniform/zonda.png", alt: "Zonda" },
  { src: "/brands/uniform/skrill.png", alt: "Skrill", sizeCls: "h-[16px] md:h-[20px]" },
  { src: "/brands/uniform/m2.png", alt: "M2" },
];

export default function AboutLegacy() {
  return (
    <section
      id="work"
      className="relative overflow-hidden bg-dbg text-white scroll-mt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgba(31,107,76,0.16),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden />
            Track record
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white md:text-[2.75rem]">
            A decade of delivered work.
          </h2>
        </div>

        {/* Stat strip */}
        <dl className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map(({ stat, label }) => (
            <div
              key={label}
              className="rounded-[20px] border border-[--d-border] bg-dpanel p-7 text-center"
            >
              <dt className="text-3xl font-bold tracking-tight text-green-400">
                {stat}
              </dt>
              <dd className="mt-1 text-sm text-[--d-text-mid]">{label}</dd>
            </div>
          ))}
        </dl>

        {/* Named clients */}
        <div id="clients" className="mt-16 scroll-mt-24 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[--d-text-mid]">
            Brands we&rsquo;ve worked with
          </p>
          <ul className="mx-auto mt-6 flex max-w-full items-center justify-center gap-8 overflow-x-auto px-4 md:gap-12">
            {CLIENTS.map(({ src, alt, sizeCls }) => (
              <li key={alt} className="flex shrink-0 items-center justify-center">
                <img
                  src={src}
                  alt={alt}
                  className={`${sizeCls ?? "h-[22px] md:h-[28px]"} logo-white w-auto shrink-0 opacity-90`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
