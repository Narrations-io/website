// /solutions — the deck's problem framing (§3–§4) as a before/after table.
// Dark band; the one dark section on an otherwise light page, so the contrast
// carries the weight of the argument.
//
// Two columns at `sm`+, stacked pairs below it — on a phone the rows read as
// "today → with Narrations" one after another rather than as a table nobody can
// scan sideways.

type Row = { before: string; after: string };

const BEFORE_LABEL = "Today";
const AFTER_LABEL = "Narrations";

const ROWS: Row[] = [
  {
    before: "A dozen tools hold what you published. None hold why.",
    after: "One place holds what you approved, and who approved it.",
  },
  {
    before: "Every new draft starts with someone re-explaining the company.",
    after: "Every new draft starts from the approved claims and terms.",
  },
  {
    before: "The rules live in people who forget, move on and leave.",
    after: "The rules are written down and stay when people go.",
  },
  {
    before: "A correction fixes one draft, then gets made again next week.",
    after: "A correction becomes a rule, so it isn't made twice.",
  },
];

export default function ContrastTable() {
  return (
    <section className="relative overflow-hidden bg-dbg text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgba(31,107,76,0.16),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden />
            The problem it fixes
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white md:text-[2.5rem]">
            The one record your company doesn&rsquo;t keep.
          </h2>
          <p className="mt-4 text-base leading-7 text-[--d-text-mid]">
            Sales logs every deal in a CRM. Engineers keep every change in Git.
            What your company has decided to say lives in people&rsquo;s heads
            and a dozen tools, so every draft starts with someone re-explaining
            it.
          </p>
        </div>

        {/* Column headers — `sm`+ only. Stacked below it each pair carries its
            own inline labels instead, so the meaning survives without a header
            row scrolling off the top. */}
        <div className="mt-14 hidden gap-6 sm:grid sm:grid-cols-2">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40">
            {BEFORE_LABEL}
          </p>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-green-400">
            {AFTER_LABEL}
          </p>
        </div>

        <ul className="mt-4 flex flex-col gap-4 max-sm:mt-10 sm:gap-0 sm:divide-y sm:divide-[--d-border] sm:border-y sm:border-[--d-border]">
          {ROWS.map((row) => (
            <li
              key={row.before}
              className="grid gap-3 rounded-[16px] border border-[--d-border] bg-dpanel p-5 sm:grid-cols-2 sm:gap-6 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:py-6"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40 sm:hidden">
                  {BEFORE_LABEL}
                </p>
                <p className="mt-1 text-[15px] leading-6 text-[--d-text-mid] sm:mt-0">
                  {row.before}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-green-400 sm:hidden">
                  {AFTER_LABEL}
                </p>
                <p className="mt-1 text-[15px] leading-6 text-white sm:mt-0">
                  {row.after}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
