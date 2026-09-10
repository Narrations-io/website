# Narrations

Marketing site for **Narrations**. One platform for everything a company says, built on the Ledger:
a record of what the company decided, read by every tool before it drafts and written back to on every
correction. Six parts — Content · Marketing · Operations · Customer Support · AI Studio · Ledger —
reachable by the tools you already use over MCP.

Source of truth for all site copy is `../extra/deck`. Where the site and the deck disagree, the deck wins.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 3**
- **lucide-react** for icons
- Self-hosted **Satoshi** (variable, 300–900) via `next/font`

## Local development

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Deployment

Deploys as-is to **Vercel** or **Netlify** (framework preset: Next.js). No extra configuration is needed
for the static and server-rendered pages.

### Environment variables

The contact and book-a-demo forms use serverless routes that require the following variables to be set in
your host's dashboard (they are read from the environment, never committed):

| Variable | Used by | Purpose |
| --- | --- | --- |
| `NOTION_TOKEN` | `/api/contact`, `/api/subscribe` | Notion integration token — shared by both forms (share both databases with this integration) |
| `NOTION_DATABASE_ID` | `/api/contact` | Notion database for contact submissions |
| `NOTION_SUBSCRIBERS_DATABASE_ID` | `/api/subscribe` | Notion database for newsletter signups — needs an `Email` (Title) and a `Source` (Select) column |
| `SLACK_WEBHOOK_URL` | `/api/contact` | *(optional)* Slack webhook for a submission notification |
| `CAL_API_KEY` | `/api/book-a-demo` | Cal.com API key — creates bookings / reads open slots |
| `CAL_EVENT_TYPE_ID` | `/api/book-a-demo` | Cal.com event-type ID for the demo call |

Without these, the pages still render; only the form submissions will fail until the variables are provided.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run Next.js ESLint |
