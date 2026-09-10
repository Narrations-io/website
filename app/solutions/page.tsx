import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import CardRail from "@/components/solutions/CardRail";
import ContrastTable from "@/components/solutions/ContrastTable";
import OperatorsSection from "@/components/OperatorsSection";

// /solutions — replaces the old /resources page (renamed 2026-09-07; an exact
// -path redirect lives in next.config.mjs, and /resources/blog is untouched).
//
// Seven bands, alternating grounds: hero → who it's for → industries →
// the problem it fixes (dark) → three ways to engage → FAQ → CTA. Every
// section reuses a component that already existed elsewhere on the site.
//
// Copy register (2026-09-08 rewrite): written for a buyer, not the deck. No
// client is named in text anywhere on this page — client logos may appear in
// the logo rails elsewhere on the site, never here.

export const metadata: Metadata = {
  title: "Solutions: who it's for and how to start | Narrations",
  description:
    "Who Narrations is for, startups to governments, the industries it fits, and three ways to use it: the platform, your own deployment or an operator in your team.",
};

const SEGMENTS = [
  {
    title: "Startups",
    body: "No brand team and no time to build one. Write in the editor; every approval becomes a rule the company keeps as it grows. The platform is the way in.",
  },
  {
    title: "Institutions",
    body: "A full team and a dozen tools that don't agree. Run it inside your own infrastructure with approval gates and a full log. Enterprise AI is the way in.",
  },
  {
    title: "Governments",
    body: "Data that can't leave your borders, content that can't go out unsigned. A private deployment under your keys, set up by an operator on your team.",
  },
];

// Nine industries, generalised beyond digital assets. No card names a client —
// the founders' track record is described by category, never by name.
const INDUSTRIES = [
  {
    title: "Bitcoin companies",
    body: "Bitcoin-only companies get 21% off the platform. Wallets, miners, media and education with one position to keep across everything they publish, from docs to support.",
  },
  {
    title: "AI startups",
    body: "Shipping fast, explaining constantly. One record of what the model does, what you claim and what you ruled out, so docs, launches and support match the last release.",
  },
  {
    title: "Fintech and payments",
    body: "Payments, stablecoins and banking, where terms, disclosures and support answers have to agree. Regulated wording, written once and checked on every draft that uses it.",
  },
  {
    title: "Institutional finance",
    body: "Funds, asset managers and tokenisation platforms writing for institutions: investor updates, fund notes and compliance-ready comms from one record of what was approved.",
  },
  {
    title: "Deeptech, climate, biotech",
    body: "Hard science explained to investors, regulators and customers without the claims drifting. The ledger holds the approved facts; every deck and page draws from them.",
  },
  {
    title: "Gaming",
    body: "Studios with lore, patch notes, community channels and a store page that must all describe the same game. One record of the world and what changed in the last patch.",
  },
  {
    title: "E-commerce and SMBs",
    body: "Descriptions, campaigns and support replies for teams too small for a brand department. The record builds as you approve, so the tenth hire writes like the first.",
  },
  {
    title: "Services and B2B SaaS",
    body: "Consultancies, agencies and B2B software, where expertise is the offer. Proposals, case studies, onboarding and docs from one record of positioning and proven claims.",
  },
  {
    title: "Web3 and digital assets",
    body: "Protocols, wallets, exchanges and foundations: the founders' decade, and where the first Narrations clients are. Docs, ecosystem comms and lifecycle marketing.",
  },
];

const FAQ = [
  {
    q: "What is Narrations?",
    a: "An AI editor for everything your company writes: articles, campaigns, policies, support replies. Before a draft reaches you, it's checked against what your company has already approved, and when you correct something, the correction is kept for the next draft. Built by two founders with a decade each in the digital asset industry; the platform is in private beta.",
  },
  {
    q: "What is the Ledger?",
    a: "The list of what your company has approved: claims, terms, tone, pricing rules, and the things you've decided not to say, each with who approved it and when. Every part of the platform checks drafts against it, and you add to it by approving or correcting a draft. It's yours: export it whenever you like and take it to any tool that can read it.",
  },
  {
    q: "What is MCP, and do I have to switch tools?",
    a: "No. MCP (Model Context Protocol) is the open standard that lets an AI tool read from outside systems. Narrations uses it so the tools you already have can read your approved rules before they write. For your writers, that means a draft in another tool gets the same checks. For IT, one connection to approve rather than a separate review for every tool. There is no suite to move into and nothing to migrate.",
  },
  {
    q: "What is available today?",
    a: "The Content editor and the Ledger, in private beta with a small group of invited users. Marketing, Operations, Customer Support and AI Studio are being built on the same rules and are marked as such on the platform page. Enterprise deployments and operator engagements are scoped one at a time. Book a demo to see the editor running or to ask for an invitation.",
  },
  {
    q: "What is the difference between the platform and Enterprise AI?",
    a: "Where it runs and who controls it. The platform is Narrations hosted by us: seats plus usage credits, with MCP access. Enterprise AI is Narrations installed inside your own infrastructure, under your own keys, with approval gates, permissions, a full audit trail and usage caps, for institutions and governments whose data can't leave. Both use the same editor and rules, and in both the rules are yours.",
  },
  {
    q: "Are you a software company or a services company?",
    a: "Both, and each depends on the other. The software is the editor and the Ledger. The service is a forward-deployed operator: a trained person who joins your team, writes down what you've already decided, reviews what goes out, trains your people and then hands over. The operator is how the rules get written quickly and well; the software is what keeps them working after the operator leaves.",
  },
  {
    q: "How does pricing work?",
    a: "Three ways, matching the three ways in. The platform is a seat subscription plus usage credits; the tiers aren't published yet because it's in private beta, and they will be once self-serve opens. Enterprise AI is a build fee, then an operating contract. Operators are a monthly fee per person. Anything beyond the platform is scoped with you first, so book a demo and we'll give you numbers for your case.",
  },
  {
    q: "How is this different from ChatGPT or another general AI tool?",
    a: "A general AI tool doesn't know your company. Someone types the context in, gets a draft, and the next person starts from zero again. Narrations keeps what your company has approved and checks every draft against it, so the third draft this month is held to the same rules as the first, whoever wrote it. You can still use the model you prefer underneath; what Narrations adds is the rules and the checking.",
  },
  {
    q: "How is this different from hiring an agency?",
    a: "An agency keeps its own notes and takes them when the contract ends; you keep the deliverables. An operator works inside your Narrations from day one, so every rule, approval and correction is written into a record you own. When the operator hands over, your team has the editor, the rules and the history of who approved what. Keep an operator on retainer afterwards or run it yourselves.",
  },
  {
    q: "Is my data used to train models?",
    a: "No. Nothing you write or approve in Narrations trains a model, ours or anyone else's. On the platform, your rules and drafts are yours to export. In Enterprise AI nothing leaves your infrastructure at all: it runs under your own keys, with every action logged. We don't point at a certificate; we walk your security team through the architecture, so ask.",
  },
  {
    q: "Is Narrations a chatbot?",
    a: "No. You can ask it for a draft in plain language, but the product is the editor plus the rules behind it. A chatbot answers from a general model and forgets the conversation. Narrations drafts from what your company has approved, checks the draft against it before you see it, and keeps your corrections. Asking is one way in; the checking is the point.",
  },
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-surface">
      <SiteNav theme="light" />

      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden bg-surface text-ink-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_20%_40%,rgba(31,107,76,0.08),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 pb-20 pt-12 md:pb-24 md:pt-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-2 text-sm text-ink-500"
          >
            <Link href="/" className="transition hover:text-ink-900">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="font-medium text-ink-900">Solutions</span>
          </nav>

          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
            Solutions
          </p>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-ink-900">
            For startups, institutions and governments.
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-7 text-ink-500 md:text-lg md:leading-8">
            Narrations checks everything your company writes against what it
            has already approved, so a new hire, an agency or an AI tool writes
            to the same rules. Use it in the editor, run it inside your own
            infrastructure, or have an operator set it up with your team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#book-a-demo"
              className="inline-flex items-center gap-2 rounded-pill bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              Book a demo <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Who it's for ── */}
      <section id="who-its-for" className="scroll-mt-24 bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 pb-24 md:pb-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
              Who it&rsquo;s for
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2rem]">
              Three kinds of company, three ways in.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-500">
              A startup has no one whose job is the brand. An institution has a
              team and a dozen tools that don&rsquo;t agree. A government
              can&rsquo;t let data or unsigned content out of the building. Each
              has its own way in.
            </p>
          </div>
          <CardRail items={SEGMENTS} label="segment" />
        </div>
      </section>

      {/* ── 3. Industries ── */}
      <section id="industries" className="scroll-mt-24 bg-green-50">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600" aria-hidden />
              Industries
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2rem]">
              Nine industries, one record.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-500">
              Nine industries where what a company publishes has to be
              consistent, checked and kept on record. The founders come from
              digital assets; the platform is not limited to it.
            </p>
          </div>
          <CardRail items={INDUSTRIES} label="industry" />
        </div>
      </section>

      {/* ── 4. The problem it fixes (dark) ── */}
      <ContrastTable />

      {/* ── 5. Three ways to engage ── */}
      <OperatorsSection />

      {/* ── 6. FAQ ── */}
      <section id="faq" className="scroll-mt-24 bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
              FAQ
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2rem]">
              What people ask before a demo.
            </h2>
          </div>

          <dl className="mx-auto mt-10 max-w-3xl divide-y divide-line border-y border-line">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="py-6">
                <dt className="text-[15px] font-semibold text-ink-900">{q}</dt>
                <dd className="mt-2 text-base leading-7 text-ink-700">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 7. Closing CTA ── */}
      <section className="relative overflow-hidden border-t border-line bg-green-50 text-ink-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(31,107,76,0.12),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-[1200px] px-6 py-24 text-center md:py-28">
          <h2 className="mx-auto max-w-[20ch] text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.5rem]">
            See it running before you decide.
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-base leading-7 text-ink-500">
            The platform is in private beta. Book a demo and watch the editor
            check a draft against a company&rsquo;s rules, then tell us which
            way in fits you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#book-a-demo"
              className="inline-flex items-center gap-2 rounded-pill bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              Book a demo <ArrowRight size={15} aria-hidden />
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 rounded-pill border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-sunken"
            >
              Explore the platform
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
