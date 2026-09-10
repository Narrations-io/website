// Delivery stages — Seed → Review → Train → Hand over (deck §10). The sequence
// is the forward-deployed operator's, and it ends with the client owning the
// record, which is the point of the whole engagement.

type Stage = { label: string; body: string };

const STAGES: Stage[] = [
  {
    label: "Seed",
    body: "The operator sits with your team and writes down what you've already decided: positioning, claims, terms, pricing. Nothing starts empty.",
  },
  {
    label: "Review",
    body: "Risky drafts go past the operator before they ship. Each approval or correction becomes a rule, so the checks sharpen as the work goes on.",
  },
  {
    label: "Train",
    body: "Your people learn to run each part, set permissions and read the log. The operator reviews less each week as your team takes over.",
  },
  {
    label: "Hand over",
    body: "Your team runs the deployment and owns every rule and its history. Keep an operator on retainer or don't; either way, it's yours.",
  },
];

export default function EnterpriseStages() {
  return (
    <section className="relative overflow-hidden bg-dpanel text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_80%_50%,rgba(31,107,76,0.12),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 max-sm:pb-12 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden />
            How it's delivered
          </p>
          <h2 className="mx-auto mt-3 max-w-none text-3xl font-bold leading-tight tracking-tight text-white md:whitespace-nowrap md:text-[2.25rem]">
            Built with you, then handed over.
          </h2>
          <p className="mt-4 text-base leading-7 text-[--d-text-mid]">
            An operator runs the deployment from the first rule to the
            handover. By the end, your team owns the rules and the record and
            runs it without us.
          </p>
        </div>

        {/* On phones (< sm) each stage is number-left / content-right and
            flushed left — the centered single column read badly. At sm+ the
            original centered layout returns (2-up / 4-up grid), untouched. */}
        <ol className="mt-14 grid gap-8 max-sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map(({ label, body }, i) => (
            <li
              key={label}
              className="flex flex-row items-start gap-4 text-left sm:flex-col sm:items-center sm:gap-0 sm:text-center"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-400 bg-green-400/10 text-xs font-semibold text-green-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Groups label+body beside the number on mobile; display:contents
                  at sm+ dissolves it so the centered column is byte-identical. */}
              <div className="sm:contents">
                <h3 className="text-sm font-semibold text-white sm:mt-4">
                  {label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[--d-text-mid]">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
