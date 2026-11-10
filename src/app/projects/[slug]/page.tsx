import { notFound } from "next/navigation";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { 
  ArrowLeftIcon, 
  ExternalLinkIcon, 
  GitHubLogoIcon,
  CheckCircledIcon
} from "@radix-ui/react-icons";
import { PROJECTS_DATA, TECH_ICONS, getProjectBySlug } from "@/lib/projects-data";
import { ReadingProgressPill } from "@/components/ui/ReadingProgressPill";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"] });

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

export default async function ProjectCaseStudyPage({
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
    <article className="mx-auto max-w-3xl px-6 py-10 space-y-14 pb-28">
      
      {/* FLOATING PROGRESS PILL */}
      <ReadingProgressPill sections={CASE_STUDY_SECTIONS} />

      {/* BACK LINK */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* HERO BANNER CARD & SERIF HEADER */}
      <header id="overview" className="space-y-6 scroll-mt-24">
        <div className="rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-8 text-center space-y-3">
          <span className="inline-block rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[11px] font-medium text-zinc-400">
            {project.category} • {project.year}
          </span>
          <h1 className={`${playfair.className} text-3xl sm:text-4xl text-zinc-100 tracking-tight`}>
            {project.name}
          </h1>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto">
            {project.tagline}
          </p>
        </div>

        {/* METADATA BAR & LINKS */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/70 pb-6 text-xs text-zinc-400">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <span className="text-zinc-500 block">Role</span>
              <span className="text-zinc-200 font-medium">{project.overview.role}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Timeline</span>
              <span className="text-zinc-200 font-medium">{project.overview.timeline}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-zinc-200 hover:bg-zinc-800 transition-colors"
              >
                <GitHubLogoIcon className="h-3.5 w-3.5" /> Source
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-3 py-1.5 font-medium text-zinc-900 hover:bg-white transition-colors"
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
              className="inline-flex items-center gap-2 rounded-md border border-zinc-800/90 bg-zinc-900/60 px-2.5 py-1 text-xs text-zinc-300"
            >
              {TECH_ICONS[tech] && (
                <img src={TECH_ICONS[tech]} alt={tech} className="h-3.5 w-3.5" />
              )}
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* PROBLEM & SOLUTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/20 p-5 space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            The Problem
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {project.overview.problem}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/20 p-5 space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            The Engineered Solution
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {project.overview.solution}
          </p>
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE */}
      <section id="architecture" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <h2 className={`${playfair.className} text-2xl text-zinc-100`}>
            System Architecture & Data Flow
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {project.architecture.summary}
          </p>
        </div>

        {/* SCHEMATIC DIAGRAM BLOCK */}
        <div className="rounded-xl border border-zinc-800 bg-[#111318] p-5 overflow-x-auto">
          <div className="text-[11px] font-mono text-zinc-500 mb-3 uppercase tracking-wider">
            Request & Event Pipeline Schematic
          </div>
          <pre className="text-xs font-mono text-zinc-200 leading-relaxed">
            {project.architecture.asciiFlow}
          </pre>
        </div>

        {/* ARCHITECTURAL NODES BREAKDOWN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.architecture.nodes.map((node) => (
            <div
              key={node.layer}
              className="rounded-lg border border-zinc-800/70 bg-zinc-900/30 p-4 space-y-1.5"
            >
              <span className="text-[11px] font-mono uppercase text-zinc-500">
                {node.layer}
              </span>
              <h3 className="text-sm font-semibold text-zinc-100">
                {node.component}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {node.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNICAL DECISIONS & TRADE-OFFS */}
      <section id="decisions" className="space-y-6 scroll-mt-24">
        <h2 className={`${playfair.className} text-2xl text-zinc-100`}>
          Key Engineering Decisions & Trade-offs
        </h2>
        <div className="space-y-4">
          {project.decisions.map((decision, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/25 p-5 space-y-3"
            >
              <h3 className="text-base font-semibold text-zinc-100">
                {decision.title}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-zinc-100 font-medium">Rationale: </strong>
                {decision.rationale}
              </p>
              <p className="text-xs text-zinc-400 border-l-2 border-zinc-700 pl-3 py-0.5">
                <strong className="text-zinc-300">Trade-off: </strong>
                {decision.tradeoff}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OUTCOMES & RETROSPECTIVE */}
      <section id="outcomes" className="space-y-8 scroll-mt-24">
        <div className="space-y-4">
          <h2 className={`${playfair.className} text-2xl text-zinc-100`}>
            Production Outcomes & Metrics
          </h2>
          <ul className="space-y-2.5">
            {project.metricsAndOutcomes.map((metric, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <CheckCircledIcon className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{metric}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-zinc-100">
            Engineering Retrospective & What&apos;s Next
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {project.retrospective.lessonsLearned}
          </p>
          <div className="space-y-2 pt-2 border-t border-zinc-800/60">
            <span className="text-xs font-medium text-zinc-300">Upcoming Roadmap:</span>
            <ul className="space-y-1 text-xs text-zinc-400 list-disc list-inside">
              {project.retrospective.futureRoadmap.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </article>
  );
}