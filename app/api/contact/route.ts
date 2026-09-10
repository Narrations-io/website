import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { clientIp, rateLimit, tooMany } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  firstName?: string;
  lastName?: string;
  workEmail?: string;
  company?: string;
  interest?: string[];
  message?: string;
  updates?: boolean;
  website?: string;
};

// Notion rich_text blocks cap at 2000 chars; short fields get a tighter cap.
const SHORT_MAX = 200;
const MESSAGE_MAX = 2000;
const INTEREST_MAX_ITEMS = 10;

const isShortStr = (v: unknown): v is string =>
  typeof v === "string" && v.length <= SHORT_MAX;

// Slack mrkdwn treats & < > as control characters — escape user input so a
// submission can't inject links or spoof fields in the notification.
const slackEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientIp(req)}`, 5, 60_000)) {
    return tooMany();
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
    return NextResponse.json({ ok: true });
  }

  const {
    firstName,
    lastName,
    workEmail,
    company,
    interest,
    message,
    updates,
  } = body;

  if (
    !isShortStr(firstName) ||
    !firstName.trim() ||
    !isShortStr(lastName) ||
    !lastName.trim() ||
    !isShortStr(workEmail) ||
    !workEmail.trim() ||
    !(company === undefined || isShortStr(company)) ||
    !Array.isArray(interest) ||
    interest.length === 0 ||
    interest.length > INTEREST_MAX_ITEMS ||
    !interest.every(isShortStr) ||
    typeof message !== "string" ||
    !message.trim() ||
    message.length > MESSAGE_MAX
  ) {
    return NextResponse.json(
      { ok: false, error: "Missing fields" },
      { status: 400 },
    );
  }

  try {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });

    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID as string },
      properties: {
        "First Name": {
          title: [{ text: { content: firstName.trim() } }],
        },
        "Last Name": {
          rich_text: [{ text: { content: lastName.trim() } }],
        },
        "Work Email": {
          email: workEmail.trim(),
        },
        Company: {
          rich_text: [{ text: { content: company?.trim() || "" } }],
        },
        Interest: {
          multi_select: interest.map((name) => ({ name })),
        },
        Message: {
          rich_text: [{ text: { content: message.trim() } }],
        },
        "Updates Opt-in": {
          checkbox: Boolean(updates),
        },
      },
    });

    const slackWebhook = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhook) {
      await fetch(slackWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: [
            `*New contact form submission*`,
            `*Name:* ${slackEscape(`${firstName.trim()} ${lastName.trim()}`)}`,
            `*Email:* ${slackEscape(workEmail.trim())}`,
            company?.trim() ? `*Company:* ${slackEscape(company.trim())}` : null,
            `*Interest:* ${slackEscape(interest.join(", "))}`,
            `*Message:* ${slackEscape(message.trim())}`,
            `*Updates opt-in:* ${updates ? "Yes" : "No"}`,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact form submission failed", err);
    return NextResponse.json(
      { ok: false, error: "Submission failed" },
      { status: 500 },
    );
  }
}
