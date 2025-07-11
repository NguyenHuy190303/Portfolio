import React from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import PublicationsSection from "@/components/PublicationsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <PublicationsSection />
      <ContactSection />
    </main>
  );
}
