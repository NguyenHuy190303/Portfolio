"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  type: 'conference' | 'journal' | 'preprint';
  status: 'published' | 'accepted' | 'under_review';
  doi?: string;
  abstract: string;
};

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function PublicationsSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const publications: Publication[] = [
    {
      title: "Applications of Deep Learning in Cancer Detection: A Comprehensive Review",
      authors: "Nguyen Quoc Huy, et al.",
      venue: "AACR Annual Conference",
      year: "2024",
      type: "conference",
      status: "published",
      abstract: "This paper presents a comprehensive review of deep learning applications in cancer detection, focusing on medical imaging analysis and diagnostic accuracy improvements."
    },
    {
      title: "Large Language Models for Biomedical Information Retrieval: A RAG-based Approach",
      authors: "Nguyen Quoc Huy, Research Team",
      venue: "IEEE Transactions on Biomedical Engineering",
      year: "2024",
      type: "journal",
      status: "under_review",
      abstract: "We propose a novel RAG-based approach using large language models for enhanced biomedical information retrieval and knowledge extraction."
    },
    {
      title: "Vision Transformers for Medical Image Classification: Performance Analysis",
      authors: "Nguyen Quoc Huy, UIT AI Club Team",
      venue: "International Conference on Medical AI",
      year: "2024",
      type: "conference",
      status: "accepted",
      abstract: "Comprehensive analysis of Vision Transformer architectures for medical image classification tasks, demonstrating superior performance over traditional CNN approaches."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'accepted': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'under_review': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'conference': return '🎤';
      case 'journal': return '📄';
      case 'preprint': return '📝';
      default: return '📚';
    }
  };

  return (
    <section id="publications" className="section">
      <div className="section-content">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="section-title">
              {t('publications.title')}
            </h2>
            <p className="section-subtitle">
              {t('publications.subtitle')}
            </p>
          </div>

        <div className="space-y-8">
          {publications.map((pub, index) => (
            <div
              key={index}
              className="card hover:scale-[1.02] group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getTypeIcon(pub.type)}</span>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(pub.status)}`}>
                      {t(`publications.status.${pub.status}`)}
                    </span>
                  </div>
                </div>
                <span className="text-accent-tertiary font-mono text-sm">{pub.year}</span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                {pub.title}
              </h3>

              <p className="text-accent-secondary font-mono text-sm mb-2">
                {pub.authors}
              </p>

              <p className="text-accent font-medium mb-4">
                <span className="text-foreground-secondary">Published in:</span> {pub.venue}
              </p>

              <p className="text-foreground-secondary text-sm leading-relaxed">
                {pub.abstract}
              </p>

              {pub.doi && (
                <div className="mt-4 pt-4 border-t border-border-muted">
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors text-sm font-mono"
                  >
                    🔗 DOI: {pub.doi}
                  </a>
                </div>
              )}
            </div>
          ))}
          {publications.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-foreground-secondary mb-2">
                {t('publications.noPublications')}
              </h3>
              <p className="text-foreground-secondary">
                {t('publications.comingSoon')}
              </p>
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}