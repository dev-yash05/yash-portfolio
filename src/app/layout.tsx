import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Configure your primary font
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
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#0d0d0d] text-zinc-300 antialiased selection:bg-zinc-800 flex flex-col`}>
        <Navbar />
        {/* main container flex-grow ensures the footer is pushed to the bottom if content is short */}
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}