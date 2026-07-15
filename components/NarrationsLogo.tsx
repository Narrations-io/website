import type { CSSProperties } from "react";

// Narrations full logo lockup — the Interlock N-mark + "arrations" wordmark
// drawn together in a single SVG so kerning stays consistent everywhere it's
// used (nav, footer, OG images, partner sites, decks). The leading N of
// "Narrations" is replaced by the mark, by intent.
//
// SINGLE SOURCE OF TRUTH for the wordmark lockup. For the mark-only variant
// (favicon, dashboard chips, etc.), use components/NMark.tsx.
//
// Sibling static SVGs in public/brand/ are hand-kept in sync with the
// geometry below — update both when changing the wordmark.

type Tone = "light" | "dark";

type NarrationsLogoProps = {
  /** Height of the rendered logo in pixels. Width scales proportionally. */
  height?: number;
  /** Surface the logo sits on. */
  tone?: Tone;
  /** Render in one color (drop the green seam accent). */
  monochrome?: boolean;
  className?: string;
  style?: CSSProperties;
};

const LIGHT_INK = "#0E1311";
const DARK_INK = "#F3F5F0";
const LIGHT_BG = "#FAFAF8";
const DARK_BG = "#07140F";
const ACCENT_LIGHT = "#1F6B4C";
const ACCENT_DARK = "#2E8B63";

// Geometry: mark occupies x=0..120, text starts at x=124 and runs to x≈540.
// Total viewBox is 0 0 540 120, native aspect ratio 4.5:1.
const VB_W = 540;
const VB_H = 120;

export default function NarrationsLogo({
  height = 32,
  tone = "light",
  monochrome = false,
  className,
  style,
}: NarrationsLogoProps) {
  const isDark = tone === "dark";
  const ink = isDark ? DARK_INK : LIGHT_INK;
  const bg = isDark ? DARK_BG : LIGHT_BG;
  const accent = monochrome ? ink : isDark ? ACCENT_DARK : ACCENT_LIGHT;

  return (
    <svg
      role="img"
      aria-label="Narrations"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      height={height}
      width={(height * VB_W) / VB_H}
      className={className}
      style={style}
    >
      <title>Narrations</title>
      <defs>
        <clipPath id="nlogo-clipL"><polygon points="26,26 70,26 70,40 40,40 40,94 26,94" /></clipPath>
        <clipPath id="nlogo-clipR"><polygon points="94,94 50,94 50,80 80,80 80,26 94,26" /></clipPath>
      </defs>

      {/* Interlock mark */}
      <g>
        <polygon points="26,26 70,26 70,40 40,40 40,94 26,94" fill={accent} />
        <polygon points="94,94 50,94 50,80 80,80 80,26 94,26" fill={accent} />
        {!monochrome && (
          <>
            <polygon points="26,26 70,26 70,40 40,40" fill={ink} />
            <polygon points="50,80 80,80 94,94 50,94" fill={ink} />
          </>
        )}
        <rect x="23" y="31" width="20" height="4" fill={bg} transform="rotate(45 33 33)" clipPath="url(#nlogo-clipL)" />
        <rect x="77" y="85" width="20" height="4" fill={bg} transform="rotate(45 87 87)" clipPath="url(#nlogo-clipR)" />
        <line x1="44" y1="44" x2="76" y2="76" stroke={accent} strokeWidth="4" />
      </g>

      {/* Wordmark — "arrations" */}
      <text
        x="108"
        y="86"
        fill={ink}
        fontFamily="Satoshi, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight={600}
        fontSize={84}
        letterSpacing="-1.2"
      >
        arrations
      </text>
    </svg>
  );
}
