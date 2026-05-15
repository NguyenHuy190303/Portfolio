"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  const t = useTranslations('publications');
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
      case 'published': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800';
      case 'accepted': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800';
      case 'under_review': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800';
      default: return 'bg-secondary text-secondary-foreground border-border';
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
    <section id="publications" className="py-20 px-12">
      <div className="max-w-[1800px] mx-auto">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-4xl text-foreground mb-4">
              {t('title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('subtitle')}
            </p>
          </div>

          <div className="space-y-8">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="group border border-border rounded-xl bg-card p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTypeIcon(pub.type)}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(pub.status)}`}>
                      {t(`status.${pub.status}`)}
                    </span>
                  </div>
                  <span className="text-muted-foreground font-mono text-sm">{pub.year}</span>
                </div>

                <h3 className="font-serif font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {pub.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-2">
                  {pub.authors}
                </p>

                <p className="text-primary font-medium mb-4">
                  <span className="text-muted-foreground">Published in:</span> {pub.venue}
                </p>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pub.abstract}
                </p>

                {pub.doi && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-mono"
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
                <h3 className="text-xl font-bold text-muted-foreground mb-2">
                  {t('noPublications')}
                </h3>
                <p className="text-muted-foreground">
                  {t('comingSoon')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
