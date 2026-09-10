import { NextResponse } from "next/server";
import { clientIp, rateLimit, tooMany } from "@/lib/rate-limit";

// Creates a real booking on Cal.com. The API key stays server-side; the
// browser only ever sees ok / error + the meeting url.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CAL_API = "https://api.cal.com/v2";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  tracks?: string[];
  start?: string;
  tz?: string;
  website?: string;
};

type CalBookingResponse = {
  status?: string;
  data?: {
    id?: number;
    uid?: string;
    meetingUrl?: string;
    location?: string;
  };
  error?: { message?: string };
};

const SHORT_MAX = 200;
const TRACKS_MAX_ITEMS = 10;

const isShortStr = (v: unknown): v is string =>
  typeof v === "string" && v.length <= SHORT_MAX;

const isValidTz = (tz: string) => {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
};

export async function POST(req: Request) {
  // Each accepted call creates a real calendar booking — keep the ceiling low.
  if (!rateLimit(`book:${clientIp(req)}`, 3, 60_000)) {
    return tooMany();
  }

  const apiKey = process.env.CAL_API_KEY;
  const eventTypeId = process.env.CAL_EVENT_TYPE_ID;
  if (!apiKey || !eventTypeId) {
    return NextResponse.json(
      { ok: false, error: "Cal.com not configured" },
      { status: 500 },
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  // Honeypot: bots fill hidden fields, real users never see this one.
  if (body.website) {
    return NextResponse.json({ ok: true, id: null, meetingUrl: null });
  }

  const { name, email, company, tracks, start, tz } = body;
  if (
    !isShortStr(name) ||
    !name.trim() ||
    !isShortStr(email) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !(company === undefined || isShortStr(company)) ||
    !Array.isArray(tracks) ||
    tracks.length === 0 ||
    tracks.length > TRACKS_MAX_ITEMS ||
    !tracks.every(isShortStr) ||
    !isShortStr(start) ||
    Number.isNaN(new Date(start).getTime()) ||
    !isShortStr(tz) ||
    !isValidTz(tz)
  ) {
    return NextResponse.json(
      { ok: false, error: "Missing fields" },
      { status: 400 },
    );
  }

  const trackList = tracks.join(", ");
  const companyName = company?.trim() || "";
  const notesLines = [
    companyName ? `Company: ${companyName}` : null,
    `Interest: ${trackList}`,
  ].filter(Boolean);

  let res: Response;
  try {
    res = await fetch(`${CAL_API}/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": "2024-08-13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start,
        eventTypeId: Number(eventTypeId),
        attendee: {
          name: name.trim(),
          email: email.trim(),
          timeZone: tz,
          language: "en",
        },
        metadata: companyName
          ? { tracks: trackList, company: companyName }
          : { tracks: trackList },
        bookingFieldsResponses: {
          notes: notesLines.join("\n"),
        },
      }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cal.com unreachable" },
      { status: 502 },
    );
  }

  const json = (await res.json().catch(() => ({}))) as CalBookingResponse;
  if (!res.ok || json.status === "error") {
    // Upstream messages can leak Cal.com account/config details — log them,
    // return a generic error.
    console.error("cal.com booking failed", res.status, json?.error?.message);
    return NextResponse.json(
      { ok: false, error: "Booking failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    id: json.data?.id ?? json.data?.uid ?? null,
    meetingUrl: json.data?.meetingUrl ?? json.data?.location ?? null,
  });
}
