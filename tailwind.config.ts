import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // "Ink + Evergreen": Satoshi is the site's single typeface (§2).
        sans: ["var(--font-satoshi)", "Inter", "system-ui", "sans-serif"],
      },
      // "Ink + Evergreen" tokens (brand guidelines §1.9). The old flat
      // ink/bone/moss tokens were unused and are superseded by these ramps.
      colors: {
        green: {
          50: "#EAF3EE",
          200: "#BFD8CC",
          300: "#5E9E80",
          400: "#2E8B63",
          500: "#1F6B4C",
          600: "#1A5A40",
          700: "#14342B",
          800: "#0F2A20",
          900: "#07140F",
        },
        ink: { 900: "#0E1311", 700: "#2A302D", 500: "#5B635F", 300: "#9AA09C" },
        line: "#E2E6E2",
        surface: "#FAFAF8",
        paper: "#FFFFFF",
        sunken: "#F2F4F2",
        // Dark-section family — token values reference the §1.8 CSS vars so the
        // four dark sections share one source of truth (Step 3 unification).
        dbg: "var(--d-bg)",
        dpanel: "var(--d-panel)",
        dpanel2: "var(--d-panel-2)",
        dborder: "var(--d-border)",
        dtext: {
          hi: "var(--d-text-hi)",
          mid: "var(--d-text-mid)",
          low: "var(--d-text-low)",
        },
        success: "#3FB07D",
        warning: "#C8862F",
        danger: "#C0563E",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      // Elevation + radius scales (§4/§5). Custom names only — Tailwind's
      // default rounded-sm/lg/xl etc. are left intact to avoid regressions.
      borderRadius: {
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(14,19,17,.06), 0 8px 24px -12px rgba(14,19,17,.16)",
        pop: "0 24px 60px -24px rgba(7,20,15,.45)",
        "glow-brand": "0 0 80px -24px rgba(31,107,76,.35)",
      },
    },
  },
  plugins: [],
};

export default config;
