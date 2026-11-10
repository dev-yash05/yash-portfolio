import Link from "next/link";
import { ArrowLeftIcon, HomeIcon } from "@radix-ui/react-icons";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-6 py-24 select-none">
      {/* Subtle radial ambient glow using the accent variable */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-72 w-96 rounded-full bg-accent/10 blur-3xl transition-colors" 
      />

      {/* Main 404 Indicator */}
      <div className="relative flex items-center gap-5 sm:gap-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground transition-colors">
          404
        </h1>
        <div className="h-8 w-px bg-border transition-colors" />
        <p className="text-xs sm:text-sm text-muted-foreground font-mono tracking-wide transition-colors">
          This page could not be found.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="relative mt-8 flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg border border-border bg-muted/60 px-3.5 py-1.5 text-xs text-foreground transition-all hover:bg-muted hover:border-foreground/20"
        >
          <HomeIcon className="h-3.5 w-3.5 text-muted-foreground" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/projects"
          className="flex items-center gap-2 rounded-lg border border-border bg-transparent px-3.5 py-1.5 text-xs text-muted-foreground transition-all hover:border-foreground/20 hover:bg-muted/40 hover:text-foreground"
        >
          <span>View Projects</span>
          <ArrowLeftIcon className="h-3.5 w-3.5 rotate-180 text-muted-foreground" />
        </Link>
      </div>

      {/* Keyboard Shortcut Hint */}
      <p className="mt-6 text-[11px] font-mono text-muted-foreground transition-colors">
        Press <kbd className="rounded border border-border bg-muted/60 px-1 py-0.5 text-foreground font-medium">Ctrl</kbd> + <kbd className="rounded border border-border bg-muted/60 px-1 py-0.5 text-foreground font-medium">K</kbd> to search routes
      </p>
    </div>
  );
}