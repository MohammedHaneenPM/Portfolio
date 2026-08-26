"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { content } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const elements = gsap.utils.toArray(".proj-reveal") as HTMLElement[];
    
    // Animate the header elements with a stagger
    gsap.fromTo(
      elements.slice(0, 2),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: elements[0],
          start: "top 85%",
        },
      }
    );

    // Animate each project item as it comes into view
    elements.slice(2).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
    <section id="projects" className="relative py-[80px] md:py-[180px] px-[20px] md:px-[48px] max-w-[1360px] mx-auto z-10">
      <div className="proj-reveal font-[family-name:var(--font-jetbrains-mono)] text-[11px] md:text-[12px] tracking-[0.15em] uppercase text-[var(--color-gray)] flex items-center gap-[12px] mb-[20px] md:mb-[28px] before:content-[''] before:w-[24px] before:h-[1px] before:bg-[var(--color-gray-dim)]">
        04 — Selected Work
      </div>
      
      <h2 className="proj-reveal font-[family-name:var(--font-space-grotesk)] font-semibold text-[clamp(28px,4vw,56px)] tracking-[-0.01em] leading-[1.1] md:leading-[1.05] mb-[48px] md:mb-[64px] max-w-[800px]">
        Projects that carry both sides of the work.
      </h2>

      <div className="mt-[48px] md:mt-[64px]">
        {content.projects.map((proj, index) => (
          <div 
            key={proj.id} 
            className="proj-reveal group border-t border-[var(--color-line)] last:border-b py-[32px] md:py-[48px] flex flex-col md:grid md:grid-cols-[80px_1fr_200px] gap-[16px] md:gap-[32px] md:items-center relative transition-all duration-400 ease-out md:hover:pl-[16px]"
          >
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-[var(--color-gray-dim)] text-[13px] md:text-[14px]">
              0{index + 1}
            </div>
            
            <div>
              <h3 className={`font-[family-name:var(--font-space-grotesk)] text-[clamp(20px,3vw,38px)] font-semibold transition-colors duration-300 ${proj.type === "creative" ? "group-hover:text-[var(--color-accent-creative)]" : "group-hover:text-[var(--color-accent-analytics)]"}`}>
                {proj.link ? (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover-target">
                    {proj.title} ↗
                  </a>
                ) : (
                  proj.title
                )}
              </h3>
              <p className="text-[var(--color-gray)] mt-[8px] md:mt-[10px] text-[14px] md:text-[15px] max-w-[560px] leading-[1.5] md:leading-[1.6] font-light">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-[6px] md:gap-[8px] mt-[12px] md:mt-[16px]">
                {proj.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] md:text-[11px] px-[10px] md:px-[12px] py-[4px] md:py-[6px] border border-[var(--color-line)] text-[var(--color-gray)] rounded-[20px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-left md:text-right font-[family-name:var(--font-jetbrains-mono)] text-[11px] md:text-[12px] text-[var(--color-gray)] flex flex-row md:flex-col gap-[8px] md:gap-[4px] mt-[8px] md:mt-0">
              <span className="text-[var(--color-ink)]">{proj.category}</span>
              <span className="hidden md:inline">—</span>
              <span>{proj.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
