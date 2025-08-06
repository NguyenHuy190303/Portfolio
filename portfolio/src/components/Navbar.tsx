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
  { href: "#case-studies", labelKey: "nav.caseStudies" },
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
      {/* Professional Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-background-secondary z-50">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-hover transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 
          max-w-[95vw] w-auto min-w-fit ${
          isScrolled
            ? 'professional-card border-accent/20'
            : 'bg-transparent border border-accent/10'
        } rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3`}
      >
        <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
          {/* Logo Section - Compact */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("#hero");
              }}
              className="font-bold text-base sm:text-lg lg:text-xl font-mono bg-gradient-to-r from-accent to-accent-tertiary bg-clip-text text-transparent hover-scale transition-transform group"
            >
              <span className="inline-flex items-center gap-1 sm:gap-1.5">
                <span className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-accent to-accent-secondary rounded-lg flex items-center justify-center text-background text-xs sm:text-sm font-bold group-hover:rotate-12 transition-transform shadow-lg">
                  Leo
                </span>
                <span className="text-accent font-bold text-glow-subtle hidden sm:inline text-sm lg:text-base">
                  .dev
                </span>
              </span>
            </a>
            <a
              href="/Nguyen_Huy_CV.pdf"
              download
              className="hidden lg:inline-flex px-2 xl:px-3 py-1 xl:py-1.5 text-xs xl:text-sm
                bg-gradient-to-r from-accent to-accent-secondary text-background rounded-lg
                hover:from-accent-secondary hover:to-accent-tertiary transition-all duration-300
                font-mono font-bold hover-lift group shadow-lg whitespace-nowrap
                hover:scale-105"
            >
              <span className="inline-flex items-center gap-1">
                <span className="text-xs xl:text-sm">💾</span>
                <span className="hidden xl:inline">CV.exe</span>
                <span className="xl:hidden">CV</span>
              </span>
            </a>
          </div>

          {/* Navigation Links - Responsive Container */}
          <div className="hidden md:flex flex-1 justify-center overflow-hidden">
            <ul className="flex items-center gap-1 lg:gap-2 xl:gap-3 max-w-full overflow-x-auto scrollbar-hide">
              {linkKeys.map((l) => (
                <li key={l.href} className="flex-shrink-0">
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll(l.href);
                    }}
                    className={`relative transition-all duration-300 px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 text-xs lg:text-sm xl:text-base
                      rounded-lg group font-mono whitespace-nowrap text-center
                      hover:scale-105 ${
                      activeSection === l.href
                        ? 'text-accent bg-accent/8 border border-accent/20 scale-105'
                        : 'text-foreground hover:text-accent'
                    }`}
                  >
                    {activeSection === l.href && (
                      <div className="absolute inset-0 rounded-lg bg-accent/10 animate-subtle-glow" />
                    )}
                    <span className="relative font-medium">{t(l.labelKey)}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${
                        activeSection === l.href ? 'w-full shadow-sm' : 'w-0 group-hover:w-full'
                      }`}
                    ></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Language Switcher */}
          <div className="flex items-center justify-end gap-2 flex-shrink-0">
            <div className="hidden md:flex">
              <LanguageSwitcher className="scale-75 lg:scale-90 xl:scale-100" />
            </div>

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
                  className={`block py-3 px-4 rounded-lg font-mono text-sm transition-all duration-300 nav-text-enhanced ${
                    activeSection === l.href
                      ? 'text-accent bg-accent/8 border border-accent/20'
                      : 'text-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  {t(l.labelKey)}
                </a>
              ))}

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-accent/20 space-y-3">
                <div className="flex justify-center items-center gap-4">
                  <LanguageSwitcher />
                </div>
                <a
                  href="/Nguyen_Huy_CV.pdf"
                  download
                  className="block w-full py-3 px-4 text-center bg-gradient-to-r from-accent to-accent-secondary text-background rounded-lg font-mono font-bold transition-all duration-300 hover:from-accent-secondary hover:to-accent-tertiary text-readable"
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
