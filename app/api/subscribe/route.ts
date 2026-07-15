import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  email?: string;
  source?: string;
  website?: string;
};

// Basic, permissive email shape check — full validation is the browser's job.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
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
    return NextResponse.json({ ok: true });
  }

  const email = body.email?.trim();
  const source = body.source?.trim() || "site";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 },
    );
  }

  try {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });

    await notion.pages.create({
      parent: { database_id: process.env.NOTION_SUBSCRIBERS_DATABASE_ID as string },
      properties: {
        Email: {
          title: [{ text: { content: email } }],
        },
        Source: {
          select: { name: source },
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("newsletter subscribe failed", err);
    return NextResponse.json(
      { ok: false, error: "Subscription failed" },
      { status: 500 },
    );
  }
}
