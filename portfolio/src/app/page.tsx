import React from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import TableOfContents from "@/components/TableOfContents";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <TableOfContents />
    </>
  );
}
