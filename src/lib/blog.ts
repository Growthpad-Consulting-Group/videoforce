import type { BlogPost, BlogPostMeta } from "@/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const API_BASE = process.env.API_URL ?? "http://localhost:4000";

async function fetchPostsFromApi(): Promise<BlogPost[] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/blog?full=1`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as { posts: BlogPost[] };
    return data.posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return null;
  }
}

function parseFile(filename: string): BlogPost {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: data.author ? String(data.author) : undefined,
    image: data.image ? String(data.image) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    content: content.trim(),
  };
}

function getAllPostsFromFiles(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parseFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const fromApi = await fetchPostsFromApi();
  if (fromApi?.length) return fromApi;
  return getAllPostsFromFiles();
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
  try {
    const res = await fetch(`${API_BASE}/api/blog/${encodeURIComponent(slug)}`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      const data = (await res.json()) as { post: BlogPost };
      return data.post;
    }
  } catch {
    // fall through to local markdown
  }

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;
  return parseFile(`${slug}.md`);
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
