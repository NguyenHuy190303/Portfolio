"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

type Project = {
  nameKey: string;
  image: string;
  descKey: string;
  tech: string[];
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    nameKey: "Capybara: The Lakehouse & Scraper",
    image: "/window.svg", // Placeholder image
    descKey: "The core of my entrepreneurial and research efforts. An ecosystem for deep, focused learning, powered by a multi-agent AI system. The scraper component gathers high-quality data to feed the learning models.",
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "Multi-Agent System", "LLM"],
    github: "https://github.com/NguyenHuy190303/Capybara_Scraper",
    demo: "https://capybara-lakehouse.vercel.app/", // Placeholder link
  },
  {
    nameKey: "Mental-Care-AI",
    image: "/globe.svg", // Placeholder image
    descKey: "An AI-driven mental health support system using the LlamaIndex framework to provide real-time psychological advice, diagnose conditions, and track user progress.",
    tech: ["Python", "Streamlit", "LlamaIndex", "RAG", "LLM", "Healthcare"],
    github: "https://github.com/NguyenHuy190303/Mental-Care-AI",
  },
  {
    nameKey: "FDA-MA: Paper & Repository",
    image: "/file.svg", // Placeholder image
    descKey: "The official repository for a research paper, demonstrating the ability to translate complex theoretical concepts into practical, reproducible code.",
    tech: ["Python", "PyTorch", "Medical Imaging", "Research"],
    github: "https://github.com/NguyenHuy190303/FDA-MA",
  },
  {
    nameKey: "DENTAL: Image Segmentation",
    image: "/next.svg", // Placeholder image
    descKey: "Advanced AI models for dental image segmentation and analysis, showcasing expertise in computer vision for specialized medical applications.",
    tech: ["Jupyter Notebook", "PyTorch", "Computer Vision", "UNet"],
    github: "https://github.com/NguyenHuy190303/DENTAL",
  },
];

import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";

export default function ProjectsSection() {
  const { t } = useLanguage();
  const { ref, isVisible, visibleItems } = useStaggeredAnimation(projects.length);

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto relative bg-transparent">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl font-bold text-center mb-10">{t('projects.title')}</h2>
        <div ref={ref} className="grid md:grid-cols-2 gap-10">
          {projects.map((p, index) => (
            <div key={index} className={`bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow transition-all duration-500 ${visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Image src={p.image} alt={t(p.nameKey)} width={400} height={192} className="h-48 w-full object-cover" />
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{t(p.nameKey)}</h3>
                <p className="text-sm opacity-80">{t(p.descKey)}</p>
                <div className="flex gap-2 flex-wrap">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-teal-500/10 text-teal-500 rounded text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-2">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Image src="/github.svg" alt="GitHub" width={20} height={20} className="w-5 h-5" />
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-sm underline">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 