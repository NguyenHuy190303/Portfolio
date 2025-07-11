"use client";

import React, { useEffect, useState } from "react";

const links = [
  { href: "#hero", label: "Trang chủ" },
  { href: "#about", label: "Về tôi" },
  { href: "#skills", label: "Kỹ năng" },
  { href: "#experience", label: "Kinh nghiệm" },
  { href: "#projects", label: "Dự án" },
  { href: "#publications", label: "Công bố" },
  { href: "#contact", label: "Liên hệ" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = links.map(link => link.href.substring(1));
      let current = "#hero";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = `#${section}`;
            break;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 animate-slideInFromTop ${
        isScrolled 
          ? 'glass-effect border-b border-border/50 backdrop-blur-xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a 
          href="#hero" 
          onClick={(e) => {
            e.preventDefault();
            handleSmoothScroll("#hero");
          }}
          className="font-bold text-xl bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent hover-scale transition-transform group"
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white text-sm font-bold group-hover:rotate-12 transition-transform">
              H
            </span>
            uy.dev
          </span>
        </a>
        
        <ul className="hidden md:flex gap-8 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleSmoothScroll(l.href);
                }}
                className={`relative text-foreground-secondary hover:text-accent transition-all duration-300 py-2 group ${
                  activeSection === l.href ? 'text-accent' : ''
                }`}
              >
                {l.label}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    activeSection === l.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="/Nguyen_Huy_CV.pdf"
            download
            className="hidden sm:block px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-hover transition-all duration-300 font-medium hover-lift group"
          >
            <span className="inline-flex items-center gap-2">
              📄 CV
              <svg className="w-3 h-3 transform group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </span>
          </a>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg glass-effect border border-border/50 hover:border-accent transition-all duration-300 hover-scale group"
            aria-label="Menu"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-accent origin-left transform transition-transform duration-100"
           style={{ 
             width: `${Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%` 
           }}
      ></div>
    </nav>
  );
} 