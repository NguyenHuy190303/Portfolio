"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section">
      <div className="section-content">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-subtitle">{t('about.careerGoals.description')}</p>
        </div>
        
        <div className="grid-2 gap-8 mb-12">
          <div className="card">
            <h3 className="text-xl font-semibold text-accent mb-4">
              {t('about.passion.title')}
            </h3>
            <p className="text-foreground-secondary">
              {t('about.passion.description')}
            </p>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-accent mb-4">
              {t('about.education.title')}
            </h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium">{t('about.education.masters.degree')}</div>
                <div className="text-sm text-foreground-secondary">{t('about.education.masters.school')}</div>
              </div>
              <div>
                <div className="font-medium">{t('about.education.bachelors.degree')}</div>
                <div className="text-sm text-foreground-secondary">{t('about.education.bachelors.school')}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-semibold text-accent mb-6">
              {t('about.stats.title')}
            </h3>
            <div className="grid-2 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-accent mb-1">4+</div>
                <div className="text-sm text-foreground-secondary">{t('about.stats.experience')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">50+</div>
                <div className="text-sm text-foreground-secondary">{t('about.stats.projects')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">25+</div>
                <div className="text-sm text-foreground-secondary">{t('about.stats.models')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">95%</div>
                <div className="text-sm text-foreground-secondary">{t('about.stats.accuracy')}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-accent mb-4">
              {t('about.expertise.title')}
            </h3>
            <div className="space-y-2 text-sm text-foreground-secondary">
              <div>• {t('about.expertise.llm')}</div>
              <div>• {t('about.expertise.transformer')}</div>
              <div>• {t('about.expertise.generative')}</div>
              <div>• {t('about.expertise.mlops')}</div>
              <div>• {t('about.expertise.vector')}</div>
              <div>• {t('about.expertise.agent')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 