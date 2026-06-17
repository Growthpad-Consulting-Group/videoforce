import BlogPostForm from "@/components/admin/BlogPostForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New post",
};

export default function AdminNewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#333] mb-6">New blog post</h1>
      <BlogPostForm mode="create" />
    </div>
  );
}
