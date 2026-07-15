import type { MetadataRoute } from "next";

const BASE_URL = "https://www.narrations.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/parked"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
