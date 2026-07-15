// Shared numbered marker — CLAUDE.md §5 component contract.
// light (default): green-500 circle, white numeral — used on light sections.
// dark: white circle, green-900 (d-bg) numeral — used on dark/evergreen sections.

type Props = {
  n: string;
  variant?: "light" | "dark";
};

export default function NumberedMarker({ n, variant = "light" }: Props) {
  // relative z-10 keeps the circle above any connector spine drawn behind the
  // list (e.g. PlatformSection's .items::before) — matches the original
  // item__num stacking that this component replaced.
  if (variant === "dark") {
    return (
      <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-semibold text-green-900">
        {n}
      </span>
    );
  }
  return (
    <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-sm font-semibold text-white">
      {n}
    </span>
  );
}
