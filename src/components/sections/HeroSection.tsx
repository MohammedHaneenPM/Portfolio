"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import profileImage from "@/public/images/profile.jpg";
import gsap from "gsap";

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const roles = [
    { role: "Web Developer", sub: "crafting websites that leave an impression" },
    { role: "Creative Developer", sub: "building interfaces that move" },
    { role: "Shopify Developer", sub: "theming storefronts that convert" },
    { role: "UI/UX Designer", sub: "prototyping flows people trust" },
    { role: "Data Analyst", sub: "reading dashboards that decide" }
  ];

  useEffect(() => {
    // Initial Reveal Animation
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedMotion) {
      // Cinematic slow-start stagger
      gsap.to(".hero-title-line", {
        y: "0%",
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.15,
        delay: 0.3
      });
      gsap.fromTo(
        ".hero-fade-in",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.15, delay: 0.8 }
      );
      
      // Cinematic image reveal
      gsap.fromTo(
        ".hero-image-reveal",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", scale: 1.05 },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", scale: 1, duration: 1.6, ease: "power4.inOut", delay: 1.0 }
      );
    } else {
      gsap.set(".hero-title-line", { y: "0%" });
      gsap.set(".hero-fade-in", { opacity: 1, y: 0 });
      gsap.set(".hero-image-reveal", { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", scale: 1 });
    }

    // Role switcher logic
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section 
      id="hero"
      className="min-h-screen relative flex flex-col justify-center px-[20px] md:px-[48px] max-w-[1360px] mx-auto z-10 overflow-hidden pt-[120px] pb-[80px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[40px] items-center">
        
        {/* Cinematic Text Side */}
        <div className="lg:col-span-7 relative z-20 order-2 lg:order-1">
          <div className="hero-fade-in font-[family-name:var(--font-jetbrains-mono)] text-[11px] md:text-[13px] tracking-[0.14em] uppercase text-[var(--color-gray)] mb-[20px] md:mb-[28px] flex items-center gap-[10px]">
            <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-accent-creative)] animate-pulse min-w-[7px]"></span>
            Manjeri, Kerala — Available for work
          </div>
          
          <h1 
            ref={titleRef}
            className="font-[family-name:var(--font-space-grotesk)] font-bold text-[clamp(42px,12vw,132px)] leading-[0.9] tracking-[-0.03em] flex flex-col mb-[16px] mix-blend-difference"
          >
            <div className="overflow-hidden">
              <span className="hero-title-line inline-block translate-y-[110%]">Mohammed</span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-title-line inline-block translate-y-[110%]">
                <span className="text-[var(--color-accent-creative)]">Haneen</span>&nbsp;P&nbsp;M
              </span>
            </div>
          </h1>

          <div className="hero-fade-in h-[34px] relative overflow-hidden font-[family-name:var(--font-jetbrains-mono)] text-[14px] md:text-[18px] text-[var(--color-gray)]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-[4px] sm:gap-[10px] absolute transition-transform duration-700 ease-in-out w-full">
              <b className="text-[var(--color-ink)] font-medium whitespace-nowrap">{roles[roleIndex].role}</b>
              <span className="truncate opacity-75 sm:opacity-100">— {roles[roleIndex].sub}</span>
            </div>
          </div>

          <p className="hero-fade-in mt-[24px] md:mt-[40px] max-w-[500px] text-[15px] md:text-[17px] leading-[1.6] md:leading-[1.75] text-[var(--color-gray)] font-light">
            I sit at the point where design, code and data meet — building Shopify storefronts and React products by day, and reading them back as dashboards by night. One brain, two disciplines, zero patience for boring interfaces.
          </p>

          <div className="hero-fade-in mt-[32px] md:mt-[48px] flex gap-[12px] md:gap-[16px] flex-col sm:flex-row flex-wrap">
            <a 
              href="#projects" 
              className="hover-target font-[family-name:var(--font-jetbrains-mono)] text-[12px] md:text-[13px] tracking-[0.05em] uppercase px-[24px] md:px-[28px] py-[14px] md:py-[16px] rounded-[2px] inline-flex items-center justify-center gap-[10px] transition-all duration-300 bg-[var(--color-ink)] text-black hover:-translate-y-1 hover:bg-[var(--color-accent-creative)] text-center w-full sm:w-auto"
            >
              View Projects →
            </a>
            <a 
              href="#contact" 
              className="hover-target font-[family-name:var(--font-jetbrains-mono)] text-[12px] md:text-[13px] tracking-[0.05em] uppercase px-[24px] md:px-[28px] py-[14px] md:py-[16px] rounded-[2px] inline-flex items-center justify-center gap-[10px] transition-all duration-300 border border-[var(--color-line)] text-[var(--color-ink)] hover:-translate-y-1 hover:border-[var(--color-ink)] bg-black/20 backdrop-blur-sm text-center w-full sm:w-auto"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Cinematic Image Side */}
        <div className="lg:col-span-5 relative z-10 order-1 lg:order-2 mb-8 lg:mb-0 max-w-[400px] lg:max-w-none mx-auto w-full">
          <div className="w-full aspect-square md:aspect-[3/4] relative overflow-hidden rounded-[4px] hero-image-reveal filter grayscale hover:grayscale-0 transition-all duration-700">
            <div className="absolute inset-0 bg-[var(--color-bg-surface2)] animate-pulse"></div>
            <Image 
              src={profileImage}
              alt="Mohammed Haneen P M" 
              className="w-full h-full object-cover object-center absolute inset-0 z-10"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                console.error("Failed to load hero image");
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-base)] via-transparent to-transparent z-20"></div>
          </div>
        </div>
      </div>

      {/* Footer Meta area for Hero */}
      <div className="hero-fade-in static mt-[64px] md:absolute md:bottom-[48px] md:left-[48px] md:right-[48px] flex flex-col md:flex-row justify-between items-center md:items-end gap-[24px] font-[family-name:var(--font-jetbrains-mono)] text-[12px] text-[var(--color-gray)] tracking-[0.05em]">
        <span className="hidden md:inline">© 2026 — BTech CSE, Kerala</span>
        
        <div className="flex items-center gap-[10px]">
          <div className="w-[1px] h-[34px] bg-[var(--color-gray-dim)] relative overflow-hidden">
            <div className="absolute top-[-100%] left-0 w-full h-full bg-[var(--color-ink)] animate-[scrollcue_1.8s_infinite_ease-in-out]"></div>
          </div>
          Scroll
        </div>
        
        <span className="hidden md:inline">Kerala, IN</span>
      </div>
    </section>
  );
}

