"use client";

import React from "react";
import { useTranslations } from "next-intl";
import OptimizedImage from "./OptimizedImage";
import { Button } from "@/components/ui/Button";
import { ArrowRight, FileText, Mail } from "lucide-react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="max-w-[1800px] mx-auto px-12 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">

          {/* Profile Image */}
          <div className="relative animate-fade-in">
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full p-1 ring-2 ring-border">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <OptimizedImage
                  src="/Leo-avatar.jpg"
                  alt="Nguyen Quoc Huy"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Title & Role */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-fade-in-up">
              {t('greeting')}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Nguyen Huy
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('role')}
            </p>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" className="rounded-full px-8 text-base" asChild>
              <a href="#projects">
                {t('viewProjects')} <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>

            <Button variant="outline" size="lg" className="rounded-full px-8 text-base bg-background hover:bg-secondary" asChild>
              <a href="#contact">
                {t('contactMe')} <Mail className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 mt-8 animate-fade-in-up pt-8 border-t border-border" style={{ animationDelay: '0.5s' }}>
            <a href="https://github.com/NguyenHuy190303" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110">
              <GithubIcon />
            </a>
            <a href="https://linkedin.com/in/nguyen-huy-1903" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110">
              <LinkedinIcon />
            </a>
            <a href="/Nguyen_Huy_CV.pdf" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110 flex items-center gap-2 group">
              <FileText className="w-6 h-6" />
              <span className="text-sm font-medium opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all duration-300">CV</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
