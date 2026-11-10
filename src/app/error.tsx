"use client";

import { useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-6 py-24 select-none">
      {/* Main 500 Indicator */}
      <div className="flex items-center gap-5 sm:gap-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-red-500 dark:text-red-400">
          500
        </h1>
        <div className="h-8 w-px bg-border transition-colors" />
        <p className="text-xs sm:text-sm text-muted-foreground font-mono tracking-wide transition-colors">
          Something went wrong on our end.
        </p>
      </div>

      {/* Reset Action Button */}
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 flex items-center gap-2 rounded-lg border border-border bg-muted/60 px-3.5 py-1.5 text-xs text-foreground transition-all hover:bg-muted hover:border-foreground/20 cursor-pointer"
      >
        <ReloadIcon className="h-3.5 w-3.5 text-muted-foreground" />
        <span>Try again</span>
      </button>
    </div>
  );
}
