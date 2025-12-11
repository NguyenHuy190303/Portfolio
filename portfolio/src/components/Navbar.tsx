"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const linkKeys = [
  { href: "/", labelKey: "nav.home" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/publications", labelKey: "nav.publications" },
  { href: "/certificates", labelKey: "nav.certificates" },
];

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-4" : "py-6"
        }`}
    >
      <div className="container-custom">
        <div
          className={`mx-auto rounded-2xl transition-all duration-300 ${scrolled
              ? "glass px-6 py-3 shadow-lg bg-background/80 backdrop-blur-md border border-white/10"
              : "bg-transparent px-0 py-0"
            }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="font-bold text-xl tracking-tight flex items-center gap-2 group"
            >
              <span className="text-accent group-hover:text-white transition-colors">Huy</span>
              <span className="text-foreground group-hover:text-white transition-colors">Nguyen</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {linkKeys.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                        ? 'text-white bg-white/10 shadow-sm'
                        : 'text-foreground-secondary hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
                aria-label="Menu"
              >
                <svg
                  className="w-6 h-6"
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
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 p-4 animate-fade-in-up">
          <div className="glass rounded-2xl p-4 border border-white/10 shadow-xl bg-background/95 backdrop-blur-xl">
            <div className="space-y-1">
              {linkKeys.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 px-4 rounded-xl text-sm font-medium transition-all ${isActive
                        ? 'text-white bg-accent/20 border border-accent/20'
                        : 'text-foreground-secondary hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center px-2">
              <span className="text-xs text-foreground-muted font-medium uppercase tracking-wider">Settings</span>
              <div className="flex gap-3">
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
