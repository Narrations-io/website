"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import NMark from "@/components/NMark";
import ProductName from "@/components/ui/ProductName";
import OperationsCalendar from "@/components/dashboard/OperationsCalendar";
import {
  PenLine,
  Megaphone,
  MessagesSquare,
  TrendingUp,
  Radar,
  Workflow,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Search,
  Heart,
  Repeat2,
  MessageCircle,
  Calendar,
  Users,
  Share2,
  BarChart3,
  Mail,
  Zap,
  Target,
  FlaskConical,
  Sparkles,
  Trophy,
  Mic,
  Star,
  LayoutTemplate,
  FileText,
  BookMarked,
  BookOpen,
  Film,
  Globe,
  CheckCheck,
  Headset,
  ShieldCheck,
  Scale,
  UserPlus,
  GraduationCap,
  HeartHandshake,
  Inbox,
  Briefcase,
  FolderLock,
  Coins,
  Flame,
  Wallet,
  Award,
  Compass,
  Crosshair,
  Link2,
  ClipboardCheck,
  Bell,
  Download,
  Newspaper,
  FolderOpen,
  HeartPulse,
  Eye,
  Handshake,
  AlertTriangle,
  ShieldAlert,
  Activity,
  CheckCircle2,
  Clock,
  type LucideIcon,
} from "lucide-react";

// Homepage — tabbed product showcase (Perspective-style "one at a time" pattern,
// rendered in our light + Ink+Evergreen system). Sits after the six-product grid
// (ProductsSection): the grid is the quick scan, this is the drill-down — pick a
// product and see its real dashboard view with genuinely distinct copy.
//
// Design-system note: the brand guideline is deliberately one-green (no rainbow,
// no third-party colors as UI — §1.7). So the six tabs take distinct *steps of the
// green ramp* (a monochromatic family), not six unrelated hues. The active tab sits
// in a soft `green-50` tinted container — our equivalent of the reference's blue
// active state. Accent-N per product name is UI-only; aria-label carries the plain
// name for screen readers (CLAUDE.md §3).

type Showcase = {
  name: string; // plain name — accessibility + slug source
  slug: string;
  pre: string; // text before the accent N
  post: string; // text after the accent N
  vertical: string;
  Icon: LucideIcon;
  /** green-ramp step for the tab tile + active marks, e.g. "500" */
  ramp: "400" | "500" | "600" | "700" | "800" | "900";
  /** right-card headline — a distinct value prop per product */
  headline: string;
  /** right-card supporting line */
  desc: string;
  // ── preview dashboard view (drives DashboardFrame) ──
  breadcrumb: string;
  title: string;
  subtitle: string;
  kpis: { label: string; value: string; up?: boolean; delta: string }[];
  /** bespoke body rows — label + status pill */
  rows: { label: string; status: string; tone: "live" | "review" | "draft" }[];
};

const PRODUCTS: Showcase[] = [
  {
    name: "Content",
    slug: "content",
    pre: "Conte",
    post: "t",
    vertical: "Content & Creative",
    Icon: PenLine,
    ramp: "500",
    headline: "Everything you publish, on brand, from one memory.",
    desc: "Plan, draft, schedule and publish across articles, social, product docs, scripts and creative from one workspace, each asset checked against your brand and legal from the start.",
    breadcrumb: "Content Studio",
    title: "Content Studio",
    subtitle: "Content & Creative",
    kpis: [
      { label: "In production", value: "34", up: true, delta: "▲ +6 this week" },
      { label: "Published", value: "128", up: true, delta: "▲ +12 vs last month" },
      { label: "On-brand score", value: "96%", up: true, delta: "▲ +2 pts" },
      { label: "Formats live", value: "9", delta: "articles · social · video" },
    ],
    rows: [
      { label: "Q3 launch announcement", status: "Published", tone: "live" },
      { label: "Founder thread: thesis", status: "In review", tone: "review" },
      { label: "Explainer script v2", status: "Drafting", tone: "draft" },
    ],
  },
  {
    name: "Marketing",
    slug: "marketing",
    pre: "Marketi",
    post: "g",
    vertical: "Marketing & Distribution",
    Icon: Megaphone,
    ramp: "600",
    headline: "Reach the right audiences, then compound the reach.",
    desc: "Create, run and manage campaigns and distribution from one place. The right message reaches the right channels in the right language, and every result makes the next one sharper.",
    breadcrumb: "Distribution",
    title: "Campaigns & Distribution",
    subtitle: "Marketing & Distribution",
    kpis: [
      { label: "Active campaigns", value: "7", up: true, delta: "▲ +2 this month" },
      { label: "Reach", value: "1.4M", up: true, delta: "▲ +18% MoM" },
      { label: "CTR", value: "3.2%", up: true, delta: "▲ +0.4 pts" },
      { label: "Channels live", value: "11", delta: "social · email · paid" },
    ],
    rows: [
      { label: "Mainnet push: paid + organic", status: "Live", tone: "live" },
      { label: "Newsletter sequence", status: "Scheduling", tone: "review" },
      { label: "Partner co-marketing", status: "Drafting", tone: "draft" },
    ],
  },
  {
    name: "Operations",
    slug: "operations",
    pre: "Operatio",
    post: "s",
    vertical: "Operations & Support",
    Icon: Workflow,
    ramp: "900",
    headline: "Grow without the ops breaking underneath you.",
    desc: "Automate workflows, handle support and manage internal SOPs and processes from one place, with approvals and human review built in where they matter.",
    breadcrumb: "Operations",
    title: "Operations & Support",
    subtitle: "Operations & Support",
    kpis: [
      { label: "Workflows", value: "42", up: true, delta: "▲ +8 automated" },
      { label: "Tickets resolved", value: "318", up: true, delta: "▲ 94% in SLA" },
      { label: "Avg. handle time", value: "6m", up: true, delta: "▼ faster MoM" },
      { label: "Approvals queued", value: "3", delta: "awaiting sign-off" },
    ],
    rows: [
      { label: "Onboarding flow: automated", status: "Live", tone: "live" },
      { label: "Support macro refresh", status: "In review", tone: "review" },
      { label: "Internal ops runbook", status: "Drafting", tone: "draft" },
    ],
  },
  {
    name: "Finance",
    slug: "finance",
    pre: "Fina",
    post: "ce",
    vertical: "Finance & Growth",
    Icon: TrendingUp,
    ramp: "400",
    headline: "Every finance function, in one place.",
    desc: "Invoicing to bookkeeping, treasury to fundraising, forecasting to cap table, all running on one set of numbers, with audit trails and approvals built in wherever money moves.",
    breadcrumb: "Investor Room",
    title: "Finance & Growth",
    subtitle: "Finance & Growth",
    kpis: [
      { label: "Dataroom views", value: "212", up: true, delta: "▲ +34 this week" },
      { label: "Deck versions", value: "4", delta: "seed · bridge · A" },
      { label: "Pipeline", value: "$18M", up: true, delta: "▲ +3 new investors" },
      { label: "Model health", value: "Green", delta: "assumptions current" },
    ],
    rows: [
      { label: "Series A deck: final", status: "Published", tone: "live" },
      { label: "Tokenomics model v3", status: "In review", tone: "review" },
      { label: "Quarterly investor update", status: "Drafting", tone: "draft" },
    ],
  },
  {
    name: "Intelligence",
    slug: "intelligence",
    pre: "Intellige",
    post: "ce",
    vertical: "Intelligence",
    Icon: Radar,
    ramp: "800",
    headline: "Sense the market and inform every decision.",
    desc: "Turn market, competitor and on-chain signals into research and diligence your team can act on early, feeding sharper decisions across every vertical when timing matters most.",
    breadcrumb: "Narrative Radar",
    title: "Market Intelligence",
    subtitle: "Intelligence",
    kpis: [
      { label: "Signals tracked", value: "1,240", up: true, delta: "▲ live feed" },
      { label: "Reports", value: "16", up: true, delta: "▲ +3 this month" },
      { label: "Competitors", value: "28", delta: "monitored daily" },
      { label: "Alerts", value: "5", delta: "needs review" },
    ],
    rows: [
      { label: "Sector landscape: Q3", status: "Published", tone: "live" },
      { label: "Diligence: target acquisition", status: "In review", tone: "review" },
      { label: "On-chain anomaly brief", status: "Drafting", tone: "draft" },
    ],
  },
  {
    name: "Communication",
    slug: "communication",
    pre: "Communicatio",
    post: "",
    vertical: "Comms & Reputation",
    Icon: MessagesSquare,
    ramp: "700",
    headline: "Own the narrative across press, community and reputation.",
    desc: "Coordinate PR, announcements and community from one place, so your voice stays consistent everywhere, especially under pressure.",
    breadcrumb: "Comms Desk",
    title: "Comms & Reputation",
    subtitle: "Comms & Reputation",
    kpis: [
      { label: "Media network", value: "75+", delta: "outlets on tap" },
      { label: "Placements", value: "23", up: true, delta: "▲ +5 this quarter" },
      { label: "Share of voice", value: "31%", up: true, delta: "▲ +4 pts" },
      { label: "Response time", value: "18m", up: true, delta: "▼ faster vs SLA" },
    ],
    rows: [
      { label: "Funding round: embargoed release", status: "Approved", tone: "live" },
      { label: "Community AMA brief", status: "In review", tone: "review" },
      { label: "Reputation watch: daily digest", status: "Drafting", tone: "draft" },
    ],
  },
];

// ── EXPERIMENTAL per-product palette (off-spec, option 2) ────────────────────
// Six muted, evergreen-compatible hues — one IS the brand green, the other five
// are desaturated neighbours picked to harmonise with it (no neon, no third-party
// brand colors). `tile` = squircle + left-pane ground (white icon, AA ≥3:1 as a
// graphic); `tint` = soft active-tab + copy-pane background; `accent` = the
// darker, AA ≥4.5:1 text colour for eyebrow / active label / "Learn more".
// Inline-styled (not Tailwind tokens) so it stays easy to revert or, if approved,
// promote into tailwind.config.ts as real tokens.
const PALETTE: Record<string, { tile: string; tint: string; accent: string }> = {
  content: { tile: "#16726B", tint: "#E6F1F0", accent: "#125C57" }, // teal
  marketing: { tile: "#355C86", tint: "#EAEFF6", accent: "#2B4C70" }, // steel blue
  communication: { tile: "#87691F", tint: "#F2EEE1", accent: "#6F551A" }, // muted bronze
  finance: { tile: "#5E4B8B", tint: "#EDEBF5", accent: "#4C3D71" }, // muted violet
  intelligence: { tile: "#A1574A", tint: "#F5E9E6", accent: "#84473C" }, // clay
  operations: { tile: "#1F6B4C", tint: "#EAF3EE", accent: "#1A5A40" }, // evergreen (brand)
};

const LAST = PRODUCTS.length - 1;

// ── Preview shell ────────────────────────────────────────────────────────────
// A thin shared frame keeps the six previews reading as one product family; the
// BODY is bespoke per product. Same fixed size as the old DashboardFrame so it
// still floats + bleeds off the tinted ground identically.

// ScaledPreview — renders children at 1.5× native size then CSS-scales to 0.667×.
// The browser rasterizes text at the larger native size before the GPU compositing
// step, giving ~50% more pixels per glyph at the same visual size → crisp on 1x displays.
// Display area: 840×460. Native render area: 1260×690.
// Centered "Coming soon" pill overlaid on the blurred center+right region of a
// teased preview. Sized to span both columns (after the 156px LeftRail) inside
// the relative grid wrapper.
function TeaseOverlay() {
  return null;
}

function ScaledPreview({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[460px] w-[840px] max-w-none overflow-hidden">
      <div
        style={{
          transform: "scale(0.6667)",
          transformOrigin: "top left",
          width: 1260,
          height: 690,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MiniApp({
  name,
  search,
  subnav,
  children,
}: {
  name: string;
  search: string;
  // string[] = simple text tabs (first is active); ReactNode = fully custom row.
  subnav: string[] | React.ReactNode;
  children: React.ReactNode;
}) {
  // Renders at 1260×690 (1.5× the 840×460 display size) — always used inside
  // ScaledPreview which CSS-scales it back down. All internal sizes are 1.5× their
  // apparent visual size so they render at more pixels before the scale.
  return (
    <div className="flex h-[690px] w-[1260px] flex-col overflow-hidden rounded-[18px] bg-paper text-ink-900 shadow-pop ring-1 ring-black/5">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-line px-6 py-[15px]">
        <div className="flex items-center gap-3">
          <NMark size={33} tone="light" />
          <span className="text-[18px] font-semibold text-ink-900">{name}</span>
          <span className="ml-1.5 flex items-center gap-1.5 text-[15px] text-success">
            <span className="h-[9px] w-[9px] rounded-full bg-success motion-safe:animate-pulse" />
            Live
          </span>
        </div>
        <div className="hidden h-[39px] w-[270px] items-center gap-3 rounded-[12px] bg-sunken px-4 sm:flex">
          <Search size={16} className="text-ink-300" />
          <span className="truncate text-[16px] text-ink-300">{search}</span>
        </div>
      </div>
      {/* Sub-nav */}
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        {Array.isArray(subnav)
          ? subnav.map((s, i) => (
              <span
                key={s}
                className={`rounded-[10px] px-4 py-1.5 text-[16px] ${
                  i === 0
                    ? "bg-green-50 font-semibold text-green-600"
                    : "text-ink-500"
                }`}
              >
                {s}
              </span>
            ))
          : subnav}
      </div>
      {/* Bespoke body */}
      <div className="min-h-0 flex-1 overflow-hidden p-6">{children}</div>
    </div>
  );
}

// Monochrome channel marks (logos rendered in ink, not their brand colors — §1.7).
const CHANNELS: { label: string; d: string }[] = [
  {
    label: "X",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Telegram",
    d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  },
  {
    label: "YouTube",
    d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    label: "Discord",
    d: "M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2096 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2095 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9462 2.4189-2.1568 2.4189Z",
  },
];

// Content → a brand-memory article editor: left product rail, a center draft editor
// showing the AI writing from brand context, and a right queue + on-brand score.
// The center piece deliberately shows the memory strip — "most AI writers forget;
// Content remembers" — so the preview communicates the moat, not just the output.
function ContentPreview() {
  const navTabs: { label: string; Icon: LucideIcon }[] = [
    { label: "Studio", Icon: PenLine },
    { label: "Calendar", Icon: Calendar },
    { label: "Briefs", Icon: FileText },
    { label: "Brand Memory", Icon: BookMarked },
    { label: "Formats", Icon: LayoutTemplate },
    { label: "Education", Icon: BookOpen },
    { label: "Social", Icon: Share2 },
    { label: "Email", Icon: Mail },
    { label: "Video", Icon: Film },
    { label: "Audio", Icon: Mic },
    { label: "Localization", Icon: Globe },
    { label: "SEO", Icon: Search },
    { label: "Approvals", Icon: CheckCheck },
    { label: "Analytics", Icon: BarChart3 },
  ];

  const queue = [
    { label: "Editor Approved Draft", status: "Published", tone: "live" as const, when: "Today, 9:00 AM" },
    { label: "Founder thread: thesis", status: "In review", tone: "review" as const, when: "Today, 2:30 PM" },
    { label: "Explainer script v2", status: "Drafting", tone: "draft" as const, when: "Tomorrow" },
    { label: "Monthly Newsletter Content", status: "In review", tone: "review" as const, when: "Wed, Jun 18" },
    { label: "Blog 21", status: "Drafting", tone: "draft" as const, when: "Fri, Jun 20" },
  ];

  const toneColors = {
    live: "bg-success/10 text-success",
    review: "bg-warning/10 text-warning",
    draft: "bg-sunken text-ink-500",
  };

  // Brand memory source chips — shown at the bottom of the editor to surface the
  // "Content remembers" moat. Labels are KB-confirmed content types, not invented.
  const memorySources = ["Tone guide", "Positioning doc", "Case study", "+9"];

  return (
    <MiniApp
      name="Content"
      search="Search content…"
      subnav={
        <div className="flex w-full max-w-[840px] items-center gap-1.5">
          {[
            { label: "Studio", count: null as number | null },
            { label: "Queue", count: 34 },
            { label: "Drafts", count: 8 },
            { label: "Approvals", count: 2 },
          ].map((t, i) => (
            <span
              key={t.label}
              className={`flex items-center gap-2 rounded-[10px] px-4 py-1.5 text-[16px] ${
                i === 0
                  ? "bg-green-50 font-semibold text-green-600"
                  : "text-ink-500"
              }`}
            >
              {t.label}
              {t.count !== null && (
                <span
                  className={`flex h-[21px] min-w-[21px] items-center justify-center rounded-full px-1.5 text-[13px] font-semibold ${
                    i === 0
                      ? "bg-green-500 text-white"
                      : "bg-sunken text-ink-500"
                  }`}
                >
                  {t.count}
                </span>
              )}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-[10px] border border-line bg-paper px-3 py-1.5 text-[15px] font-medium text-ink-500 sm:inline-flex">
              <FileText size={15} aria-hidden />
              New brief
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-green-500 px-4 py-1.5 text-[15px] font-semibold text-white shadow-card">
              <PenLine size={15} aria-hidden />
              New piece
            </span>
          </span>
        </div>
      }
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid min-h-0 flex-1 grid-cols-[140px_480px_280px] gap-4">
          {/* Left product nav rail */}
          <div className="flex flex-col gap-0.5 rounded-[18px] border border-line bg-surface p-2">
            <p className="px-2 pb-1 text-[13px] font-medium uppercase tracking-wide text-ink-300">
              Content
            </p>
            {navTabs.map((t, i) => (
              <span
                key={t.label}
                className={`flex items-center gap-2 rounded-[10px] px-2 py-1 text-[15px] leading-tight ${
                  i === 0
                    ? "bg-green-50 font-semibold text-green-600"
                    : "text-ink-500"
                }`}
              >
                <t.Icon size={16} aria-hidden />
                <span
                  aria-hidden={i >= 7 || undefined}
                  className={i >= 7 ? "select-none blur-[3.5px]" : ""}
                >
                  {t.label}
                </span>
              </span>
            ))}
          </div>

          {/* Center — article editor showing a draft in progress */}
          <div className="flex w-full flex-col rounded-[18px] border border-line bg-paper p-4">
            {/* Doc meta row */}
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-[8px] bg-green-50 px-2 py-1 text-[13px] font-semibold text-green-600">
                Founder thread
              </span>
              <span className="text-[13px] text-ink-300">· Drafting</span>
            </div>
            {/* Article title */}
            <p className="text-[19px] font-semibold leading-snug text-ink-900">
              Why AI Needs Brand Memory
            </p>
            {/* Draft body — partial, mid-sentence, caret at end */}
            <div className="mt-3 flex-1 text-[16px] leading-[1.6] text-ink-700">
              <p>
                Most AI writing tools approach content as a one-time task: they generate,
                and then forget. Every new prompt starts from zero.
              </p>
              <p className="mt-2">
                The result: a brand that sounds like a dozen different people. Inconsistent
                claims, drifting tone and terminology that shifts between{" "}
                <span className="inline-block h-[19px] w-[2px] translate-y-[1px] bg-green-500 align-middle motion-safe:animate-pulse" />
              </p>
            </div>
            {/* Brand Memory strip — the moat, shown in-editor */}
            <div className="mt-4 rounded-[13px] border border-green-200 bg-green-50 p-3">
              <div className="mb-2 flex items-center gap-2">
                <BookMarked size={15} className="text-green-600" aria-hidden />
                <p className="text-[13px] font-semibold text-green-700">
                  Brand Memory · 12 sources active
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {memorySources.map((s) => (
                  <span
                    key={s}
                    className="rounded-[8px] bg-white/80 px-2 py-1 text-[13px] font-medium text-green-700 ring-1 ring-green-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — content queue + on-brand score */}
          <div className="flex min-h-0 flex-col gap-3">
            <p className="text-[15px] font-medium uppercase tracking-wide text-ink-300">
              Queue
            </p>
            {/* Scrollable queue */}
            <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
              {queue.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-[15px] border border-line bg-paper px-3 py-1.5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-medium text-ink-700">
                      {item.label}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={`inline-block rounded-[6px] px-1.5 py-px text-[13px] font-semibold ${toneColors[item.tone]}`}
                      >
                        {item.status}
                      </span>
                      <span className="text-[13px] text-ink-300">{item.when}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Health — compact two-stat strip */}
            <div className="flex items-center justify-between rounded-[13px] border border-line bg-surface px-4 py-3">
              <div>
                <p className="text-[19px] font-semibold leading-none text-ink-900">96%</p>
                <p className="mt-1 text-[13px] text-ink-300">On-brand <span className="font-medium text-success">▲ +2 pts</span></p>
              </div>
              <div className="h-9 w-px bg-line" />
              <div>
                <p className="text-[19px] font-semibold leading-none text-ink-900">34</p>
                <p className="mt-1 text-[13px] text-ink-300">In production <span className="font-medium text-success">▲ +6</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MiniApp>
  );
}

// Marketing → a composer with a left product rail, a square post creative, and a
// multi-channel publish bar (the post goes to X, LinkedIn, and more, not just one).
function MarketingPreview() {
  // Marketing rail — grouped by what the Product KB §7 confirms Marketing does:
  // plan (Campaigns, Calendar) · people (Audiences, Channels) ·
  // reach (Ads, Email, SEO) · GEO (the AI-search wedge — KB §3 + §9 use case 2) ·
  // web (Landing) · crypto-native mechanics (Quests w/ anti-sybil, Affiliates/KOLs) ·
  // moments (Events) · test-and-learn (Automations, Experiments) · results (Performance).
  // Campaigns stays the active tab.
  const navTabs: { label: string; Icon: LucideIcon }[] = [
    { label: "Campaigns", Icon: Megaphone },
    { label: "Calendar", Icon: Calendar },
    { label: "Audiences", Icon: Users },
    { label: "Channels", Icon: Share2 },
    { label: "Ads", Icon: Target },
    { label: "Email", Icon: Mail },
    { label: "SEO", Icon: Search },
    { label: "GEO", Icon: Sparkles },
    { label: "Landing", Icon: LayoutTemplate },
    { label: "Quests", Icon: Trophy },
    { label: "Affiliates", Icon: Star },
    { label: "Events", Icon: Mic },
    { label: "Automations", Icon: Zap },
    { label: "Experiments", Icon: FlaskConical },
    { label: "Performance", Icon: BarChart3 },
  ];
  // Upcoming posts, each tagged with the channel it ships to (index into CHANNELS).
  const upcoming = [
    { ch: 0, title: "Mainnet thread", when: "4:00 PM" },
    { ch: 1, title: "Q3 hiring push", when: "Tomorrow" },
    { ch: 2, title: "Forbes PR Review", when: "Wed" },
    { ch: 3, title: "User Acquisition Report, Asia", when: "Fri" },
  ];
  const metrics = [
    { label: "Reach", value: "1.4M", delta: "+18%" },
    { label: "Engagement", value: "3.2%", delta: "+0.4" },
  ];
  return (
    <MiniApp
      name="Marketing"
      search="Search campaigns…"
      subnav={
        <div className="flex w-full max-w-[840px] items-center gap-1.5">
          {[
            { label: "Compose", count: null as number | null },
            { label: "Queue", count: 12 },
            { label: "Drafts", count: 5 },
            { label: "Approvals", count: 3 },
          ].map((t, i) => (
            <span
              key={t.label}
              className={`flex items-center gap-2 rounded-[10px] px-4 py-1.5 text-[16px] ${
                i === 0
                  ? "bg-green-50 font-semibold text-green-600"
                  : "text-ink-500"
              }`}
            >
              {t.label}
              {t.count !== null && (
                <span
                  className={`flex h-[21px] min-w-[21px] items-center justify-center rounded-full px-1.5 text-[13px] font-semibold ${
                    i === 0
                      ? "bg-green-500 text-white"
                      : "bg-sunken text-ink-500"
                  }`}
                >
                  {t.count}
                </span>
              )}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-[10px] border border-line bg-paper px-3 py-1.5 text-[15px] font-medium text-ink-500 sm:inline-flex">
              <Calendar size={15} aria-hidden />
              Schedule
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-green-500 px-4 py-1.5 text-[15px] font-semibold text-white shadow-card">
              <PenLine size={15} aria-hidden />
              New post
            </span>
          </span>
        </div>
      }
    >
      {/* Only the left ~610px of the 840px display is visible (the rest bleeds off
          under the copy pane). Content sits in three columns packed to the left. */}
      <div className="flex h-full flex-col gap-4">
        <div className="grid min-h-0 flex-1 grid-cols-[140px_480px_280px] gap-4">
          {/* Left product nav rail */}
          <div className="flex flex-col gap-0.5 rounded-[18px] border border-line bg-surface p-2">
            <p className="px-2 pb-1 text-[13px] font-medium uppercase tracking-wide text-ink-300">
              Marketing
            </p>
            {navTabs.map((t, i) => (
              <span
                key={t.label}
                className={`flex items-center gap-2 rounded-[10px] px-2 py-1 text-[15px] leading-tight ${
                  i === 0
                    ? "bg-green-50 font-semibold text-green-600"
                    : "text-ink-500"
                }`}
              >
                <t.Icon size={16} aria-hidden />
                <span
                  aria-hidden={i >= 7 || undefined}
                  className={i >= 7 ? "select-none blur-[3.5px]" : ""}
                >
                  {t.label}
                </span>
              </span>
            ))}
          </div>

          {/* Composer: the post preview */}
          <div className="flex w-full flex-col rounded-[18px] border border-line bg-paper p-4">
            <div className="flex items-center gap-3">
              <NMark size={42} tone="light" />
              <div className="leading-tight">
                <p className="text-[16px] font-semibold text-ink-900">
                  Narrations
                </p>
                <p className="text-[13px] text-ink-300">@narrations · 2h</p>
              </div>
            </div>
            <p className="mt-3 text-[16px] leading-[1.45] text-ink-700">
              Honored to be named Best Creative Agency. Post and visual made in
              Narrations.
            </p>
            <img
              src="/showcase/marketing-creative.webp"
              alt="The Narrations team on stage accepting the Best Creative Agency award, a visual generated inside Narrations."
              width={1200}
              height={675}
              loading="lazy"
              className="mt-3 aspect-video w-full rounded-[15px] border border-line object-cover [filter:contrast(1.08)_saturate(1.06)] [image-rendering:auto]"
            />
            <div className="mt-3">
              <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Publishing to all channels
              </p>
              <div className="flex items-center gap-1.5">
                {CHANNELS.map((c, i) => (
                  <span
                    key={c.label}
                    title={c.label}
                    className={`flex h-9 w-9 items-center justify-center rounded-[9px] border ${
                      i === 0
                        ? "border-green-200 bg-green-50 text-green-600"
                        : "border-line bg-paper text-ink-700"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d={c.d} />
                    </svg>
                  </span>
                ))}
                <span className="flex h-9 items-center rounded-[9px] border border-line bg-paper px-2 text-[13px] font-medium text-ink-500">
                  +2
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-5 text-ink-300">
              <span className="flex items-center gap-1.5 text-[15px]">
                <Heart size={16} aria-hidden />
                248
              </span>
              <span className="flex items-center gap-1.5 text-[15px]">
                <Repeat2 size={16} aria-hidden />
                56
              </span>
              <span className="flex items-center gap-1.5 text-[15px]">
                <MessageCircle size={16} aria-hidden />
                31
              </span>
            </div>
          </div>

          {/* Right column — dense marketing-dashboard widgets so no dead space */}
          <div className="flex min-h-0 flex-col gap-3">
            {/* This-week KPI strip (3 across) */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Reach", value: "1.4M", delta: "▲ +18%" },
                { label: "Engagement", value: "3.2%", delta: "▲ +0.4" },
                { label: "CTR", value: "2.6%", delta: "▲ +0.3" },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-[12px] border border-line bg-surface px-2.5 py-2"
                >
                  <p className="text-[11px] uppercase tracking-wide text-ink-300">
                    {k.label}
                  </p>
                  <p className="mt-1 text-[18px] font-semibold leading-none text-ink-900">
                    {k.value}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-success">
                    {k.delta}
                  </p>
                </div>
              ))}
            </div>

            {/* Upcoming queue — compact rows, no vertical stretch */}
            <div className="rounded-[14px] border border-line p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Upcoming
                </p>
                <span className="text-[11px] text-ink-300">12 scheduled</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {upcoming.map((u) => (
                  <div
                    key={u.title}
                    className="flex items-center gap-2.5 rounded-[10px] bg-sunken/40 px-2.5 py-1.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-paper text-ink-700 ring-1 ring-line">
                      <svg
                        viewBox="0 0 24 24"
                        width="13"
                        height="13"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d={CHANNELS[u.ch].d} />
                      </svg>
                    </span>
                    <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink-700">
                      {u.title}
                    </p>
                    <span className="shrink-0 text-[11px] text-ink-300">{u.when}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Channel mix — horizontal bars from the same CHANNELS source */}
            <div className="rounded-[14px] border border-line p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Channel mix
                </p>
                <span className="text-[11px] text-ink-300">last 7d</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { ch: 0, label: "X",        pct: 38 },
                  { ch: 1, label: "LinkedIn", pct: 24 },
                  { ch: 2, label: "Telegram", pct: 18 },
                  { ch: 3, label: "YouTube",  pct: 12 },
                  { ch: 4, label: "Discord",  pct:  8 },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-ink-500">
                      <svg
                        viewBox="0 0 24 24"
                        width="11"
                        height="11"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d={CHANNELS[r.ch].d} />
                      </svg>
                    </span>
                    <span className="w-[64px] shrink-0 text-[12px] text-ink-700">
                      {r.label}
                    </span>
                    <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-sunken">
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-green-500"
                        style={{ width: `${r.pct}%` }}
                      />
                    </span>
                    <span className="w-[34px] shrink-0 text-right text-[11px] font-medium tabular-nums text-ink-700">
                      {r.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top performer — small spotlight card */}
            <div className="flex items-center gap-3 rounded-[14px] border border-line bg-green-50/60 p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-green-500 text-white">
                <Trophy size={16} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-ink-900">
                  Mainnet thread · top performer
                </p>
                <p className="text-[11px] text-ink-500">
                  248 likes · 56 reposts · ER 4.7%
                </p>
              </div>
            </div>

            {/* Audience snapshot — splits the engaged audience by segment */}
            <div className="rounded-[14px] border border-line p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Audience
                </p>
                <span className="text-[11px] text-ink-300">engaged · 30d</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "Builders", value: "48%" },
                  { label: "Investors", value: "31%" },
                  { label: "Community", value: "21%" },
                ].map((s) => (
                  <div key={s.label} className="rounded-[10px] bg-sunken/50 px-1.5 py-1.5">
                    <p className="text-[14px] font-semibold leading-none text-ink-900">
                      {s.value}
                    </p>
                    <p className="mt-1 text-[10px] text-ink-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MiniApp>
  );
}

// Shared tone-chip map — same semantics as Content/Marketing's local copy.
const TONE_COLORS = {
  live: "bg-success/10 text-success",
  review: "bg-warning/10 text-warning",
  draft: "bg-sunken text-ink-500",
} as const;
type Tone = keyof typeof TONE_COLORS;

// SubnavTabs — the same 4-pill + 2-button row Content and Marketing inline.
// Extracted only because the four new previews use identical structure; the
// existing two callers still inline their own to keep prior bytes untouched.
function SubnavTabs({
  tabs,
  secondary,
  primary,
}: {
  tabs: { label: string; count?: string | number | null }[];
  secondary: { label: string; Icon: LucideIcon };
  primary: { label: string; Icon: LucideIcon };
}) {
  return (
    <div className="flex w-full max-w-[840px] items-center gap-1.5">
      {tabs.map((t, i) => (
        <span
          key={t.label}
          className={`flex items-center gap-2 rounded-[10px] px-4 py-1.5 text-[16px] ${
            i === 0
              ? "bg-green-50 font-semibold text-green-600"
              : "text-ink-500"
          }`}
        >
          {t.label}
          {t.count != null && (
            <span
              className={`flex h-[21px] min-w-[21px] items-center justify-center rounded-full px-1.5 text-[13px] font-semibold ${
                i === 0 ? "bg-green-500 text-white" : "bg-sunken text-ink-500"
              }`}
            >
              {t.count}
            </span>
          )}
        </span>
      ))}
      <span className="ml-auto flex items-center gap-2">
        <span className="hidden items-center gap-1.5 rounded-[10px] border border-line bg-paper px-3 py-1.5 text-[15px] font-medium text-ink-500 sm:inline-flex">
          <secondary.Icon size={15} aria-hidden />
          {secondary.label}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-green-500 px-4 py-1.5 text-[15px] font-semibold text-white shadow-card">
          <primary.Icon size={15} aria-hidden />
          {primary.label}
        </span>
      </span>
    </div>
  );
}

// LeftRail — 12 nav items, first active. Same shape Content/Marketing use.
function LeftRail({
  eyebrow,
  items,
}: {
  eyebrow: string;
  items: { label: string; Icon: LucideIcon }[];
}) {
  return (
    <div className="flex flex-col gap-0.5 rounded-[18px] border border-line bg-surface p-2">
      <p className="px-2 pb-1 text-[13px] font-medium uppercase tracking-wide text-ink-300">
        {eyebrow}
      </p>
      {items.map((t, i) => (
        <span
          key={t.label}
          className={`flex items-center gap-2 rounded-[10px] px-2 py-1 text-[15px] leading-tight ${
            i === 0
              ? "bg-green-50 font-semibold text-green-600"
              : "text-ink-500"
          }`}
        >
          <t.Icon size={16} aria-hidden />
          <span
            aria-hidden={i >= 7 || undefined}
            className={i >= 7 ? "select-none blur-[3.5px]" : ""}
          >
            {t.label}
          </span>
        </span>
      ))}
    </div>
  );
}

// MoatStrip — the green-tinted differentiator strip at the bottom of the
// center column. Mirrors Content's Brand Memory strip exactly.
function MoatStrip({
  Icon,
  label,
  chips,
}: {
  Icon: LucideIcon;
  label: string;
  chips: string[];
}) {
  return (
    <div className="mt-3 rounded-[13px] border border-green-200 bg-green-50 p-3">
      <div className="mb-2 flex items-center gap-2">
        <Icon size={15} className="text-green-600" aria-hidden />
        <p className="text-[13px] font-semibold text-green-700">{label}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((s) => (
          <span
            key={s}
            className="rounded-[8px] bg-white/80 px-2 py-1 text-[13px] font-medium text-green-700 ring-1 ring-green-200"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// QueueRail — right-column queue list + 2-stat health strip.
function QueueRail({
  eyebrow,
  rows,
  stats,
}: {
  eyebrow: string;
  rows: { label: string; status: string; tone: Tone; when: string }[];
  stats: { value: string; label: string; delta?: string; up?: boolean }[];
}) {
  return (
    <div className="flex min-h-0 flex-col gap-3">
      <p className="text-[15px] font-medium uppercase tracking-wide text-ink-300">
        {eyebrow}
      </p>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
        {rows.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-3 rounded-[15px] border border-line bg-paper px-3 py-1.5"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-medium text-ink-700">
                {item.label}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`inline-block rounded-[6px] px-1.5 py-px text-[13px] font-semibold ${TONE_COLORS[item.tone]}`}
                >
                  {item.status}
                </span>
                <span className="text-[13px] text-ink-300">{item.when}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-[13px] border border-line bg-surface px-4 py-3">
        {stats.map((s, i) => (
          <div key={s.label} className="flex items-center">
            {i > 0 && <div className="mx-3 h-9 w-px bg-line" />}
            <div>
              <p className="text-[19px] font-semibold leading-none text-ink-900">
                {s.value}
              </p>
              <p className="mt-1 text-[13px] text-ink-300">
                {s.label}{" "}
                {s.delta && (
                  <span className="font-medium text-success">{s.delta}</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── OPERATIONS ───────────────────────────────────────────────────────────────
// Right-rail used by OperationsPreview — mirrors the §3 cockpit OpsRail
// (Activity & triage · Today's tasks · System status). Static illustrative
// chrome, no real client data.
type OpsPriority = "High" | "Medium" | "Low";
const OPS_TRIAGE: { item: string; state: string; pr: OpsPriority }[] = [
  { item: "Campaign approval", state: "pending", pr: "High" },
  { item: "KYC review", state: "queued", pr: "High" },
  { item: "Competitor launch", state: "detected", pr: "Medium" },
  { item: "Security scan", state: "flagged", pr: "High" },
  { item: "Usage ticket", state: "new", pr: "Low" },
  { item: "Onboarding SOP", state: "in progress", pr: "Low" },
  { item: "Sales lead", state: "new", pr: "Medium" },
];
const OPS_PR_CLS: Record<OpsPriority, string> = {
  High: "bg-danger/10 text-danger",
  Medium: "bg-warning/15 text-warning",
  Low: "bg-sunken text-ink-500",
};
const OPS_TASKS_DONE = 12;
const OPS_TASKS_TOTAL = 15;

function OpsTasksRing() {
  const r = 42;
  const c = 2 * Math.PI * r;
  const off = c * (1 - OPS_TASKS_DONE / OPS_TASKS_TOTAL);
  return (
    <svg viewBox="0 0 110 110" className="h-[72px] w-[72px] shrink-0" aria-hidden>
      <circle cx="55" cy="55" r={r} fill="none" className="stroke-line" strokeWidth="9" />
      <circle
        cx="55"
        cy="55"
        r={r}
        fill="none"
        className="stroke-green-500"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={off}
        transform="rotate(-90 55 55)"
      />
      <text x="55" y="52" textAnchor="middle" className="fill-ink-900 text-[18px] font-bold">
        {OPS_TASKS_DONE}/{OPS_TASKS_TOTAL}
      </text>
      <text x="55" y="68" textAnchor="middle" className="fill-ink-500 text-[9px]">
        done
      </text>
    </svg>
  );
}

function OpsTriageRail() {
  return (
    <aside className="flex flex-col gap-3">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
          Operations &amp; Support
        </p>
      </div>
      <div className="rounded-[12px] border border-line p-3">
        <p className="text-[13px] font-semibold text-ink-900">Activity &amp; triage</p>
        <ul className="mt-2 space-y-1">
          {OPS_TRIAGE.map(({ item, state, pr }) => (
            <li key={item} className="flex items-center gap-2">
              <span className="min-w-0 flex-1 truncate text-[12px] text-ink-700">
                <span className="font-medium text-ink-900">{item}</span>
                <span className="text-ink-300">: {state}</span>
              </span>
              <span
                className={`shrink-0 rounded-full px-1.5 py-[1px] text-[10px] font-medium ${OPS_PR_CLS[pr]}`}
              >
                {pr}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-3 rounded-[12px] border border-line p-3">
        <OpsTasksRing />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-ink-900">Today&rsquo;s tasks</p>
          <p className="mt-1 text-[11px] leading-4 text-ink-500">
            All high-priority cleared, 3 routine left.
          </p>
        </div>
      </div>
      <div className="rounded-[12px] border border-line p-3">
        <p className="text-[11px] leading-4 text-ink-500">
          All systems operational · 3 campaigns live · 2 deals in motion
        </p>
      </div>
    </aside>
  );
}

function OperationsPreview() {
  const rail: { label: string; Icon: LucideIcon }[] = [
    { label: "Support", Icon: Headset },
    { label: "Approvals", Icon: ShieldCheck },
    { label: "SOPs", Icon: FileText },
    { label: "Workflow", Icon: Workflow },
    { label: "Reporting", Icon: BarChart3 },
    { label: "HR & Employer", Icon: Users },
    { label: "Legal & Compliance", Icon: Scale },
    { label: "Onboarding", Icon: UserPlus },
    { label: "Training", Icon: GraduationCap },
    { label: "Customer Success", Icon: HeartHandshake },
    { label: "Macros", Icon: Zap },
    { label: "Knowledge Base", Icon: BookOpen },
  ];
  return (
    <MiniApp
      name="Operations"
      search="Search tickets, SOPs, approvals…"
      subnav={
        <SubnavTabs
          tabs={[
            { label: "Support", count: 42 },
            { label: "Approvals", count: 5 },
            { label: "SOPs", count: 28 },
            { label: "Onboarding", count: 3 },
          ]}
          secondary={{ label: "Open queue", Icon: Inbox }}
          primary={{ label: "New macro", Icon: Zap }}
        />
      }
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid min-h-0 flex-1 grid-cols-[156px_minmax(0,1fr)_300px] gap-4">
          <LeftRail eyebrow="Operations" items={rail} />
          {/* Center — compact 4-week calendar + KPI strip + in-flight queue */}
          <div className="flex w-full flex-col gap-3 rounded-[18px] border border-line bg-paper p-4">
            <OperationsCalendar phase="done" cellHeight={54} />

            {/* KPI strip — uses the vertical space the smaller calendar frees */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { Icon: CheckCircle2, value: "98.4%", label: "SLA last 24h", delta: "▲ +0.6 pts" },
                { Icon: Activity, value: "186", label: "Workflows ran today", delta: "▲ +12" },
                { Icon: Clock, value: "4m 12s", label: "Avg handle time", delta: "▼ −38s" },
              ].map(({ Icon, value, label, delta }) => (
                <div
                  key={label}
                  className="rounded-[10px] border border-line bg-sunken/40 px-2.5 py-2"
                >
                  <div className="flex items-center gap-1.5 text-ink-500">
                    <Icon size={11} strokeWidth={2} aria-hidden />
                    <span className="text-[10px] uppercase tracking-wide">{label}</span>
                  </div>
                  <p className="mt-1 text-[16px] font-semibold leading-none text-ink-900">
                    {value}
                  </p>
                  <p className="mt-1 text-[10px] text-success">{delta}</p>
                </div>
              ))}
            </div>

            {/* In flight — quick "what's running right now" snapshot */}
            <div className="rounded-[10px] border border-line p-2.5">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-[11px] font-semibold text-ink-900">In flight now</p>
                <span className="text-[10px] text-ink-300">6 workflows · 2 awaiting approval</span>
              </div>
              <ul className="space-y-1">
                {[
                  { label: "Partner onboarding · step 4 of 6", tone: "live" as const, when: "running" },
                  { label: "KYC review · batch #218", tone: "review" as const, when: "awaiting approval" },
                  { label: "Disclosure language · legal sweep", tone: "draft" as const, when: "drafting" },
                ].map((r) => (
                  <li key={r.label} className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        r.tone === "live"
                          ? "bg-success motion-safe:animate-pulse"
                          : r.tone === "review"
                            ? "bg-warning"
                            : "bg-ink-300"
                      }`}
                    />
                    <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink-700">
                      {r.label}
                    </span>
                    <span className="shrink-0 text-[10px] text-ink-300">{r.when}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <OpsTriageRail />
        </div>
      </div>
    </MiniApp>
  );
}

// ── FINANCE ──────────────────────────────────────────────────────────────────
// Moat: investor materials + dataroom + token model on one brand memory,
// productized from a real $25M+ AUM institutional IR stack (KB §4 §11).
function FinancePreview() {
  const rail: { label: string; Icon: LucideIcon }[] = [
    { label: "Invoicing", Icon: FileText },
    { label: "Balance Sheet", Icon: Scale },
    { label: "Bookkeeping", Icon: BookOpen },
    { label: "Vendor Management", Icon: Briefcase },
    { label: "Fundraising", Icon: Coins },
    { label: "Audit Trails", Icon: ClipboardCheck },
    { label: "Salary & Reimbursement", Icon: Wallet },
    { label: "Treasury", Icon: FolderLock },
    { label: "Tax Filings", Icon: ShieldCheck },
    { label: "Forecasting", Icon: TrendingUp },
    { label: "Reporting", Icon: BarChart3 },
    { label: "Cap Table", Icon: Award },
  ];
  const columns: { stage: string; cards: { name: string; meta: string }[] }[] = [
    {
      stage: "Intro",
      cards: [
        { name: "Sector lead · Tier 1", meta: "diligence room open" },
        { name: "Strategic · L1 fund", meta: "intro scheduled" },
      ],
    },
    {
      stage: "Diligence",
      cards: [
        { name: "Crypto-native fund", meta: "Q&A round 2" },
        { name: "RWA-focused fund", meta: "model reviewed" },
      ],
    },
    {
      stage: "TS / Closing",
      cards: [{ name: "Lead investor", meta: "TS signed" }],
    },
  ];
  return (
    <MiniApp
      name="Finance"
      search="Search materials, investors, models…"
      subnav={
        <SubnavTabs
          tabs={[
            { label: "Investor Room", count: 12 },
            { label: "Dataroom", count: 38 },
            { label: "Pipeline", count: 24 },
            { label: "Updates", count: 2 },
          ]}
          secondary={{ label: "New update", Icon: FileText }}
          primary={{ label: "New deck", Icon: PenLine }}
        />
      }
    >
      <div className="flex h-full flex-col gap-4">
        <div className="relative grid min-h-0 flex-1 grid-cols-[156px_318px_276px] gap-4">
          <LeftRail eyebrow="Finance" items={rail} />
          {/* Center — pipeline kanban with dataroom moat */}
          <div aria-hidden className="flex w-full flex-col rounded-[18px] border border-line bg-paper p-4 [filter:blur(6px)_saturate(0.9)] select-none pointer-events-none">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-[8px] bg-green-50 px-2 py-1 text-[13px] font-semibold text-green-600">
                Investor Room
              </span>
              <span className="text-[13px] text-ink-300">· Live pipeline</span>
            </div>
            <p className="text-[15px] font-semibold text-ink-900">
              Series A · raise in progress
            </p>
            <p className="mt-0.5 text-[13px] text-ink-300">
              12 investors · 38 dataroom files
            </p>
            <div className="mt-3 grid flex-1 grid-cols-3 gap-2">
              {columns.map((col) => (
                <div key={col.stage} className="rounded-[12px] bg-sunken p-2">
                  <p className="mb-1.5 px-1 text-[12px] font-semibold uppercase tracking-wide text-ink-500">
                    {col.stage}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {col.cards.map((c) => (
                      <div
                        key={c.name}
                        className="rounded-[10px] border border-line bg-paper px-2 py-1.5"
                      >
                        <p className="text-[13px] font-medium text-ink-700">
                          {c.name}
                        </p>
                        <p className="mt-0.5 text-[12px] text-ink-300">{c.meta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <MoatStrip
              Icon={FolderLock}
              label="Dataroom · institutional IR · 12 investors active"
              chips={["Whitepaper v3", "Tokenomics model", "Cap table", "Board pack · Q2", "+9"]}
            />
          </div>
          <div aria-hidden className="[filter:blur(6px)_saturate(0.9)] select-none pointer-events-none">
            <QueueRail
              eyebrow="Updates queue"
              rows={[
                { label: "Series A deck · final", status: "Published", tone: "live", when: "Today, 9:00 AM" },
                { label: "Investor update v3", status: "In review", tone: "review", when: "Today, 4:00 PM" },
                { label: "Quarterly investor update", status: "Drafting", tone: "draft", when: "Tomorrow" },
                { label: "Grant application", status: "Drafting", tone: "draft", when: "Wed" },
                { label: "Board pack · Q2", status: "In review", tone: "review", when: "Fri" },
              ]}
              stats={[
                { value: "212", label: "Dataroom views", delta: "▲ +34" },
                { value: "Green", label: "Runway", delta: "▲ on plan" },
              ]}
            />
          </div>
          <TeaseOverlay />
        </div>
      </div>
    </MiniApp>
  );
}

// ── INTELLIGENCE ─────────────────────────────────────────────────────────────
// Moat: always-on competitive + brand-safety watch — App Store lookalikes,
// competitor campaigns, hack/news sweep — escalated as ranked alerts.
type AlertTone = "danger" | "warning";
const ALERT_TONE: Record<AlertTone, { ring: string; chip: string; iconBg: string; iconText: string }> = {
  danger: {
    ring: "ring-danger/25",
    chip: "bg-danger/10 text-danger",
    iconBg: "bg-danger/10",
    iconText: "text-danger",
  },
  warning: {
    ring: "ring-warning/30",
    chip: "bg-warning/15 text-warning",
    iconBg: "bg-warning/15",
    iconText: "text-warning",
  },
};

function AlertCard({
  Icon,
  severity,
  tone,
  title,
  source,
  meta,
  cta,
}: {
  Icon: LucideIcon;
  severity: string;
  tone: AlertTone;
  title: string;
  source: string;
  meta: string;
  cta: string;
}) {
  const t = ALERT_TONE[tone];
  return (
    <div className={`flex items-start gap-3 rounded-[12px] bg-paper p-3 ring-1 ${t.ring}`}>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${t.iconBg} ${t.iconText}`}
      >
        <Icon size={18} strokeWidth={2} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-1.5 py-[1px] text-[10px] font-semibold ${t.chip}`}
          >
            {severity}
          </span>
          <span className="truncate text-[11px] text-ink-300">{source}</span>
        </div>
        <p className="mt-1 text-[14px] font-semibold leading-snug text-ink-900">
          {title}
        </p>
        <p className="mt-0.5 text-[12px] leading-snug text-ink-500">{meta}</p>
      </div>
      <button
        type="button"
        tabIndex={-1}
        className="shrink-0 self-center rounded-[8px] border border-line bg-paper px-2.5 py-1 text-[11px] font-medium text-ink-900"
      >
        {cta}
      </button>
    </div>
  );
}

function IntelligencePreview() {
  const rail: { label: string; Icon: LucideIcon }[] = [
    { label: "Narrative Radar", Icon: Radar },
    { label: "Drivers & Fit", Icon: Compass },
    { label: "Competitive", Icon: Crosshair },
    { label: "On-chain Attribution", Icon: Link2 },
    { label: "Channels", Icon: Share2 },
    { label: "Wallets", Icon: Wallet },
    { label: "Cross-channel", Icon: BarChart3 },
    { label: "Voice of Customer", Icon: MessageCircle },
    { label: "Research", Icon: BookOpen },
    { label: "Due Diligence", Icon: ClipboardCheck },
    { label: "Reports", Icon: FileText },
    { label: "Alerts", Icon: Bell },
  ];
  return (
    <MiniApp
      name="Intelligence"
      search="Search narratives, competitors, alerts…"
      subnav={
        <SubnavTabs
          tabs={[
            { label: "Radar", count: "1,240" },
            { label: "Alerts", count: 5 },
            { label: "Reports", count: 16 },
            { label: "Diligence", count: 4 },
          ]}
          secondary={{ label: "Export", Icon: Download }}
          primary={{ label: "New report", Icon: FileText }}
        />
      }
    >
      <div className="flex h-full flex-col gap-4">
        <div className="relative grid min-h-0 flex-1 grid-cols-[156px_318px_276px] gap-4">
          <LeftRail eyebrow="Intelligence" items={rail} />
          {/* Center — active alerts stack (live competitive + brand-safety watch) */}
          <div aria-hidden className="flex w-full flex-col rounded-[18px] border border-line bg-paper p-4 [filter:blur(6px)_saturate(0.9)] select-none pointer-events-none">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-[8px] bg-green-50 px-2 py-1 text-[13px] font-semibold text-green-600">
                Active alerts
              </span>
              <span className="text-[13px] text-ink-300">· 3 new · last 4h</span>
            </div>
            <div className="flex flex-1 flex-col gap-2.5">
              <AlertCard
                Icon={ShieldAlert}
                severity="Critical"
                tone="danger"
                title="Same-name apps on iOS App Store"
                source="Brand-safety monitor · App Store · US/EU"
                meta="Emergency tracking: 4 lookalike listings detected"
                cta="Open takedown"
              />
              <AlertCard
                Icon={Megaphone}
                severity="High"
                tone="warning"
                title="Competitor X: new campaign launched"
                source="Ad library + X · 2h ago"
                meta="“Build with us”, paid social + 3 KOL placements"
                cta="View campaign"
              />
              <AlertCard
                Icon={AlertTriangle}
                severity="High"
                tone="warning"
                title="Competitor Y: reported hack"
                source="News sweep · 12 outlets · 38 min ago"
                meta="$4.1M outflow flagged · sentiment turning negative"
                cta="See coverage"
              />
            </div>
            <div className="mt-3" />
            <MoatStrip
              Icon={Radar}
              label="Always-on watch · brand · competitors · 28 sources"
              chips={["App stores", "Ad library", "News + X", "+25"]}
            />
          </div>
          <div aria-hidden className="[filter:blur(6px)_saturate(0.9)] select-none pointer-events-none">
            <QueueRail
              eyebrow="Alerts"
              rows={[
                { label: "Spike · competitor launch", status: "Live", tone: "live", when: "12 min ago" },
                { label: "Narrative · modular AI", status: "Accelerating", tone: "review", when: "Today, 10:14 AM" },
                { label: "Sector landscape · Q3", status: "Published", tone: "live", when: "Today, 9:00 AM" },
                { label: "Diligence · target acq.", status: "In review", tone: "review", when: "Tomorrow" },
                { label: "Anomaly brief", status: "Drafting", tone: "draft", when: "Fri" },
              ]}
              stats={[
                { value: "28", label: "Competitors", delta: "monitored" },
                { value: "31%", label: "Share of voice", delta: "▲ +4 pts" },
              ]}
            />
          </div>
          <TeaseOverlay />
        </div>
      </div>
    </MiniApp>
  );
}

// ── COMMUNICATION ────────────────────────────────────────────────────────────
// Moat: a real 75+ outlet operated media network — operator-negotiated
// placements, not a wire blast. Only the 4 KB-confirmed outlets are named
// (Benzinga, CoinMarketCap, Decrypt, Invezz); the rest stays as +71. (KB §3.)
function CommunicationPreview() {
  const rail: { label: string; Icon: LucideIcon }[] = [
    { label: "Comms Desk", Icon: Megaphone },
    { label: "Media Network", Icon: Newspaper },
    { label: "Placements", Icon: CheckCheck },
    { label: "Press Kits", Icon: FolderOpen },
    { label: "Thought Leadership", Icon: Mic },
    { label: "Community", Icon: MessagesSquare },
    { label: "Moderation", Icon: ShieldCheck },
    { label: "Sentiment", Icon: HeartPulse },
    { label: "Reputation Watch", Icon: Eye },
    { label: "Partnerships", Icon: Handshake },
    { label: "KOLs", Icon: Star },
    { label: "Ambassadors", Icon: Trophy },
  ];
  const outlets: { name: string; status: string; tone: Tone }[] = [
    { name: "Benzinga", status: "Confirmed", tone: "live" },
    { name: "CoinMarketCap", status: "Confirmed", tone: "live" },
    { name: "Decrypt", status: "Briefed", tone: "review" },
    { name: "Invezz", status: "Briefed", tone: "review" },
  ];
  return (
    <MiniApp
      name="Communication"
      search="Search placements, community, sentiment…"
      subnav={
        <SubnavTabs
          tabs={[
            { label: "Comms Desk", count: 23 },
            { label: "Community", count: "2.1k" },
            { label: "Sentiment", count: 4 },
            { label: "KOLs", count: 12 },
          ]}
          secondary={{ label: "Brief", Icon: FileText }}
          primary={{ label: "Send release", Icon: Megaphone }}
        />
      }
    >
      <div className="flex h-full flex-col gap-4">
        <div className="relative grid min-h-0 flex-1 grid-cols-[156px_318px_276px] gap-4">
          <LeftRail eyebrow="Communication" items={rail} />
          {/* Center — embargoed release + placement fan-out */}
          <div aria-hidden className="flex w-full flex-col rounded-[18px] border border-line bg-paper p-4 [filter:blur(6px)_saturate(0.9)] select-none pointer-events-none">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-[8px] bg-green-50 px-2 py-1 text-[13px] font-semibold text-green-600">
                Release
              </span>
              <span className="text-[13px] text-ink-300">· Embargoed · lifts 09:00 UTC</span>
            </div>
            <p className="text-[18px] font-semibold leading-snug text-ink-900">
              Funding round announcement
            </p>
            <p className="mt-2 text-[14px] leading-[1.45] text-ink-700">
              Editor-ready release + briefing pack, distributed across the operated network.
            </p>
            <p className="mt-3 text-[12px] font-medium uppercase tracking-wide text-ink-300">
              Placements
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {outlets.map((o) => (
                <div
                  key={o.name}
                  className="flex items-center gap-2 rounded-[10px] border border-line bg-paper px-2 py-1.5"
                >
                  <span className="text-[13px] font-semibold text-ink-900">
                    {o.name}
                  </span>
                  <span
                    className={`rounded-[6px] px-1.5 py-px text-[12px] font-semibold ${TONE_COLORS[o.tone]}`}
                  >
                    {o.status}
                  </span>
                </div>
              ))}
              <span className="rounded-[10px] border border-line bg-paper px-2 py-1.5 text-[13px] font-medium text-ink-500">
                +71 outlets
              </span>
            </div>
            <div className="mt-auto" />
            <MoatStrip
              Icon={Newspaper}
              label="Media Network · 75+ outlets · operator-negotiated"
              chips={["Editor-ready pack", "Spokesperson briefed", "Coverage report auto", "+3"]}
            />
          </div>
          <div aria-hidden className="[filter:blur(6px)_saturate(0.9)] select-none pointer-events-none">
            <QueueRail
              eyebrow="Live coverage"
              rows={[
                { label: "Funding release · embargoed", status: "Approved", tone: "live", when: "Today, 9:00 AM" },
                { label: "Founder byline", status: "In review", tone: "review", when: "Today, 2:30 PM" },
                { label: "Community AMA brief", status: "Drafting", tone: "draft", when: "Tomorrow" },
                { label: "Sentiment alert · sector", status: "Live", tone: "live", when: "18 min ago" },
                { label: "Reputation digest · daily", status: "Drafting", tone: "draft", when: "Daily 6 PM" },
              ]}
              stats={[
                { value: "31%", label: "Share of voice", delta: "▲ +4 pts" },
                { value: "18m", label: "Response time", delta: "▼ faster" },
              ]}
            />
          </div>
          <TeaseOverlay />
        </div>
      </div>
    </MiniApp>
  );
}

function renderPreview(prod: Showcase) {
  const C =
    prod.slug === "content" ? <ContentPreview /> :
    prod.slug === "marketing" ? <MarketingPreview /> :
    prod.slug === "operations" ? <OperationsPreview /> :
    prod.slug === "finance" ? <FinancePreview /> :
    prod.slug === "intelligence" ? <IntelligencePreview /> :
    <CommunicationPreview />;
  return <ScaledPreview>{C}</ScaledPreview>;
}

export default function ProductShowcaseSection() {
  // Default to Marketing (index 1 — order is Content · Marketing · Operations · …).
  const DEFAULT_INDEX = PRODUCTS.findIndex((p) => p.slug === "marketing");
  const [active, setActive] = useState(DEFAULT_INDEX);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Clamp to range (the track slides between fixed panels — no wrap, so the
  // glide is always a clean single sweep). `focus` moves DOM focus to the new
  // tab for keyboard nav; mouse paths skip it.
  function go(target: number, focus = false) {
    const next = Math.max(0, Math.min(LAST, target));
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  }

  // WAI-ARIA tabs keyboard pattern: Left/Right (+ Home/End) move + activate.
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(active + 1, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(active - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      go(LAST, true);
    }
  }

  return (
    <section id="product-showcase" className="bg-paper">
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        {/* Intro */}
        <div className="mx-auto max-w-2xl text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500 transition-colors hover:text-green-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
            Products
          </Link>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.75rem]">
            One platform. Six products.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-500">
            Every product is built with the operator at the center. Take a
            single product or the whole platform. Run it yourself, work with
            forward-deployed operators or have us build a full enterprise
            version inside your infrastructure.
          </p>
        </div>

        {/* Tab row */}
        <div
          role="tablist"
          aria-label="Narrations products"
          onKeyDown={onKeyDown}
          className="mt-12 flex flex-nowrap gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0"
        >
          {PRODUCTS.map((prod, i) => {
            const selected = i === active;
            const Icon = prod.Icon;
            const C = PALETTE[prod.slug];
            return (
              <button
                key={prod.slug}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`ps-tab-${prod.slug}`}
                aria-selected={selected}
                aria-controls={`ps-panel-${prod.slug}`}
                aria-label={prod.name}
                tabIndex={selected ? 0 : -1}
                onClick={() => go(i)}
                style={selected ? { backgroundColor: C.tint } : undefined}
                className={`group flex shrink-0 flex-col items-center gap-2.5 rounded-[20px] px-4 py-4 transition-all duration-200 sm:w-[150px] ${
                  selected ? "" : "hover:bg-sunken"
                }`}
              >
                <span
                  style={{ backgroundColor: C.tile }}
                  className={`flex h-14 w-14 items-center justify-center rounded-[18px] text-white shadow-card transition-transform duration-200 ${
                    selected
                      ? "-translate-y-0.5 scale-[1.06]"
                      : "group-hover:-translate-y-0.5"
                  }`}
                >
                  <Icon size={24} strokeWidth={2.25} aria-hidden />
                </span>
                <ProductName
                  name={prod.name}
                  pre={prod.pre}
                  post={prod.post}
                  px={14}
                  weight={selected ? 600 : 500}
                  tone="light"
                  className={`tracking-tight ${
                    selected ? "" : "text-ink-700"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Preview — a carousel TRACK: all six panels sit side by side and the
            track glides by one panel width per step (outgoing slides out as the
            incoming slides in), on a slow easeInOut. Arrows float on the edges. */}
        <div className="relative mt-12">
          <div className="overflow-hidden rounded-[24px] shadow-card ring-1 ring-black/5">
            <div
              className="flex motion-safe:transition-transform motion-safe:duration-[650ms] motion-safe:ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {PRODUCTS.map((prod, i) => {
                const C = PALETTE[prod.slug];
                return (
                <div
                  key={prod.slug}
                  role="tabpanel"
                  id={`ps-panel-${prod.slug}`}
                  aria-labelledby={`ps-tab-${prod.slug}`}
                  aria-hidden={i !== active}
                  inert={i !== active ? true : undefined}
                  className="grid w-full shrink-0 lg:grid-cols-[1.15fr_0.85fr]"
                >
                  {/* Left — dashboard floating on a product-tinted ground,
                      bleeding off the right + bottom edges (clipped). */}
                  <div
                    style={{ backgroundColor: C.tile }}
                    className="relative min-h-[320px] overflow-hidden pl-6 pt-6 sm:pl-9 sm:pt-9 lg:min-h-[460px]"
                  >
                    {renderPreview(prod)}
                  </div>

                  {/* Right — tinted copy pane, joined seamlessly to the left. */}
                  <div
                    style={{ backgroundColor: C.tint }}
                    className="flex flex-col justify-center p-7 sm:p-10"
                  >
                    <p
                      style={{ color: C.accent }}
                      className="text-[12px] font-semibold uppercase tracking-[0.16em]"
                    >
                      {prod.vertical}
                    </p>
                    <h3 className="mt-3 text-[26px] font-bold leading-[1.18] tracking-tight text-ink-900 sm:text-[30px]">
                      {prod.headline}
                    </h3>
                    <p className="mt-4 text-[15px] leading-7 text-ink-700">
                      {prod.desc}
                    </p>
                    <a
                      href="/#book-a-demo"
                      style={{ color: C.accent }}
                      className="group mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold transition-opacity hover:opacity-80"
                    >
                      Learn more
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </a>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          {/* Side arrows — float half over the card edges, vertically centered. */}
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Previous product"
            className="absolute -left-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 shadow-card transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-paper lg:flex"
          >
            <ChevronLeft size={20} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === LAST}
            aria-label="Next product"
            className="absolute -right-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 shadow-card transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-paper lg:flex"
          >
            <ChevronRight size={20} aria-hidden />
          </button>
        </div>

        {/* Mobile cycle controls (side arrows are hidden < lg) */}
        <div className="mt-8 flex items-center justify-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Previous product"
            className="flex h-10 w-10 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <span className="text-[13px] tabular-nums text-ink-500">
            {active + 1} / {PRODUCTS.length}
          </span>
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === LAST}
            aria-label="Next product"
            className="flex h-10 w-10 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
