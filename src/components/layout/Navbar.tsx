import Link from "next/link";
import { 
  SunIcon, 
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
  return (
    <header className="sticky top-0 z-40 mx-auto w-full max-w-3xl px-4 sm:px-6 py-4 flex items-center justify-between bg-[#0d0d0d]/80 backdrop-blur-md">
      <nav className="flex items-center gap-3 sm:gap-6 text-sm font-medium text-zinc-400">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-1.5 p-1.5 sm:p-0 rounded-md text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label={label}
          >
            {/* Mobile: Radix Icon */}
            <Icon className="w-4 h-4 sm:hidden" />
            {/* Desktop: Text Label */}
            <span className="hidden sm:inline">{label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <CommandPalette />
        <button 
          className="p-1.5 sm:p-0 text-zinc-400 hover:text-zinc-100 transition-colors" 
          aria-label="Toggle theme"
        >
          <SunIcon className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}