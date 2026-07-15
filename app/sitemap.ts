import type { MetadataRoute } from "next";

const BASE_URL = "https://www.narrations.io";

const ROUTES = [
  "",
  "/products",
  "/enterprise",
  "/about",
  "/resources",
  "/resources/blog",
  "/resources/insights",
  "/resources/case-studies",
  "/resources/documentation",
  "/pricing",
  "/contact",
  "/brand",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
