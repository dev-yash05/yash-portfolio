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

  useGSAP(
    () => {
      const container = containerRef.current;
      const imageWrapper = imageWrapperRef.current;
      const highlight = highlightRef.current;

      if (!container || !imageWrapper) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Distance from cursor to avatar center
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Normalize offsets based on window dimensions
        const normX = Math.max(
          -1,
          Math.min(1, deltaX / (window.innerWidth / 2)),
        );
        const normY = Math.max(
          -1,
          Math.min(1, deltaY / (window.innerHeight / 2)),
        );

        // Looking angles (clamped to realistic head rotation)
        const maxTilt = 18; // degrees
        const maxShift = 5; // px parallax translation

        // Smooth tween using explicit 0-reset compatible GSAP transforms
        gsap.to(imageWrapper, {
          rotateY: normX * maxTilt,
          rotateX: -normY * maxTilt,
          x: normX * maxShift,
          y: normY * maxShift,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (highlight) {
          gsap.to(highlight, {
            x: normX * 12,
            y: normY * 12,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const handleMouseLeaveWindow = () => {
        // Pattern 1: Explicit 0 reset directly into neutral position
        gsap.to(imageWrapper, {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (highlight) {
          gsap.to(highlight, {
            x: 0,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeaveWindow);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      };
    },
    { scope: containerRef },
  );

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

        {/* Dynamic ambient highlight */}
        <div
          ref={highlightRef}
          className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-white/15 opacity-60 rounded-xl will-change-transform"
        />
      </div>
    </div>
  );
}
