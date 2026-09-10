import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import "./globals.css";

// Satoshi (variable, 300–900) — the site's single typeface ("Ink + Evergreen").
// font-sans resolves to it (tailwind.config.ts); --font-satoshi also feeds the
// Platform + Technology CSS modules.
const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Narrations — Everything your company says",
  description:
    "An AI editor for everything your company writes. Every draft is checked against what you've approved, your corrections are kept, and the rules stay yours.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body className="font-sans antialiased bg-surface text-ink-900">
        {children}
        <Footer />
      </body>
    </html>
  );
}
