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
    'about.passion.description': 'Tôi tin rằng công nghệ phục vụ tốt nhất khi nó được xây dựng dựa trên sự hiểu biết sâu sắc về nhu cầu thực sự của con người. Động lực thúc đẩy tôi không chỉ là đam mê công nghệ, mà là niềm tin vào việc đóng góp những giá trị cốt lõi cá nhân vào cộng đồng lớn hơn. Thông qua Capybara, tôi mong muốn phục vụ cộng đồng bằng cách giải quyết vấn đề phân tán chú ý trong thời đại số. Đồng thời, tôi coi việc nghiên cứu là con đường phát triển bản thân và đóng góp cho tri thức chung của nhân loại.',
    'about.stats.title': 'Thống kê',
    'about.stats.experience': 'Năm kinh nghiệm',
    'about.stats.projects': 'Dự án',
    'about.stats.models': 'Mô hình AI',
    'about.stats.accuracy': 'Độ chính xác mô hình',
    'about.education.title': 'Học vấn',
    'about.education.masters.degree': 'Thạc sĩ Khoa học Máy tính',
    'about.education.masters.school': 'Đại học Khoa học Tự nhiên, ĐHQG-HCM',
    'about.education.bachelors.degree': 'Cử nhân Công nghệ Thông tin',
    'about.education.bachelors.school': 'Đại học Khoa học Tự nhiên, ĐHQG-HCM',
    'about.expertise.title': 'Chuyên môn AI & ML',
    'about.expertise.llm': 'Mô hình ngôn ngữ lớn (LLMs)',
    'about.expertise.transformer': 'Kiến trúc Transformer',
    'about.expertise.generative': 'Generative AI & GANs',
    'about.expertise.mlops': 'MLOps & Triển khai mô hình',
    'about.expertise.vector': 'Cơ sở dữ liệu Vector & RAG',
    'about.expertise.agent': 'Hệ thống tác tử AI',

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
    'projects.subtitle': 'Một vài dự án tiêu biểu thể hiện chuyên môn kỹ thuật và tác động thực tế.',
    'projects.capybara.name': 'Capybara: The Lakehouse & Scraper',
    'projects.capybara.description': 'Cốt lõi của nỗ lực kinh doanh và nghiên cứu của tôi. Một hệ sinh thái cho việc học sâu và tập trung, được cung cấp bởi một hệ thống AI đa tác nhân. Thành phần scraper thu thập dữ liệu chất lượng cao để cung cấp cho các mô hình học tập.',
    'projects.mentalCare.name': 'Mental-Care-AI',
    'projects.mentalCare.description': 'Một hệ thống hỗ trợ sức khỏe tâm thần do AI điều khiển sử dụng LlamaIndex để cung cấp lời khuyên tâm lý thời gian thực, chẩn đoán tình trạng và theo dõi tiến trình của người dùng.',
    'projects.fdaMa.name': 'FDA-MA: Paper & Repository',
    'projects.fdaMa.description': 'Kho lưu trữ chính thức cho một bài báo nghiên cứu, thể hiện khả năng chuyển đổi các khái niệm lý thuyết phức tạp thành mã th��c tế, có thể tái tạo.',
    'projects.dental.name': 'DENTAL: Image Segmentation',
    'projects.dental.description': 'Các mô hình AI tiên tiến để phân đoạn và phân tích hình ảnh nha khoa, thể hiện chuyên môn về thị giác máy tính cho các ứng dụng y tế chuyên biệt.',
    'projects.fashion.name': 'AI Fashion Recommendations',
    'projects.fashion.description': 'Một nền tảng đề xuất trang phục thời trang tận dụng AI để cá nhân hóa phong cách cho người dùng.',
    'projects.creative.name': 'Creative Motion',
    'projects.creative.description': 'Một nền tảng sáng tạo được thiết kế để khơi dậy sự đổi mới và trí tưởng tượng, được xây dựng bằng các công nghệ hiện đại.',

    // Case Studies Section
    'caseStudies.title': 'Nghiên cứu điển hình',
    'caseStudies.subtitle': 'Các phân tích sâu về các dự án và thách thức kỹ thuật.',
    'caseStudies.readMore': 'Đọc thêm',
    
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
    'hero.system.status': '&gt; Status: <span class="text-accent">ONLINE</span> | Xin chào! Đang kết nối Nghiên cứu & Thực tiễn',
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
    'about.passion.description': 'I believe technology serves best when built upon a deep understanding of genuine human needs. My motivation stems not just from passion for technology, but from a belief in contributing personal core values to the larger community. Through Capybara, I aim to serve the community by addressing attention fragmentation in the digital age. I view research as both a path for personal growth and a way to contribute to humanity\'s collective knowledge, always approaching it with humility and a desire to learn from others.',
    'about.stats.title': 'Statistics',
    'about.stats.experience': 'Years Experience',
    'about.stats.projects': 'Projects',
    'about.stats.models': 'AI Models',
    'about.stats.accuracy': 'Model Accuracy',
    'about.education.title': 'Education',
    'about.education.masters.degree': 'Professional training',
    'about.education.masters.school': 'AI Viet Nam, AIO 2024',
    'about.education.bachelors.degree': 'Bachelor of Information Technology',
    'about.education.bachelors.school': 'Vaasa University of Applied Sciences , VAMK',
    'about.expertise.title': 'AI & ML Expertise',
    'about.expertise.llm': 'Large Language Models (LLMs)',
    'about.expertise.transformer': 'Transformer Architecture',
    'about.expertise.generative': 'Generative AI & GANs',
    'about.expertise.mlops': 'MLOps & Model Deployment',
    'about.expertise.vector': 'Vector Databases & RAG',
    'about.expertise.agent': 'AI Agent Systems',

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
    'projects.subtitle': 'A small selection of recent projects that showcase technical expertise and real-world impact.',
    'projects.capybara.name': 'Capybara: The Lakehouse & Scraper',
    'projects.capybara.description': 'The core of my entrepreneurial and research efforts. An ecosystem for deep, focused learning, powered by a multi-agent AI system. The scraper component gathers high-quality data to feed the learning models.',
    'projects.mentalCare.name': 'Mental-Care-AI',
    'projects.mentalCare.description': 'An AI-driven mental health support system using the LlamaIndex framework to provide real-time psychological advice, diagnose conditions, and track user progress.',
    'projects.fdaMa.name': 'FDA-MA: Paper & Repository',
    'projects.fdaMa.description': 'The official repository for a research paper, demonstrating the ability to translate complex theoretical concepts into practical, reproducible code.',
    'projects.dental.name': 'DENTAL: Image Segmentation',
    'projects.dental.description': 'Advanced AI models for dental image segmentation and analysis, showcasing expertise in computer vision for specialized medical applications.',
    'projects.fashion.name': 'AI Fashion Recommendations',
    'projects.fashion.description': 'A fashion-forward outfit recommendation platform leveraging AI to personalize style for users.',
    'projects.creative.name': 'Creative Motion',
    'projects.creative.description': 'A creative platform designed to spark innovation and imagination, built with modern technologies.',

    // Case Studies Section
    'caseStudies.title': 'Case Studies',
    'caseStudies.subtitle': 'Deep dives into projects and technical challenges.',
    'caseStudies.readMore': 'Read More',
    
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
    'hero.system.status': '&gt; Status: <span class="text-accent">ONLINE</span> | Hello there! Bridging Research & Reality',
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

