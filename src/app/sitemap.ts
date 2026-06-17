<<<<<<< HEAD
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://videoforce.co.ke";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/contacts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
=======
import { getAllPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://videoforce.co.ke";
  const posts = await getAllPosts();

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contacts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
>>>>>>> master
  ];
}
