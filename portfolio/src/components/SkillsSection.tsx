"use client";

import React, { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SkillsSection() {
  const { t } = useLanguage();
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation();
  const [animatedSkills, setAnimatedSkills] = useState(false);

  useEffect(() => {
    if (skillsVisible && !animatedSkills) {
      setTimeout(() => setAnimatedSkills(true), 500);
    }
  }, [skillsVisible, animatedSkills]);

  const skillCategories = [
    {
      titleKey: "skills.programming.title",
      icon: "🐍",
      skills: [
        { name: "Python", level: 95 },
        { name: "C/C++", level: 80 },
        { name: "SQL", level: 85 },
        { name: "JavaScript", level: 70 },
      ]
    },
    {
      titleKey: "skills.aiFrameworks.title",
      icon: "🧠",
      skills: [
        { name: "PyTorch", level: 90 },
        { name: "TensorFlow", level: 85 },
        { name: "Scikit-learn", level: 90 },
        { name: "OpenCV", level: 85 },
        { name: "Pandas", level: 88 },
      ]
    },
    {
      titleKey: "skills.devTools.title",
      icon: "⚡",
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 80 },
        { name: "Streamlit", level: 85 },
        { name: "Jupyter", level: 95 },
      ]
    },
    {
      titleKey: "skills.expertise.title",
      icon: "🚀",
      skills: [
        { name: "Computer Vision", level: 95 },
        { name: "Medical Imaging", level: 90 },
        { name: "Deep Learning", level: 95 },
        { name: "NLP", level: 80 },
      ]
    }
  ];

  const SkillBar = ({ skill, index }: { skill: { name: string; level: number }, index: number }) => (
    <div className={`mb-4 transition-all duration-500 delay-${index * 100} ${
      animatedSkills ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
    }`}>
      <div className="flex justify-between mb-2">
        <span className="font-medium text-foreground">{skill.name}</span>
        <span className="text-accent font-semibold">{skill.level}%</span>
      </div>
      <div className="w-full bg-background-tertiary rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-accent to-accent-hover h-3 rounded-full transition-all duration-2000 ease-out relative"
          style={{ 
            width: animatedSkills ? `${skill.level}%` : '0%',
            transitionDelay: `${index * 200}ms`
          }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            {t('skills.title')}
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full animate-pulse"></div>
          <p className="mt-6 text-foreground-secondary text-lg max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        <div ref={skillsRef} className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className={`glass-effect p-8 rounded-2xl hover:border-accent transition-all duration-500 hover-lift ${
                skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-3 animate-bounce" style={{ animationDelay: `${categoryIndex * 500}ms` }}>
                  {category.icon}
                </span>
                <h3 className="text-xl font-semibold text-accent">{t(category.titleKey)}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar key={skillIndex} skill={skill} index={skillIndex} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional tech stack */}
        <div className={`mt-16 glass-effect p-8 rounded-2xl transition-all duration-1000 delay-1000 ${
          skillsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <h3 className="text-2xl font-semibold mb-6 text-center text-accent flex items-center justify-center gap-3">
            <span className="animate-spin">🛠️</span>
            {t('skills.additionalTech')}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["LlamaIndex", "LangChain", "Hugging Face", "Overleaf", "Ngrok", "FastAPI", "React", "Next.js"].map((tech, index) => (
              <span 
                key={tech} 
                className={`px-4 py-2 bg-background-tertiary text-foreground rounded-lg border border-border hover:border-accent transition-all duration-300 hover-scale ${
                  skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${1200 + index * 100}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 