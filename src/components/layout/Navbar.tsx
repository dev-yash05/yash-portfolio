"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { 
  SunIcon, 
  MoonIcon,
  HomeIcon, 
  LayersIcon, 
  ReaderIcon, 
  FileTextIcon 
} from "@radix-ui/react-icons";
import { CommandPalette } from "@/components/ui/CommandPalette";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/projects", label: "Projects", icon: LayersIcon },
  { href: "/blog", label: "Blog", icon: ReaderIcon },
  { href: "/resume", label: "Resume", icon: FileTextIcon },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch with next-themes
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 mx-auto w-full max-w-3xl px-4 sm:px-6 py-4 flex items-center justify-between bg-white/80 dark:bg-[#0d0d0d]/80 backdrop-blur-md transition-colors duration-300">
      <nav className="flex items-center gap-3 sm:gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => (
          <Link 
            key={href} 
            href={href} 
            aria-label={label} 
            className="flex items-center gap-1.5 p-1.5 sm:p-0 rounded-md hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <Icon className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline">{label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <CommandPalette />
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-1.5 sm:p-0 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" 
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? (
            <SunIcon className="w-4 h-4" />
          ) : (
            <MoonIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
}