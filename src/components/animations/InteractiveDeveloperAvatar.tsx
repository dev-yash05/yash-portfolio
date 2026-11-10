"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function InteractiveDeveloperAvatar({ size = 80 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const pupilsRef = useRef<SVGGElement>(null);
  const [blinking, setBlinking] = useState(false);

  // Natural spontaneous blinking loop
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const triggerBlink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 140);
      timeout = setTimeout(triggerBlink, Math.random() * 4000 + 2500);
    };
    timeout = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useGSAP(() => {
    const container = containerRef.current;
    const head = headRef.current;
    const pupils = pupilsRef.current;
    if (!container || !head || !pupils) return;

    // Head rotation + translation (subtle 3D angle)
    const setHeadRotX = gsap.quickTo(head, "rotateX", { duration: 0.4, ease: "power2.out" });
    const setHeadRotY = gsap.quickTo(head, "rotateY", { duration: 0.4, ease: "power2.out" });
    const setHeadX = gsap.quickTo(head, "x", { duration: 0.4, ease: "power2.out" });
    const setHeadY = gsap.quickTo(head, "y", { duration: 0.4, ease: "power2.out" });

    // Pupil look-at tracking (travels further within eye socket)
    const setPupilX = gsap.quickTo(pupils, "x", { duration: 0.15, ease: "power2.out" });
    const setPupilY = gsap.quickTo(pupils, "y", { duration: 0.15, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // Distance & normalized vectors
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(Math.hypot(dx, dy), 500) / 500;

      // Pupil travel radius inside the eye socket (max 3.5px)
      const pupilRadius = 3.5 * dist;
      const pX = Math.cos(angle) * pupilRadius;
      const pY = Math.sin(angle) * pupilRadius;

      // Head 3D turn angles (max 14 degrees)
      const normX = Math.max(-1, Math.min(1, dx / (window.innerWidth / 2)));
      const normY = Math.max(-1, Math.min(1, dy / (window.innerHeight / 2)));

      setPupilX(pX);
      setPupilY(pY);
      setHeadRotY(normX * 14);
      setHeadRotX(-normY * 12);
      setHeadX(normX * 3);
      setHeadY(normY * 3);
    };

    const handleMouseLeave = () => {
      setPupilX(0);
      setPupilY(0);
      setHeadRotX(0);
      setHeadRotY(0);
      setHeadX(0);
      setHeadY(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size, perspective: 500 }}
      className="relative select-none shrink-0"
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl border border-zinc-800 bg-[#161618] p-1 shadow-lg">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full overflow-visible"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* BACKGROUND HEADPHONES (STATIC BASE) */}
          <path
            d="M 22 55 A 28 28 0 0 1 78 55"
            fill="none"
            stroke="#27272a"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* DYNAMIC HEAD GROUP (TURNS TOWARD CURSOR) */}
          <g ref={headRef} className="origin-center will-change-transform">
            {/* Neck & Shirt */}
            <path d="M 40 76 L 60 76 L 64 96 L 36 96 Z" fill="#d97706" />
            <path d="M 43 72 L 57 72 L 58 82 L 42 82 Z" fill="#ca8a04" opacity="0.3" />

            {/* Face Base */}
            <rect x="30" y="32" width="40" height="42" rx="14" fill="#e0a96d" />

            {/* Hair */}
            <path
              d="M 28 36 C 28 22, 72 22, 72 36 C 72 28, 56 26, 44 28 C 36 30, 30 32, 28 36 Z"
              fill="#18181b"
            />
            {/* Front Bangs */}
            <path d="M 32 30 Q 42 36 50 30 Q 60 36 68 31 L 68 25 L 32 25 Z" fill="#18181b" />

            {/* Eyebrows */}
            <rect x="35" y="44" width="9" height="2" rx="1" fill="#18181b" />
            <rect x="56" y="44" width="9" height="2" rx="1" fill="#18181b" />

            {/* EYES LAYER */}
            {blinking ? (
              // Closed eyelid lines during blink
              <g stroke="#18181b" strokeWidth="2" strokeLinecap="round">
                <line x1="36" y1="51" x2="44" y2="51" />
                <line x1="56" y1="51" x2="64" y2="51" />
              </g>
            ) : (
              // Open Eye Sclera (White background)
              <g>
                <ellipse cx="40" cy="50" rx="5" ry="4" fill="#ffffff" />
                <ellipse cx="60" cy="50" rx="5" ry="4" fill="#ffffff" />

                {/* PUPILS (MOVE FREELY TO TRACK MOUSE) */}
                <g ref={pupilsRef} className="will-change-transform">
                  <circle cx="40" cy="50" r="2.2" fill="#09090b" />
                  <circle cx="60" cy="50" r="2.2" fill="#09090b" />
                  {/* Catchlights (Eye highlights) */}
                  <circle cx="39.2" cy="49.2" r="0.7" fill="#ffffff" />
                  <circle cx="59.2" cy="49.2" r="0.7" fill="#ffffff" />
                </g>
              </g>
            )}

            {/* Nose & Mouth */}
            <circle cx="50" cy="57" r="1.4" fill="#c48a52" />
            {/* Subtle Developer Mustache & Smile */}
            <path d="M 44 62 Q 50 60 56 62" stroke="#27272a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 46 66 Q 50 68 54 66" stroke="#8c582f" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* Headphone Earcups (Layered over ears) */}
            <rect x="22" y="42" width="7" height="18" rx="3.5" fill="#3f3f46" stroke="#18181b" strokeWidth="1.5" />
            <rect x="71" y="42" width="7" height="18" rx="3.5" fill="#3f3f46" stroke="#18181b" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}