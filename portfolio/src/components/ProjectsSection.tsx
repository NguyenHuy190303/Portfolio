"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";

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
  {
    nameKey: "AI Fashion Recommendations",
    image: "/vercel.svg", // Placeholder image
    descKey: "A fashion-forward outfit recommendation platform leveraging AI to personalize style for users.",
    tech: ["NextJS", "TailwindCSS", "TypeScript", "AI"],
    github: "https://github.com/NguyenHuy190303",
  },
  {
    nameKey: "Creative Motion",
    image: "/github.svg", // Placeholder image
    descKey: "A creative platform designed to spark innovation and imagination, built with modern technologies.",
    tech: ["NextJS", "TailwindCSS", "TypeScript", "GSAP"],
    github: "https://github.com/NguyenHuy190303",
  },
];

export default function ProjectsSection() {
  const { t } = useLanguage();
  const { ref, isVisible, visibleItems } = useStaggeredAnimation(projects.length);

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto relative bg-transparent">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(var(--accent-secondary)_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
          {t('projects.title')}
        </h2>
        <p className="text-center text-foreground-secondary mb-16 max-w-3xl mx-auto">
          {t('projects.subtitle')}
        </p>
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, index) => (
            <div key={index} className={`glass-effect rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:shadow-accent/20 hover:-translate-y-2 ${visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Image src={p.image} alt={t(p.nameKey)} width={400} height={225} className="h-48 w-full object-cover" />
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-accent">{t(p.nameKey)}</h3>
                <p className="text-sm text-foreground-secondary flex-grow">{t(p.descKey)}</p>
                <div className="flex gap-2 flex-wrap">
                  {p.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-auto pt-4">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground-secondary hover:text-accent transition-colors">
                      <Image src="/github.svg" alt="GitHub" width={24} height={24} />
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline flex items-center gap-1">
                      Live Demo
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
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