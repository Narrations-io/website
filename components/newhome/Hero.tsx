import DashboardCard from "./DashboardCard";
import NarrationsLogo from "@/components/NarrationsLogo";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

// Tiling film-grain (feTurbulence) — adds photographic tooth to the flat sky.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// "Worked with" logos — sourced from BrandOrbitSection's normalized tiles
// (public/brands/uniform/*.png, area-balanced into a 400×200 box by
// scripts/normalize-brand-logos.mjs). Rendered as % children of the hill's
// own box below (not the viewport) — see the zoom note on that wrapper.
// Mobile hill wrapper is always exactly 100vw, so plain fixed px classes
// (matching the site's on-screen size) are always safe there — no risk of
// upscaling the source PNGs past their native display size.
const LOGO_SIZE = "h-[22px] md:h-[30px]";
const LOGOS = [
  { src: "/brands/uniform/binance.png", alt: "Binance" },
  { src: "/brands/uniform/sui.png", alt: "Sui" },
  { src: "/brands/uniform/ledger.png", alt: "Ledger" },
  { src: "/brands/uniform/skrill.png", alt: "Skrill", sizeCls: "h-[16px] md:h-[24px]", cqw: 1.25 },
  { src: "/brands/uniform/internet-computer.png", alt: "Internet Computer", sizeCls: "h-[35px] md:h-[44px]", cqw: 2.292 },
];
const DEFAULT_CQW = 1.563; // 30px / 1920px reference hill width, in %

// Desktop hill wrapper can render WIDER than 100vw (that's the point of the
// max(100vw, ...) floor below), so its logos are sized in `cqw` (a % of the
// hill's own container width, via [container-type:inline-size]) instead of
// fixed px — but clamp()'d to a ceiling matching the on-site size, so they
// only ever scale DOWN from their native crispness, never up into blur.
function LogoRow({
  eyebrowSize,
  gapCls,
  desktop = false,
}: {
  eyebrowSize: string;
  gapCls: string;
  desktop?: boolean;
}) {
  return (
    <>
      <p className="uppercase tracking-[0.18em] text-white/65" style={{ fontSize: eyebrowSize }}>
        Brands we&apos;ve worked with
      </p>
      <ul className={`mt-[14px] flex flex-wrap items-center justify-center ${gapCls}`}>
        {LOGOS.map(({ src, alt, sizeCls, cqw }) => (
          <li key={alt} className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              // `logo-white` (globals.css) forces every tile to pure white
              // (keeps alpha) so any colored source art matches the
              // white-on-grass set. It's a real CSS rule, not an arbitrary
              // `[filter:...]` utility, so the prod build can't purge it.
              className={`${desktop ? "" : (sizeCls ?? LOGO_SIZE)} logo-white w-auto opacity-90 transition-opacity duration-300 hover:opacity-100`}
              style={
                desktop
                  ? { height: `clamp(14px, ${cqw ?? DEFAULT_CQW}cqw, ${cqw ? Math.round((cqw / 100) * 1920) : 30}px)` }
                  : undefined
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#dae5ea] text-[#1a1a1a]"
      style={
        {
          // Single scaling unit (2026-07-15, replaces the old --crest/
          // --hill-w pair): nav, headline, CTA, card offset, hill, and the
          // logo row all size off this ONE var instead of independently
          // computed viewport formulas. Browser zoom changes 100vw/100svh's
          // CSS-px value, so mixing fixed px with separately-computed
          // vw/svh math let pieces drift apart from each other at non-100%
          // zoom (hill misaligning with the card, logos climbing off the
          // hill or into the card — see the /prototype/hero-zoom-fix
          // session that diagnosed this). One shared unit means every piece
          // moves together, proportionally, at any zoom or viewport size.
          // 1.5354 = 1758 / 1145 (design reference aspect); at reference
          // size 1u ≈ 17.58px.
          "--u": "min(1vw, 1.5354svh)",
        } as React.CSSProperties
      }
    >
      {/* z-0 — sky + mountains (cool-graded copy of the shared hero art) */}
      <img
        src="/newhome/hero-bg-cool.webp"
        alt=""
        aria-hidden
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* z-[1] — atmosphere: a soft sun-haze bloom just above the hill line and
          a faint top-edge depth wash, so the sky reads photographic, not flat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(78% 48% at 50% 44%, rgba(255,251,242,0.32), rgba(255,251,242,0) 70%), " +
            "radial-gradient(140% 92% at 50% -8%, rgba(168,190,201,0) 42%, rgba(150,176,190,0.20) 100%)",
        }}
      />
      {/* z-[1] — fine film grain over the whole composite */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }}
      />

      {/* z-10 — nav, hero copy, dashboard. Vertical rhythm below the nav is
          expressed in var(--u) (not fixed px) so it scales as one block
          with the hill/logos instead of staying a constant size while they
          shrink under zoom. */}
      <div className="relative z-10" style={{ fontSize: "calc(1 * var(--u))" }}>
        {/* Frosted full-bleed header strip so the nav stops dissolving into the
            sky — sky-tinted glass, hairline base, drops in on load. */}
        <div
          className="nh-anim-nav border-b border-black/[0.04] bg-transparent backdrop-blur-md"
          style={{ height: "calc(3.64 * var(--u))" }}
        >
          <nav className="mx-auto flex h-[64px] max-w-[1072px] items-center justify-between px-6">
            <a href="/" aria-label="Narrations" className="flex items-center">
              <NarrationsLogo height={22} tone="light" />
            </a>
            <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[30px] md:flex">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-[13px] text-[#1c1c1c]/85 transition hover:text-[#000]">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/#book-a-demo"
              className="rounded-full bg-white px-[19px] py-[8px] text-[13px] text-[#141414] shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04] transition hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
            >
              Book a demo
            </a>
          </nav>
        </div>

        <header className="px-6 text-center" style={{ marginTop: "calc(6.83 * var(--u))" }}>
          <h1
            className="nh-anim mx-auto text-[clamp(34px,3.9vw,56px)] font-normal leading-[1.07] tracking-[-0.01em] text-[#161616]"
            style={{ animationDelay: "0.12s" }}
          >
            Productise your growth with AI,
            <br className="hidden sm:block" />{" "}
            <span className="font-semibold">not your headcount.</span>
          </h1>
          <p
            className="nh-anim mx-auto max-w-[560px] text-[14px] leading-[1.6] text-[#232323]"
            style={{ marginTop: "calc(1.02 * var(--u))", animationDelay: "0.22s" }}
          >
            Scale your business across six verticals on Narrations: run it as
            software, or have us build it inside your infrastructure. Built by
            operators behind 200+ projects over 10+ years.
          </p>
          <div
            className="nh-anim flex items-center justify-center gap-3"
            style={{ marginTop: "calc(1.48 * var(--u))", animationDelay: "0.34s" }}
          >
            <a
              href="/products"
              className="inline-flex h-[38px] items-center gap-[9px] rounded-full bg-green-500 px-[22px] text-[13px] text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition hover:bg-green-600"
            >
              Explore products <span aria-hidden>→</span>
            </a>
            <a
              href="/#book-a-demo"
              className="inline-flex h-[38px] items-center rounded-full bg-white px-[20px] text-[13px] text-[#141414] shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] transition hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
            >
              Book a demo
            </a>
          </div>
        </header>

        {/* md+: h-0 lets the card hang below the fold without stretching the
            100svh section — the hills/fold edge crop it, per spec §10. On
            mobile the card stays in flow so it can't get clipped. The card
            rises + fades up last, appearing to push out of the hills.
            Offset is var(--u)-based so it scales with the hill below it. */}
        <div
          data-qa="dashboard"
          className="nh-anim-card flex justify-center px-4 pb-[180px] md:h-0 md:pb-0"
          style={{ marginTop: "calc(9.72 * var(--u))", animationDelay: "0.5s" }}
        >
          <DashboardCard />
        </div>
      </div>

      {/* z-20 — foreground hills, planted in front of the card. The logo row
          is nested INSIDE each hill wrapper as a %-positioned child instead
          of a separately-positioned element (the old LogoBar.tsx approach,
          removed 2026-07-15) — a child positioned by % of its own parent
          can't drift away from that parent under zoom, because there's no
          second formula left to desync. Logo/eyebrow sizes are clamp()'d so
          they scale down with the hill but never exceed their native
          on-site size (avoids upscaling the source PNGs into blur on wide
          viewports). */}

      {/* Mobile: hill fills the width. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 w-full md:hidden">
        <img src="/hero/front-hill.png" alt="" aria-hidden className="block w-full" />
        {/* Centering transform lives on this OUTER div only. nh-anim's
            keyframes end at `transform: none` (fill-mode both), which would
            permanently wipe out a -translate-x-1/2 placed on the same
            element as the animation once it finishes playing — so the
            animation goes on an inner child instead. */}
        <div
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2 text-center"
          style={{ top: "67.5%", width: "92%" }}
        >
          <div className="nh-anim" style={{ animationDelay: "0.62s" }}>
            <LogoRow eyebrowSize="11px" gapCls="gap-x-[6%] gap-y-[3%]" />
          </div>
        </div>
      </div>

      {/* md+: width is max(100vw, N*--u) so it never renders narrower than
          the viewport (always bleeds off both edges — a fixed --u-only
          width would eventually show a hard-cut image boundary on wide
          screens/high zoom). Top offset keeps the crest-tuck look. */}
      <div
        data-qa="hills"
        className="pointer-events-none absolute left-1/2 z-20 hidden -translate-x-1/2 [container-type:inline-size] md:block"
        style={{
          width: "max(100vw, calc(94.93 * var(--u)))",
          top: "calc(47.72 * var(--u) - 0.2938 * max(100vw, calc(94.93 * var(--u))))",
        }}
      >
        <img src="/hero/front-hill.png" alt="" aria-hidden className="block w-full" />
        {/* Same split as the mobile branch above: centering transform on the
            outer div, nh-anim's transform-clobbering keyframes on an inner
            child only. */}
        <div
          data-qa="logobar"
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2 text-center"
          style={{ top: "67.5%", width: "70%" }}
        >
          <div className="nh-anim" style={{ animationDelay: "0.62s" }}>
            <LogoRow eyebrowSize="11px" gapCls="gap-x-[52px] gap-y-5" desktop />
          </div>
        </div>
      </div>
    </section>
  );
}
