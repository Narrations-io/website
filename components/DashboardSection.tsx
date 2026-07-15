"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Loader2,
  ArrowRight,
  Workflow,
  Database,
  ShieldCheck,
  User,
} from "lucide-react";
import DashboardFrame, {
  type MenuItem,
  type KpiItem,
} from "@/components/ui/DashboardFrame";
import { PRODUCTS } from "@/components/product/data/products.data";
import ProductName from "@/components/ui/ProductName";
import OperationsCalendar from "@/components/dashboard/OperationsCalendar";

const MARKETING_INDEX = PRODUCTS.findIndex((p) => p.slug === "marketing");

// Homepage §3 — "See the whole growth engine in one view."
// A landscape "operations cockpit": three zones — LEFT product nav (chrome),
// CENTER the six-tab product demo (each a distinct mini-workflow that animates
// label → in-progress → green ✓ done, auto-advancing + clickable), and a
// CONSTANT RIGHT RAIL (triage feed · automation ring · system status) that does
// NOT change per tab. Auto-advance pauses on hover/focus, resumes on leave/blur.
// prefers-reduced-motion renders a static finished view, no loop, no ring fill.
// Tab labels/icons/order pull from PRODUCTS — no hardcoded second copy.
// Tokens only — zero raw hex. All numbers are illustrative chrome, not claims.

const CHECKS = [
  {
    lead: "One command center, not ten tabs.",
    rest: " Content, marketing, communication, finance, intelligence and operations in a single workspace.",
  },
  {
    lead: "A shared brand memory.",
    rest: " Every product draws on the same memory of your brand, so the work stays on voice as the system learns.",
  },
  {
    lead: "Human review built in.",
    rest: " Approvals and checkpoints keep high-stakes work accountable before anything ships.",
  },
];

// Sidebar (chrome): the six products highlight by active slug; a small platform
// group underneath uses the §4 vocabulary.
const MENU: MenuItem[] = PRODUCTS.map((p) => ({
  icon: p.icon,
  label: p.name,
  tab: p.slug,
}));

const PLATFORM: { icon: typeof Workflow; label: string }[] = [
  { icon: Workflow, label: "Orchestrator" },
  { icon: Database, label: "Brand Memory" },
  { icon: ShieldCheck, label: "Security" },
];

// Generic platform KPI strip — static chrome, no client-specific metrics.
const KPIS: KpiItem[] = [
  { label: "Active workflows", value: "34", bar: 6 },
  { label: "On-brand score", value: "On voice", bar: 4 },
  { label: "In review", value: "5", bar: 7 },
  { label: "Shipped this week", value: "27", bar: 9 },
].map(({ label, value, bar }) => ({
  label,
  value,
  sparkHighlight: bar,
  sparkUp: true,
  deltaContent: (
    <>
      <span className="text-success">▲ live</span> this session
    </>
  ),
}));

type Tone = "run" | "done" | "neutral";

type SRow = {
  id: string;
  cells: string[]; // all columns except the trailing status column
  status: string; // status text for non-task rows
  tone: Tone; // pill tone for non-task rows
  task?: boolean; // the one animating row
};

type Surface = {
  slug: string;
  title: string;
  subtitle: string;
  head: string[]; // includes the trailing "Status" column
  rows: SRow[];
  running: string; // bottom-bar label while in progress
  done: string; // bottom-bar label when complete (✓ prefixed in UI)
  runStatus: string; // task pill text while running
  doneStatus: string; // task pill text when done
};

// One distinct surface per product. Rows/labels differ so each reads as a real
// surface, not the same template relabeled. All values illustrative.
const SURFACES: Surface[] = [
  {
    slug: "content",
    title: "Content Studio",
    subtitle: "Drafts, reviews and publishing across every format.",
    head: ["Asset", "Type", "Channel", "Status"],
    rows: [
      { id: "c1", cells: ["Proof of Stake: glossary", "Glossary", "Academy"], status: "", tone: "run", task: true },
      { id: "c2", cells: ["Weekly Newsletter", "Email", "Newsletter"], status: "Draft", tone: "neutral" },
      { id: "c3", cells: ["Protocol explainer", "Long-form", "Website"], status: "In review", tone: "neutral" },
      { id: "c4", cells: ["Founder LinkedIn thread", "Social", "Thought leadership"], status: "Scheduled", tone: "neutral" },
    ],
    running: "Drafting glossary entry…",
    done: "Published to Academy",
    runStatus: "Drafting",
    doneStatus: "Published",
  },
  {
    slug: "marketing",
    title: "Campaign Scheduler",
    subtitle: "Distribution across every channel, on one measured surface.",
    head: ["Campaign", "Channels", "Window", "Status"],
    rows: [
      { id: "m1", cells: ["Mainnet launch push", "X · Telegram · Email", "This week"], status: "", tone: "run", task: true },
      { id: "m2", cells: ["GEO visibility sweep", "AI search", "Ongoing"], status: "Live", tone: "neutral" },
      { id: "m3", cells: ["Lifecycle re-engage", "Email", "Next week"], status: "Planned", tone: "neutral" },
      { id: "m4", cells: ["Q3 SEO landing pages", "Web", "This month"], status: "In progress", tone: "neutral" },
    ],
    running: "Scheduling campaign across channels…",
    done: "Queued",
    runStatus: "Scheduling",
    doneStatus: "Queued",
  },
  {
    slug: "communication",
    title: "Press & Reputation",
    subtitle: "Earned media, community and reputation as one operation.",
    head: ["Announcement", "Outlets", "Reach", "Status"],
    rows: [
      { id: "k1", cells: ["Series A announcement", "Tier-1 network", "Earned"], status: "", tone: "run", task: true },
      { id: "k2", cells: ["Community AMA recap", "Discord · Telegram", "Owned"], status: "Scheduled", tone: "neutral" },
      { id: "k3", cells: ["Sentiment watch", "Social", "Listening"], status: "Stable", tone: "neutral" },
      { id: "k4", cells: ["Ecosystem grant application", "Partnerships", "Ecosystem"], status: "Drafting", tone: "neutral" },
    ],
    running: "Drafting announcement…",
    done: "Sent to outlets",
    runStatus: "Drafting",
    doneStatus: "Sent",
  },
  {
    slug: "finance",
    title: "Investor Room",
    subtitle: "Investor materials, datarooms and reporting from brand memory.",
    head: ["Document", "Audience", "Status"],
    rows: [
      { id: "f1", cells: ["Q2 investor update", "LPs"], status: "", tone: "run", task: true },
      { id: "f2", cells: ["Tokenomics model v3", "Dataroom"], status: "Shared", tone: "neutral" },
      { id: "f3", cells: ["Runway summary", "Internal"], status: "Current", tone: "neutral" },
      { id: "f4", cells: ["Series A deck v5", "Investors"], status: "In review", tone: "neutral" },
    ],
    running: "Compiling investor update…",
    done: "Dataroom updated",
    runStatus: "Compiling",
    doneStatus: "Updated",
  },
  {
    slug: "intelligence",
    title: "Signal Feed",
    subtitle: "Market, competitor and on-chain signals turned into decisions.",
    head: ["Signal", "Source", "Status"],
    rows: [
      { id: "i1", cells: ["Liquidity shift · DEX pools", "On-chain"], status: "", tone: "run", task: true },
      { id: "i2", cells: ["Competitor narrative spike", "Social"], status: "Tracking", tone: "neutral" },
      { id: "i3", cells: ["Emerging theme: restaking", "News"], status: "Accelerating", tone: "neutral" },
      { id: "i4", cells: ["Wallet cohort attribution", "On-chain"], status: "Updated", tone: "neutral" },
    ],
    running: "Scanning on-chain signals…",
    done: "Flagged for review",
    runStatus: "Scanning",
    doneStatus: "Flagged",
  },
  {
    slug: "operations",
    title: "Operations Desk",
    subtitle: "Support and internal workflows, on brand, with control.",
    head: ["Workflow", "Queue", "Status"],
    rows: [
      { id: "o1", cells: ["Support request #4821", "Support"], status: "", tone: "run", task: true },
      { id: "o2", cells: ["Partner onboarding", "Ops"], status: "In progress", tone: "neutral" },
      { id: "o3", cells: ["Disclosure language", "Compliance"], status: "Gated", tone: "neutral" },
    ],
    running: "Routing support workflow…",
    done: "Auto-resolved",
    runStatus: "Routing",
    doneStatus: "Resolved",
  },
];

const LEN = PRODUCTS.length;
const RUN_MS = 850; // time the task spends "in progress" (snappy, working-dashboard feel)
const HOLD_MS = 2200; // time the ✓ done state holds before advancing

// ── Constant right rail (chrome, same across all tabs) ──────────────────────
// Illustrative sample work demonstrating the breadth Narrations can run — NOT
// live events, no real client data. Priority → semantic token.
type Priority = "High" | "Medium" | "Low";
const TRIAGE: { item: string; state: string; pr: Priority }[] = [
  { item: "Campaign approval", state: "pending", pr: "High" },
  { item: "KYC review", state: "queued", pr: "High" },
  { item: "Competitor launch", state: "detected", pr: "Medium" },
  { item: "Security scan", state: "flagged", pr: "High" },
  { item: "Usage ticket", state: "new", pr: "Low" },
  { item: "Onboarding SOP", state: "in progress", pr: "Low" },
  { item: "Sales lead", state: "new", pr: "Medium" },
];
const PR_CLS: Record<Priority, string> = {
  High: "bg-danger/10 text-danger",
  Medium: "bg-warning/15 text-warning",
  Low: "bg-sunken text-ink-500",
};

// Today's-tasks progress — illustrative chrome (not client data).
const TASKS_DONE = 12;
const TASKS_TOTAL = 15;
const TASKS_FRAC = TASKS_DONE / TASKS_TOTAL;

const sidebarFooter = (
  <div className="flex items-center gap-2 px-1">
    <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-green-900 text-white">
      <User size={11} strokeWidth={2} aria-hidden />
    </span>
    <span className="text-[10px] font-medium text-ink-900">Your Workspace</span>
  </div>
);

function StatusPill({ text, tone }: { text: string; tone: Tone }) {
  const cls: Record<Tone, string> = {
    run: "bg-sunken text-ink-500",
    done: "bg-success text-green-900",
    neutral: "bg-sunken text-ink-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[10px] font-medium ${cls[tone]}`}
    >
      {tone === "run" && <Loader2 size={9} className="animate-spin" />}
      {tone === "done" && <Check size={9} strokeWidth={3} />}
      {text}
    </span>
  );
}


const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

// Today's-tasks radial. Fills once on mount; reduced motion shows final.
function TasksRing() {
  const r = 42;
  const c = 2 * Math.PI * r;
  const off = c * (1 - TASKS_FRAC);
  return (
    <svg viewBox="0 0 110 110" className="h-[64px] w-[64px] shrink-0" aria-hidden>
      <circle
        cx="55"
        cy="55"
        r={r}
        fill="none"
        className="stroke-line"
        strokeWidth="9"
      />
      <circle
        cx="55"
        cy="55"
        r={r}
        fill="none"
        className="ring-fill stroke-green-500"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={off}
        transform="rotate(-90 55 55)"
        style={{ "--ring-c": `${c}` } as React.CSSProperties}
      />
      <text
        x="55"
        y="52"
        textAnchor="middle"
        className="fill-ink-900 text-[17px] font-bold"
      >
        {TASKS_DONE}/{TASKS_TOTAL}
      </text>
      <text
        x="55"
        y="68"
        textAnchor="middle"
        className="fill-ink-500 text-[8px]"
      >
        done
      </text>
    </svg>
  );
}

// Constant right rail — same content on every tab.
function OpsRail() {
  return (
    <aside className="flex shrink-0 flex-col gap-2.5 lg:w-[232px]">
      {/* 1) Activity & triage — static illustrative chrome */}
      <div className="rounded-[10px] border border-line p-2.5">
        <p className="text-[11px] font-semibold text-ink-900">
          Activity &amp; triage
        </p>
        <ul className="mt-1.5 space-y-[2px]">
          {TRIAGE.map(({ item, state, pr }) => (
            <li key={item} className="flex items-center gap-2">
              <span className="min-w-0 flex-1 truncate text-[10.5px] text-ink-700">
                <span className="font-medium text-ink-900">{item}</span>
                <span className="text-ink-300">: {state}</span>
              </span>
              <span
                className={`shrink-0 rounded-full px-1.5 py-[1px] text-[8.5px] font-medium ${PR_CLS[pr]}`}
              >
                {pr}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* 2) Today's tasks — progress ring */}
      <div className="flex items-center gap-3 rounded-[10px] border border-line p-2.5">
        <TasksRing />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-ink-900">
            Today&rsquo;s tasks
          </p>
          <p className="mt-1 text-[10px] leading-4 text-ink-500">
            All high-priority cleared, 3 routine left.
          </p>
        </div>
      </div>

      {/* 3) System status — one calm line */}
      <div className="rounded-[10px] border border-line p-2.5">
        <p className="text-[10px] leading-4 text-ink-500">
          All systems operational · 3 campaigns live · 2 deals in motion
        </p>
      </div>
    </aside>
  );
}

export default function DashboardSection() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<"running" | "done">("running");
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Reduced motion: freeze on the finished view, no loop, no spinners.
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      setPhase("done");
      if (MARKETING_INDEX >= 0) setActive(MARKETING_INDEX);
    }
  }, []);

  // running → done
  useEffect(() => {
    if (reduced || paused || phase !== "running") return;
    const id = setTimeout(() => setPhase("done"), RUN_MS);
    return () => clearTimeout(id);
  }, [active, phase, paused, reduced]);

  // done → advance to next product
  useEffect(() => {
    if (reduced || paused || phase !== "done") return;
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % LEN);
      setPhase("running");
    }, HOLD_MS);
    return () => clearTimeout(id);
  }, [active, phase, paused, reduced]);

  // Select a tab (click / keyboard). Replays its task beat unless reduced.
  const select = (i: number, focus = false) => {
    setActive(i);
    setPhase(reduced ? "done" : "running");
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select((active + 1) % LEN, true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select((active - 1 + LEN) % LEN, true);
    }
  };

  const product = PRODUCTS[active];
  const surface = SURFACES[active];
  const taskTone: Tone = phase === "done" ? "done" : "run";
  const taskText = phase === "done" ? surface.doneStatus : surface.runStatus;

  return (
    <section className="bg-surface">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-24 md:py-28 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-center lg:gap-10">
        {/* Left: copy */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-500">
            Narrations
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.75rem]">
            See the whole growth engine in one view.
          </h2>
          <p className="mt-4 max-w-[46ch] text-base leading-7 text-black/55 md:text-lg">
            Six products on a shared memory of your brand, content, marketing,
            communication, finance, intelligence and operations, coordinated in
            one command center.
          </p>

          <ul className="mt-8 space-y-4">
            {CHECKS.map(({ lead, rest }) => (
              <li key={lead} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <p className="text-sm leading-6 text-ink-700">
                  <span className="font-semibold text-ink-900">{lead}</span>
                  {rest}
                </p>
              </li>
            ))}
          </ul>

          <a
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-pill bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
          >
            Explore products <ArrowRight size={16} aria-hidden />
          </a>
        </div>

        {/* Right: operations cockpit on a brand glow. Hover/focus pauses. */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node))
              setPaused(false);
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-green-500/10 blur-2xl"
          />
          <DashboardFrame
            className="w-full lg:h-[620px]"
            showSidebarLabel
            menuItems={MENU}
            platformItems={PLATFORM}
            activeTab={product.slug}
            lockInactiveMenu
            sidebarFooter={sidebarFooter}
            breadcrumb={product.name}
            showLive
            title={surface.title}
            subtitle={surface.subtitle}
          >
            <div className="flex min-h-0 flex-1 flex-col">
              {/* Tab bar — real buttons, accessible, mobile-scrollable */}
              <div
                role="tablist"
                aria-label="Products"
                onKeyDown={onKeyDown}
                className="-mx-1 flex gap-1 overflow-x-auto border-b border-line px-1 pb-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {PRODUCTS.map((p, i) => {
                  const on = i === active;
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.slug}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      role="tab"
                      id={`pdtab-${p.slug}`}
                      aria-selected={on}
                      aria-controls={`pdpanel-${p.slug}`}
                      aria-label={p.name}
                      tabIndex={on ? 0 : -1}
                      onClick={() => select(i)}
                      className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-2.5 py-2 text-[12px] transition-colors ${
                        on
                          ? "border-green-500 font-semibold text-ink-900"
                          : "border-transparent text-ink-500 hover:text-ink-700"
                      }`}
                    >
                      <Icon size={13} strokeWidth={2} aria-hidden />
                      <ProductName name={p.name} pre={p.pre} post={p.post} />
                    </button>
                  );
                })}
              </div>

              {/* Zones: CENTER (per-tab panel) + CONSTANT right rail.
                  Three columns on lg; rail stacks BELOW center on mobile. */}
              <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
                {/* CENTER — per-product panel, re-keyed so the entrance replays */}
                <div
                  key={product.slug}
                  role="tabpanel"
                  id={`pdpanel-${product.slug}`}
                  aria-labelledby={`pdtab-${product.slug}`}
                  tabIndex={0}
                  className="dash-rowin flex min-w-0 flex-1 flex-col outline-none"
                >
                  {product.slug === "operations" ? (
                    <OperationsCalendar phase={phase} />
                  ) : (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left text-[10px] font-normal text-ink-300">
                        {surface.head.map((h) => (
                          <th key={h} className="pb-2 font-normal">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-[11.5px]">
                      {surface.rows.map((row) => {
                        const isTask = row.task;
                        return (
                          <tr
                            key={row.id}
                            className={isTask ? "dash-rowin" : undefined}
                          >
                            <td className="py-1.5">
                              <span className="flex items-center gap-2">
                                <span
                                  className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full text-[8px] font-semibold ${
                                    isTask
                                      ? "bg-green-50 text-green-600"
                                      : "bg-sunken text-ink-300"
                                  }`}
                                >
                                  {initials(row.cells[0])}
                                </span>
                                <span className="font-medium text-ink-900">
                                  {row.cells[0]}
                                </span>
                              </span>
                            </td>
                            {row.cells.slice(1).map((cell, ci) => (
                              <td key={ci} className="py-1.5 text-ink-700">
                                {cell}
                              </td>
                            ))}
                            <td className="py-1.5">
                              {isTask ? (
                                <StatusPill text={taskText} tone={taskTone} />
                              ) : (
                                <StatusPill text={row.status} tone={row.tone} />
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  )}

                  {/* Bottom activity bar — the focal animation */}
                  <div className="mt-auto flex items-center gap-2 rounded-[10px] border border-line bg-sunken/60 px-3 py-2 text-[11.5px]">
                    {phase === "done" ? (
                      <span className="dash-pop flex h-[18px] w-[18px] items-center justify-center rounded-full bg-success text-green-900">
                        <Check size={11} strokeWidth={3} />
                      </span>
                    ) : (
                      <Loader2
                        size={16}
                        className="text-green-500 motion-safe:animate-spin"
                      />
                    )}
                    <span className="font-medium text-ink-900">
                      {phase === "done" ? surface.done : surface.running}
                    </span>
                    <span className="ml-auto text-[10px] text-ink-300">
                      {product.vertical}
                    </span>
                  </div>
                </div>

                {/* RIGHT — constant rail (same across all tabs) */}
                <OpsRail />
              </div>
            </div>
          </DashboardFrame>
        </div>
      </div>
    </section>
  );
}
