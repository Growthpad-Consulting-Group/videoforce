import BlogPostForm from "@/components/admin/BlogPostForm";
import { getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return { title: post ? `Edit: ${post.title}` : "Edit post" };
}

export default async function AdminEditBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#333] mb-6">Edit post</h1>
      <BlogPostForm mode="edit" initial={post} originalSlug={slug} />
    </div>
  );
}
