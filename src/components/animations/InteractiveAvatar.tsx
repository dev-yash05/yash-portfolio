"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface InteractiveAvatarProps {
  src: string;
  alt: string;
  size?: number; // width/height in px
}

export function InteractiveAvatar({
  src,
  alt,
  size = 80,
}: InteractiveAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;
    const highlight = highlightRef.current;

    if (!container || !imageWrapper) return;

    // Quick setters for optimal 60fps / 120fps mouse tracking without GC overhead
    const setRotateX = gsap.quickTo(imageWrapper, "rotateX", {
      duration: 0.45,
      ease: "power2.out",
    });
    const setRotateY = gsap.quickTo(imageWrapper, "rotateY", {
      duration: 0.45,
      ease: "power2.out",
    });
    const setTranslateX = gsap.quickTo(imageWrapper, "x", {
      duration: 0.45,
      ease: "power2.out",
    });
    const setTranslateY = gsap.quickTo(imageWrapper, "y", {
      duration: 0.45,
      ease: "power2.out",
    });
    const setHighlightX = highlight
      ? gsap.quickTo(highlight, "x", { duration: 0.3, ease: "power2.out" })
      : null;
    const setHighlightY = highlight
      ? gsap.quickTo(highlight, "y", { duration: 0.3, ease: "power2.out" })
      : null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from cursor to avatar center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Normalize offsets based on window dimensions
      const normX = Math.max(-1, Math.min(1, deltaX / (window.innerWidth / 2)));
      const normY = Math.max(-1, Math.min(1, deltaY / (window.innerHeight / 2)));

      // Looking angles (clamped to realistic head rotation)
      const maxTilt = 18; // degrees
      const maxShift = 5; // px parallax translation

      setRotateY(normX * maxTilt);
      setRotateX(-normY * maxTilt);
      setTranslateX(normX * maxShift);
      setTranslateY(normY * maxShift);

      if (setHighlightX && setHighlightY) {
        setHighlightX(normX * 12);
        setHighlightY(normY * 12);
      }
    };

    const handleMouseLeaveWindow = () => {
      // Smoothly snap back to dead-center when the user alt-tabs or cursor leaves
      setRotateX(0);
      setRotateY(0);
      setTranslateX(0);
      setTranslateY(0);
      if (setHighlightX && setHighlightY) {
        setHighlightX(0);
        setHighlightY(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size, perspective: 600 }}
      className="relative select-none shrink-0"
    >
      <div
        ref={imageWrapperRef}
        className="relative h-full w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-lg will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="object-cover scale-105 pointer-events-none"
          priority
        />

        {/* Ambient dynamic reflection that shifts opposite to head angle */}
        <div
          ref={highlightRef}
          className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-white/15 opacity-60 rounded-xl will-change-transform"
        />
      </div>
    </div>
  );
}