'use client';

import React, { useState, useEffect } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-8 bottom-8 z-40 p-4 rounded-lg bg-gradient-to-r from-accent to-accent-secondary 
        text-background hover:from-accent-secondary hover:to-accent-tertiary transition-all duration-300 
        shadow-lg hover:shadow-xl hover:shadow-accent/25 hover:scale-110 group glass-effect border border-accent/30
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      <svg 
        className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 15l7-7 7 7" 
        />
      </svg>
      
      {/* Neon glow effect */}
      <div className="absolute inset-0 rounded-lg bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-neon-flicker" />
    </button>
  );
}
