import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-12">
      {/* PAGE HEADER */}
      <header className="space-y-2 border-b border-border pb-8 transition-colors">
        <h1 className="text-2xl font-bold text-foreground tracking-tight transition-colors">
          Resume
        </h1>
        <p className="text-sm text-muted-foreground transition-colors">
          View and download my professional resume.
        </p>
      </header>

      {/* PDF VIEWER CONTAINER */}
      <div className="relative w-full rounded-xl border border-border bg-card p-2 shadow-2xl transition-colors">
        {/* EXTERNAL LINK BUTTON */}
        <a
          href="https://drive.google.com/file/d/1dWvOV_fFBWGPgxacTBJcC10FsOoxtSnn/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-md bg-card/90 border border-border text-muted-foreground backdrop-blur-sm hover:bg-muted hover:text-foreground transition-all duration-150"
          aria-label="Open resume in new tab"
        >
          <ExternalLinkIcon className="h-5 w-5" />
        </a>

        {/* IFRAME EMBED */}
        <div className="h-200 w-full overflow-hidden rounded-lg border border-border bg-card">
          <iframe
            src="https://drive.google.com/file/d/1dWvOV_fFBWGPgxacTBJcC10FsOoxtSnn/preview"
            className="h-full w-full border-none bg-card"
            title="Yash Namdeo Resume"
            allow="autoplay"
          />
        </div>
      </div>
    </main>
  );
}
