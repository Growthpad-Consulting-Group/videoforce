import DeletePostButton from "@/components/admin/DeletePostButton";
import { formatBlogDate, getAllPostMeta } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function AdminBlogPage() {
  const posts = await getAllPostMeta();

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#333]">Blog</h1>
          <p className="mt-2 text-sm text-[#666]">
            Create, edit, and delete articles. Changes are stored in the API database.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="bg-brand-purple px-5 py-3 text-xs font-semibold uppercase tracking-[2px] text-white hover:bg-brand-purple2"
        >
          + New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-[#666]">No posts yet. Create your first article.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#e5e5e5] bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-[#eee] bg-[#fafafa] text-[10px] uppercase tracking-[2px] text-[#999]">
              <tr>
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Slug</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee]">
              {posts.map((post) => (
                <tr key={post.slug} className="hover:bg-[#fafafa]">
                  <td className="px-5 py-4 font-medium text-[#333]">{post.title}</td>
                  <td className="px-5 py-4 text-[#666] whitespace-nowrap">
                    {formatBlogDate(post.date)}
                  </td>
                  <td className="px-5 py-4 text-[#999] font-mono text-xs">{post.slug}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-xs uppercase tracking-wider text-[#666] hover:text-brand-pink"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/blog/${post.slug}/edit`}
                        className="text-xs uppercase tracking-wider text-brand-purple hover:underline font-semibold"
                      >
                        Edit
                      </Link>
                      <DeletePostButton slug={post.slug} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
