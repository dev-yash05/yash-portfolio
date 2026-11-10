import Image from "next/image";
import { 
  GitHubLogoIcon, 
  LinkedInLogoIcon, 
  TwitterLogoIcon, 
  EnvelopeClosedIcon,
  ExternalLinkIcon
} from "@radix-ui/react-icons";
import { ProjectsSection } from "@/components/layout/ProjectsSection";
import { BlogSection } from "@/components/layout/BlogSection";

const EXPERIENCES = [
  {
    company: "Lanos IT Solutions",
    role: "Full Stack Java Developer Intern",
    date: "Feb 2026 – Present",
    location: "Sagar, India (On-Site)",
    active: true,
  }
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-20">
      
      {/* HERO SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-zinc-800">
            <Image 
              src="/avatar.png" 
              alt="Yash Namdeo"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Yash Namdeo</h1>
            <p className="text-sm text-zinc-400 mt-1 flex items-center gap-2">
              Engineer • Full Stack Developer • 
              <a href="mailto:hi@yashn.me" className="hover:text-zinc-100 transition-colors flex items-center gap-1">
                hi@yashn.me <ExternalLinkIcon className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
        
        <p className="text-zinc-400 leading-relaxed max-w-2xl text-sm">
          System-first software engineer building production-grade web applications. Passionate about modular monolith architectures, robust security configurations, and meticulously crafted digital experiences.
        </p>

        <div className="flex items-center gap-4 text-zinc-400">
          <a href="https://github.com/yourusername" className="hover:text-zinc-100 transition-colors"><GitHubLogoIcon className="w-5 h-5" /></a>
          <a href="https://linkedin.com/in/yourusername" className="hover:text-zinc-100 transition-colors"><LinkedInLogoIcon className="w-5 h-5" /></a>
          <a href="https://twitter.com/yourusername" className="hover:text-zinc-100 transition-colors"><TwitterLogoIcon className="w-5 h-5" /></a>
          <a href="mailto:hi@yashn.me" className="hover:text-zinc-100 transition-colors"><EnvelopeClosedIcon className="w-5 h-5" /></a>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Experience</h2>
        <div className="space-y-8">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-baseline justify-between group">
              <div>
                <h3 className="font-medium text-zinc-100 flex items-center gap-2 text-base">
                  {exp.company}
                  {exp.active && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Working
                    </span>
                  )}
                </h3>
                <p className="text-sm text-zinc-400 mt-1">{exp.role}</p>
              </div>
              <div className="text-sm text-zinc-500 text-left sm:text-right mt-2 sm:mt-0">
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