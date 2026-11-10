import Link from "next/link";
import { CalendarIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { BLOG_POSTS } from "@/lib/blog-data";

export function BlogSection() {
  const recentPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Blog</h2>

      <div className="space-y-8">
        {recentPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/50 pb-6 last:border-none"
          >
            <div className="space-y-1.5 max-w-xl">
              <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {post.summary}
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-zinc-500">
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>{post.publishedAt}</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 group-hover:text-zinc-100 transition-colors shrink-0">
              <span>Read more</span>
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Link
          href="/blog"
          className="rounded-md border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-all"
        >
          Show all blogs
        </Link>
      </div>
    </section>
  );
}