import Link from "next/link";
import { CalendarIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { BLOG_POSTS } from "@/lib/blog-data";

export function BlogSection() {
  const recentPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-foreground tracking-tight transition-colors">
        Blog
      </h2>

      <div className="space-y-8">
        {recentPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 last:border-none transition-colors"
          >
            <div className="space-y-1.5 max-w-xl">
              <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed transition-colors">
                {post.summary}
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground/70 transition-colors">
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>{post.publishedAt}</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
              <span>Read more</span>
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Link
          href="/blog"
          className="rounded-md border border-border bg-muted/60 px-4 py-2 text-xs font-medium text-foreground hover:bg-muted hover:border-foreground/20 transition-all"
        >
          Show all blogs
        </Link>
      </div>
    </section>
  );
}
