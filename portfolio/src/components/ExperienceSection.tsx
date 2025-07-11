"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Experience = {
  title: {
    en: string;
    vi: string;
  };
  org: string;
  time: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  responsibilities: {
    en: string[];
    vi: string[];
  };
  achievements: {
    en: string[];
    vi: string[];
  };
  type: 'leadership' | 'research' | 'development';
};

const experiences: Experience[] = [
  {
    title: {
      en: "CEO & Founder",
      vi: "CEO & Người sáng lập"
    },
    org: "Capybara Company",
    time: {
      en: "2024 – Present",
      vi: "2024 – Hiện tại"
    },
    description: {
      en: "Leading a technology startup focused on innovative AI solutions and digital transformation services.",
      vi: "Lãnh đạo startup công nghệ tập trung vào các giải pháp AI sáng tạo và dịch vụ chuyển đổi số."
    },
    responsibilities: {
      en: [
        "Strategic planning and business development",
        "Team leadership and organizational management",
        "Product vision and technology roadmap",
        "Client relationship management and partnerships"
      ],
      vi: [
        "Lập kế hoạch chiến lược và phát triển kinh doanh",
        "Lãnh đạo nhóm và quản lý tổ chức",
        "Tầm nhìn sản phẩm và lộ trình công nghệ",
        "Quản lý quan hệ khách hàng và đối tác"
      ]
    },
    achievements: {
      en: [
        "Successfully launched multiple AI-powered products",
        "Built and managed a diverse team of 15+ professionals",
        "Established strategic partnerships with key industry players"
      ],
      vi: [
        "Thành công ra mắt nhiều sản phẩm được hỗ trợ bởi AI",
        "Xây dựng và quản lý đội ngũ đa dạng 15+ chuyên gia",
        "Thiết lập quan hệ đối tác chiến lược với các đơn vị hàng đầu"
      ]
    },
    type: 'leadership'
  },
  {
    title: {
      en: "Tech Leader",
      vi: "Trưởng nhóm Công nghệ"
    },
    org: "VLAI Team",
    time: {
      en: "2023 – Present",
      vi: "2023 – Hiện tại"
    },
    description: {
      en: "Leading technical initiatives and AI research projects, driving innovation in machine learning and deep learning applications.",
      vi: "Lãnh đạo các sáng kiến kỹ thuật và dự án nghiên cứu AI, thúc đẩy đổi mới trong ứng dụng học máy và học sâu."
    },
    responsibilities: {
      en: [
        "Technical architecture and system design",
        "Research direction and project management",
        "Code review and quality assurance",
        "Mentoring junior developers and researchers"
      ],
      vi: [
        "Kiến trúc kỹ thuật và thiết kế hệ thống",
        "Định hướng nghiên cứu và quản lý dự án",
        "Đánh giá mã nguồn và đảm bảo chất lượng",
        "Hướng dẫn các nhà phát triển và nghiên cứu viên trẻ"
      ]
    },
    achievements: {
      en: [
        "Led development of 5+ successful AI projects",
        "Improved team productivity by 40% through process optimization",
        "Published 3 research papers in top-tier conferences"
      ],
      vi: [
        "Dẫn dắt phát triển 5+ dự án AI thành công",
        "Cải thiện năng suất nhóm 40% thông qua tối ưu hóa quy trình",
        "Xuất bản 3 bài báo nghiên cứu tại các hội nghị hàng đầu"
      ]
    },
    type: 'leadership'
  },
  {
    title: {
      en: "Researcher",
      vi: "Nghiên cứu viên"
    },
    org: "AIMA Research Lab",
    time: {
      en: "08/2024 – Present",
      vi: "08/2024 – Hiện tại"
    },
    description: {
      en: "Conducting advanced research on Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG) applications in biomedical informatics.",
      vi: "Thực hiện nghiên cứu tiên tiến về mô hình ngôn ngữ lớn (LLM) và ứng dụng RAG trong tin học y sinh."
    },
    responsibilities: {
      en: [
        "Research and development of LLM architectures",
        "Implementation of RAG systems for biomedical data",
        "Collaboration with medical professionals",
        "Publication of research findings"
      ],
      vi: [
        "Nghiên cứu và phát triển kiến trúc LLM",
        "Triển khai hệ thống RAG cho dữ liệu y sinh",
        "Hợp tác với các chuyên gia y tế",
        "Xuất bản các phát hiện nghiên cứu"
      ]
    },
    achievements: {
      en: [
        "Developed novel RAG architecture for medical Q&A",
        "Achieved 15% improvement in biomedical information retrieval",
        "Collaborated on 2 high-impact research publications"
      ],
      vi: [
        "Phát triển kiến trúc RAG mới cho hỏi đáp y tế",
        "Đạt được cải thiện 15% trong truy xuất thông tin y sinh",
        "Hợp tác trong 2 công bố nghiên cứu có tác động cao"
      ]
    },
    type: 'research'
  },
  {
    title: {
      en: "Team Lead",
      vi: "Trưởng nhóm"
    },
    org: "UIT AI Club",
    time: {
      en: "2023 – 2024",
      vi: "2023 – 2024"
    },
    description: {
      en: "Led a team in developing medical image classification systems using Vision Transformer architectures.",
      vi: "Dẫn dắt nhóm phát triển hệ thống phân loại ảnh y tế sử dụng kiến trúc Vision Transformer."
    },
    responsibilities: {
      en: [
        "Project planning and team coordination",
        "Technical implementation and architecture design",
        "Data preprocessing and model training",
        "Performance evaluation and optimization"
      ],
      vi: [
        "Lập kế hoạch dự án và điều phối nhóm",
        "Triển khai kỹ thuật và thiết kế kiến trúc",
        "Tiền xử lý dữ liệu và huấn luyện mô hình",
        "Đánh giá hiệu suất và tối ưu hóa"
      ]
    },
    achievements: {
      en: [
        "Achieved 92% accuracy in medical image classification",
        "Led team of 8 members to successful project completion",
        "Presented findings at university research symposium"
      ],
      vi: [
        "Đạt độ chính xác 92% trong phân loại ảnh y tế",
        "Dẫn dắt nhóm 8 thành viên hoàn thành dự án thành công",
        "Trình bày kết quả tại hội thảo nghiên cứu đại học"
      ]
    },
    type: 'development'
  }
];

export default function ExperienceSection() {
  const { t, language } = useLanguage();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'leadership': return '👑';
      case 'research': return '🔬';
      case 'development': return '💻';
      default: return '🚀';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'leadership': return 'from-yellow-400 to-orange-400';
      case 'research': return 'from-blue-400 to-purple-400';
      case 'development': return 'from-green-400 to-cyan-400';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

      <div className="relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
          {t('experience.title')}
        </h2>
        <p className="text-center text-foreground-secondary mb-16 max-w-3xl mx-auto">
          {t('experience.subtitle')}
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent-secondary to-accent-tertiary"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-start gap-8">
                {/* Timeline dot */}
                <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)} flex items-center justify-center text-2xl shadow-lg`}>
                  {getTypeIcon(exp.type)}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 rounded-lg bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 hover:scale-[1.02] group">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-cyan-300 transition-colors">
                        {exp.title[language]}
                      </h3>
                      <p className="text-accent-secondary font-mono text-sm">
                        {exp.org}
                      </p>
                    </div>
                    <span className="text-accent-tertiary font-mono text-sm bg-accent-tertiary/10 px-3 py-1 rounded-full">
                      {exp.time[language]}
                    </span>
                  </div>

                  <p className="text-foreground-secondary mb-6 leading-relaxed">
                    {exp.description[language]}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-accent font-semibold mb-3 flex items-center gap-2">
                        <span>🎯</span> {t('experience.responsibilities')}
                      </h4>
                      <ul className="space-y-2">
                        {exp.responsibilities[language].map((resp, idx) => (
                          <li key={idx} className="text-sm text-foreground-secondary flex items-start gap-2">
                            <span className="text-accent-secondary mt-1">▸</span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-accent-tertiary font-semibold mb-3 flex items-center gap-2">
                        <span>🏆</span> {t('experience.achievements')}
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements[language].map((achievement, idx) => (
                          <li key={idx} className="text-sm text-foreground-secondary flex items-start gap-2">
                            <span className="text-accent-tertiary mt-1">★</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}