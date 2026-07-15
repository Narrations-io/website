import { NextResponse } from "next/server";

// Proxies Cal.com v2 /slots so the API key stays server-side. Returns slots
// already converted to the requested timezone, grouped by local YYYY-MM-DD,
// with each slot as a "HH:mm" string + the full UTC ISO start time.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CAL_API = "https://api.cal.com/v2";

type CalSlot = { start: string } | string;
type CalSlotsResponse = {
  status?: string;
  data?: Record<string, CalSlot[]>;
  error?: { message?: string };
};

export type SlotsByDay = Record<string, { time: string; start: string }[]>;

export async function GET(req: Request) {
  const apiKey = process.env.CAL_API_KEY;
  const eventTypeId = process.env.CAL_EVENT_TYPE_ID;
  if (!apiKey || !eventTypeId) {
    return NextResponse.json(
      { ok: false, error: "Cal.com not configured" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const tz = searchParams.get("tz") || "UTC";

  if (!start || !end) {
    return NextResponse.json(
      { ok: false, error: "Missing start/end" },
      { status: 400 },
    );
  }

  const url = new URL(`${CAL_API}/slots`);
  url.searchParams.set("eventTypeId", eventTypeId);
  url.searchParams.set("start", start);
  url.searchParams.set("end", end);
  url.searchParams.set("timeZone", tz);

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": "2024-09-04",
      },
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cal.com unreachable" },
      { status: 502 },
    );
  }

  const json = (await res.json().catch(() => ({}))) as CalSlotsResponse;
  if (!res.ok || json.status === "error") {
    return NextResponse.json(
      { ok: false, error: json?.error?.message || "Cal.com error" },
      { status: 502 },
    );
  }

  const fmtTime = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  });
  const fmtDate = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: tz,
  });

  const out: SlotsByDay = {};
  const raw = json.data || {};
  for (const slots of Object.values(raw)) {
    for (const s of slots) {
      const startIso = typeof s === "string" ? s : s.start;
      if (!startIso) continue;
      const d = new Date(startIso);
      if (Number.isNaN(d.getTime())) continue;
      const localDate = fmtDate.format(d);
      const localTime = fmtTime.format(d);
      (out[localDate] ||= []).push({ time: localTime, start: startIso });
    }
  }

  for (const k of Object.keys(out)) {
    out[k].sort((a, b) => a.start.localeCompare(b.start));
  }

  return NextResponse.json({ ok: true, tz, slots: out });
}
