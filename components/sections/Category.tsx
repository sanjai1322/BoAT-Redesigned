'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '@/context/CartContext';

interface CategoryItem {
  id: string;
  name: string;
  count: string;
  image: string;
  gridSpan: string;
  imgSizeClass: string;
  imgOffsetClass: string;
  price: number;
  slug: string;
}

const categories: CategoryItem[] = [
  {
    id: "01",
    name: 'Earbuds',
    count: '24 Products',
    image: '/products/cat-earbuds.png',
    gridSpan: 'md:col-span-7',
    imgSizeClass: 'w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]',
    imgOffsetClass: 'right-[5%] top-[10%] sm:right-[10%]',
    price: 1999,
    slug: 'airdopes-nirvana'
  },
  {
    id: "04",
    name: 'Headphones',
    count: '16 Products',
    image: '/products/cat-headphones.png',
    gridSpan: 'md:col-span-5',
    imgSizeClass: 'w-[160px] h-[160px] sm:w-[200px] sm:h-[200px]',
    imgOffsetClass: 'right-[5%] top-[12%]',
    price: 2999,
    slug: 'rockerz-headphones'
  },
  {
    id: "02",
    name: 'Speakers',
    count: '18 Products',
    image: '/products/cat-speakers.png',
    gridSpan: 'md:col-span-4',
    imgSizeClass: 'w-[140px] h-[140px] sm:w-[170px] sm:h-[170px]',
    imgOffsetClass: 'right-[5%] top-[15%]',
    price: 4999,
    slug: 'stone-speakers'
  },
  {
    id: "03",
    name: 'Smartwatches',
    count: '12 Products',
    image: '/products/cat-smartwatches.png',
    gridSpan: 'md:col-span-4',
    imgSizeClass: 'w-[150px] h-[150px] sm:w-[180px] sm:h-[180px]',
    imgOffsetClass: 'right-[5%] top-[12%]',
    price: 2799,
    slug: 'wave-smartwatch'
  },
  {
    id: "05",
    name: 'Soundbars',
    count: '8 Products',
    image: '/products/cat-soundbars.png', // Reused speaker asset as representative
    gridSpan: 'md:col-span-4',
    imgSizeClass: 'w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] rotate-45', // Rotated for a distinct vibe
    imgOffsetClass: 'right-[5%] top-[12%]',
    price: 8999,
    slug: 'soundbars-signature'
  }
];

export default function Category() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const { addToCart } = useCart();
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const handleAddToCart = (e: React.MouseEvent, item: CategoryItem) => {
    e.stopPropagation();
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image });
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true
        }
      });

      // 1. Fade up the header elements
      if (headerRef.current) {
        tl.fromTo(headerRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
        );
      }

      // 2. Staggered fade in & slide up for category cards
      const validCards = cardRefs.current.filter(Boolean);
      if (validCards.length > 0) {
        tl.fromTo(validCards,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
          '-=0.3'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="category"
      ref={containerRef}
      className="relative w-full bg-[#000000] py-24 md:py-40 px-6 md:px-12 flex flex-col justify-start items-center select-none scroll-mt-24 overflow-hidden"
    >
      {/* Decorative ambient background subtle red light */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-[#FF0000]/[0.02] blur-[150px] pointer-events-none z-0 -top-[20%] left-[50%] -translate-x-1/2" />

      {/* SECTION HEADER */}
      <div 
        ref={headerRef}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start text-left mb-16 md:mb-20"
      >
        <span className="font-mono text-xs md:text-sm tracking-widest text-[#FF0000] mb-4 uppercase">
          — SHOP BY CATEGORY
        </span>
        <h2 
          className="font-syne font-bold text-[#F5F5F5] tracking-tight leading-[1.1]"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
        >
          Find your sound.
        </h2>
      </div>

      {/* ASYMMETRIC CSS GRID */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {categories.map((cat, idx) => (
          <Link
            key={`category-${cat.name}`}
            href={`/product/${cat.slug}`}
            ref={(el) => { if (el) cardRefs.current[idx] = el as unknown as HTMLDivElement; }}
            className={`relative min-h-[320px] md:h-[380px] lg:h-[400px] flex flex-col justify-end p-8 rounded-2xl border border-white/5 bg-[#141414]/60 hover:bg-[#141414] hover:border-[#FF0000]/40 transition-all duration-500 ease-out group overflow-hidden cursor-pointer ${cat.gridSpan}`}
          >
            {/* Subtle red radial ambient glow behind image - active on hover */}
            <div 
              className="absolute w-[250px] h-[250px] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none z-0"
              style={{
                background: 'radial-gradient(circle, rgba(255,0,0,0.18) 0%, transparent 70%)',
                right: '5%',
                top: '5%',
                transform: 'translate(10%, -10%)'
              }}
            />

            {/* Add to Cart Button (Top Left) */}
            <div className="absolute top-6 left-6 z-30">
              <button
                onClick={(e) => handleAddToCart(e, cat)}
                className={`font-mono text-xs md:text-[10px] tracking-widest font-bold px-3 py-1.5 border rounded opacity-100 md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 ${
                  addedItemIds[cat.id]
                    ? 'bg-accent-red border-accent-red text-white'
                    : 'border-accent-red text-accent-red hover:bg-accent-red hover:text-white bg-black/40 backdrop-blur-sm'
                }`}
              >
                {addedItemIds[cat.id] ? 'ADDED ✓' : '+ ADD'}
              </button>
            </div>

            {/* Product image floating inside card */}
            <div className={`absolute pointer-events-none z-10 select-none transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-105 ${cat.imgSizeClass} ${cat.imgOffsetClass}`}>
              <div className="relative w-full h-full">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>
            </div>

            {/* Bottom Section: Text Info + Arrow Icon */}
            <div className="relative z-20 flex justify-between items-end w-full">
              {/* Category details */}
              <div className="flex flex-col items-start gap-1">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] uppercase">
                  {cat.count}
                </span>
                <h3 className="font-syne font-bold text-3xl text-[#F5F5F5] tracking-tighter leading-none group-hover:text-[#FF0000] transition-colors duration-300">
                  {cat.name}
                </h3>
              </div>

              {/* Slider Arrow */}
              <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-[#FF0000]/40 flex items-center justify-center text-[#F5F5F5]/60 group-hover:text-[#FF0000] group-hover:translate-x-1.5 transition-all duration-300 bg-[#1A1A1A]/40 group-hover:bg-[#FF0000]/5">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
