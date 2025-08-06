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
      en: "Founder Capybara team",
      vi: "Người sáng lập đội Capybara"
    },
    org: "Capybara",
    time: {
      en: "July 2025 – Present",
      vi: "Tháng 7, 2025 – Hiện tại"
    },
    description: {
      en: "Founded Capybara team to revolutionize focused learning through AI. Building a comprehensive learning ecosystem that combats attention fragmentation in the digital age.",
      vi: "Thành lập đội Capybara để cách mạng hóa việc học tập tập trung thông qua AI. Xây dựng một hệ sinh thái học tập toàn diện chống lại sự phân tán chú ý trong thời đại kỹ thuật số."
    },
    responsibilities: {
      en: [
        "Founded and architected the vision for Capybara: The Lakehouse learning ecosystem.",
        "Developed comprehensive strategic plan combining Deep Work principles with AI technology.",
        "Built and led multi-disciplinary team focused on combating attention economy.",
        "Designed Specification-Driven Development methodology for scalable AI systems."
      ],
      vi: [
        "Thành lập và kiến tạo tầm nhìn cho hệ sinh thái học tập Capybara: The Lakehouse.",
        "Phát triển kế hoạch chiến lược toàn diện kết hợp nguyên tắc Deep Work với công nghệ AI.",
        "Xây dựng và lãnh đạo đội ngũ đa ngành tập trung chống lại nền kinh tế chú ý.",
        "Thiết kế phương pháp Phát triển dựa trên Đặc tả cho hệ thống AI có thể mở rộng."
      ]
    },
    achievements: {
      en: [
        "Conceptualized and documented comprehensive 6-part strategic framework.",
        "Established Capybara's mission to reclaim deep, focused learning in digital age.",
        "Created innovative Dual-Intake Experience combining content curation with AI tutoring.",
        "Built foundational multi-agent system architecture for personalized learning."
      ],
      vi: [
        "Hình thành và tài liệu hóa khung chiến lược toàn diện gồm 6 phần.",
        "Thiết lập sứ mệnh của Capybara nhằm tái chiếm việc học sâu, tập trung trong thời đại số.",
        "Tạo ra Trải nghiệm Hấp thụ Kép sáng tạo kết hợp tuyển chọn nội dung với gia sư AI.",
        "Xây dựng kiến trúc hệ thống đa tác nhân nền tảng cho việc học cá nhân hóa."
      ]
    },
    type: 'leadership'
  },
  {
    title: {
      en: "AI Researcher",
      vi: "Nghiên cứu viên AI"
    },
    org: "AIMA",
    time: {
      en: "June 2024 – Present",
      vi: "Tháng 6, 2024 – Hiện tại"
    },
    description: {
      en: "Collaborating with doctors and medical experts to advance AI-powered solutions in healthcare, focusing on bridging the gap between advanced technology and clinical application.",
      vi: "Hợp tác với các bác sĩ và chuyên gia y tế để thúc đẩy các giải pháp do AI cung cấp trong lĩnh vực chăm sóc sức khỏe, tập trung vào việc thu hẹp khoảng cách giữa công nghệ tiên tiến và ứng dụng lâm sàng."
    },
    responsibilities: {
      en: [
        "Developing and implementing AI models for medical image analysis.",
        "Conducting research on the application of LLMs in diagnostics.",
        "Working closely with medical teams to ensure clinical relevance.",
        "Contributing to research papers and internal knowledge sharing."
      ],
      vi: [
        "Phát triển và triển khai các mô hình AI để phân tích hình ảnh y tế.",
        "Thực hiện nghiên cứu về ứng dụng của LLM trong chẩn đoán.",
        "Làm việc chặt chẽ với các đội ngũ y tế để đảm bảo sự phù hợp lâm sàng.",
        "Đóng góp vào các bài báo nghiên cứu và chia sẻ kiến thức nội bộ."
      ]
    },
    achievements: {
      en: [
        "Contributed to a 10% improvement in diagnostic accuracy in a pilot study.",
        "Co-authored a paper submitted to a leading medical AI journal.",
        "Received positive feedback from clinical partners on model usability."
      ],
      vi: [
        "Đóng góp vào việc cải thiện 10% độ chính xác chẩn đoán trong một nghiên cứu thí điểm.",
        "Đồng tác giả một bài báo được gửi đến một tạp chí AI y tế hàng đầu.",
        "Nhận được phản hồi tích cực từ các đối tác lâm sàng về khả năng sử dụng của mô hình."
      ]
    },
    type: 'research'
  },
  {
    title: {
      en: "Tech Lead Researcher",
      vi: "Trưởng nhóm Nghiên cứu Kỹ thuật"
    },
    org: "VLAI",
    time: {
      en: "2023 – 2024",
      vi: "2023 – 2024"
    },
    description: {
      en: "Led research and development for key AI projects, including the award-winning Mental Health Care chatbot.",
      vi: "Dẫn dắt nghiên cứu và phát triển cho các dự án AI trọng điểm, bao gồm chatbot Chăm sóc Sức khỏe Tinh thần đã đoạt giải."
    },
    responsibilities: {
      en: [
        "Led an international team of 4 members to develop the Mental Health Care chatbot.",
        "Designed the system architecture and core NLP models.",
        "Managed project timeline, resources, and cross-cultural communication.",
        "Mentored team members in advanced NLP and chatbot technologies."
      ],
      vi: [
        "Lãnh đạo một nhóm quốc tế gồm 4 thành viên phát triển chatbot Chăm sóc Sức khỏe Tinh thần.",
        "Thiết kế kiến trúc hệ thống và các mô hình NLP lõi.",
        "Quản lý tiến độ, tài nguyên và giao tiếp đa văn hóa của dự án.",
        "Cố vấn các thành viên trong nhóm về NLP và công nghệ chatbot tiên tiến."
      ]
    },
    achievements: {
      en: [
        "Won First Prize at the university-level research competition as a third-year student.",
        "The project was recognized for its innovation and social impact.",
        "Successfully deployed a functional prototype for user testing."
      ],
      vi: [
        "Giành giải Nhất tại cuộc thi nghiên cứu khoa học cấp trường khi còn là sinh viên năm 3.",
        "Dự án được công nhận về sự đổi mới và tác động xã hội.",
        "Triển khai thành công một nguyên mẫu hoạt động để người dùng thử nghiệm."
      ]
    },
    type: 'research'
  },
  {
    title: {
      en: "Time-Series Research Team Leader",
      vi: "Trưởng nhóm Nghiên cứu Chuỗi thời gian"
    },
    org: "AI VietNam",
    time: {
      en: "2022 – 2023",
      vi: "2022 – 2023"
    },
    description: {
      en: "Led a research group of 4 members focused on advancing time-series forecasting and analysis models.",
      vi: "Dẫn dắt một nhóm nghiên cứu gồm 4 thành viên tập trung vào việc phát triển các mô hình dự báo và phân tích chuỗi thời gian tiên tiến."
    },
    responsibilities: {
      en: [
        "Exploring and implementing state-of-the-art time-series models.",
        "Conducting experiments and benchmarking model performance.",
        "Coordinating research activities and knowledge sharing within the team.",
        "Preparing research findings for potential publication."
      ],
      vi: [
        "Khám phá và triển khai các mô hình chuỗi thời gian tiên tiến nhất.",
        "Thực hiện các thí nghiệm và đo lường hiệu suất của mô hình.",
        "Điều phối các hoạt động nghiên cứu và chia sẻ kiến thức trong nhóm.",
        "Chuẩn bị các kết quả nghiên cứu để có khả năng xuất bản."
      ]
    },
    achievements: {
      en: [
        "Improved forecasting accuracy by 15% on benchmark datasets.",
        "Developed a novel anomaly detection algorithm for time-series data.",
        "Fostered a collaborative and productive research environment."
      ],
      vi: [
        "Cải thiện độ chính xác dự báo 15% trên các bộ dữ liệu tiêu chuẩn.",
        "Phát triển một thuật toán phát hiện bất thường mới cho dữ liệu chuỗi thời gian.",
        "Thúc đẩy một môi trường nghiên cứu hợp tác và hiệu quả."
      ]
    },
    type: 'research'
  }
];

import { useStaggeredAnimation } from "@/hooks/useScrollAnimation";

export default function ExperienceSection() {
  const { t, language } = useLanguage();
  const { ref, isVisible, visibleItems } = useStaggeredAnimation(experiences.length);

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
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto relative bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent -z-10" />
      <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
          {t('experience.title')}
        </h2>
        <p className="text-center text-foreground-secondary mb-16 max-w-3xl mx-auto">
          {t('experience.subtitle')}
        </p>

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent-secondary to-accent-tertiary"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex items-start gap-8 transition-all duration-500 ${visibleItems.has(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'}`}>
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