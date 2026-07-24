// Enterprise AI — "Nothing reaches your live systems without approval" (human
// oversight node diagram). Sits on /enterprise; adapted from a reference mock
// into the Ink + Evergreen tokens (no raw hex, single typeface, single green).
//
// Flow: Agent -> FDO tests -> Version B / Version A -> 80% / 72% success rate
// -> FDO ships B. The losing variant dead-ends; it isn't sent back.
//
// The subhead carries the full term "forward-deployed operator (FDO)" and is
// the first FDO mention on /enterprise, so the diagram's "FDO tests" and
// "FDO ships B" labels are free to use the short form (CLAUDE.md §2). Keep
// that order if either the copy or the diagram moves.

const W = 1000;
const H = 420;

// Single source for every node label. The wide canvas (>= sm) and the phone
// flow (< sm) are two different geometries of the SAME sequence, so they read
// from this rather than repeating strings — otherwise a copy edit lands on one
// layout and silently not the other.
const FLOW = {
  origin: "Agent",
  gate: "FDO tests",
  branches: ["Version B", "Version A"] as const,
  outcomes: ["80%", "72%"] as const,
  result: "FDO ships B",
};

const STROKE = "rgba(14,19,17,0.14)";

function elbow(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

export default function EnterpriseExperimentSection() {
  const originX = 90;
  const originY = H / 2;
  const abX = 330;
  const abY = H / 2;
  const versionX = 560;
  const versionYs = [110, 310]; // B, A
  const circleX = 780;
  const resultX = 940;
  const R = 40; // success-rate circle radius

  return (
    <section className="bg-green-50 text-ink-900">
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" aria-hidden />
            Human oversight
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.5rem]">
            Nothing reaches your live systems without approval.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-500">
            Every change is prepared and tested in a safe environment, then
            routed through your governance gates. Each one is reviewed by a
            forward-deployed operator (FDO) before it ships.
          </p>
        </div>

        {/* Wide canvas — `sm`+ only. On a phone it was 820px in a 342px window
            (42% visible, 478px hidden), and the flow reads left-to-right, so the
            outcome sat off-screen. Narrower viewports get the vertical flow.

            The switch is at `lg`, not `sm`: the canvas has an 820px min-width
            and the container is `viewport - 48px` of gutter, so anything under
            ~868px still scrolled sideways (measured 114px at 768px, with the
            winner pill hard against the 80% circle). Lowering the min-width
            instead doesn't work — the nodes are fixed-px, so at ~700px the
            circle and the pill collide. `lg` also matches the 1024px
            convention the Technology section already uses. */}
        <div className="relative mt-14 hidden w-full overflow-x-auto lg:block">
          <div
            className="relative min-w-[820px] rounded-[24px] border border-line bg-paper shadow-card"
            style={{ aspectRatio: `${W} / ${H}` }}
          >
            <div
              aria-hidden
              className="absolute -left-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-green-200/50 blur-3xl"
            />

            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              {/* origin -> A/B Test */}
              <path
                d={`M${originX + 56},${originY} L${abX - 60},${abY}`}
                stroke="rgba(14,19,17,0.14)"
                strokeWidth={2}
                fill="none"
              />
              {/* A/B Test -> Version B / Version A */}
              {versionYs.map((y, i) => (
                <path
                  key={`ab-${i}`}
                  d={elbow(abX + 60, abY, versionX - 60, y)}
                  stroke="rgba(14,19,17,0.14)"
                  strokeWidth={2}
                  fill="none"
                />
              ))}
              {/* branch -> outcome circle */}
              {versionYs.map((y, i) => (
                <path
                  key={`vc-${i}`}
                  d={`M${versionX + 60},${y} L${circleX - R},${y}`}
                  stroke="rgba(14,19,17,0.14)"
                  strokeWidth={2}
                  fill="none"
                />
              ))}
              {/* winning circle -> result pill */}
              <path
                d={elbow(circleX + R, versionYs[0], resultX - 56, H / 2)}
                stroke={STROKE}
                strokeWidth={2}
                fill="none"
              />
            </svg>

            {/* Origin — the change being proposed */}
            <div
              className="absolute flex h-28 w-28 -translate-y-1/2 items-center justify-center rounded-full border border-dashed border-green-500/50 text-center"
              style={{ left: `${(originX / W) * 100}%`, top: `${(originY / H) * 100}%` }}
            >
              <span className="px-3 text-sm font-semibold leading-tight text-ink-900">
                {FLOW.origin}
              </span>
            </div>

            {/* FDO review node — the gate everything passes through */}
            <div
              className="absolute w-[130px] -translate-x-1/2 -translate-y-1/2 rounded-[12px] border border-line bg-sunken px-4 py-3 text-center shadow-card"
              style={{ left: `${(abX / W) * 100}%`, top: `${(abY / H) * 100}%` }}
            >
              <p className="text-xs font-semibold text-ink-900">{FLOW.gate}</p>
            </div>

            {/* Branch nodes — the two ways a review can land */}
            {FLOW.branches.map((label, i) => (
              <div
                key={label}
                className="absolute w-[130px] -translate-x-1/2 -translate-y-1/2 rounded-[12px] border border-line bg-sunken px-4 py-3 text-center shadow-card"
                style={{ left: `${(versionX / W) * 100}%`, top: `${(versionYs[i] / H) * 100}%` }}
              >
                <p className="text-xs font-semibold text-ink-900">{label}</p>
              </div>
            ))}

            {/* Success-rate circles */}
            {[
              { label: FLOW.outcomes[0], y: versionYs[0] },
              { label: FLOW.outcomes[1], y: versionYs[1] },
            ].map(({ label, y }) => (
              <div
                key={label}
                className="absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper"
                style={{ left: `${(circleX / W) * 100}%`, top: `${(y / H) * 100}%` }}
              >
                <span className="text-base font-semibold text-ink-900">{label}</span>
              </div>
            ))}

            {/* Success rate label, centered between the two circles */}
            <p
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center text-xs font-medium leading-4 text-ink-500"
              style={{ left: `${(circleX / W) * 100}%`, top: `${(H / 2 / H) * 100}%` }}
            >
              Success
              <br />
              rate
            </p>

            {/* Result pill — anchored to the RIGHT edge, not centred on a left
                percentage. The anchor scales with the canvas but the pill is
                fixed-width (128px), so centring it on 94% put its right edge at
                `0.94 * canvas + 64` — outside the card on any canvas narrower
                than ~1200px (measured: clipped by 14px at 820, 5px at 976).
                Right-anchoring keeps the clearance proportional at every width.
                The connector still runs to `resultX`; the pill's opaque `paper`
                fill covers the overshoot, so the line reads as ending at it. */}
            <div
              className="absolute flex -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-pill border border-line bg-paper px-4 py-2 text-ink-900 shadow-pop"
              style={{ right: "1.5%", top: "50%" }}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">✓</span>
              <span className="text-xs font-semibold">{FLOW.result}</span>
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-green-50 to-transparent lg:hidden"
          />
        </div>

        {/* Phone flow (< sm) — same sequence turned top-to-bottom, the natural
            phone reading direction. Type stays at its desktop size; nothing
            scrolls sideways. Live sits under Cleared so the winning path is one
            unbroken line, and the dashed return replaces the wide canvas's
            loop-back curve, which has nowhere to route in a narrow column. */}
        <div className="mt-12 flex flex-col items-center lg:hidden">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-green-500/50 text-center">
            <span className="px-3 text-sm font-semibold leading-tight text-ink-900">
              {FLOW.origin}
            </span>
          </div>

          <span aria-hidden className="h-6 w-px bg-line" />

          <div className="rounded-[12px] border border-line bg-sunken px-4 py-3 text-center shadow-card">
            <p className="text-xs font-semibold text-ink-900">{FLOW.gate}</p>
          </div>

          {/* Split into the two branches */}
          <svg
            aria-hidden
            viewBox="0 0 320 28"
            preserveAspectRatio="none"
            className="h-7 w-full max-w-[320px] sm:max-w-[420px]"
            fill="none"
          >
            <path
              d="M160,0 V10 H80 V28 M160,10 H240 V28"
              stroke={STROKE}
              strokeWidth={2}
            />
          </svg>

          {/* Widens above `sm` so the flow doesn't read as a thin ribbon on a
              tablet, where it now serves everything below `lg`. */}
          <div className="grid w-full max-w-[320px] grid-cols-2 sm:max-w-[420px]">
            {FLOW.branches.map((branch, i) => (
              <div key={branch} className="flex flex-col items-center">
                <div className="rounded-[12px] border border-line bg-sunken px-3 py-2 text-center shadow-card">
                  <p className="text-xs font-semibold text-ink-900">{branch}</p>
                </div>

                <span aria-hidden className="h-5 w-px bg-line" />

                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-line bg-paper">
                  <span className="text-base font-semibold text-ink-900">
                    {FLOW.outcomes[i]}
                  </span>
                </div>

                {/* The wide canvas centres one "Success rate" label between the
                    two circles; stacked in columns there's no between, so each
                    column carries it — otherwise the figures are unlabelled. */}
                <p className="mt-2 text-center text-[11px] leading-4 text-ink-500">
                  Success rate
                </p>

                {/* Only the winning branch continues; Version A dead-ends. */}
                {i === 0 && (
                  <>
                    <span aria-hidden className="h-5 w-px bg-line" />
                    <div className="flex items-center gap-2 whitespace-nowrap rounded-pill border border-line bg-paper px-4 py-2 text-ink-900 shadow-pop">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                        ✓
                      </span>
                      <span className="text-xs font-semibold">
                        {FLOW.result}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
