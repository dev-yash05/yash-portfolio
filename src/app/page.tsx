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
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-20 selection:bg-accent selection:text-accent-foreground">
      {/* HERO SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <InteractiveAvatar
            size={80}
            src="/images/avatar.png"
            alt="Yash Namdeo"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight transition-colors">
              Yash Namdeo
            </h1>
            <p className="text-sm text-muted-foreground mt-1 flex flex-wrap items-center gap-2 transition-colors">
              <span>Engineer</span>
              <span>•</span>
              <span>Full Stack Developer</span>
              <span>•</span>
              <a
                href="mailto:yashnamdeo754@gmail.com"
                className="hover:text-accent transition-colors inline-flex items-center gap-1 font-medium underline underline-offset-4 decoration-border hover:decoration-accent"
              >
                yashnamdeo754@gmail.com{" "}
                <ExternalLinkIcon className="w-3.5 h-3.5" />
              </a>
            </p>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-2xl text-sm transition-colors">
          System-first software engineer building production-grade web
          applications. Passionate about modular monolith architectures, robust
          security configurations, and meticulously crafted digital experiences.
        </p>

        {/* SOCIAL LINKS */}
        <div className="flex items-center gap-5 text-muted-foreground">
          <a
            href="https://github.com/dev-yash05"
            aria-label="GitHub Profile"
            className="hover:text-accent hover:scale-110 transition-all duration-150"
          >
            <GitHubLogoIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/yash-namdeo/"
            aria-label="LinkedIn Profile"
            className="hover:text-accent hover:scale-110 transition-all duration-150"
          >
            <LinkedInLogoIcon className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/yashx404"
            aria-label="Twitter Profile"
            className="hover:text-accent hover:scale-110 transition-all duration-150"
          >
            <TwitterLogoIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:yashnamdeo754@gmail.com"
            aria-label="Send Email"
            className="hover:text-accent hover:scale-110 transition-all duration-150"
          >
            <EnvelopeClosedIcon className="w-5 h-5" />
          </a>
          <a
            href="https://medium.com/@yashnamdeo754"
            aria-label="Medium Articles"
            className="hover:text-accent hover:scale-110 transition-all duration-150"
          >
            <Pencil2Icon className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-xl font-bold text-foreground tracking-tight transition-colors">
            Experience
          </h2>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
            01 / Work
          </span>
        </div>

        <div className="space-y-8">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-baseline justify-between group"
            >
              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2.5 text-base transition-colors">
                  {exp.company}
                  {exp.active && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/30 shadow-[0_0_12px_rgba(204,255,0,0.15)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
                      Working
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 transition-colors font-medium">
                  {exp.role}
                </p>
              </div>
              <div className="text-sm text-muted-foreground/80 font-mono text-left sm:text-right mt-2 sm:mt-0 transition-colors">
                <p>{exp.date}</p>
                <p className="text-xs">{exp.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE PROJECTS SECTION */}
      <ProjectsSection />

      {/* BLOG SECTION */}
      <BlogSection />
    </div>
  );
}
