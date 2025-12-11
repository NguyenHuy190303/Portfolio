"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import OptimizedImage from "./OptimizedImage";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Profile Image with Glow */}
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-accent/30 p-1 bg-background/50 backdrop-blur-sm">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <OptimizedImage
                  src="/Leo-avatar.jpg"
                  alt="Profile"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Title & Role */}
          <div className="space-y-4 mb-8 max-w-4xl mx-auto">
            <h2 className="text-accent font-medium tracking-wider uppercase text-sm md:text-base animate-fade-in">
              {t('hero.greeting')}
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-gradient">Nguyen Huy</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground-secondary font-light max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('hero.role')}
            </p>
          </div>

          {/* Description */}
          <p className="text-foreground-muted text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a href="#projects" className="btn btn-primary min-w-[160px]">
              {t('hero.viewProjects')}
            </a>
            <a href="#contact" className="btn btn-secondary min-w-[160px]">
              {t('hero.contactMe')}
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float hidden md:flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <span className="text-xs uppercase tracking-widest text-foreground-muted">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}