'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.about': 'Về tôi',
    'nav.skills': 'Kỹ năng',
    'nav.experience': 'Kinh nghiệm',
    'nav.projects': 'Dự án',
    'nav.publications': 'Công bố',
    'nav.certificates': 'Chứng chỉ',
    'nav.contact': 'Liên hệ',
    
    // Hero Section
    'hero.title': 'Nguyễn Quốc Huy',
    'hero.alias': 'alias: ',
    'hero.description': 'Research Engineer đam mê với việc tạo ra các giải pháp công nghệ tiên tiến trong lĩnh vực trí tuệ nhân tạo và nghiên cứu khoa học.',
    'hero.cta': 'Khám phá dự án',
    
    // Contact Section
    'contact.title': 'Liên hệ với tôi',
    'contact.info': 'Thông tin liên hệ',
    'contact.email': 'Email',
    'contact.phone': 'Điện thoại',
    'contact.location': 'Địa điểm',
    'contact.send': 'Gửi tin nhắn',
    'contact.name': 'Họ tên',
    'contact.subject': 'Tiêu đề',
    'contact.message': 'Nội dung',
    'contact.send_btn': 'Gửi tin nhắn',
    
    // Certificates
    'certificates.title': 'Chứng chỉ & Thành tựu',
    'certificates.subtitle': 'Các chứng chỉ chuyên nghiệp và thành tựu thể hiện chuyên môn trong AI, học máy và đổi mới công nghệ.',
    'certificates.all': 'Tất cả Chứng chỉ',
    'certificates.viewCredential': 'Xem Chứng chỉ',
    'certificates.completed': 'Hoàn thành',
    'certificates.skillsTech': 'Kỹ năng & Công nghệ',
    'certificates.noResults': 'Không tìm thấy chứng chỉ',
    'certificates.tryDifferent': 'Thử chọn một danh mục khác',
    
    // Languages
    'language.english': 'English',
    'language.vietnamese': 'Tiếng Việt'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.publications': 'Publications',
    'nav.certificates': 'Certificates',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Nguyen Quoc Huy',
    'hero.alias': 'alias: ',
    'hero.description': 'Research Engineer passionate about creating advanced technological solutions in artificial intelligence and scientific research.',
    'hero.cta': 'Explore Projects',
    
    // Contact Section
    'contact.title': 'Contact Me',
    'contact.info': 'Contact Info',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.send': 'Send Message',
    'contact.name': 'Full Name',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send_btn': 'Send Message',
    
    // Certificates
    'certificates.title': 'Certifications & Achievements',
    'certificates.subtitle': 'Professional certifications and achievements demonstrating expertise in AI, machine learning, and technology innovation.',
    'certificates.all': 'All Certificates',
    'certificates.viewCredential': 'View Credential',
    'certificates.completed': 'Completed',
    'certificates.skillsTech': 'Skills & Technologies',
    'certificates.noResults': 'No certificates found',
    'certificates.tryDifferent': 'Try selecting a different category',
    
    // Languages
    'language.english': 'English',
    'language.vietnamese': 'Tiếng Việt'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('vi');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'vi' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['vi']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
