// Automation stages — Scope → Build → Automate → Scale (Master KB §3.2). Reuses
// the homepage EnterpriseAISection stage-track styling, expanded with a line per
// stage. Delivered as an ongoing program, not a one-off build.

type Stage = { label: string; body: string };

const STAGES: Stage[] = [
  {
    label: "Scope",
    body: "We identify the verticals and processes where automation will deliver the most value.",
  },
  {
    label: "Build",
    body: "We build a dedicated AI dashboard for each, trained on your knowledge and tuned to your workflows.",
  },
  {
    label: "Automate",
    body: "We automate more of the work over successive stages, with approvals and governance.",
  },
  {
    label: "Scale",
    body: "Your team is freed from repetitive work as the system keeps expanding what it handles.",
  },
];

export default function EnterpriseStages() {
  return (
    <section className="relative overflow-hidden bg-dpanel text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_80%_50%,rgba(31,107,76,0.12),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden />
            How it's delivered
          </p>
          <h2 className="mx-auto mt-3 max-w-none text-3xl font-bold leading-tight tracking-tight text-white md:whitespace-nowrap md:text-[2.25rem]">
            An ongoing program, not a one-off build.
          </h2>
          <p className="mt-4 text-base leading-7 text-[--d-text-mid]">
            We work through successive automation stages, taking on more of
            your operation as the system proves itself.
          </p>
        </div>

        <ol className="mt-14 grid gap-8 md:grid-cols-4">
          {STAGES.map(({ label, body }, i) => (
            <li key={label} className="flex flex-col items-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-green-400 bg-green-400/10 text-xs font-semibold text-green-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-sm font-semibold text-white">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-[--d-text-mid]">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
