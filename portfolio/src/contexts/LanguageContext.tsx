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
    'nav.about': 'Triết lý',
    'nav.skills': 'Kỹ năng',
    'nav.experience': 'Kinh nghiệm',
    'nav.projects': 'Dự án',
    'nav.publications': 'Nghiên cứu',
    'nav.certificates': 'Chứng chỉ',
    'nav.contact': 'Liên hệ',

    // About Section
    'about.title': 'Triết lý của tôi',
    'about.careerGoals.title': 'Sứ mệnh',
    'about.careerGoals.description': 'Sứ mệnh của tôi là hoạt động tại điểm giao thoa giữa nghiên cứu học thuật và thực thi khởi nghiệp. Tôi được thúc đẩy không chỉ để khám phá các phương pháp AI mới lạ mà còn để áp dụng chúng vào việc tạo ra các sản phẩm có quy mô, có sức ảnh hưởng lớn và giải quyết các vấn đề có ý nghĩa.',
    'about.passion.title': 'Lý do',
    'about.passion.description': 'Tôi tin rằng những tiến bộ công nghệ sâu sắc nhất đến từ sự thấu hiểu sâu sắc về nhu cầu của con người. Niềm tin này đã dẫn tôi đến việc sáng lập Capybara, một dự án dành riêng cho việc tái tạo lại việc học sâu và tập trung. Mục tiêu học thuật của tôi là đóng góp cho cộng đồng khoa học thông qua các công bố tại các hội nghị hàng đầu như AAAI và NeurIPS.',
    'about.stats.title': 'Thống kê',
    'about.stats.experience': 'Năm kinh nghiệm',
    'about.stats.projects': 'Dự án',
    'about.stats.publications': 'Nghiên cứu',
    'about.stats.accuracy': 'Độ chính xác mô hình',
    'about.education.title': 'Học vấn',
    'about.education.masters.degree': 'Thạc sĩ Khoa học Máy tính',
    'about.education.masters.school': 'Đại học Khoa học Tự nhiên, ĐHQG-HCM',
    'about.education.bachelors.degree': 'Cử nhân Công nghệ Thông tin',
    'about.education.bachelors.school': 'Đại học Khoa học Tự nhiên, ĐHQG-HCM',

    // Skills Section
    'skills.title': 'Năng lực chuyên môn',
    'skills.subtitle': 'Các công nghệ và phương pháp tôi sử dụng để kiến tạo các giải pháp thông minh.',
    'skills.programming.title': '💻 Ngôn ngữ & Công cụ',
    'skills.aiFrameworks.title': '🤖 Thư viện AI/ML',
    'skills.devTools.title': '🔧 Hệ sinh thái & DevOps',
    'skills.expertise.title': '🎯 Lĩnh vực chuyên môn',
    'skills.additionalTech': 'Công nghệ khác',

    // Projects Section
    'projects.title': 'Các dự án nổi bật',
    'projects.clinicalQA.name': 'LLM-based Clinical Question Answering',
    'projects.clinicalQA.description': 'Hệ thống hỏi đáp y khoa sử dụng RAG với mô hình Llama2 fine-tuned.',
    'projects.tumorSegmentation.name': 'CT-Scan Tumor Segmentation',
    'projects.tumorSegmentation.description': 'Mô hình UNet++ phân đoạn khối u trên ảnh CT-Scan.',
    
    // Hero Section
    'hero.title': 'Nguyễn Huy',
    'hero.alias': 'alias: ',
    'hero.description': 'Tôi kiến tạo các hệ thống thông minh nơi nghiên cứu chuyên sâu hội tụ với các giải pháp hướng đến thị trường. Công việc của tôi nhằm giải quyết những thách thức phức tạp của thế giới thực, biến những đột phá lý thuyết thành công nghệ trao quyền cho con người. Hiện đang xây dựng Capybara để tái định nghĩa việc học trong kỷ nguyên số.',
    'hero.cta': 'Khám phá dự án',
    'hero.typing.1': 'Kỹ sư Nghiên cứu AI',
    'hero.typing.2': 'Doanh nhân & Nhà sáng lập',
    'hero.typing.3': 'Kiến tạo tương lai của EdTech',
    'hero.typing.4': 'Ứng viên Tiến sĩ tương lai',
    'hero.typing.5': 'Giải quyết vấn đề bằng code & sự tò mò',
    'hero.system.init': '&gt; System.Initialize()',
    'hero.system.loading': '&gt; Loading Profile: AI_Researcher_x_Entrepreneur.exe',
    'hero.system.status': '&gt; Status: <span class="text-accent">ONLINE</span> | <span class="inline-block animate-fadeInLeft text-accent font-bold">Xin chào!</span> Đang kết nối Nghiên cứu & Thực tiễn',
    'hero.cv.button': 'TẢI CV CỦA TÔI',
    'hero.schedule.button': 'LÊN LỊCH HẸN',
    
    // Contact Section
    'contact.title': 'Liên hệ',
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
    'publications.title': 'Nghiên cứu & Công bố',
    'publications.subtitle': 'Các công trình nghiên cứu của tôi, tập trung vào việc thúc đẩy giới hạn của Trí tuệ Nhân tạo.',
    'publications.status.published': 'Đã xuất bản',
    'publications.status.accepted': 'Đã chấp nhận',
    'publications.status.under_review': 'Đang bình duyệt',
    'publications.noPublications': 'Chưa có công bố',
    'publications.comingSoon': 'Các công bố mới sẽ sớm được cập nhật.',

    // Experience
    'experience.title': 'Kinh nghiệm & Vai trò Lãnh đạo',
    'experience.subtitle': 'Hành trình của tôi trong việc dẫn dắt nghiên cứu và phát triển công nghệ.',
    'experience.present': 'Hiện tại',
    'experience.responsibilities': 'Trách nhiệm chính',
    'experience.achievements': 'Thành tựu nổi bật',

    // Certificates
    'certificates.title': 'Chứng chỉ & Thành tựu',
    'certificates.subtitle': 'Các chứng chỉ chuyên môn và thành tựu thể hiện năng lực trong AI và công nghệ.',
    'certificates.all': 'Tất cả',
    'certificates.viewCredential': 'Xem chứng chỉ',
    'certificates.completed': 'Hoàn thành',
    'certificates.skillsTech': 'Kỹ năng & Công nghệ',
    'certificates.noResults': 'Không tìm thấy chứng chỉ',
    'certificates.tryDifferent': 'Vui lòng thử một danh mục khác.',

    // Languages
    'language.english': 'English',
    'language.vietnamese': 'Tiếng Việt'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'Philosophy',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.publications': 'Research',
    'nav.certificates': 'Certificates',
    'nav.contact': 'Contact',

    // About Section
    'about.title': 'My Philosophy',
    'about.careerGoals.title': 'Mission',
    'about.careerGoals.description': 'My mission is to operate at the nexus of academic research and entrepreneurial execution. I am driven to not only discover novel AI methodologies but to apply them in creating scalable, high-impact products that solve meaningful problems.',
    'about.passion.title': 'The "Why"',
    'about.passion.description': 'I believe the most profound technological advancements emerge from a deep understanding of human needs. This belief led me to found Capybara, a venture dedicated to reclaiming deep, focused learning. My academic goal is to contribute to the scientific community through publications at top-tier conferences like AAAI and NeurIPS.',
    'about.stats.title': 'Statistics',
    'about.stats.experience': 'Years Experience',
    'about.stats.projects': 'Projects',
    'about.stats.publications': 'Publications',
    'about.stats.accuracy': 'Model Accuracy',
    'about.education.title': 'Education',
    'about.education.masters.degree': 'Master of Computer Science',
    'about.education.masters.school': 'University of Science, VNU-HCM',
    'about.education.bachelors.degree': 'Bachelor of Information Technology',
    'about.education.bachelors.school': 'University of Science, VNU-HCM',

    // Skills Section
    'skills.title': 'Technical Expertise',
    'skills.subtitle': 'The technologies and methodologies I use to architect intelligent solutions.',
    'skills.programming.title': '💻 Languages & Tools',
    'skills.aiFrameworks.title': '🤖 AI/ML Libraries',
    'skills.devTools.title': '🔧 Ecosystem & DevOps',
    'skills.expertise.title': '🎯 Core Expertise',
    'skills.additionalTech': 'Additional Tech Stack',

    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.clinicalQA.name': 'LLM-based Clinical Question Answering',
    'projects.clinicalQA.description': 'A medical Q&A system using RAG with a fine-tuned Llama2 model.',
    'projects.tumorSegmentation.name': 'CT-Scan Tumor Segmentation',
    'projects.tumorSegmentation.description': 'An UNet++ model for tumor segmentation on CT-Scan images.',
    
    // Hero Section
    'hero.title': 'Huy Nguyen',
    'hero.alias': 'alias: ',
    'hero.description': 'I architect intelligent systems where deep research converges with market-driven solutions. My work aims to solve complex, real-world challenges, transforming theoretical breakthroughs into technologies that empower humanity. Currently building Capybara to redefine learning in the digital age.',
    'hero.cta': 'Explore Projects',
    'hero.typing.1': 'AI Research Engineer',
    'hero.typing.2': 'Entrepreneur & Founder',
    'hero.typing.3': 'Building the future of EdTech',
    'hero.typing.4': 'Future PhD Candidate',
    'hero.typing.5': 'Solving problems with code & curiosity',
    'hero.system.init': '&gt; System.Initialize()',
    'hero.system.loading': '&gt; Loading Profile: AI_Researcher_x_Entrepreneur.exe',
    'hero.system.status': '&gt; Status: <span class="text-accent">ONLINE</span> | <span class="inline-block animate-fadeInLeft text-accent font-bold">Hello there!</span> Bridging Research & Reality',
    'hero.cv.button': 'DOWNLOAD CV',
    'hero.schedule.button': 'SCHEDULE A CALL',
    
    // Contact Section
    'contact.title': 'Get in Touch',
    'contact.info': 'Contact Info',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.send': 'Send a Message',
    'contact.name': 'Full Name',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send_btn': 'Send Message',
    'contact.direct.title': 'Direct Contact',
    'contact.direct.description': 'Choose the most convenient way to reach out.',
    'contact.direct.email': 'Email Me',
    'contact.direct.linkedin': 'LinkedIn',
    'contact.direct.schedule': 'Schedule Call',
    
    // Publications
    'publications.title': 'Research & Publications',
    'publications.subtitle': 'My research, focused on pushing the boundaries of Artificial Intelligence.',
    'publications.status.published': 'Published',
    'publications.status.accepted': 'Accepted',
    'publications.status.under_review': 'Under Review',
    'publications.noPublications': 'No publications yet.',
    'publications.comingSoon': 'New publications will be updated soon.',

    // Experience
    'experience.title': 'Experience & Leadership',
    'experience.subtitle': 'My journey in leading research and developing technology.',
    'experience.present': 'Present',
    'experience.responsibilities': 'Key Responsibilities',
    'experience.achievements': 'Key Achievements',

    // Certificates
    'certificates.title': 'Certifications & Achievements',
    'certificates.subtitle': 'My professional certifications and achievements demonstrating expertise in AI and technology.',
    'certificates.all': 'All',
    'certificates.viewCredential': 'View Credential',
    'certificates.completed': 'Completed',
    'certificates.skillsTech': 'Skills & Technologies',
    'certificates.noResults': 'No certificates found.',
    'certificates.tryDifferent': 'Please try a different category.',

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

