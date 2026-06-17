import { formatBlogDate } from "@/lib/blog";
import type { BlogPostMeta } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  post: BlogPostMeta;
}

export default function BlogCard({ post }: Props) {
  return (
    <article className="group float-left w-full bg-white border border-black/5 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="float-left w-full">
        {post.image && (
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-brand-dark/5">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}
        <div className="p-6 md:p-8">
          <time
            dateTime={post.date}
            className="text-[10px] uppercase tracking-[2px] text-brand-pink font-semibold"
          >
            {formatBlogDate(post.date)}
          </time>
          <h2 className="mt-3 text-lg md:text-xl font-semibold text-[#333] group-hover:text-brand-purple transition-colors">
            {post.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#666] line-clamp-3">
            {post.description}
          </p>
          {post.tags && post.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2 list-none p-0">
              {post.tags.slice(0, 3).map((tag) => (
                <li
                  key={tag}
                  className="text-[10px] uppercase tracking-wider px-2 py-1 bg-brand-purple/5 text-brand-purple"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <span className="mt-5 inline-block text-[10px] uppercase tracking-[2px] font-semibold text-brand-pink">
            Read article →
          </span>
        </div>
      </Link>
    </article>
  );
}
