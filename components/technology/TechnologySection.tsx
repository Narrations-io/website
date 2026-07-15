"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  Volume2,
  FileText,
  BadgeCheck,
  Type,
  History,
  BookOpen,
  Boxes,
  Cloud,
  Cable,
  KeyRound,
  CheckCheck,
  FileLock2,
  type LucideIcon,
} from "lucide-react";
import styles from "./technology.module.css";

/* Faithful rebuild of the wonderful.ai "Architecture" section.
   Interaction (measured from the live site, NOT the research doc's guess):
   the four isometric slabs sit CLUSTERED TIGHT together; nothing moves on
   scroll. Clicking a layer (or its label) "opens" the stack at that layer —
   the selected slab pulls out into a gap to reveal it while the others bunch
   into tight groups above and below. The orange marker + dark label follow.

   Open-state geometry is taken directly from the live site (offsets in units
   of one slab's on-screen height): a BIG gap opens just above the active
   layer, a MEDIUM gap just below it, and every other seam stays TIGHT. */

// All four slabs are now live DOM surfaces (no PNGs) — each renders a compact,
// on-brand view of its layer, skewed onto the shared 2:1 dimetric plane.
const LAYERS = [
  {
    name: "Management & Operators",
    desc: "Human operators monitor, review and optimize the system as it runs.",
    kind: "management",
  },
  {
    name: "Orchestration",
    desc: "The Orchestrator moves work across every channel and workflow toward the goal you set.",
    kind: "orchestration",
  },
  {
    name: "Brand Memory & Knowledge",
    desc: "Reusable agent skills grounded in your brand, systems, knowledge and processes, held in a knowledge graph that compounds as you use it.",
    kind: "knowledge",
  },
  {
    name: "Infrastructure & Security",
    desc: "Secure, model-agnostic infrastructure with guardrails built in, running in your own environment and cloud of choice.",
    kind: "infrastructure",
  },
] as const;

// Seam sizes in units of one slab's on-screen height (≈ averaged from the live
// site's four measured states).
const TIGHT = 0.07; // clustered seam — slabs sit near-touching, like one deck
const BIG = 1.0; // gap immediately ABOVE the active layer (a clean full slab face)
const MEDIUM = 0.55; // gap immediately BELOW the active layer (lower group detaches)

// Cumulative top-offset (in slab-height units) of each slab for a given active
// index — reproduces the measured open positions.
function offsetsFor(active: number): number[] {
  const tops = [0];
  for (let i = 0; i < LAYERS.length - 1; i++) {
    let gap = TIGHT;
    if (i + 1 === active) gap = BIG; // next slab is the active one
    else if (i === active) gap = MEDIUM; // we're leaving the active one
    tops.push(tops[i] + gap);
  }
  return tops;
}

// —— Live slab surfaces ——
// Each slab is a compact, on-brand DOM view of its layer — sample content only,
// no invented metrics or claims (CLAUDE.md §8). All reuse the standardized token
// + row/tile styling (no raw hex), and get skewed onto the dimetric plane by
// .liveFace. Shared chrome below keeps the four visually consistent.

// Card shell — provides the white slab face, border, padding, ink colour.
function SurfaceCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex h-full w-full rounded-[7px] border border-line bg-paper p-4 text-ink-900 ${className}`}>
      {children}
    </div>
  );
}

// Title + status-tag row, shared by the single-column surfaces.
function SurfaceHeader({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="flex items-center justify-between">
      <h4 className="text-[13px] font-semibold">{title}</h4>
      <span className="rounded-full bg-sunken px-2 py-[2px] text-[9px] text-ink-500">{tag}</span>
    </div>
  );
}

type Tile = { label: string; Icon: LucideIcon };

// 3-col tile grid; "stack" = icon over label, "row" = icon beside label.
function TileGrid({ items, layout }: { items: Tile[]; layout: "stack" | "row" }) {
  return (
    <div className="mt-3 grid flex-1 grid-cols-3 gap-2">
      {items.map(({ label, Icon }) => (
        <div
          key={label}
          className={`flex rounded-[8px] border border-line bg-sunken p-2 ${
            layout === "stack" ? "flex-col justify-between" : "items-center gap-2"
          }`}
        >
          <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-paper text-green-600">
            <Icon size={11} strokeWidth={2} />
          </span>
          <span className={`text-[10px] font-medium leading-tight ${layout === "stack" ? "mt-2" : ""}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// —— 1. Management & Operators: content queue + narrative-performance chart ——
const QUEUE = [
  { ini: "LB", asset: "Launch Brief", stage: "Drafting", channel: "Website", pill: "bg-sunken text-ink-500" },
  { ini: "FP", asset: "Founder Post", stage: "In review", channel: "X", pill: "bg-warning/15 text-warning" },
  { ini: "WN", asset: "Weekly Newsletter", stage: "Scheduled", channel: "Email", pill: "bg-green-50 text-green-600" },
  { ini: "PR", asset: "Product Recap", stage: "Published", channel: "Blog", pill: "bg-success text-green-900" },
];
const C = [70, 52, 60, 38, 44, 30, 22, 28, 16]; // decorative area-chart shape (no values)
const CX = (i: number) => (i * 200) / (C.length - 1);
const CLINE = C.map((y, i) => `${CX(i)},${y}`).join(" L");

function SurfaceManagement() {
  return (
    <SurfaceCard className="gap-3">
      {/* Left: content queue */}
      <div className="flex min-w-0 flex-[1.35] flex-col">
        <SurfaceHeader title="Content Queue" tag="Live" />
        <table className="mt-2 w-full border-collapse">
          <thead>
            <tr className="text-left text-[9px] font-normal text-ink-300">
              <th className="pb-1.5 font-normal">Asset</th>
              <th className="pb-1.5 font-normal">Stage</th>
              <th className="pb-1.5 font-normal">Channel</th>
            </tr>
          </thead>
          <tbody className="text-[10.5px]">
            {QUEUE.map((r) => (
              <tr key={r.asset} className="border-t border-line">
                <td className="py-1.5">
                  <span className="flex items-center gap-2">
                    <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-sunken text-[7px] font-semibold text-ink-500">
                      {r.ini}
                    </span>
                    <span className="font-medium">{r.asset}</span>
                  </span>
                </td>
                <td className="py-1.5">
                  <span className={`rounded-full px-2 py-[2px] text-[9px] font-medium ${r.pill}`}>
                    {r.stage}
                  </span>
                </td>
                <td className="py-1.5 text-ink-700">{r.channel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right: narrative performance */}
      <div className="flex flex-1 flex-col rounded-[8px] border border-line p-3">
        <h4 className="text-[12px] font-semibold">Narrative Performance</h4>
        <span className="text-[9px] text-ink-300">Reach over time</span>
        <svg viewBox="0 0 200 90" preserveAspectRatio="none" className="mt-2 h-full min-h-[60px] w-full" aria-hidden>
          {[22, 45, 68].map((y) => (
            <line key={y} x1="0" x2="200" y1={y} y2={y} className="stroke-line" strokeWidth="1" />
          ))}
          <path d={`M0,${C[0]} L${CLINE} L200,90 L0,90 Z`} className="fill-green-500" fillOpacity={0.08} />
          <path d={`M0,${C[0]} L${CLINE}`} fill="none" className="stroke-green-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </SurfaceCard>
  );
}

// —— 2. Orchestration: agents routed across channels ——
const AGENTS = ["Content", "Marketing", "Operations", "Finance", "Intelligence", "Communication"];
const ROUTES = [
  { wf: "Launch campaign", ch: "Multi-channel", state: "Routing", pill: "bg-green-50 text-green-600" },
  { wf: "Weekly newsletter", ch: "Email", state: "Queued", pill: "bg-sunken text-ink-500" },
  { wf: "Press update", ch: "Comms", state: "Running", pill: "bg-green-50 text-green-600" },
  { wf: "Social thread", ch: "X", state: "Scheduled", pill: "bg-warning/15 text-warning" },
];

function SurfaceOrchestration() {
  return (
    <SurfaceCard className="flex-col">
      <SurfaceHeader title="Orchestrator" tag="Routing" />
      <p className="mt-3 text-[9px] font-medium uppercase tracking-wide text-ink-300">Agents</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {AGENTS.map((a) => (
          <span key={a} className="rounded-full border border-line bg-sunken px-2 py-[2px] text-[9.5px] text-ink-700">
            {a}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[9px] font-medium uppercase tracking-wide text-ink-300">Routing to channels</p>
      <table className="mt-1 w-full border-collapse">
        <tbody className="text-[10.5px]">
          {ROUTES.map((r) => (
            <tr key={r.wf} className="border-t border-line">
              <td className="py-1.5 font-medium">{r.wf}</td>
              <td className="py-1.5 text-ink-700">{r.ch}</td>
              <td className="py-1.5 text-right">
                <span className={`rounded-full px-2 py-[2px] text-[9px] font-medium ${r.pill}`}>{r.state}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SurfaceCard>
  );
}

// —— 3. Brand Memory & Knowledge: reusable skills grounded in your brand ——
const SKILLS: Tile[] = [
  { label: "Brand voice", Icon: Volume2 },
  { label: "Product facts", Icon: FileText },
  { label: "Approved claims", Icon: BadgeCheck },
  { label: "Tone & style", Icon: Type },
  { label: "Past campaigns", Icon: History },
  { label: "Glossary", Icon: BookOpen },
];

function SurfaceKnowledge() {
  return (
    <SurfaceCard className="flex-col">
      <SurfaceHeader title="Brand Memory" tag="Reusable skills" />
      <TileGrid items={SKILLS} layout="stack" />
    </SurfaceCard>
  );
}

// —— 4. Infrastructure & Security: multi-model / multi-cloud + basic controls ——
// (Security is basic today — controls only, NO compliance/cert claims per §8.)
const INFRA: Tile[] = [
  { label: "Multi-model", Icon: Boxes },
  { label: "Multi-cloud", Icon: Cloud },
  { label: "Integrations", Icon: Cable },
  { label: "Access control", Icon: KeyRound },
  { label: "Approvals", Icon: CheckCheck },
  { label: "File controls", Icon: FileLock2 },
];

function SurfaceInfrastructure() {
  return (
    <SurfaceCard className="flex-col">
      <SurfaceHeader title="Infrastructure" tag="Multi-model · multi-cloud" />
      <TileGrid items={INFRA} layout="row" />
    </SurfaceCard>
  );
}

function renderSurface(kind: string) {
  switch (kind) {
    case "orchestration":
      return <SurfaceOrchestration />;
    case "knowledge":
      return <SurfaceKnowledge />;
    case "infrastructure":
      return <SurfaceInfrastructure />;
    default:
      return <SurfaceManagement />;
  }
}

export default function TechnologySection() {
  const [active, setActive] = useState(0);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const markerRef = useRef<HTMLDivElement | null>(null);

  const tops = offsetsFor(active);
  const stackUnits = tops[tops.length - 1] + 1; // + one slab face at the bottom

  // Glide the orange dash to sit just above the active label's name.
  useLayoutEffect(() => {
    const marker = markerRef.current;
    const label = labelRefs.current[active];
    if (!marker || !label) return;
    marker.style.transform = `translate(${label.offsetLeft}px, ${label.offsetTop - 14}px)`;
    marker.style.opacity = "1";
  }, [active]);

  // Keep the marker seated after resize / font + image settle (label metrics shift).
  useLayoutEffect(() => {
    const reseat = () => {
      const marker = markerRef.current;
      const label = labelRefs.current[active];
      if (!marker || !label) return;
      marker.style.transform = `translate(${label.offsetLeft}px, ${label.offsetTop - 14}px)`;
    };
    window.addEventListener("resize", reseat);
    window.addEventListener("load", reseat);
    return () => {
      window.removeEventListener("resize", reseat);
      window.removeEventListener("load", reseat);
    };
  }, [active]);

  return (
    <section className={styles.section}>
      <div className={styles.stage}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>Architecture</p>
          <h2 className={styles.title}>The AI platform for enterprise scale.</h2>
          <p className={styles.subtitle}>
            A unified foundation that compounds across every deployment.
          </p>
        </div>

        <div className={styles.scene} ref={sceneRef}>
          <div
            className={styles.stack}
            style={{
              height: `calc(var(--slab-w) * var(--slab-ratio) * ${stackUnits})`,
            }}
          >
            {LAYERS.map((layer, i) => {
              // Shared deck geometry — every slab (all live now) stacks and
              // animates in lockstep.
              const style: CSSProperties = {
                transform: `translateX(-50%) translateY(calc(var(--slab-w) * var(--slab-ratio) * ${tops[i]})) scale(${i === active ? 1.035 : 1})`,
                // Lower-numbered cards sit ON TOP so a collapsed deck reads like a
                // stack of sheets — card 1 stays the visible top, each later card
                // tucks underneath and peeks out the bottom (active is always front).
                zIndex: i === active ? LAYERS.length + 1 : LAYERS.length - i,
                // active slab leads; neighbours follow a touch later for a subtle
                // cascade — kept small (≤30ms) so it reads crisp, not laggy.
                transitionDelay: `${Math.min(Math.abs(i - active), 2) * 15}ms`,
                // soft drop shadow (deeper on the active layer); green edge outline removed.
                // On the live slab this same filter shadows the skewed face silhouette,
                // matching the PNG siblings' shadow for free.
                filter:
                  i === active
                    ? "drop-shadow(0 48px 60px rgba(20,17,15,0.28))"
                    : "drop-shadow(0 20px 30px rgba(20,17,15,0.14))",
              };

              return (
                <div
                  key={layer.name}
                  className={`${styles.slab} ${styles.slabLive}${i === active ? ` ${styles.slabActive}` : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${layer.name}, live view`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                  style={style}
                >
                  {/* the dimetric top face — skew knobs live in technology.module.css */}
                  <div className={styles.liveFace}>{renderSurface(layer.kind)}</div>
                </div>
              );
            })}
          </div>

          {LAYERS.map((layer, i) => (
            <button
              key={layer.name}
              type="button"
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className={`${styles.label} ${styles[`pos${i}` as keyof typeof styles]}${i === active ? ` ${styles.active}` : ""}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <p className={styles.labelName}>{layer.name}</p>
              <p className={styles.labelDesc}>{layer.desc}</p>
            </button>
          ))}

          <div className={styles.marker} ref={markerRef} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
