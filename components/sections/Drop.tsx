'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  label: string;
  name: string;
  tagline: string;
  image: string;
  ghostWord: string;
  price: number;
  slug: string;
  glowColor: string;
}

const products: Product[] = [
  {
    id: "01",
    label: "01 / 04",
    name: "Airdopes Nirvana",
    tagline: "Silence the world.",
    image: "/products/product-airdopes.png",
    ghostWord: "AIRDOPES",
    price: 1999,
    slug: "airdopes-nirvana",
    glowColor: "rgba(255,45,45,0.45)"
  },
  {
    id: "02",
    label: "02 / 04",
    name: "Stone Speakers",
    tagline: "Built loud.",
    image: "/products/product-stone.png",
    ghostWord: "STONE",
    price: 4999,
    slug: "stone-speakers",
    glowColor: "rgba(255,100,40,0.40)"
  },
  {
    id: "03",
    label: "03 / 04",
    name: "Wave Smartwatch",
    tagline: "Time, amplified.",
    image: "/products/product-wave.png",
    ghostWord: "WAVE",
    price: 2799,
    slug: "wave-smartwatch",
    glowColor: "rgba(255,45,45,0.40)"
  },
  {
    id: "04",
    label: "04 / 04",
    name: "Rockerz Headphones",
    tagline: "Bass that bruises.",
    image: "/products/product-rockerz.png",
    ghostWord: "ROCKERZ",
    price: 2999,
    slug: "rockerz-headphones",
    glowColor: "rgba(180,20,20,0.50)"
  }
];

export default function Drop() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const { addToCart } = useCart();

  const handleAddToCart = (item: Product) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image });
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  const scrollToIndex = (idx: number) => {
    if (typeof window === 'undefined') return;
    const st = ScrollTrigger.getById('drop-scroll-trigger');
    if (st) {
      const start = st.start;
      const end = st.end;
      const targetScroll = start + (idx / 3) * (end - start);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.product-panel') as HTMLElement[];
      const mm = gsap.matchMedia();

      // DESKTOP: 768px and above (GSAP horizontal pinning and scroll-jack)
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current!;
        
        // 1. Horizontal translation tween
        // end is dynamically computed: total horizontal travel = track width - one viewport width
        const scrollTween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            id: 'drop-scroll-trigger',
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => '+=' + (track.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: { min: 0.2, max: 0.4 },
              delay: 0.05,
            },
            onUpdate: (self) => {
              const progress = self.progress;
              const index = Math.round(progress * 3);
              setActiveIndex(index);
            }
          }
        });

        // 2. Animate elements on EACH panel dynamically as it moves into viewport
        panels.forEach((panel) => {
          // LAYER 1: Background Ghost Parallax (Drifts right, moves slower at 0.5x)
          gsap.fromTo(panel.querySelector('.ghost-text'),
            { x: -150 },
            {
              x: 150,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              }
            }
          );

          // LAYER 3: Product Image (Scale & Fade in at normal 1x speed)
          gsap.fromTo(panel.querySelector('.panel-image'),
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left 75%',
                toggleActions: 'play none none reverse',
              }
            }
          );

          // LAYER 4: Foreground Text Parallax (Drifts left, moves faster at 1.1x)
          gsap.fromTo(panel.querySelector('.panel-text-container'),
            { x: 80 },
            {
              x: -80,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              }
            }
          );

          // LAYER 4: Staggered text entrances for sharp elements
          gsap.fromTo(panel.querySelectorAll('.panel-text-element'),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left 70%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        });

      });

      // MOBILE: under 768px (Normal vertical stack scroll triggers)
      mm.add("(max-width: 767px)", () => {
        panels.forEach((panel) => {
          // Fade in product image
          gsap.fromTo(panel.querySelector('.panel-image'),
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              }
            }
          );

          // Staggered text elements
          gsap.fromTo(panel.querySelectorAll('.panel-text-element'),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        });
      });

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* PINNED TRACK CONTAINER */}
      <div 
        ref={triggerRef}
        id="drop"
        className="relative w-full bg-[#000000] overflow-x-hidden scroll-mt-24 bg-grain"
      >

        <div className="relative md:h-screen md:w-full md:overflow-hidden z-20 flex flex-col justify-between">
          
          {/* Horizontal scroll track */}
          <div 
            ref={trackRef}
            className="flex flex-col md:flex-row w-full md:w-[400vw] h-auto md:h-full justify-start items-stretch"
          >
            {products.map((item) => (
              <section
                key={`product-${item.id}`}
                className="product-panel relative w-full md:w-[100vw] h-[90vh] md:h-full flex flex-col md:flex-row items-center justify-center bg-[#000000] py-16 md:py-0 overflow-hidden"
              >
                
                {/* LAYER 1 — Background ghost typography (z-0) */}
                <div 
                  className="ghost-text absolute md:left-0 md:top-0 font-syne font-extrabold text-[#F5F5F5] select-none pointer-events-none z-0 tracking-tighter uppercase leading-[0.8] opacity-[0.08] md:text-left text-center md:translate-x-0 md:translate-y-0"
                  style={{
                    fontSize: 'clamp(200px, 28vw, 500px)',
                    left: '-5%',
                    top: '-5%'
                  }}
                >
                  <span className="hidden md:block">{item.ghostWord}</span>
                </div>

                <div 
                  className="absolute font-syne font-extrabold text-[#F5F5F5]/[0.08] select-none pointer-events-none z-0 tracking-tighter uppercase leading-[0.8] text-center w-full md:hidden"
                  style={{
                    fontSize: 'clamp(120px, 24vw, 180px)',
                    left: '50%',
                    top: '25%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {item.ghostWord}
                </div>

                {/* LAYER 2 — BOLD atmospheric glow & rings (z-10, INSIDE the panel) */}
                {/* ===== DESKTOP GLOW (hidden on mobile) ===== */}
                {/* Secondary deep glow — fills broader left area */}
                <div 
                  className="absolute pointer-events-none z-[5] hidden md:block"
                  style={{
                    width: '1100px',
                    height: '1100px',
                    left: '35%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(120,20,20,0.25) 0%, transparent 70%)',
                    borderRadius: '50%',
                  }}
                />
                {/* Primary product glow — clearly visible warm red */}
                <div 
                  className="absolute pointer-events-none z-[6] hidden md:block"
                  style={{
                    width: '800px',
                    height: '800px',
                    left: '35%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(255,45,45,0.22) 0%, rgba(255,45,45,0.12) 30%, transparent 65%)',
                    filter: 'blur(40px)',
                    borderRadius: '50%',
                  }}
                />
                {/* 4 Concentric rings — clearly visible at 0.25 opacity */}
                {[300, 500, 700, 900].map((size, i) => (
                  <div
                    key={`ring-${item.id}-${i}`}
                    className="absolute pointer-events-none z-[7] hidden md:block animate-soundwave"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      left: '35%',
                      top: '50%',
                      border: '1px solid rgba(255,45,45,0.18)',
                      borderRadius: '50%',
                      animationDelay: `${i * 1}s`,
                      animationDuration: '4s',
                    }}
                  />
                ))}
                {/* Floating dust particles (desktop) */}
                {[
                  { left: '15%', size: 2.5, delay: 0, dur: 18 },
                  { left: '28%', size: 2, delay: 4, dur: 22 },
                  { left: '42%', size: 3, delay: 2, dur: 16 },
                  { left: '55%', size: 2, delay: 8, dur: 20 },
                  { left: '68%', size: 2.5, delay: 6, dur: 24 },
                ].map((p, i) => (
                  <div
                    key={`dust-${item.id}-${i}`}
                    className="absolute rounded-full pointer-events-none z-[7] hidden md:block animate-drift-up"
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      left: p.left,
                      bottom: '0%',
                      background: i % 2 === 0 ? 'rgba(255,45,45,0.6)' : 'rgba(255,255,255,0.35)',
                      animationDelay: `${p.delay}s`,
                      animationDuration: `${p.dur}s`,
                    }}
                  />
                ))}

                {/* ===== MOBILE GLOW (hidden on desktop) ===== */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 md:hidden">
                  {/* Mobile primary glow */}
                  <div 
                    className="absolute w-[400px] h-[400px] rounded-full"
                    style={{ 
                      background: 'radial-gradient(circle, rgba(255,45,45,0.22) 0%, rgba(255,45,45,0.10) 35%, transparent 65%)',
                      filter: 'blur(30px)',
                      left: '50%',
                      top: '30%',
                      transform: 'translate(-50%, -50%)'
                    }} 
                  />
                  {/* Mobile deep fill glow */}
                  <div 
                    className="absolute w-[550px] h-[550px] rounded-full"
                    style={{ 
                      background: 'radial-gradient(circle, rgba(120,20,20,0.25) 0%, transparent 70%)',
                      left: '50%',
                      top: '30%',
                      transform: 'translate(-50%, -50%)'
                    }} 
                  />
                  {/* Mobile concentric rings */}
                  {[250, 400].map((size, i) => (
                    <div 
                      key={`mring-${item.id}-${i}`}
                      className="absolute rounded-full animate-soundwave"
                      style={{ 
                        width: `${size}px`,
                        height: `${size}px`,
                        left: '50%',
                        top: '30%',
                        border: '1px solid rgba(255,45,45,0.15)',
                        animationDelay: `${i * 1.5}s`,
                        animationDuration: '4s',
                      }}
                    />
                  ))}
                </div>

                {/* LAYER 3 — The product (z-20) */}
                {/* Desktop Product Wrapper */}
                <div 
                  className="hidden md:flex absolute left-[35%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-[50vw] h-[65vh] items-center justify-center z-20"
                >
                  <div className="panel-image relative flex items-center justify-center w-full h-full max-w-[550px] aspect-square rounded-full">
                    <div className="animate-float-gear flex items-center justify-center w-full h-full">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        width={600}
                        height={600}
                        className="w-full h-full object-contain filter drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]"
                        priority={item.id === "01"}
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Product Wrapper */}
                <div 
                  className="relative w-full h-[45vh] flex items-center justify-center z-20 md:hidden"
                  style={{ top: '-5vh' }}
                >
                  <div className="panel-image relative flex items-center justify-center w-full h-full max-w-[320px] aspect-square">
                    <div className="animate-float-gear flex items-center justify-center w-full h-full">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        width={360}
                        height={360}
                        className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        priority={item.id === "01"}
                      />
                    </div>
                  </div>
                </div>

                {/* LAYER 4 — Foreground text (z-30) */}
                {/* Desktop Text Block (overlapping right edge of product) */}
                <div 
                  className="panel-text-container hidden md:flex absolute left-[58%] top-1/2 -translate-y-1/2 w-[35vw] max-w-xl flex-col items-start justify-center z-30 select-text"
                >
                  {/* Label: 01 / 04 */}
                  <div className="panel-text-element mb-4">
                    <span className="font-mono text-sm tracking-[0.2em] text-accent-red font-bold">
                      {item.label}
                    </span>
                  </div>

                  {/* Product Name */}
                  <div className="panel-text-element mb-4 max-w-lg">
                    <h3 className="font-syne font-extrabold text-text-primary leading-[0.95] tracking-tighter" style={{ fontSize: 'clamp(48px, 5.5vw, 88px)' }}>
                      {item.name}
                    </h3>
                  </div>

                  {/* Tagline */}
                  <div className="panel-text-element mb-8">
                    <p className="font-fraunces italic font-normal text-text-primary leading-tight" style={{ fontSize: 'clamp(24px, 2.5vw, 36px)' }}>
                      {item.tagline}
                    </p>
                  </div>

                  {/* CTA Explore Link & Add to Cart */}
                  <div className="panel-text-element flex items-center gap-6">
                    <Link 
                      href={`/product/${item.slug}`}
                      className="group font-mono text-sm text-accent-red tracking-widest flex items-center gap-2 font-bold"
                    >
                      <span>EXPLORE</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`font-mono text-sm tracking-widest font-bold px-4 py-2 border transition-all duration-300 ${
                        addedItemIds[item.id]
                          ? 'bg-accent-red border-accent-red text-white'
                          : 'border-accent-red text-accent-red hover:bg-accent-red hover:text-white'
                      }`}
                    >
                      {addedItemIds[item.id] ? 'ADDED ✓' : 'ADD TO CART'}
                    </button>
                  </div>
                </div>

                {/* Mobile Text Block (centered below product) */}
                <div 
                  className="panel-text-container relative w-full flex flex-col items-center text-center z-30 px-6 md:hidden"
                  style={{ top: '-2vh' }}
                >
                  {/* Label: 01 / 04 */}
                  <div className="panel-text-element mb-2">
                    <span className="font-mono text-xs tracking-[0.2em] text-accent-red font-bold">
                      {item.label}
                    </span>
                  </div>

                  {/* Product Name */}
                  <div className="panel-text-element mb-2 w-full">
                    <h3 className="font-syne font-extrabold text-text-primary text-3xl sm:text-4xl leading-tight tracking-tighter">
                      {item.name}
                    </h3>
                  </div>

                  {/* Tagline */}
                  <div className="panel-text-element mb-5">
                    <p className="font-fraunces italic font-normal text-text-primary text-lg sm:text-xl leading-tight">
                      {item.tagline}
                    </p>
                  </div>

                  {/* CTA Explore Link & Add to Cart */}
                  <div className="panel-text-element flex flex-col items-center gap-4 mt-2 w-full">
                    <Link 
                      href={`/product/${item.slug}`}
                      className="group font-mono text-xs text-accent-red tracking-widest flex items-center gap-2 font-bold"
                    >
                      <span>EXPLORE</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`font-mono text-xs tracking-widest font-bold px-6 py-3 border w-full max-w-[200px] transition-all duration-300 ${
                        addedItemIds[item.id]
                          ? 'bg-accent-red border-accent-red text-white'
                          : 'border-accent-red text-accent-red hover:bg-accent-red hover:text-white'
                      }`}
                    >
                      {addedItemIds[item.id] ? 'ADDED ✓' : 'ADD TO CART'}
                    </button>
                  </div>
                </div>

              </section>
            ))}
          </div>

          {/* 3. PAGINATION DOTS (Desktop Only, Bottom-Center of sticky wrapper) */}
          <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-4 z-30 select-none">
            {products.map((_, idx) => (
              <button 
                key={`dot-${idx}`}
                onClick={() => scrollToIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer outline-none pointer-events-auto border-none p-0 ${
                  activeIndex === idx 
                    ? 'w-6 bg-accent-red opacity-100' 
                    : 'w-2 bg-text-muted opacity-30 hover:opacity-60'
                }`}
                aria-label={`Go to product ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
