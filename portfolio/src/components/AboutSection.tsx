"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section id="about" className="section-padding bg-background-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full animate-pulse"></div>
        </div>
        
        <div 
          ref={contentRef}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${
            contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="glass-effect p-8 rounded-2xl hover-lift hover:border-accent transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-accent flex items-center gap-3">
                <span className="animate-bounce">🎯</span>
                {t('about.careerGoals.title')}
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                {t('about.careerGoals.description')}
              </p>
            </div>
            
            <div className="glass-effect p-8 rounded-2xl hover-lift hover:border-accent transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-accent flex items-center gap-3">
                <span className="animate-pulse">🚀</span>
                {t('about.passion.title')}
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                {t('about.passion.description')}
              </p>
            </div>
          </div>
          
          <div className={`space-y-6 transition-all duration-1000 delay-400 ${
            contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="glass-effect p-8 rounded-2xl hover-lift hover:border-accent transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 text-accent flex items-center gap-3">
                <span className="animate-spin text-2xl">📊</span>
                {t('about.stats.title')}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center hover-scale">
                  <div className="text-3xl font-bold text-accent mb-2 animate-pulse">5+</div>
                  <div className="text-sm text-foreground-secondary">{t('about.stats.experience')}</div>
                </div>
                <div className="text-center hover-scale">
                  <div className="text-3xl font-bold text-accent mb-2 animate-pulse">20+</div>
                  <div className="text-sm text-foreground-secondary">{t('about.stats.projects')}</div>
                </div>
                <div className="text-center hover-scale">
                  <div className="text-3xl font-bold text-accent mb-2 animate-pulse">10+</div>
                  <div className="text-sm text-foreground-secondary">{t('about.stats.publications')}</div>
                </div>
                <div className="text-center hover-scale">
                  <div className="text-3xl font-bold text-accent mb-2 animate-pulse">95%</div>
                  <div className="text-sm text-foreground-secondary">{t('about.stats.accuracy')}</div>
                </div>
              </div>
            </div>
            
            <div className="glass-effect p-8 rounded-2xl hover-lift hover:border-accent transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-accent flex items-center gap-3">
                <span className="animate-bounce">🎓</span>
                {t('about.education.title')}
              </h3>
              <div className="space-y-3">
                <div className="hover:bg-background-tertiary/30 p-3 rounded-lg transition-colors">
                  <div className="font-semibold">{t('about.education.masters.degree')}</div>
                  <div className="text-foreground-secondary text-sm">{t('about.education.masters.school')}</div>
                </div>
                <div className="hover:bg-background-tertiary/30 p-3 rounded-lg transition-colors">
                  <div className="font-semibold">{t('about.education.bachelors.degree')}</div>
                  <div className="text-foreground-secondary text-sm">{t('about.education.bachelors.school')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 