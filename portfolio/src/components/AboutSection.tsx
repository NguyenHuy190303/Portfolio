"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <div className="flex flex-col space-y-8">

      {/* Philosophy */}
      <div>
        <h2 className="font-sans font-bold text-3xl text-foreground mb-4">{t('title')}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t('careerGoals.description')}
        </p>
      </div>

      {/* Motivation card */}
      <div className="border border-border rounded-xl bg-card p-6">
        <h3 className="text-lg font-semibold text-primary mb-3">
          {t('passion.title')}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {t('passion.description')}
        </p>
      </div>

    </div>
  );
}
