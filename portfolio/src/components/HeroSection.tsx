"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

// Tạo typing effect cho mảng titles
const TITLES = [
  "Hello there! I'm an AI Research Engineer building innovative solutions.",
  "Hello there! I'm a Deep Learning Engineer turning data into human-centric technology.",
  "Hello there! I'm an Innovation Builder collaborating on technologies that improve lives.",
  "Hello there! I'm a Tech Explorer guiding ideas from concept to real-world impact.",
  "Hello there! I design intelligent algorithms to solve complex challenges."
];

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
  const typingText = useTypingEffect(TITLES);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center gap-8 section-padding relative overflow-hidden"
    >
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-tertiary/10 pointer-events-none"></div>
      
      {/* Matrix rain effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-accent-secondary text-xs font-mono opacity-30 animate-matrix-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {Math.random() > 0.5 ? '010101' : '110100'}
          </div>
        ))}
      </div>
      
      {/* Floating neon particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-accent rounded-full shadow-neon-cyan animate-cyber-float"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-accent-tertiary rounded-full shadow-neon-pink animate-cyber-float animate-delay-200"></div>
        <div className="absolute bottom-40 left-20 w-4 h-4 bg-accent-secondary rounded-full shadow-neon-green animate-cyber-float animate-delay-400"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-accent rounded-full shadow-neon-cyan animate-cyber-float animate-delay-300"></div>
      </div>
      
      {/* Avatar with cyberpunk glow */}
      <div className="relative animate-scaleIn">
        <div className="relative hover-lift">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent via-accent-tertiary to-accent-secondary animate-neon-glow blur-lg opacity-50"></div>
          <Image
            src="/Leo-avatar.jpg"
            alt="Ảnh đại diện Nguyễn Quốc Huy"
            width={200}
            height={200}
            className="relative rounded-full object-cover border-2 border-accent shadow-cyber hologram-effect transition-all duration-300"
          />
        </div>
        {/* Cyberpunk status indicator */}
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-accent-secondary rounded-full border-2 border-background animate-neon-flicker shadow-neon-green">
          <div className="w-full h-full bg-accent-secondary rounded-full animate-ping opacity-75"></div>
        </div>
      </div>

      <div className="space-y-6 animate-fadeInUp animate-delay-200">
        <div className="space-y-2 animate-fadeInLeft animate-delay-300 font-mono">
          <p className="text-sm sm:text-base text-accent-secondary">
            &gt; System.Initialize()
          </p>
          <p className="text-sm sm:text-base text-accent-tertiary">
            &gt; Loading Profile: Research_Engineer.exe
          </p>
          <p className="text-sm sm:text-base text-foreground-secondary">
            &gt; Status: <span className="text-accent">ONLINE</span> | Ready for Innovation
          </p>
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-accent via-accent-tertiary to-accent-secondary bg-clip-text text-transparent animate-fadeInUp animate-delay-400 cyber-text">
          {t('hero.title')}
        </h1>
        <div className="text-2xl sm:text-3xl text-accent-tertiary font-mono animate-fadeInRight animate-delay-500">
          <span className="text-foreground-secondary">{t('hero.alias')}</span>
          <span className="bg-gradient-to-r from-accent-tertiary to-accent bg-clip-text text-transparent hover-scale inline-block animate-neon-flicker">
            "Leo"
          </span>
        </div>
      </div>

      <div className="h-20 flex items-center animate-fadeInUp animate-delay-600">
        <div className="glass-effect px-8 py-4 rounded-lg border border-accent/30 hover:border-accent/50 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent-secondary/10 to-accent-tertiary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h2 className="text-2xl sm:text-4xl font-mono text-accent cyber-text relative z-10">
            <span className="text-accent-secondary font-bold">&gt;</span>
            <span className="text-foreground-secondary mx-2">execute</span>
            <span className="text-accent-tertiary">[</span>
            <span className="inline-block animate-fadeInLeft text-accent font-bold">{typingText}</span>
            <span className="border-r-2 border-accent animate-neon-flicker ml-1" />
            <span className="text-accent-tertiary">]</span>
            <span className="text-accent-secondary ml-2">--mode=active</span>
          </h2>
        </div>
      </div>

      <p className="max-w-3xl px-4 text-lg sm:text-xl text-foreground-secondary leading-relaxed animate-fadeInUp animate-delay-700 font-mono glass-effect p-6 rounded-lg border border-accent/20">
        <span className="text-accent-secondary"># </span>
        {t('hero.description')}
      </p>

      <div className="flex flex-col sm:flex-row gap-6 mt-8 animate-fadeInUp animate-delay-800">
        <a
          href="/Nguyen_Huy_CV.pdf"
          download
          className="px-8 py-4 rounded-lg bg-gradient-to-r from-accent to-accent-secondary text-background hover:from-accent-secondary hover:to-accent-tertiary transition-all duration-300 shadow-cyber font-mono font-bold hover-lift group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <span className="relative inline-flex items-center gap-3">
            <span className="text-xl">💾</span> MY CV HERE
          </span>
        </a>
        <a
          href="https://calendly.com/nguyenhuy190303/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-lg border-2 border-accent-tertiary text-accent-tertiary hover:bg-accent-tertiary hover:text-background transition-all duration-300 font-mono font-bold glass-effect hover-lift group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-tertiary/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <span className="relative inline-flex items-center gap-3">
            <span className="text-xl">📡</span> CONNECT WITH ME
          </span>
        </a>
      </div>

      <div className="flex gap-8 mt-8 animate-fadeInUp animate-delay-900">
        <a
          href="https://github.com/NguyenHuy190303"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-4 rounded-lg glass-effect hover:border-accent-secondary hover-scale transition-all duration-300 group relative"
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