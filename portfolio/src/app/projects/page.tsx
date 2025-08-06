import React from "react";
import ProjectsSection from "@/components/ProjectsSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";

export default function ProjectsPage() {
  return (
    <main className="pt-20">
      <ProjectsSection />
      <CaseStudiesSection />
    </main>
  );
}