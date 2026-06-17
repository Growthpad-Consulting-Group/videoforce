"use client";

import { createPost, updatePost } from "@/lib/admin-api";
import { uploadToImageKit } from "@/lib/imagekit";
import { slugify } from "@/lib/blog-utils";
import type { BlogPost, BlogPostInput } from "@/types";
import { Icon } from "@iconify/react";
import { marked } from "marked";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import RichTextEditor from "./RichTextEditor";

interface Props {
  mode: "create" | "edit";
  initial?: BlogPost;
  originalSlug?: string;
}

function tagsToString(tags?: string[]) {
  return tags?.join(", ") ?? "";
}

function parseTags(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Convert existing Markdown posts to HTML; pass HTML through unchanged. */
function toHtml(content: string): string {
  if (!content.trim()) return "";
  if (content.trim().startsWith("<")) return content;
  return marked.parse(content) as string;
}

// Character counter shown beneath SEO text fields
function CharCount({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const cls =
    len > max
      ? "text-red-500"
      : len > max - 10
      ? "text-amber-500"
      : "text-[#bbb]";
  return <span className={`text-[10px] tabular-nums ${cls}`}>{len}/{max}</span>;
}

export default function BlogPostForm({ mode, initial, originalSlug }: Props) {
  const router = useRouter();
  const coverImageRef = useRef<HTMLInputElement>(null);
  const ogImageRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [date, setDate] = useState(
    initial?.date ?? new Date().toISOString().slice(0, 10)
  );
  const [author, setAuthor] = useState(initial?.author ?? "Video Force Team");
  const [image, setImage] = useState(initial?.image ?? "");
  const [tags, setTags] = useState(tagsToString(initial?.tags));
  const [content, setContent] = useState("");
  // SEO / metadata
  const [metaTitle, setMetaTitle] = useState(initial?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(initial?.metaDescription ?? "");
  const [ogImage, setOgImage] = useState(initial?.ogImage ?? "");
  const [canonicalUrl, setCanonicalUrl] = useState(initial?.canonicalUrl ?? "");
  const [noIndex, setNoIndex] = useState(initial?.noIndex ?? false);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [ogImageUploading, setOgImageUploading] = useState(false);

  // Convert initial Markdown → HTML once on mount for the editor initial value
  const initialHtml = useMemo(() => toHtml(initial?.content ?? ""), []);

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setCoverUploading(true);
    try {
      const url = await uploadToImageKit(file, "/videoforce/covers");
      setImage(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cover upload failed");
    } finally {
      setCoverUploading(false);
    }
  };

  const handleOgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setOgImageUploading(true);
    try {
      const url = await uploadToImageKit(file, "/videoforce/og");
      setOgImage(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "OG image upload failed");
    } finally {
      setOgImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate rich-text content (editor emits "<p></p>" when empty)
    const textContent = content.replace(/<[^>]*>/g, "").trim();
    if (!textContent && !initialHtml) {
      setError("Content is required.");
      return;
    }

    setSaving(true);
    setError("");

    const payload: BlogPostInput = {
      title,
      slug: slug || slugify(title),
      description,
      date,
      author: author || undefined,
      image: image || undefined,
      tags: parseTags(tags),
      content: textContent ? content : initialHtml,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
      ogImage: ogImage || undefined,
      canonicalUrl: canonicalUrl || undefined,
      noIndex,
    };

    try {
      if (mode === "create") {
        await createPost(payload);
      } else {
        await updatePost(originalSlug ?? initial?.slug ?? "", payload);
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full border border-[#ddd] px-3 py-2.5 text-sm text-[#333] outline-none focus:border-brand-pink";

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="admin-label">Title *</label>
          <input
            className={inputCls}
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="admin-label">Slug *</label>
          <input
            className={inputCls}
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            title="Lowercase letters, numbers, and hyphens only"
          />
        </div>

        {/* Date */}
        <div>
          <label className="admin-label">Publish date *</label>
          <input
            type="date"
            className={inputCls}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="admin-label">Description *</label>
          <textarea
            className={`${inputCls} min-h-[80px] resize-y`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="admin-label">Author</label>
          <input
            className={inputCls}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {/* Cover image */}
        <div>
          <label className="admin-label">Cover image</label>
          <div className="flex gap-2">
            <input
              className={`${inputCls} flex-1`}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="URL or upload →"
            />
            <button
              type="button"
              onClick={() => coverImageRef.current?.click()}
              disabled={coverUploading}
              className="shrink-0 border border-[#ddd] bg-[#fafafa] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#555] hover:bg-[#f0f0f0] disabled:opacity-50"
            >
              {coverUploading
                ? <Icon icon="fa6-solid:spinner" className="animate-spin" />
                : <Icon icon="fa6-solid:upload" />
              }
            </button>
          </div>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="Cover preview"
              className="mt-2 h-24 w-full rounded border border-[#ddd] object-cover"
            />
          )}
          <input
            ref={coverImageRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverUpload}
          />
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <label className="admin-label">Tags (comma-separated)</label>
          <input
            className={inputCls}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Rich text editor */}
        <div className="md:col-span-2">
          <label className="admin-label">Content *</label>
          <RichTextEditor
            value={initialHtml}
            onChange={setContent}
            placeholder="Write your article content here…"
          />
        </div>
      </div>

      {/* ── SEO & Metadata ─────────────────────────────────────────────────── */}
      <div className="border-t border-[#e5e5e5] pt-6">
        <h2 className="text-[10px] uppercase tracking-[3px] font-semibold text-[#999] mb-5">
          SEO &amp; Metadata
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Meta title */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="admin-label !mb-0">SEO title</label>
              <CharCount value={metaTitle} max={60} />
            </div>
            <input
              className={inputCls}
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder={title || "Defaults to post title"}
            />
          </div>

          {/* Canonical URL */}
          <div>
            <label className="admin-label">Canonical URL</label>
            <input
              className={inputCls}
              type="url"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              placeholder="https://example.com/original-post"
            />
          </div>

          {/* Meta description */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="admin-label !mb-0">SEO description</label>
              <CharCount value={metaDescription} max={160} />
            </div>
            <textarea
              className={`${inputCls} min-h-[72px] resize-y`}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder={description || "Defaults to post description"}
            />
          </div>

          {/* OG image */}
          <div className="md:col-span-2">
            <label className="admin-label">Open Graph image</label>
            <div className="flex gap-2">
              <input
                className={`${inputCls} flex-1`}
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="URL or upload → (defaults to cover image)"
              />
              <button
                type="button"
                onClick={() => ogImageRef.current?.click()}
                disabled={ogImageUploading}
                className="shrink-0 border border-[#ddd] bg-[#fafafa] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#555] hover:bg-[#f0f0f0] disabled:opacity-50"
              >
                {ogImageUploading
                  ? <Icon icon="fa6-solid:spinner" className="animate-spin" />
                  : <Icon icon="fa6-solid:upload" />
                }
              </button>
            </div>
            <input ref={ogImageRef} type="file" accept="image/*" className="hidden" onChange={handleOgImageUpload} />
          </div>

          {/* No-index toggle */}
          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={noIndex}
              onClick={() => setNoIndex((v) => !v)}
              className={`relative h-5 w-9 rounded-full transition-colors focus:outline-none ${noIndex ? "bg-brand-pink" : "bg-[#ddd]"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${noIndex ? "translate-x-4" : "translate-x-0"}`}
              />
            </button>
            <span className="text-xs text-[#555]">
              No-index — hide this post from search engines
            </span>
          </div>

          {/* Google search preview */}
          <div className="md:col-span-2 rounded border border-[#e8e8e8] bg-[#fafafa] p-4">
            <p className="text-[10px] uppercase tracking-[2px] text-[#aaa] mb-3">Search preview</p>
            <div className="max-w-[560px] font-sans">
              <p className="text-[#1a0dab] text-[18px] leading-snug truncate hover:underline cursor-pointer">
                {metaTitle || title || "Post title"}
              </p>
              <p className="text-[#006621] text-sm mt-0.5">
                videoforce.com/blog/<span className="font-medium">{slug || "post-slug"}</span>
              </p>
              <p className="text-[#545454] text-sm mt-1 line-clamp-2 leading-snug">
                {metaDescription || description || "Your post description will appear here."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-purple px-6 py-3 text-xs font-semibold uppercase tracking-[2px] text-white hover:bg-brand-purple2 disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Saving…" : mode === "create" ? "Publish post" : "Save changes"}
        </button>
        <Link
          href="/admin/blog"
          className="text-xs uppercase tracking-[2px] text-[#666] hover:text-brand-pink"
        >
          Cancel
        </Link>
        {mode === "edit" && initial?.slug && (
          <Link
            href={`/blog/${initial.slug}`}
            target="_blank"
            className="text-xs uppercase tracking-[2px] text-brand-pink hover:underline ml-auto"
          >
            Preview on site →
          </Link>
        )}
      </div>
    </form>
  );
}
