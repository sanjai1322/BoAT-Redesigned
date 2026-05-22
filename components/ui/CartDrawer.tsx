'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { isCartOpen, toggleCart, cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Formatter for INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleCart}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-full md:w-[420px] h-full bg-[#0A0A0A] border-l border-white/10 z-[101] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-accent-red/20">
                <h2 className="font-syne font-bold text-2xl text-[#F5F5F5] tracking-tighter uppercase">
                  Your Cart
                </h2>
                <button
                  onClick={toggleCart}
                  className="text-[#F5F5F5]/60 hover:text-accent-red transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items Area */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <p className="font-fraunces italic text-text-muted text-xl">Your cart is empty.</p>
                    <button
                      onClick={toggleCart}
                      className="font-mono text-sm uppercase tracking-widest text-accent-red hover:text-white transition-colors"
                    >
                      Keep shopping →
                    </button>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {cartItems.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        key={item.id}
                        className="flex gap-4 items-center bg-[#141414]/50 p-3 rounded-xl border border-white/5"
                      >
                        {/* Image Thumbnail */}
                        <div className="relative w-[60px] h-[60px] rounded-lg bg-[#1A1A1A] flex items-center justify-center overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h3 className="font-syne font-bold text-sm text-[#F5F5F5] truncate leading-tight">
                            {item.name}
                          </h3>
                          <p className="font-mono text-xs text-text-muted mt-1">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#888888] hover:text-accent-red transition-colors"
                            title="Remove"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          
                          <div className="flex items-center gap-2 bg-black/40 rounded border border-white/10 px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-text-muted hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs text-white min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-text-muted hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer / Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#0A0A0A] shrink-0">
                  <div className="flex items-end justify-between mb-6">
                    <span className="font-mono text-xs tracking-widest text-text-muted uppercase">
                      Subtotal
                    </span>
                    <motion.span 
                      key={cartTotal}
                      initial={{ scale: 1.1, color: '#FF0000' }}
                      animate={{ scale: 1, color: '#F5F5F5' }}
                      className="font-syne font-bold text-2xl text-[#F5F5F5] leading-none tracking-tight"
                    >
                      {formatPrice(cartTotal)}
                    </motion.span>
                  </div>
                  
                  <button
                    onClick={() => setShowCheckoutModal(true)}
                    className="w-full bg-accent-red hover:bg-[#FF3333] text-white font-syne font-bold text-lg py-4 rounded-lg transition-colors duration-300"
                  >
                    CHECKOUT
                  </button>
                  <p className="text-center font-mono text-[10px] text-text-muted mt-3 uppercase tracking-widest">
                    Concept project · Not a real store
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Concept Checkout Modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#141414] border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
            >
              {/* Decorative subtle glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-accent-red/20 blur-[50px] pointer-events-none rounded-full" />
              
              <h3 className="font-syne font-bold text-2xl text-white mb-2 tracking-tighter">
                Checkout Demo
              </h3>
              <p className="font-fraunces italic text-text-muted mb-6 text-lg leading-tight">
                This is a concept demo — checkout isn&apos;t connected. Built by Code Constellation.
              </p>
              
              <button
                onClick={() => {
                  setShowCheckoutModal(false);
                  toggleCart();
                }}
                className="w-full bg-white text-black font-syne font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close & Return
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
