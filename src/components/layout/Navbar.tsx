import Link from "next/link";
import { SunIcon } from "@radix-ui/react-icons";
import { CommandPalette } from "@/components/ui/CommandPalette";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 mx-auto w-full max-w-3xl px-6 py-4 flex items-center justify-between bg-[#0d0d0d]/80 backdrop-blur-md">
      <nav className="flex items-center gap-6 text-sm font-medium text-zinc-400">
        <Link href="/" className="text-zinc-100 hover:text-zinc-100 transition-colors">Home</Link>
        <Link href="/projects" className="hover:text-zinc-100 transition-colors">Projects</Link>
        <Link href="/blog" className="hover:text-zinc-100 transition-colors">Blog</Link>
        <Link href="/resume" className="hover:text-zinc-100 transition-colors">Resume</Link>
      </nav>
      
      <div className="flex items-center gap-4">
        <CommandPalette />
        <button className="text-zinc-400 hover:text-zinc-100 transition-colors" aria-label="Toggle theme">
          <SunIcon className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}