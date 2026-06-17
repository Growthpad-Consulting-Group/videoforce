import BlogCard from "@/components/blog/BlogCard";
import BlogSubpageChrome from "@/components/blog/BlogSubpageChrome";
import SectionTitle from "@/components/ui/SectionTitle";
import { getAllPostMeta } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on video production, animation, livestreaming, and digital content strategy from Video Force Kenya.",
};

export default async function BlogPage() {
  const posts = await getAllPostMeta();

  return (
    <BlogSubpageChrome
      watermark="Blog"
      title="Insights & Updates"
      description="Video production tips, industry perspectives, and stories from our team in Nairobi."
    >
      <section className="relative float-left w-full py-[110px] bg-white overflow-hidden">
        <SectionTitle subtitle="Latest Articles //" />

        <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
          {posts.length === 0 ? (
            <p className="text-sm text-[#666]">No articles published yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </BlogSubpageChrome>
  );
}
