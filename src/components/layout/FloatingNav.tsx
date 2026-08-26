"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import logo from '@/public/favicon.ico';
import gsap from "gsap";

export default function FloatingNav() {
  const [mixValue, setMixValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  
  const tl = useRef<gsap.core.Timeline | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const navItems = ["About", "Skills", "Experience", "Education", "Projects", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      setMixValue(progress);
      
      document.documentElement.style.setProperty("--mix", progress.toString());
      
      const fill = document.getElementById("spectrum-fill");
      if (fill) {
        fill.style.width = `${progress * 100}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true })
        .set(overlayRef.current, { pointerEvents: 'auto' })
        .to('.menu-backdrop', { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0)
        .fromTo(panelRef.current, 
          { autoAlpha: 0, yPercent: -10, scale: 0.6 },
          { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.8, transformOrigin: 'top center', ease: 'back.out(2)' }, 0.1)
        .fromTo('.gsap-menu-link', 
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', stagger: 0.05 }, 0.22);
    });

    return () => {
      ctx.revert();
    };
  }, []);

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Accessibility: Escape key and Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        tl.current?.eventCallback('onReverseComplete', () => {
          gsap.set(overlayRef.current, { pointerEvents: 'none' });
        });
        tl.current?.timeScale(1.5).reverse();
        document.body.style.overflow = "";
        menuBtnRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>('.gsap-menu-link[tabindex="0"]');
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      tl.current?.timeScale(1).play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current?.eventCallback('onReverseComplete', () => {
        gsap.set(overlayRef.current, { pointerEvents: 'none' });
      });
      tl.current?.timeScale(1.5).reverse();
      document.body.style.overflow = "";
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    toggle();
    
    setTimeout(() => {
      if (id === "hero") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 600);
  };

  return (
    <>
      {/* Spectrum Bar at the very top */}
      <div 
        id="spectrum" 
        className="fixed top-0 left-0 h-[3px] w-full bg-[var(--color-bg-surface2)] z-[200]"
      >
        <div 
          id="spectrum-fill" 
          className="absolute top-0 left-0 h-full w-0"
          style={{
            background: "linear-gradient(90deg, var(--color-accent-creative), var(--color-accent-analytics))"
          }}
        ></div>
      </div>
      
      {/* Main Nav (Favicon only) */}
      <nav className={`fixed top-0 left-1/2 -translate-x-1/2 z-[150] inline-flex items-center px-[24px] py-[28px] mix-blend-difference pointer-events-none transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Favicon functioning as menu toggle */}
        <div className="flex items-center pointer-events-auto">
          <button 
            ref={menuBtnRef}
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls="menu-overlay"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="hover-target focus:outline-none transition-transform duration-500"
            style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            <Image src={logo} alt="Logo" className="h-[24px] w-auto" />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay (Adapting GSAP Demo Interaction) */}
      <div 
        ref={overlayRef}
        id="menu-overlay"
        className="fixed inset-0 z-[160] pointer-events-none flex flex-col justify-start items-center pt-[80px]" 
        role="dialog" 
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div 
          className="menu-backdrop absolute inset-0 bg-black/40 backdrop-blur-md opacity-0"
          onClick={() => { if (isOpen) toggle(); }}
        ></div>
        
        <div 
          ref={panelRef}
          className="relative w-[90vw] sm:w-[340px] md:w-[400px] invisible flex flex-col bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border border-white/10 rounded-[28px] shadow-2xl p-2 pointer-events-auto"
        >
          {/* Logo Bar */}
          <div className="flex justify-between items-center px-4 py-4 mb-1 border-b border-white/10">
            <button onClick={toggle} className="hover-target focus:outline-none flex items-center rounded-full p-1 transition-transform hover:scale-105">
              <Image src={logo} alt="Logo" className="h-[20px] w-auto" />
            </button>
            <button onClick={toggle} className="text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10" aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Menu Rows */}
          <div className="flex flex-col">
            {navItems.map((item, index) => (
              <a 
                key={item}
                className="gsap-menu-link group flex justify-between items-center px-5 h-[64px] rounded-[16px] text-white/90 font-[family-name:var(--font-space-grotesk)] font-medium text-[24px] transition-all duration-300 hover:bg-white/10 hover:translate-x-[6px] hover:scale-[1.01] hover-target"
                href={`#${item.toLowerCase()}`} 
                tabIndex={isOpen ? 0 : -1}
                onClick={(e) => handleLinkClick(e, item.toLowerCase())}
              >
                <span>{item}</span>
                <span className="text-[13px] font-[family-name:var(--font-jetbrains-mono)] text-white/30 group-hover:text-white/70 transition-colors">
                  0{index + 1}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
