/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // I preview over Tailscale, not localhost — allow that dev origin.
  allowedDevOrigins: ["100.87.7.72"],
  images: {
    // Sanity image CDN + Mux thumbnails (mirrors NorthGarden's setup)
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "image.mux.com" },
    ],
  },
};

export default nextConfig;
