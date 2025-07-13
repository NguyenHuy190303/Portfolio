"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto relative bg-transparent">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
      
      <div className="relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          {t('contact.title')}
        </h2>

        {/* Direct Contact Section */}
        <div className="text-center mb-16">
          <h3 className="text-xl font-bold text-accent mb-4 font-mono">
            {t('contact.direct.title')}
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {t('contact.direct.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:nguyenhuy190303@gmail.com"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 hover:border-cyan-400/60 hover:bg-cyan-500/30 transition-all duration-300 group"
            >
              <span className="text-cyan-400 text-xl">✉</span>
              <span className="text-white font-mono group-hover:text-cyan-300 transition-colors">{t('contact.direct.email')}</span>
            </a>
            <a
              href="https://www.linkedin.com/in/huy-nguyen-5552b22aa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 hover:border-blue-400/60 hover:bg-blue-500/30 transition-all duration-300 group"
            >
              <span className="text-blue-400 text-xl">💼</span>
              <span className="text-white font-mono group-hover:text-blue-300 transition-colors">{t('contact.direct.linkedin')}</span>
            </a>
            <a
              href="https://calendly.com/nguyenhuy190303/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:border-purple-400/60 hover:bg-purple-500/30 transition-all duration-300 group"
            >
              <span className="text-purple-400 text-xl">📅</span>
              <span className="text-white font-mono group-hover:text-purple-300 transition-colors">{t('contact.direct.schedule')}</span>
            </a>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="space-y-6 max-w-md w-full">
            <div className="p-6 rounded-lg bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-cyan-500/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-accent mb-4 font-mono">📧 {t('contact.info')}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-cyan-400">✉</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t('contact.email')}</p>
                    <a
                      href="mailto:nguyenhuy190303@gmail.com"
                      className="text-white font-mono hover:text-cyan-300 transition-colors duration-300"
                    >
                      nguyenhuy190303@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400">📱</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t('contact.phone')}</p>
                    <p className="text-white font-mono">+358 417472926</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-purple-400">📍</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t('contact.location')}</p>
                    <p className="text-white">Helsinki, Finland</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6 pt-6 border-t border-gray-700/50">
                <a 
                  href="https://github.com/NguyenHuy190303" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gray-800/50 border border-gray-600/50 hover:border-cyan-400/60 hover:bg-cyan-500/10 transition-all duration-300 group"
                >
                  <Image src="/github.svg" alt="GitHub" width={24} height={24} 
                    className="filter brightness-0 invert group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.linkedin.com/in/huy-nguyen-5552b22aa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gray-800/50 border border-gray-600/50 hover:border-cyan-400/60 hover:bg-cyan-500/10 transition-all duration-300 group"
                >
                  <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} 
                    className="filter brightness-0 invert group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 