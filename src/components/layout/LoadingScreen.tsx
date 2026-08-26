"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait a brief moment to allow assets to mount, then fade out
    const timer = setTimeout(() => {
      gsap.to(".loading-screen", {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => setIsLoading(false),
      });
    }, 800); // 800ms initial load buffer

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen fixed inset-0 z-[99999] bg-[var(--color-bg-base)] flex items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center gap-[12px]">
        <div className="w-[8px] h-[8px] rounded-full bg-[var(--color-ink)] animate-ping"></div>
        <div className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-gray)]">
          Loading Environment
        </div>
      </div>
    </div>
  );
}
