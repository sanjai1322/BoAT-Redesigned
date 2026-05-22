'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen flex flex-col justify-center items-center text-center bg-bg-primary overflow-hidden select-none">
      
      {/* Background Video Layer */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none"
        poster="/videos/hero-earbud-poster.jpg"
      >
        <source src="/videos/hero-earbud.mp4" type="video/mp4" />
      </video>

      {/* Spacers / Vignettes & Gradients Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/40 to-bg-primary/80 z-10 pointer-events-none" />
      <div className="hero-vignette absolute inset-0 z-10 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 w-full max-w-6xl">
        
        {/* 1. Top label: Fades in first (delay 0.2s, duration 0.6s) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="mb-8 md:mb-10"
        >
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-text-muted uppercase">
            CODE CONSTELLATION&nbsp;&nbsp;/&nbsp;&nbsp;CASE STUDY 001
          </span>
        </motion.div>

        {/* 2. Massive headline (centered, 80px margin top / optimized for responsive padding) */}
        <div className="flex flex-col items-center justify-center font-syne font-extrabold leading-[0.9] tracking-tighter">
          
          {/* Line 1: PLUG INTO (delay 0.6s, duration 0.8s) */}
          <div className="overflow-hidden pb-1 md:pb-2">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-text-primary text-[52px] sm:text-[72px] md:text-[88px] lg:text-[96px] whitespace-nowrap"
            >
              PLUG INTO
            </motion.h1>
          </div>

          {/* Line 2: NIRVANA. (delay 1.0s, duration 0.8s, custom text shadow pulsing glow) */}
          <div className="overflow-hidden pt-1 pb-2">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-accent-red text-[80px] sm:text-[110px] md:text-[140px] lg:text-[160px] whitespace-nowrap animate-glow-pulse"
            >
              NIRVANA.
            </motion.h1>
          </div>

        </div>

        {/* 3. Thin red divider: scales from 0 to 80px width (delay 1.6s, duration 0.5s) */}
        <div className="mt-10 mb-6 flex justify-center items-center w-full h-[1px]">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5, ease: "easeOut" }}
            className="w-[80px] h-[1px] bg-accent-red origin-center"
          />
        </div>

        {/* 4. Subtitle caption: Fades in (delay 1.9s, duration 0.5s) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.5, ease: "easeOut" }}
          className="font-mono text-[10px] md:text-xs tracking-[0.35em] text-text-muted uppercase"
        >
          {"INDIA'S #1 AUDIO BRAND. REIMAGINED."}
        </motion.p>

      </div>

      {/* 5. Bottom Scroll indicator: Fades in (delay 2.3s, duration 0.5s) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none select-none z-20"
      >
        <div className="w-[1px] h-[40px] bg-accent-red animate-pulse-scroll" />
        <span className="font-mono text-[9px] tracking-[0.3em] text-text-muted uppercase animate-pulse-scroll mt-1">
          SCROLL
        </span>
      </motion.div>

    </section>
  );
}
