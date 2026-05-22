'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { useCart } from '@/context/CartContext';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Shop', href: '#drop' },
  { label: 'Categories', href: '#category' },
  { label: 'Lifestyle', href: '#lifestyle' },
  { label: 'About', href: '#tribe' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, toggleCart, bounceCartIcon } = useCart();

  // Monitor window scroll to adjust navbar background and padding
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth-scroll anchor handler tapping into global Lenis instance
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetEl = document.querySelector(href);
    if (!targetEl) return;

    // Use global Lenis instance if available, otherwise fallback to native scroll
    if (typeof window !== 'undefined') {
      const globalWindow = window as Window & { lenisInstance?: Lenis };
      if (globalWindow.lenisInstance) {
        globalWindow.lenisInstance.scrollTo(href, {
          offset: -80,
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        return;
      }
    }
    
    targetEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10 py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Section */}
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="flex items-center gap-1.5 group select-none cursor-pointer"
          >
            <span className="font-syne font-extrabold text-[24px] tracking-tighter text-[#F5F5F5]">
              b<span className="text-[#FF0000] font-black">oA</span>t
            </span>
            <div className="w-1.5 h-1.5 bg-[#FF0000] rounded-full self-end mb-1.5 animate-pulse" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="font-mono text-[13px] uppercase tracking-[0.2em] text-[#F5F5F5]/80 hover:text-[#F5F5F5] transition-colors relative py-1 group"
              >
                {link.label}
                {/* Thin slide-in underline from left */}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#FF0000] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Mobile Menu Button */}
          <div className="flex items-center gap-6">
            <button className="text-[#F5F5F5] hover:text-[#FF0000] transition-colors duration-200 focus:outline-none">
              <Search className="w-[20px] h-[20px]" />
            </button>
            <button 
              onClick={toggleCart}
              className="relative text-[#F5F5F5] hover:text-[#FF0000] transition-colors duration-200 focus:outline-none"
            >
              <motion.div
                animate={bounceCartIcon ? { scale: [1, 1.2, 0.9, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <ShoppingBag className="w-[20px] h-[20px]" />
              </motion.div>
              {/* Premium red cart badge */}
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#FF0000] text-[#F5F5F5] text-[9px] font-mono font-bold flex items-center justify-center rounded-full pointer-events-none"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="block md:hidden text-[#F5F5F5] hover:text-[#FF0000] transition-colors duration-200 focus:outline-none"
            >
              <Menu className="w-[22px] h-[22px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen z-50 bg-[#000000] flex flex-col justify-between p-6 overflow-hidden select-none"
          >
            {/* Header top row within the overlay */}
            <div className="w-full flex items-center justify-between max-w-7xl mx-auto py-2">
              <span className="font-syne font-extrabold text-[24px] tracking-tighter text-[#F5F5F5]">
                b<span className="text-[#FF0000] font-black">oA</span>t
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#F5F5F5] hover:text-[#FF0000] transition-colors duration-200 focus:outline-none"
              >
                <X className="w-[24px] h-[24px]" />
              </button>
            </div>

            {/* Menu Links Content */}
            <div className="flex-grow flex flex-col justify-center items-center">
              <div className="flex flex-col gap-8 text-center">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={`mobile-link-${link.label}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08, duration: 0.5, ease: 'easeOut' }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className="font-syne font-bold text-4xl sm:text-5xl uppercase tracking-tighter text-[#F5F5F5] hover:text-[#FF0000] transition-colors duration-200 block py-2"
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer information inside mobile menu */}
            <div className="w-full text-center py-4 border-t border-white/5">
              <p className="font-mono text-[9px] tracking-widest text-[#888888] uppercase">
                boAt Reimagined &copy; 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
