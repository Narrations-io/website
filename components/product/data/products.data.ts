import {
  PenLine,
  Megaphone,
  MessagesSquare,
  TrendingUp,
  Radar,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Capability = {
  title: string;
  body: string;
};

export type HowItWorksBlock = {
  label: string;
  body: string;
};

export type ProofItem = {
  stat: string;
  label: string;
  detail: string;
};

export type ProductData = {
  slug: string;
  name: string;
  pre: string;
  post: string;
  vertical: string;
  icon: LucideIcon;
  cardDesc: string;
  h1: string;
  promise: string;
  capabilitiesHeading: string;
  capabilities: Capability[];
  howItWorksBlocks: HowItWorksBlock[];
  howItWorksFlow: string[];
  whoItsFor: { body: string; tags: string[] };
  proof: ProofItem[];
  suiProof: boolean;
  meta: { title: string; description: string };
};

export const PRODUCTS: ProductData[] = [
  // ── 1. CONTENT ─────────────────────────────────────────────────────────────
  {
    slug: "content",
    name: "Content",
    pre: "Conte",
    post: "t",
    vertical: "Content & Creative",
    icon: PenLine,
    cardDesc:
      "Plan, produce, and publish on-brand content across every format, articles, social, scripts, and creative.",
    h1: "Every format, one voice.",
    promise:
      "Content turns one narrative into every format you publish: web pages, articles, newsletters, visuals, video, product education, and full academies, with editorial review before anything ships.",
    capabilitiesHeading: "Built for every format. Grounded in your brand.",
    capabilities: [
      {
        title: "Creative engine",
        body: "Every draft grounded in your docs, voice, and history.",
      },
      {
        title: "Works across formats",
        body: "One narrative repurposed across written, visual, and video.",
      },
      {
        title: "Editorial review gate",
        body: "Proven on education: multiple academies built from scratch.",
      },
      {
        title: "Write less, think more",
        body: "A scheduled workflow, not a chat window.",
      },
    ],
    howItWorksBlocks: [
      {
        label: "Brand memory",
        body: "One source of voice everything inherits. Every asset draws from the brand's own docs, past content, and positioning, so nothing sounds generic.",
      },
      {
        label: "The Orchestrator",
        body: "Coordinates Content with the other products toward a goal, with approvals built in, not autonomous spend.",
      },
      {
        label: "Operators",
        body: "Expert editors review the high-stakes work. Software plus operators, not raw generation.",
      },
    ],
    howItWorksFlow: [
      "Brief in",
      "Draft from Brand Memory, in your voice",
      "Editorial review",
      "Deliver on a schedule",
    ],
    whoItsFor: {
      body: "Used across all stages, pre-seed to enterprise, and across Web3, AI, fintech, RWA, deeptech, gaming, midsize e-commerce, and private services. Buyers are founders, C-suite, CMOs, and heads of growth. The strongest fit: crypto-native teams on exchanges, L1/L2 foundations, and wallets; and teams publishing large content surfaces, academies, glossaries, documentation.",
      tags: [
        "Web3",
        "Exchanges",
        "L1/L2 Foundations",
        "AI Startups",
        "Fintech",
        "Deeptech",
        "Gaming",
        "E-commerce",
      ],
    },
    proof: [
      {
        stat: "400+",
        label: "Ledger Academy pieces",
        detail: "Built from zero to 400+ pieces in four months.",
      },
      {
        stat: "15%",
        label: "SEO market share",
        detail: "Captured by Ledger Academy in four months.",
      },
      // Removed a fabricated "50,000+ ICP views" stat — that number is not in
      // CLAUDE.md §8's confirmed list and attached an invented metric to a named
      // client. Sui is already shown via `suiProof` (website brand refresh); the
      // Sui-email and 75+ media-network points belong to Marketing/Communication.
      // A 4th Content-specific proof point needs SME sign-off:
      /* TODO: case study — needs SME sign-off */
      {
        stat: "50,000+",
        label: "Assets delivered",
        detail: "Across formats, across 200+ projects since 2016.",
      },
    ],
    suiProof: true,
    meta: {
      title: "Content, Narrations",
      description:
        "Every format you publish, web, written, visual, video, and educational, on brand, from a memory trained on your own material, with expert editors in the loop.",
    },
  },

  // ── 2–6. STUBS (typed correctly; copy to follow) ───────────────────────────
  {
    slug: "marketing",
    name: "Marketing",
    pre: "Marketi",
    post: "g",
    vertical: "Marketing & Distribution",
    icon: Megaphone,
    cardDesc:
      "Run campaigns and distribution end to end, so the right message reaches the right channels and audiences.",
    h1: "Every channel, measured.",
    promise:
      "Marketing runs your whole distribution: social, newsletters, PR, SEO, email, and out-of-home, from one measured surface, with AI-search reporting that keeps your GTM on track.",
    capabilitiesHeading: "Every channel, on one measured surface.",
    capabilities: [
      {
        title: "One measured surface",
        body: "Every creative and the spend behind it, tracked against live results.",
      },
      {
        title: "AI-search visibility (GEO)",
        body: "Tracks how ChatGPT, Perplexity, and AI Overviews cite you.",
      },
      {
        title: "Email & lifecycle",
        body: "SEO and GEO managed side by side, built to rank and be cited.",
      },
      {
        title: "Paid & performance",
        body: "Ran email for a 400,000+ subscriber base.",
      },
    ],
    howItWorksBlocks: [
      {
        label: "Brand memory",
        body: "Every channel publishes on the brand's voice, inherited from Content's brand & messaging system, nothing drifts off-brand.",
      },
      {
        label: "The Orchestrator",
        body: "Coordinates Marketing's campaigns with the other products toward a goal, with human approvals built in, not autonomous spend.",
      },
      {
        label: "Operators",
        body: "Expert operators run distribution and review the high-stakes campaigns.",
      },
    ],
    howItWorksFlow: [
      "Plan channels & calendar",
      "Produce and schedule on-brand",
      "Improve GEO & SEO visibility",
      "Measure against outcomes & reallocate",
    ],
    whoItsFor: {
      body: "Used across all stages, pre-seed to enterprise, and across Web3, AI, fintech, RWA, deeptech, gaming, midsize e-commerce, and private services. Buyers are founders, C-suite, CMOs, and heads of growth. Strongest fit: Web3 teams running launches and token events (social, quests, wallet triggers, and GEO together); AI and fintech startups where AI-search visibility is urgent; and growth-stage consumer brands needing multi-market lifecycle and SEO at scale.",
      tags: [
        "Web3",
        "Token Launches",
        "Exchanges",
        "AI Startups",
        "Fintech",
        "Consumer Crypto",
        "GEO",
      ],
    },
    proof: [
      {
        stat: "15–20%",
        label: "Binance traffic growth",
        detail: "Quarterly SEO-backed growth at Binance Futures & Options.",
      },
      {
        stat: "400,000+",
        label: "Sui subscriber base",
        detail: "+18% open and click-through across the Sui Foundation lifecycle.",
      },
      {
        stat: "50,000",
        label: "Skrill followers",
        detail: "Scaled the Skrill crypto social account to 50,000 followers.",
      },
      {
        stat: "10+",
        label: "Local markets",
        detail: "~25% content-visibility lift across 10+ markets with affiliates and KOLs.",
      },
    ],
    suiProof: false,
    meta: {
      title: "Marketing, Narrations",
      description:
        "Your whole distribution and demand operation, social, SEO, GEO, email, and paid, from one measured surface, with crypto-native mechanics and AI-search visibility, on your brand's voice.",
    },
  },
  {
    slug: "operations",
    name: "Operations",
    pre: "Operatio",
    post: "s",
    vertical: "Operations & Support",
    icon: Workflow,
    cardDesc:
      "Automate the day-to-day, workflows, support, and internal processes, so execution keeps pace with growth.",
    h1: "Run the business, on brand.",
    promise:
      "Operations runs the layer behind the brand: support, internal workflows, and people-facing comms, with sign-off on anything sensitive, so you scale without the manual overhead.",
    capabilitiesHeading: "Run operations and support, on brand, with control.",
    capabilities: [
      {
        title: "On-brand support",
        body: "Support that answers in your voice and knows when to escalate.",
      },
      {
        title: "Internal operations",
        body: "SOPs and reporting that stay current as you grow.",
      },
      {
        title: "Legal & compliance comms",
        body: "Compliance language drafted behind approval gates.",
      },
      {
        title: "Customer success",
        body: "Onboarding built once, for customers and employees alike.",
      },
    ],
    howItWorksBlocks: [
      {
        label: "Brand memory",
        body: "Support and internal comms answer on the brand's voice from the same shared memory as everything else.",
      },
      {
        label: "The Orchestrator",
        body: "Coordinates Operations with the other products toward a goal, with human approvals, not autonomous spend.",
      },
      {
        label: "Operators",
        body: "Humans handle escalations, and sensitive comms pass through approval gates.",
      },
    ],
    howItWorksFlow: [
      "A question or task comes in",
      "Answer on-brand / draft comms",
      "Route sensitive items through approval gates",
      "Resolve, with humans where needed",
    ],
    whoItsFor: {
      body: "Used across all stages, pre-seed to enterprise, and across Web3, AI, fintech, RWA, deeptech, gaming, midsize e-commerce, and private services. Buyers are founders, C-suite, CMOs, and heads of growth. Strongest fit: community-driven Web3 products with heavy Discord and Telegram support load; fintech and regulated teams needing approval-gated compliance comms; and AI and SaaS startups scaling onboarding and customer success.",
      tags: [
        "Web3",
        "Communities",
        "Fintech",
        "AI / SaaS",
        "Regulated",
        "Customer Success",
      ],
    },
    proof: [
      {
        stat: "$25M+",
        label: "Institutional ops pedigree",
        detail:
          "Approval-and-compliance posture built on the founders' Hedgit operations, compliance, KYC/KYB, and reporting behind a $25M+ AUM firm.",
      },
    ],
    suiProof: false,
    meta: {
      title: "Operations, Narrations",
      description:
        "Support, internal ops, and people-facing comms in one product, on-brand, with escalation and approval gates, so the business runs with less manual overhead.",
    },
  },
  {
    slug: "finance",
    name: "Finance",
    pre: "Fina",
    post: "ce",
    vertical: "Finance & Growth",
    icon: TrendingUp,
    cardDesc:
      "Support fundraising and growth, investor materials, datarooms, tokenomics, and reporting.",
    h1: "Win the raise. Run the money.",
    promise:
      "Finance turns your narrative into capital and runs the money behind it: investor materials, datarooms, economic models, and an always-current financial picture, from one Brand Memory.",
    capabilitiesHeading: "From deal-ready materials to a live financial picture.",
    capabilities: [
      {
        title: "Investor materials",
        body: "Economic model work behind $300M+ in raises.",
      },
      {
        title: "Dataroom & investor CRM",
        body: "Access-controlled datarooms with a tracked investor pipeline.",
      },
      {
        title: "Economic model design",
        body: "Live runway and burn tracking, alert-driven.",
      },
      {
        title: "Reporting & forecasting",
        body: "P&L, cash flow, and forecasts in plain language.",
      },
    ],
    howItWorksBlocks: [
      {
        label: "Brand memory",
        body: "Every investor artifact is generated from the brand's own memory, so materials stay consistent and non-contradictory.",
      },
      {
        label: "The Orchestrator",
        body: "Coordinates a raise across Finance, Content, and Communication toward one goal, with approvals built in.",
      },
      {
        label: "Operators",
        body: "Operators review high-stakes investor materials before anything goes out.",
      },
    ],
    howItWorksFlow: [
      "Brief the raise",
      "Generate materials & model tokenomics",
      "Stand up the dataroom & track investors",
      "Report financials on a schedule",
    ],
    whoItsFor: {
      body: "Used across all stages, pre-seed to enterprise, and across Web3, AI, fintech, RWA, deeptech, gaming, midsize e-commerce, and private services. Buyers are founders, C-suite, CMOs, and heads of growth. Strongest fit: token and Web3 startups actively raising (investor materials, tokenomics, and dataroom together); RWA and institutional raises with a high diligence bar; and AI, deeptech, and fintech startups raising or managing capital.",
      tags: [
        "Web3",
        "Token Projects",
        "RWA / Tokenization",
        "Fintech",
        "Deeptech",
        "AI Startups",
      ],
    },
    proof: [
      {
        stat: "$300M+",
        label: "Raised, informed by our work",
        detail: "Tokenomics and investor materials that informed $300M+ in capital raised.",
      },
      {
        stat: "$25M+",
        label: "AUM behind the IR stack",
        detail: "Investor materials and dataroom productized from a real institutional operation.",
      },
      {
        stat: "30+",
        label: "Institutional clients",
        detail: "Served by the institutional IR and dataroom stack the product is built from.",
      },
      {
        stat: "200+",
        label: "Projects since 2016",
        detail: "Whitepapers, litepapers, decks, and tokenomics across 200+ projects.",
      },
    ],
    suiProof: false,
    meta: {
      title: "Finance, Narrations",
      description:
        "Turn your narrative into capital and run the money behind it, institutional-grade investor materials, token models, and a clear, always-current financial picture, from one brand memory.",
    },
  },
  {
    slug: "intelligence",
    name: "Intelligence",
    pre: "Intellige",
    post: "ce",
    vertical: "Intelligence",
    icon: Radar,
    cardDesc:
      "Turn market, competitor, and on-chain signals into research, diligence, and decisions your team can act on.",
    h1: "Be ahead of the narrative.",
    promise:
      "Intelligence is your sensing layer: live narrative detection, competitive intelligence, multi-touch attribution, and decision-ready research, in one view of the market and your own performance.",
    capabilitiesHeading: "Sense the market. Prove what works.",
    capabilities: [
      {
        title: "Live narrative detection",
        body: "Narratives scored from emerging to peaking to fading.",
      },
      {
        title: "Competitive intelligence",
        body: "Competitor profiles that never go stale.",
      },
      {
        title: "Multi-touch attribution",
        body: "ROI attributed touch by touch, down to the transaction.",
      },
      {
        title: "Research & due-diligence",
        body: "Real-time alerts when a signal spikes.",
      },
    ],
    howItWorksBlocks: [
      {
        label: "Brand memory",
        body: "Signals are contextualized to the brand's own positioning, so insight is relevant, not generic.",
      },
      {
        label: "The Orchestrator",
        body: "Routes insights to the right product, narrative hooks to Content and Marketing, with approvals built in.",
      },
      {
        label: "Operators",
        body: "Operators structure diligence and review the high-stakes analysis.",
      },
    ],
    howItWorksFlow: [
      "Connect data sources",
      "Detect narratives & map drivers",
      "Attribute touchpoints to wallets",
      "Decide & reallocate",
    ],
    whoItsFor: {
      body: "Used across all stages, pre-seed to enterprise, and across Web3, AI, fintech, RWA, deeptech, gaming, midsize e-commerce, and private services. Buyers are founders, C-suite, CMOs, and heads of growth. Strongest fit: crypto teams running on-chain campaigns and competing on narrative; AI startups in fast narrative cycles; and funds, strategists, and investors who need decision-structured research and diligence.",
      tags: [
        "Web3",
        "On-chain",
        "AI Startups",
        "RWA / Institutional",
        "Investors",
        "DeFi",
      ],
    },
    proof: [
      {
        stat: "Crypto-native",
        label: "On-chain attribution",
        detail:
          "Touchpoint-to-wallet mapping and multi-touch ROI by channel, campaign, and creator, an edge generalist tools can't replicate.",
      },
    ],
    suiProof: false,
    meta: {
      title: "Intelligence, Narrations",
      description:
        "Narrative, competitive, and on-chain intelligence in one product, detect narratives early, attribute touchpoints to wallets, and back decisions with structured research.",
    },
  },
  {
    slug: "communication",
    name: "Communication",
    pre: "Communicatio",
    post: "",
    vertical: "Comms & Reputation",
    icon: MessagesSquare,
    cardDesc:
      "Own your narrative across PR, announcements, and reputation, coordinated across your channels and the press.",
    h1: "Be seen, be trusted.",
    promise:
      "Communication manages how your brand is seen and talked about: earned media, community, and reputation, backed by a real network of 75+ outlets and human operators.",
    capabilitiesHeading: "Earned media, community, and reputation, as one operation.",
    capabilities: [
      {
        title: "A real media network",
        body: "75+ outlets with placements negotiated by humans.",
      },
      {
        title: "Community management",
        body: "Community run daily across Discord and Telegram.",
      },
      {
        title: "Listening & sentiment",
        body: "Sentiment tracked, emerging issues flagged early.",
      },
      {
        title: "Thought leadership",
        body: "Thought leadership ghostwritten in your execs' own voices.",
      },
    ],
    howItWorksBlocks: [
      {
        label: "Brand memory",
        body: "Press, community, and executive comms all stay on the brand's voice from one shared memory.",
      },
      {
        label: "The Orchestrator",
        body: "Coordinates Communication with Content and Marketing toward a goal, with approvals built in, not autonomous spend.",
      },
      {
        label: "Operators",
        body: "Operators negotiate placements and review the high-stakes responses.",
      },
    ],
    howItWorksFlow: [
      "Prepare editor-ready materials",
      "Operators negotiate placements",
      "Coverage runs & is reported",
      "Monitor sentiment & respond",
    ],
    whoItsFor: {
      body: "Used across all stages, pre-seed to enterprise, and across Web3, AI, fintech, RWA, deeptech, gaming, midsize e-commerce, and private services. Buyers are founders, C-suite, CMOs, and heads of growth. Strongest fit: Web3 brands with active communities and earned-media needs; RWA and institutional teams where credible coverage and reputation monitoring matter most; and GameFi and consumer crypto with large, active communities.",
      tags: [
        "Web3",
        "Communities",
        "RWA / Institutional",
        "GameFi",
        "Exchanges",
        "AI Startups",
      ],
    },
    proof: [
      {
        stat: "75+",
        label: "Media-outlet network",
        detail:
          "A real, operated network, Benzinga, CoinMarketCap, Decrypt, Invezz, and more, with operator-negotiated placements and coverage reporting.",
      },
    ],
    suiProof: false,
    meta: {
      title: "Communication, Narrations",
      description:
        "Earned media, community, and reputation in one product, a real 75+ outlet network, community management, thought leadership, and real-time sentiment, on your brand's voice.",
    },
  },
];
