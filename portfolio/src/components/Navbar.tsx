"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const linkKeys = [
  { href: "#hero", labelKey: "nav.home", isInternal: true },
  { href: "#about", labelKey: "nav.about", isInternal: true },
  { href: "#skills", labelKey: "nav.skills", isInternal: true },
  { href: "#experience", labelKey: "nav.experience", isInternal: true },
  { href: "/projects", labelKey: "nav.projects", isInternal: false },
  { href: "/publications", labelKey: "nav.publications", isInternal: false },
  { href: "/certificates", labelKey: "nav.certificates", isInternal: false },
  { href: "#contact", labelKey: "nav.contact", isInternal: true },
];

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("#hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || pathname !== "/") return;

    const handleScroll = () => {
      const sections = linkKeys
        .filter(link => link.isInternal)
        .map(link => link.href.substring(1));
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
  }, [pathname]);

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
        <Link
          href="/"
          className="font-bold text-xl text-accent hover:text-accent-hover transition-colors"
        >
          Huy Nguyen
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex nav-links">
          {linkKeys.map((link) => {
            const isActive = link.isInternal 
              ? (pathname === "/" && activeSection === link.href)
              : pathname === link.href;
            
            if (link.isInternal) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (pathname === "/") {
                      e.preventDefault();
                      handleSmoothScroll(link.href);
                    } else {
                      // Navigate to home page first, then scroll
                      window.location.href = `/${link.href}`;
                    }
                  }}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {t(link.labelKey)}
                </a>
              );
            } else {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {t(link.labelKey)}
                </Link>
              );
            }
          })}
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
            {linkKeys.map((link) => {
              const isActive = link.isInternal 
                ? (pathname === "/" && activeSection === link.href)
                : pathname === link.href;

              if (link.isInternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (pathname === "/") {
                        e.preventDefault();
                        handleSmoothScroll(link.href);
                      } else {
                        // Navigate to home page first, then scroll
                        window.location.href = `/${link.href}`;
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block py-3 px-4 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'text-accent bg-background-secondary'
                        : 'text-foreground-secondary hover:text-accent hover:bg-background-secondary'
                    }`}
                  >
                    {t(link.labelKey)}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 px-4 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'text-accent bg-background-secondary'
                        : 'text-foreground-secondary hover:text-accent hover:bg-background-secondary'
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                );
              }
            })}
            
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
