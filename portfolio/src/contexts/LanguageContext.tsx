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

    // About Section
    'about.title': 'Về tôi',
    'about.careerGoals.title': 'Mục tiêu nghề nghiệp',
    'about.careerGoals.description': 'Một nhà nghiên cứu và phát triển AI có kỷ luật cao, đã được chứng minh qua khả năng kết nối giữa các mô hình lý thuyết phức tạp và các ứng dụng thực tế, mạnh mẽ trong lĩnh vực phân tích hình ảnh y tế.',
    'about.passion.title': 'Đam mê',
    'about.passion.description': 'Tôi đam mê việc ứng dụng AI để giải quyết các vấn đề y tế thực tế, đặc biệt trong việc phát triển các hệ thống hỗ trợ chẩn đoán thông minh và cải thiện chất lượng chăm sóc sức khỏe.',
    'about.stats.title': 'Thống kê',
    'about.stats.experience': 'Năm kinh nghiệm',
    'about.stats.projects': 'Dự án hoàn thành',
    'about.stats.publications': 'Công bố khoa học',
    'about.stats.accuracy': 'Độ chính xác mô hình',
    'about.education.title': 'Học vấn',
    'about.education.masters.degree': 'Thạc sĩ Khoa học Máy tính',
    'about.education.masters.school': 'Đại học ABC • 2020-2022',
    'about.education.bachelors.degree': 'Cử nhân Công nghệ Thông tin',
    'about.education.bachelors.school': 'Đại học XYZ • 2016-2020',

    // Skills Section
    'skills.title': 'Kỹ năng chuyên môn',
    'skills.subtitle': 'Các công nghệ và kỹ năng tôi sử dụng để tạo ra những giải pháp AI tiên tiến',
    'skills.programming.title': '💻 Ngôn ngữ lập trình',
    'skills.aiFrameworks.title': '🤖 Frameworks AI/ML',
    'skills.devTools.title': '🔧 Công cụ phát triển',
    'skills.expertise.title': '🎯 Chuyên môn chính',
    'skills.additionalTech': 'Tech Stack khác',

    // Projects Section
    'projects.title': 'Các dự án nổi bật',
    'projects.clinicalQA.name': 'LLM-based Clinical Question Answering',
    'projects.clinicalQA.description': 'Hệ thống hỏi đáp y khoa sử dụng RAG với mô hình Llama2 fine-tuned.',
    'projects.tumorSegmentation.name': 'CT-Scan Tumor Segmentation',
    'projects.tumorSegmentation.description': 'Mô hình UNet++ phân đoạn khối u trên ảnh CT-Scan.',
    
    // Hero Section
    'hero.title': 'Nguyễn Quốc Huy',
    'hero.alias': 'alias: ',
    'hero.description': 'Research Engineer đam mê với việc tạo ra các giải pháp công nghệ tiên tiến trong lĩnh vực trí tuệ nhân tạo và nghiên cứu khoa học.',
    'hero.cta': 'Khám phá dự án',
    'hero.typing.1': 'Xin chào! Tôi là một Kỹ sư Nghiên cứu AI xây dựng các giải pháp sáng tạo.',
    'hero.typing.2': 'Xin chào! Tôi là một Kỹ sư Deep Learning biến dữ liệu thành công nghệ hướng con người.',
    'hero.typing.3': 'Xin chào! Tôi là một Người Xây dựng Đổi mới hợp tác về công nghệ cải thiện cuộc sống.',
    'hero.typing.4': 'Xin chào! Tôi là một Nhà Khám phá Công nghệ hướng dẫn ý tưởng từ khái niệm đến tác động thực tế.',
    'hero.typing.5': 'Xin chào! Tôi thiết kế các thuật toán thông minh để giải quyết những thách thức phức tạp.',
    'hero.system.init': '&gt; System.Initialize()',
    'hero.system.loading': '&gt; Loading Profile: Research_Engineer.exe',
    'hero.system.status': '&gt; Status: <span className="text-accent">ONLINE</span> | Sẵn sàng cho Đổi mới',
    'hero.cv.button': 'CV CỦA TÔI TẠI ĐÂY',
    'hero.schedule.button': 'KẾT NỐI VỚI TÔI',
    
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
    'contact.direct.title': 'Liên hệ trực tiếp',
    'contact.direct.description': 'Chọn phương thức liên hệ phù hợp nhất với bạn',
    'contact.direct.email': 'Gửi Email',
    'contact.direct.linkedin': 'LinkedIn',
    'contact.direct.schedule': 'Lên lịch cuộc gọi',
    
    // Publications
    'publications.title': 'Công bố Khoa học',
    'publications.subtitle': 'Nghiên cứu và công bố khoa học trong lĩnh vực trí tuệ nhân tạo, học máy và y sinh học.',
    'publications.status.published': 'Đã xuất bản',
    'publications.status.accepted': 'Đã chấp nhận',
    'publications.status.under_review': 'Đang xem xét',
    'publications.noPublications': 'Chưa có công bố',
    'publications.comingSoon': 'Các công bố mới sẽ được cập nhật sớm',

    // Experience
    'experience.title': 'Kinh nghiệm & Vai trò Lãnh đạo',
    'experience.subtitle': 'Hành trình nghề nghiệp và các vai trò lãnh đạo trong nghiên cứu và phát triển công nghệ.',
    'experience.present': 'Hiện tại',
    'experience.responsibilities': 'Trách nhiệm chính',
    'experience.achievements': 'Thành tựu',

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

    // About Section
    'about.title': 'About Me',
    'about.careerGoals.title': 'Career Goals',
    'about.careerGoals.description': 'A disciplined AI researcher and developer with proven ability to bridge complex theoretical models with practical applications, with strong expertise in medical image analysis.',
    'about.passion.title': 'Passion',
    'about.passion.description': 'I am passionate about applying AI to solve real-world healthcare problems, particularly in developing intelligent diagnostic support systems and improving healthcare quality.',
    'about.stats.title': 'Statistics',
    'about.stats.experience': 'Years Experience',
    'about.stats.projects': 'Projects Completed',
    'about.stats.publications': 'Research Publications',
    'about.stats.accuracy': 'Model Accuracy',
    'about.education.title': 'Education',
    'about.education.masters.degree': 'Master of Computer Science',
    'about.education.masters.school': 'ABC University • 2020-2022',
    'about.education.bachelors.degree': 'Bachelor of Information Technology',
    'about.education.bachelors.school': 'XYZ University • 2016-2020',

    // Skills Section
    'skills.title': 'Professional Skills',
    'skills.subtitle': 'Technologies and skills I use to create advanced AI solutions',
    'skills.programming.title': '💻 Programming Languages',
    'skills.aiFrameworks.title': '🤖 AI/ML Frameworks',
    'skills.devTools.title': '🔧 Development Tools',
    'skills.expertise.title': '🎯 Core Expertise',
    'skills.additionalTech': 'Additional Tech Stack',

    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.clinicalQA.name': 'LLM-based Clinical Question Answering',
    'projects.clinicalQA.description': 'Medical Q&A system using RAG with fine-tuned Llama2 model.',
    'projects.tumorSegmentation.name': 'CT-Scan Tumor Segmentation',
    'projects.tumorSegmentation.description': 'UNet++ model for tumor segmentation on CT-Scan images.',
    
    // Hero Section
    'hero.title': 'Nguyen Quoc Huy',
    'hero.alias': 'alias: ',
    'hero.description': 'I am an AI Research Engineer with a background in information technology and a passion for leveraging technology to improve lives. My experience designing and implementing AI algorithms and models allows me to approach complex challenges with creative problem-solving and critical thinking skills. I bring a collaborative spirit fostered through teamwork and project management experience, and effectively communicate complex technical concepts to diverse audiences.',
    'hero.cta': 'Explore Projects',
    'hero.typing.1': 'Hello there! I\'m an AI Research Engineer building innovative solutions.',
    'hero.typing.2': 'Hello there! I\'m a Deep Learning Engineer turning data into human-centric technology.',
    'hero.typing.3': 'Hello there! I\'m an Innovation Builder collaborating on technologies that improve lives.',
    'hero.typing.4': 'Hello there! I\'m a Tech Explorer guiding ideas from concept to real-world impact.',
    'hero.typing.5': 'Hello there! I design intelligent algorithms to solve complex challenges.',
    'hero.system.init': '&gt; System.Initialize()',
    'hero.system.loading': '&gt; Loading Profile: Research_Engineer.exe',
    'hero.system.status': '&gt; Status: <span className="text-accent">ONLINE</span> | Ready for Innovation',
    'hero.cv.button': 'MY CV HERE',
    'hero.schedule.button': 'CONNECT WITH ME',
    
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
    'contact.direct.title': 'Direct Contact',
    'contact.direct.description': 'Choose the most convenient way to reach out',
    'contact.direct.email': 'Email Me',
    'contact.direct.linkedin': 'LinkedIn',
    'contact.direct.schedule': 'Schedule Call',
    
    // Publications
    'publications.title': 'Research Publications',
    'publications.subtitle': 'Research and scientific publications in artificial intelligence, machine learning, and biomedical informatics.',
    'publications.status.published': 'Published',
    'publications.status.accepted': 'Accepted',
    'publications.status.under_review': 'Under Review',
    'publications.noPublications': 'No publications yet',
    'publications.comingSoon': 'New publications will be updated soon',

    // Experience
    'experience.title': 'Experience & Leadership',
    'experience.subtitle': 'Professional journey and leadership roles in research and technology development.',
    'experience.present': 'Present',
    'experience.responsibilities': 'Key Responsibilities',
    'experience.achievements': 'Achievements',

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
  const [language, setLanguageState] = useState<Language>('en');

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
    const translation = translations[language] as Record<string, string>;
    return translation[key] || key;
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
