"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { content } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const elements = gsap.utils.toArray(".skills-reveal") as HTMLElement[];
    // Group the reveals to stagger them instead of firing them all individually at the same exact time
    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: elements[0],
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section id="skills" className="relative py-[80px] md:py-[180px] px-[20px] md:px-[48px] max-w-[1360px] mx-auto z-10">
      <div className="skills-reveal font-[family-name:var(--font-jetbrains-mono)] text-[11px] md:text-[12px] tracking-[0.15em] uppercase text-[var(--color-gray)] flex items-center gap-[12px] mb-[20px] md:mb-[28px] before:content-[''] before:w-[24px] before:h-[1px] before:bg-[var(--color-gray-dim)]">
        02 — Capabilities
      </div>
      
      <h2 className="skills-reveal font-[family-name:var(--font-space-grotesk)] font-semibold text-[clamp(28px,4vw,56px)] tracking-[-0.01em] leading-[1.1] md:leading-[1.05] mb-[24px]">
        Scroll to shift the spectrum.
      </h2>
      
      <p className="skills-reveal text-[15px] md:text-[18px] leading-[1.6] md:leading-[1.7] text-[var(--color-gray)] max-w-[640px] font-light">
        This page runs on a gradient between two modes — creative build, and analytical read. As you move through it, the accent color tells you which one you're in.
      </p>

      <div className="skills-reveal mt-[48px] md:mt-[64px] grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-[var(--color-line)] border border-[var(--color-line)]">
        {/* Creative Column */}
        <div className="bg-[var(--color-bg-base)] p-[32px_24px] md:p-[48px_40px] border-t-2 border-[var(--color-accent-creative)] hover:bg-[var(--color-bg-surface)] transition-colors duration-300">
          <span className="block font-[family-name:var(--font-jetbrains-mono)] text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-[var(--color-accent-creative)] mb-[20px] md:mb-[28px]">
            Build
          </span>
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-[20px] md:text-[22px] font-semibold mb-[24px] md:mb-[32px]">
            Creative Development
          </h3>
          <div className="flex flex-col">
            {content.skills.creative.map((skill, i) => (
              <div key={i} className="flex justify-between items-center py-[12px] md:py-[14px] border-b border-[var(--color-line)] last:border-b-0 text-[14px] md:text-[15px] hover:text-[var(--color-accent-creative)] transition-colors">
                <span>{skill.name}</span>
                <span className="text-[var(--color-gray)] font-[family-name:var(--font-jetbrains-mono)] text-[11px] md:text-[12px]">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Column */}
        <div className="bg-[var(--color-bg-base)] p-[32px_24px] md:p-[48px_40px] border-t-2 border-[var(--color-accent-analytics)] hover:bg-[var(--color-bg-surface)] transition-colors duration-300">
          <span className="block font-[family-name:var(--font-jetbrains-mono)] text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-[var(--color-accent-analytics)] mb-[20px] md:mb-[28px]">
            Read
          </span>
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-[20px] md:text-[22px] font-semibold mb-[24px] md:mb-[32px]">
            Data & Analytics
          </h3>
          <div className="flex flex-col">
            {content.skills.analytics.map((skill, i) => (
              <div key={i} className="flex justify-between items-center py-[12px] md:py-[14px] border-b border-[var(--color-line)] last:border-b-0 text-[14px] md:text-[15px] hover:text-[var(--color-accent-analytics)] transition-colors">
                <span>{skill.name}</span>
                <span className="text-[var(--color-gray)] font-[family-name:var(--font-jetbrains-mono)] text-[11px] md:text-[12px]">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
