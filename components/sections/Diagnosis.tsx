'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Diagnosis() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        }
      });

      // 1. Top label fades in + slides up 20px (duration 0.5s)
      tl.fromTo('.diag-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
      // 2. Staggered fade in and slide up of 4 lines (duration 0.6s, starting 0.3s after label)
      .fromTo('.diag-line',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.15 },
        0.3
      )
      // 3. Divider scales from 0 to 200px width (duration 0.5s)
      .fromTo('.diag-divider',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
      // 4. FIX STATEMENT fades + scales from 0.95 to 1 (duration 0.6s)
      .fromTo('.diag-fix',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const observations = [
    "14 sections on the homepage.",
    "Best ideas buried below the fold.",
    "Brand voice: loud. Site voice: catalog.",
    "₹4,000 Cr revenue on a Shopify template."
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-bg-primary overflow-hidden select-none bg-grain flex flex-col justify-center py-16 md:py-24"
    >
      {/* Faint vertical column rule (Desktop Only) */}
      <div className="hidden md:block absolute left-20 top-[20%] w-[1px] h-[60vh] bg-gradient-to-b from-transparent via-accent-red/20 to-transparent z-0 pointer-events-none" />

      {/* Centered Editorial Container */}
      <div className="relative z-10 w-full max-w-[900px] mx-auto px-6 md:px-12 flex flex-col items-start justify-center">
        
        {/* Top-Left Label */}
        <div className="diag-label flex flex-col font-mono text-[10px] md:text-xs tracking-[0.3em] text-text-muted uppercase mb-16 md:mb-[120px]">
          <span>THE DIAGNOSIS</span>
          <span>— FIELD NOTES</span>
        </div>

        {/* 4 Diagnosis Bullet Observations */}
        <div className="w-full flex flex-col items-start gap-10 md:gap-[60px] mb-16 md:mb-[120px]">
          {observations.map((text, idx) => (
            <div
              key={`diag-${idx}`}
              className="diag-line flex items-center justify-start gap-6 w-full text-left"
            >
              {/* Em-dash dash (40px wide red horizontal rule) with continuous pulse */}
              <span className="flex-shrink-0 w-10 md:w-[40px] h-[1.5px] bg-accent-red animate-pulse-dash" />
              
              {/* Syne typography observation */}
              <p className="font-syne text-[22px] md:text-[36px] font-normal leading-[1.25] text-text-primary tracking-tight">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Divider Centered Line */}
        <div className="w-full flex justify-center items-center h-[1px] mb-8 md:mb-[40px]">
          <div className="diag-divider w-[200px] h-[1px] bg-accent-red origin-center" />
        </div>

        {/* Editorial Fix Statement */}
        <div className="w-full flex justify-center items-center">
          <p className="diag-fix font-mono text-[16px] md:text-[24px] font-bold text-accent-red tracking-[0.3em] md:tracking-[0.4em] text-center select-text animate-glow-pulse">
            FIX: EDITORIAL RESTRAINT.
          </p>
        </div>

      </div>
    </section>
  );
}
