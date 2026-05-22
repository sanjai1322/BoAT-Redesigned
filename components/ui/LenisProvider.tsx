'use client';

import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    // Connect Lenis scroll event to ScrollTrigger update loop
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Add Lenis to GSAP ticker so scroll and animation update concurrently
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Provide lenis instance globally for potential other components to tap into
    (window as Window & { lenisInstance?: Lenis }).lenisInstance = lenis;

    // Refresh ScrollTrigger after layout settles so pin-spacer heights are accurate
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as Window & { lenisInstance?: Lenis }).lenisInstance;
    };
  }, []);

  return <>{children}</>;
}
