import NMark from "@/components/NMark";

// Inline product name with the Narrations brand mark in place of the accent
// "N" — e.g. `Marketi[mark]g`. Single source of truth for how product names
// render across the site (cards, heroes, dashboard chips, nav).
//
// Tuning: NMark's visible art fills ~57% of its viewBox, so the SVG must be
// sized to ~1.27× the font size for the mark to read at cap-height. Bearings
// and nudge then pull it back to baseline.
//
// The plain `name` prop is exposed to screen readers via aria-label on the
// outer element; the mark span is aria-hidden.

type ProductNameProps = {
  /** Plain product name — screen readers + aria-label source. */
  name: string;
  /** Text before the mark. */
  pre: string;
  /** Text after the mark. */
  post: string;
  /** Pixel font-size; mark is sized relative to it. */
  px?: number;
  /** SVG size as a multiple of font-size. 1.27 ≈ visible mark at cap-height. */
  scale?: number;
  /** Optical side-bearings in em (negative pulls in against SVG padding). */
  bearing?: number;
  /** Vertical offset in em — how far the SVG bottom sits below the baseline. */
  nudge?: number;
  tone?: "light" | "dark";
  weight?: number;
  className?: string;
};

export default function ProductName({
  name,
  pre,
  post,
  px,
  scale = 1.27,
  bearing = -0.22,
  nudge = 0.27,
  tone = "light",
  weight,
  className,
}: ProductNameProps) {
  // Inline styles drive sizing — passing className through lets callers keep
  // their existing type classes (text-lg, font-semibold) when no px override.
  const useInline = px !== undefined;
  const markPx = px !== undefined ? Math.round(px * scale) : undefined;
  const inlineMarkSize = `calc(1em * ${scale})`;

  return (
    <span aria-label={name} className={className}>
      <span
        aria-hidden="true"
        style={
          useInline
            ? {
                fontSize: px,
                fontWeight: weight,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                display: "inline-flex",
                alignItems: "baseline",
              }
            : { display: "inline-flex", alignItems: "baseline" }
        }
      >
        {pre}
        <span
          style={{
            display: "inline-block",
            width: useInline
              ? `calc(${markPx}px + ${bearing * 2}em)`
              : `calc(${inlineMarkSize} + ${bearing * 2}em)`,
            height: 0,
            position: "relative",
            verticalAlign: "baseline",
          }}
        >
          <NMark
            tone={tone}
            size={markPx ?? 16}
            style={{
              position: "absolute",
              left: `${bearing}em`,
              bottom: `${-nudge}em`,
              width: useInline ? undefined : inlineMarkSize,
              height: useInline ? undefined : inlineMarkSize,
            }}
          />
        </span>
        {post}
      </span>
    </span>
  );
}
