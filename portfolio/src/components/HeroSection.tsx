"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";


export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="section">
      <div className="section-content">
        <div className="grid-2 items-center gap-12">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="section-title">{t('hero.title')}</h1>
              <h2 className="text-xl text-accent font-medium">
                {t('hero.alias')} &quot;Leo&quot;
              </h2>
              <p className="section-subtitle">
                {t('hero.description')}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="/Nguyen_Huy_CV.pdf"
                download
                className="btn btn-primary"
              >
                {t('hero.cv.button')}
              </a>
              <a
                href="https://calendly.com/nguyenhuy190303/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                {t('hero.schedule.button')}
              </a>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/NguyenHuy190303"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="btn btn-ghost"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/huy-nguyen-5552b22aa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn btn-ghost"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right content - Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src="/Leo-avatar.jpg"
                alt="Ảnh đại diện Nguyễn Quốc Huy"
                width={300}
                height={300}
                className="rounded-2xl object-cover shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 