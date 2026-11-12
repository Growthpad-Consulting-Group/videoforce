import type {
  AdminUser,
  BlogPost,
  BlogPostInput,
  ContactSubmission,
  Subscriber,
} from "@/types";

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
  let res: Response;
  try {
    res = await apiFetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password, rememberMe }),
    });
  } catch {
    throw new Error("Network error — check your connection and try again.");
  }

  let data: { error?: string } = {};
  try {
    data = (await res.json()) as { error?: string };
  } catch {
    // non-JSON response (e.g. hosting error page)
  }
  if (!res.ok) {
    throw new Error(data.error ?? `Login failed (status ${res.status}).`);
  }
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

// ─── Subscribers ──────────────────────────────────────────────────────────────

export async function listSubscribers(): Promise<Subscriber[]> {
  const res = await apiFetch("/api/admin/subscribers");
  if (!res.ok) throw new Error("Failed to fetch subscribers");
  const data = (await res.json()) as { subscribers: Subscriber[] };
  return data.subscribers;
}

export async function addSubscriber(email: string): Promise<void> {
  const res = await apiFetch("/api/admin/subscribers", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  const json = (await res.json()) as { error?: string };
  if (!res.ok) throw new Error(json.error ?? "Failed to add subscriber");
}

export async function deleteSubscriber(id: string): Promise<void> {
  const res = await apiFetch(`/api/admin/subscribers/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const json = (await res.json()) as { error?: string };
    throw new Error(json.error ?? "Failed to delete subscriber");
  }
}

// ─── Contact submissions ────────────────────────────────────────────────────────

export async function listContactSubmissions(): Promise<ContactSubmission[]> {
  const res = await apiFetch("/api/admin/contact-submissions");
  if (!res.ok) throw new Error("Failed to fetch submissions");
  const data = (await res.json()) as { submissions: ContactSubmission[] };
  return data.submissions;
}

export async function markSubmissionStatus(
  id: string,
  status: "new" | "read"
): Promise<void> {
  const res = await apiFetch(`/api/admin/contact-submissions/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const json = (await res.json()) as { error?: string };
    throw new Error(json.error ?? "Failed to update submission");
  }
}

export async function deleteSubmission(id: string): Promise<void> {
  const res = await apiFetch(`/api/admin/contact-submissions/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const json = (await res.json()) as { error?: string };
    throw new Error(json.error ?? "Failed to delete submission");
  }
}

// ─── Admin users ──────────────────────────────────────────────────────────────

export async function listAdminUsers(): Promise<AdminUser[]> {
  const res = await apiFetch("/api/admin/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = (await res.json()) as { users: AdminUser[] };
  return data.users;
}

export async function createAdminUser(
  email: string,
  password: string,
  name: string
): Promise<void> {
  const res = await apiFetch("/api/admin/users", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
  const json = (await res.json()) as { error?: string };
  if (!res.ok) throw new Error(json.error ?? "Failed to create admin");
}

export async function deleteAdminUser(id: string): Promise<void> {
  const res = await apiFetch(`/api/admin/users/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const json = (await res.json()) as { error?: string };
    throw new Error(json.error ?? "Failed to delete admin");
  }
}
