"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="card border-card-border bg-card-background/95 backdrop-blur-sm p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Contents
        </h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSmoothScroll(section.id)}
              className={`block w-full text-left text-xs px-3 py-2 rounded transition-colors ${
                activeSection === section.id
                  ? 'text-accent bg-background-secondary'
                  : 'text-foreground-secondary hover:text-accent hover:bg-background-secondary'
              }`}
            >
              {t(section.labelKey)}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}