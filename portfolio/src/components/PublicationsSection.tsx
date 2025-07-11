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

export default function PublicationsSection() {
  const { t } = useLanguage();

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
    <section id="publications" className="py-24 px-6 max-w-6xl mx-auto relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

      <div className="relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          {t('publications.title')}
        </h2>
        <p className="text-center text-foreground-secondary mb-16 max-w-3xl mx-auto">
          {t('publications.subtitle')}
        </p>

        <div className="space-y-8">
          {publications.map((pub, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-purple-500/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 hover:scale-[1.02] group"
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

              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-purple-300 transition-colors">
                {pub.title}
              </h3>

              <p className="text-accent-secondary font-mono text-sm mb-2">
                {pub.authors}
              </p>

              <p className="text-purple-300 font-medium mb-4">
                <span className="text-foreground-secondary">Published in:</span> {pub.venue}
              </p>

              <p className="text-foreground-secondary text-sm leading-relaxed">
                {pub.abstract}
              </p>

              {pub.doi && (
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent-tertiary transition-colors text-sm font-mono"
                  >
                    🔗 DOI: {pub.doi}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

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
    </section>
  );
}