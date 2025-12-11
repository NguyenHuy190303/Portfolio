"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import OptimizedImage from "./OptimizedImage";

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

  return (
    <section id="projects" className="section relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="section-content">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl mb-4">
            <span className="text-gradient-blue">{t('projects.title')}</span>
          </h2>
          <p className="section-subtitle mx-auto text-lg">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid-3 gap-8">
          {projects.map((p, index) => (
            <div key={index} className="glass-card overflow-hidden group hover:border-accent/50">
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60"></div>
                <OptimizedImage
                  src={p.image}
                  alt={t(p.nameKey)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6 flex flex-col gap-4 relative z-20 -mt-12">
                <div className="glass p-4 rounded-xl border border-white/5 bg-background/80 backdrop-blur-md">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                    {t(p.nameKey)}
                  </h3>
                  <p className="text-sm text-foreground-secondary line-clamp-3 mb-4">
                    {t(p.descKey)}
                  </p>

                  <div className="flex gap-2 flex-wrap mb-4">
                    {p.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-accent/10 text-accent border border-accent/20 rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="px-2 py-1 bg-background-secondary text-foreground-muted rounded-md text-xs font-medium">
                        +{p.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4 pt-2 border-t border-border-muted">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-foreground-secondary hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        Code
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-hover flex items-center gap-1 text-sm font-medium ml-auto"
                      >
                        Live Demo
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}