"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

const sections = [
  { id: "hero", labelKey: "nav.home" },
  { id: "about", labelKey: "nav.about" },
  { id: "skills", labelKey: "nav.skills" },
  { id: "experience", labelKey: "nav.experience" },
  { id: "contact", labelKey: "nav.contact" },
];

export default function TableOfContents() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Show TOC after scrolling past hero section
      setIsVisible(scrollY > 200);

      // Update active section
      let current = "hero";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section.id;
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

  const handleSmoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block animate-fade-in-left">
      <div className="glass p-3 rounded-2xl border border-white/10 shadow-lg bg-background/50 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-3 px-2 text-muted-foreground">
          <List className="w-4 h-4" />
          <h3 className="text-xs font-semibold uppercase tracking-wider">
            Contents
          </h3>
        </div>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSmoothScroll(section.id)}
              className={cn(
                "block w-full text-left text-xs px-3 py-2 rounded-lg transition-all duration-300 relative overflow-hidden",
                activeSection === section.id
                  ? 'text-primary font-medium bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
            >
              <div className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-primary transition-all duration-300 rounded-r-full",
                activeSection === section.id ? "h-2/3 opacity-100" : "h-0 opacity-0"
              )}></div>
              {t(section.labelKey)}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}