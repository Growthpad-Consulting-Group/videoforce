import { backendJson } from "@/lib/api";
import type { BlogPost, BlogPostMeta } from "@/types";

export async function getAllPosts(): Promise<BlogPost[]> {
  const data = await backendJson<{ posts: BlogPost[] }>("/api/blog?full=1", {
    next: { revalidate: 30 },
  } as RequestInit);
  if (!data?.posts) return [];
  return data.posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getAllPostMeta(): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts();
  return posts.map(({ slug, title, description, date, author, image, tags }) => ({
    slug,
    title,
    description,
    date,
    author,
    image,
    tags,
  }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const data = await backendJson<{ post: BlogPost }>(
    `/api/blog/${encodeURIComponent(slug)}`,
    { next: { revalidate: 30 } } as RequestInit
  );
  return data?.post;
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPostMeta();
  return posts.map((p) => p.slug);
}

export function formatBlogDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
