import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://videoforce.co.ke";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/contacts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
