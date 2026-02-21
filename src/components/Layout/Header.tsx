'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

/**
 * HEADER COMPONENT
 * Master-Only Branding | Clean Navigation
 */

const Header: React.FC = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO - BIN NADEEM */}
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-master-navy rounded-lg flex items-center justify-center text-white font-bold text-xl">
              BN
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-master-navy leading-none">BIN NADEEM</span>
              <span className="text-xs text-master-gold tracking-widest font-semibold">MATTRESS HOUSE</span>
            </div>
          </a>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="text-gray-600 hover:text-master-blue font-medium transition">Home</a>
          <a href="/shop" className="text-gray-600 hover:text-master-blue font-medium transition">Mattresses</a>
          <a href="/mattress-finder" className="text-gray-600 hover:text-master-blue font-medium transition">Sleep Quiz</a>
          <a href="/warranty" className="text-gray-600 hover:text-master-blue font-medium transition">Warranty</a>
        </nav>

        {/* CTA BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:text-master-blue transition"
          >
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href="/mattress-finder"
            className="bg-master-blue text-white px-6 py-2.5 rounded-lg font-bold hover:bg-master-navy transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
          >
            Find My Mattress
          </a>
        </div>

        {/* MOBILE MENU ICON */}
        <button 
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* MOBILE NAV DRAWER */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 p-4 flex flex-col gap-4 md:hidden">
            <a href="/" className="text-gray-600 hover:text-master-blue font-medium transition py-2 border-b border-gray-50">Home</a>
            <a href="/shop" className="text-gray-600 hover:text-master-blue font-medium transition py-2 border-b border-gray-50">Mattresses</a>
            <a href="/mattress-finder" className="text-gray-600 hover:text-master-blue font-medium transition py-2 border-b border-gray-50">Sleep Quiz</a>
            <a href="/warranty" className="text-gray-600 hover:text-master-blue font-medium transition py-2 border-b border-gray-50">Warranty</a>
            
            <div className="flex items-center justify-between pt-2">
              <button 
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-gray-600 font-medium"
              >
                <span>Cart</span>
                <span className="bg-master-blue text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              </button>
            </div>

            <a
              href="/mattress-finder"
              className="bg-master-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-master-navy transition text-center mt-2"
            >
              Find My Mattress
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
