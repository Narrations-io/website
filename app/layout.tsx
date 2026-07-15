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
  title: "Narrations, an AI company for the digital economy",
  description:
    "Narrations is an AI company for the digital economy. One platform, six products on a shared memory of your brand, with Enterprise AI built inside your own infrastructure and operators in the loop.",
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
