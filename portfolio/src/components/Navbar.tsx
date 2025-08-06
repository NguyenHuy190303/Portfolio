"use client";

import React, { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
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
  const [activeSection, setActiveSection] = useState("#hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
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

    handleScroll();
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
    <nav className="nav">
      <div className="nav-content">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleSmoothScroll("#hero");
          }}
          className="font-bold text-xl text-accent hover:text-accent-hover transition-colors"
        >
          Huy Nguyen
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex nav-links">
          {linkKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll(link.href);
              }}
              className={`nav-link ${
                activeSection === link.href ? 'active' : ''
              }`}
            >
              {t(link.labelKey)}
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden btn-ghost p-2"
            aria-label="Menu"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-6 card border-card-border">
          <div className="p-4 space-y-2">
            {linkKeys.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleSmoothScroll(link.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`block py-3 px-4 rounded-lg text-sm transition-colors ${
                  activeSection === link.href
                    ? 'text-accent bg-background-secondary'
                    : 'text-foreground-secondary hover:text-accent hover:bg-background-secondary'
                }`}
              >
                {t(link.labelKey)}
              </a>
            ))}
            
            <div className="pt-4 border-t border-border-muted space-y-3">
              <div className="flex justify-center gap-4">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
