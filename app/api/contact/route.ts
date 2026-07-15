import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

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
    !firstName?.trim() ||
    !lastName?.trim() ||
    !workEmail?.trim() ||
    !Array.isArray(interest) ||
    interest.length === 0 ||
    !message?.trim()
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
            `*Name:* ${firstName.trim()} ${lastName.trim()}`,
            `*Email:* ${workEmail.trim()}`,
            company?.trim() ? `*Company:* ${company.trim()}` : null,
            `*Interest:* ${interest.join(", ")}`,
            `*Message:* ${message.trim()}`,
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
