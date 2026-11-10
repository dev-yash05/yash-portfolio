"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { 
  HomeIcon, 
  FileTextIcon, 
  ReaderIcon, 
  MagnifyingGlassIcon,
  LayersIcon
} from "@radix-ui/react-icons";
import { PROJECTS_DATA } from "@/lib/projects-data";
import { BLOG_POSTS } from "@/lib/blog-data";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Toggle command menu with Ctrl+K or Cmd+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      // Close on Escape
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      {/* Navbar Search Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
      >
        <MagnifyingGlassIcon className="w-3.5 h-3.5" />
        <span>Ctrl K</span>
      </button>

      {/* Command Dialog Overlay */}
      {open && (
        <div 
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-in fade-in duration-200"
        >
          <div 
            className="w-full max-w-lg rounded-xl border border-zinc-800 bg-[#121212] shadow-2xl overflow-hidden text-zinc-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="w-full bg-transparent">
              <div className="flex items-center border-b border-zinc-800 px-4 py-3">
                <MagnifyingGlassIcon className="w-4 h-4 text-zinc-500 mr-3 shrink-0" />
                <Command.Input 
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                  autoFocus
                />
              </div>

              <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1">
                <Command.Empty className="py-6 text-center text-xs text-zinc-500">
                  No results found.
                </Command.Empty>

                {/* NAVIGATION GROUP */}
                <Command.Group heading={<div className="px-3 py-1 text-[10px] font-mono uppercase text-zinc-500">Navigation</div>}>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/"))}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-zinc-300 aria-selected:bg-zinc-800 aria-selected:text-zinc-100 cursor-pointer transition-colors"
                  >
                    <HomeIcon className="w-4 h-4 text-zinc-400" />
                    <span>Home</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/projects"))}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-zinc-300 aria-selected:bg-zinc-800 aria-selected:text-zinc-100 cursor-pointer transition-colors"
                  >
                    <LayersIcon className="w-4 h-4 text-zinc-400" />
                    <span>Projects</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/blog"))}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-zinc-300 aria-selected:bg-zinc-800 aria-selected:text-zinc-100 cursor-pointer transition-colors"
                  >
                    <ReaderIcon className="w-4 h-4 text-zinc-400" />
                    <span>Blog</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/resume"))}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-zinc-300 aria-selected:bg-zinc-800 aria-selected:text-zinc-100 cursor-pointer transition-colors"
                  >
                    <FileTextIcon className="w-4 h-4 text-zinc-400" />
                    <span>Resume</span>
                  </Command.Item>
                </Command.Group>

                {/* PROJECTS GROUP */}
                <Command.Group heading={<div className="px-3 py-1 text-[10px] font-mono uppercase text-zinc-500 mt-2">Projects</div>}>
                  {PROJECTS_DATA.map((proj) => (
                    <Command.Item
                      key={proj.slug}
                      value={`${proj.name} ${proj.category}`}
                      onSelect={() => runCommand(() => router.push(`/projects/${proj.slug}`))}
                      className="flex items-center justify-between px-3 py-2 text-xs rounded-lg text-zinc-300 aria-selected:bg-zinc-800 aria-selected:text-zinc-100 cursor-pointer transition-colors"
                    >
                      <span className="font-medium">{proj.name}</span>
                      <span className="text-[10px] text-zinc-500">{proj.category}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* BLOG POSTS GROUP */}
                <Command.Group heading={<div className="px-3 py-1 text-[10px] font-mono uppercase text-zinc-500 mt-2">Blog Posts</div>}>
                  {BLOG_POSTS.map((post) => (
                    <Command.Item
                      key={post.slug}
                      value={post.title}
                      onSelect={() => runCommand(() => router.push(`/blog/${post.slug}`))}
                      className="flex flex-col gap-0.5 px-3 py-2 text-xs rounded-lg text-zinc-300 aria-selected:bg-zinc-800 aria-selected:text-zinc-100 cursor-pointer transition-colors"
                    >
                      <span className="font-medium text-zinc-200">{post.title}</span>
                      <span className="text-[10px] text-zinc-500">{post.publishedAt}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>

              <div className="border-t border-zinc-800 px-4 py-2.5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span>Use arrow keys to navigate</span>
                <span>ESC to close</span>
              </div>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}