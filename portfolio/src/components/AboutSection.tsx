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

        <div className="border border-border rounded-xl bg-card p-6">
          <h3 className="text-xl font-semibold text-primary mb-4">
            {t('passion.title')}
          </h3>
          <p className="text-muted-foreground">
            {t('passion.description')}
          </p>
        </div>
      </div>
    </section>
  );
}
