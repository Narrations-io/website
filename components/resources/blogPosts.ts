// Real blog content for /resources/blog. No CMS yet (docs/PROJECT.md §11) — posts
// live here as typed data, same pattern as INDUSTRIES/FAQ in app/resources/page.tsx.

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ol"; items: { title: string; text: string }[] };

export type BlogPost = {
  slug: string;
  title: string;
  dek: string;
  date: string; // ISO
  dateLabel: string;
  readTime: string;
  body: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-use-an-llm-to-improve-your-writing",
    title: "How to use an LLM to improve your writing",
    dek: "Seven direct steps for using an LLM the way a working editor uses a second pair of eyes, not a ghostwriter.",
    date: "2026-07-08",
    dateLabel: "July 8, 2026",
    readTime: "6 min read",
    body: [
      {
        type: "p",
        text: "Most guidance on writing with an LLM either oversells it (\"let AI write your content\") or dismisses it entirely. Neither is how working editors actually use these tools. Below are seven steps that treat an LLM the way a newsroom treats a copy desk: a second pair of eyes that catches what you can't see in your own draft, not a replacement for having something to say.",
      },
      {
        type: "ol",
        items: [
          {
            title: "1. Draft first, edit second",
            text: "Write your first draft cold, without the model. The point of view, the argument, the thing you actually want to say, has to come from you. Bring the model in once there's a draft to react to. An LLM asked to write from a blank page will default to the safest, most generic version of the topic; an LLM asked to edit your draft will sharpen the version that's actually yours.",
          },
          {
            title: "2. Feed it your own material, not a generic prompt",
            text: "Instead of \"write a paragraph about X,\" paste in three examples of your own past writing and ask the model to match that voice. Editors do this instinctively with new reporters: they read a few clips before they touch a red pen. Give the model the same context before you ask it to help.",
          },
          {
            title: "3. Use it as a line editor, not the author",
            text: "Ask targeted questions instead of asking for a rewrite: \"Where does this paragraph lose the thread?\" \"Is the second half of this sentence doing any work?\" \"What's the weakest claim in this piece?\" You'll get sharper, more useful answers than a blanket \"make this better,\" and you stay the one making the actual editorial calls.",
          },
          {
            title: "4. Ask for options, not an answer",
            text: "For anything that matters, headlines, leads, subject lines, ask for five distinct options rather than one \"fixed\" version. Comparing five real alternatives trains your own ear faster than accepting a single suggestion, and it keeps you making the final call instead of rubber-stamping the model's first instinct.",
          },
          {
            title: "5. Verify every name, number, and quote",
            text: "LLMs state incorrect facts with the same confident tone as correct ones. Treat anything factual the model adds or touches, a date, a statistic, a person's title, a quote, as unverified until you've checked it against a source. This is the one step that isn't optional; a fast, wrong piece is worse than a slow, right one.",
          },
          {
            title: "6. Cut, don't just prompt",
            text: "Left alone, a model adds words: extra qualifiers, throat-clearing intros, restated conclusions. Your job is usually subtraction. After a pass, ask directly: \"What can be cut without losing meaning?\" Then cut more than it suggests. Tight is a skill you keep, not one you delegate.",
          },
          {
            title: "7. Keep a standing style sheet",
            text: "Write down your do's and don'ts once, house terms, tone rules, banned phrases, formatting conventions, and paste it into every session instead of re-explaining your voice each time. A newsroom has a style guide for the same reason: consistency shouldn't depend on memory.",
          },
        ],
      },
      {
        type: "h2",
        text: "The underlying principle",
      },
      {
        type: "p",
        text: "None of this treats the model as the writer. It treats it as a fast, tireless, occasionally wrong collaborator, useful for exactly the things a second pair of eyes is useful for: catching weak arguments, surfacing alternatives, and cutting what doesn't earn its place. The editorial judgment, what to say and whether it's true, stays with you.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
