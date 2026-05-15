"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-20 px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-12">
          <h2 className="font-sans font-bold text-4xl text-foreground mb-4 text-center">{t('title')}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-none">
            {t('careerGoals.description')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="border border-border rounded-xl bg-card p-6">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {t('passion.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('passion.description')}
            </p>
          </div>

          <div className="border border-border rounded-xl bg-card p-6">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {t('education.title')}
            </h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-foreground">{t('education.masters.degree')}</div>
                <div className="text-sm text-muted-foreground">{t('education.masters.school')}</div>
              </div>
              <div>
                <div className="font-medium text-foreground">{t('education.bachelors.degree')}</div>
                <div className="text-sm text-muted-foreground">{t('education.bachelors.school')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="border border-border rounded-xl bg-card p-6">
            <h3 className="text-xl font-semibold text-primary mb-6">
              {t('stats.title')}
            </h3>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary font-sans mb-1">4+</div>
                <div className="text-sm text-muted-foreground">{t('stats.experience')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary font-sans mb-1">50+</div>
                <div className="text-sm text-muted-foreground">{t('stats.projects')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary font-sans mb-1">25+</div>
                <div className="text-sm text-muted-foreground">{t('stats.models')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary font-sans mb-1">95%</div>
                <div className="text-sm text-muted-foreground">{t('stats.accuracy')}</div>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-xl bg-card p-6">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {t('expertise.title')}
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>• {t('expertise.llm')}</div>
              <div>• {t('expertise.transformer')}</div>
              <div>• {t('expertise.generative')}</div>
              <div>• {t('expertise.mlops')}</div>
              <div>• {t('expertise.vector')}</div>
              <div>• {t('expertise.agent')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
