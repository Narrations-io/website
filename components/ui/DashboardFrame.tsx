"use client";

import React from "react";
import NMark from "@/components/NMark";
import {
  ChevronDown,
  Lock,
  MoreHorizontal,
  Search,
  type LucideIcon,
} from "lucide-react";

// Shared chrome for all Narrations dashboard mocks (CLAUDE.md §5 dashboard-chrome
// contract). Owns: card shell, sidebar, top bar, KPI strip.
// Body content is bespoke per dashboard — pass as `children`.
// Tokens only — zero raw hex.

const SPARK = [5, 9, 6, 11, 7, 13, 8, 10, 12, 9];

function Sparkline({ highlight, up = true }: { highlight: number; up?: boolean }) {
  return (
    <div className="flex items-end gap-[2px]" aria-hidden>
      {SPARK.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}px` }}
          className={`w-[3px] rounded-[1px] ${
            i === highlight ? (up ? "bg-success" : "bg-danger") : "bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}

export type MenuItem = {
  icon: LucideIcon;
  label: string;
  /** Matched against `activeTab` to highlight this item */
  tab?: string;
  chevron?: boolean;
  bubbles?: boolean;
};

export type KpiItem = {
  label: string;
  value: React.ReactNode;
  sparkHighlight: number;
  sparkUp?: boolean;
  /** Full delta line content, e.g. <><span className="text-success">▲ +4%</span> vs last month</> */
  deltaContent: React.ReactNode;
};

export type DashboardFrameProps = {
  /** Extra classes on the outer card — set height, width here */
  className?: string;

  /**
   * Render the DESKTOP composition at every viewport (sidebar shown, KPIs 4-up,
   * search shown) instead of collapsing on small screens.
   *
   * For callers that render the frame at a fixed desktop width and scale it
   * down as a picture. Tailwind's `sm:`/`md:` are VIEWPORT media queries, so
   * inside a 1040px box on a 390px phone the frame would otherwise still
   * collapse — you'd get a scaled-down *mobile* layout, which is the worst of
   * both. See DashboardSection.tsx.
   *
   * Opt-in and off by default: the homepage cockpit (ProductShowcaseSection)
   * and the hero card (newhome/DashboardCard) rely on the collapsing behaviour.
   * At `lg` and up this changes nothing — the responsive classes already
   * resolve to these values.
   */
  staticComposition?: boolean;

  // ── Sidebar ────────────────────────────────────────────────────────────
  sidebarWidth?: string;
  /** Show "Narrations" text label next to the N-badge */
  showSidebarLabel?: boolean;
  menuItems: MenuItem[];
  platformItems?: { icon: LucideIcon; label: string }[];
  /** tab value of the currently active menu item */
  activeTab?: string;
  /** Dim + lock every non-active menu item (signals access-restricted view) */
  lockInactiveMenu?: boolean;
  /** Optional bottom-of-sidebar slot (e.g. user avatar row) */
  sidebarFooter?: React.ReactNode;

  // ── Top bar ────────────────────────────────────────────────────────────
  breadcrumb: React.ReactNode;
  showLive?: boolean;

  // ── Title ──────────────────────────────────────────────────────────────
  title: React.ReactNode;
  subtitle?: string;

  // ── KPI strip ──────────────────────────────────────────────────────────
  kpis?: KpiItem[];

  // ── Body ───────────────────────────────────────────────────────────────
  children: React.ReactNode;

  /** Absolutely-positioned overlay content (e.g. toast notifications) */
  floatingContent?: React.ReactNode;
};

export default function DashboardFrame({
  className = "",
  staticComposition = false,
  sidebarWidth = "w-[150px]",
  showSidebarLabel = false,
  menuItems,
  platformItems,
  activeTab,
  lockInactiveMenu = false,
  sidebarFooter,
  breadcrumb,
  showLive = false,
  title,
  subtitle,
  kpis,
  children,
  floatingContent,
}: DashboardFrameProps) {
  return (
    <div
      className={`relative flex overflow-hidden rounded-[12px] bg-paper text-ink-900 shadow-pop ring-1 ring-black/5 ${className}`}
    >
      {/* ── Sidebar ── */}
      <aside
        className={`shrink-0 flex-col border-r border-line bg-sunken px-2.5 py-3 ${
          staticComposition ? "flex" : "hidden md:flex"
        } ${sidebarWidth}`}
      >
        {/* N-badge */}
        <div className="flex items-center gap-1.5 px-1">
          <NMark size={22} tone="light" />
          {showSidebarLabel && (
            <span className="text-[11px] font-semibold text-ink-900">
              Narrations
            </span>
          )}
        </div>

        {/* Main Menu */}
        <p className="mt-4 px-1 text-[8.5px] font-medium uppercase tracking-wide text-ink-300">
          Main Menu
        </p>
        <ul className="mt-1.5 space-y-[2px]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.tab !== undefined ? item.tab === activeTab : false;
            return (
              <li
                key={item.label}
                className={`flex items-center gap-1.5 rounded-[7px] px-1.5 py-[5px] text-[10.5px] transition-all duration-300 ${
                  active
                    ? "bg-paper font-semibold text-green-600 shadow-card ring-1 ring-black/5"
                    : lockInactiveMenu
                      ? "text-ink-300 opacity-60"
                      : "text-ink-700"
                }`}
              >
                <Icon size={11} strokeWidth={2} className="shrink-0" />
                <span className="truncate">{item.label}</span>
                {active && (
                  <span
                    className="relative ml-auto flex h-[6px] w-[6px] shrink-0"
                    aria-hidden
                  >
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-green-500" />
                  </span>
                )}
                {!active && lockInactiveMenu && (
                  <Lock size={8} className="ml-auto shrink-0 text-ink-300" />
                )}
                {!active && !lockInactiveMenu && item.chevron && (
                  <ChevronDown
                    size={9}
                    className="ml-auto shrink-0 text-ink-300"
                  />
                )}
                {!active && !lockInactiveMenu && item.bubbles && (
                  <span
                    className="ml-auto flex shrink-0 -space-x-1"
                    aria-hidden
                  >
                    <span className="h-[10px] w-[10px] rounded-full bg-ink-300 ring-1 ring-white" />
                    <span className="h-[10px] w-[10px] rounded-full bg-ink-300 ring-1 ring-white" />
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        {/* Platform */}
        {platformItems && platformItems.length > 0 && (
          <>
            <p className="mt-5 px-1 text-[8.5px] font-medium uppercase tracking-wide text-ink-300">
              Platform
            </p>
            <ul className="mt-1.5 space-y-[2px]">
              {platformItems.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-1.5 rounded-[7px] px-1.5 py-[5px] text-[10.5px] text-ink-700"
                >
                  <Icon size={11} strokeWidth={2} className="shrink-0" />
                  <span className="truncate">{label}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Optional user/workspace footer */}
        {sidebarFooter && (
          <div className="mt-auto border-t border-line pt-3">
            {sidebarFooter}
          </div>
        )}
      </aside>

      {/* ── Main column ── */}
      <div className="flex min-w-0 flex-1 flex-col px-5 py-3">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-[11px] text-ink-300">
            {showLive && (
              <span className="flex items-center gap-1 text-success">
                <span className="h-[6px] w-[6px] rounded-full bg-success motion-safe:animate-pulse" />
                Live
              </span>
            )}
            Narrations /{" "}
            <span className="text-ink-700">{breadcrumb}</span>
          </p>
          <div
            className={`h-[28px] w-[200px] items-center gap-2 rounded-[8px] bg-sunken px-2.5 ${
              staticComposition ? "flex" : "hidden sm:flex"
            }`}
          >
            <Search size={11} className="text-ink-300" />
            <span className="text-[11px] text-ink-300">
              Search workflows, drafts…
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[20px] font-semibold text-ink-900 sm:text-[22px]">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-[11px] text-ink-300">{subtitle}</p>
        )}

        {/* KPI strip — 2 cols on mobile, 4 cols sm+ */}
        {kpis && kpis.length > 0 && (
          <div
            className={`mt-4 grid divide-x divide-white/10 overflow-hidden rounded-[12px] bg-green-900 ${
              staticComposition ? "grid-cols-4" : "grid-cols-2 sm:grid-cols-4"
            }`}
          >
            {kpis.map((kpi) => (
              <div key={kpi.label} className="px-3.5 py-3">
                <div className="flex items-center justify-between">
                  <p className="truncate text-[10px] text-ink-300">
                    {kpi.label}
                  </p>
                  <MoreHorizontal size={11} className="shrink-0 text-ink-500" />
                </div>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <p className="whitespace-nowrap text-[15px] font-semibold text-white">
                    {kpi.value}
                  </p>
                  <Sparkline highlight={kpi.sparkHighlight} up={kpi.sparkUp} />
                </div>
                <p className="mt-2 truncate text-[9px] text-ink-500">
                  {kpi.deltaContent}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Body — fully bespoke per dashboard */}
        <div className="mt-4 min-h-0 flex-1">{children}</div>
      </div>

      {/* Floating overlays (e.g. toasts) — absolute within the card */}
      {floatingContent}
    </div>
  );
}
