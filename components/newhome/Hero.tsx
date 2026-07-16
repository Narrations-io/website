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

// The desktop hill's width. Floored at 100vw so it always bleeds past both
// edges — a pure --u width would eventually show a hard image-boundary cut.
const HILL_W = "max(100vw, calc(94.93 * var(--u)))";

// The fold's height.
//
// The hill is top-anchored off --u, and --u is min(1vw, 1.5354svh) — so below a
// viewport aspect of 1.5354 that min() collapses to the 1vw branch and the
// hill's geometry reduces to a pure function of WIDTH:
//
//     hill bottom = 0.4772W (top) + 0.269W (height) = 0.7462 × viewport width
//
// A plain 100svh fold is a pure function of HEIGHT. The two therefore agree at
// exactly one aspect — 1.3401 — and below it the fold outran the hill, leaking
// the z-0 sky in underneath (measured: 360px of bare sky at 1293×1325, 451px on
// an iPad in portrait, and it starts at 1024×768). Zoom looked like the trigger
// but isn't: it scales W and H equally, so it only multiplies an existing gap.
//
// So: end the fold where the hill ends. 74.62u is the hill's exact bottom in the
// width-driven regime (u == W/100 there, so 74.62u == 0.7462W); 73u backs that
// off by ~1.5u so the hill always overhangs and subpixel rounding can't flash a
// sky line at the seam. Above 1.34 aspect the 100svh term wins and nothing
// changes. The two branches meet continuously at the threshold, so there's no
// jump as a window is resized across it.
//
// The value itself lives in the `.hero-fold` rule (globals.css) because it has
// to branch at the md breakpoint — mobile's hill is bottom-0 anchored, so it
// always reaches the fold and stays a plain 100svh. Applying the desktop 73u to
// mobile would collapse the hero to ~285px on a phone once the card is hung.
// Read back here as var(--fold-h) so the number exists in exactly one place.
const FOLD_H = "var(--fold-h)";

// How far the logo row is allowed to descend.
//
// The row sits at 67.5% of the hill, anchored to the PNG's centre-dip
// silhouette. But hill height = 0.5628 × hill WIDTH, so substituting the hill's
// own `top` collapses the row's absolute position to (47.72u + 0.0861 × hill
// width): every pixel of viewport width pushes the logos ~0.086px further down,
// while only viewport height gives them room. Past ~2.3 aspect they slid below
// the fold and overflow-hidden cropped them — 130px under on a 3440×900 window,
// and 16:9 was already down to 49px of clearance.
//
// This is the same disease as FOLD_H above: a piece anchored to hill-width while
// the fold is anchored to height. min() caps the descent — 67.5% still wins on
// every viewport that isn't broken today (identical to the pixel at the design
// reference and at 16:9), and past the threshold the row parks one row-height
// above the fold rather than following the dip off-screen.
const LOGO_RESERVE = "88px"; // eyebrow 11 + 14px gap + tallest logo 44 + breathing room
const LOGO_TOP = `min(67.5%, calc(${FOLD_H} - 47.72 * var(--u) + 0.2938 * ${HILL_W} - ${LOGO_RESERVE}))`;

// How small a logo may get, as a fraction of its own native height. 0.8 keeps
// every tile at >=80% of its design size, so they stay legible on narrow
// viewports. The clamp only bites below a ~1536px hill, so every viewport at or
// above the design reference is untouched.
const LOGO_FLOOR_RATIO = 0.8;

// Desktop hill wrapper can render WIDER than 100vw (that's the point of the
// max(100vw, ...) floor below), so its logos are sized in `cqw` (a % of the
// hill's own container width, via [container-type:inline-size]) instead of
// fixed px — but clamp()'d to a ceiling matching the on-site size, so they
// only ever scale DOWN from their native crispness, never up into blur.
//
// The trade-off that model missed: tying size to hill WIDTH means a narrow
// viewport is a narrow hill is tiny logos. They bottomed out at a flat 14px
// floor on anything under ~900px — small enough that the `logo-white` silhouette
// turned fine wordmarks (Skrill, Ledger) to mush. Hence the per-tile floor and
// the compressing gap below.
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
      <ul
        className={`mt-[14px] flex flex-wrap items-center justify-center ${gapCls}`}
        // The desktop column gap compresses with the hill instead of staying a
        // flat 52px. At 768px the row is only ~538px wide and four fixed 52px
        // gaps ate 208px of it — 39% — which is what forced the logos down into
        // their floor. Letting the GAPS give way keeps the logos at size.
        // Inline rather than a Tailwind arbitrary: the JIT in this directory
        // doesn't reliably emit new arbitrary classes (see the `touch
        // app/globals.css` gotcha in the README), and inline can't be purged.
        style={desktop ? { columnGap: "clamp(20px, 2.7cqw, 52px)" } : undefined}
      >
        {LOGOS.map(({ src, alt, sizeCls, cqw }) => {
          // Native = the tile's height at the 1920px reference hill. Worth
          // knowing: the source art is 400x200, so 30px is already a ~6.7x
          // DOWNSCALE. The ceiling is a design choice, not a blur guard —
          // nothing here is near its resolution limit until ~200px.
          const c = cqw ?? DEFAULT_CQW;
          const native = Math.round((c / 100) * 1920);
          // Floor is a fraction of each tile's OWN native height, not a flat
          // 14px. The flat floor collapsed the deliberate relative sizing to a
          // single value on narrow viewports — at 1080 wide, Skrill and the
          // default tiles both bottomed out at 14px despite being specced 24
          // vs 30, so Skrill stopped reading as the smaller mark.
          const floor = Math.round(native * LOGO_FLOOR_RATIO);
          return (
            <li key={alt} className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                // `logo-white` (globals.css) forces every tile to pure white
                // (keeps alpha) so any colored source art matches the
                // white-on-grass set. It's a real CSS rule, not an arbitrary
                // `[filter:...]` utility, so the prod build can't purge it.
                // No opacity/hover treatment: the tiles render at full white,
                // always. They used to sit at opacity-90 and only reach 100% on
                // hover, which read as "hazy until moused over" against the
                // hill — and on touch devices there is no hover, so the logos
                // were permanently dimmed with no way to resolve them.
                className={`${desktop ? "" : (sizeCls ?? LOGO_SIZE)} logo-white w-auto`}
                style={desktop ? { height: `clamp(${floor}px, ${c}cqw, ${native}px)` } : undefined}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function Hero() {
  return (
    <section
      // `hero-fold` (globals.css) owns min-height — it has to branch at the md
      // breakpoint, which an inline style can't express. See FOLD_H above.
      className="hero-fold relative overflow-hidden bg-[#dae5ea] text-[#1a1a1a]"
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
            sky — sky-tinted glass, drops in on load. The hairline base
            (border-b border-black/[0.04]) was removed 2026-07-16: against the
            pale sky even 4% black read as a hard separator line. The glass
            alone carries the strip. */}
        {/* minHeight, not height. The strip is --u-scaled but the nav INSIDE it
            is a hard h-[64px] of fixed-px content (22px logo, 13px links, 38px
            button) — so `height: calc(3.64 * var(--u))` was only correct at the
            one viewport where 3.64u == 64px (the 1758 design reference). Below
            it the strip was shorter than its own contents: 60px at 1920, and
            just 14px on a 390px phone, where the glass covered the top fifth of
            the nav and the headline's --u margin started measuring from 14px —
            sliding it up underneath the logo. As a floor, the strip is never
            smaller than the nav, and still scales up past the reference. Same
            fixed-px-inside-a---u-composition trap as FOLD_H and LOGO_TOP. */}
        <div
          className="nh-anim-nav bg-transparent backdrop-blur-md"
          style={{ minHeight: "calc(3.64 * var(--u))" }}
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

        {/* Every gap below is max(<floor>, calc(N * var(--u))) rather than bare
            --u. The multipliers were tuned at the 1758 design reference where
            u ≈ 17.58; on a 390px phone u is 3.9, so they collapsed to a quarter
            of their intended size — the headline/subtitle gap fell to 4px and
            the subtitle/button gap to 6px, jamming the whole block together.
            The floors only engage on phones (and shave 2-3px onto small
            laptops); at the design reference and 1920 every value clears its
            floor, so those are untouched.

            Bonus: the card is in flow, so restoring this breathing room pushes
            it further down behind the hill — better spacing and a deeper tuck
            are the same change. */}
        <header className="px-6 text-center" style={{ marginTop: "max(40px, calc(6.83 * var(--u)))" }}>
          <h1
            className="nh-anim mx-auto text-[clamp(34px,3.9vw,56px)] font-normal leading-[1.07] tracking-[-0.01em] text-[#161616]"
            style={{ animationDelay: "0.12s" }}
          >
            {/* The break is unconditional (was `hidden sm:block`). The bold half
                is the second line BY DESIGN, and hiding the break below 640px
                let the text wrap wherever it landed — which on a phone put the
                regular "AI," and the bold "not your headcount." on the same
                line, splitting "with AI," across the break.
                The nbsp keeps "with AI," together: without it, widths around
                507–575px fit "Productise your growth with" but not the comma,
                stranding "AI," alone on its own line. Line 1 may still wrap on a
                narrow phone — that's fine, the bold still owns its own line. */}
            Productise your growth with&nbsp;AI,
            <br />
            <span className="font-semibold">not your headcount.</span>
          </h1>
          <p
            className="nh-anim mx-auto max-w-[560px] text-[14px] leading-[1.6] text-[#232323]"
            style={{ marginTop: "max(14px, calc(1.02 * var(--u)))", animationDelay: "0.22s" }}
          >
            Scale your business with Narrations. Built by operators behind 200+
            projects over 10 years.
          </p>
          <div
            className="nh-anim flex items-center justify-center"
            style={{ marginTop: "max(20px, calc(1.48 * var(--u)))", animationDelay: "0.34s" }}
          >
            <a
              href="/products"
              className="inline-flex h-[38px] items-center gap-[9px] rounded-full bg-green-500 px-[22px] text-[13px] text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition hover:bg-green-600"
            >
              Explore products <span aria-hidden>→</span>
            </a>
          </div>
        </header>

        {/* h-0 lets the card hang below the fold without stretching the section
            — the hills/fold edge crop it, per spec §10. The card rises + fades
            up last, appearing to push out of the hills. Offset is var(--u)-based
            so it scales with the hill below it.

            This used to be md+ only ("on mobile the card stays in flow so it
            can't get clipped"), which meant the phone never got the composition
            at all: the card rendered full-height as a tall white slab and the
            hills sat several hundred px below it, so the two never met. Hanging
            it on mobile too is the whole point — the hill crops it exactly as it
            does on desktop. Mobile's fold stays 100svh (see .hero-fold), so
            there's a full screen for the card to be cropped against. */}
        <div
          data-qa="dashboard"
          className="nh-anim-card flex h-0 justify-center px-4"
          style={{ marginTop: "max(64px, calc(9.72 * var(--u)))", animationDelay: "0.5s" }}
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
          viewports).

          That parent-relative anchoring is still what holds the row on the
          hill's dip — but it also meant the row followed that dip off the
          bottom of the fold once the hill grew tall enough (see LOGO_TOP),
          so its descent is now clamped. The clamp is inert until the row
          would otherwise leave the fold. */}

      {/* Mobile: hill fills the width. Anchored bottom-0 rather than by --u
          math, so it's structurally immune to both the fold gap and the logo
          clip that the desktop branch below had to be fixed for — there's no
          width-driven term to run away. Leave it that way. */}
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
          width: HILL_W,
          top: `calc(47.72 * var(--u) - 0.2938 * ${HILL_W})`,
        }}
      >
        <img src="/hero/front-hill.png" alt="" aria-hidden className="block w-full" />
        {/* Same split as the mobile branch above: centering transform on the
            outer div, nh-anim's transform-clobbering keyframes on an inner
            child only. */}
        <div
          data-qa="logobar"
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2 text-center"
          style={{ top: LOGO_TOP, width: "70%" }}
        >
          <div className="nh-anim" style={{ animationDelay: "0.62s" }}>
            <LogoRow eyebrowSize="11px" gapCls="gap-y-5" desktop />
          </div>
        </div>
      </div>
    </section>
  );
}
