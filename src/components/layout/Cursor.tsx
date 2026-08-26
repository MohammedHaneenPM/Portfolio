"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById("global-cursor");
    if (!cursor) return;

    // Check if user prefers reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      cursor.style.display = "none";
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      // Use GSAP for smooth tracking
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const addHoverEffect = () => cursor.classList.add("hover");
    const removeHoverEffect = () => cursor.classList.remove("hover");

    // Initialize hover effects on existing elements
    const initHoverEffects = () => {
      document.querySelectorAll("a, button, .hover-target").forEach((el) => {
        el.addEventListener("mouseenter", addHoverEffect);
        el.addEventListener("mouseleave", removeHoverEffect);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    
    // We need to run this after a short delay to ensure the DOM is painted, 
    // or run it whenever route changes/new elements are added
    setTimeout(initHoverEffects, 500);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.querySelectorAll("a, button, .hover-target").forEach((el) => {
        el.removeEventListener("mouseenter", addHoverEffect);
        el.removeEventListener("mouseleave", removeHoverEffect);
      });
    };
  }, []);

  return null;
}
