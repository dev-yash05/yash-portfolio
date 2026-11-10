"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const TECH_ICONS: Record<string, { icon: string }> = {
  "Next.js": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  },
  React: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  TypeScript: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  "Tailwind CSS": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  "Spring Boot": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  },
  PostgreSQL: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
  Redis: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  },
  RabbitMQ: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg",
  },
  Docker: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  },
  "Node.js": {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  MongoDB: {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
};

interface ProjectItem {
  name: string;
  tagline: string;
  status?: string;
  year: string;
  category: string;
  href: string;
  github?: string;
  live?: string;
  technologies: string[];
  highlights: string[];
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    name: "CareCircle",
    tagline: "Elder-Care Coordination & Alert Platform",
    status: "Active",
    year: "2026",
    category: "Full Stack Architecture",
    href: "/projects/carecircle",
    github: "https://github.com/dev-yash05/carecircle",
    live: "https://carecircle.yashn.me",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Docker",
    ],
    highlights: [
      "Architected a modular monolith backend in Spring Boot with PostgreSQL persistence and strict RBAC security.",
      "Implemented distributed rate limiting using Bucket4j backed by Redis to protect critical care-alert endpoints.",
      "Engineered reliable asynchronous event dispatching via the transactional outbox pattern with RabbitMQ.",
    ],
  },
  {
    name: "Lanos Web Platform",
    tagline: "Multi-Tenant Corporate, EdTech & R&D Portal",
    status: "Live",
    year: "2026",
    category: "Frontend & Motion Engineering",
    href: "/projects/lanos",
    live: "https://lanos-beta.vercel.app",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Built a multi-tenant web platform unifying EdTech, IT Solutions, and R&D portals under a cohesive design system.",
      "Crafted custom scroll-bound micro-animations and interactive timeline sequences using GSAP.",
      "Optimized Core Web Vitals and initial server render payloads utilizing Next.js 16 App Router and React Compiler.",
    ],
  },
  {
    name: "Samriddhi Travels",
    tagline: "Intercity Vehicle Rental & Lead Generation Engine",
    status: "Live",
    year: "2026",
    category: "Client Production App",
    href: "/projects/samriddhi-travels",
    live: "https://samriddhitravelsindore.vercel.app",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Designed and deployed a high-conversion vehicle booking platform with instant WhatsApp itinerary integration.",
      "Structured SEO-optimized dynamic route pages and transparent pricing tiers for intercity travel packages.",
    ],
  },
  {
    name: "Forever E-Commerce",
    tagline: "Full-Stack MERN & Spring Boot Commerce Engine",
    year: "2025",
    category: "Full Stack Web App",
    href: "/projects/forever",
    github: "https://github.com/dev-yash05/forever",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "Spring Boot",
      "PostgreSQL",
    ],
    highlights: [
      "Developed complete storefront, cart management, and admin inventory control workflows.",
      "Secured API routes with stateless JWT authentication, HttpOnly cookies, and role-based access control.",
    ],
  },
];

export function ProjectsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleProject = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-xl font-bold text-foreground tracking-tight transition-colors">
          Projects
        </h2>
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
          02 / Showcase
        </span>
      </div>

      <div className="space-y-6">
        {PROJECTS_DATA.map((project, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={project.name}
              className="border-b border-border pb-6 last:border-none transition-colors"
            >
              {/* HEADER ROW */}
              <div
                onClick={() => toggleProject(index)}
                className="flex flex-col sm:flex-row sm:items-start justify-between cursor-pointer group select-none gap-2"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-semibold text-foreground text-base group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>

                    {/* Status Pill */}
                    {project.status && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-bg px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/30 transition-colors">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                        {project.status}
                      </span>
                    )}

                    {/* Expand/Collapse Chevron Box */}
                    <button
                      type="button"
                      aria-label="Toggle project details"
                      className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-muted/60 text-muted-foreground group-hover:border-foreground/30 group-hover:text-foreground transition-all"
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

                {/* Right Side Metadata */}
                <div className="text-sm text-muted-foreground text-left sm:text-right mt-1 sm:mt-0 transition-colors">
                  <p className="font-mono text-foreground font-medium">
                    {project.year}
                  </p>
                  <p className="text-xs text-muted-foreground/80 mt-0.5">
                    {project.category}
                  </p>
                </div>
              </div>

              {/* EXPANDABLE BODY */}
              {isOpen && (
                <div className="mt-5 pt-5 border-t border-border space-y-5">
                  {/* TECHNOLOGIES & TOOLS */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-semibold text-foreground tracking-wide transition-colors">
                      Technologies & Tools
                    </h4>
                    <div className="flex flex-wrap items-center gap-2">
                      {project.technologies.map((tech) => {
                        const iconData = TECH_ICONS[tech];
                        return (
                          <div
                            key={tech}
                            className="group/badge inline-flex items-center h-8 px-2.5 rounded-lg border border-border bg-muted/40 hover:bg-muted hover:border-accent/40 transition-all duration-200 cursor-default"
                          >
                            {iconData && (
                              <img
                                src={iconData.icon}
                                alt={tech}
                                className="h-4 w-4 shrink-0"
                              />
                            )}
                            <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium text-foreground group-hover/badge:max-w-30 group-hover/badge:ml-2 transition-all duration-300 ease-out">
                              {tech}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* HIGHLIGHTS */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-semibold text-foreground tracking-wide transition-colors">
                      What I&apos;ve built
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed transition-colors">
                      {project.highlights.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ACTION LINKS */}
                  <div className="flex items-center gap-4 pt-1 text-xs font-medium text-muted-foreground">
                    <Link
                      href={project.href}
                      className="text-foreground hover:text-accent underline underline-offset-4 decoration-border hover:decoration-accent flex items-center gap-1 transition-colors"
                    >
                      Read Case Study →
                    </Link>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground flex items-center gap-1 transition-colors"
                      >
                        <GitHubLogoIcon className="h-3.5 w-3.5" /> Source
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground flex items-center gap-1 transition-colors"
                      >
                        <ExternalLinkIcon className="h-3.5 w-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-2">
        <Link
          href="/projects"
          className="inline-block rounded-md border border-border bg-muted/60 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:border-foreground/20 transition-all"
        >
          Show all projects
        </Link>
      </div>
    </section>
  );
}
