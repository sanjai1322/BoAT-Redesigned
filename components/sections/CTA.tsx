'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FramerCDPlayer from '@/components/ui/FramerCDPlayer';

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          once: true,
        }
      });

      // 1. Top label fades in + slides up 20px (duration 0.6s)
      tl.fromTo('.cta-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
      // 2. "Your ears" fades in + slides up 40px (duration 0.8s, delay 0.2s after label)
      .fromTo('.cta-headline-1',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.2
      )
      // 3. "deserve better." fades in + slides up 40px (duration 0.8s, delay 0.4s after label)
      .fromTo('.cta-headline-2',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.4
      )
      // 3.5. CD Player scales in and bounces (duration 0.8s, delay 0.6s)
      .fromTo('.cta-cd-player',
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' },
        0.6
      )
      // 4. CTA Button scales in from 0.95 to 1 (duration 0.6s, delay 1.0s after label)
      .fromTo('.cta-button-wrap',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
        1.0
      )
      // 5. Footer block fades in (duration 0.5s, delay 1.4s after label)
      .fromTo('.cta-footer',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        1.4
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-bg-primary overflow-hidden select-none bg-grain flex flex-col justify-center items-center text-center py-24 md:py-32"
    >
      {/* Upper-Right Radial Red Light Leak */}
      <div className="absolute -top-[200px] -right-[200px] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,var(--accent-red-glow)_0%,transparent_70%)] opacity-30 blur-[96px] pointer-events-none z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-4xl">
        
        {/* Top Label */}
        <div className="cta-label mb-10 md:mb-14">
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-text-muted uppercase">
            — FINAL THOUGHT
          </span>
        </div>

        {/* Headline block */}
        <div className="flex flex-col items-center justify-center font-extrabold leading-[1.0] md:leading-[0.95] tracking-tighter mb-14 md:mb-20">
          {/* Line 1: Your ears */}
          <div className="overflow-hidden pb-2 w-full">
            <h2 className="cta-headline-1 text-text-primary font-syne text-[56px] md:text-[96px]">
              Your ears
            </h2>
          </div>
          {/* Line 2: deserve better. */}
          <div className="overflow-hidden pt-2 w-full">
            <h2 className="cta-headline-2 text-text-primary font-fraunces italic font-normal text-[72px] md:text-[120px]">
              deserve better.
            </h2>
          </div>
        </div>

        {/* Framer CD Player Component */}
        <div className="cta-cd-player w-full flex justify-center mb-14 md:mb-20 z-20">
          <FramerCDPlayer />
        </div>

        {/* Interactive CTA Button */}
        <div className="cta-button-wrap relative z-30">
          <button className="cta-button group flex items-center justify-center py-5 px-12 md:py-[20px] md:px-[48px] min-h-[48px] bg-transparent border border-accent-red text-accent-red font-syne font-medium text-base md:text-[18px] tracking-wide rounded-none hover:bg-accent-red hover:text-text-primary transition-all duration-300 active:scale-98">
            Shop the experience
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2 font-mono">
              →
            </span>
          </button>
        </div>

      </div>

      {/* Footer Block */}
      <div className="cta-footer absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center w-full max-w-[600px] px-6 z-20">
        
        {/* Disclaimer */}
        <p className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-text-muted uppercase text-center leading-relaxed mb-4">
          {"CONCEPT PROJECT. NOT AFFILIATED WITH BOAT LIFESTYLE."}
        </p>

        {/* Attribution Signature */}
        <p className="font-mono text-[10px] md:text-[11px] tracking-[0.15em] text-text-muted uppercase text-center mb-2">
          {"DESIGNED + BUILT BY CODE CONSTELLATION"}
        </p>

        {/* Agency Website Link */}
        <a 
          href="https://codeconstellation.in" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-mono text-[10px] md:text-[11px] text-accent-red hover:underline tracking-wide transition-all mb-3 uppercase"
        >
          {"codeconstellation.in"}
        </a>

        {/* Case Study Link */}
        <a 
          href="/case-study" 
          className="font-mono text-[10px] md:text-[11px] text-text-muted hover:text-accent-red tracking-[0.15em] transition-all mb-6 uppercase"
        >
          {"Read the case study →"}
        </a>

        {/* Social Icons row */}
        <div className="flex items-center justify-center gap-8">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-red transition-colors duration-300"
            aria-label="Twitter Link"
          >
            <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-red transition-colors duration-300"
            aria-label="Instagram Link"
          >
            <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-red transition-colors duration-300"
            aria-label="Linkedin Link"
          >
            <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>

      </div>

    </section>
  );
}
