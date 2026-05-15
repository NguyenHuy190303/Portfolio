'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { certificates, certificateCategories, Certificate } from '@/data/certificates';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CertificateCardProps {
  certificate: Certificate;
  onClick: () => void;
  isVisible: boolean;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onClick,
  isVisible
}) => {
  const locale = useLocale();
  const language = (locale === 'vi' ? 'vi' : 'en') as 'en' | 'vi';
  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-card border border-border cursor-pointer
        transition-all duration-300 hover:shadow-md hover:-translate-y-0.5
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View certificate: ${certificate.title[language]}`}
    >
      {/* Certificate Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={`/certificates/${certificate.filename}`}
          alt={certificate.title[language]}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Level Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold border
          ${certificate.level === 'Advanced'
            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
            : certificate.level === 'Intermediate'
            ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
            : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800'
          }`}>
          {certificate.level}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary
            transition-colors duration-300 line-clamp-2">
            {certificate.title[language]}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {certificate.issuer[language]}
          </p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {certificate.description[language]}
        </p>

        <div className="flex flex-wrap gap-1 mt-3">
          {certificate.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-secondary border border-border text-secondary-foreground rounded-full"
            >
              {skill}
            </span>
          ))}
          {certificate.skills.length > 3 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{certificate.skills.length - 3}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">{certificate.date}</span>
          <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

const CertificateModal: React.FC<ModalProps> = ({ certificate, onClose }) => {
  const locale = useLocale();
  const language = (locale === 'vi' ? 'vi' : 'en') as 'en' | 'vi';
  const t = useTranslations('certificates');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (certificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [certificate]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative max-w-4xl w-full max-h-[90vh] bg-card rounded-xl
          border border-border shadow-xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary hover:bg-muted
            text-foreground hover:text-primary transition-all duration-300"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-2/3 relative">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-96 relative overflow-hidden bg-secondary">
              <Image
                src={`/certificates/${certificate.filename}`}
                alt={certificate.title[language]}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/3 p-6 space-y-4">
            <div>
              <h2 id="modal-title" className="text-2xl font-bold text-foreground mb-2">
                {certificate.title[language]}
              </h2>
              <p className="text-primary font-medium">
                {certificate.issuer[language]}
              </p>
            </div>

            <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold border
              ${certificate.level === 'Advanced'
                ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                : certificate.level === 'Intermediate'
                ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
                : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800'
              }`}>
              {certificate.level}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {certificate.description[language]}
            </p>

            <div>
              <h4 className="text-foreground font-semibold mb-2">
                {t('skillsTech')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm bg-secondary border border-border text-secondary-foreground rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">
                  {t('completed')}: {certificate.date}
                </span>
                {certificate.credentialUrl && (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10
                      hover:bg-primary/20 border border-primary/30
                      text-primary rounded-lg transition-all duration-300"
                  >
                    {t('viewCredential')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CertificatesSection() {
  const locale = useLocale();
  const language = (locale === 'vi' ? 'vi' : 'en') as 'en' | 'vi';
  const t = useTranslations('certificates');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  const filteredCertificates = certificates.filter(cert =>
    selectedCategory === 'all' || cert.category === selectedCategory
  );

  return (
    <section id="certificates" className="py-20 px-12 relative bg-transparent">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-sans font-bold text-4xl text-foreground mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Controls */}
        <div className={`flex justify-center items-center gap-6 mb-12 transition-all duration-1000 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '200ms' }}>
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {certificateCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                {category.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {filteredCertificates.map((certificate, index) => (
            <div
              key={certificate.id}
              className={`transition-all duration-700 ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
            >
              <CertificateCard
                certificate={certificate}
                onClick={() => setSelectedCertificate(certificate)}
                isVisible={gridVisible}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              {t('noResults')}
            </h3>
            <p className="text-muted-foreground">
              {t('tryDifferent')}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
}
