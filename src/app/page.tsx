import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
  ExternalLinkIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { ProjectsSection } from "@/components/layout/ProjectsSection";
import { BlogSection } from "@/components/layout/BlogSection";
import { InteractiveAvatar } from "@/components/animations/InteractiveAvatar";


const EXPERIENCES = [
  {
    company: "Lanos IT Solutions",
    role: "Full Stack Java Developer Intern",
    date: "Feb 2026 – Present",
    location: "Sagar, India (On-Site)",
    active: true,
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-20">
      
      {/* HERO SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <InteractiveAvatar size={80} src="/images/avatar.png" alt="Yash Namdeo" />
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight transition-colors">
              Yash Namdeo
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 flex items-center gap-2 transition-colors">
              Engineer • Full Stack Developer •
              <a
                href="mailto:yashnamdeo754@gmail.com"
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
              >
                yashnamdeo754@gmail.com <ExternalLinkIcon className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl text-sm transition-colors">
          System-first software engineer building production-grade web
          applications. Passionate about modular monolith architectures, robust
          security configurations, and meticulously crafted digital experiences.
        </p>

        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
          <a
            href="https://github.com/dev-yash05"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <GitHubLogoIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/yash-namdeo/"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <LinkedInLogoIcon className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/yashx404"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <TwitterLogoIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:yashnamdeo754@gmail.com"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <EnvelopeClosedIcon className="w-5 h-5" />
          </a>
          <a
            href="https://medium.com/@yashnamdeo754"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <Pencil2Icon className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight transition-colors">
          Experience
        </h2>
        <div className="space-y-8">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-baseline justify-between group"
            >
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2 text-base transition-colors">
                  {exp.company}
                  {exp.active && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Working
                    </span>
                  )}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 transition-colors">{exp.role}</p>
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-500 text-left sm:text-right mt-2 sm:mt-0 transition-colors">
                <p>{exp.date}</p>
                <p>{exp.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE PROJECTS SECTION */}
      <ProjectsSection />

      <BlogSection />
    </div>
  );
}