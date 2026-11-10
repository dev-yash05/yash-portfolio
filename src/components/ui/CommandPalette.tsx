"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  HomeIcon,
  FileTextIcon,
  ReaderIcon,
  MagnifyingGlassIcon,
  LayersIcon,
} from "@radix-ui/react-icons";
import { PROJECTS_DATA } from "@/lib/projects-data";
import { BLOG_POSTS } from "@/lib/blog-data";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Lock background scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      {/* Navbar Search Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-muted/50 px-2.5 text-xs text-muted-foreground hover:bg-muted hover:border-foreground/20 hover:text-foreground transition-all duration-150 select-none"
      >
        <MagnifyingGlassIcon className="h-3.5 w-3.5 shrink-0" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">Ctrl + </span>K
        </kbd>
      </button>

      {/* Portaled directly into document.body to break free from header blur constraints */}
      {open &&
        mounted &&
        createPortal(
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
          >
            {/* Centered Modal Card */}
            <div
              className="w-full max-w-lg rounded-xl border border-border bg-card shadow-2xl overflow-hidden text-card-foreground transition-all animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <Command className="w-full bg-transparent border-none outline-none">
                {/* Search Input Bar */}
                <div className="flex items-center border-b border-border px-4 py-3">
                  <MagnifyingGlassIcon className="w-4 h-4 text-muted-foreground mr-3 shrink-0" />
                  <Command.Input
                    placeholder="Type a command or search..."
                    className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none border-none outline-none"
                    autoFocus
                  />
                </div>

                {/* Items List */}
                <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1 [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]">
                  <Command.Empty className="py-6 text-center text-xs text-muted-foreground">
                    No results found.
                  </Command.Empty>

                  {/* NAVIGATION GROUP */}
                  <Command.Group
                    heading={
                      <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        Navigation
                      </div>
                    }
                  >
                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/"))}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-foreground/80 aria-selected:bg-muted aria-selected:text-foreground cursor-pointer transition-colors"
                    >
                      <HomeIcon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>Home</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() =>
                        runCommand(() => router.push("/projects"))
                      }
                      className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-foreground/80 aria-selected:bg-muted aria-selected:text-foreground cursor-pointer transition-colors"
                    >
                      <LayersIcon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>Projects</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/blog"))}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-foreground/80 aria-selected:bg-muted aria-selected:text-foreground cursor-pointer transition-colors"
                    >
                      <ReaderIcon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>Blog</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/resume"))}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-foreground/80 aria-selected:bg-muted aria-selected:text-foreground cursor-pointer transition-colors"
                    >
                      <FileTextIcon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>Resume</span>
                    </Command.Item>
                  </Command.Group>

                  {/* PROJECTS GROUP */}
                  <Command.Group
                    heading={
                      <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-2">
                        Projects
                      </div>
                    }
                  >
                    {PROJECTS_DATA.map((proj) => (
                      <Command.Item
                        key={proj.slug}
                        value={`${proj.name} ${proj.category}`}
                        onSelect={() =>
                          runCommand(() =>
                            router.push(`/projects/${proj.slug}`),
                          )
                        }
                        className="flex items-center justify-between px-3 py-2 text-xs rounded-lg text-foreground/80 aria-selected:bg-muted aria-selected:text-foreground cursor-pointer transition-colors"
                      >
                        <span className="font-medium">{proj.name}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {proj.category}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  {/* BLOG POSTS GROUP */}
                  <Command.Group
                    heading={
                      <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-2">
                        Blog Posts
                      </div>
                    }
                  >
                    {BLOG_POSTS.map((post) => (
                      <Command.Item
                        key={post.slug}
                        value={post.title}
                        onSelect={() =>
                          runCommand(() => router.push(`/blog/${post.slug}`))
                        }
                        className="flex flex-col gap-0.5 px-3 py-2 text-xs rounded-lg text-foreground/80 aria-selected:bg-muted aria-selected:text-foreground cursor-pointer transition-colors"
                      >
                        <span className="font-medium text-foreground">
                          {post.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {post.publishedAt}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>

                {/* Footer Tip Bar */}
                <div className="border-t border-border px-4 py-2.5 flex items-center justify-between text-[11px] text-muted-foreground font-mono transition-colors">
                  <span>Use arrow keys to navigate</span>
                  <span>ESC to close</span>
                </div>
              </Command>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
