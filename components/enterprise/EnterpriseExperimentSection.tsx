// Enterprise AI — "Experiment and deploy agent changes safely" (A/B test node
// diagram). Sits on /enterprise; adapted from a reference mock into the
// Ink + Evergreen dark tokens (no raw hex, single typeface, single green).

const W = 1000;
const H = 420;

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

  return (
    <section className="bg-green-50 text-ink-900">
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600" aria-hidden />
            Safe iteration
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.5rem]">
            Test and deploy agent changes safely.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-500">
            We test and stage changes behind approval checkpoints, so agents
            keep improving without disrupting your live operations.
          </p>
        </div>

        <div className="mt-14 w-full overflow-x-auto">
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
              {/* Version -> success-rate circle */}
              {versionYs.map((y, i) => (
                <path
                  key={`vc-${i}`}
                  d={`M${versionX + 60},${y} L${circleX - 44},${y}`}
                  stroke="rgba(14,19,17,0.14)"
                  strokeWidth={2}
                  fill="none"
                />
              ))}
              {/* winning circle -> result pill */}
              <path
                d={elbow(circleX + 44, versionYs[0], resultX - 56, H / 2)}
                stroke="rgba(14,19,17,0.14)"
                strokeWidth={2}
                fill="none"
              />
            </svg>

            {/* Origin — Agent */}
            <div
              className="absolute flex h-28 w-28 -translate-y-1/2 items-center justify-center rounded-full border border-dashed border-green-500/50 text-center"
              style={{ left: `${(originX / W) * 100}%`, top: `${(originY / H) * 100}%` }}
            >
              <span className="px-2 text-sm font-semibold text-ink-900">Agent</span>
            </div>

            {/* A/B Test node */}
            <div
              className="absolute w-[130px] -translate-x-1/2 -translate-y-1/2 rounded-[12px] border border-line bg-sunken px-4 py-3 text-center shadow-card"
              style={{ left: `${(abX / W) * 100}%`, top: `${(abY / H) * 100}%` }}
            >
              <p className="text-xs font-semibold text-ink-900">A/B Test</p>
            </div>

            {/* Version B / Version A nodes */}
            {["Version B", "Version A"].map((label, i) => (
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
              { pct: "80%", y: versionYs[0] },
              { pct: "72%", y: versionYs[1] },
            ].map(({ pct, y }) => (
              <div
                key={pct}
                className="absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper"
                style={{ left: `${(circleX / W) * 100}%`, top: `${(y / H) * 100}%` }}
              >
                <span className="text-base font-semibold text-ink-900">{pct}</span>
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

            {/* Result pill */}
            <div
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-pill border border-line bg-paper px-4 py-2 text-ink-900 shadow-pop"
              style={{ left: `${(resultX / W) * 100}%`, top: `${(H / 2 / H) * 100}%` }}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">✓</span>
              <span className="text-xs font-semibold">Version B</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
