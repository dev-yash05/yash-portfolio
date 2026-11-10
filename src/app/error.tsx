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
      <div className="flex items-center gap-5 sm:gap-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-red-400">
          500
        </h1>
        <div className="h-8 w-px bg-zinc-800" />
        <p className="text-xs sm:text-sm text-zinc-400 font-mono tracking-wide">
          Something went wrong on our end.
        </p>
      </div>

      <button
        onClick={() => reset()}
        className="mt-8 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3.5 py-1.5 text-xs text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
      >
        <ReloadIcon className="h-3.5 w-3.5 text-zinc-400" />
        <span>Try again</span>
      </button>
    </div>
  );
}