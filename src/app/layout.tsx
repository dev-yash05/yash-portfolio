import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yash Namdeo | Software Engineer",
  description: "Portfolio of Yash Namdeo, Full Stack Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-white text-zinc-900 dark:bg-[#0d0d0d] dark:text-zinc-300 antialiased selection:bg-zinc-200 dark:selection:bg-zinc-800 flex flex-col transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
        >
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
