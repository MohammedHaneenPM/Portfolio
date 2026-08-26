"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { content } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const elements = gsap.utils.toArray(".about-reveal") as HTMLElement[];
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
    <section id="about" className="relative py-[80px] md:py-[180px] px-[20px] md:px-[48px] max-w-[1360px] mx-auto z-10">
      <div className="about-reveal font-[family-name:var(--font-jetbrains-mono)] text-[11px] md:text-[12px] tracking-[0.15em] uppercase text-[var(--color-gray)] flex items-center gap-[12px] mb-[20px] md:mb-[28px] before:content-[''] before:w-[24px] before:h-[1px] before:bg-[var(--color-gray-dim)]">
        01 — About
      </div>
      
      <h2 className="about-reveal font-[family-name:var(--font-space-grotesk)] font-semibold text-[clamp(28px,4vw,56px)] tracking-[-0.01em] leading-[1.1] md:leading-[1.05] mb-[24px] max-w-[800px]">
        {content.about.title}
      </h2>

      <div className="mt-[48px] md:mt-[64px] grid grid-cols-1 md:grid-cols-2 gap-[48px] md:gap-[80px]">
        <div className="about-reveal flex flex-col gap-[22px] text-[15px] md:text-[17px] leading-[1.7] md:leading-[1.85] text-[var(--color-ink)] font-light">
          {content.about.description.map((para, i) => (
            <p key={i} dangerouslySetInnerHTML={{ 
              __html: para.replace(/(React|JavaScript\/TypeScript|Next\.js|responsive UI development|real-world e-commerce and Shopify experiences|GSAP|Figma wireframes|Lenis)/g, (match) => `<span class="text-[var(--color-accent-creative)] font-medium">${match}</span>`) 
            }} />
          ))}
        </div>
        
        <div className="about-reveal grid grid-cols-2 gap-[1px] bg-[var(--color-line)] border border-[var(--color-line)] h-fit">
          {content.about.stats.map((stat, i) => (
            <div key={i} className="bg-[var(--color-bg-base)] p-[24px_16px] md:p-[32px_28px] flex flex-col gap-[8px]">
              <b className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[36px] font-semibold text-[var(--color-accent-creative)] transition-colors duration-500 hover:text-[var(--color-accent-analytics)]">
                {stat.value}
              </b>
              <span className="text-[11px] md:text-[12px] text-[var(--color-gray)] font-[family-name:var(--font-jetbrains-mono)] tracking-[0.04em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
