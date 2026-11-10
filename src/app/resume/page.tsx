import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-12">
      
      {/* PAGE HEADER */}
      <header className="space-y-2 border-b border-zinc-800/50 pb-8">
        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Resume</h1>
        <p className="text-sm text-zinc-400">View and download my professional resume.</p>
      </header>

      {/* PDF VIEWER CONTAINER */}
      <div className="relative w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2 shadow-2xl">
        
        {/* EXTERNAL LINK BUTTON */}
        <a 
          href="https://drive.google.com/file/d/1dWvOV_fFBWGPgxacTBJcC10FsOoxtSnn/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-900/80 border border-zinc-700 text-zinc-300 backdrop-blur-sm hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
          aria-label="Open resume in new tab"
        >
          <ExternalLinkIcon className="h-5 w-5" />
        </a>

        {/* IFRAME EMBED */}
        <div className="h-200 w-full overflow-hidden rounded-lg bg-zinc-100">
          <iframe 
            src="https://drive.google.com/file/d/1dWvOV_fFBWGPgxacTBJcC10FsOoxtSnn/preview" 
            className="h-full w-full border-none bg-white"
            title="Yash Namdeo Resume"
            allow="autoplay"
          />
        </div>
        
      </div>
      
    </main>
  );
}