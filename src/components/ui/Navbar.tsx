'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Proceso', href: '#proceso' },
    { name: 'Productos', href: '#catalogo' },
    { name: 'Testimonios', href: '#testimonios' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group z-50">
            <Image src="/favicon.webp" alt="Aguas Reloncaví Logo" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform" />
            <span className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-[#00509E] tracking-tighter">Aguas Reloncaví</span>
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-10 items-center">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-bold text-[#0F172A] hover:text-[#0284C7] tracking-wide uppercase transition-colors">
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="hidden lg:flex items-center">
            <a href="#pedido" className="bg-[#003B73] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase hover:bg-[#0284C7] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Haz tu Pedido
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="lg:hidden z-50 p-2 text-[#0F172A] focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center items-center lg:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <nav className="flex flex-col items-center gap-8 w-full px-6">
          {navLinks.map((link, index) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-display font-black text-[#0F172A] hover:text-[#0284C7] transition-colors"
              style={{ transitionDelay: `${index * 50}ms`, transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: isMenuOpen ? 1 : 0, transitionDuration: '400ms' }}
            >
              {link.name}
            </a>
          ))}
          
          <a 
            href="#pedido" 
            onClick={() => setIsMenuOpen(false)}
            className="mt-8 bg-[#003B73] text-white px-10 py-5 rounded-full font-bold text-xl tracking-wide uppercase hover:bg-[#0284C7] transition-all shadow-xl hover:shadow-2xl active:scale-95 w-full max-w-sm text-center"
            style={{ transitionDelay: '200ms', transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: isMenuOpen ? 1 : 0, transitionDuration: '400ms' }}
          >
            Haz tu Pedido
          </a>
        </nav>

        <div 
          className="absolute bottom-12 flex gap-4"
          style={{ transitionDelay: '300ms', transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: isMenuOpen ? 1 : 0, transitionDuration: '400ms' }}
        >
          {/* Decorative items or social links could go here, keeping it clean */}
          <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">Aguas Reloncaví</span>
        </div>
      </div>
    </>
  );
}
