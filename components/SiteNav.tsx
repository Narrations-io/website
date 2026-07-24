import Link from "next/link";
import NarrationsLogo from "@/components/NarrationsLogo";
import MobileNavDrawer from "@/components/MobileNavDrawer";

const NAV: { label: string; href: string }[] = [
  { label: "Products", href: "/products" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

type SiteNavProps = {
  theme?: "dark" | "light";
};

export default function SiteNav({ theme = "dark" }: SiteNavProps) {
  const dark = theme === "dark";
  return (
    <header className="relative z-20">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
        <Link
          href="/"
          aria-label="Narrations"
          className="flex items-center"
        >
          <NarrationsLogo height={26} tone={dark ? "dark" : "light"} />
        </Link>

        <div
          className={`hidden items-center gap-8 text-sm font-medium md:flex ${dark ? "text-white/60" : "text-ink-500"}`}
        >
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className={`transition ${dark ? "hover:text-white" : "hover:text-ink-900"}`}
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={`hidden text-sm font-medium transition sm:block md:block ${dark ? "text-white/80 hover:text-white" : "text-ink-700 hover:text-ink-900"}`}
          >
            Contact
          </Link>
          <Link
            href="/#book-a-demo"
            className={`hidden rounded-full px-5 py-2 text-sm font-medium transition sm:inline-flex ${dark ? "border border-white/15 bg-white/[0.05] text-white hover:bg-white/[0.1]" : "border border-line bg-paper text-ink-900 hover:bg-sunken"}`}
          >
            Get started
          </Link>
          <MobileNavDrawer theme={theme} links={NAV} />
        </div>
      </nav>
    </header>
  );
}
