import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import NarrationsLogo from "@/components/NarrationsLogo";
import NMark from "@/components/NMark";
import ProductName from "@/components/ui/ProductName";

export const metadata: Metadata = {
  title: "Narrations Brand assets & guidelines",
  description:
    "Logo, mark, color, typography and usage rules for the Narrations brand.",
};

const LOGO_FILES = [
  { file: "narrations-logo-light.svg", dark: false },
  { file: "narrations-logo-dark.svg", dark: true },
];

const MARK_FILES = [
  { file: "narrations-mark-light.svg", dark: false },
  { file: "narrations-mark-dark.svg", dark: true },
];

/* The swatch labels sit on the swatch colour itself, so the text treatment has
   to be chosen per swatch to stay AA (4.5:1) — the hex/RGB lines are content
   users copy, not decoration. Measured (WCAG, alpha composited):
     "onDark"  white / white-85 on #07140F, #1F6B4C, #0F2A20 → 5.4:1 to 18:1  ✓
     "onLight" #0E1311 / black-70 on #F3F5F0, #FAFAF8        → 8.3:1+         ✓
     "onMid"   Green 400 #2E8B63 is too light for white (4.21:1) and too dark
               for black/70 (3.66:1); pure black is 4.99:1                    ✓ */
type Tone = "onDark" | "onLight" | "onMid";

const COLORS: { name: string; hex: string; rgb: string; swatch: string; tone: Tone }[] = [
  { name: "Evergreen", hex: "#07140F", rgb: "7, 20, 15", swatch: "#07140F", tone: "onDark" },
  { name: "Brand Green", hex: "#1F6B4C", rgb: "31, 107, 76", swatch: "#1F6B4C", tone: "onDark" },
  { name: "Off-white", hex: "#F3F5F0", rgb: "243, 245, 240", swatch: "#F3F5F0", tone: "onLight" },
];

const SUPPORTING: typeof COLORS = [
  { name: "Panel", hex: "#0F2A20", rgb: "15, 42, 32", swatch: "#0F2A20", tone: "onDark" },
  { name: "Green 400", hex: "#2E8B63", rgb: "46, 139, 99", swatch: "#2E8B63", tone: "onMid" },
  { name: "Surface", hex: "#FAFAF8", rgb: "250, 250, 248", swatch: "#FAFAF8", tone: "onLight" },
];

const SWATCH_NAME_CLASS: Record<Tone, string> = {
  onDark: "text-white",
  onLight: "text-[#0E1311]",
  onMid: "text-black",
};

const SWATCH_SPEC_CLASS: Record<Tone, string> = {
  onDark: "text-white/85",
  onLight: "text-black/70",
  onMid: "text-black",
};

function Swatch({ color }: { color: (typeof COLORS)[number] }) {
  return (
    <div
      className="relative flex aspect-[3/2] flex-col justify-end rounded-[20px] p-6"
      style={{ background: color.swatch }}
    >
      <p className={`text-[15px] font-semibold ${SWATCH_NAME_CLASS[color.tone]}`}>
        {color.name}
      </p>
      <p className={`mt-1 font-mono text-[13px] ${SWATCH_SPEC_CLASS[color.tone]}`}>
        RGB: {color.rgb}
      </p>
      <p className={`font-mono text-[13px] ${SWATCH_SPEC_CLASS[color.tone]}`}>
        {color.hex}
      </p>
    </div>
  );
}

function Section({
  label,
  body,
  children,
}: {
  label: string;
  body: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/[0.06] py-[120px]">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="text-[28px] font-semibold tracking-[-0.01em] text-white md:text-[34px]">
            {label}
          </h2>
        </div>
        <div className="md:col-span-7 md:max-w-[520px]">
          <div className="text-[15px] leading-[1.65] text-white/55">{body}</div>
        </div>
      </div>
      {children && <div className="mt-20">{children}</div>}
    </section>
  );
}

export default function BrandPage() {
  return (
    <main className="min-h-screen bg-[#07140F] text-white antialiased">
      {/* This page shipped without any nav — no links and no hamburger on any
          viewport. SiteNav (dark, the default) carries its own mobile drawer. */}
      <SiteNav />

      <div className="mx-auto max-w-[1280px] px-8 pb-32 pt-24">
        {/* ─── HERO ─── */}
        <header className="relative grid gap-12 pb-[180px] pt-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h1 className="text-[48px] font-semibold leading-[1.05] tracking-[-0.02em] text-white md:text-[64px]">
              Narrations Brand
              <br />
              <span className="text-white/35">Assets &amp; guidelines</span>
            </h1>
          </div>
          <div className="md:col-span-5">
            <p className="max-w-[380px] text-[15px] leading-[1.65] text-white/55">
              The kit includes the wordmark lockup, the mark, color tokens,
              and typography specs: everything needed to render Narrations
              correctly on any surface.
            </p>
          </div>
        </header>

      </div>

      {/* ─── GIANT OUTLINED WATERMARK (N = Interlock mark) — full-bleed ─── */}
      {/* The 96px clamp floor used to win under ~686px wide (14vw = 55px at
          390px), so the nowrap mark measured ~480px in a ~358px box and read as
          a clipped "arration". Dropping the floor lets 14vw drive on phones and
          tablets; above ~686px the 14vw/200px behaviour is unchanged. */}
      <div
        aria-hidden
        className="pointer-events-none flex w-full select-none items-center justify-center overflow-hidden whitespace-nowrap px-4"
        style={{ fontSize: "clamp(34px, 14vw, 200px)" }}
      >
        <svg
          viewBox="26 26 68 68"
          style={{ height: "0.72em", width: "0.72em", flexShrink: 0, marginRight: "0.02em" }}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.6"
          strokeLinejoin="miter"
        >
          <polygon points="26,26 70,26 70,40 40,40 40,94 26,94" />
          <polygon points="94,94 50,94 50,80 80,80 80,26 94,26" />
          <line x1="44" y1="44" x2="76" y2="76" />
        </svg>
        <span
          className="font-semibold leading-none tracking-[-0.04em] text-transparent"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}
        >
          arrations
        </span>
      </div>

      <div className="mx-auto max-w-[1280px] px-8 pb-32">

        {/* ─── NAMING ─── */}
        <Section
          label="Naming"
          body={
            <>
              <p>
                Narrations is always written as a single word with a capital N.
                It represents both the company and the platform.
              </p>
              <p className="mt-5">
                The six products (Content, Marketing, Operations, Finance,
                Intelligence, Communication) are written as proper nouns. In
                UI, the capital N inside each product name is replaced by the
                Narrations mark, sized to cap-height, e.g.{" "}
                <span className="text-white">
                  <ProductName name="Content" pre="Conte" post="t" tone="dark" />
                </span>
                ,{" "}
                <span className="text-white">
                  <ProductName name="Marketing" pre="Marketi" post="g" tone="dark" />
                </span>
                . Display use only, never in body copy.
              </p>
            </>
          }
        />

        {/* ─── WORDMARK ─── */}
        <Section
          label="Wordmark"
          body={
            <>
              <p>
                The Narrations wordmark is our primary logo and should be used
                in most cases. It pairs the Interlock N-mark with the wordmark
                set in Satoshi 600 at a fixed 4.5 : 1 aspect.
              </p>
              <p className="mt-5">
                Use the off-white wordmark on dark surfaces and the ink
                wordmark on light. Keep it legible, with clear space on every
                side.
              </p>
            </>
          }
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex aspect-[3/2] items-center justify-center rounded-[20px] bg-[#07140F]">
              <NarrationsLogo height={56} tone="dark" />
            </div>
            <div className="flex aspect-[3/2] items-center justify-center rounded-[20px] bg-white">
              <NarrationsLogo height={56} tone="light" />
            </div>
          </div>
        </Section>

        {/* ─── SYMBOL ─── */}
        <Section
          label="Symbol"
          body={
            <>
              <p>
                The Narrations symbol, Interlock, is a simplified mark for
                contexts where the full wordmark won&apos;t fit. App icons,
                social avatars, favicons, dashboard chips, browser tabs.
              </p>
              <p className="mt-5">
                Use the official symbol without alteration, with enough clear
                space to stay legible in any context.
              </p>
            </>
          }
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex aspect-[3/2] items-center justify-center rounded-[20px] bg-[#07140F]">
              <NMark size={120} tone="dark" />
            </div>
            <div className="flex aspect-[3/2] items-center justify-center rounded-[20px] bg-white">
              <NMark size={120} tone="light" />
            </div>
          </div>
        </Section>

        {/* ─── COLORS ─── */}
        <Section
          label="Colors"
          body={
            <>
              <p>
                Narrations runs on Ink + Evergreen. One brand green as a
                signal, deep evergreen darks and cool neutrals, designed to
                stay restrained across every surface.
              </p>
              <p className="mt-5">
                Brand Green marks interaction: buttons, links, active states,
                focus rings. Neutrals handle everything else. The restraint
                is what keeps it recognizable.
              </p>
            </>
          }
        >
          <div className="grid gap-3 md:grid-cols-3">
            {COLORS.map((c) => (
              <Swatch key={c.hex} color={c} />
            ))}
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {SUPPORTING.map((c) => (
              <Swatch key={c.hex} color={c} />
            ))}
          </div>
        </Section>

        {/* ─── TYPOGRAPHY ─── */}
        <Section
          label="Typography"
          body={
            <>
              <p>
                Satoshi, only. Variable weight 300 to 900, self-hosted.
                Hierarchy comes from weight and size, never from adding a new
                typeface.
              </p>
              <p className="mt-5">
                Headlines run tight (-0.022em tracking) at 600 weight. Body
                relaxes to 1.6 leading at 400 weight. The eyebrow is the only
                uppercase setting.
              </p>
            </>
          }
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-[20px] border border-white/10 p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Headlines
              </p>
              {/* 88px at every viewport punched through the card border and
                  pushed the document to 471px wide in a 390px window (card
                  inner width is only ~246px there). Steps back up to 88px at lg. */}
              <p
                className="text-[40px] font-semibold leading-[0.95] tracking-[-0.03em] text-white sm:text-[56px] lg:text-[88px]"
                style={{ marginTop: "auto" }}
              >
                Satoshi
                <br />
                Semibold
              </p>
              <p className="mt-8 text-[14px] leading-[1.6] text-white/55">
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu
                Vv Ww Xx Yy Zz · 1234567890
              </p>
            </div>
            <div className="flex flex-col justify-between rounded-[20px] border border-white/10 p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Body &amp; UI
              </p>
              {/* Same overflow as the Headlines specimen above. */}
              <p
                className="text-[40px] font-normal leading-[0.95] tracking-[-0.02em] text-white sm:text-[56px] lg:text-[88px]"
                style={{ marginTop: "auto" }}
              >
                Satoshi
                <br />
                Regular
              </p>
              <p className="mt-8 text-[14px] leading-[1.6] text-white/55">
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu
                Vv Ww Xx Yy Zz · 1234567890
              </p>
            </div>
          </div>
        </Section>

        {/* ─── DOWNLOADS ─── */}
        <Section
          label="Downloads"
          body={
            <>
              <p>
                SVGs for every surface. Full lockup for first-introduction
                contexts; the mark alone where the brand name is already
                present.
              </p>
              <p className="mt-5">
                All assets are vector. Render at any size; never rasterize and
                upscale.
              </p>
            </>
          }
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
            Full lockup
          </p>
          <div className="mb-12 grid gap-3 md:grid-cols-2">
            {LOGO_FILES.map((f) => (
              <a
                key={f.file}
                href={`/brand/${f.file}`}
                download
                className={`group flex aspect-[3/2] flex-col justify-between rounded-[20px] p-6 transition ${
                  f.dark
                    ? "bg-[#07140F] border border-white/10 hover:border-white/25"
                    : "bg-white hover:bg-white/95"
                }`}
              >
                <span
                  className={`self-end text-[12px] font-medium opacity-0 transition group-hover:opacity-100 ${
                    f.dark ? "text-white/55" : "text-[#0E1311]/55"
                  }`}
                >
                  ↓ Download SVG
                </span>
                <div className="flex flex-1 items-center justify-center">
                  <NarrationsLogo height={48} tone={f.dark ? "dark" : "light"} />
                </div>
              </a>
            ))}
          </div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
            Symbol
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {MARK_FILES.map((f) => (
              <a
                key={f.file}
                href={`/brand/${f.file}`}
                download
                className={`group flex aspect-[3/2] items-center justify-center rounded-[20px] transition ${
                  f.dark
                    ? "bg-[#07140F] border border-white/10 hover:border-white/25"
                    : "bg-white hover:bg-white/95"
                }`}
              >
                <NMark size={120} tone={f.dark ? "dark" : "light"} />
              </a>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
