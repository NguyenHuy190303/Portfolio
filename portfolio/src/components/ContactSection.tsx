"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations('contact');
  
  return (
    <section id="contact" className="section">
      <div className="section-content">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('title')}</h2>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-xl font-semibold text-accent mb-4">
            {t('direct.title')}
          </h3>
          <p className="text-foreground-secondary mb-8 max-w-2xl mx-auto">
            {t('direct.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:nguyenhuy190303@gmail.com"
              className="btn btn-primary"
            >
              {t('direct.email')}
            </a>
            <a
              href="https://www.linkedin.com/in/huy-nguyen-5552b22aa"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t('direct.linkedin')}
            </a>
            <a
              href="https://calendly.com/nguyenhuy190303/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t('direct.schedule')}
            </a>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="card max-w-md w-full">
            <h3 className="text-xl font-semibold text-accent mb-6">{t('info')}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span className="text-accent">✉</span>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">{t('email')}</p>
                  <a
                    href="mailto:nguyenhuy190303@gmail.com"
                    className="text-foreground hover:text-accent transition-colors"
                  >
                    nguyenhuy190303@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span className="text-accent">📱</span>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">{t('phone')}</p>
                  <p className="text-foreground">+358 417472926</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span className="text-accent">📍</span>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">{t('location')}</p>
                  <p className="text-foreground">Helsinki, Finland</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6 pt-6 border-t border-border">
              <a 
                href="https://github.com/NguyenHuy190303" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/huy-nguyen-5552b22aa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 