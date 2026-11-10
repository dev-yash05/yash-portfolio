import { notFound } from "next/navigation";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import { BLOG_POSTS, getBlogBySlug } from "@/lib/blog-data";
import { ReadingProgressPill } from "@/components/ui/ReadingProgressPill";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
    <article className="mx-auto max-w-3xl px-6 py-10 space-y-12 pb-28">
      
      {/* FLOATING BOTTOM READING PROGRESS PILL */}
      <ReadingProgressPill sections={pillSections} />

      {/* BACK TO BLOG LINK */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span>Back to Blog</span>
        </Link>
      </div>

      {/* WHITE GRID-PATTERNED HERO CARD (Matches Reference Image 4) */}
      <div className="relative flex min-h-[260px] flex-col justify-between rounded-xl border border-zinc-200 bg-white p-8 text-zinc-900 shadow-xl bg-[linear-gradient(to_right,#efefef_1px,transparent_1px),linear-gradient(to_bottom,#efefef_1px,transparent_1px)] bg-[size:22px_22px]">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">
          {post.coverSubtitle}
        </div>

        <div className="my-auto py-6 text-center max-w-xl mx-auto space-y-3">
          <h2 className={`${playfair.className} text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight`}>
            {post.title}
          </h2>
        </div>

        <div className="flex items-center justify-between text-xs font-serif text-zinc-500">
          <span>yashn.me</span>
          <span>@yashnamdeo</span>
        </div>
      </div>

      {/* EDITORIAL SERIF TITLE & METADATA */}
      <header className="space-y-4 border-b border-zinc-800/60 pb-8">
        <h1 className={`${playfair.className} text-3xl sm:text-4xl text-zinc-100 leading-tight`}>
          {post.title}
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          {post.summary}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-zinc-500">
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
                className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400"
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
          <section key={section.id} id={section.id} className="space-y-5 scroll-mt-24">
            <h2 className={`${playfair.className} text-2xl text-zinc-100`}>
              {section.heading}
            </h2>

            {section.paragraphs.map((para, i) => (
              <p key={i} className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {para}
              </p>
            ))}

            {section.codeOrFlow && (
              <div className="my-6 rounded-xl border border-zinc-800 bg-[#111318] p-6 overflow-x-auto space-y-3">
                <pre className="text-xs font-mono text-zinc-200 leading-relaxed">
                  {section.codeOrFlow}
                </pre>
                {section.diagramCaption && (
                  <p className="text-xs text-zinc-500 font-mono pt-2 border-t border-zinc-800/60">
                    {section.diagramCaption}
                  </p>
                )}
              </div>
            )}
          </section>
        ))}
      </div>

    </article>
  );
}