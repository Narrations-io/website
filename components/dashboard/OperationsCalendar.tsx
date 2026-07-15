"use client";

import { ChevronLeft, ChevronRight, Plus, Check, Loader2 } from "lucide-react";

// Operations surface for the §3 cockpit — a Throxy-style month calendar.
// Cells form a 7-col × 4-row grid (Mon-start, Jun 1–28 2026 deterministic for
// SSR). Events render as absolutely-positioned pills lifted off the grid with
// shadow-card / shadow-pop. One pill on "today" is wired to the parent's
// running → done phase so the existing bottom activity bar narrative still
// applies (Routing → Auto-resolved).
//
// Tokens only. All event labels are illustrative chrome — no real client data.

const DEFAULT_CELL_H = 78; // px — §3 cockpit default; smaller surfaces can override via prop
const WEEKS = 4;

type Tone = "green" | "ink" | "warn" | "muted" | "danger";

type Evt = {
  col: number; // 0=Mon..6=Sun
  row: number; // 0..3
  span: number; // days
  label: string;
  tone: Tone;
};

const EVENTS: Evt[] = [
  { col: 0, row: 0, span: 3, label: "Partner onboarding",      tone: "green"  },
  { col: 4, row: 0, span: 1, label: "Weekly ops review",       tone: "muted"  },
  { col: 1, row: 1, span: 1, label: "Security scan",           tone: "warn"   },
  { col: 3, row: 1, span: 1, label: "Campaign approval",       tone: "green"  },
  { col: 0, row: 2, span: 2, label: "KYC review batch",        tone: "ink"    },
  { col: 2, row: 2, span: 1, label: "Support escalation",      tone: "danger" },
  { col: 4, row: 2, span: 1, label: "Disclosure language",     tone: "muted"  },
  { col: 0, row: 3, span: 4, label: "Onboarding SOP rollout",  tone: "green"  },
  { col: 4, row: 3, span: 1, label: "Auto-resolved +12",       tone: "muted"  },
];

const TONE_CLS: Record<Tone, string> = {
  green:  "bg-green-500 text-white",
  ink:    "bg-ink-900 text-white",
  warn:   "bg-warning/15 text-[#8a5a1f] ring-1 ring-warning/25",
  muted:  "bg-sunken text-ink-700 ring-1 ring-line",
  danger: "bg-danger/12 text-danger ring-1 ring-danger/25",
};

// Today is the last cell so the live pill is easy to spot.
const TODAY_ROW = 3;
const TODAY_COL = 6;

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Pill geometry scales with cell height so the same component looks right at
// both §3 (cellH 78) and the showcase (cellH 54).
function pillMetrics(cellH: number) {
  const pillH = Math.max(16, Math.round(cellH * 0.26));
  const pillTop = Math.max(20, Math.round(cellH * 0.36));
  const fontPx = cellH <= 60 ? 10 : 11;
  return { pillH, pillTop, fontPx };
}

function EventPill({ e, cellH }: { e: Evt; cellH: number }) {
  const { pillH, pillTop, fontPx } = pillMetrics(cellH);
  const top = e.row * cellH + pillTop;
  const leftPct = (e.col / 7) * 100;
  const widthPct = (e.span / 7) * 100;
  return (
    <div
      className={`absolute z-10 flex items-center truncate rounded-md px-2 font-medium shadow-card ${TONE_CLS[e.tone]}`}
      style={{
        top,
        height: pillH,
        fontSize: fontPx,
        lineHeight: 1,
        left: `calc(${leftPct}% + 4px)`,
        width: `calc(${widthPct}% - 8px)`,
      }}
      title={e.label}
    >
      <span className="truncate">{e.label}</span>
    </div>
  );
}

export default function OperationsCalendar({
  phase,
  cellHeight = DEFAULT_CELL_H,
}: {
  phase: "running" | "done";
  cellHeight?: number;
}) {
  const live = phase === "done";
  const CELL_H = cellHeight;
  const { pillH, pillTop, fontPx } = pillMetrics(CELL_H);
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between pb-2.5">
        <div className="flex items-baseline gap-2">
          <h3 className="text-[13px] font-semibold tracking-tight text-ink-900">
            June 2026
          </h3>
          <span className="text-[10px] text-ink-300">4-week view</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Previous month"
            className="flex h-6 w-6 items-center justify-center rounded-md border border-line text-ink-500 hover:bg-sunken"
          >
            <ChevronLeft size={12} aria-hidden />
          </button>
          <button
            type="button"
            tabIndex={-1}
            aria-label="Next month"
            className="flex h-6 w-6 items-center justify-center rounded-md border border-line text-ink-500 hover:bg-sunken"
          >
            <ChevronRight size={12} aria-hidden />
          </button>
          <span className="ml-1 inline-flex items-center gap-1 rounded-md bg-ink-900 px-2 py-1 text-[10px] font-medium text-white">
            <Plus size={10} strokeWidth={2.5} aria-hidden /> Schedule
          </span>
        </div>
      </div>

      {/* Calendar surface — single rounded container so borders never bleed past it */}
      <div className="overflow-hidden rounded-[10px] border border-line">
        {/* Weekday header */}
        <div className="grid grid-cols-7 border-b border-line bg-sunken/60 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-ink-500">
          {WEEKDAYS.map((d) => (
            <div key={d} className="px-2 py-1.5">
              {d}
            </div>
          ))}
        </div>

        {/* Grid + floating events */}
        <div
          className="relative grid grid-cols-7"
          style={{ gridTemplateRows: `repeat(${WEEKS}, ${CELL_H}px)` }}
        >
          {Array.from({ length: WEEKS * 7 }).map((_, i) => {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const day = row * 7 + col + 1;
            const isToday = row === TODAY_ROW && col === TODAY_COL;
            const isLastRow = row === WEEKS - 1;
            const isLastCol = col === 6;
            return (
              <div
                key={i}
                className={`relative px-1.5 pt-1.5 ${
                  !isLastCol ? "border-r border-line" : ""
                } ${!isLastRow ? "border-b border-line" : ""} ${
                  isToday ? "bg-green-50/70" : "bg-paper"
                }`}
              >
                <span
                  className={`text-[10px] tabular-nums ${
                    isToday
                      ? "font-semibold text-green-600"
                      : "font-medium text-ink-500"
                  }`}
                >
                  {day}
                </span>
                {isToday && (
                  <span
                    aria-hidden
                    className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-green-500"
                  />
                )}
              </div>
            );
          })}

          {EVENTS.map((e, i) => (
            <EventPill key={i} e={e} cellH={CELL_H} />
          ))}

          {/* Live pill on today — wired to the cockpit's running → done phase */}
          <div
            className={`absolute z-20 flex items-center gap-1.5 truncate rounded-md px-2 font-medium shadow-pop transition-colors ${
              live ? "bg-success text-green-900" : "bg-green-500 text-white"
            }`}
            style={{
              top: TODAY_ROW * CELL_H + pillTop + pillH + 3,
              height: pillH,
              fontSize: fontPx,
              lineHeight: 1,
              left: `calc(${(TODAY_COL / 7) * 100}% + 4px)`,
              width: `calc(${(1 / 7) * 100}% - 8px)`,
            }}
          >
            {live ? (
              <Check size={9} strokeWidth={3} aria-hidden />
            ) : (
              <Loader2 size={9} className="motion-safe:animate-spin" aria-hidden />
            )}
            <span className="truncate">
              {live ? "Auto-resolved" : "Support #4821"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
