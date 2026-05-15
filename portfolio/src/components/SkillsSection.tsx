"use client";

import React, { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTranslations } from "next-intl";
import { Code2, Brain, Wrench, Rocket, Server, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function SkillsSection() {
  const t = useTranslations('skills');
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
      titleKey: "programming.title",
      icon: Code2,
      color: "text-blue-500",
      skills: [
        { name: "Python", level: 95 },
        { name: "C/C++", level: 80 },
        { name: "SQL", level: 85 },
        { name: "JavaScript", level: 70 },
      ]
    },
    {
      titleKey: "aiFrameworks.title",
      icon: Brain,
      color: "text-purple-500",
      skills: [
        { name: "PyTorch", level: 90 },
        { name: "TensorFlow", level: 85 },
        { name: "Scikit-learn", level: 90 },
        { name: "OpenCV", level: 85 },
        { name: "Pandas", level: 88 },
      ]
    },
    {
      titleKey: "devTools.title",
      icon: Wrench,
      color: "text-orange-500",
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 80 },
        { name: "Streamlit", level: 85 },
        { name: "Jupyter", level: 95 },
      ]
    },
    {
      titleKey: "expertise.title",
      icon: Rocket,
      color: "text-green-500",
      skills: [
        { name: "Computer Vision", level: 95 },
        { name: "Medical Imaging", level: 90 },
        { name: "Deep Learning", level: 95 },
        { name: "NLP", level: 80 },
      ]
    }
  ];

  const SkillBar = ({ skill, index, colorClass }: { skill: { name: string; level: number }, index: number, colorClass: string }) => (
    <div className={cn(
      "mb-4 transition-all duration-500 delay-[200ms]",
      animatedSkills ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
    )}>
      <div className="flex justify-between mb-2">
        <span className="font-medium text-foreground text-sm">{skill.name}</span>
        <span className={cn("font-semibold text-xs", colorClass)}>{skill.level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-[2000ms] ease-out", colorClass.replace('text-', 'bg-'))}
          style={{
            width: animatedSkills ? `${skill.level}%` : '0%',
            transitionDelay: `${index * 150}ms`
          }}
        />
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-12">
        <div
          ref={titleRef}
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-secondary border border-border text-secondary-foreground text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            Skills & Expertise
          </div>
          <h2 className="font-sans font-bold text-4xl text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div ref={skillsRef} className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={categoryIndex}
              className={cn(
                "transition-all duration-700 hover:border-primary",
                skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2 space-y-0">
                <div className={cn("p-3 rounded-xl bg-secondary border border-border", category.color)}>
                  <category.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-bold">{t(category.titleKey)}</CardTitle>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar key={skillIndex} skill={skill} index={skillIndex} colorClass={category.color} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional tech stack */}
        <div className={cn(
          "mt-20 pt-10 border-t border-border transition-all duration-1000 delay-500",
          skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <h3 className="text-xl font-semibold mb-8 text-center flex items-center justify-center gap-2 text-muted-foreground">
            <Server className="w-5 h-5" />
            {t('additionalTech')}
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {["LlamaIndex", "LangChain", "Hugging Face", "Overleaf", "Ngrok", "FastAPI", "React", "Next.js", "MongoDB", "PostgreSQL", "AWS"].map((tech, index) => (
              <span
                key={tech}
                className={cn(
                  "px-4 py-2 bg-secondary text-foreground rounded-lg border border-border hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-default",
                  skillsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                )}
                style={{ transitionDelay: `${800 + index * 50}ms` }}
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
