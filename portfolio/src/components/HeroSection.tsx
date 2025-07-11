"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// Tạo typing effect cho mảng titles
const TITLES = [
  "AI Researcher",
  "Deep Learning Engineer",
  "Data Scientist",
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
  const typingText = useTypingEffect(TITLES);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center gap-8 section-padding relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 pointer-events-none animate-pulse"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-accent rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full animate-float animate-delay-200"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-accent rounded-full animate-float animate-delay-400"></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-accent rounded-full animate-float animate-delay-300"></div>
      </div>
      
      {/* Avatar - animated entrance */}
      <div className="relative animate-scaleIn">
        <div className="relative hover-lift hover-glow">
          <Image
            src="/Leo-avatar.jpg"
            alt="Ảnh đại diện Nguyễn Quốc Huy"
            width={180}
            height={180}
            className="rounded-full object-cover border-4 border-accent shadow-2xl shadow-accent/20 hover:border-accent-hover transition-all duration-300"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/20 to-transparent animate-glow"></div>
        </div>
        {/* Status indicator */}
        <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-background animate-pulse">
          <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
        </div>
      </div>

      <div className="space-y-4 animate-fadeInUp animate-delay-200">
        <p className="text-lg sm:text-xl text-foreground-secondary animate-fadeInLeft animate-delay-300">
          Xin chào, tôi là
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-fadeInUp animate-delay-400">
          Nguyễn Quốc Huy
        </h1>
        <div className="text-xl sm:text-2xl text-accent font-medium animate-fadeInRight animate-delay-500">
          ({" "}
          <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent hover-scale inline-block">
            Leo
          </span>{" "}
          )
        </div>
      </div>

      <div className="h-16 flex items-center animate-fadeInUp animate-delay-600">
        <h2 className="text-2xl sm:text-3xl font-mono text-accent">
          <span className="inline-block animate-fadeInLeft">{typingText}</span>
          <span className="border-r-2 border-accent animate-pulse ml-1" />
        </h2>
      </div>

      <p className="max-w-2xl px-4 text-base sm:text-lg text-foreground-secondary leading-relaxed animate-fadeInUp animate-delay-700">
        Là một nhà nghiên cứu AI đầy nhiệt huyết với kinh nghiệm thực tiễn trong
        việc phát triển và triển khai các mô hình học sâu (deep learning) cho
        phân tích hình ảnh y tế...
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fadeInUp animate-delay-800">
        <a
          href="/Nguyen_Huy_CV.pdf"
          download
          className="px-8 py-3 rounded-lg bg-accent text-white hover:bg-accent-hover transition-all duration-300 shadow-lg hover:shadow-accent/30 font-medium hover-lift group"
        >
          <span className="inline-flex items-center gap-2">
            📄 Tải CV
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </a>
        <a
          href="https://calendly.com/nguyenhuy190303/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-lg border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 font-medium glass-effect hover-lift group"
        >
          <span className="inline-flex items-center gap-2">
            📅 Đặt lịch họp
            <svg className="w-4 h-4 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
        </a>
      </div>

      <div className="flex gap-6 mt-8 animate-fadeInUp animate-delay-900">
        <a
          href="https://github.com/NguyenHuy190303"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-3 rounded-lg glass-effect hover:border-accent hover-scale transition-all duration-300 group"
        >
          <Image 
            src="/github.svg" 
            alt="GitHub" 
            width={32} 
            height={32} 
            className="filter brightness-0 invert group-hover:scale-110 transition-transform" 
          />
        </a>
        <a
          href="https://www.linkedin.com/in/huy-nguyen-5552b22aa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="p-3 rounded-lg glass-effect hover:border-accent hover-scale transition-all duration-300 group"
        >
          <Image 
            src="/linkedin.svg" 
            alt="LinkedIn" 
            width={32} 
            height={32} 
            className="filter brightness-0 invert group-hover:scale-110 transition-transform" 
          />
        </a>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center hover-glow">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
        </div>
        <p className="text-xs text-foreground-secondary mt-2 animate-pulse">Cuộn xuống</p>
      </div>
    </section>
  );
} 