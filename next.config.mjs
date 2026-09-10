// Dev mode (next dev / HMR) runs the react-refresh runtime through eval() and
// talks to the dev server over a websocket — a production-strict CSP blocks
// both, which silently kills hydration: pages render but no button works.
// Relax only those two directives, only in dev; production stays strict.
const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // /resources became /solutions. Exact-path only: `source: "/resources"` does
  // NOT match children, so /resources/blog and /resources/blog/[slug] keep
  // working untouched.
  async redirects() {
    return [
      { source: "/resources", destination: "/solutions", permanent: true },
      // /products became /platform.
      { source: "/products", destination: "/platform", permanent: true },
    ];
  },
  // All images are local files served from /public; nothing uses next/image,
  // so the optimizer endpoint (/_next/image) stays disabled.
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            // 'unsafe-inline' script/style: required by Next's inline bootstrap
            // and Tailwind/inline styles without a nonce-based middleware setup.
            // Everything else is same-origin: fonts are self-hosted, images are
            // local, all fetches go to /api/*.
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self'",
              `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
