import type { BlogPost, BlogPostInput } from "@/types";

async function apiFetch(url: string, options?: RequestInit): Promise<Response> {
  return fetch(url, {
    ...options,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });
}

export async function adminLogin(
  email: string,
  password: string,
  rememberMe = true
): Promise<void> {
  const res = await apiFetch("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password, rememberMe }),
  });
  const data = (await res.json()) as { error?: string };
  if (!res.ok) throw new Error(data.error ?? "Login failed");
}

export async function adminLogout(): Promise<void> {
  await apiFetch("/api/admin/logout", { method: "POST" });
}

export async function listPosts(): Promise<BlogPost[]> {
  const res = await apiFetch("/api/admin/blog");
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = (await res.json()) as { posts: BlogPost[] };
  return data.posts;
}

export async function createPost(data: BlogPostInput): Promise<{ slug: string }> {
  const res = await apiFetch("/api/admin/blog", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const json = (await res.json()) as { slug?: string; error?: string };
  if (!res.ok) throw new Error(json.error ?? "Failed to create post");
  return { slug: json.slug! };
}

export async function updatePost(
  slug: string,
  data: BlogPostInput
): Promise<{ slug: string }> {
  const res = await apiFetch(`/api/admin/blog/${encodeURIComponent(slug)}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  const json = (await res.json()) as { slug?: string; error?: string };
  if (!res.ok) throw new Error(json.error ?? "Failed to update post");
  return { slug: json.slug! };
}

export async function deletePost(slug: string): Promise<void> {
  const res = await apiFetch(`/api/admin/blog/${encodeURIComponent(slug)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const json = (await res.json()) as { error?: string };
    throw new Error(json.error ?? "Failed to delete post");
  }
}
