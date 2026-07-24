import NumberedMarker from "@/components/ui/NumberedMarker";

export const ENGAGEMENT_MODES = [
  {
    n: "01",
    title: "Narrations platform (SaaS)",
    text: "Run the six products yourself, self-serve, at your own pace.",
    short: "Run the six products yourself.",
    href: undefined as string | undefined,
  },
  {
    n: "02",
    title: "Enterprise AI",
    text: "Custom AI dashboards for your verticals, inside your own infrastructure.",
    short: "Custom AI inside your infrastructure.",
    href: "/enterprise",
  },
  {
    n: "03",
    title: "Forward-deployed operators",
    text: "Our experts embed inside your team and environment, set up each vertical, and run it with you, then train your team to run it alone.",
    short: "Experts embed, run it with you, then hand it over.",
    href: undefined as string | undefined,
  },
];

type Variant = "grid" | "stack";

export default function EngagementCards({
  variant = "grid",
}: {
  variant?: Variant;
}) {
  // Vertical stack — compact one-line rows that fill the column height with calm
  // even spacing (homepage combined band). Reuses the same card tokens.
  if (variant === "stack") {
    return (
      <div className="flex flex-col gap-6 lg:h-full lg:justify-between">
        {ENGAGEMENT_MODES.map(({ n, title, short, href }) => {
          const inner = (
            <div className="flex items-center gap-5">
              <NumberedMarker n={n} />
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold text-ink-900">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-ink-700">{short}</p>
              </div>
            </div>
          );
          const cls = `group block rounded-[20px] border border-line bg-paper px-6 py-5 shadow-card transition-all duration-300${
            href
              ? " hover:-translate-y-0.5 hover:border-green-200 hover:shadow-pop"
              : ""
          }`;
          return href ? (
            <a key={n} href={href} className={cls}>
              {inner}
            </a>
          ) : (
            <div key={n} className={cls}>
              {inner}
            </div>
          );
        })}
      </div>
    );
  }

  // Grid — the original 3-across cards (product pages + elsewhere).
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {ENGAGEMENT_MODES.map(({ n, title, text, href }) => {
        const inner = (
          <>
            <NumberedMarker n={n} />
            <h3 className="mt-5 text-[15px] font-semibold text-ink-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-700">{text}</p>
          </>
        );
        const cls = `rounded-[20px] border border-black/5 bg-paper p-6 shadow-card${href ? " transition-shadow hover:shadow-pop" : ""}`;
        return href ? (
          <a key={n} href={href} className={cls}>
            {inner}
          </a>
        ) : (
          <div key={n} className={cls}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
