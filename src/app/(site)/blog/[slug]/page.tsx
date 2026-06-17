import BlogPostBody from "@/components/blog/BlogPostBody";
import BlogSubpageChrome from "@/components/blog/BlogSubpageChrome";
import { formatBlogDate, getAllSlugs, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  const seoTitle = post.metaTitle || post.title;
  const seoDesc = post.metaDescription || post.description;
  const ogImg = post.ogImage || post.image;

  return {
    title: seoTitle,
    description: seoDesc,
    ...(post.canonicalUrl && { alternates: { canonical: post.canonicalUrl } }),
    ...(post.noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      type: "article",
      publishedTime: post.date,
      images: ogImg ? [{ url: ogImg }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <BlogSubpageChrome watermark="Article" title={post.title} description={post.description}>
      <section className="relative float-left w-full py-[80px] bg-white overflow-hidden">
        <div className="max-w-[800px] w-[92%] mx-auto relative z-5">
          <div className="mb-10 pb-6 border-b border-dotted border-black/10">
            <time
              dateTime={post.date}
              className="text-[10px] uppercase tracking-[2px] text-brand-pink font-semibold"
            >
              {formatBlogDate(post.date)}
            </time>
            {post.author && (
              <p className="mt-2 text-xs uppercase tracking-[2px] text-[#999]">
                By {post.author}
              </p>
            )}
            {post.tags && post.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2 list-none p-0">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-[10px] uppercase tracking-wider px-2 py-1 bg-brand-purple/5 text-brand-purple"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {post.image && (
            <div className="relative w-full mb-10">
              <Image
                src={post.image}
                alt=""
                width={800}
                height={600}
                className="w-full h-auto"
                priority
                sizes="800px"
              />
            </div>
          )}

          <BlogPostBody content={post.content} />

          <div className="mt-12 pt-8 border-t border-dotted border-black/10">
            <Link
              href="/blog"
              className="text-[10px] uppercase tracking-[2px] font-semibold text-brand-purple hover:text-brand-pink transition-colors"
            >
              ← All articles
            </Link>
          </div>
        </div>
      </section>
    </BlogSubpageChrome>
  );
}
