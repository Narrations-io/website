// Example Enterprise AI dashboard modules, expanded with a line each
// (Master KB §3.2). Illustrative examples, not a fixed set: a build is
// shaped around the client's own verticals.

type Module = { title: string; body: string };

const MODULES: Module[] = [
  {
    title: "Content & editorial",
    body: "Long-form, web and creative in your brand voice, with editorial review.",
  },
  {
    title: "Marketing & distribution",
    body: "Campaigns, SEO and GEO, social and lifecycle, run from your own dashboard.",
  },
  {
    title: "Investor materials & dataroom",
    body: "Whitepapers, decks and an access-controlled dataroom for investor diligence.",
  },
  {
    title: "Market intelligence & diligence",
    body: "Narrative detection, competitor profiles and decision-ready research on your markets.",
  },
  {
    title: "Operations & workflow",
    body: "Support, SOPs and internal coordination, with approvals built in.",
  },
  {
    title: "Compliance & comms",
    body: "Policy, disclosure and people-facing comms routed through approval gates.",
  },
];

export default function EnterpriseModules() {
  return (
    <section className="bg-dbg text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden />
            Example dashboards
          </p>
          <h2 className="mx-auto mt-3 max-w-none text-3xl font-bold leading-tight tracking-tight text-white md:whitespace-nowrap md:text-[2.25rem]">
            A dedicated dashboard for every vertical.
          </h2>
          <p className="mt-4 text-base leading-7 text-[--d-text-mid]">
            We build a dashboard for each function that matters to your business.
            These are examples, not a fixed set.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map(({ title, body }) => (
            <li
              key={title}
              className="rounded-[16px] border border-[--d-border] bg-dpanel p-5"
            >
              <h3 className="text-[15px] font-semibold text-[--d-text-hi]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[--d-text-mid]">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
