"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Presentation,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const INTERESTS = [
  "Narrations platform (SaaS)",
  "Enterprise AI",
  "Done-with-you (operators)",
  "Partnership",
  "Other",
] as const;

type Interest = (typeof INTERESTS)[number];

const inputClass =
  "h-11 w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-green-500/50";

type ContactSectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export default function ContactSection({
  eyebrow = "Contact Narrations",
  title = "Tell us what you're building.",
  subtitle = "Explore the platform, scope an Enterprise AI build or bring in our operator team, and we'll route you to the right conversation.",
}: ContactSectionProps = {}) {
  const formRef = useRef<HTMLDivElement>(null);
  const [interest, setInterest] = useState<Interest>("Narrations platform (SaaS)");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const goToForm = (preselect: Interest) => {
    setInterest(preselect);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cards = [
    {
      icon: Presentation,
      title: "Platform demo",
      text: "An operator-led walkthrough of the six products: Content, Marketing, Operations, Finance, Intelligence and Communication, on one platform.",
      cta: (
        <Link
          href="/#book-a-demo"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition hover:text-green-500"
        >
          Book a demo <ArrowRight className="h-4 w-4" />
        </Link>
      ),
    },
    {
      icon: ShieldCheck,
      title: "Enterprise AI",
      text: "For corporates, institutions, governments and larger teams that need custom AI dashboards inside their own infrastructure.",
      cta: (
        <button
          type="button"
          onClick={() => goToForm("Enterprise AI")}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition hover:text-green-500"
        >
          Scope your build <ArrowRight className="h-4 w-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="relative mx-auto max-w-[1200px] px-6 pb-16 md:pb-20">
      {/* Hero */}
      <div className="mx-auto max-w-2xl pt-16 text-center md:pt-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          {eyebrow}
        </span>
        <h1 className="mt-6 font-sans text-4xl font-bold leading-tight tracking-tight text-white md:text-[3.25rem]">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/55 md:text-base">
          {subtitle}
        </p>
      </div>

      {/* Two columns */}
      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
        {/* Left — contact option cards */}
        <div className="flex flex-col gap-6">
          {cards.map(({ icon: Icon, title, text, cta }) => (
            <div
              key={title}
              className="flex flex-1 flex-col rounded-[24px] border border-white/10 bg-white/[0.02] p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-green-500">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-7 text-white/50">{text}</p>
              <div className="mt-auto pt-5">{cta}</div>
            </div>
          ))}
        </div>

        {/* Right — glowing contact form card */}
        <div
          ref={formRef}
          className="h-fit scroll-mt-24 rounded-[28px] border border-green-500/20 bg-dpanel p-7 shadow-glow-brand md:p-9"
        >
          {submitted ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-green-500/40 bg-green-500/10 text-green-500">
                <MessageSquare className="h-5 w-5" />
              </span>
              <h2 className="mt-6 text-xl font-semibold text-white">
                Thank you for reaching out, we&rsquo;ll be in touch shortly.
              </h2>
            </div>
          ) : (
            <form
              noValidate={false}
              onSubmit={async (e) => {
                e.preventDefault();
                if (status === "sending") return;

                const form = e.currentTarget;
                const data = new FormData(form);

                setStatus("sending");
                setErrorMessage(null);

                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      firstName: data.get("firstName"),
                      lastName: data.get("lastName"),
                      workEmail: data.get("email"),
                      company: data.get("company"),
                      interest: [interest],
                      message: data.get("message"),
                      updates: data.get("newsletter") === "on",
                      website: data.get("website"),
                    }),
                  });

                  if (!res.ok) {
                    throw new Error("Submission failed");
                  }

                  setStatus("idle");
                  setSubmitted(true);
                } catch {
                  setStatus("error");
                  setErrorMessage(
                    "Something went wrong sending your message. Please try again.",
                  );
                }
              }}
            >
              <div
                className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-first-name"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    First Name <span className="text-green-500">*</span>
                  </label>
                  <input
                    id="contact-first-name"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="Enter your first name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-last-name"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Last Name <span className="text-green-500">*</span>
                  </label>
                  <input
                    id="contact-last-name"
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    placeholder="Enter your last name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Work Email <span className="text-green-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@company.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-company"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Company
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company name"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-interest"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Interest <span className="text-green-500">*</span>
                </label>
                <select
                  id="contact-interest"
                  name="interest"
                  required
                  value={interest}
                  onChange={(e) => setInterest(e.target.value as Interest)}
                  className="h-11 w-full appearance-none rounded-xl border border-white/12 bg-white/[0.03] px-4 text-sm text-white outline-none transition focus:border-green-500/50"
                >
                  {INTERESTS.map((opt) => (
                    <option key={opt} value={opt} className="bg-dpanel">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Message <span className="text-green-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What you're building and what you need from us"
                  className="w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-green-500/50"
                />
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  name="newsletter"
                  className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/[0.03] accent-green-500"
                />
                Yes, I&rsquo;d like to receive updates from Narrations.
              </label>

              {status === "error" && errorMessage ? (
                <p className="mt-5 text-sm text-red-400">{errorMessage}</p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-7 w-full rounded-full bg-green-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-white/40">
                By submitting this form, you agree to our{" "}
                <a
                  href="/privacy"
                  className="underline underline-offset-2 transition hover:text-white/70"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
