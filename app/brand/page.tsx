import type { Metadata } from "next";
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

const COLORS = [
  { name: "Evergreen", hex: "#07140F", rgb: "7, 20, 15", swatch: "#07140F", textOnDark: true },
  { name: "Brand Green", hex: "#1F6B4C", rgb: "31, 107, 76", swatch: "#1F6B4C", textOnDark: true },
  { name: "Off-white", hex: "#F3F5F0", rgb: "243, 245, 240", swatch: "#F3F5F0", textOnDark: false },
];

const SUPPORTING = [
  { name: "Panel", hex: "#0F2A20", rgb: "15, 42, 32", swatch: "#0F2A20", textOnDark: true },
  { name: "Green 400", hex: "#2E8B63", rgb: "46, 139, 99", swatch: "#2E8B63", textOnDark: true },
  { name: "Surface", hex: "#FAFAF8", rgb: "250, 250, 248", swatch: "#FAFAF8", textOnDark: false },
];

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
      <div
        aria-hidden
        className="pointer-events-none flex w-full select-none items-center justify-center overflow-hidden whitespace-nowrap px-4"
        style={{ fontSize: "clamp(96px, 14vw, 200px)" }}
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
              <div
                key={c.hex}
                className="relative flex aspect-[3/2] flex-col justify-end rounded-[20px] p-6"
                style={{ background: c.swatch }}
              >
                <p
                  className={`text-[14px] font-semibold ${c.textOnDark ? "text-white" : "text-[#0E1311]"}`}
                >
                  {c.name}
                </p>
                <p
                  className={`mt-1 font-mono text-[11.5px] ${c.textOnDark ? "text-white/60" : "text-black/55"}`}
                >
                  RGB: {c.rgb}
                </p>
                <p
                  className={`font-mono text-[11.5px] ${c.textOnDark ? "text-white/60" : "text-black/55"}`}
                >
                  {c.hex}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {SUPPORTING.map((c) => (
              <div
                key={c.hex}
                className="relative flex aspect-[3/2] flex-col justify-end rounded-[20px] p-6"
                style={{ background: c.swatch }}
              >
                <p
                  className={`text-[14px] font-semibold ${c.textOnDark ? "text-white" : "text-[#0E1311]"}`}
                >
                  {c.name}
                </p>
                <p
                  className={`mt-1 font-mono text-[11.5px] ${c.textOnDark ? "text-white/60" : "text-black/55"}`}
                >
                  RGB: {c.rgb}
                </p>
                <p
                  className={`font-mono text-[11.5px] ${c.textOnDark ? "text-white/60" : "text-black/55"}`}
                >
                  {c.hex}
                </p>
              </div>
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
              <p
                className="text-[88px] font-semibold leading-[0.95] tracking-[-0.03em] text-white"
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
              <p
                className="text-[88px] font-normal leading-[0.95] tracking-[-0.02em] text-white"
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
