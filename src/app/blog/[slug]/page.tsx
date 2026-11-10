import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import { BLOG_POSTS, getBlogBySlug } from "@/lib/blog-data";
import { ReadingProgressPill } from "@/components/ui/ReadingProgressPill";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

function BlogPostSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      <div className="flex min-h-65 flex-col justify-between rounded-xl border border-border bg-card p-8">
        <div className="h-4 w-28 rounded bg-muted/60" />
        <div className="my-auto py-6 space-y-3 max-w-xl mx-auto w-full">
          <div className="mx-auto h-8 w-3/4 rounded bg-muted/80" />
          <div className="mx-auto h-6 w-1/2 rounded bg-muted/60" />
        </div>
        <div className="flex justify-between">
          <div className="h-3 w-16 rounded bg-muted/60" />
          <div className="h-3 w-20 rounded bg-muted/60" />
        </div>
      </div>

      <div className="space-y-4 border-b border-border pb-8">
        <div className="h-10 w-2/3 rounded bg-muted/80" />
        <div className="h-5 w-full rounded bg-muted/60" />
        <div className="flex gap-4 pt-2">
          <div className="h-4 w-24 rounded bg-muted/60" />
          <div className="h-4 w-20 rounded bg-muted/60" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="h-4 w-full rounded bg-muted/60" />
        <div className="h-4 w-5/6 rounded bg-muted/60" />
        <div className="h-4 w-4/6 rounded bg-muted/60" />
      </div>
    </div>
  );
}

async function BlogContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const pillSections = post.sections.map((sec) => ({
    id: sec.id,
    label: sec.heading,
  }));

  return (
    <>
      <ReadingProgressPill sections={pillSections} />

      {/* GRID-PATTERNED HERO CARD */}
      <div className="relative flex min-h-65 flex-col justify-between rounded-xl border border-border bg-card p-8 text-card-foreground shadow-xl bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[22px_22px] transition-colors">
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {post.coverSubtitle}
        </div>

        <div className="my-auto py-6 text-center max-w-xl mx-auto space-y-3">
          <h2
            className={`${playfair.className} text-2xl sm:text-3xl font-bold text-card-foreground leading-tight`}
          >
            {post.title}
          </h2>
        </div>

        <div className="flex items-center justify-between text-xs font-serif text-muted-foreground">
          <span>yashn.me</span>
          <span>@yashnamdeo</span>
        </div>
      </div>

      {/* EDITORIAL SERIF TITLE & METADATA */}
      <header className="space-y-4 border-b border-border pb-8 transition-colors">
        <h1
          className={`${playfair.className} text-3xl sm:text-4xl text-foreground leading-tight`}
        >
          {post.title}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          {post.summary}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5" />
            {post.publishedAt}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
          <div className="flex items-center gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-muted/60 border border-border px-2 py-0.5 text-[11px] text-muted-foreground font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ARTICLE BODY SECTIONS */}
      <div className="space-y-12">
        {post.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="space-y-5 scroll-mt-24"
          >
            <h2
              className={`${playfair.className} text-2xl text-foreground font-bold tracking-tight`}
            >
              {section.heading}
            </h2>

            {section.paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-sm sm:text-base text-foreground/90 leading-relaxed font-normal"
              >
                {para}
              </p>
            ))}

            {section.codeOrFlow && (
              <div className="my-6 rounded-xl border border-border bg-muted/40 p-6 overflow-x-auto space-y-3 transition-colors">
                <pre className="text-xs font-mono text-foreground leading-relaxed">
                  {section.codeOrFlow}
                </pre>
                {section.diagramCaption && (
                  <p className="text-xs text-muted-foreground font-mono pt-2 border-t border-border">
                    {section.diagramCaption}
                  </p>
                )}
              </div>
            )}
          </section>
        ))}
      </div>
    </>
  );
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-10 space-y-12 pb-28">
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span>Back to Blog</span>
        </Link>
      </div>

      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogContent params={params} />
      </Suspense>
    </article>
  );
}
