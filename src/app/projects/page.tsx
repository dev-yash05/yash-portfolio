"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";
import { PROJECTS_DATA, TECH_ICONS } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Full Stack", "Backend", "Frontend"] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(
    PROJECTS_DATA[0].slug,
  );

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-10">
      {/* PAGE HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground tracking-tight transition-colors">
          Projects
        </h1>
        <p className="text-sm text-muted-foreground transition-colors">
          Production systems, architectural case studies, and full-stack
          applications.
        </p>
      </header>

      {/* CATEGORY FILTER PILLS */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((category) => {
          const count =
            category === "All"
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
                  ? "bg-foreground text-background border-foreground font-semibold"
                  : "bg-muted/50 text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground",
              )}
            >
              <span>{category}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.2 text-[10px]",
                  isActive
                    ? "bg-background text-foreground"
                    : "bg-muted text-muted-foreground",
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
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/30 shadow-sm"
            >
              {/* TOP SUMMARY BAR */}
              <div
                onClick={() => setOpenSlug(isOpen ? null : project.slug)}
                className="flex flex-col sm:flex-row sm:items-start justify-between cursor-pointer select-none gap-2"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                      {project.name}
                    </h2>
                    {project.status && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-bg px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/30 transition-colors">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                        {project.status}
                      </span>
                    )}
                    <button
                      type="button"
                      aria-label="Toggle project details"
                      className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronDownIcon
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 transition-colors">
                    {project.tagline}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between text-xs text-muted-foreground shrink-0 mt-1 sm:mt-0 transition-colors">
                  <span className="text-foreground font-mono font-medium">
                    {project.year}
                  </span>
                  <span className="mt-0.5 text-muted-foreground/80">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {isOpen && (
                <div className="mt-5 pt-5 border-t border-border space-y-5">
                  {/* TECH BADGES WITH HOVER EXPAND */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-foreground">
                      Technologies & Tools
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {project.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="group/badge inline-flex items-center h-8 px-2.5 rounded-lg border border-border bg-muted/40 hover:bg-muted hover:border-accent/40 transition-all cursor-default"
                        >
                          {TECH_ICONS[tech] && (
                            <img
                              src={TECH_ICONS[tech]}
                              alt={tech}
                              className="h-4 w-4 shrink-0"
                            />
                          )}
                          <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium text-foreground group-hover/badge:max-w-30 group-hover/badge:ml-2 transition-all duration-300 ease-out">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KEY HIGHLIGHTS */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-foreground">
                      Architecture & Engineering Highlights
                    </h3>
                    <ul className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                      {project.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* FOOTER CTA ROW */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-foreground flex items-center gap-1.5 transition-colors"
                        >
                          <GitHubLogoIcon className="h-3.5 w-3.5" /> Source Code
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-foreground flex items-center gap-1.5 transition-colors"
                        >
                          <ExternalLinkIcon className="h-3.5 w-3.5" /> Live
                          Deployment
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:bg-foreground/90 transition-colors"
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
