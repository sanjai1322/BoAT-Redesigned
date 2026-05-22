'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Tribe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shakeContainerRef = useRef<HTMLDivElement>(null);
  const ghostTextRef = useRef<HTMLDivElement>(null);
  
  // Elements
  const headlineLine1Ref = useRef<HTMLHeadingElement>(null);
  const headlineLine2Ref = useRef<HTMLHeadingElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);
  
  // Stat values and wrappers
  const statWrappersRef = useRef<HTMLDivElement[]>([]);
  const stat1ValueRef = useRef<HTMLSpanElement>(null);
  const stat2ValueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Parallax Ghost Text ("LOUD")
      if (ghostTextRef.current) {
        gsap.fromTo(ghostTextRef.current,
          { y: 150 },
          {
            y: -250,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }

      // Main Timeline triggered on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          once: true
        }
      });

      // 2. Headline Slam In
      tl.fromTo(headlineLine1Ref.current, 
        { opacity: 0, x: -100 }, 
        { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out' }
      )
      .fromTo(headlineLine2Ref.current, 
        { opacity: 0, x: -100 }, 
        { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out' }, 
        '-=0.6'
      );

      // 3. Stats Slam & Count-up
      statWrappersRef.current.forEach((wrapper, idx) => {
        if (!wrapper) return;
        
        const delay = 0.4 + idx * 0.15;
        const numElement = wrapper.querySelector('.stat-num-element');
        const underline = wrapper.querySelector('.stat-underline');
        
        // Container slam in
        tl.fromTo(wrapper,
          { opacity: 0, scale: 0.8, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' },
          delay
        );

        // Flash red and then white
        if (numElement) {
          tl.fromTo(numElement,
            { color: '#FF0000', scale: 1.15 },
            { color: '#F5F5F5', scale: 1, duration: 0.6, ease: 'power2.out' },
            delay + 0.1
          );
        }

        // Underline slash
        if (underline) {
          tl.fromTo(underline,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.4, ease: 'power2.out', transformOrigin: 'left' },
            delay + 0.3
          );
        }

        // Fast Count Up
        if (idx === 0 && stat1ValueRef.current) {
          // 60M+
          const count = { val: 0 };
          tl.to(count, {
            val: 60,
            duration: 0.8,
            ease: 'expo.out',
            onUpdate: () => {
              if (stat1ValueRef.current) {
                stat1ValueRef.current.innerText = Math.floor(count.val).toString();
              }
            }
          }, delay);

          // Screen Shake on heaviest impact
          tl.to(shakeContainerRef.current, {
            x: -4, duration: 0.05, ease: 'power1.inOut', delay: delay + 0.1
          })
          .to(shakeContainerRef.current, {
            x: 4, duration: 0.05, ease: 'power1.inOut'
          })
          .to(shakeContainerRef.current, {
            x: -2, duration: 0.05, ease: 'power1.inOut'
          })
          .to(shakeContainerRef.current, {
            x: 0, duration: 0.05, ease: 'power1.inOut'
          });

        } else if (idx === 1 && stat2ValueRef.current) {
          // ₹4,000 Cr
          const count = { val: 0 };
          tl.to(count, {
            val: 4000,
            duration: 0.8,
            ease: 'expo.out',
            onUpdate: () => {
              if (stat2ValueRef.current) {
                stat2ValueRef.current.innerText = Math.floor(count.val).toLocaleString();
              }
            }
          }, delay);
        }
      });

      // 4. Quote SLAM
      tl.fromTo(closingRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'expo.out' },
        '-=0.2'
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="tribe"
      className="relative min-h-[120vh] bg-[#0A0A0A] overflow-hidden select-none"
    >
      <div ref={shakeContainerRef} className="relative w-full h-full min-h-[120vh] flex flex-col pt-32 pb-40 px-6 md:px-12 z-20">

        {/* --- BACKGROUND EFFECTS --- */}
        
        {/* Aggressive Pulsing Core Glow */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden"
        >
          <div className="w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] rounded-full bg-[#FF0000]/[0.08] blur-[150px] animate-beat-pulse" />
        </div>

        {/* Heavy Parallax Ghost Text */}
        <div 
          ref={ghostTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
          style={{ opacity: 0.06 }}
        >
          <h1 
            className="font-syne font-black text-white leading-none tracking-tighter uppercase whitespace-nowrap -rotate-3 select-none"
            style={{ fontSize: 'clamp(200px, 35vw, 600px)', WebkitTextStroke: '4px white', color: 'transparent' }}
          >
            LOUD
          </h1>
        </div>

        {/* Dynamic Equalizer Bars */}
        <div className="absolute bottom-0 left-0 w-full h-[150px] flex items-end justify-center gap-1 opacity-20 z-0 pointer-events-none overflow-hidden">
          {[...Array(40)].map((_, i) => {
            // Use deterministic math functions instead of Math.random() to prevent SSR hydration mismatches
            const heightPercentage = Math.abs(Math.sin(i * 0.5)) * 60 + 40;
            const animationDuration = Math.abs(Math.cos(i * 0.3)) * 0.4 + 0.4;
            
            return (
              <div 
                key={`eq-${i}`}
                className="w-4 bg-accent-red rounded-t-sm"
                style={{
                  height: `${heightPercentage}%`,
                  animation: `eq-bounce ${animationDuration}s infinite alternate ease-in-out`
                }}
              />
            );
          })}
        </div>

        {/* Film grain texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none z-10 mix-blend-overlay" />

        {/* --- FOREGROUND CONTENT --- */}
        
        <div className="relative z-30 w-full max-w-[1400px] mx-auto h-full flex flex-col">
          
          {/* Asymmetric Dominant Headline */}
          <div className="w-full flex flex-col items-start mb-24 md:mb-32">
            <h2 
              ref={headlineLine1Ref}
              className="font-syne font-black text-[#F5F5F5] tracking-tighter uppercase leading-[0.85] opacity-0"
              style={{ fontSize: 'clamp(64px, 12vw, 200px)' }}
            >
              60 MILLION INDIANS.
            </h2>
            <h2 
              ref={headlineLine2Ref}
              className="font-syne font-black tracking-tighter uppercase leading-[0.85] opacity-0 mt-2 md:mt-4 ml-0 md:ml-12"
              style={{ 
                fontSize: 'clamp(64px, 12vw, 200px)',
                WebkitTextStroke: '2px #FF0000',
                color: 'transparent'
              }}
            >
              ONE FREQUENCY.
            </h2>
          </div>

          {/* Asymmetric Stats Layout (No Cards) */}
          <div className="relative w-full flex flex-col gap-24 md:gap-0">
            
            {/* Stat 1: Massive 60M+ (Top Rightish) */}
            <div 
              ref={(el) => { if (el) statWrappersRef.current[0] = el; }}
              className="md:absolute md:-top-10 md:right-[5%] flex flex-col items-start md:items-end opacity-0"
            >
              <div className="stat-num-element flex items-baseline font-syne font-black leading-[0.8] drop-shadow-[0_0_20px_rgba(255,0,0,0.3)]">
                <span ref={stat1ValueRef} className="tracking-tighter" style={{ fontSize: 'clamp(80px, 15vw, 220px)' }}>0</span>
                <span className="text-accent-red font-bold" style={{ fontSize: 'clamp(50px, 8vw, 120px)' }}>+</span>
                <span className="text-[#888888] font-bold ml-2" style={{ fontSize: 'clamp(30px, 5vw, 80px)' }}>M</span>
              </div>
              <div className="stat-underline w-full max-w-[80%] h-2 bg-accent-red mt-2 -rotate-2" />
              <span className="font-mono text-sm md:text-lg tracking-[0.3em] text-[#888888] uppercase mt-4">
                Customers
              </span>
            </div>

            {/* Stat 2: ₹4,000 Cr (Mid Left) */}
            <div 
              ref={(el) => { if (el) statWrappersRef.current[1] = el; }}
              className="md:absolute md:top-[180px] md:left-[10%] flex flex-col items-start opacity-0"
            >
              <div className="stat-num-element flex items-baseline font-syne font-black leading-[0.8] drop-shadow-[0_0_15px_rgba(255,0,0,0.2)]">
                <span className="text-[#888888] font-bold mr-2" style={{ fontSize: 'clamp(24px, 4vw, 50px)' }}>₹</span>
                <span ref={stat2ValueRef} className="tracking-tighter" style={{ fontSize: 'clamp(60px, 10vw, 140px)' }}>0</span>
                <span className="text-[#888888] font-bold ml-2" style={{ fontSize: 'clamp(24px, 4vw, 50px)' }}>Cr</span>
              </div>
              <div className="stat-underline w-full max-w-[90%] h-1 bg-accent-red mt-2 rotate-1" />
              <span className="font-mono text-xs md:text-base tracking-[0.3em] text-[#888888] uppercase mt-4">
                Annual Revenue
              </span>
            </div>

            {/* Stat 3: #1 Audio Brand (Bottom Center-Right) */}
            <div 
              ref={(el) => { if (el) statWrappersRef.current[2] = el; }}
              className="md:absolute md:top-[400px] md:right-[25%] flex flex-col items-start opacity-0"
            >
              <div className="stat-num-element flex items-baseline font-syne font-black leading-[0.8]">
                <span className="text-accent-red font-bold mr-1" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>#</span>
                <span className="text-white tracking-tighter" style={{ fontSize: 'clamp(60px, 10vw, 140px)' }}>1</span>
              </div>
              <div className="stat-underline w-full h-[2px] bg-accent-red mt-2 -rotate-1" />
              <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#888888] uppercase mt-4">
                Audio Brand in India
              </span>
            </div>

            {/* Stat 4: #2 Wearable (Bottom Left) */}
            <div 
              ref={(el) => { if (el) statWrappersRef.current[3] = el; }}
              className="md:absolute md:top-[500px] md:left-[5%] flex flex-col items-start opacity-0"
            >
              <div className="stat-num-element flex items-baseline font-syne font-black leading-[0.8]">
                <span className="text-accent-red font-bold mr-1" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>#</span>
                <span className="text-white tracking-tighter" style={{ fontSize: 'clamp(60px, 10vw, 140px)' }}>2</span>
              </div>
              <div className="stat-underline w-full h-[2px] bg-accent-red mt-2 rotate-2" />
              <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#888888] uppercase mt-4">
                Wearable Brand Globally
              </span>
            </div>

            {/* Spacer for absolute positioning layout on desktop */}
            <div className="hidden md:block w-full h-[600px] pointer-events-none" />

          </div>

          {/* Aggressive Quote Statement */}
          <div className="w-full flex justify-end mt-24 md:mt-16 z-30">
            <p 
              ref={closingRef}
              className="font-fraunces italic font-black text-right text-white tracking-tight leading-[1.1] max-w-[800px] opacity-0"
              style={{ fontSize: 'clamp(32px, 5vw, 70px)' }}
            >
              Sound of <span className="text-accent-red">champions</span>. <br className="hidden md:block" />Built in India. <br />Heard <span className="text-accent-red">everywhere</span>.
            </p>
          </div>

        </div>
      </div>

      {/* Embedded CSS Animations for High Performance Aggression */}
      <style jsx global>{`
        @keyframes beat-pulse {
          0% { transform: scale(0.95); opacity: 0.6; }
          10% { transform: scale(1.15); opacity: 1; }
          20% { transform: scale(1.0); opacity: 0.8; }
          100% { transform: scale(0.95); opacity: 0.6; }
        }
        .animate-beat-pulse {
          animation: beat-pulse 0.85s infinite ease-out;
        }
        @keyframes eq-bounce {
          0% { transform: scaleY(0.2); opacity: 0.1; transform-origin: bottom; }
          100% { transform: scaleY(1); opacity: 0.4; transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}

