"use client";

import {
  Workflow,
  Database,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import DashboardFrame, {
  type MenuItem,
  type KpiItem,
} from "@/components/ui/DashboardFrame";
import { PRODUCTS } from "@/components/product/data/products.data";

// Hero compact dashboard — Operations / "Operations Overview" view.
// Vocabulary matches §3 DashboardSection (six products + platform group + KPI
// strip). Chrome lives in DashboardFrame; this file owns ONLY the data + body
// content. Tokens only — zero raw hex. All numbers are illustrative chrome.

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

// Sidebar (chrome): the six products + a small platform group (§4 vocabulary).
const MENU: MenuItem[] = PRODUCTS.map((p) => ({
  icon: p.icon,
  label: p.name,
  tab: p.slug,
}));

const PLATFORM = [
  { icon: Workflow, label: "Orchestrator" },
  { icon: Database, label: "Brand Memory" },
  { icon: ShieldCheck, label: "Security" },
];

// Operations surface — Operations Desk (mirrors §3's operations surface).
const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const WORKFLOWS = [
  {
    name: "Support request #4821",
    queue: "Support",
    owner: "Operators",
    status: "Routing",
    tone: "run" as const,
  },
  {
    name: "Partner onboarding",
    queue: "Ops",
    owner: "Team",
    status: "In progress",
    tone: "neutral" as const,
  },
  {
    name: "Disclosure language",
    queue: "Compliance",
    owner: "Review",
    status: "Gated",
    tone: "neutral" as const,
  },
];

const PILL: Record<"run" | "neutral", string> = {
  run: "bg-warning/15 text-warning",
  neutral: "bg-sunken text-ink-500",
};

export default function DashboardCard() {
  return (
    <DashboardFrame
      className="h-[520px] w-[min(816px,92vw)]"
      sidebarWidth="w-[118px]"
      menuItems={MENU}
      platformItems={PLATFORM}
      activeTab="operations"
      lockInactiveMenu
      breadcrumb="Operations"
      title="Operations Overview"
      subtitle="Today · 34 workflows active, 5 in review, 2 approvals pending, 1 deal in sales pipeline."
      kpis={KPIS}
    >
      {/* ── Body: Workflow table + side status card ── */}
      <div className="flex min-h-0 flex-1 gap-4">
        {/* Workflow table */}
        <div className="min-w-0 flex-1">
          <h4 className="text-[13px] font-semibold text-ink-900">
            Operations Desk
          </h4>
          <table className="mt-2 w-full border-collapse">
            <thead>
              <tr className="text-left text-[10px] font-normal text-ink-300">
                <th className="pb-2 font-normal">Workflow</th>
                <th className="hidden pb-2 font-normal sm:table-cell">Queue</th>
                <th className="hidden pb-2 font-normal sm:table-cell">Owner</th>
                <th className="pb-2 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="text-[11.5px]">
              {WORKFLOWS.map((c) => (
                <tr key={c.name}>
                  <td className="py-1.5">
                    <span className="flex items-center gap-2">
                      <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-sunken text-[8px] font-semibold text-ink-500">
                        {initials(c.name)}
                      </span>
                      <span className="block font-medium text-ink-900">
                        {c.name}
                      </span>
                    </span>
                  </td>
                  <td className="hidden py-1.5 text-ink-700 sm:table-cell">
                    {c.queue}
                  </td>
                  <td className="hidden py-1.5 text-ink-700 sm:table-cell">
                    {c.owner}
                  </td>
                  <td className="py-1.5">
                    <span
                      className={`rounded-full px-2.5 py-[3px] text-[10px] font-medium ${PILL[c.tone]}`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Orchestrator status rail card */}
        <div className="hidden w-[176px] shrink-0 lg:block">
          <div className="rounded-[10px] border border-line p-3">
            <div className="flex items-start justify-between">
              <p className="text-[11.5px] font-semibold text-ink-900">
                Agent
                <br />
                activity
              </p>
              <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-ink-900">
                <ArrowUpRight size={10} className="text-white" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-line pt-2">
              <span className="text-[10.5px] text-ink-700">Orchestrator</span>
              <span className="text-right">
                <span className="block text-[11px] font-semibold text-ink-900">
                  Running
                </span>
                <span className="block text-[9px] text-ink-300">
                  6 agents live
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardFrame>
  );
}
