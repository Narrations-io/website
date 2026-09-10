import {
  PenLine,
  Megaphone,
  Workflow,
  Headset,
  Boxes,
  BookMarked,
  type LucideIcon,
} from "lucide-react";

// The six parts of the Narrations platform. Single source of truth for their
// names, order and slugs — read by /platform (ProductsOverviewTabs), the
// /enterprise cockpit (DashboardSection) and the homepage hero card
// (newhome/DashboardCard).
//
// Copy register (2026-09-08 rewrite): speak to a buyer, not the deck. Each part
// gets one worked example instead of restating the mechanism — "flags a claim
// you retired last quarter" beats "reads the ledger before it drafts". The
// Ledger is explained as "the list of what your company has approved", never
// leaned on by name alone. Content and Ledger are the live parts.
//
// Trimmed 2026-09-07: cardDesc, capabilitiesHeading, capabilities[].body,
// howItWorksBlocks, howItWorksFlow, whoItsFor, proof, suiProof and meta had zero
// consumers anywhere on the site — they were written for per-product pages that
// were never built. Deleted rather than left dormant.

export type Capability = {
  title: string;
};

export type ProductData = {
  slug: string;
  name: string;
  /** Whether the name contains an "n" the brand mark can stand in for. */
  hasN: boolean;
  /** Text before the accent N (or the full name when hasN is false). */
  pre: string;
  /** Text after the accent N. */
  post: string;
  vertical: string;
  icon: LucideIcon;
  h1: string;
  promise: string;
  /** Exactly 4. The first 3 also render as a bulleted list on /platform. */
  capabilities: Capability[];
};

export const PRODUCTS: ProductData[] = [
  {
    slug: "content",
    name: "Content",
    hasN: true,
    pre: "Conte",
    post: "t",
    vertical: "Articles, decks and docs",
    icon: PenLine,
    h1: "Draft, check, approve, in one editor.",
    promise:
      "An editor for articles, decks, creatives and docs that knows your approved claims, terms and tone. Ask for a blog post on a new feature: it drafts from the approved description, flags a claim you retired last quarter, and keeps your fix.",
    capabilities: [
      { title: "Checks claims and terms" },
      { title: "Articles, decks and docs" },
      { title: "Review before publishing" },
      { title: "Keeps your fixes" },
    ],
  },
  {
    slug: "marketing",
    name: "Marketing",
    hasN: true,
    pre: "Marketi",
    post: "g",
    vertical: "Campaigns and channels",
    icon: Megaphone,
    h1: "One brief, every channel, same claims.",
    promise:
      "One campaign brief becomes social posts, emails, search ads and landing copy that all make the same claims. Ask for the autumn launch and it drafts every channel from the brief, then keeps what performed and what you decided for next time.",
    capabilities: [
      { title: "Social, email, search and ads" },
      { title: "One brief per campaign" },
      { title: "Show up in AI search" },
      { title: "Keeps what worked" },
    ],
  },
  {
    slug: "operations",
    name: "Operations",
    hasN: true,
    pre: "Operatio",
    post: "s",
    vertical: "Policies and internal docs",
    icon: Workflow,
    h1: "Change a policy once. Every doc follows.",
    promise:
      "Policies, handbooks and notices written from the same approved wording as your customer copy. Update the leave policy and the next all-hands note, handbook page and manager brief say the same thing, because each drafts from the one rule.",
    capabilities: [
      { title: "Policies and handbooks" },
      { title: "All-hands and internal notes" },
      { title: "Legal and compliance notices" },
      { title: "Same wording as customer copy" },
    ],
  },
  {
    slug: "customer-support",
    name: "Customer Support",
    hasN: false,
    pre: "Customer Support",
    post: "",
    vertical: "Help centre and replies",
    icon: Headset,
    h1: "Answers that match what marketing promised.",
    promise:
      "Help-centre articles and ticket replies built on the same facts as your website. A customer asks about refunds and the reply uses the current policy, not last year's. Correct an answer once and the next agent's draft already has the fix.",
    capabilities: [
      { title: "Help-centre articles" },
      { title: "Ticket replies and macros" },
      { title: "Same facts as your website" },
      { title: "Corrections carry forward" },
    ],
  },
  {
    slug: "ai-studio",
    name: "AI Studio",
    hasN: false,
    pre: "AI Studio",
    post: "",
    vertical: "Your own tools and agents",
    icon: Boxes,
    h1: "Build your own tools on the same rules.",
    promise:
      "Build agents and internal tools that use your approved facts from the first run: a weekly board digest, a tender assistant for sales, a translation checker. Each passes the same approvals and appears in the same log as everything else.",
    capabilities: [
      { title: "Build agents and tools" },
      { title: "Uses your approved rules" },
      { title: "Same approvals, same log" },
      { title: "Ship inside your own software" },
    ],
  },
  {
    slug: "ledger",
    name: "Ledger",
    hasN: false,
    pre: "Ledger",
    post: "",
    vertical: "Where the rules live",
    icon: BookMarked,
    h1: "Everything you approved, in one place.",
    promise:
      "The Ledger is the list of what your company has approved: claims, terms, tone, pricing rules, with who approved each and when. Every part checks drafts against it, the AI tools you already use can read it through MCP, and you can export it.",
    capabilities: [
      { title: "Claims, terms, tone, pricing" },
      { title: "Who approved what, and when" },
      { title: "Works with your other AI tools" },
      { title: "Yours to export any time" },
    ],
  },
];
