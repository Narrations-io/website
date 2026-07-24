"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import NarrationsLogo from "@/components/NarrationsLogo";

type NavLink = { label: string; href: string };

type MobileNavDrawerProps = {
  theme: "dark" | "light";
  links: NavLink[];
  contactHref?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

// Shared hamburger + slide-in drawer, used below `md` by both SiteNav.tsx
// (the standalone-page nav) and newhome/Hero.tsx (the homepage's bespoke
// nav). Desktop (md and up) is untouched — both the trigger and the portaled
// drawer are `md:hidden`, so nothing renders here at >=768px.
//
// The drawer portals into <body> instead of rendering in place: Hero's nav
// strip carries `backdrop-blur-md`, and an ancestor with backdrop-filter (or
// filter/transform) becomes the containing block for `position: fixed`. That
// pinned the overlay and panel to the 64px nav strip rather than the viewport,
// so the panel painted 70px tall and its links spilled unstyled over the hero.
export default function MobileNavDrawer({
  theme,
  links,
  contactHref = "/contact",
  ctaHref = "/#book-a-demo",
  ctaLabel = "Get started",
}: MobileNavDrawerProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dark = theme === "dark";

  // document.body only exists client-side; portal after mount.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
          dark ? "text-white hover:bg-white/10" : "text-ink-900 hover:bg-sunken"
        }`}
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      {open &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/40 motion-safe:animate-[navFadeIn_0.2s_ease]"
            />
            <div
              className="absolute inset-y-0 right-0 flex w-[82vw] max-w-[360px] flex-col bg-green-50 p-6 shadow-pop motion-safe:animate-[navSlideIn_0.25s_cubic-bezier(0.16,1,0.3,1)]"
              role="dialog"
              aria-modal="true"
            >
              {/* The logo doubles as the only route home: `links` carries no
                  "/" entry on either caller, so without this the drawer can
                  reach every page except the homepage. Tone is pinned light
                  because the panel is always a light surface (bg-green-50)
                  regardless of `theme` (which only styles the trigger) — if the
                  panel ever goes dark-aware, this tone has to follow it. */}
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  aria-label="Narrations"
                  className="flex items-center"
                >
                  <NarrationsLogo height={22} tone="light" />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition hover:bg-paper"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-[12px] px-3 py-3 text-base font-medium text-ink-900 transition hover:bg-paper"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <Link
                  href={contactHref}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-pill border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-sunken"
                >
                  Contact
                </Link>
                <Link
                  href={ctaHref}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-pill bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
