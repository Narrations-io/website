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

// Hero compact dashboard — the Content editor, the one live part, checking a
// draft. Was "Operations Overview" (a part still in development); the editor is
// what a visitor can actually see running today.
// Chrome lives in DashboardFrame; this file owns ONLY the data + body content.
// All numbers are illustrative chrome.

const KPIS: KpiItem[] = [
  { label: "Drafts in progress", value: "34", bar: 6 },
  { label: "Checked vs rules", value: "34 of 34", bar: 4 },
  { label: "In review", value: "5", bar: 7 },
  { label: "Approved this week", value: "27", bar: 9 },
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

// Sidebar (chrome): the platform's parts + a small foundation group.
const MENU: MenuItem[] = PRODUCTS.map((p) => ({
  icon: p.icon,
  label: p.name,
  tab: p.slug,
}));

const PLATFORM = [
  { icon: Workflow, label: "MCP" },
  { icon: Database, label: "The Ledger" },
  { icon: ShieldCheck, label: "Approval gates" },
];

// Content surface — drafts in progress, checked against approved rules.
const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const WORKFLOWS = [
  {
    name: "Launch email, autumn release",
    queue: "Marketing",
    owner: "Content",
    status: "Checking",
    tone: "run" as const,
  },
  {
    name: "Refund policy article",
    queue: "Help centre",
    owner: "Support",
    status: "Flagged: pricing",
    tone: "neutral" as const,
  },
  {
    name: "Leave policy, revised",
    queue: "Intranet",
    owner: "People",
    status: "Approved",
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
      activeTab="content"
      lockInactiveMenu
      breadcrumb="Content"
      title="Content editor"
      subtitle="Today · 34 drafts in progress, 5 in review, 2 approvals pending, 3 rules added."
      kpis={KPIS}
    >
      {/* ── Body: Draft table + side status card ── */}
      <div className="flex min-h-0 flex-1 gap-4">
        {/* Draft table */}
        <div className="min-w-0 flex-1">
          <h4 className="text-[13px] font-semibold text-ink-900">
            Drafts
          </h4>
          <table className="mt-2 w-full border-collapse">
            <thead>
              <tr className="text-left text-[10px] font-normal text-ink-300">
                <th className="pb-2 font-normal">Draft</th>
                <th className="hidden pb-2 font-normal sm:table-cell">Channel</th>
                <th className="hidden pb-2 font-normal sm:table-cell">Team</th>
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

        {/* Agent activity rail card */}
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
              <span className="text-[10.5px] text-ink-700">Content editor</span>
              <span className="text-right">
                <span className="block text-[11px] font-semibold text-ink-900">
                  Drafting
                </span>
                <span className="block text-[9px] text-ink-300">
                  from the ledger
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardFrame>
  );
}
