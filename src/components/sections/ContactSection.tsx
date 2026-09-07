"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import PresenceIndicator from "@/components/ui/PresenceIndicator";

export default function ContactSection() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const elements = gsap.utils.toArray(".contact-reveal") as HTMLElement[];
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
    <section id="contact" className="relative py-[80px] md:py-[120px] px-[20px] md:px-[48px] max-w-[1360px] mx-auto z-10 text-center flex flex-col items-center">
      <div className="contact-reveal font-[family-name:var(--font-jetbrains-mono)] text-[11px] md:text-[12px] tracking-[0.15em] uppercase text-[var(--color-gray)] flex items-center gap-[12px] mb-[24px] md:mb-[32px] justify-center before:content-[''] before:w-[24px] before:h-[1px] before:bg-[var(--color-gray-dim)]">
        05 — Contact
      </div>
      
      <h2 className="contact-reveal font-[family-name:var(--font-space-grotesk)] font-bold text-[clamp(32px,8vw,96px)] tracking-[-0.02em] leading-[1.05] md:leading-[1.02] mb-[32px] md:mb-[48px]">
        Let&apos;s build<br />
        something <span className="text-[var(--color-accent-creative)]">worth reading.</span>
      </h2>
      
      <p className="contact-reveal text-[15px] md:text-[18px] leading-[1.6] md:leading-[1.7] text-[var(--color-gray)] max-w-[640px] font-light mb-[40px] md:mb-[56px]">
        Open to creative development, Shopify, UI/UX and data analyst roles — remote or Kerala-based.
      </p>

      <div className="contact-reveal flex flex-col sm:flex-row gap-[16px] md:gap-[28px] justify-center flex-wrap w-full sm:w-auto">
        <a 
          href="mailto:connect.haneen@gmail.com"
          className="hover-target font-[family-name:var(--font-jetbrains-mono)] text-[12px] md:text-[13px] text-[var(--color-gray)] px-[20px] md:px-[22px] py-[12px] border border-[var(--color-line)] rounded-[30px] transition-all duration-300 hover:text-[var(--color-ink)] hover:border-[var(--color-ink)] text-center"
        >
          connect.haneen@gmail.com
        </a>
        <a 
          href="https://linkedin.com/in/mohammedhaneenpm"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-target font-[family-name:var(--font-jetbrains-mono)] text-[12px] md:text-[13px] text-[var(--color-gray)] px-[20px] md:px-[22px] py-[12px] border border-[var(--color-line)] rounded-[30px] transition-all duration-300 hover:text-[var(--color-ink)] hover:border-[var(--color-ink)] text-center"
        >
          LinkedIn
        </a>
        <a 
          href="https://github.com/MohammedHaneenPM/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-target font-[family-name:var(--font-jetbrains-mono)] text-[12px] md:text-[13px] text-[var(--color-gray)] px-[20px] md:px-[22px] py-[12px] border border-[var(--color-line)] rounded-[30px] transition-all duration-300 hover:text-[var(--color-ink)] hover:border-[var(--color-ink)] text-center"
        >
          GitHub
        </a>
        <a 
          href="https://instagram.com/itshaneeeeen"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-target font-[family-name:var(--font-jetbrains-mono)] text-[12px] md:text-[13px] text-[var(--color-gray)] px-[20px] md:px-[22px] py-[12px] border border-[var(--color-line)] rounded-[30px] transition-all duration-300 hover:text-[var(--color-ink)] hover:border-[var(--color-ink)] text-center"
        >
          Instagram
        </a>
        <a 
          href="tel:+918547896740"
          className="hover-target font-[family-name:var(--font-jetbrains-mono)] text-[12px] md:text-[13px] text-[var(--color-gray)] px-[20px] md:px-[22px] py-[12px] border border-[var(--color-line)] rounded-[30px] transition-all duration-300 hover:text-[var(--color-ink)] hover:border-[var(--color-ink)] text-center"
        >
          +91 85478 96740
        </a>
        <a 
          href="https://wa.me/918547896740?text=Hi%2C%20I%20have%20viewed%20your%20Portfolio.%20It%20is%20nice%20to%20meet%20you"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-target font-[family-name:var(--font-jetbrains-mono)] text-[12px] md:text-[13px] text-[var(--color-gray)] px-[20px] md:px-[22px] py-[12px] border border-[var(--color-line)] rounded-[30px] transition-all duration-300 hover:text-[var(--color-ink)] hover:border-[var(--color-ink)] text-center"
        >
          WhatsApp
        </a>
        <a href="/Portfolio/resume.pdf" download="Mohammed_Haneen_Resume.pdf" className="hover-target font-[family-name:var(--font-jetbrains-mono)] text-[12px] md:text-[13px] text-[var(--color-gray)] px-[20px] md:px-[22px] py-[12px] border border-[var(--color-line)] rounded-[30px] transition-all duration-300 hover:text-[var(--color-ink)] hover:border-[var(--color-ink)] text-center flex items-center justify-center gap-[8px]" >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> 
            <polyline points="7 10 12 15 17 10"></polyline> 
            <line x1="12" y1="15" x2="12" y2="3"></line> 
          </svg> 
          Resume 
        </a>
      </div>

      <footer className="w-full mt-[80px] md:mt-[160px] pt-[32px] border-t border-[var(--color-line)] flex flex-col justify-center items-center gap-6 font-[family-name:var(--font-jetbrains-mono)] text-[11px] md:text-[12px] text-[var(--color-gray-dim)] text-center">
        <PresenceIndicator />
        <span>Designed & built by Mohammed Haneen P M &middot; 2026</span>
      </footer>
    </section>
  );
}
