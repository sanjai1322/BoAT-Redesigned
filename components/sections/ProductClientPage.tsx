'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/sections/Footer';

interface ProductClientPageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductClientPage({ product, relatedProducts }: ProductClientPageProps) {
  // State management
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [displayImage, setDisplayImage] = useState(product.colors[0]?.image || product.image);
  const [addedState, setAddedState] = useState(false);

  // Reset color selection when navigating between products
  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setDisplayImage(product.colors[0]?.image || product.image);
  }, [product.slug, product.colors, product.image]);

  // GSAP animation references
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Dynamic Discount Calculation
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAddedState(true);
    setTimeout(() => {
      setAddedState(false);
    }, 2000);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Highlights GSAP ScrollTrigger
      if (highlightsRef.current) {
        gsap.fromTo(
          highlightsRef.current.querySelectorAll('.highlight-item'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 2. Specs ScrollTrigger
      if (specsRef.current) {
        gsap.fromTo(
          specsRef.current.querySelectorAll('.spec-item'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: specsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // 3. Reviews ScrollTrigger
      if (reviewsRef.current) {
        gsap.fromTo(
          reviewsRef.current.querySelectorAll('.review-card'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: reviewsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [product.slug]);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-bg-primary text-text-primary overflow-x-hidden selection:bg-accent-red selection:text-bg-primary">
      <Navbar />

      {/* Main Split Screen Container */}
      <div className="flex flex-col lg:flex-row min-h-screen w-full relative">
        
        {/* ================= LEFT HALF (Desktop: Sticky, Pinned) ================= */}
        <div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 bg-[#070707] flex items-center justify-center overflow-hidden h-[55vh] md:h-[65vh] relative z-10 border-b lg:border-b-0 lg:border-r border-white/5">
          {/* Dynamic Per-Color Radial Glow — each color gets its own layer, opacity toggles smoothly */}
          {product.colors.map((color) => (
            <div
              key={color.name}
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background: `radial-gradient(circle at center, ${color.glowColor} 0%, transparent 65%)`,
                opacity: selectedColor.name === color.name ? 0.55 : 0,
                filter: 'blur(80px)',
                transition: 'opacity 600ms ease',
              }}
            />
          ))}
          
          {/* Concentric Animated Soundwave Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full border border-accent-red/10 animate-ping opacity-40 absolute" style={{ animationDuration: '6s' }} />
            <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border border-accent-red/5 animate-pulse absolute" />
            <div className="w-[100px] h-[100px] md:w-[180px] md:h-[180px] rounded-full border border-white/5 absolute" />
          </div>

          {/* Product Big Text Overlay */}
          <div className="absolute font-syne font-black text-white/[0.02] text-[12vw] tracking-tighter uppercase select-none pointer-events-none z-0 text-center leading-none">
            {product.name.split(' ')[0]}
          </div>

          {/* Floating Product Image — Cross-fade via AnimatePresence */}
          <motion.div
            className="relative z-10 w-[240px] h-[240px] md:w-[360px] md:h-[360px] flex items-center justify-center filter drop-shadow-[0_20px_50px_rgba(255,0,0,0.25)]"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={displayImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={displayImage}
                  alt={`${product.name} — ${selectedColor.name}`}
                  fill
                  className="object-contain"
                  priority
                  onError={() => setDisplayImage(product.image)}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ================= RIGHT HALF (Scrollable) ================= */}
        <div className="w-full lg:w-1/2 px-6 md:px-12 lg:px-20 py-10 lg:py-24 flex flex-col justify-start relative z-20 bg-bg-primary">
          
          {/* 1. Breadcrumbs */}
          <nav className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-text-muted uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-accent-red transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#category" className="hover:text-accent-red transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-text-primary">{product.category}</span>
          </nav>

          {/* 2. Product Header */}
          <div className="mb-8">
            <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-accent-red uppercase block mb-3">
              {"// " + product.category}
            </span>
            <h1 className="font-syne font-black text-4xl md:text-6xl lg:text-[72px] leading-[0.95] tracking-tight uppercase mb-4 text-[#F5F5F5]">
              {product.name}
            </h1>
            <p className="font-fraunces italic font-normal text-xl md:text-2xl text-text-muted mb-6">
              {product.tagline}
            </p>

            {/* Price block */}
            <div className="flex items-center gap-4">
              <span className="font-syne font-black text-2xl md:text-3xl text-text-primary">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="font-mono text-sm md:text-base text-text-muted line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="bg-accent-red/10 text-accent-red border border-accent-red/20 font-mono text-[11px] md:text-xs tracking-wider uppercase px-2.5 py-1 rounded-sm">
                {discountPercentage}% OFF
              </span>
            </div>
          </div>

          {/* Description Paragraph */}
          <p className="text-[#A5A5A5] text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            Experience high-fidelity sound reimagined with boAt signature acoustics. Engineered for pure sonic perfection, this device delivers thumping active bass, premium styling comfort, and long-lasting performance for everyday true audiophiles.
          </p>

          {/* 3. Color Picker */}
          <div className="mb-10 border-t border-white/5 pt-8">
            <span className="font-mono text-xs tracking-[0.25em] text-[#888888] uppercase block mb-4">
              {"CHOOSE COLOR // "} <span className="text-text-primary">Selected: {selectedColor.name}</span>
            </span>
            
            <div className="flex items-center gap-4">
              {product.colors.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 relative border ${
                      isSelected ? 'border-transparent scale-110' : 'border-white/10 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => {
                      setSelectedColor(color);
                      setDisplayImage(color.image || product.image);
                    }}
                    aria-label={`Select color ${color.name}`}
                  >
                    {isSelected && (
                      <span className="absolute -inset-[4px] rounded-full border-2 border-accent-red" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Add to Cart Actions */}
          <div className="mb-10 space-y-4 max-w-md">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 bg-accent-red text-text-primary font-syne font-medium uppercase tracking-widest text-sm hover:bg-red-500 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 min-h-[50px] flex items-center justify-center`}
            >
              {addedState ? 'ADDED ✓' : `ADD TO CART — ₹${product.price.toLocaleString('en-IN')}`}
            </button>

            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-transparent border border-accent-red text-accent-red font-syne font-medium uppercase tracking-widest text-sm hover:bg-accent-red hover:text-text-primary transition-all duration-300 min-h-[50px]"
            >
              BUY NOW
            </button>

            <div className="flex justify-center text-center font-mono text-[9px] md:text-[10px] tracking-[0.15em] text-text-muted uppercase gap-2 pt-2">
              <span>Free express delivery</span>
              <span>·</span>
              <span>1-year warranty</span>
              <span>·</span>
              <span>7-day replacement</span>
            </div>
          </div>

          {/* 5. Highlights (Scroll animation on desk) */}
          <div ref={highlightsRef} className="mb-16 border-t border-white/5 pt-12">
            <span className="font-mono text-xs tracking-[0.25em] text-accent-red uppercase block mb-8">
              {"// WHY YOU'LL LOVE IT"}
            </span>

            <div className="space-y-6">
              {product.highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="highlight-item flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/5 gap-2 md:gap-8 opacity-0"
                >
                  <div className="flex items-baseline gap-4 md:w-1/3">
                    <span className="font-syne font-black text-3xl md:text-4xl text-accent-red leading-none min-w-[70px]">
                      {highlight.value}
                    </span>
                    <span className="font-mono text-xs tracking-wider text-text-primary uppercase">
                      {highlight.label}
                    </span>
                  </div>
                  
                  <p className="text-sm text-[#A5A5A5] md:w-2/3 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Specifications */}
          <div ref={specsRef} className="mb-16 border-t border-white/5 pt-12">
            <span className="font-mono text-xs tracking-[0.25em] text-[#888888] uppercase block mb-8">
              {"// THE DETAILS"}
            </span>

            <div className="space-y-4">
              {Object.entries(product.specs).map(([key, val], idx) => (
                <div 
                  key={idx}
                  className="spec-item flex justify-between py-3 border-b border-white/5 text-sm opacity-0"
                >
                  <span className="font-mono text-text-muted uppercase tracking-wider">{key}</span>
                  <span className="font-medium text-[#F5F5F5]">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Reviews */}
          <div ref={reviewsRef} className="mb-16 border-t border-white/5 pt-12">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-2">
              <span className="font-mono text-xs tracking-[0.25em] text-[#888888] uppercase">
                {"// FROM THE TRIBE"}
              </span>
              <span className="font-mono text-xs text-accent-red">
                {product.overallRating} ★ · {product.reviewCount.toLocaleString()} reviews
              </span>
            </div>

            <div className="space-y-4">
              {product.reviews.map((review, idx) => (
                <div 
                  key={idx}
                  className="review-card p-6 bg-[#0E0E0E] border border-white/5 rounded-none flex flex-col gap-3 opacity-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-wider text-text-primary">{review.name}</span>
                    <div className="flex gap-0.5 text-accent-red">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-xs">
                          {i < Math.floor(review.rating) ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#888888] leading-relaxed italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Related Products Row */}
          <div className="border-t border-white/5 pt-12 mb-10">
            <span className="font-mono text-xs tracking-[0.25em] text-accent-red uppercase block mb-8">
              {"// PAIR IT WITH"}
            </span>

            {/* Desktop grid & Mobile scroll carousel */}
            <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory">
              {relatedProducts.map((p) => (
                <Link
                  href={`/product/${p.slug}`}
                  key={p.slug}
                  className="group flex-none w-[200px] lg:w-auto snap-start bg-[#0E0E0E] border border-white/5 p-4 flex flex-col hover:border-accent-red/40 transition-colors duration-300"
                >
                  <div className="relative w-full aspect-square bg-[#070707] flex items-center justify-center mb-4 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-[70%] h-[70%] group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <span className="font-mono text-[9px] tracking-wider text-[#888888] uppercase block mb-1">
                    {p.category.split(' ')[0]}
                  </span>
                  <h3 className="font-syne font-bold text-sm text-[#F5F5F5] group-hover:text-accent-red transition-colors uppercase truncate">
                    {p.name}
                  </h3>
                  <span className="font-mono text-xs text-text-primary mt-2">
                    ₹{p.price.toLocaleString('en-IN')}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ================= MOBILE STICKY BOTTOM ACTION BAR ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#0A0A0A] border-t border-white/10 px-6 py-4 flex items-center justify-between z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.9)]">
        <div className="flex flex-col">
          <span className="font-syne font-bold text-xs uppercase text-[#888888] truncate max-w-[120px]">
            {product.name}
          </span>
          <span className="font-syne font-black text-base text-[#F5F5F5] mt-0.5">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="py-3 px-8 bg-accent-red text-text-primary font-syne font-bold text-xs uppercase tracking-widest hover:bg-red-500 transition-colors"
        >
          {addedState ? 'ADDED ✓' : 'ADD TO CART'}
        </button>
      </div>

      {/* Spacing for mobile sticky footer */}
      <div className="lg:hidden h-[76px]" />

      <Footer />
    </main>
  );
}
