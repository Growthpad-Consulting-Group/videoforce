import { formatBlogDate, getAllPostMeta } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  const posts = await getAllPostMeta();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#333]">Dashboard</h1>
      <p className="mt-2 text-sm text-[#666]">Manage Video Force site content.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-6 shadow-sm">
          <p className="text-[10px] uppercase tracking-[2px] text-[#999]">Blog posts</p>
          <p className="mt-2 text-3xl font-semibold text-brand-purple">{posts.length}</p>
          <Link
            href="/admin/blog"
            className="mt-4 inline-block text-xs uppercase tracking-[2px] font-semibold text-brand-pink hover:underline"
          >
            Manage blog →
          </Link>
        </div>

        <div className="rounded-lg border border-[#e5e5e5] bg-white p-6 shadow-sm">
          <p className="text-[10px] uppercase tracking-[2px] text-[#999]">Quick action</p>
          <Link
            href="/admin/blog/new"
            className="mt-4 inline-block bg-brand-yellow px-5 py-2.5 text-xs font-semibold uppercase tracking-[2px] text-brand-purple hover:opacity-90"
          >
            New article
          </Link>
        </div>
      </div>

      {posts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-[2px] text-[#666] mb-4">
            Recent posts
          </h2>
          <ul className="divide-y divide-[#eee] rounded-lg border border-[#e5e5e5] bg-white">
            {posts.slice(0, 5).map((post) => (
              <li key={post.slug} className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="font-medium text-[#333]">{post.title}</p>
                  <p className="text-xs text-[#999] mt-0.5">{formatBlogDate(post.date)}</p>
                </div>
                <Link
                  href={`/admin/blog/${post.slug}/edit`}
                  className="shrink-0 text-xs uppercase tracking-wider text-brand-pink hover:underline"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
