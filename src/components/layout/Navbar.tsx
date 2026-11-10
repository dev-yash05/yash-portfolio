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
  FileTextIcon,
} from "@radix-ui/react-icons";
import { CommandPalette } from "@/components/ui/CommandPalette";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/projects", label: "Projects", icon: LayersIcon },
  { href: "/blog", label: "Blog", icon: ReaderIcon },
  { href: "/resume", label: "Resume", icon: FileTextIcon },
];

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 mx-auto w-full max-w-3xl px-4 sm:px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-transparent transition-colors duration-200">
      <nav className="flex items-center gap-3 sm:gap-6 text-sm font-medium text-muted-foreground">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className="flex items-center gap-1.5 p-1.5 sm:p-0 rounded-md hover:text-foreground transition-colors"
          >
            <Icon className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <CommandPalette />
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted/50 text-muted-foreground hover:bg-muted hover:border-foreground/20 hover:text-foreground transition-all duration-150"
          aria-label="Toggle theme"
        >
          {mounted && resolvedTheme === "dark" ? (
            <SunIcon className="w-4 h-4" />
          ) : (
            <MoonIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
}
