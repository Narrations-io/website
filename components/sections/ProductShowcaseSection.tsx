"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import NMark from "@/components/NMark";
import ProductName from "@/components/ui/ProductName";
import {
  PenLine,
  Megaphone,
  ShieldCheck,
  Headset,
  Boxes,
  BookMarked,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Search,
  FileText,
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
  CheckCheck,
  type LucideIcon,
} from "lucide-react";

// Homepage — tabbed product showcase (Perspective-style "one at a time" pattern,
// rendered in our light + Ink+Evergreen system). Pick a surface, see the view it
// gives you and the copy that goes with it.
//
// Everything on this page reads from the deck (extra/deck): the Ledger is the
// product, Content is the only live surface, and the rest are marked
// in-development rather than dressed up as shipping software.
//
// Every preview is bespoke and shows the artifact itself — Marketing a post
// being composed, Content the editor mid-check, Operations a policy diff fanning
// out to docs, Support a checked ticket reply, Studio a tool's pipeline, Ledger
// the record (including a "Ruled out" row). They stay one family by sharing the
// shell (MiniApp, LeftRail, SubnavTabs) and the right-column kit (KpiTiles,
// SidePanel, QueueRows, SignatureCard); row copy lives in PRODUCTS data.
//
// Design-system note: the brand guideline is deliberately one-green (no rainbow,
// no third-party colors as UI — §1.7). PALETTE below is the approved off-spec
// exception: six muted, evergreen-compatible hues, inline-styled so it stays easy
// to revert or promote into tailwind.config.ts as real tokens.

type Tone = "live" | "review" | "draft";

type Showcase = {
  name: string; // plain name — accessibility + slug source
  slug: string;
  /** Whether the name contains an "n" the brand mark can replace. */
  hasN: boolean;
  pre: string; // text before the accent N (or the full name when hasN is false)
  post: string; // text after the accent N
  status: "live" | "in-development";
  vertical: string;
  Icon: LucideIcon;
  /** right-card headline — a distinct value prop per surface */
  headline: string;
  /** right-card supporting line */
  desc: string;
  dashboard: {
    appName: string;
    searchPlaceholder: string;
    subnavTabs: { label: string; count: number | null }[];
    secondaryAction: string;
    primaryAction: string;
    leftRail: string[];
    rightRail: {
      eyebrow: string;
      rows: { label: string; status: string; tone: Tone; when: string }[];
      stats: { value: string; label: string }[];
    };
  };
};

const PRODUCTS: Showcase[] = [
  {
    name: "Content",
    slug: "content",
    hasN: true,
    pre: "Conte",
    post: "t",
    status: "live",
    vertical: "Writing and review",
    Icon: PenLine,
    headline: "Draft, check, approve, in one editor.",
    desc: "Articles, decks, creatives and docs, drafted in an editor that knows your approved claims, terms and tone. Ask for a blog post on a new feature: it drafts from the approved description, flags a claim you retired last quarter, and keeps your fix for next time.",
    dashboard: {
      appName: "Content",
      searchPlaceholder: "Search drafts and entries…",
      subnavTabs: [
        { label: "Drafts", count: 7 },
        { label: "In review", count: 3 },
        { label: "Approved", count: 12 },
        { label: "Archived", count: null },
      ],
      secondaryAction: "Check draft",
      primaryAction: "New draft",
      leftRail: [
        "Drafts",
        "In review",
        "Approved",
        "Articles",
        "Decks",
        "Docs",
        "Creatives",
        "Sources",
        "Style rules",
        "Claims",
        "Corrections",
        "Settings",
      ],
      rightRail: {
        eyebrow: "Review queue",
        rows: [
          { label: "Launch article, final pass", status: "In review", tone: "review", when: "Today" },
          { label: "Pricing page copy", status: "Approved", tone: "live", when: "Yesterday" },
          { label: "Partner deck, section 4", status: "Draft", tone: "draft", when: "2 days ago" },
          { label: "Onboarding email series", status: "In review", tone: "review", when: "3 days ago" },
          { label: "Glossary entry, custody", status: "Draft", tone: "draft", when: "Last week" },
        ],
        stats: [
          { value: "12", label: "approved" },
          { value: "5", label: "corrections" },
        ],
      },
    },
  },
  {
    name: "Marketing",
    slug: "marketing",
    hasN: true,
    pre: "Marketi",
    post: "g",
    status: "in-development",
    vertical: "Campaigns and channels",
    Icon: Megaphone,
    headline: "One brief, every channel, same claims.",
    desc: "Social posts, emails, search ads and landing copy drafted from one campaign brief, so they all make the same claims. Retire a claim once and it is retired everywhere. What performed is kept with the campaign, ready for the next one.",
    dashboard: {
      appName: "Marketing",
      searchPlaceholder: "Search campaigns and channels…",
      subnavTabs: [
        { label: "Campaigns", count: 4 },
        { label: "Scheduled", count: 9 },
        { label: "Channels", count: 6 },
        { label: "Metrics", count: null },
      ],
      secondaryAction: "Preview",
      primaryAction: "Plan campaign",
      leftRail: [
        "Campaigns",
        "Calendar",
        "Social",
        "Email",
        "SEO",
        "Ads",
        "Graphics",
        "Video",
        "Channels",
        "Audiences",
        "Metrics",
        "Settings",
      ],
      rightRail: {
        eyebrow: "Scheduled",
        rows: [
          { label: "Launch thread, day one", status: "Scheduled", tone: "live", when: "Mon 09:00" },
          { label: "Newsletter, week two", status: "In review", tone: "review", when: "Tue" },
          { label: "Search ad set, launch", status: "Draft", tone: "draft", when: "Wed" },
          { label: "Feature short, cut two", status: "In review", tone: "review", when: "Thu" },
          { label: "Community post, recap", status: "Draft", tone: "draft", when: "Fri" },
        ],
        stats: [
          { value: "18", label: "queued" },
          { value: "3", label: "channels live" },
        ],
      },
    },
  },
  {
    name: "Operations",
    slug: "operations",
    hasN: true,
    pre: "Operatio",
    post: "s",
    status: "in-development",
    vertical: "Policies and internal docs",
    Icon: ShieldCheck,
    headline: "Change a policy once. Every doc follows.",
    desc: "Policies, handbooks, all-hands notes and compliance notices, written from the same approved wording as your customer copy. Update the leave policy and the handbook page, the manager brief and the announcement all say the same thing.",
    dashboard: {
      appName: "Operations",
      searchPlaceholder: "Search policies and docs…",
      subnavTabs: [
        { label: "Policies", count: 24 },
        { label: "Handbook", count: null },
        { label: "Notices", count: 3 },
        { label: "Templates", count: null },
      ],
      secondaryAction: "View history",
      primaryAction: "Update policy",
      leftRail: [
        "Policies",
        "Handbook",
        "All-hands notes",
        "Manager briefs",
        "Notices",
        "Templates",
        "Sources",
        "Style rules",
        "Corrections",
        "Reviewers",
        "Exports",
        "Settings",
      ],
      rightRail: {
        eyebrow: "Follow-on drafts",
        rows: [
          { label: "Handbook page, leave", status: "Updated", tone: "live", when: "Now" },
          { label: "All-hands note, policy change", status: "In review", tone: "review", when: "Now" },
          { label: "Manager brief, leave", status: "Updated", tone: "live", when: "Today" },
          { label: "Compliance notice, regions", status: "Queued", tone: "draft", when: "Today" },
          { label: "Onboarding doc, benefits", status: "Draft", tone: "draft", when: "Yesterday" },
        ],
        stats: [
          { value: "24", label: "policies" },
          { value: "61", label: "docs in sync" },
        ],
      },
    },
  },
  {
    name: "Customer Support",
    slug: "customer-support",
    hasN: false,
    pre: "Customer Support",
    post: "",
    status: "in-development",
    vertical: "Replies and help content",
    Icon: Headset,
    headline: "Answers that match what marketing promised.",
    desc: "Help-centre articles, ticket replies and saved answers built on the same facts as your website. A question outside the approved facts goes to a person instead of being guessed by a model. Correct an answer once and the next reply has the fix.",
    dashboard: {
      appName: "Support",
      searchPlaceholder: "Search tickets and answers…",
      subnavTabs: [
        { label: "Inbox", count: 14 },
        { label: "Escalated", count: 2 },
        { label: "Help centre", count: null },
        { label: "Answers", count: null },
      ],
      secondaryAction: "Escalate",
      primaryAction: "Send reply",
      leftRail: [
        "Inbox",
        "Mine",
        "Escalated",
        "Resolved",
        "Help centre",
        "Saved answers",
        "Product scope",
        "Retired claims",
        "Channels",
        "Reviewers",
        "Reports",
        "Settings",
      ],
      rightRail: {
        eyebrow: "Inbox",
        rows: [
          { label: "Refund window question", status: "Draft", tone: "draft", when: "Now" },
          { label: "Setup help, region two", status: "Replied", tone: "live", when: "8 min ago" },
          { label: "Pricing dispute, thread", status: "Escalated", tone: "review", when: "1 hr ago" },
          { label: "Help article, sign-in reset", status: "In review", tone: "review", when: "Today" },
          { label: "Feature request, export", status: "Replied", tone: "live", when: "Yesterday" },
        ],
        stats: [
          { value: "14", label: "open" },
          { value: "2", label: "escalated" },
        ],
      },
    },
  },
  {
    name: "AI Studio",
    slug: "ai-studio",
    hasN: false,
    pre: "AI Studio",
    post: "",
    status: "in-development",
    vertical: "Your own tools",
    Icon: Boxes,
    headline: "Build your own tools on the same rules.",
    desc: "Build agents and internal tools that use your approved facts from the first run: a weekly board digest, a tender assistant for sales, a translation checker. Each passes the same approvals and appears in the same log as everything else.",
    dashboard: {
      appName: "Studio",
      searchPlaceholder: "Search tools and templates…",
      subnavTabs: [
        { label: "My tools", count: 3 },
        { label: "Templates", count: 8 },
        { label: "Evaluations", count: 2 },
        { label: "Deployed", count: 1 },
      ],
      secondaryAction: "Run test",
      primaryAction: "New tool",
      leftRail: [
        "My tools",
        "Templates",
        "Prompts",
        "Tool schema",
        "Ledger access",
        "Evaluations",
        "Test runs",
        "Versions",
        "Deployed",
        "Usage",
        "Keys",
        "Settings",
      ],
      rightRail: {
        eyebrow: "Test runs",
        rows: [
          { label: "Release notes tool, run 12", status: "Passed", tone: "live", when: "Just now" },
          { label: "Deck outline tool, run 4", status: "Review", tone: "review", when: "20 min ago" },
          { label: "FAQ generator, run 2", status: "Failed", tone: "draft", when: "1 hr ago" },
          { label: "Glossary builder", status: "Draft", tone: "draft", when: "Yesterday" },
          { label: "Onboarding guide bot", status: "Passed", tone: "live", when: "2 days ago" },
        ],
        stats: [
          { value: "3", label: "tools built" },
          { value: "41", label: "test runs" },
        ],
      },
    },
  },
  {
    name: "Ledger",
    slug: "ledger",
    hasN: false,
    pre: "Ledger",
    post: "",
    status: "live",
    vertical: "Where the rules live",
    Icon: BookMarked,
    headline: "Everything you approved, in one place.",
    desc: "The list of what your company has approved: claims, terms, tone, pricing rules, what you decided not to say, and who approved each. Every part checks drafts against it, the AI tools you already use can read it through MCP, and you can export it any time.",
    dashboard: {
      appName: "Ledger",
      searchPlaceholder: "Search entries and decisions…",
      subnavTabs: [
        { label: "Entries", count: 312 },
        { label: "Decisions", count: 86 },
        { label: "Scope", count: null },
        { label: "History", count: null },
      ],
      secondaryAction: "Export",
      primaryAction: "New entry",
      leftRail: [
        "Entries",
        "Decisions",
        "Positioning",
        "Voice",
        "Claims",
        "Ruled out",
        "Scope",
        "Sources",
        "History",
        "Corrections",
        "Read by",
        "Settings",
      ],
      rightRail: {
        eyebrow: "Recent entries",
        rows: [
          { label: "Pricing language, decision", status: "Recorded", tone: "live", when: "Today" },
          { label: "Voice entry, correction", status: "Recorded", tone: "live", when: "Today" },
          { label: "Product scope, proposed edit", status: "Pending", tone: "review", when: "Yesterday" },
          { label: "Claim retired, capacity", status: "Recorded", tone: "live", when: "2 days ago" },
          { label: "Regional scope, draft", status: "Draft", tone: "draft", when: "Last week" },
        ],
        stats: [
          { value: "312", label: "entries" },
          { value: "5", label: "tools reading" },
        ],
      },
    },
  },
];

// ── Per-surface palette (off-spec, approved) ────────────────────────────────
// Six muted, evergreen-compatible hues — one IS the brand green, the other five
// are desaturated neighbours picked to harmonise with it (no neon, no third-party
// brand colors). `tile` = squircle + left-pane ground (white icon, AA >=3:1 as a
// graphic); `tint` = soft active-tab + copy-pane background; `accent` = the
// darker, AA >=4.5:1 text colour for eyebrow / active label / "Learn more".
// The brand evergreen goes to Ledger — it is the product the others sit on.
const PALETTE: Record<string, { tile: string; tint: string; accent: string }> = {
  content: { tile: "#16726B", tint: "#E6F1F0", accent: "#125C57" }, // teal
  marketing: { tile: "#355C86", tint: "#EAEFF6", accent: "#2B4C70" }, // steel blue
  operations: { tile: "#A1574A", tint: "#F5E9E6", accent: "#84473C" }, // clay
  "customer-support": { tile: "#87691F", tint: "#F2EEE1", accent: "#6F551A" }, // muted bronze
  "ai-studio": { tile: "#5E4B8B", tint: "#EDEBF5", accent: "#4C3D71" }, // muted violet
  ledger: { tile: "#1F6B4C", tint: "#EAF3EE", accent: "#1A5A40" }, // evergreen (brand)
};

const LAST = PRODUCTS.length - 1;

const TONE_COLORS: Record<Tone, string> = {
  live: "bg-success/10 text-success",
  review: "bg-warning/10 text-warning",
  draft: "bg-sunken text-ink-500",
};

// ── Preview shell ────────────────────────────────────────────────────────────
// ScaledPreview — renders children at 1.5x native size then CSS-scales to 0.667x.
// The browser rasterizes text at the larger native size before the GPU compositing
// step, giving ~50% more pixels per glyph at the same visual size → crisp on 1x
// displays. Display area: 840x460. Native render area: 1260x690.
function ScaledPreview({ children }: { children: React.ReactNode }) {
  return (
    // Outer box collapses to the visually-scaled height below `lg` so the
    // surrounding grid doesn't reserve dead space; at `lg` and up this is
    // byte-identical to the original 840x460 box (scale-100, h-[460px]).
    <div className="h-[184px] w-full max-w-none overflow-hidden sm:h-[253px] md:h-[345px] lg:h-[460px] lg:w-[840px]">
      <div
        className="origin-top-left scale-[0.4] sm:scale-[0.55] md:scale-[0.75] lg:scale-100"
        style={{ width: 1260, height: 690 }}
      >
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
    </div>
  );
}

// ── Static desktop composition inside the scaled mocks ──────────────────────
// The mocks render at a fixed 1260x690 and ScaledPreview CSS-scales them down as
// a picture. Tailwind's `sm:` is a VIEWPORT media query, not a container query,
// so on a 390px phone `hidden sm:flex` fired on the phone width and hid chrome
// *inside* the 1260px box: the top-bar search field and each sub-nav's secondary
// action chip vanished, so the "desktop dashboard" screenshot showed a
// stripped-down UI that doesn't exist in the product. The chrome below is
// therefore shown unconditionally — same fix as DashboardFrame's
// `staticComposition` prop.
const STATIC_CHROME = "flex";
const STATIC_CHROME_INLINE = "inline-flex";

function MiniApp({
  name,
  search,
  subnav,
  children,
}: {
  name: string;
  search: string;
  subnav: React.ReactNode;
  children: React.ReactNode;
}) {
  // Renders at 1260x690 (1.5x the 840x460 display size) — always used inside
  // ScaledPreview which CSS-scales it back down. All internal sizes are 1.5x their
  // apparent visual size so they render at more pixels before the scale.
  return (
    <div className="flex h-[690px] w-[1260px] flex-col overflow-hidden rounded-[18px] bg-paper text-ink-900 shadow-pop ring-1 ring-black/5">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-line px-6 py-[15px]">
        <div className="flex items-center gap-3">
          <NMark size={33} tone="light" />
          <span className="text-[18px] font-semibold text-ink-900">{name}</span>
        </div>
        {/* Search field: never viewport-gated — see STATIC_CHROME above. */}
        <div
          className={`${STATIC_CHROME} h-[39px] w-[270px] items-center gap-3 rounded-[12px] bg-sunken px-4`}
        >
          <Search size={16} className="text-ink-300" />
          <span className="truncate text-[16px] text-ink-300">{search}</span>
        </div>
      </div>
      {/* Sub-nav */}
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        {subnav}
      </div>
      {/* Body */}
      <div className="min-h-0 flex-1 overflow-hidden p-6">{children}</div>
    </div>
  );
}

// SubnavTabs — the 4-pill + 2-button row every preview carries.
function SubnavTabs({
  tabs,
  secondary,
  primary,
  PrimaryIcon,
}: {
  tabs: { label: string; count: number | null }[];
  secondary: string;
  primary: string;
  PrimaryIcon: LucideIcon;
}) {
  return (
    <div className="flex w-full max-w-[840px] items-center gap-1.5">
      {tabs.map((t, i) => (
        <span
          key={t.label}
          className={`flex items-center gap-2 rounded-[10px] px-4 py-1.5 text-[16px] ${
            i === 0 ? "bg-green-50 font-semibold text-green-600" : "text-ink-500"
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
        {/* Secondary chip: never viewport-gated — see STATIC_CHROME above. */}
        <span
          className={`${STATIC_CHROME_INLINE} items-center gap-1.5 rounded-[10px] border border-line bg-paper px-3 py-1.5 text-[15px] font-medium text-ink-500`}
        >
          <FileText size={15} aria-hidden />
          {secondary}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-green-500 px-4 py-1.5 text-[15px] font-semibold text-white shadow-card">
          <PrimaryIcon size={15} aria-hidden />
          {primary}
        </span>
      </span>
    </div>
  );
}

// LeftRail — 12 nav entries, first active.
function LeftRail({ eyebrow, items }: { eyebrow: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-[18px] border border-line bg-surface p-2">
      <p className="px-2 pb-1 text-[13px] font-medium uppercase tracking-wide text-ink-300">
        {eyebrow}
      </p>
      {items.map((label, i) => (
        <span
          key={label}
          className={`flex items-center gap-2 rounded-[10px] px-2 py-1 text-[15px] leading-tight ${
            i === 0 ? "bg-green-50 font-semibold text-green-600" : "text-ink-500"
          }`}
        >
          <span
            aria-hidden
            className={`h-[5px] w-[5px] shrink-0 rounded-full ${
              i === 0 ? "bg-green-500" : "bg-ink-300"
            }`}
          />
          <span className="truncate">{label}</span>
        </span>
      ))}
    </div>
  );
}

// MoatStrip — the green-tinted differentiator strip at the foot of the centre
// column. The one line per surface that says why the record matters.
function MoatStrip({ label, chips }: { label: string; chips: string[] }) {
  return (
    <div className="mt-3 rounded-[13px] border border-green-200 bg-green-50 p-3">
      <div className="mb-2 flex items-center gap-2">
        <BookMarked size={16} className="text-green-600" aria-hidden />
        <p className="text-[14px] font-semibold text-green-700">{label}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((s) => (
          <span
            key={s}
            className="rounded-[8px] bg-white/80 px-2 py-1 text-[14px] font-medium text-green-700 ring-1 ring-green-200"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// QueueRows — the bordered row list every bespoke right column shares (rows
// come from each surface's rightRail data so status copy stays in one place).
function QueueRows({
  rows,
}: {
  rows: { label: string; status: string; tone: Tone; when: string }[];
}) {
  return (
    <div className="flex min-h-0 flex-col gap-1.5 overflow-y-auto">
      {rows.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2.5 rounded-[10px] bg-sunken/40 px-2.5 py-1.5"
        >
          <p className="min-w-0 flex-1 truncate text-[14px] font-medium text-ink-700">
            {item.label}
          </p>
          <span
            className={`shrink-0 rounded-[6px] px-1.5 py-px text-[12px] font-semibold ${TONE_COLORS[item.tone]}`}
          >
            {item.status}
          </span>
          <span className="shrink-0 text-[12px] text-ink-300">{item.when}</span>
        </div>
      ))}
    </div>
  );
}

// KpiTiles — the 3-up stat row at the top of every bespoke right column.
function KpiTiles({
  tiles,
}: {
  tiles: { label: string; value: string; sub: string; cls: string }[];
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {tiles.map((k) => (
        <div key={k.label} className="rounded-[12px] border border-line bg-surface px-2.5 py-2">
          <p className="text-[12px] uppercase tracking-wide text-ink-300">{k.label}</p>
          <p className="mt-1 text-[21px] font-semibold leading-none text-ink-900">{k.value}</p>
          <p className={`mt-1 text-[12px] font-medium ${k.cls}`}>{k.sub}</p>
        </div>
      ))}
    </div>
  );
}

// SidePanel — titled widget box for the bespoke right columns.
function SidePanel({
  title,
  meta,
  children,
}: {
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[14px] border border-line p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink-500">
          {title}
        </p>
        <span className="text-[12px] text-ink-300">{meta}</span>
      </div>
      {children}
    </div>
  );
}

// SignatureCard — the green highlight card closing each bespoke right column.
function SignatureCard({
  Icon,
  title,
  sub,
  action,
}: {
  Icon: LucideIcon;
  title: string;
  sub: string;
  action?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] border border-line bg-green-50/60 p-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-green-500 text-white">
        <Icon size={17} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-ink-900">{title}</p>
        <p className="text-[12px] text-ink-500">{sub}</p>
      </div>
      {action && (
        <span className="shrink-0 rounded-pill bg-green-500 px-3 py-1.5 text-[13px] font-semibold text-white">
          {action}
        </span>
      )}
    </div>
  );
}

// ── Marketing: the one bespoke preview ──────────────────────────────────────
// Every other part renders the shared three-zone Preview above. Marketing keeps
// its original composer mock — a post being written, the channels it fans out
// to, and the performance widgets beside it — because a composer shows what a
// marketing surface actually does in a way a table cannot.
//
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

function MarketingPreview({ prod }: { prod: Showcase }) {
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
    { label: "Affiliates", Icon: Star },
    { label: "Events", Icon: Mic },
    { label: "Automations", Icon: Zap },
    { label: "Experiments", Icon: FlaskConical },
    { label: "Performance", Icon: BarChart3 },
  ];
  const upcoming = [
    { ch: 0, title: "Launch thread, day one", when: "Mon 09:00" },
    { ch: 1, title: "Newsletter, week two", when: "Tue" },
    { ch: 2, title: "Search ad set, launch", when: "Wed" },
    { ch: 3, title: "Community post, recap", when: "Fri" },
  ];
  return (
    <MiniApp
      name="Marketing"
      search="Search campaigns…"
      subnav={
        <SubnavTabs
          tabs={prod.dashboard.subnavTabs}
          secondary={prod.dashboard.secondaryAction}
          primary={prod.dashboard.primaryAction}
          PrimaryIcon={prod.Icon}
        />
      }
    >
      {/* Only the left ~610px of the 840px display is visible (the rest bleeds off
          under the copy pane). Content sits in three columns packed to the left. */}
      <div className="grid h-full min-h-0 grid-cols-[140px_480px_280px] gap-4">
        <LeftRail eyebrow="Marketing" items={navTabs.map((t) => t.label)} />

        {/* Composer: the post being written */}
        <div className="flex w-full flex-col rounded-[18px] border border-line bg-paper p-4">
          <div className="flex items-center gap-3">
            <NMark size={42} tone="light" />
            <div className="leading-tight">
              <p className="text-[16px] font-semibold text-ink-900">Narrations</p>
              <p className="text-[13px] text-ink-300">@narrations · 2h</p>
            </div>
          </div>
          <p className="mt-3 text-[16px] leading-[1.45] text-ink-700">
            Launch week is live. Every claim in this post was checked against the
            ledger before it shipped.
          </p>
          <img
            src="/showcase/marketing-creative.webp"
            alt="Launch creative produced inside Narrations."
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
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
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

        {/* Right column — dense marketing widgets so there is no dead space */}
        <div className="flex min-h-0 flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Reach", value: "1.4M", delta: "▲ +18%" },
              { label: "Engagement", value: "3.2%", delta: "▲ +0.4" },
              { label: "CTR", value: "2.6%", delta: "▲ +0.3" },
            ].map((k) => (
              <div key={k.label} className="rounded-[12px] border border-line bg-surface px-2.5 py-2">
                <p className="text-[11px] uppercase tracking-wide text-ink-300">{k.label}</p>
                <p className="mt-1 text-[18px] font-semibold leading-none text-ink-900">{k.value}</p>
                <p className="mt-1 text-[11px] font-medium text-success">{k.delta}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[14px] border border-line p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Upcoming
              </p>
              <span className="text-[11px] text-ink-300">12 scheduled</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {upcoming.map((u) => (
                <div key={u.title} className="flex items-center gap-2.5 rounded-[10px] bg-sunken/40 px-2.5 py-1.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-paper text-ink-700 ring-1 ring-line">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden>
                      <path d={CHANNELS[u.ch].d} />
                    </svg>
                  </span>
                  <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink-700">{u.title}</p>
                  <span className="shrink-0 text-[11px] text-ink-300">{u.when}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[14px] border border-line p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Channel mix
              </p>
              <span className="text-[11px] text-ink-300">last 7d</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                { ch: 0, label: "X", pct: 38 },
                { ch: 1, label: "LinkedIn", pct: 24 },
                { ch: 2, label: "Telegram", pct: 18 },
                { ch: 3, label: "YouTube", pct: 12 },
                { ch: 4, label: "Discord", pct: 8 },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-ink-500">
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden>
                      <path d={CHANNELS[r.ch].d} />
                    </svg>
                  </span>
                  <span className="w-[64px] shrink-0 text-[12px] text-ink-700">{r.label}</span>
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-sunken">
                    <span className="absolute inset-y-0 left-0 rounded-full bg-green-500" style={{ width: `${r.pct}%` }} />
                  </span>
                  <span className="w-[34px] shrink-0 text-right text-[11px] font-medium tabular-nums text-ink-700">
                    {r.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-[14px] border border-line bg-green-50/60 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-green-500 text-white">
              <Trophy size={16} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-ink-900">
                Launch thread · top performer
              </p>
              <p className="text-[11px] text-ink-500">248 likes · 56 reposts · ER 4.7%</p>
            </div>
          </div>

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
                  <p className="text-[14px] font-semibold leading-none text-ink-900">{s.value}</p>
                  <p className="mt-1 text-[10px] text-ink-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MiniApp>
  );
}

// ── Content: the second bespoke preview ─────────────────────────────────────
// Content is the live product, so like Marketing it shows the artifact instead
// of describing it: the editor mid-check — a draft with one flagged claim (and
// its ledger card), one kept correction, and the check/approval state beside it.
// The worked example from the site copy, drawn instead of told.
function ContentPreview({ prod }: { prod: Showcase }) {
  const corrections = [
    { fix: "“custody” → “self-custody”", note: "Now a rule" },
    { fix: "Retired “instant settlement”", note: "Blocked in drafts" },
    { fix: "Prices rounded to whole $", note: "Applies everywhere" },
  ];
  const versions = [
    { label: "v1 · Drafted", when: "Mon", tone: "draft" as Tone },
    { label: "v2 · Checked, 2 flags", when: "Tue", tone: "review" as Tone },
    { label: "v3 · In review", when: "now", tone: "live" as Tone },
  ];
  return (
    <MiniApp
      name="Content"
      search={prod.dashboard.searchPlaceholder}
      subnav={
        <SubnavTabs
          tabs={prod.dashboard.subnavTabs}
          secondary={prod.dashboard.secondaryAction}
          primary={prod.dashboard.primaryAction}
          PrimaryIcon={prod.Icon}
        />
      }
    >
      {/* Same left-packed three-column composition as MarketingPreview: only
          the left ~610px of the 840px display is visible under the copy pane. */}
      <div className="grid h-full min-h-0 grid-cols-[140px_480px_280px] gap-4">
        <LeftRail eyebrow="Content" items={prod.dashboard.leftRail} />

        {/* Editor: the draft mid-check */}
        <div className="flex w-full flex-col rounded-[18px] border border-line bg-paper p-4">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[20px] font-semibold text-ink-900">
                Product launch article
              </p>
              <p className="mt-0.5 text-[14px] text-ink-300">Draft v3 · autosaved just now</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[8px] bg-green-50 px-2 py-1 text-[14px] font-semibold text-green-600">
              <BookMarked size={14} aria-hidden />
              Reads 42 ledger entries
            </span>
          </div>

          <div className="mt-3 flex-1 text-[17px] leading-[1.6] text-ink-700">
            <p>
              Launch day.{" "}
              <span className="rounded-[4px] bg-success/10 px-0.5 underline decoration-success decoration-2 underline-offset-2">
                Self-custody stays with the user
              </span>{" "}
              from the first transaction — keys never leave the wallet, and
              nothing about that changes at scale.
            </p>
            <p className="mt-2">
              The new dashboard ships to every plan this week and{" "}
              <span className="rounded-[4px] bg-warning/10 px-0.5 underline decoration-warning decoration-2 underline-offset-2">
                cuts settlement times by 80%
              </span>{" "}
              compared with the previous release.
            </p>
          </div>

          {/* Flag card — the check doing its work */}
          <div className="mt-3 rounded-[13px] border border-warning/30 bg-warning/10 p-3">
            <div className="flex items-center gap-2">
              <BookMarked size={16} className="text-warning" aria-hidden />
              <p className="text-[15px] font-semibold text-ink-900">
                Outside approved scope · Ledger #142
              </p>
            </div>
            <p className="mt-1.5 text-[14px] leading-snug text-ink-700">
              The approved claim says “up to 40% faster settlement”. Replace it,
              or send the new number for approval.
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="rounded-[8px] bg-green-500 px-2.5 py-1 text-[14px] font-semibold text-white">
                Apply approved claim
              </span>
              <span className="rounded-[8px] border border-line bg-paper px-2.5 py-1 text-[14px] font-medium text-ink-500">
                Request approval
              </span>
            </div>
          </div>

          <p className="mt-2 flex items-center gap-1.5 text-[14px] font-medium text-success">
            <CheckCheck size={15} aria-hidden />
            Correction kept — the “self-custody” wording is now a rule.
          </p>
        </div>

        {/* Right column — dense check/approval widgets, no dead space */}
        <div className="flex min-h-0 flex-col gap-3">
          <KpiTiles
            tiles={[
              { label: "Claims", value: "12", sub: "2 flagged", cls: "text-warning" },
              { label: "Terms", value: "8", sub: "all clear", cls: "text-success" },
              { label: "Tone", value: "96%", sub: "on voice", cls: "text-success" },
            ]}
          />

          <SidePanel title="Corrections kept" meta="5 this week">
            <div className="flex flex-col gap-1.5">
              {corrections.map((c) => (
                <div key={c.fix} className="flex items-center gap-2.5 rounded-[10px] bg-sunken/40 px-2.5 py-1.5">
                  <p className="min-w-0 flex-1 truncate text-[14px] font-medium text-ink-700">{c.fix}</p>
                  <span className="shrink-0 text-[12px] font-medium text-green-600">{c.note}</span>
                </div>
              ))}
            </div>
          </SidePanel>

          <SidePanel title="Versions" meta="this draft">
            <div className="flex flex-col gap-1.5">
              {versions.map((v) => (
                <div key={v.label} className="flex items-center gap-2">
                  <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-ink-700">
                    {v.label}
                  </span>
                  <span className={`shrink-0 rounded-[6px] px-1.5 py-px text-[12px] font-semibold ${TONE_COLORS[v.tone]}`}>
                    {v.when}
                  </span>
                </div>
              ))}
            </div>
          </SidePanel>

          <SignatureCard
            Icon={CheckCheck}
            title="Ready for review"
            sub="2 fixes applied · awaiting sign-off"
            action="Approve"
          />
        </div>
      </div>
    </MiniApp>
  );
}

// ── Operations: policy updated once, every doc follows ──────────────────────
function OperationsPreview({ prod }: { prod: Showcase }) {
  return (
    <MiniApp
      name={prod.dashboard.appName}
      search={prod.dashboard.searchPlaceholder}
      subnav={
        <SubnavTabs
          tabs={prod.dashboard.subnavTabs}
          secondary={prod.dashboard.secondaryAction}
          primary={prod.dashboard.primaryAction}
          PrimaryIcon={prod.Icon}
        />
      }
    >
      <div className="grid h-full min-h-0 grid-cols-[140px_480px_280px] gap-4">
        <LeftRail eyebrow="Operations" items={prod.dashboard.leftRail} />

        {/* The policy being changed — one edit, shown as a diff */}
        <div className="flex w-full flex-col rounded-[18px] border border-line bg-paper p-4">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[20px] font-semibold text-ink-900">Leave policy</p>
              <p className="mt-0.5 text-[14px] text-ink-300">v12 · approved by HR today</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[8px] bg-green-50 px-2 py-1 text-[14px] font-semibold text-green-600">
              <BookMarked size={14} aria-hidden />
              Source of truth
            </span>
          </div>

          <div className="mt-3 text-[17px] leading-[1.6] text-ink-700">
            <p>
              Annual leave is{" "}
              <span className="text-ink-300 line-through decoration-ink-300">
                20 days, carried over on request
              </span>{" "}
              <span className="rounded-[4px] bg-success/10 px-0.5 underline decoration-success decoration-2 underline-offset-2">
                25 days, and five carry over automatically
              </span>
              . The change applies from the next calendar year for every region.
            </p>
          </div>

          {/* The fan-out: every doc redrafted from the one rule */}
          <div className="mt-3 flex-1 rounded-[13px] border border-line bg-surface p-3">
            <p className="text-[14px] font-semibold text-ink-900">
              3 documents follow this rule
            </p>
            <div className="mt-2 flex flex-col gap-1.5">
              {[
                { label: "Handbook · Time off page", status: "Updated", tone: "live" as Tone },
                { label: "All-hands note · policy change", status: "Draft ready", tone: "review" as Tone },
                { label: "Manager brief · leave requests", status: "Updated", tone: "live" as Tone },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-2.5 rounded-[10px] bg-paper px-2.5 py-1.5 ring-1 ring-line">
                  <FileText size={14} className="shrink-0 text-ink-500" aria-hidden />
                  <p className="min-w-0 flex-1 truncate text-[14px] font-medium text-ink-700">{r.label}</p>
                  <span className={`shrink-0 rounded-[6px] px-1.5 py-px text-[12px] font-semibold ${TONE_COLORS[r.tone]}`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-2 flex items-center gap-1.5 text-[14px] font-medium text-success">
            <CheckCheck size={15} aria-hidden />
            Same wording as your customer copy — one rule, every doc.
          </p>
        </div>

        <div className="flex min-h-0 flex-col gap-3">
          <KpiTiles
            tiles={[
              { label: "Policies", value: "24", sub: "in sync", cls: "text-success" },
              { label: "Docs", value: "61", sub: "follow rules", cls: "text-success" },
              { label: "Updates", value: "3", sub: "this week", cls: "text-warning" },
            ]}
          />
          <SidePanel title={prod.dashboard.rightRail.eyebrow} meta="from this change">
            <QueueRows rows={prod.dashboard.rightRail.rows} />
          </SidePanel>
          <SignatureCard
            Icon={ShieldCheck}
            title="Changed once, everywhere"
            sub="Each doc drafts from the one rule"
          />
        </div>
      </div>
    </MiniApp>
  );
}

// ── Customer Support: a reply built on the same facts as the website ────────
function SupportPreview({ prod }: { prod: Showcase }) {
  return (
    <MiniApp
      name={prod.dashboard.appName}
      search={prod.dashboard.searchPlaceholder}
      subnav={
        <SubnavTabs
          tabs={prod.dashboard.subnavTabs}
          secondary={prod.dashboard.secondaryAction}
          primary={prod.dashboard.primaryAction}
          PrimaryIcon={prod.Icon}
        />
      }
    >
      <div className="grid h-full min-h-0 grid-cols-[140px_480px_280px] gap-4">
        <LeftRail eyebrow="Support" items={prod.dashboard.leftRail} />

        {/* The ticket: question above, checked draft below */}
        <div className="flex w-full flex-col rounded-[18px] border border-line bg-paper p-4">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[20px] font-semibold text-ink-900">
                Refund window question
              </p>
              <p className="mt-0.5 text-[14px] text-ink-300">Ticket 4821 · reply draft</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[8px] bg-green-50 px-2 py-1 text-[14px] font-semibold text-green-600">
              <BookMarked size={14} aria-hidden />
              Reads 3 entries
            </span>
          </div>

          <div className="mt-3 rounded-[13px] bg-sunken/60 p-3">
            <p className="text-[13px] font-medium text-ink-300">Customer · 2h</p>
            <p className="mt-1 text-[16px] leading-[1.55] text-ink-700">
              We&rsquo;re past the 30-day mark — can we still get a refund on the
              annual plan?
            </p>
          </div>

          <div className="mt-2 flex-1 rounded-[13px] border border-green-200 bg-paper p-3">
            <p className="text-[13px] font-medium text-ink-300">Draft reply · checked</p>
            <p className="mt-1 text-[16px] leading-[1.55] text-ink-700">
              Yes — annual plans have a{" "}
              <span className="rounded-[4px] bg-success/10 px-0.5 underline decoration-success decoration-2 underline-offset-2">
                60-day refund window
              </span>
              . I&rsquo;ve started yours; it reaches your account in 5–7 business
              days.
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-[8px] bg-green-50 px-2 py-1 text-[13px] font-medium text-green-700">
              <BookMarked size={13} aria-hidden />
              Cites: Refund policy · current version
            </p>
          </div>

          <p className="mt-2 flex items-center gap-1.5 text-[14px] font-medium text-warning">
            <ShieldCheck size={15} aria-hidden />
            Regional processing time is outside approved facts — routed to a
            reviewer, not guessed.
          </p>
        </div>

        <div className="flex min-h-0 flex-col gap-3">
          <KpiTiles
            tiles={[
              { label: "Open", value: "14", sub: "in inbox", cls: "text-ink-500" },
              { label: "Escalated", value: "2", sub: "to a person", cls: "text-warning" },
              { label: "On policy", value: "96%", sub: "replies", cls: "text-success" },
            ]}
          />
          <SidePanel title={prod.dashboard.rightRail.eyebrow} meta="today">
            <QueueRows rows={prod.dashboard.rightRail.rows} />
          </SidePanel>
          <SignatureCard
            Icon={CheckCheck}
            title="Corrected once"
            sub="The next reply already has the fix"
          />
        </div>
      </div>
    </MiniApp>
  );
}

// ── AI Studio: a tool being built on the same rules ─────────────────────────
function StudioPreview({ prod }: { prod: Showcase }) {
  const steps: { label: string; meta: string; tone: Tone; Icon: LucideIcon }[] = [
    { label: "Read changelog", meta: "Done", tone: "live", Icon: FileText },
    { label: "Read ledger · scope + voice", meta: "Done", tone: "live", Icon: BookMarked },
    { label: "Draft release notes", meta: "Done", tone: "live", Icon: PenLine },
    { label: "New claim found → reviewer", meta: "1 waiting", tone: "review", Icon: ShieldCheck },
    { label: "Publish to Content", meta: "Queued", tone: "draft", Icon: Boxes },
  ];
  return (
    <MiniApp
      name={prod.dashboard.appName}
      search={prod.dashboard.searchPlaceholder}
      subnav={
        <SubnavTabs
          tabs={prod.dashboard.subnavTabs}
          secondary={prod.dashboard.secondaryAction}
          primary={prod.dashboard.primaryAction}
          PrimaryIcon={prod.Icon}
        />
      }
    >
      <div className="grid h-full min-h-0 grid-cols-[140px_480px_280px] gap-4">
        <LeftRail eyebrow="AI Studio" items={prod.dashboard.leftRail} />

        {/* The tool under construction, as its pipeline */}
        <div className="flex w-full flex-col rounded-[18px] border border-line bg-paper p-4">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[20px] font-semibold text-ink-900">
                Release notes tool
              </p>
              <p className="mt-0.5 text-[14px] text-ink-300">v0.4 · run 12 · just now</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[8px] bg-green-50 px-2 py-1 text-[14px] font-semibold text-green-600">
              <BookMarked size={14} aria-hidden />
              Ledger read: 2 entry types
            </span>
          </div>

          <div className="mt-3 flex flex-1 flex-col gap-1.5">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${
                    s.tone === "live"
                      ? "bg-green-500 text-white"
                      : s.tone === "review"
                        ? "bg-warning/10 text-warning ring-1 ring-warning/30"
                        : "bg-sunken text-ink-300"
                  }`}
                >
                  <s.Icon size={16} aria-hidden />
                </span>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-[12px] border border-line bg-surface px-3 py-2">
                  <p className="min-w-0 flex-1 truncate text-[15px] font-medium text-ink-700">
                    {i + 1}. {s.label}
                  </p>
                  <span className={`shrink-0 rounded-[6px] px-1.5 py-px text-[12px] font-semibold ${TONE_COLORS[s.tone]}`}>
                    {s.meta}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-2 flex items-center gap-1.5 text-[14px] font-medium text-success">
            <CheckCheck size={15} aria-hidden />
            Same approval gate and log as every other draft.
          </p>
        </div>

        <div className="flex min-h-0 flex-col gap-3">
          <KpiTiles
            tiles={[
              { label: "Tools", value: "3", sub: "built", cls: "text-success" },
              { label: "Runs", value: "41", sub: "tests", cls: "text-ink-500" },
              { label: "Passed", value: "87%", sub: "last 20", cls: "text-success" },
            ]}
          />
          <SidePanel title={prod.dashboard.rightRail.eyebrow} meta="latest">
            <QueueRows rows={prod.dashboard.rightRail.rows} />
          </SidePanel>
          <SignatureCard
            Icon={Zap}
            title="Run 12 passed"
            sub="Every claim matched approved scope"
            action="Deploy"
          />
        </div>
      </div>
    </MiniApp>
  );
}

// ── Ledger: the record itself, including what was ruled out ─────────────────
function LedgerPreview({ prod }: { prod: Showcase }) {
  const entries: { label: string; type: string; status: string; tone: Tone; when: string }[] = [
    { label: "Quote ranges, not fixed prices", type: "Decision", status: "Recorded", tone: "live", when: "Today" },
    { label: "“Self-custody” wording", type: "Voice", status: "Recorded", tone: "live", when: "Today" },
    { label: "Refund window · 60 days", type: "Policy", status: "Recorded", tone: "live", when: "This week" },
    { label: "“Instant settlement”", type: "Claim", status: "Retired", tone: "draft", when: "2 days ago" },
    { label: "Uptime numbers in marketing", type: "Ruled out", status: "Never say", tone: "review", when: "Last week" },
  ];
  return (
    <MiniApp
      name={prod.dashboard.appName}
      search={prod.dashboard.searchPlaceholder}
      subnav={
        <SubnavTabs
          tabs={prod.dashboard.subnavTabs}
          secondary={prod.dashboard.secondaryAction}
          primary={prod.dashboard.primaryAction}
          PrimaryIcon={prod.Icon}
        />
      }
    >
      <div className="grid h-full min-h-0 grid-cols-[140px_480px_280px] gap-4">
        <LeftRail eyebrow="Ledger" items={prod.dashboard.leftRail} />

        {/* The record: entries with type, status and history — including the
            row competitors don't keep, what the company decided NOT to say. */}
        <div className="flex w-full flex-col rounded-[18px] border border-line bg-paper p-4">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[20px] font-semibold text-ink-900">
                Approved entries
              </p>
              <p className="mt-0.5 text-[14px] text-ink-300">312 recorded · 86 decisions</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[8px] bg-green-50 px-2 py-1 text-[14px] font-semibold text-green-600">
              <BookMarked size={14} aria-hidden />
              Read by 5 tools over MCP
            </span>
          </div>

          <div className="mt-3 flex flex-1 flex-col gap-1.5">
            {entries.map((e) => (
              <div
                key={e.label}
                className={`flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 ${
                  e.type === "Ruled out"
                    ? "border border-warning/30 bg-warning/10"
                    : "bg-sunken/40"
                }`}
              >
                <p className="min-w-0 flex-1 truncate text-[15px] font-medium text-ink-700">
                  {e.label}
                </p>
                <span className="shrink-0 text-[12px] font-medium uppercase tracking-wide text-ink-300">
                  {e.type}
                </span>
                <span className={`shrink-0 rounded-[6px] px-1.5 py-px text-[12px] font-semibold ${TONE_COLORS[e.tone]}`}>
                  {e.status}
                </span>
                {/* Never viewport-gated — see STATIC_CHROME above. */}
                <span className="shrink-0 text-[12px] text-ink-300">{e.when}</span>
              </div>
            ))}
          </div>

          <MoatStrip
            label="Decision, scope, history. One schema, never varies."
            chips={["Decision", "Scope", "History", "Sources"]}
          />
        </div>

        <div className="flex min-h-0 flex-col gap-3">
          <KpiTiles
            tiles={[
              { label: "Entries", value: "312", sub: "approved", cls: "text-success" },
              { label: "Decisions", value: "86", sub: "recorded", cls: "text-success" },
              { label: "Tools", value: "5", sub: "reading", cls: "text-ink-500" },
            ]}
          />
          <SidePanel title={prod.dashboard.rightRail.eyebrow} meta="with who + when">
            <QueueRows rows={prod.dashboard.rightRail.rows} />
          </SidePanel>
          <SignatureCard
            Icon={BookMarked}
            title="Yours to export"
            sub="The full record, any time"
            action="Export"
          />
        </div>
      </div>
    </MiniApp>
  );
}

const PREVIEW_BY_SLUG: Record<string, (p: { prod: Showcase }) => React.JSX.Element> = {
  content: ContentPreview,
  marketing: MarketingPreview,
  operations: OperationsPreview,
  "customer-support": SupportPreview,
  "ai-studio": StudioPreview,
  ledger: LedgerPreview,
};

// Product name with the brand mark standing in for the letter "n". Only three of
// the six names contain one — the rest render as plain text rather than forcing
// the device where it doesn't fit.
function SurfaceName({
  prod,
  px,
  weight,
  className,
}: {
  prod: Showcase;
  px?: number;
  weight?: number;
  className?: string;
}) {
  if (!prod.hasN) {
    return (
      <span
        className={className}
        style={px !== undefined ? { fontSize: px, fontWeight: weight, lineHeight: 1 } : undefined}
      >
        {prod.name}
      </span>
    );
  }
  return (
    <ProductName
      name={prod.name}
      pre={prod.pre}
      post={prod.post}
      px={px}
      weight={weight}
      tone="light"
      className={className}
    />
  );
}

function StatusPill({ status, accent }: { status: Showcase["status"]; accent: string }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-pill bg-green-500 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-white/90" aria-hidden />
        Live
      </span>
    );
  }
  return (
    <span
      style={{ color: accent }}
      className="inline-flex items-center rounded-pill border border-current px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] opacity-70"
    >
      In development
    </span>
  );
}

export default function ProductShowcaseSection() {
  // Default to Marketing (index 1 in PRODUCTS).
  const [active, setActive] = useState(1);
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
      <div className="mx-auto max-w-[1200px] px-6 py-24 max-sm:pb-12 md:py-28">
        {/* Intro */}
        <div className="mx-auto max-w-2xl text-center">
          <Link
            href="/platform"
            className="inline-flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500 transition-colors hover:text-green-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
            The platform
          </Link>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.75rem]">
            Everything your company writes, checked the same way.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-500">
            Content and the Ledger are live in private beta; the other four
            parts are being built on the same rules. Whichever part you write
            in, the draft is checked against what your company has approved,
            and your corrections are kept.
          </p>
        </div>

        {/* Tab row — hidden below `sm`, where the arrow row below the carousel
            becomes the sole control. Six tiles never fit a phone without
            sideways scroll; the arrow row already existed for mobile, so this
            just removes the redundant scroller. */}
        <div
          role="tablist"
          aria-label="Narrations surfaces"
          onKeyDown={onKeyDown}
          className="mt-12 hidden flex-wrap justify-center gap-2 sm:flex"
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
                <SurfaceName
                  prod={prod}
                  px={14}
                  weight={selected ? 600 : 500}
                  className={`text-center tracking-tight ${selected ? "" : "text-ink-700"}`}
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
              className="flex motion-safe:transition-transform motion-safe:duration-[400ms] motion-safe:ease-[cubic-bezier(0.76,0,0.24,1)]"
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
                    {/* Left — dashboard floating on a tinted ground, bleeding
                        off the right + bottom edges (clipped). */}
                    <div
                      style={{ backgroundColor: C.tile }}
                      className="relative min-h-[320px] overflow-hidden pl-6 pt-6 sm:pl-9 sm:pt-9 lg:min-h-[460px]"
                    >
                      <ScaledPreview>
                        {(() => {
                          const P = PREVIEW_BY_SLUG[prod.slug];
                          return <P prod={prod} />;
                        })()}
                      </ScaledPreview>
                    </div>

                    {/* Right — tinted copy pane, joined seamlessly to the left. */}
                    <div
                      style={{ backgroundColor: C.tint }}
                      className="flex flex-col justify-center p-7 sm:p-10"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <p
                          style={{ color: C.accent }}
                          className="text-[12px] font-semibold uppercase tracking-[0.16em]"
                        >
                          {prod.vertical}
                        </p>
                        <StatusPill status={prod.status} accent={C.accent} />
                      </div>
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
            aria-label="Previous surface"
            className="absolute -left-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 shadow-card transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-paper lg:flex"
          >
            <ChevronLeft size={20} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === LAST}
            aria-label="Next surface"
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
            aria-label="Previous surface"
            className="flex h-11 w-11 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <SurfaceName
            prod={PRODUCTS[active]}
            px={17}
            weight={600}
            className="min-w-[150px] text-center tracking-tight text-ink-900"
          />
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === LAST}
            aria-label="Next surface"
            className="flex h-11 w-11 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
