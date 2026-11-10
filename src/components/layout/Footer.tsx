import Link from "next/link";
import { 
  GitHubLogoIcon, 
  LinkedInLogoIcon, 
  TwitterLogoIcon, 
  EnvelopeClosedIcon 
} from "@radix-ui/react-icons";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-3xl px-6 py-12 mt-12 border-t border-zinc-800/50 text-sm text-zinc-400">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        
        {/* NAVIGATE COLUMN */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-100 uppercase tracking-wider mb-6">Navigate</h4>
          <div className="grid grid-cols-3 gap-y-4 gap-x-4">
            <Link href="/" className="hover:text-zinc-100 transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-zinc-100 transition-colors">Projects</Link>
            <Link href="/blog" className="hover:text-zinc-100 transition-colors">Blog</Link>
            <Link href="/resume" className="hover:text-zinc-100 transition-colors">Resume</Link>
            <Link href="/setup" className="hover:text-zinc-100 transition-colors">Setup</Link>
            <Link href="/rss" className="hover:text-zinc-100 transition-colors">RSS Feed</Link>
          </div>
        </div>

        {/* CONNECT COLUMN */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-100 uppercase tracking-wider mb-6">Connect</h4>
          <div className="flex gap-4">
            <a href="https://github.com/yourusername" className="flex items-center justify-center w-10 h-10 border border-zinc-800 rounded-md hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
              <GitHubLogoIcon className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/yourusername" className="flex items-center justify-center w-10 h-10 border border-zinc-800 rounded-md hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
              <LinkedInLogoIcon className="w-4 h-4" />
            </a>
            <a href="https://twitter.com/yourusername" className="flex items-center justify-center w-10 h-10 border border-zinc-800 rounded-md hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
              <TwitterLogoIcon className="w-4 h-4" />
            </a>
            <a href="mailto:hi@yashn.me" className="flex items-center justify-center w-10 h-10 border border-zinc-800 rounded-md hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
              <EnvelopeClosedIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      <div className="pt-8 border-t border-zinc-800/50">
        <p>© 2026 Yash Namdeo. All rights reserved.</p>
      </div>
    </footer>
  );
}