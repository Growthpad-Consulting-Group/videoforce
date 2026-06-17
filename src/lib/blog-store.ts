import { isValidSlug } from "@/lib/blog-utils";
import type { BlogPost } from "@/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export { isValidSlug, slugify } from "@/lib/blog-utils";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function ensurePostsDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

function postToMarkdown(post: BlogPost): string {
  const { content, slug: _slug, ...frontmatter } = post;
  return matter.stringify(content, frontmatter);
}

export function savePost(post: BlogPost): void {
  if (!isValidSlug(post.slug)) {
    throw new Error("Invalid slug. Use lowercase letters, numbers, and hyphens only.");
  }
  ensurePostsDir();
  fs.writeFileSync(path.join(POSTS_DIR, `${post.slug}.md`), postToMarkdown(post), "utf8");
}

export function deletePost(slug: string): boolean {
  if (!isValidSlug(slug)) return false;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return false;
  fs.unlinkSync(filePath);
  return true;
}

export function renamePost(oldSlug: string, newSlug: string, post: BlogPost): void {
  if (oldSlug !== newSlug) {
    deletePost(oldSlug);
  }
  savePost({ ...post, slug: newSlug });
}

export function postFileExists(slug: string): boolean {
  return fs.existsSync(path.join(POSTS_DIR, `${slug}.md`));
}
