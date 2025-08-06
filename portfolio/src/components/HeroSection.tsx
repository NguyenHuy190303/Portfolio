"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

// Typing effect for titles - will be populated with translations

function useTypingEffect(texts: string[], typingSpeed = 120, pause = 1500) {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      const fullText = texts[index];

      if (!deleting) {
        // typing
        setCurrentText(fullText.substring(0, subIndex + 1));
        setSubIndex((v: number) => v + 1);
        if (subIndex + 1 === fullText.length) {
          setDeleting(true);
        }
      } else {
        // deleting
        setCurrentText(fullText.substring(0, subIndex - 1));
        setSubIndex((v: number) => v - 1);
        if (subIndex === 0) {
          setDeleting(false);
          setIndex((v: number) => (v + 1) % texts.length);
        }
      }
    }, deleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(handler);
  }, [texts, index, subIndex, deleting, typingSpeed]);

  // Pause at end of word
  useEffect(() => {
    if (!deleting && subIndex === texts[index].length) {
      const timeout = setTimeout(() => {
        setDeleting(true);
      }, pause);
      return () => clearTimeout(timeout);
    }
  }, [deleting, subIndex, index, texts, pause]);

  return currentText;
}

export default function HeroSection() {
  const { t } = useLanguage();

  // Get typing titles from translations
  const TITLES = [
    t('hero.typing.1'),
    t('hero.typing.2'),
    t('hero.typing.3'),
    t('hero.typing.4'),
    t('hero.typing.5')
  ];

  const typingText = useTypingEffect(TITLES);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center gap-8 section-padding relative overflow-hidden bg-transparent"
    >
      {/* Professional background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5 pointer-events-none"></div>
      
      {/* Subtle floating elements */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-20 left-10 w-2 h-2 bg-accent/40 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent-secondary/40 rounded-full animate-float animate-delay-200"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-accent-tertiary/40 rounded-full animate-float animate-delay-400"></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-accent/40 rounded-full animate-float animate-delay-300"></div>
      </div>
      
      {/* Professional avatar styling */}
      <div className="relative animate-fadeInUp">
        <div className="relative group">
          <Image
            src="/Leo-avatar.jpg"
            alt="Ảnh đại diện Nguyễn Quốc Huy"
            width={200}
            height={200}
            className="relative rounded-full object-cover border-3 border-accent/30 hover:border-accent/60 transition-all duration-300 shadow-xl hover-lift"
          />
        </div>
        {/* Professional status indicator */}
        <div className="absolute bottom-4 right-4 w-5 h-5 bg-accent-secondary rounded-full border-2 border-background shadow-md">
          <div className="w-full h-full bg-accent-secondary rounded-full"></div>
        </div>
      </div>

      <div className="space-y-6 animate-fadeInUp animate-delay-200">
        <div className="space-y-2 animate-fadeInLeft animate-delay-300 font-mono">
          <p className="text-sm sm:text-base text-accent-secondary">
            {t('hero.system.init')}
          </p>
          <p className="text-sm sm:text-base text-accent-tertiary">
            {t('hero.system.loading')}
          </p>
          <p className="text-sm sm:text-base text-foreground-secondary" dangerouslySetInnerHTML={{ __html: t('hero.system.status') }}>
          </p>
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold hero-title-enhanced animate-fadeInUp animate-delay-400">
          {t('hero.title')}
        </h1>
        <div className="text-2xl sm:text-3xl font-mono animate-fadeInRight animate-delay-500">
          <span className="text-foreground-secondary">{t('hero.alias')}</span>
          <span className="text-gradient hover-scale inline-block">
            &quot;Leo&quot;
          </span>
        </div>
      </div>

      <div className="h-20 flex items-center animate-fadeInUp animate-delay-600">
        <div className="professional-card px-8 py-4 rounded-lg border-accent/20">
          <h2 className="text-2xl sm:text-4xl font-mono text-accent relative z-10">
            <span className="text-accent-secondary font-bold">&gt;</span>
            <span className="text-foreground-secondary mx-2">execute</span>
            <span className="text-accent-tertiary">[</span>
            <span className="inline-block animate-fadeInLeft text-accent font-bold">{typingText}</span>
            <span className="border-r-2 border-accent ml-1 animate-pulse" />
            <span className="text-accent-tertiary">]</span>
            <span className="text-accent-secondary ml-2">--mode=active</span>
          </h2>
        </div>
      </div>

      <p className="max-w-3xl px-4 text-lg sm:text-xl text-foreground-secondary leading-relaxed animate-fadeInUp animate-delay-700 professional-card p-6 rounded-lg">
        <span className="text-accent-secondary"># </span>
        {t('hero.description')}
      </p>

      <div className="flex flex-col sm:flex-row gap-6 mt-8 animate-fadeInUp animate-delay-800">
        <a
          href="/Nguyen_Huy_CV.pdf"
          download
          className="btn-primary font-mono hover-lift group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <span className="relative inline-flex items-center gap-3">
            <span className="text-xl">💾</span> {t('hero.cv.button')}
          </span>
        </a>
        <a
          href="https://calendly.com/nguyenhuy190303/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary font-mono hover-lift group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-tertiary/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <span className="relative inline-flex items-center gap-3">
            <span className="text-xl">📡</span> {t('hero.schedule.button')}
          </span>
        </a>
      </div>

      <div className="flex gap-8 mt-8 animate-fadeInUp animate-delay-900">
        <a
          href="https://github.com/NguyenHuy190303"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-4 rounded-lg professional-card hover-scale transition-all duration-300 group relative"
        >
          <div className="absolute inset-0 bg-accent-secondary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-neon-glow"></div>
          <Image 
            src="/github.svg" 
            alt="GitHub" 
            width={40} 
            height={40} 
            className="relative filter brightness-0 invert group-hover:scale-110 transition-transform" 
          />
        </a>
        <a
          href="https://www.linkedin.com/in/huy-nguyen-5552b22aa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="p-4 rounded-lg glass-effect hover:border-accent-tertiary hover-scale transition-all duration-300 group relative"
        >
          <div className="absolute inset-0 bg-accent-tertiary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-neon-glow"></div>
          <Image 
            src="/linkedin.svg" 
            alt="LinkedIn" 
            width={40} 
            height={40} 
            className="relative filter brightness-0 invert group-hover:scale-110 transition-transform" 
          />
        </a>
      </div>

      {/* Cyberpunk scroll indicator - fixed position, center-right */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 animate-cyber-float">
        <div className="glass-effect p-3 rounded-lg border border-accent/30 hover-glow cursor-pointer group"
             onClick={() => {
               const aboutSection = document.getElementById('about');
               if (aboutSection) {
                 aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
               }
             }}>
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center relative group-hover:border-accent-tertiary transition-colors duration-300">
            <div className="w-1.5 h-3 bg-accent rounded-full mt-1.5 animate-neon-flicker group-hover:bg-accent-tertiary transition-colors duration-300"></div>
            <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping group-hover:bg-accent-tertiary/20 transition-colors duration-300"></div>
          </div>
          <p className="text-xs text-foreground-secondary mt-2 font-mono animate-neon-flicker text-center group-hover:text-accent-tertiary transition-colors duration-300">
            scroll
          </p>
        </div>
      </div>
    </section>
  );
} 