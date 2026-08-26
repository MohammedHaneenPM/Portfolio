"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { content } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function EducationSection() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const elements = gsap.utils.toArray(".edu-reveal") as HTMLElement[];
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        }
      );
    });
  }, []);

  return (
    <section id="education" className="relative py-[80px] md:py-[180px] px-[20px] md:px-[48px] max-w-[1360px] mx-auto z-10">
      <div className="edu-reveal font-[family-name:var(--font-jetbrains-mono)] text-[11px] md:text-[12px] tracking-[0.15em] uppercase text-[var(--color-gray)] flex items-center gap-[12px] mb-[20px] md:mb-[28px] before:content-[''] before:w-[24px] before:h-[1px] before:bg-[var(--color-gray-dim)]">
        04 — Education
      </div>
      
      <h2 className="edu-reveal font-[family-name:var(--font-space-grotesk)] font-semibold text-[clamp(28px,4vw,56px)] tracking-[-0.01em] leading-[1.1] md:leading-[1.05] mb-[48px] md:mb-[64px]">
        Where the foundation was built.
      </h2>

      <div className="border-t border-[var(--color-line)]">
        {content.education.map((edu, index) => (
          <div 
            key={index} 
            className="edu-reveal flex flex-col md:grid md:grid-cols-[160px_1fr] gap-[12px] md:gap-[48px] py-[32px] md:py-[40px] border-b border-[var(--color-line)] items-start hover:bg-transparent md:hover:bg-[var(--color-bg-surface)] transition-colors duration-300 p-0 md:p-4 mx-0 md:-mx-4 rounded-lg"
          >
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[12px] md:text-[13px] text-[var(--color-gray)] pt-[4px]">
              {edu.date}
            </div>
            
            <div>
              <h4 className="font-[family-name:var(--font-space-grotesk)] text-[20px] md:text-[22px] font-semibold mb-[4px] md:mb-[8px] text-[var(--color-ink)]">
                {edu.degree}
              </h4>
              <div className="text-[var(--color-gray)] text-[13px] md:text-[14px] mb-[12px] md:mb-[16px] font-[family-name:var(--font-jetbrains-mono)]">
                {edu.institution}
              </div>
              <p className="text-[var(--color-gray)] text-[15px] md:text-[16px] leading-[1.6] md:leading-[1.7] max-w-[720px] font-light">
                {edu.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
