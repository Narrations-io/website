"use client";

// /products page body — a ClickUp-style tabbed layout.
// Tabs = the six Narrations products; the panel below and the capabilities
// grid further down both re-render for whichever product tab is active.
// Content is sourced entirely from components/product/data/products.data.ts
// (no invented copy/stats, per CLAUDE.md §8).

import { useCallback, useEffect, useRef, useState } from "react";
import OperatorsSection from "@/components/OperatorsSection";
import {
  Boxes,
  Workflow,
  Database,
  ShieldCheck,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PRODUCTS } from "@/components/product/data/products.data";

// General platform-layer capabilities (CLAUDE.md §4 vocabulary) — fixed,
// does not follow the tab switcher. Not tied to any one product.
const PLATFORM_CAPABILITIES = [
  {
    icon: Database,
    title: "Brand Memory",
    body: "The context layer: your docs and past work, retrieved so every output is informed.",
  },
  {
    icon: Workflow,
    title: "The Coordinator Layer",
    body: "Routes a goal through the right products, and stops for approval before anything irreversible.",
  },
  {
    icon: Users,
    title: "Operators",
    body: "The human layer: experts set up each vertical, review what's risky, then hand you control.",
  },
  {
    icon: BookOpen,
    title: "Knowledge management",
    body: "A knowledge graph of positioning, history and decisions, kept current and searchable.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    body: "Checkpoints and file-level controls gate sensitive material, backed by an always-on security system.",
  },
  {
    icon: Boxes,
    title: "Unified architecture",
    body: "None of your six products starts from zero, so nothing works in isolation.",
  },
];

// Same tiles + sizing as the homepage hero's logo row (components/newhome/Hero.tsx)
// — public/brands/uniform/*.png, forced to white via the `logo-white` CSS rule.
const LOGO_SIZE = "h-[32px] md:h-[43px]";
const CLIENT_LOGOS = [
  { src: "/brands/uniform/binance.png", alt: "Binance" },
  { src: "/brands/uniform/sui.png", alt: "Sui" },
  { src: "/brands/uniform/ledger.png", alt: "Ledger" },
  { src: "/brands/uniform/skrill.png", alt: "Skrill", sizeCls: "h-[23px] md:h-[34px]" },
  // The ICP tile is a 2:1 asset, so h-[50px] rendered 100px wide against the
  // ~92px cell a 3-col grid leaves at 390px — it overran into its neighbour.
  // Capped to 40px (80px wide) below `sm`; `sm`+ keeps the original ladder.
  { src: "/brands/uniform/internet-computer.png", alt: "Internet Computer (ICP)", sizeCls: "h-[40px] sm:h-[50px] md:h-[63px]" },
  { src: "/brands/uniform/m2.png", alt: "M2" },
];

export default function ProductsOverviewTabs() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];
  const Icon = p.icon;

  // Tab strip: the six tabs total ~650px of intrinsic width against a 342px
  // phone content box, so flex-wrap split them across three ragged rows and the
  // active tab's -mb-px attachment pointed at nothing. Below `sm` the strip is a
  // single-line snap rail instead; keep the selected tab visible when it changes.
  const tabsRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const strip = tabsRef.current;
    if (!strip) return;
    // Only a scroller below `sm`; above it there is nothing to scroll.
    if (strip.scrollWidth <= strip.clientWidth) return;
    const tab = strip.children[active] as HTMLElement | undefined;
    if (!tab) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollTo({
      left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active]);

  // Platform-layer band: the six capability cards stacked single-column ran
  // 1458px below `sm` — 1.7 phone screens. Same snap-rail + arrow treatment as
  // EnterpriseModules, light-world tokens. `sm`+ reverts to the existing grid.
  const capRailRef = useRef<HTMLUListElement | null>(null);
  const [cap, setCap] = useState(0);
  const CAP_LAST = PLATFORM_CAPABILITIES.length - 1;

  const onCapScroll = useCallback(() => {
    const rail = capRailRef.current;
    const card = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !card) return;
    const stride = card.offsetWidth + 16; // gap-4
    setCap(Math.min(CAP_LAST, Math.max(0, Math.round(rail.scrollLeft / stride))));
  }, [CAP_LAST]);

  // The rail only exists below `sm`; reset the index when the arrows disappear
  // so the label can't go stale on a resize up to tablet/desktop.
  useEffect(() => {
    const wide = matchMedia("(min-width: 640px)");
    const sync = () => wide.matches && setCap(0);
    sync();
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  }, []);

  const goCap = useCallback((next: number) => {
    const rail = capRailRef.current;
    const card = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !card) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({
      left: next * (card.offsetWidth + 16),
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  return (
    <>
    <div className="mx-auto max-w-[1200px] px-6">
      {/* Intro */}
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.75rem]">
          AI solutions for every function
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-500">
          Your key workflows, run on the Narrations platform.
        </p>
      </div>

      {/* Tabs — browser-tab strip, attached directly to the panel below.
          Phone: single-line snap rail (see the scroll-into-view effect above).
          The -mb-px panel attachment and the 3px inactive nudge are `sm`+ only:
          inside the phone scroller they'd be clipped by the overflow box. */}
      <div
        ref={tabsRef}
        className="mt-10 flex snap-x snap-mandatory items-end gap-1 overflow-x-auto px-1 sm:flex-wrap sm:justify-center sm:snap-none sm:overflow-x-visible"
      >
        {PRODUCTS.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-current={isActive ? "true" : undefined}
              className={`relative shrink-0 snap-start rounded-t-[10px] border border-b-0 px-4 py-2.5 text-sm font-semibold transition-all sm:shrink ${
                isActive
                  ? "z-10 border-green-600 bg-green-500 text-white shadow-[0_-2px_6px_rgba(14,19,17,0.04)] sm:-mb-px"
                  : "border-ink-300/50 bg-sunken text-ink-500 hover:border-ink-300/70 hover:text-ink-700 sm:translate-y-[3px] sm:hover:translate-y-0"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="relative z-0 rounded-[24px] border border-ink-300/50 bg-paper p-8 shadow-card md:p-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,440px)_1fr] lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
              {p.vertical}
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-ink-900 md:text-3xl">
              {p.h1}
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-ink-700">{p.promise}</p>

            <ul className="mt-7 space-y-2">
              {p.capabilities.slice(0, 3).map((c) => (
                <li key={c.title} className="flex items-start gap-2 text-sm text-ink-700">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" aria-hidden />
                  {c.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            {p.capabilities.slice(0, 4).map((c) => (
              <div
                key={c.title}
                className="flex items-center gap-3 rounded-[16px] border border-line bg-sunken p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50">
                  <Icon size={16} className="text-green-500" aria-hidden />
                </span>
                <span className="text-sm font-medium text-ink-900">{c.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>

    {/* Capabilities grid — fixed, general platform layer (not per-tab). */}
    <section className="mt-24 bg-green-50 md:mt-28">
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
            Platform layer
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink-900 md:text-[2.25rem]">
            What every product runs on.
          </h2>
          <p className="mt-3 text-base leading-7 text-ink-500">
            Every capability runs on one shared Brand Memory, coordinated by the Orchestrator, with
            operators reviewing the high-stakes work.
          </p>
        </div>

        {/* Phone: snap rail (cards at 82% so the next one peeks, signalling the
            swipe). `sm`+: the identical markup resolves back to the grid. */}
        <ul
          ref={capRailRef}
          onScroll={onCapScroll}
          className="mx-auto mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-x-visible lg:grid-cols-3"
        >
          {PLATFORM_CAPABILITIES.map((c) => (
            <li
              key={c.title}
              className="w-[82%] shrink-0 snap-start rounded-[16px] border border-ink-300/50 bg-paper p-5 sm:w-auto sm:shrink"
            >
              <c.icon size={20} className="text-green-500" aria-hidden />
              <p className="mt-3 text-base font-semibold text-ink-900">{c.title}</p>
              <p className="mt-2 text-sm leading-6 text-ink-500">{c.body}</p>
            </li>
          ))}
        </ul>

        {/* Phone-only cycle control — light-world tokens, matching this band */}
        <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => goCap(cap - 1)}
            disabled={cap === 0}
            aria-label="Previous capability"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <p
            aria-live="polite"
            className="min-w-[150px] text-center text-[15px] font-semibold tracking-tight text-ink-900"
          >
            {PLATFORM_CAPABILITIES[cap].title}
          </p>
          <button
            type="button"
            onClick={() => goCap(cap + 1)}
            disabled={cap === CAP_LAST}
            aria-label="Next capability"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>
    </section>

    {/* Benefits + proof — dark evergreen band. Kept as the last content block
        before OperatorsSection, directly above the global Footer. */}
    <section className="bg-dpanel">
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="inline-flex rounded-[8px] border border-dborder bg-dpanel2 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-dtext-mid">
              Why Narrations
            </p>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-dtext-hi md:text-[2.5rem]">
              Narrations gives your brand an unfair advantage
            </h2>

            <div className="mt-14 grid grid-cols-3 items-center gap-x-8 gap-y-10">
              {CLIENT_LOGOS.map((logo) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.sizeCls ?? LOGO_SIZE} logo-white w-auto`}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[16px] border border-dborder bg-dpanel2 p-6">
              <p className="text-lg font-semibold text-dtext-hi">Brand Memory</p>
              <p className="mt-2 text-sm leading-6 text-dtext-mid">
                Context you never re-explain: every product already knows your brand, your
                history and how you sound.
              </p>
            </div>
            <div className="rounded-[16px] border border-dborder bg-dpanel2 p-6">
              <p className="text-lg font-semibold text-dtext-hi">Six products, one system</p>
              <p className="mt-2 text-sm leading-6 text-dtext-mid">
                One login, not ten tabs. Six functions running as one coordinated operation
                instead of a sprawl of tools.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[16px] border border-dborder bg-dpanel2 p-6">
                <p className="text-3xl font-bold tracking-tight text-dtext-hi">200+</p>
                <p className="mt-2 text-sm leading-6 text-dtext-mid">Projects shaped since 2016</p>
              </div>
              <div className="rounded-[16px] border border-dborder bg-dpanel2 p-6">
                <p className="text-3xl font-bold tracking-tight text-dtext-hi">50,000+</p>
                <p className="mt-2 text-sm leading-6 text-dtext-mid">Assets delivered across formats</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Engagement models — three ways to work with Narrations. Last content
        block, directly above the global Footer. */}
    <OperatorsSection />
    </>
  );
}
