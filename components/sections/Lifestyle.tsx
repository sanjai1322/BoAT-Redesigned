'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LifestyleScene {
  id: number;
  label: string;
  headline: string;
  image: string;
}

const scenes: LifestyleScene[] = [
  {
    id: 1,
    label: "01 — FOR FITNESS",
    headline: "Outrun the silence.",
    image: "/lifestyle/lifestyle-fitness.jpg"
  },
  {
    id: 2,
    label: "02 — FOR PARTIES",
    headline: "Turn it all the way up.",
    image: "/lifestyle/lifestyle-parties.jpg"
  },
  {
    id: 3,
    label: "03 — FOR WORK",
    headline: "Tune out the noise. Tune in the focus.",
    image: "/lifestyle/lifestyle-work.jpg"
  },
  {
    id: 4,
    label: "04 — FOR AUDIOPHILES",
    headline: "Every detail. Uncaged.",
    image: "/lifestyle/lifestyle-audiophile.jpg"
  }
];

export default function Lifestyle() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Intro block fade-out as we scroll down into the sticky trigger
      gsap.fromTo(introRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -40,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top 80%',
            end: 'top 10%',
            scrub: true,
          }
        }
      );

      // 2. Sticky Pinning and Cross-Fading Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=600vh',
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const index = Math.min(Math.floor(self.progress * 4), 3);
            setActiveIndex(index);
          }
        }
      });

      // Initialize first slide values
      gsap.set('.lifestyle-image-0', { opacity: 1, scale: 1.0 });
      gsap.set('.lifestyle-text-0', { opacity: 1, y: 0 });
      gsap.set('.lifestyle-headline-0', { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 });

      // Animate continuous Ken Burns zoom on Scene 1 over the first segment
      tl.to('.lifestyle-image-0', { scale: 1.08, duration: 1.0 }, 0);

      // Transition to Scene 2 (at time 0.8 to 1.2)
      tl.to('.lifestyle-text-0', { opacity: 0, y: -40, duration: 0.3 }, 0.7)
        .to('.lifestyle-image-0', { opacity: 0, duration: 0.4 }, 0.8)
        .fromTo('.lifestyle-image-1', { opacity: 0, scale: 1.0 }, { opacity: 1, scale: 1.03, duration: 0.4 }, 0.8)
        .to('.lifestyle-image-1', { scale: 1.08, duration: 1.0 }, 1.0)
        .fromTo('.lifestyle-text-1', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, 1.0)
        .fromTo('.lifestyle-headline-1', 
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', opacity: 0 },
          { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', opacity: 1, duration: 0.4 },
          1.1
        );

      // Transition to Scene 3 (at time 1.8 to 2.2)
      tl.to('.lifestyle-text-1', { opacity: 0, y: -40, duration: 0.3 }, 1.7)
        .to('.lifestyle-image-1', { opacity: 0, duration: 0.4 }, 1.8)
        .fromTo('.lifestyle-image-2', { opacity: 0, scale: 1.0 }, { opacity: 1, scale: 1.03, duration: 0.4 }, 1.8)
        .to('.lifestyle-image-2', { scale: 1.08, duration: 1.0 }, 2.0)
        .fromTo('.lifestyle-text-2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, 2.0)
        .fromTo('.lifestyle-headline-2', 
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', opacity: 0 },
          { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', opacity: 1, duration: 0.4 },
          2.1
        );

      // Transition to Scene 4 (at time 2.8 to 3.2)
      tl.to('.lifestyle-text-2', { opacity: 0, y: -40, duration: 0.3 }, 2.7)
        .to('.lifestyle-image-2', { opacity: 0, duration: 0.4 }, 2.8)
        .fromTo('.lifestyle-image-3', { opacity: 0, scale: 1.0 }, { opacity: 1, scale: 1.03, duration: 0.4 }, 2.8)
        .to('.lifestyle-image-3', { scale: 1.08, duration: 1.0 }, 3.0)
        .fromTo('.lifestyle-text-3', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, 3.0)
        .fromTo('.lifestyle-headline-3', 
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', opacity: 0 },
          { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', opacity: 1, duration: 0.4 },
          3.1
        );

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="lifestyle" className="relative w-full scroll-mt-24">
      {/* 60VH INTRO BLOCK */}
      <div 
        ref={introRef}
        className="w-full h-[60vh] flex flex-col justify-center items-start px-6 md:px-24 bg-bg-primary overflow-hidden"
      >
        <span className="font-mono text-xs md:text-sm tracking-widest text-[#888888] mb-4 uppercase">
          — SHOP BY LIFESTYLE
        </span>
        <h2 className="font-syne font-bold text-[#F5F5F5] tracking-tight leading-[1.1]"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
        >
          {"Whatever you're into."}
        </h2>
      </div>

      {/* PINNED CROSS-FADE CONTAINER — no manual height, GSAP pin-spacer handles scroll length */}
      <div 
        ref={triggerRef}
        className="relative w-full bg-bg-primary overflow-hidden"
      >
        <div className="relative w-full h-screen overflow-hidden z-20">
          
          {/* Film grain texture at 4% */}
          <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none z-30 mix-blend-overlay" />

          {/* BACKGROUND SCENES & TYPOGRAPHY */}
          <div className="relative w-full h-full">
            {scenes.map((scene, idx) => (
              <div 
                key={`lifestyle-scene-${scene.id}`}
                className={`absolute inset-0 w-full h-full transition-all duration-300 ease-out lifestyle-scene-${idx}`}
                style={{ zIndex: activeIndex === idx ? 10 : 0 }}
              >
                {/* Background Image Panel */}
                <div 
                  className={`lifestyle-image-${idx} absolute inset-0 w-full h-full opacity-0 pointer-events-none`}
                  style={{ transformOrigin: 'center center' }}
                >
                  <Image 
                    src={scene.image}
                    alt={scene.label}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover object-center w-full h-full"
                  />
                  {/* Subtle red tint overlay (mix-blend-overlay at 8%) */}
                  <div className="absolute inset-0 bg-[#FF0000]/[0.08] mix-blend-overlay z-10 pointer-events-none" />
                  
                  {/* Dark gradient overlay bottom-to-top */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-bg-primary/40 to-transparent z-10 pointer-events-none" />
                </div>

                {/* Typography Overlay Content */}
                <div 
                  className={`lifestyle-text-${idx} absolute bottom-0 left-0 p-8 md:p-24 z-20 w-full text-left opacity-0 translate-y-[40px] pointer-events-none`}
                >
                  <span className="font-mono text-xs md:text-sm tracking-widest text-[#FF0000] uppercase mb-4 block font-semibold">
                    {scene.label}
                  </span>
                  
                  <h3 
                    className={`lifestyle-headline-${idx} font-syne font-extrabold text-[#F5F5F5] tracking-tighter leading-[0.95] max-w-[80vw] md:max-w-[70vw] uppercase`}
                    style={{ fontSize: 'clamp(36px, 8vw, 110px)' }}
                  >
                    {scene.headline}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* 4-SEGMENT VERTICAL PROGRESS INDICATOR (Right Edge) */}
          <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 h-[240px] w-[2px] bg-white/10 z-40 hidden md:flex">
            {[0, 1, 2, 3].map((idx) => {
              // Calculate segment fill based on overall progress
              const start = idx * 0.25;
              const segmentProgress = Math.max(0, Math.min(1, (scrollProgress - start) / 0.25));
              return (
                <div key={idx} className="relative flex-1 bg-white/10 overflow-hidden rounded-full">
                  <div 
                    className="absolute top-0 left-0 w-full bg-[#FF0000] origin-top transition-transform duration-75"
                    style={{ 
                      transform: `scaleY(${segmentProgress})`, 
                      height: '100%',
                      transformOrigin: 'top' 
                    }}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
