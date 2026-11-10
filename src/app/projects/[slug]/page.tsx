import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";
import {
  PROJECTS_DATA,
  TECH_ICONS,
  getProjectBySlug,
} from "@/lib/projects-data";
import { ReadingProgressPill } from "@/components/ui/ReadingProgressPill";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
}

const CASE_STUDY_SECTIONS = [
  { id: "overview", label: "Overview & Context" },
  { id: "architecture", label: "System Architecture" },
  { id: "decisions", label: "Technical Trade-offs" },
  { id: "outcomes", label: "Metrics & Retrospective" },
];

function ProjectCaseStudySkeleton() {
  return (
    <div className="space-y-14 animate-pulse">
      <div className="rounded-xl border border-border bg-card p-8 text-center space-y-4">
        <div className="mx-auto h-6 w-36 rounded-full bg-muted/60" />
        <div className="mx-auto h-10 w-64 rounded-md bg-muted/80" />
        <div className="mx-auto h-4 w-96 max-w-full rounded bg-muted/60" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-6">
          <div className="h-8 w-24 rounded bg-muted/60" />
          <div className="h-8 w-28 rounded bg-muted/60" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-20 rounded-md bg-muted/60" />
          <div className="h-8 w-24 rounded-md bg-muted/60" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-32 rounded-xl border border-border bg-card p-5" />
        <div className="h-32 rounded-xl border border-border bg-card p-5" />
      </div>
    </div>
  );
}

async function ProjectContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ReadingProgressPill sections={CASE_STUDY_SECTIONS} />

      {/* HERO BANNER CARD & SERIF HEADER */}
      <header id="overview" className="space-y-6 scroll-mt-24">
        <div className="rounded-xl border border-border bg-card p-8 text-center space-y-3 transition-colors shadow-sm">
          <span className="inline-block rounded-full border border-border bg-muted/60 px-3 py-1 text-[11px] font-medium text-muted-foreground">
            {project.category} • {project.year}
          </span>
          <h1
            className={`${playfair.className} text-3xl sm:text-4xl text-foreground font-bold tracking-tight leading-tight`}
          >
            {project.name}
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* METADATA BAR & LINKS */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6 text-xs text-muted-foreground transition-colors">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <span className="text-muted-foreground/70 block">Role</span>
              <span className="text-foreground font-medium">
                {project.overview.role}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground/70 block">Timeline</span>
              <span className="text-foreground font-medium">
                {project.overview.timeline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-3 py-1.5 text-foreground hover:bg-muted hover:border-foreground/30 transition-colors"
              >
                <GitHubLogoIcon className="h-3.5 w-3.5" /> Source
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 font-medium text-background hover:bg-foreground/90 transition-colors"
              >
                <ExternalLinkIcon className="h-3.5 w-3.5" /> Live Demo
              </a>
            )}
          </div>
        </div>

        {/* TECH STACK ROW */}
        <div className="flex flex-wrap items-center gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs text-foreground font-medium"
            >
              {TECH_ICONS[tech] && (
                <img
                  src={TECH_ICONS[tech]}
                  alt={tech}
                  className="h-3.5 w-3.5"
                />
              )}
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* PROBLEM & SOLUTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-5 space-y-2 transition-colors">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            The Problem
          </h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {project.overview.problem}
          </p>
        </div>
        <div className="rounded-xl border border-accent/40 bg-accent-bg/40 p-5 space-y-2 transition-colors">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">
            The Engineered Solution
          </h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {project.overview.solution}
          </p>
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE */}
      <section id="architecture" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <h2
            className={`${playfair.className} text-2xl text-foreground font-bold tracking-tight`}
          >
            System Architecture & Data Flow
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.architecture.summary}
          </p>
        </div>

        {/* SCHEMATIC DIAGRAM BLOCK */}
        <div className="rounded-xl border border-border bg-muted/30 p-5 overflow-x-auto transition-colors">
          <div className="text-[11px] font-mono text-muted-foreground mb-3 uppercase tracking-wider">
            Request & Event Pipeline Schematic
          </div>
          <pre className="text-xs font-mono text-foreground leading-relaxed">
            {project.architecture.asciiFlow}
          </pre>
        </div>

        {/* ARCHITECTURAL NODES BREAKDOWN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.architecture.nodes.map((node) => (
            <div
              key={node.layer}
              className="rounded-lg border border-border bg-card p-4 space-y-1.5 transition-colors"
            >
              <span className="text-[11px] font-mono uppercase text-muted-foreground">
                {node.layer}
              </span>
              <h3 className="text-sm font-semibold text-foreground">
                {node.component}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {node.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNICAL DECISIONS & TRADE-OFFS */}
      <section id="decisions" className="space-y-6 scroll-mt-24">
        <h2
          className={`${playfair.className} text-2xl text-foreground font-bold tracking-tight`}
        >
          Key Engineering Decisions & Trade-offs
        </h2>
        <div className="space-y-4">
          {project.decisions.map((decision, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5 space-y-3 transition-colors"
            >
              <h3 className="text-base font-semibold text-foreground">
                {decision.title}
              </h3>
              <p className="text-sm text-foreground/90 leading-relaxed">
                <strong className="text-foreground font-semibold">
                  Rationale:{" "}
                </strong>
                {decision.rationale}
              </p>
              <p className="text-xs text-muted-foreground border-l-2 border-border pl-3 py-0.5">
                <strong className="text-foreground font-medium">
                  Trade-off:{" "}
                </strong>
                {decision.tradeoff}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OUTCOMES & RETROSPECTIVE */}
      <section id="outcomes" className="space-y-8 scroll-mt-24">
        <div className="space-y-4">
          <h2
            className={`${playfair.className} text-2xl text-foreground font-bold tracking-tight`}
          >
            Production Outcomes & Metrics
          </h2>
          <ul className="space-y-2.5">
            {project.metricsAndOutcomes.map((metric, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-foreground/90"
              >
                <CheckCircledIcon className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>{metric}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 space-y-4 transition-colors">
          <h3 className="text-sm font-semibold text-foreground">
            Engineering Retrospective & What&apos;s Next
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.retrospective.lessonsLearned}
          </p>
          <div className="space-y-2 pt-2 border-t border-border">
            <span className="text-xs font-medium text-foreground">
              Upcoming Roadmap:
            </span>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
              {project.retrospective.futureRoadmap.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-10 space-y-14 pb-28">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span>Back to Projects</span>
        </Link>
      </div>

      <Suspense fallback={<ProjectCaseStudySkeleton />}>
        <ProjectContent params={params} />
      </Suspense>
    </article>
  );
}
