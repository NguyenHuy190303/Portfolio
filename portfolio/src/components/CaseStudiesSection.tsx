"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const caseStudies = [
  {
    title: {
      en: "AI-Powered Medical Imaging Analysis",
      vi: "Phân tích hình ảnh y tế bằng AI",
    },
    description: {
      en: "A deep dive into the development of a novel deep learning model for early cancer detection in medical scans. This project involved a collaboration with leading oncologists and resulted in a 15% improvement in diagnostic accuracy.",
      vi: "Nghiên cứu sâu về việc phát triển một mô hình học sâu mới để phát hiện sớm ung thư trong các bản quét y tế. Dự án này có sự hợp tác với các bác sĩ ung thư hàng đầu và đã cải thiện 15% độ chính xác trong chẩn đoán.",
    },
    tags: ["Deep Learning", "Computer Vision", "Healthcare", "PyTorch"],
    link: "#",
  },
  {
    title: {
      en: "Multi-Agent System for Focused Learning",
      vi: "Hệ thống đa tác nhân cho học tập tập trung",
    },
    description: {
      en: "This case study outlines the architecture and implementation of a multi-agent system designed to create a personalized and adaptive learning ecosystem. The system uses context engineering to provide users with relevant and focused content.",
      vi: "Nghiên cứu điển hình này phác thảo kiến trúc và việc triển khai một hệ thống đa tác nhân được thiết kế để tạo ra một hệ sinh thái học tập được cá nhân hóa và thích ứng. Hệ thống sử dụng kỹ thuật ngữ cảnh để cung cấp cho người dùng nội dung phù hợp và tập trung.",
    },
    tags: ["Multi-Agent Systems", "AI", "EdTech", "FastAPI"],
    link: "#",
  },
];

export default function CaseStudiesSection() {
  const { t, language } = useLanguage();

  return (
    <section id="case-studies" className="section">
      <div className="section-content">
        <div className="text-center mb-12">
          <h2 className="section-title">{t("caseStudies.title")}</h2>
          <p className="section-subtitle">{t("caseStudies.subtitle")}</p>
        </div>
        <div className="grid-2 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="card">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {study.title[language]}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {study.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-foreground-secondary mb-4">
                {study.description[language]}
              </p>
              <a href={study.link} className="text-accent font-medium hover:underline">
                {t("caseStudies.readMore")}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
