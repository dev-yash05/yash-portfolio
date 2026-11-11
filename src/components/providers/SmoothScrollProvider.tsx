"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // 2. Synchronize Lenis scroll updates with GSAP ScrollTrigger
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);

      // 3. Drive Lenis's raf loop directly via GSAP's internal ticker
      const updateGsapTicker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateGsapTicker);
      gsap.ticker.lagSmoothing(0); // Prevents jumps when tab goes inactive/resumes

      return () => {
        gsap.ticker.remove(updateGsapTicker);
        lenis.destroy();
      };
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
