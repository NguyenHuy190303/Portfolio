'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLanguage: 'vi' | 'en') => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const languages = {
    vi: { label: t('language.vietnamese'), flag: '🇻🇳' },
    en: { label: t('language.english'), flag: '🇺🇸' }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-secondary/50 
          border border-cyan-500/20 hover:border-cyan-400/40 backdrop-blur-sm
          text-foreground hover:text-cyan-300 transition-all duration-300"
        aria-label="Change language"
      >
        <span className="text-lg">{languages[language].flag}</span>
        <span className="text-sm font-medium hidden sm:block">
          {languages[language].label}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 py-2 w-40 bg-background-secondary/95 
          backdrop-blur-sm border border-cyan-500/20 rounded-lg shadow-xl z-50">
          {Object.entries(languages).map(([code, { label, flag }]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as 'vi' | 'en')}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-cyan-500/10 
                transition-colors duration-200 ${
                language === code ? 'text-cyan-300 bg-cyan-500/5' : 'text-foreground'
              }`}
            >
              <span className="text-lg">{flag}</span>
              <span className="text-sm">{label}</span>
              {language === code && (
                <span className="ml-auto text-cyan-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
