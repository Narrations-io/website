import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import NewsletterSection from "@/components/resources/NewsletterSection";
import ResourcesIndustryRail from "@/components/resources/ResourcesIndustryRail";

export const metadata: Metadata = {
  title: "Resources, Narrations",
  description:
    "The industries we work in and answers to the questions we hear most.",
};

// Industry lines — CONFIRMED from Master KB §11. Deeper per-industry content is a
// scaffold TODO. (Merged in from the former standalone /solutions page.)
const INDUSTRIES = [
  {
    name: "Bitcoin Only",
    line: "A 21% discount on every product for Bitcoin-only companies. We cut the noise and put the signal on top, so your product reaches the plebs. We believe in the mission of hard money and freedom.",
  },
  {
    name: "AI startups",
    line: "The natural twin of crypto, a complex technical product that needs narrative, content, GEO, technical storytelling, community and investor materials to fundraise.",
  },
  {
    name: "Fintech / stablecoins / payments",
    line: "Adjacent to crypto, increasingly institutional; needs compliance-aware content, lifecycle marketing and trust-building.",
  },
  {
    name: "RWA / tokenization & institutional",
    line: "Where crypto meets TradFi; institutions need credible, compliant narrative plus datarooms, investor materials and IR.",
  },
  {
    name: "Deeptech / climate / biotech",
    line: "Complex products that live or die on narrative and investor materials, even without a token.",
  },
  {
    name: "Gaming / GameFi",
    line: "Community- and creator-driven, a direct fit for the social, community and creator capabilities across Marketing, Communication and Finance.",
  },
  {
    name: "Midsize e-commerce / SMBs",
    line: "The self-serve products, AI-search visibility, content, social, fit any small business at lower price points; the volume play.",
  },
  {
    name: "Professional services / B2B SaaS",
    line: "GEO, thought leadership and content, as buyers increasingly research via AI.",
  },
  {
    name: "Web3 / crypto",
    line: "The base: Layer 1/2, DeFi, DEX, NFT, GameFi, exchanges, payments, RWA/tokenization and early-stage founders needing AI-powered content, narrative, community, investor materials, intelligence and distribution.",
  },
];

// FAQ — verbatim final copy, replaces the full set 2026-07-15.
const FAQ = [
  {
    q: "What is Narrations?",
    a: "Narrations is an AI company for the digital economy. It turns 10+ years of Web3 content, marketing, growth and advisory experience into one AI platform, Enterprise AI builds and operator-backed workflows. The team behind Narrations has shaped 200+ projects since 2016.",
  },
  {
    q: "What is the Narrations platform?",
    a: "The Narrations platform is one system with one login and one dashboard, built around six products that are the six functional verticals of a business: Content, Marketing, Communication, Finance, Intelligence and Operations. All six sit on a shared memory of your brand, so context is never re-explained, and the Orchestrator coordinates them toward a goal you set.",
  },
  {
    q: "What is Enterprise AI?",
    a: "Enterprise AI is Narrations' custom build offering for corporates, institutions, governments and growing teams. Rather than a fixed product, Narrations designs an AI dashboard for each of your verticals, shaped around your data, workflows and team, running locally, in your cloud or inside your own infrastructure, with control over sensitive data, internal knowledge, approvals and governance.",
  },
  {
    q: "How is the platform different from Enterprise AI?",
    a: "The platform is ready-made software: the same six products for everyone, used self-serve. Enterprise AI is built for one client, with dashboards tailored to that organization's own verticals and operations, running in their own environment. Startups usually start on the platform. Larger organizations that need control and customization choose Enterprise AI.",
  },
  {
    q: "Is Narrations a software company or a services company?",
    a: "Narrations is platform-first and services-backed. The platform is the software. Through forward-deployed operators (FDO-led), our experts embed inside your team and environment, set up each vertical, and run it with you, then train your team to run it alone.",
  },
  {
    q: "Can I buy a single product, or only the full platform?",
    a: "Either. The platform is sold as the whole system, and each of the six products is also available standalone with its own page.",
  },
  {
    q: "How does pricing work?",
    a: "Pricing follows the three engagement models and is quoted per client after scoping. The platform is a monthly subscription, Enterprise AI is scoped to what needs to be built and run, and forward-deployed operators are priced per embedded person plus platform fees.",
  },
  {
    q: "How is this different from a marketing agency or a generic AI tool?",
    a: "Narrations is neither. Unlike an agency, it sells software rather than billed hours, with operators behind the products instead of in front of them. Unlike a generic AI tool, it runs on a memory of your brand trained on your own material, with domain-specific workflows, expert review and long-term partnerships across the industry behind it.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-surface">
      <SiteNav theme="light" />

      <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex items-center gap-2 text-sm text-ink-500"
        >
          <Link href="/" className="transition hover:text-ink-900">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-ink-900">Resources</span>
        </nav>

        {/* Industries */}
        <div id="industries" className="scroll-mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
              Solutions
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2rem]">
              Built for the digital economy.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-500">
              The same platform, applied to the industries we know, from Web3
              and AI to fintech, RWA and beyond.
            </p>
          </div>

          {/* Grid at `sm`+, snap rail on phones — see ResourcesIndustryRail. */}
          <ResourcesIndustryRail industries={INDUSTRIES} />
        </div>

        {/* Newsletter */}
        <NewsletterSection />

        {/* FAQ */}
        <div id="faq" className="mt-24 scroll-mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
              FAQ
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2rem]">
              Frequently asked questions
            </h2>
          </div>

          <dl className="mx-auto mt-10 max-w-3xl divide-y divide-line border-y border-line">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="py-6">
                <dt className="text-[15px] font-semibold text-ink-900">{q}</dt>
                {/* Answers were 14px at every viewport — the densest reading on
                    the site. Raised to the 16px Body scale, leading unchanged. */}
                <dd className="mt-2 text-base leading-7 text-ink-700">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}
