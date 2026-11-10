"use client";

import { useEffect, useState } from "react";

interface SectionItem {
  id: string;
  label: string;
}

export function ReadingProgressPill({ sections }: { sections: SectionItem[] }) {
  const [progress, setProgress] = useState(0);
  const [activeLabel, setActiveLabel] = useState(
    sections[0]?.label ?? "Overview",
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        docHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
          : 0;
      setProgress(pct);

      // Determine active section heading
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= 180) {
          setActiveLabel(sections[i].label);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const radius = 9;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
      <div className="flex items-center gap-3 rounded-full border border-border bg-card/90 px-4 py-2 text-xs sm:text-sm text-foreground shadow-2xl backdrop-blur-md transition-colors">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        <span className="max-w-45 truncate font-medium text-foreground">
          {activeLabel}
        </span>

        {/* SVG Circular Progress Indicator */}
        <svg className="h-4 w-4 -rotate-90 shrink-0" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-border"
          />
          <circle
            cx="12"
            cy="12"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-accent transition-all duration-150"
          />
        </svg>
      </div>
    </div>
  );
}
