"use client";

// "How it works" node-graph visual for /products — dotted origin node with a
// soft brand-green glow, branching into three pill nodes, converging into a
// single result node. Node positions are laid out on a fixed 1000x420
// viewBox with preserveAspectRatio="none", so the SVG connectors always
// align with the percentage-positioned node divs regardless of the
// container's actual aspect ratio.

type FlowNode = { label: string; sublabel?: string };

type Props = {
  originLabel: string;
  nodes: FlowNode[]; // exactly 3 expected
  resultLabel: string;
  tone?: "light" | "dark";
};

const W = 1000;
const H = 420;

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

export default function FlowDiagram({ originLabel, nodes, resultLabel, tone = "light" }: Props) {
  const originX = 90;
  const originY = H / 2;
  const midX = 470;
  const midYs = [70, H / 2, H - 70];
  const resultX = 850;
  const resultY = H / 2;

  const dark = tone === "dark";
  const stroke = dark ? "rgba(255,255,255,0.18)" : "#C8D0CA";
  const nodeBg = dark ? "#F3F5F0" : "#0E1311";
  const nodeText = dark ? "#0E1311" : "#FFFFFF";

  return (
    <div className="w-full overflow-x-auto">
    <div
      className={`relative min-w-[760px] rounded-[24px] border ${
        dark ? "border-dborder bg-dpanel" : "border-line bg-paper"
      }`}
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <div
        aria-hidden
        className="absolute -left-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-green-500/25 blur-3xl"
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {midYs.map((y, i) => (
          <path key={`in-${i}`} d={bezier(originX + 70, originY, midX, y)} stroke={stroke} strokeWidth={2} fill="none" />
        ))}
        {midYs.map((y, i) => (
          <path key={`out-${i}`} d={bezier(midX + 150, y, resultX - 60, resultY)} stroke={stroke} strokeWidth={2} fill="none" />
        ))}
      </svg>

      <div
        className="absolute flex h-28 w-28 -translate-y-1/2 items-center justify-center rounded-full border border-dashed border-green-500/50 text-center"
        style={{ left: `${(originX / W) * 100}%`, top: `${(originY / H) * 100}%` }}
      >
        <span className={`px-2 text-sm font-semibold ${dark ? "text-dtext-hi" : "text-ink-900"}`}>{originLabel}</span>
      </div>

      {nodes.map((n, i) => (
        <div
          key={n.label}
          className="absolute w-[150px] -translate-y-1/2 rounded-[12px] px-4 py-3 text-center shadow-card"
          style={{ left: `${(midX / W) * 100}%`, top: `${(midYs[i] / H) * 100}%`, backgroundColor: nodeBg }}
        >
          <p className="text-xs font-semibold" style={{ color: nodeText }}>
            {n.label}
          </p>
          {n.sublabel && (
            <p className="mt-1 text-[11px] leading-4 opacity-70" style={{ color: nodeText }}>
              {n.sublabel}
            </p>
          )}
        </div>
      ))}

      <div
        className="absolute flex -translate-y-1/2 items-center gap-2 rounded-pill bg-green-500 px-4 py-2 text-white shadow-pop"
        style={{ left: `${(resultX / W) * 100}%`, top: `${(resultY / H) * 100}%` }}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/25 text-[10px]">✓</span>
        <span className="whitespace-nowrap text-xs font-semibold">{resultLabel}</span>
      </div>
    </div>
    </div>
  );
}
