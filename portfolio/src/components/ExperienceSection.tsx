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
      en: "AI Engineer",
      vi: "Kỹ sư AI"
    },
    org: "Trivita AI",
    time: {
      en: "September 2025 – Present",
      vi: "Tháng 9, 2025 – Hiện tại"
    },
    description: {
      en: "Working full-time as an AI Engineer, developing advanced AI solutions and contributing to the core technology stack.",
      vi: "Làm việc toàn thời gian với vai trò Kỹ sư AI, phát triển các giải pháp AI tiên tiến và đóng góp vào nền tảng công nghệ cốt lõi."
    },
    responsibilities: {
      en: [
        "Developing and optimizing large-scale AI models for production environments.",
        "Collaborating with cross-functional teams to integrate AI features into products.",
        "Researching new model architectures to improve system performance and efficiency."
      ],
      vi: [
        "Phát triển và tối ưu hóa các mô hình AI quy mô lớn cho môi trường sản xuất.",
        "Hợp tác với các nhóm liên chức năng để tích hợp các tính năng AI vào sản phẩm.",
        "Nghiên cứu các kiến trúc mô hình mới để cải thiện hiệu suất và hiệu quả hệ thống."
      ]
    },
    achievements: {
      en: [
        "Successfully deployed key AI features to production.",
        "Improved model inference speed by significant margins."
      ],
      vi: [
        "Triển khai thành công các tính năng AI chính vào sản xuất.",
        "Cải thiện đáng kể tốc độ suy luận của mô hình."
      ]
    },
    type: 'development'
  },
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


export default function ExperienceSection() {
  const { t, language } = useLanguage();

  return (
    <section id="experience" className="section relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="section-content">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl mb-4">
            <span className="text-gradient">{t('experience.title')}</span>
          </h2>
          <p className="section-subtitle mx-auto text-lg">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-accent rounded-full transform -translate-x-1/2 translate-y-2 shadow-[0_0_10px_var(--accent)] hidden md:block"></div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <div className={`glass-card p-8 hover:border-accent/50 transition-all duration-300 group ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    <div className="flex flex-col gap-2 mb-6">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                          {exp.time[language]}
                        </span>
                        <span className="text-xs text-foreground-muted uppercase tracking-wider">
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {exp.title[language]}
                      </h3>
                      <p className="text-lg text-foreground-secondary font-medium">
                        {exp.org}
                      </p>
                    </div>

                    <p className="text-foreground-secondary mb-6 leading-relaxed">
                      {exp.description[language]}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                          {t('experience.responsibilities')}
                        </h4>
                        <ul className="space-y-2">
                          {exp.responsibilities[language].map((resp, idx) => (
                            <li key={idx} className="text-sm text-foreground-secondary flex items-start gap-2">
                              <span className="text-accent mt-1.5">•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {exp.achievements[language].length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            {t('experience.achievements')}
                          </h4>
                          <ul className="space-y-2">
                            {exp.achievements[language].map((achievement, idx) => (
                              <li key={idx} className="text-sm text-foreground-secondary flex items-start gap-2">
                                <span className="text-primary mt-1.5">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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