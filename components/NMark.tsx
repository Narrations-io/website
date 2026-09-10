import type { CSSProperties } from "react";

// Narrations N-mark — "Interlock": two mirrored L-shapes that lock into a
// forward N. The diagonal seam between them carries the accent green and is
// the figure-ground reveal. At first glance: two columns; on second look:
// the N emerges from the gap. Used in SiteNav, Hero nav, Footer, dashboard
// chips, favicon.
//
// SINGLE SOURCE OF TRUTH for the brand mark. Edit the SVG body below to
// change the design everywhere on the site. The favicon files
// (app/icon.svg, app/apple-icon.svg) are standalone SVGs and must be
// updated separately to match.
//
// Past explorations live in archive/logo-studies/ (15 deduped marks, both
// preview pages, source draft).

type NMarkProps = {
  /** Pixel size of the square mark. */
  size?: number;
  /** "dark" = mark sits on dark surfaces (ink stays dark, cut-through is dark too). */
  tone?: "light" | "dark";
  /** Hide the green accent dot — true at small sizes / one-colour contexts. */
  monochrome?: boolean;
  /** Override the ink (block) color — defaults from tone. */
  ink?: string;
  /** Override the cut-through (counter-form) color — defaults from tone. */
  bg?: string;
  /** Override the accent dot color — defaults from tone. */
  accent?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
};

const LIGHT_INK = "#0E1311";
const DARK_INK = "#F3F5F0";
const LIGHT_BG = "#FAFAF8";
const DARK_BG = "#07140F";
const ACCENT_LIGHT = "#1F6B4C";
const ACCENT_DARK = "#2E8B63";

export default function NMark({
  size = 32,
  tone = "light",
  monochrome = false,
  ink,
  bg,
  accent,
  className,
  style,
  title = "Narrations",
}: NMarkProps) {
  const isDark = tone === "dark";
  const resolvedInk = ink ?? (isDark ? DARK_INK : LIGHT_INK);
  const resolvedBg = bg ?? (isDark ? DARK_BG : LIGHT_BG);
  const resolvedAccent = monochrome
    ? resolvedInk
    : accent ?? (isDark ? ACCENT_DARK : ACCENT_LIGHT);

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
      style={style}
    >
      <title>{title}</title>
      <defs>
        <clipPath id="nmark-clipL">
          <polygon points="26,26 70,26 70,40 40,40 40,94 26,94" />
        </clipPath>
        <clipPath id="nmark-clipR">
          <polygon points="94,94 50,94 50,80 80,80 80,26 94,26" />
        </clipPath>
      </defs>
      {/* Left L: vertical stem + top arm — carries the brand green */}
      <polygon
        points="26,26 70,26 70,40 40,40 40,94 26,94"
        fill={resolvedAccent}
      />
      {/* Right L (rotated 180): vertical stem + bottom arm — brand green */}
      <polygon
        points="94,94 50,94 50,80 80,80 80,26 94,26"
        fill={resolvedAccent}
      />
      {/* Ink half-arm: horizontal side of each L, past the diagonal cut */}
      {!monochrome && (
        <>
          <polygon points="26,26 70,26 70,40 40,40" fill={resolvedInk} />
          <polygon points="50,80 80,80 94,94 50,94" fill={resolvedInk} />
        </>
      )}
      {/* Diagonal seam-pierce notches — clipped to L so they end cleanly at the inner corner */}
      <rect x="23" y="31" width="20" height="4" fill={resolvedBg} transform="rotate(45 33 33)" clipPath="url(#nmark-clipL)" />
      <rect x="77" y="85" width="20" height="4" fill={resolvedBg} transform="rotate(45 87 87)" clipPath="url(#nmark-clipR)" />
      {/* Forward-N diagonal seam — floats with a 4u gap to each L corner */}
      <line
        x1="44"
        y1="44"
        x2="76"
        y2="76"
        stroke={resolvedAccent}
        strokeWidth="4"
      />
    </svg>
  );
}
