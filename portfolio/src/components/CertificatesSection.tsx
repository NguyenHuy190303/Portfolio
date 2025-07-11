'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { certificates, certificateCategories, Certificate } from '@/data/certificates';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { language } = useLanguage();
  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-900/50 to-gray-800/30 
        border border-cyan-500/20 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:scale-105
        hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-400/20
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
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent 
        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      
      {/* Certificate Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={`/certificates/${certificate.filename}`}
          alt={certificate.title[language]}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Level Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold border
          ${certificate.level === 'Advanced' 
            ? 'bg-pink-500/20 border-pink-400/50 text-pink-300' 
            : certificate.level === 'Intermediate'
            ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
            : 'bg-green-500/20 border-green-400/50 text-green-300'
          }`}>
          {certificate.level}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 
            transition-colors duration-300 line-clamp-2">
            {certificate.title[language]}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {certificate.issuer[language]}
          </p>
        </div>
        
        <p className="text-sm text-gray-300 line-clamp-3 group-hover:text-gray-200 
          transition-colors duration-300">
          {certificate.description[language]}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {certificate.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-cyan-500/10 border border-cyan-500/30 
                text-cyan-300 rounded-full"
            >
              {skill}
            </span>
          ))}
          {certificate.skills.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-400">
              +{certificate.skills.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-700/50">
          <span className="text-xs text-gray-400">{certificate.date}</span>
          <div className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
  const { language, t } = useLanguage();
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
        className="relative max-w-4xl w-full max-h-[90vh] bg-gray-900/95 rounded-xl 
          border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 
            text-white hover:text-cyan-300 transition-all duration-300"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-2/3 relative">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-96 relative overflow-hidden">
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
              <h2 id="modal-title" className="text-2xl font-bold text-white mb-2">
                {certificate.title[language]}
              </h2>
              <p className="text-cyan-300 font-medium">
                {certificate.issuer[language]}
              </p>
            </div>

            <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold border
              ${certificate.level === 'Advanced' 
                ? 'bg-pink-500/20 border-pink-400/50 text-pink-300' 
                : certificate.level === 'Intermediate'
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                : 'bg-green-500/20 border-green-400/50 text-green-300'
              }`}>
              {certificate.level}
            </div>

            <p className="text-gray-300 leading-relaxed">
              {certificate.description[language]}
            </p>

            <div>
              <h4 className="text-white font-semibold mb-2">
                {t('certificates.skillsTech')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm bg-cyan-500/10 border border-cyan-500/30 
                      text-cyan-300 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700/50">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">
                  {t('certificates.completed')}: {certificate.date}
                </span>
                {certificate.credentialUrl && (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 
                      hover:bg-cyan-500/30 border border-cyan-500/50 hover:border-cyan-400 
                      text-cyan-300 rounded-lg transition-all duration-300"
                  >
                    {t('certificates.viewCredential')}
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
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            if (cardId) {
              setVisibleCards(prev => new Set([...prev, cardId]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const filteredCertificates = certificates.filter(cert => 
    selectedCategory === 'all' || cert.category === selectedCategory
  );

  return (
    <section id="certificates" className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 
            bg-clip-text text-transparent">
            {t('certificates.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {language === 'en' 
              ? 'Professional certifications and achievements demonstrating expertise in AI, machine learning, and technology innovation.'
              : 'Các chứng chỉ chuyên nghiệp và thành tựu thể hiện chuyên môn trong AI, học máy và đổi mới công nghệ.'
            }
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mb-12">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {certificateCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                    : 'text-gray-400 border border-gray-600/50 hover:text-gray-200 hover:border-gray-500 hover:bg-gray-700/30'
                }`}
              >
                {category.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((certificate, index) => (
            <div
              key={certificate.id}
              data-card-id={certificate.id}
              ref={(el) => {
                if (el && observerRef.current) {
                  observerRef.current.observe(el);
                }
              }}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CertificateCard
                certificate={certificate}
                onClick={() => setSelectedCertificate(certificate)}
                isVisible={visibleCards.has(certificate.id)}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              {language === 'en' ? 'No certificates found' : 'Không tìm thấy chứng chỉ'}
            </h3>
            <p className="text-gray-500">
              {language === 'en' 
                ? 'Try selecting a different category'
                : 'Thử chọn một danh mục khác'
              }
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
