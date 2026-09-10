"use client";

// /platform page body — a tabbed layout. Tabs = the six parts of the platform;
// the panel below re-renders for whichever part is active. The foundation band
// further down is fixed and does NOT follow the tabs.
// Part copy is sourced entirely from components/product/data/products.data.ts
// (no invented copy or stats).

import { useCallback, useEffect, useRef, useState } from "react";
import OperatorsSection from "@/components/OperatorsSection";
import {
  BookMarked,
  Cable,
  ShieldCheck,
  CheckCheck,
  KeyRound,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PRODUCTS } from "@/components/product/data/products.data";

// The foundation every part runs on (deck §8 + §10) — fixed, does not follow
// the tab switcher. Not tied to any one part of the platform.
const PLATFORM_CAPABILITIES = [
  {
    icon: BookMarked,
    title: "The Ledger",
    body: "Your approved claims, terms, tone and pricing rules, and the things you decided not to say. Every draft is checked against it.",
  },
  {
    icon: Cable,
    title: "Works with your tools",
    body: "Keep the AI tools you have. Through MCP they read the same rules, so a draft written elsewhere is checked the same way.",
  },
  {
    icon: ShieldCheck,
    title: "Private deployment",
    body: "Run it inside your own infrastructure, under your own keys. Your data stays where you keep it and is never used to train a model.",
  },
  {
    icon: CheckCheck,
    title: "Approval gates",
    body: "Nothing goes to a live system without a person signing it off. The check happens before it runs, not after.",
  },
  {
    icon: KeyRound,
    title: "Permissions",
    body: "People and agents reach only the sources, tools and rules they need, set per connection, not for the whole platform.",
  },
  {
    icon: FileText,
    title: "Audit trail",
    body: "Every draft, edit, approval and agent action is logged. Search it, export it to your own systems, keep it as long as you need.",
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
        {/* h2, not h1 — ProductsOverviewHero above already owns the page's h1. */}
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.75rem]">
          What each part of the platform does.
        </h2>
        <p className="mt-4 text-base leading-7 text-ink-500">
          Pick a part to see what it drafts, what it checks and what it keeps.
        </p>
      </div>

      {/* Tabs — browser-tab strip, attached directly to the panel below.
          Below `md`: single-line snap rail (see the scroll-into-view effect
          above) with a right-edge fade signalling the off-screen tabs. The
          flip to the wrapped strip is `md`, not `sm`: the six tabs measure
          ~610-630px, so at 640-767px they'd wrap into two rows and a wrapped
          active tab's -mb-px attachment points at the second row, not the
          panel. The -mb-px attachment and the 3px inactive nudge are `md`+
          only: inside the rail they'd be clipped by the overflow box. */}
      <div className="relative">
        <div
          ref={tabsRef}
          className="mt-10 flex snap-x snap-mandatory items-end gap-1 overflow-x-auto px-1 md:flex-wrap md:justify-center md:snap-none md:overflow-x-visible"
        >
          {PRODUCTS.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => setActive(i)}
                aria-current={isActive ? "true" : undefined}
                className={`relative shrink-0 snap-start rounded-t-[10px] border border-b-0 px-4 py-2.5 text-sm font-semibold transition-all md:shrink ${
                  isActive
                    ? "z-10 border-green-600 bg-green-500 text-white shadow-[0_-2px_6px_rgba(14,19,17,0.04)] md:-mb-px"
                    : "border-ink-300/50 bg-sunken text-ink-500 hover:border-ink-300/70 hover:text-ink-700 md:translate-y-[3px] md:hover:translate-y-0"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface to-transparent md:hidden"
        />
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
            Under the hood
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink-900 md:text-[2.25rem]">
            How it keeps every draft in line.
          </h2>
          <p className="mt-3 text-base leading-7 text-ink-500">
            Every part checks its drafts against the same approved rules. They
            live in the Ledger, the AI tools you already use can read them, and
            nothing risky goes out without a person signing it off.
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40"
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-line bg-paper text-ink-700 transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-40"
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
              Stop re-explaining the company to every new draft.
            </h2>

            <p className="mt-8 text-[12px] font-medium uppercase tracking-[0.16em] text-dtext-mid">
              Founders worked with, and clients
            </p>
            <div className="mt-6 grid grid-cols-3 items-center gap-x-8 gap-y-10">
              {CLIENT_LOGOS.map((logo) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.sizeCls ?? LOGO_SIZE} logo-white w-auto max-w-full object-contain`}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[16px] border border-dborder bg-dpanel2 p-6">
              <p className="text-lg font-semibold text-dtext-hi">
                The same correction, once
              </p>
              <p className="mt-2 text-sm leading-6 text-dtext-mid">
                Today: the same claim fixed in draft after draft. With
                Narrations: the fix becomes a rule, and every later draft is
                checked against it.
              </p>
            </div>
            <div className="rounded-[16px] border border-dborder bg-dpanel2 p-6">
              <p className="text-lg font-semibold text-dtext-hi">Nothing to migrate</p>
              <p className="mt-2 text-sm leading-6 text-dtext-mid">
                Today: switching tools means re-explaining the company. With
                Narrations: your rules sit under the tools and stay yours when
                tools change.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[16px] border border-dborder bg-dpanel2 p-6">
                <p className="text-3xl font-bold tracking-tight text-dtext-hi">200+</p>
                <p className="mt-2 text-sm leading-6 text-dtext-mid">
                  Projects delivered by the founders
                </p>
              </div>
              <div className="rounded-[16px] border border-dborder bg-dpanel2 p-6">
                <p className="text-3xl font-bold tracking-tight text-dtext-hi">50,000+</p>
                <p className="mt-2 text-sm leading-6 text-dtext-mid">
                  Assets the founders have shipped
                </p>
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
