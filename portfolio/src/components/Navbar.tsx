"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTranslations } from "next-intl";
import { Menu, X, Home, FolderKanban, FileText, Award, Settings, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/blog/SearchModal";
import { useLocale } from "next-intl";

const linkKeys = [
  { href: "/about", labelKey: "home", icon: Home },
  { href: "/projects", labelKey: "projects", icon: FolderKanban },
  { href: "/publications", labelKey: "publications", icon: FileText },
  { href: "/certificates", labelKey: "certificates", icon: Award },
  { href: "/blog", labelKey: "blog", icon: BookOpen },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          scrolled ? "py-2" : "py-6"
        )}
      >
        <div className="container-custom">
          <div
            className={cn(
              "mx-auto rounded-full transition-all duration-500 flex items-center justify-between",
              scrolled
                ? "glass px-6 py-2 shadow-lg max-w-4xl"
                : "bg-transparent px-2 py-0 max-w-6xl"
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              className="font-bold text-xl tracking-tight flex items-center gap-1 group relative z-50"
            >
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-md shadow-primary/25">H</span>
              <span className="hidden sm:inline-block font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent ml-2">Nguyen Huy</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-secondary/30 backdrop-blur-sm rounded-full p-1 border border-border/50">
              {linkKeys.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                      isActive
                        ? "bg-background shadow-sm text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {t(link.labelKey)}
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 z-50">
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className="rounded-full hover:bg-background/20"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </Button>
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden rounded-full hover:bg-background/20"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} locale={locale} />}

      {/* Mobile Navigation Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-xl z-40 md:hidden transition-all duration-300 flex flex-col pt-24 px-6",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-2">
          {linkKeys.map((link, idx) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "p-4 rounded-xl text-lg font-medium transition-all duration-300 flex items-center gap-3 border",
                  isActive
                    ? "bg-primary/10 border-primary/20 text-primary"
                    : "bg-card border-border text-foreground hover:bg-accent/10"
                )}
                style={{ transitionDelay: `${idx * 50}ms`, transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)' }}
              >
                <Icon className="w-5 h-5" />
                {t(link.labelKey)}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-border flex justify-between items-center animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Preferences</span>
          </div>
          <div className="flex gap-3">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
