'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered entrance for link columns and sections of the footer
      gsap.fromTo('.footer-animate',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={containerRef}
      className="relative w-full bg-[#050505] pt-24 pb-12 px-6 md:px-12 border-t border-white/10 select-none overflow-hidden"
    >
      {/* Ambient Red Glow in Footer background */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#FF0000]/[0.015] blur-[120px] pointer-events-none z-0 bottom-0 right-0" />
      
      <div ref={contentRef} className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP ROW: Newsletter + Brand */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/5 footer-animate">
          {/* Brand Info (Left) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="font-syne font-extrabold text-[32px] tracking-tighter text-[#F5F5F5]">
              b<span className="text-[#FF0000] font-black">oA</span>t
            </span>
            <p className="font-fraunces italic text-[20px] text-[#888888] mt-3">
              Plug into nirvana.
            </p>
            <p className="font-mono text-[9px] tracking-[0.25em] text-[#555555] uppercase mt-4">
              INDIA&apos;S #1 AUDIO BRAND. REIMAGINED.
            </p>
          </div>

          {/* Newsletter Input (Right) */}
          <div className="lg:col-span-6 flex flex-col items-start lg:items-end w-full">
            <div className="w-full max-w-md">
              <span className="font-mono text-xs tracking-widest text-[#888888] uppercase mb-4 block">
                STAY IN THE LOOP
              </span>
              
              {!subscribed ? (
                <div className="flex items-center gap-3 w-full border-b border-white/20 focus-within:border-[#FF0000] transition-colors duration-300 py-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-transparent text-[#F5F5F5] placeholder-[#888888]/40 focus:outline-none py-1 w-full font-mono text-sm"
                  />
                  <button 
                    onClick={handleSubscribe}
                    className="text-[#FF0000] hover:text-[#F5F5F5] transition-colors duration-200 focus:outline-none p-1"
                  >
                    <span className="hidden sm:inline font-mono text-xs tracking-widest mr-1">SUBSCRIBE</span>
                    <ArrowRight className="w-4 h-4 inline" />
                  </button>
                </div>
              ) : (
                <div className="py-2.5">
                  <p className="font-mono text-sm text-[#FF0000] tracking-wide animate-pulse">
                    THANKS FOR SUBSCRIBING. WELCOME TO THE TRIBE.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 py-16 footer-animate">
          {/* Col 1: Shop */}
          <div className="flex flex-col items-start">
            <h4 className="font-mono text-[11px] md:text-xs tracking-[0.2em] text-[#888888] uppercase mb-6">
              SHOP
            </h4>
            <div className="flex flex-col gap-3">
              {['Earbuds', 'Headphones', 'Speakers', 'Smartwatches', 'Soundbars'].map((link) => (
                <a 
                  key={link} 
                  href="#category" 
                  className="font-sans text-[14px] text-[#F5F5F5]/70 hover:text-[#FF0000] transition-all duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Support */}
          <div className="flex flex-col items-start">
            <h4 className="font-mono text-[11px] md:text-xs tracking-[0.2em] text-[#888888] uppercase mb-6">
              SUPPORT
            </h4>
            <div className="flex flex-col gap-3">
              {['Track Order', 'Warranty', 'Returns', 'Service Centers', 'FAQs'].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="font-sans text-[14px] text-[#F5F5F5]/70 hover:text-[#FF0000] transition-all duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Company */}
          <div className="flex flex-col items-start">
            <h4 className="font-mono text-[11px] md:text-xs tracking-[0.2em] text-[#888888] uppercase mb-6">
              COMPANY
            </h4>
            <div className="flex flex-col gap-3">
              {['About boAt', 'Careers', 'Press', 'Sustainability', 'Investors'].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="font-sans text-[14px] text-[#F5F5F5]/70 hover:text-[#FF0000] transition-all duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Legal */}
          <div className="flex flex-col items-start">
            <h4 className="font-mono text-[11px] md:text-xs tracking-[0.2em] text-[#888888] uppercase mb-6">
              LEGAL
            </h4>
            <div className="flex flex-col gap-3">
              {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="font-sans text-[14px] text-[#F5F5F5]/70 hover:text-[#FF0000] transition-all duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Social + Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5 footer-animate">
          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {[
              {
                name: 'Facebook',
                svg: (
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M9.101 23.681v-10.78H5.617V8.824h3.484V6.226c0-3.454 2.11-5.333 5.19-5.333 1.475 0 2.744.11 3.114.16v3.612h-2.137c-1.675 0-2 .8-2 1.963v2.574h4.003l-.522 4.077H12.65v10.782h-3.55z" />
                  </svg>
                )
              },
              {
                name: 'Twitter',
                svg: (
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )
              },
              {
                name: 'Instagram',
                svg: (
                  <svg className="w-[18px] h-[18px] stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                )
              },
              {
                name: 'Youtube',
                svg: (
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                )
              },
              {
                name: 'Linkedin',
                svg: (
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                  </svg>
                )
              }
            ].map((social, idx) => (
              <a 
                key={idx} 
                href="#" 
                aria-label={social.name}
                className="text-[#888888] hover:text-[#FF0000] transition-colors duration-300 cursor-pointer"
              >
                {social.svg}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-mono text-[11px] text-[#888888] text-center md:text-right">
            &copy; 2026 boAt. Concept redesign by Code Constellation.
          </p>
        </div>

        {/* CODE CONSTELLATION CREDITS */}
        <div className="flex flex-col items-center justify-center pt-16 footer-animate">
          <p className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-[#555555] text-center uppercase">
            CONCEPT PROJECT &middot; NOT AFFILIATED WITH BOAT LIFESTYLE
          </p>
          <p className="font-mono text-[10px] md:text-[11px] tracking-widest text-[#888888] text-center mt-2.5">
            DESIGNED + BUILT BY{' '}
            <a 
              href="https://codeconstellation.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#FF0000] hover:underline font-bold transition-all duration-200"
            >
              CODE CONSTELLATION
            </a>
          </p>
          <Link 
            href="/case-study"
            className="font-mono text-[10px] tracking-wider text-[#888888] hover:text-[#FF0000] mt-3 transition-colors duration-200 underline underline-offset-4"
          >
            Read the case study &rarr;
          </Link>
        </div>

      </div>
    </footer>
  );
}
