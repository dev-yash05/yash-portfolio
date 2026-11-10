import Link from "next/link";
import { ArrowLeftIcon, HomeIcon } from "@radix-ui/react-icons";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-6 py-24 select-none">
      {/* Subtle radial ambient glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-72 w-96 rounded-full bg-zinc-800/20 blur-3xl" 
      />

      {/* Main 404 Indicator */}
      <div className="relative flex items-center gap-5 sm:gap-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
          404
        </h1>
        <div className="h-8 w-px bg-zinc-800" />
        <p className="text-xs sm:text-sm text-zinc-400 font-mono tracking-wide">
          This page could not be found.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="relative mt-8 flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3.5 py-1.5 text-xs text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
        >
          <HomeIcon className="h-3.5 w-3.5 text-zinc-400" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/projects"
          className="flex items-center gap-2 rounded-lg border border-zinc-800/80 bg-transparent px-3.5 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-200"
        >
          <span>View Projects</span>
          <ArrowLeftIcon className="h-3.5 w-3.5 rotate-180 text-zinc-500" />
        </Link>
      </div>

      {/* Keyboard Shortcut Hint */}
      <p className="mt-6 text-[11px] font-mono text-zinc-600">
        Press <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1 py-0.5 text-zinc-400">Ctrl</kbd> + <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1 py-0.5 text-zinc-400">K</kbd> to search routes
      </p>
    </div>
  );
}