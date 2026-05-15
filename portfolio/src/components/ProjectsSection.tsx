"use client";

import React from "react";
import { useTranslations } from "next-intl";
import OptimizedImage from "./OptimizedImage";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Code2 } from "lucide-react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

type Project = {
  name: string;
  image: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    name: "Capybara: The Lakehouse & Scraper",
    image: "/window.svg",
    description: "The core of my entrepreneurial and research efforts. An ecosystem for deep, focused learning, powered by a multi-agent AI system. The scraper component gathers high-quality data to feed the learning models.",
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "Multi-Agent System", "LLM"],
    github: "https://github.com/NguyenHuy190303/Capybara_Scraper",
    demo: "https://capybara-lakehouse.vercel.app/",
  },
  {
    name: "Mental-Care-AI",
    image: "/globe.svg",
    description: "An AI-driven mental health support system using the LlamaIndex framework to provide real-time psychological advice, diagnose conditions, and track user progress.",
    tech: ["Python", "Streamlit", "LlamaIndex", "RAG", "LLM", "Healthcare"],
    github: "https://github.com/NguyenHuy190303/Mental-Care-AI",
  },
  {
    name: "FDA-MA: Paper & Repository",
    image: "/file.svg",
    description: "The official repository for a research paper, demonstrating the ability to translate complex theoretical concepts into practical, reproducible code.",
    tech: ["Python", "PyTorch", "Medical Imaging", "Research"],
    github: "https://github.com/NguyenHuy190303/FDA-MA",
  },
  {
    name: "DENTAL: Image Segmentation",
    image: "/next.svg",
    description: "Advanced AI models for dental image segmentation and analysis, showcasing expertise in computer vision for specialized medical applications.",
    tech: ["Jupyter Notebook", "PyTorch", "Computer Vision", "UNet"],
    github: "https://github.com/NguyenHuy190303/DENTAL",
  },
  {
    name: "AI Fashion Recommendations",
    image: "/vercel.svg",
    description: "A fashion-forward outfit recommendation platform leveraging AI to personalize style for users.",
    tech: ["NextJS", "TailwindCSS", "TypeScript", "AI"],
    github: "https://github.com/NguyenHuy190303",
  },
  {
    name: "Creative Motion",
    image: "/github.svg",
    description: "A creative platform designed to spark innovation and imagination, built with modern technologies.",
    tech: ["NextJS", "TailwindCSS", "TypeScript", "GSAP"],
    github: "https://github.com/NguyenHuy190303",
  },
];

export default function ProjectsSection() {
  const t = useTranslations('projects');

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-[1800px] mx-auto px-12">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-sans font-bold text-4xl text-foreground">{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, index) => (
            <Card key={index} hoverEffect className="group overflow-hidden border-border flex flex-col h-full">
              <div className="relative h-48 w-full overflow-hidden bg-secondary">
                <div className="absolute inset-0 flex items-center justify-center p-8 group-hover:scale-110 transition-transform duration-500">
                  <OptimizedImage
                    src={p.image}
                    alt={p.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{p.name}</CardTitle>
              </CardHeader>

              <CardContent className="flex-grow py-2">
                <CardDescription className="line-clamp-3 mb-4 text-base">
                  {p.description}
                </CardDescription>

                <div className="flex gap-2 flex-wrap mt-auto">
                  {p.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-full bg-secondary border border-border text-secondary-foreground font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {p.tech.length > 4 && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-secondary border border-border text-secondary-foreground font-medium">
                      +{p.tech.length - 4}
                    </span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-4 border-t border-border gap-2 mt-auto">
                {p.github && (
                  <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
                    <a href={p.github} target="_blank" rel="noopener noreferrer">
                      <GithubIcon />
                      Code
                    </a>
                  </Button>
                )}
                {p.demo && (
                  <Button size="sm" className="flex-1 gap-2" asChild>
                    <a href={p.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  </Button>
                )}
                {!p.github && !p.demo && (
                  <Button variant="ghost" size="sm" className="flex-1 gap-2 cursor-default opacity-50">
                    <Code2 className="w-4 h-4" />
                    In Progress
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
