import Link from "next/link";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-3xl px-6 py-12 mt-12 border-t border-border text-sm text-muted-foreground transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* NAVIGATE COLUMN */}
        <div>
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-6 transition-colors">
            Navigate
          </h4>
          <div className="grid grid-cols-3 gap-y-4 gap-x-4">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link
              href="/projects"
              className="hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className="hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/resume"
              className="hover:text-foreground transition-colors"
            >
              Resume
            </Link>
            <Link
              href="/setup"
              className="hover:text-foreground transition-colors"
            >
              Setup
            </Link>
            <Link
              href="/rss"
              className="hover:text-foreground transition-colors"
            >
              RSS Feed
            </Link>
          </div>
        </div>

        {/* CONNECT COLUMN */}
        <div>
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-6 transition-colors">
            Connect
          </h4>
          <div className="flex gap-4">
            <a
              href="https://github.com/dev-yash05"
              aria-label="GitHub"
              className="flex items-center justify-center w-10 h-10 border border-border rounded-md bg-muted/30 hover:bg-muted hover:text-foreground transition-colors"
            >
              <GitHubLogoIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/yash-namdeo"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-10 h-10 border border-border rounded-md bg-muted/30 hover:bg-muted hover:text-foreground transition-colors"
            >
              <LinkedInLogoIcon className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/yashx404"
              aria-label="Twitter"
              className="flex items-center justify-center w-10 h-10 border border-border rounded-md bg-muted/30 hover:bg-muted hover:text-foreground transition-colors"
            >
              <TwitterLogoIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:yashnamdeo754@gmail.com"
              aria-label="Email"
              className="flex items-center justify-center w-10 h-10 border border-border rounded-md bg-muted/30 hover:bg-muted hover:text-foreground transition-colors"
            >
              <EnvelopeClosedIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-border transition-colors">
        <p>© 2026 Yash Namdeo. All rights reserved.</p>
      </div>
    </footer>
  );
}
