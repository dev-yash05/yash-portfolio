"use client";

import { useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { CalendarIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { BLOG_POSTS } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

const ALL_TAGS = ["All", "Engineering", "Backend", "Architecture", "Next.js"] as const;

export default function BlogIndexPage() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const filteredPosts = selectedTag === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.tags.includes(selectedTag as any));

  const hoveredPost = BLOG_POSTS.find((p) => p.slug === hoveredSlug);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="mx-auto max-w-3xl px-6 py-12 space-y-10 relative"
    >
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Blog</h1>
        <p className="text-sm text-zinc-400">
          Thoughts, tutorials, and insights on engineering and programming.
        </p>
      </header>

      {/* TAG FILTER PILLS WITH COUNTS */}
      <div className="flex flex-wrap items-center gap-2">
        {ALL_TAGS.map((tag) => {
          const count = tag === "All"
            ? BLOG_POSTS.length
            : BLOG_POSTS.filter((p) => p.tags.includes(tag as any)).length;
          const isActive = selectedTag === tag;

          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all border",
                isActive
                  ? "bg-zinc-100 text-zinc-900 border-zinc-100"
                  : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
              )}
            >
              <span>{tag}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.2 text-[10px]",
                  isActive ? "bg-zinc-800 text-zinc-100" : "bg-zinc-800 text-zinc-400"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* BLOG POSTS LIST WITH BLUR-ON-SIBLING-HOVER */}
      <div className="space-y-8 pt-2">
        {filteredPosts.map((post) => {
          const isDimmed = hoveredSlug !== null && hoveredSlug !== post.slug;

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              onMouseEnter={() => setHoveredSlug(post.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className={cn(
                "group flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/50 pb-6 transition-all duration-300",
                isDimmed && "blur-[2px] opacity-35"
              )}
            >
              <div className="space-y-2 max-w-xl">
                <h2 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {post.summary}
                </p>

                {/* TAG CHIPS */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* DATE */}
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
          );
        })}
      </div>

      {/* FLOATING CURSOR PREVIEW CARD (Desktop Only) */}
      {hoveredPost && (
        <div
          style={{
            transform: `translate3d(${cursorPos.x + 24}px, ${cursorPos.y - 80}px, 0)`,
          }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:flex h-44 w-72 flex-col justify-between rounded-xl border border-zinc-300 bg-white p-5 text-zinc-900 shadow-2xl transition-transform duration-75 ease-out bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[16px_16px]"
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            {hoveredPost.coverSubtitle}
          </div>
          <div className={`${playfair.className} text-center text-lg font-bold leading-snug text-zinc-900 line-clamp-3`}>
            {hoveredPost.title}
          </div>
          <div className="text-right text-[11px] font-serif text-zinc-500">
            @yashnamdeo
          </div>
        </div>
      )}
    </div>
  );
}