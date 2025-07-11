"use client";

import React, { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const linkKeys = [
  { href: "#hero", labelKey: "nav.home" },
  { href: "#about", labelKey: "nav.about" },
  { href: "#skills", labelKey: "nav.skills" },
  { href: "#experience", labelKey: "nav.experience" },
  { href: "#projects", labelKey: "nav.projects" },
  { href: "#publications", labelKey: "nav.publications" },
  { href: "#certificates", labelKey: "nav.certificates" },
  { href: "#contact", labelKey: "nav.contact" },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu window tồn tại (client-side only)
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? Math.min(scrollY / documentHeight, 1) : 0;
      
      setScrollProgress(progress);
      setIsScrolled(scrollY > 50);
      
      // Update active section based on scroll position
      const sections = linkKeys.map(link => link.href.substring(1));
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

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (href: string) => {
    if (typeof window === "undefined") return;
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <>
      {/* Cyberpunk Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-background-secondary z-50">
        <div
          className="h-full bg-gradient-to-r from-accent via-accent-tertiary to-accent-secondary transition-all duration-300 shadow-neon-cyan"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-effect border border-accent/30 shadow-cyber backdrop-blur-xl'
            : 'bg-transparent border border-accent/10'
        } rounded-2xl navbar-adaptive`}
      >
        <div className="flex items-center justify-between w-full nav-actions-container">
          {/* Logo Section - Flexible */}
          <div className="flex-shrink-0">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("#hero");
              }}
              className="font-bold text-lg sm:text-xl font-mono bg-gradient-to-r from-accent to-accent-tertiary bg-clip-text text-transparent hover-scale transition-transform group"
            >
              <span className="inline-flex items-center gap-1.5 sm:gap-2">
                <span className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-accent to-accent-secondary rounded-lg flex items-center justify-center text-background text-xs sm:text-sm font-bold group-hover:rotate-12 transition-transform shadow-neon-cyan">
                  Leo
                </span>
                <span className="text-accent font-bold text-glow hidden sm:inline">
                  .dev
                </span>
              </span>
            </a>
          </div>

          {/* Navigation Links - Adaptive Container */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center nav-links-container">
              {linkKeys.map((l) => (
                <li key={l.href} className="flex-shrink-0">
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll(l.href);
                    }}
                    className={`relative text-foreground-secondary hover:text-accent transition-all duration-300
                      nav-item-adaptive rounded-lg group font-mono whitespace-nowrap
                      hover:scale-105 ${
                      activeSection === l.href ? 'text-accent bg-accent/10 border border-accent/30 scale-105' : ''
                    }`}
                  >
                    {activeSection === l.href && (
                      <div className="absolute inset-0 rounded-lg bg-accent/20 animate-neon-flicker" />
                    )}
                    <span className="relative font-medium">{t(l.labelKey)}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                        activeSection === l.href ? 'w-full shadow-neon-cyan' : 'w-0 group-hover:w-full'
                      }`}
                    ></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Items - Flexible Right Section */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher className="scale-90 lg:scale-100" />
            </div>

            {/* CV Download Button */}
            <a
              href="/Nguyen_Huy_CV.pdf"
              download
              className="hidden sm:block px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 text-xs lg:text-sm
                bg-gradient-to-r from-accent to-accent-secondary text-background rounded-lg
                hover:from-accent-secondary hover:to-accent-tertiary transition-all duration-300
                font-mono font-bold hover-lift group shadow-neon-cyan whitespace-nowrap
                hover:scale-105"
            >
              <span className="inline-flex items-center gap-1 lg:gap-2">
                <span className="text-sm lg:text-base">💾</span>
                <span className="hidden lg:inline">CV.exe</span>
                <span className="lg:hidden">CV</span>
              </span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg glass-effect border border-accent/30 hover:border-accent transition-all duration-300 hover-scale group flex-shrink-0"
              aria-label="Menu"
            >
              <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 text-accent ${isMobileMenuOpen ? 'rotate-90' : 'group-hover:rotate-90'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 glass-effect border border-accent/30 rounded-2xl backdrop-blur-xl overflow-hidden">
            <div className="p-4 space-y-2">
              {linkKeys.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll(l.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block py-3 px-4 rounded-lg font-mono text-sm transition-all duration-300 ${
                    activeSection === l.href
                      ? 'text-accent bg-accent/10 border border-accent/30'
                      : 'text-foreground-secondary hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  {t(l.labelKey)}
                </a>
              ))}

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-accent/20 space-y-3">
                <div className="flex justify-center">
                  <LanguageSwitcher />
                </div>
                <a
                  href="/Nguyen_Huy_CV.pdf"
                  download
                  className="block w-full py-3 px-4 text-center bg-gradient-to-r from-accent to-accent-secondary text-background rounded-lg font-mono font-bold transition-all duration-300 hover:from-accent-secondary hover:to-accent-tertiary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  💾 Download CV
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
