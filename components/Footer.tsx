import Link from "next/link";
import { Mail } from "lucide-react";
import NarrationsLogo from "@/components/NarrationsLogo";
import NewsletterForm from "@/components/ui/NewsletterForm";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Products", href: "/products" },
      { label: "Enterprise AI", href: "/enterprise" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Demo", href: "/#book-a-demo" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Solutions", href: "/resources#industries" },
      { label: "Brandbook", href: "/brand" },
      { label: "FAQs", href: "/resources#faq" },
    ],
  },
];

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/narrationsio", icon: LinkedinIcon },
  { label: "Email", href: "mailto:contact@narrations.io", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dbg text-white">
      <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-16 md:pt-20">
        {/* Top area: brand + columns + newsletter */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr_1.4fr] lg:gap-10">
          {/* Brand block */}
          <div>
            <Link
              href="/"
              aria-label="Narrations"
              className="flex items-center"
            >
              <NarrationsLogo height={26} tone="dark" />
            </Link>
            <p className="mt-4 max-w-[220px] text-sm leading-6 text-white/50">
              AI systems for growth in the digital economy.
            </p>
          </div>

          {/* Navigation columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-white">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/50 transition hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold leading-snug text-white">
              Product updates and insights
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/50">
              Product news, new capabilities and what&rsquo;s working in AI
              systems and digital-economy growth.
            </p>
            <NewsletterForm
              variant="dark"
              source="footer"
              placeholder="Work email"
              submitLabel="Subscribe"
            />
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 text-sm text-white/45 sm:flex-row sm:items-center sm:gap-6">
            <span>© Narrations 2026. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="transition hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
