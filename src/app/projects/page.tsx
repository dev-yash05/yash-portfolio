"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronDownIcon, 
  ExternalLinkIcon, 
  GitHubLogoIcon,
  ArrowRightIcon
} from "@radix-ui/react-icons";
import { PROJECTS_DATA, TECH_ICONS } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Full Stack", "Backend", "Frontend"] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(PROJECTS_DATA[0].slug);

  const filteredProjects = selectedCategory === "All"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-10">
      
      {/* PAGE HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Projects</h1>
        <p className="text-sm text-zinc-400">
          Production systems, architectural case studies, and full-stack applications.
        </p>
      </header>

      {/* CATEGORY FILTER PILLS (Matching your Blog reference style) */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((category) => {
          const count = category === "All" 
            ? PROJECTS_DATA.length 
            : PROJECTS_DATA.filter((p) => p.category === category).length;
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all border",
                isActive
                  ? "bg-zinc-100 text-zinc-900 border-zinc-100"
                  : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
              )}
            >
              <span>{category}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.2 text-[10px]",
                  isActive ? "bg-zinc-300 text-zinc-900" : "bg-zinc-800 text-zinc-400"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* PROJECTS LIST */}
      <div className="space-y-6 pt-2">
        {filteredProjects.map((project) => {
          const isOpen = openSlug === project.slug;

          return (
            <div
              key={project.slug}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5 transition-colors hover:border-zinc-700/80"
            >
              {/* TOP SUMMARY BAR */}
              <div
                onClick={() => setOpenSlug(isOpen ? null : project.slug)}
                className="flex flex-col sm:flex-row sm:items-start justify-between cursor-pointer select-none gap-2"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-base font-semibold text-zinc-100">
                      {project.name}
                    </h2>
                    {project.status && (
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {project.status}
                      </span>
                    )}
                    <button
                      type="button"
                      aria-label="Toggle project details"
                      className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400"
                    >
                      <ChevronDownIcon
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">{project.tagline}</p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between text-xs text-zinc-500 shrink-0">
                  <span className="text-zinc-300 font-medium">{project.year}</span>
                  <span className="mt-0.5">{project.category}</span>
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {isOpen && (
                <div className="mt-5 pt-5 border-t border-zinc-800/60 space-y-5">
                  
                  {/* TECH BADGES WITH HOVER EXPAND */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-zinc-300">
                      Technologies & Tools
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {project.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="group/badge inline-flex items-center h-8 px-2.5 rounded-lg border border-zinc-800 bg-zinc-900/90 hover:border-zinc-700 transition-all"
                        >
                          {TECH_ICONS[tech] && (
                            <img
                              src={TECH_ICONS[tech]}
                              alt={tech}
                              className="h-4 w-4 shrink-0"
                            />
                          )}
                          <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium text-zinc-200 group-hover/badge:max-w-[120px] group-hover/badge:ml-2 transition-all duration-300">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KEY HIGHLIGHTS */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-zinc-300">
                      Architecture & Engineering Highlights
                    </h3>
                    <ul className="space-y-1.5 text-sm text-zinc-400">
                      {project.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* FOOTER CTA ROW */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-800/40">
                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-zinc-100 flex items-center gap-1.5 transition-colors"
                        >
                          <GitHubLogoIcon className="h-3.5 w-3.5" /> Source Code
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-zinc-100 flex items-center gap-1.5 transition-colors"
                        >
                          <ExternalLinkIcon className="h-3.5 w-3.5" /> Live Deployment
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-900 hover:bg-white transition-colors"
                    >
                      <span>View Architecture & Case Study</span>
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}