"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import NumberedMarker from "@/components/ui/NumberedMarker";
import BookingCard from "@/components/ui/BookingCard";

// Homepage finale band — pick one or more demo tracks on the LEFT, then book a
// time on the RIGHT. Selected tracks are passed into BookingCard so the
// submission carries the chosen topics. Tokens only — single green.
// id="book-a-demo" is the site-wide anchor target: every "Book a demo" CTA
// across the site links to /#book-a-demo instead of a standalone page.

const DEMO_BEATS = [
  {
    n: "01",
    title: "See the editor live.",
    text: "Thirty minutes with an operator, no slides: a draft checked against a set of rules, a correction kept, and what the beta can do for your team.",
  },
  {
    n: "02",
    title: "Run it in your own infrastructure.",
    text: "What a private deployment involves: where it runs, what your IT team controls, and how an operator sets it up and hands over.",
  },
  {
    n: "03",
    title: "Just exploring AI.",
    text: "A short call about what AI writing with rules could do for your team and your industry. No pitch.",
  },
];

export default function EngageBookSection() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (n: string) =>
    setSelected((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]));

  const selectedTitles = DEMO_BEATS.filter((b) => selected.includes(b.n)).map(
    (b) => b.title.replace(/\.$/, ""),
  );

  return (
    <section id="book-a-demo" className="scroll-mt-24 bg-green-50">
      <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-24 md:pb-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-6 lg:gap-0">
          {/* LEFT — selectable tracks */}
          <div className="md:flex md:flex-col md:pr-6 lg:pr-10">
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
              Book a demo
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.75rem]">
              Pick your track.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-500">
              Choose any or all, and we&rsquo;ll take it from there.
            </p>

            <div
              role="group"
              aria-label="Demo tracks"
              className="mt-8 flex flex-col gap-2 lg:gap-2"
            >
              {DEMO_BEATS.map(({ n, title, text }) => {
                const isOn = selected.includes(n);
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => toggle(n)}
                    aria-pressed={isOn}
                    className={
                      "group relative flex items-start gap-5 rounded-[20px] border bg-paper px-6 py-5 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pop " +
                      (isOn
                        ? "border-green-500 ring-2 ring-green-500/30"
                        : "border-line hover:border-green-200")
                    }
                  >
                    {isOn ? (
                      <span className="relative z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full bg-green-500 text-white">
                        <Check className="h-5 w-5" strokeWidth={3} />
                      </span>
                    ) : (
                      <NumberedMarker n={n} />
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] font-semibold text-ink-900">
                        {title}
                      </h3>
                      {/* Full-width on phones, so this is the band's main
                          reading text — Caption 13px was below the Body scale. */}
                      <p className="mt-1 text-[15px] leading-6 text-ink-700 sm:text-[13px]">
                        {text}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Booking */}
          <div className="md:border-l md:border-line md:pl-6 lg:pl-10">
            <BookingCard selectedTracks={selectedTitles} />
          </div>
        </div>
      </div>
    </section>
  );
}
