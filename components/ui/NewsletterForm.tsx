"use client";

import { useId, useState } from "react";

// One shared newsletter subscribe box, used by both the global Footer (dark)
// and the /resources NewsletterSection (light). Same backend (/api/subscribe),
// same behaviour, same success message — only the surface styling differs by
// `variant`, so it reads correctly on each background.

type Variant = "light" | "dark";

const STYLES: Record<
  Variant,
  {
    wrapper: string;
    form: string;
    input: string;
    button: string;
    note: string;
    error: string;
  }
> = {
  dark: {
    wrapper: "mt-5",
    form: "flex gap-2",
    input:
      "h-11 w-full min-w-0 flex-1 rounded-xl border border-white/15 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-green-500/50",
    button:
      "h-11 shrink-0 rounded-xl border border-green-500/30 bg-white/[0.04] px-5 text-sm font-medium text-white shadow-[0_0_24px_-6px_rgba(31,107,76,0.35)] transition hover:bg-white/[0.08] disabled:opacity-60",
    note: "mt-5 rounded-xl border border-green-500/25 bg-green-500/5 px-4 py-3 text-sm text-success",
    error: "mt-3 text-sm text-danger",
  },
  light: {
    wrapper: "mx-auto mt-6 max-w-sm",
    form: "flex gap-2",
    input:
      "h-11 w-full min-w-0 flex-1 rounded-xl border border-line bg-paper px-4 text-sm text-ink-900 placeholder:text-ink-300 outline-none transition focus:border-green-500/50",
    button:
      "h-11 shrink-0 rounded-xl bg-green-500 px-5 text-sm font-semibold text-white transition hover:bg-green-600 disabled:opacity-60",
    note: "mx-auto mt-6 max-w-sm rounded-xl border border-green-500/25 bg-green-50 px-4 py-3 text-sm text-green-700",
    error: "mx-auto mt-3 max-w-sm text-sm text-danger",
  },
};

export default function NewsletterForm({
  variant,
  source,
  placeholder = "Work email",
  submitLabel = "Subscribe",
}: {
  variant: Variant;
  /** Where the signup came from — stored in the Notion "Source" column. */
  source: string;
  placeholder?: string;
  submitLabel?: string;
}) {
  const s = STYLES[variant];
  const id = useId();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  if (status === "done") {
    return <p className={s.note}>Thanks, you&apos;re on the list.</p>;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={onSubmit}>
        <label htmlFor={id} className="sr-only">
          Work email
        </label>
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={s.input}
        />
        {/* Honeypot — hidden from real users, catches bots. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={s.button}
        >
          {status === "loading" ? "…" : submitLabel}
        </button>
      </form>
      {status === "error" && (
        <p className={s.error} role="alert">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
