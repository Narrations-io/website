"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Reusable dark booking card (calendar + time slots + CTA). Self-contained on
// any background. Calendar + slots come from Cal.com via /api/book-a-demo/slots
// (server-side proxy keeps the API key off the client). Submitting POSTs to
// /api/book-a-demo which creates the booking on Cal.com — visitor gets the
// real confirmation email + Google Meet invite.

const WEEKDAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type SlotsByDay = Record<string, { time: string; start: string }[]>;
type Status = "idle" | "sending" | "sent" | "error";
type Booking = {
  id: string | number | null;
  meetingUrl: string | null;
  startIso: string;
  endIso: string;
  email: string;
  name: string;
  tracks: string[];
};

const EVENT_MINUTES = 30;
const EVENT_TITLE = "Narrations demo";

const pad2 = (n: number) => String(n).padStart(2, "0");
const ymd = (y: number, m: number, d: number) =>
  `${y}-${pad2(m + 1)}-${pad2(d)}`;
const startOfMonthISO = (y: number, m: number) =>
  new Date(Date.UTC(y, m, 1, 0, 0, 0)).toISOString();
const endOfMonthISO = (y: number, m: number) =>
  new Date(Date.UTC(y, m + 1, 0, 23, 59, 59)).toISOString();

const to12h = (hhmm: string) => {
  const [hStr, mStr] = hhmm.split(":");
  const h = Number(hStr);
  const period = h >= 12 ? "pm" : "am";
  const display = ((h + 11) % 12) + 1;
  return `${pad2(display)}:${mStr} ${period}`;
};

export default function BookingCard({
  ctaText = "Request Demo",
  selectedTracks = [],
}: {
  ctaText?: string;
  selectedTracks?: string[];
}) {
  // All date/timezone state is set on the client only — Intl + new Date()
  // differ between server and client, which would cause a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  const [tz, setTz] = useState("UTC");
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(0);

  useEffect(() => {
    const detectedTz =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    const now = new Date();
    setTz(detectedTz);
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    setMounted(true);
  }, []);

  const [slots, setSlots] = useState<SlotsByDay>({});
  const [loading, setLoading] = useState(false);
  const [loadErr, setLoadErr] = useState<string | null>(null);

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlotIdx, setSelectedSlotIdx] = useState(0);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [lastPayload, setLastPayload] = useState<{
    name: string;
    email: string;
    company: string;
    tracks: string[];
    start: string;
  } | null>(null);

  const monthLabel = `${MONTH_NAMES[viewMonth]} ${viewYear}`;
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  // Fetch slots whenever the visible month changes (after mount only).
  useEffect(() => {
    if (!mounted) return;
    let aborted = false;
    setLoading(true);
    setLoadErr(null);
    const start = startOfMonthISO(viewYear, viewMonth);
    const end = endOfMonthISO(viewYear, viewMonth);
    const url = `/api/book-a-demo/slots?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}&tz=${encodeURIComponent(tz)}`;
    fetch(url)
      .then(async (r) => {
        const j = await r.json().catch(() => ({}));
        if (aborted) return;
        if (!r.ok || !j?.ok) {
          setSlots({});
          setLoadErr(j?.error || "Could not load availability.");
        } else {
          setSlots(j.slots || {});
        }
      })
      .catch(() => {
        if (!aborted) {
          setSlots({});
          setLoadErr("Could not load availability.");
        }
      })
      .finally(() => {
        if (!aborted) setLoading(false);
      });
    return () => {
      aborted = true;
    };
  }, [viewYear, viewMonth, tz, mounted]);

  // When slots arrive, default-select the first available day in the view.
  useEffect(() => {
    if (selectedDay && slots[ymd(viewYear, viewMonth, selectedDay)]) return;
    const firstDay = Object.keys(slots).sort()[0];
    if (firstDay) {
      const d = Number(firstDay.split("-")[2]);
      setSelectedDay(d);
      setSelectedSlotIdx(0);
    } else {
      setSelectedDay(null);
    }
  }, [slots, viewYear, viewMonth, selectedDay]);

  const selectedDaySlots = selectedDay
    ? slots[ymd(viewYear, viewMonth, selectedDay)] || []
    : [];
  const selectedSlot = selectedDaySlots[selectedSlotIdx];

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
    setSelectedDay(null);
  };

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const openModal = () => {
    setErrMsg(null);
    setStatus("idle");
    if (selectedTracks.length === 0) {
      setErrMsg("Pick at least one track on the left first.");
      return;
    }
    if (!selectedSlot) {
      setErrMsg("Pick an available day and time first.");
      return;
    }
    setOpen(true);
  };

  const sendBooking = async (payload: {
    name: string;
    email: string;
    company: string;
    tracks: string[];
    start: string;
  }) => {
    try {
      const res = await fetch("/api/book-a-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, tz }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j?.ok) throw new Error(j?.error || "send failed");
      setToast(null);
      setLastPayload(null);
    } catch {
      setToast("Booking didn't go through. Click retry.");
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrMsg("Enter your name and a valid email.");
      return;
    }
    if (!selectedSlot) {
      setErrMsg("No time slot selected.");
      return;
    }
    setErrMsg(null);
    const endIso = new Date(
      new Date(selectedSlot.start).getTime() + EVENT_MINUTES * 60_000,
    ).toISOString();
    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      tracks: selectedTracks,
      start: selectedSlot.start,
    };
    setBooking({
      id: null,
      meetingUrl: null,
      startIso: selectedSlot.start,
      endIso,
      email: payload.email,
      name: payload.name,
      tracks: payload.tracks,
    });
    setLastPayload(payload);
    setStatus("sent");
    void sendBooking(payload);
  };

  const retry = () => {
    if (!lastPayload) return;
    setToast(null);
    void sendBooking(lastPayload);
  };

  const summaryLine =
    selectedDay && selectedSlot
      ? `${MONTH_NAMES[viewMonth]} ${selectedDay}, ${viewYear} · ${to12h(selectedSlot.time)}`
      : "Pick a day and time";

  if (!mounted) {
    return (
      <div
        aria-hidden
        className="rounded-[28px] border border-green-500/20 bg-dpanel p-7 shadow-glow-brand md:p-9"
      >
        <div className="grid min-h-[296px] gap-6 sm:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02]" />
          <div className="rounded-2xl border border-white/[0.04]" />
        </div>
        <div className="mt-7 h-12 w-full rounded-full bg-green-500/40" />
      </div>
    );
  }

  return (
    <>
      <div className="rounded-[28px] border border-green-500/20 bg-dpanel p-7 shadow-glow-brand md:p-9">
        <div className="grid gap-6 sm:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between px-1">
              <button
                type="button"
                aria-label="Previous month"
                onClick={prevMonth}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/[0.06] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium text-white">{monthLabel}</span>
              <button
                type="button"
                aria-label="Next month"
                onClick={nextMonth}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/[0.06] hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-xs">
              {WEEKDAY_HEADERS.map((d) => (
                <span key={d} className="py-1 font-medium text-white/35">
                  {d}
                </span>
              ))}
              {Array.from({ length: firstWeekday }, (_, i) => (
                <span key={`blank-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const available = Boolean(
                  slots[ymd(viewYear, viewMonth, day)]?.length,
                );
                const selected = day === selectedDay;
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={!available}
                    onClick={() => {
                      setSelectedDay(day);
                      setSelectedSlotIdx(0);
                    }}
                    aria-pressed={selected}
                    className={
                      selected
                        ? "mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 font-semibold text-white"
                        : available
                          ? "mx-auto flex h-8 w-8 items-center justify-center rounded-lg text-white/75 transition hover:bg-white/[0.08]"
                          : "mx-auto flex h-8 w-8 items-center justify-center rounded-lg text-white/20"
                    }
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col">
            <div
              role="listbox"
              aria-label="Available time slots"
              className="flex max-h-[296px] flex-col gap-2 overflow-y-auto pr-1"
            >
              {loading && (
                <div className="flex h-full min-h-[120px] items-center justify-center text-xs text-white/40">
                  Loading…
                </div>
              )}
              {!loading && loadErr && (
                <div className="flex h-full min-h-[120px] items-center justify-center text-center text-xs text-warning">
                  {loadErr}
                </div>
              )}
              {!loading && !loadErr && selectedDaySlots.length === 0 && (
                <div className="flex h-full min-h-[120px] items-center justify-center text-center text-xs text-white/40">
                  No availability in this month. Try the next one.
                </div>
              )}
              {!loading &&
                !loadErr &&
                selectedDaySlots.map((s, i) => {
                  const display = to12h(s.time);
                  const selected = i === selectedSlotIdx;
                  return (
                    <button
                      key={s.start}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => setSelectedSlotIdx(i)}
                      className={
                        selected
                          ? "rounded-xl border border-green-500/60 bg-green-500/10 px-4 py-2.5 text-sm font-medium text-white"
                          : "rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-white/60 transition hover:border-white/25 hover:text-white"
                      }
                    >
                      {display}
                    </button>
                  );
                })}
            </div>
            <p className="mt-3 text-center text-[11px] text-white/35">
              Times shown in {tz}
            </p>
          </div>
        </div>

        {selectedTracks.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {selectedTracks.map((t) => (
              <span
                key={t}
                className="rounded-full border border-green-500/40 bg-green-500/10 px-3 py-1 text-xs font-medium text-white"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={openModal}
          className="mt-7 w-full rounded-full bg-green-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-600"
        >
          {ctaText}
        </button>

        {errMsg && !open && (
          <p className="mt-3 text-center text-xs text-warning">{errMsg}</p>
        )}

        <p className="mt-4 text-center text-xs leading-5 text-white/40">
          By submitting, you agree to Narrations&rsquo;{" "}
          <a href="/terms" className="underline underline-offset-2 transition hover:text-white/70">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline underline-offset-2 transition hover:text-white/70">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bd-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-dbg/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-[24px] border border-line bg-paper p-7 shadow-pop">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition hover:bg-sunken hover:text-ink-900"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "sent" && booking ? (
              (() => {
                const start = new Date(booking.startIso);
                const end = new Date(booking.endIso);
                const dayLabel = new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  timeZone: tz,
                }).format(start);
                const timeLabel = `${new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: tz,
                }).format(start)} – ${new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: tz,
                }).format(end)}`;
                return (
                  <div className="py-2 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 id="bd-modal-title" className="mt-4 text-xl font-semibold text-ink-900">
                      You&rsquo;re booked
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-500">
                      Meeting link and calendar invite will be sent to{" "}
                      <span className="font-medium text-ink-700">{booking.email}</span>.
                    </p>

                    <div className="mt-5 rounded-[16px] border border-line bg-sunken p-4 text-left">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-green-600">
                        {EVENT_TITLE}
                      </div>
                      <div className="mt-2 text-base font-semibold text-ink-900">
                        {dayLabel}
                      </div>
                      <div className="mt-0.5 text-sm text-ink-700">
                        {timeLabel} <span className="text-ink-500">· {tz}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="mt-6 inline-flex items-center justify-center rounded-pill bg-green-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
                    >
                      Close
                    </button>
                  </div>
                );
              })()
            ) : (
              <form onSubmit={submit} noValidate>
                <h3 id="bd-modal-title" className="text-lg font-semibold text-ink-900">
                  Request Demo
                </h3>
                <p className="mt-1 text-xs text-ink-500">{summaryLine}</p>

                <div className="mt-5 flex flex-col gap-4">
                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="font-medium text-ink-900">Your Name</span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Satoshi Nakamoto"
                      className="rounded-[12px] border border-line bg-sunken px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="font-medium text-ink-900">Your Company Email</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="rounded-[12px] border border-line bg-sunken px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="font-medium text-ink-900">
                      Company <span className="font-normal text-ink-500">(optional)</span>
                    </span>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="rounded-[12px] border border-line bg-sunken px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                    />
                  </label>

                  <div className="flex flex-col gap-1.5 text-sm">
                    <span className="font-medium text-ink-900">Interest</span>
                    <div className="flex flex-wrap gap-1.5 rounded-[12px] border border-line bg-sunken px-3 py-2.5">
                      {selectedTracks.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {errMsg && (
                  <p className="mt-3 text-center text-xs text-danger">{errMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-6 w-full rounded-pill bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-[60] flex max-w-sm items-center gap-3 rounded-[14px] border border-danger/40 bg-dpanel px-4 py-3 text-sm text-white shadow-pop"
        >
          <span className="flex-1">{toast}</span>
          {lastPayload && (
            <button
              type="button"
              onClick={retry}
              className="rounded-md border border-white/20 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-white/10"
            >
              Retry
            </button>
          )}
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setToast(null)}
            className="text-white/50 transition hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </>
  );
}
