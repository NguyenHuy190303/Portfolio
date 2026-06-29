import { FileText } from "lucide-react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const content = {
  en: {
    bio: "I'm Leo (Nguyễn Huy), an AI/ML engineer at Trivita AI building medical AI in Vietnamese. I own the full data lifecycle — from EMR ingestion through synthetic generation to versioned datasets — on a 2×8×H100 on-prem cluster with access to NVL72 GB200. My work sits at the intersection of Vietnamese NLP, real-world healthcare data, and frontier-scale compute, under international mentor lineage from Taiwan AI research.",
    working: "What I'm working on",
    workItems: [
      "MedVita — Vietnamese medical AI assistant with guardrail system (P1–P5), ICD-10 VN integration, SOCRATES per-department, BV TW Thái Nguyên HIS.",
      "Trivita-Eval — internal LLM evaluation platform (FastAPI + Celery + Redis + Langfuse + DeepEval + DeepTeam), G-Eval medical metrics, LLM-as-judge calibration.",
      "Post-Training OS — SFT/DPO feedback loop (eval → targeted data gen → train) running on 2×8×H100, 24–48h iteration cycle.",
    ],
    stack: "Stack",
    stackText: "Python · FastAPI · vLLM · TGI · TensorRT-LLM · DVC · MinIO · Label Studio · Langfuse · W&B · Docker · Kubernetes · GitHub Actions",
    experience: "Experience",
    experiences: [
      { role: "AI/ML Engineer", org: "Trivita AI", period: "Sep 2025 – present" },
      { role: "AI Researcher", org: "AIMA", period: "Jun 2024 – present" },
      { role: "Tech Lead Researcher", org: "VLAI", period: "2023 – 2024" },
      { role: "Time-Series Research Lead", org: "AI Vietnam", period: "2022 – 2023" },
    ],
    education: "Education",
    educations: [
      { degree: "B.Sc. Information Technology", school: "VAMK, Finland" },
      { degree: "Professional AI Training", school: "AIO 2024" },
    ],
    links: "Links",
  },
  vi: {
    bio: "Tôi là Leo (Nguyễn Huy), kỹ sư AI/ML tại Trivita AI, xây dựng AI y tế tiếng Việt. Tôi cầm toàn bộ vòng đời dữ liệu — từ thu thập EMR, sinh dữ liệu tổng hợp đến dataset có version — trên cụm 2×8×H100 on-prem và có truy cập NVL72 GB200. Công việc của tôi nằm ở giao điểm giữa NLP tiếng Việt, dữ liệu y tế thực tế và compute frontier, dưới mentor lineage quốc tế từ nghiên cứu AI Taiwan.",
    working: "Đang làm gì",
    workItems: [
      "MedVita — trợ lý AI y tế tiếng Việt với hệ thống guardrail (P1–P5), tích hợp ICD-10 VN, SOCRATES theo chuyên khoa, HIS BV TW Thái Nguyên.",
      "Trivita-Eval — nền tảng đánh giá LLM nội bộ (FastAPI + Celery + Redis + Langfuse + DeepEval + DeepTeam), G-Eval y tế, hiệu chỉnh LLM-as-judge.",
      "Post-Training OS — vòng lặp phản hồi SFT/DPO (eval → sinh data → train) chạy trên 2×8×H100, chu kỳ 24–48h.",
    ],
    stack: "Stack",
    stackText: "Python · FastAPI · vLLM · TGI · TensorRT-LLM · DVC · MinIO · Label Studio · Langfuse · W&B · Docker · Kubernetes · GitHub Actions",
    experience: "Kinh nghiệm",
    experiences: [
      { role: "Kỹ sư AI/ML", org: "Trivita AI", period: "Tháng 9, 2025 – nay" },
      { role: "Nghiên cứu viên AI", org: "AIMA", period: "Tháng 6, 2024 – nay" },
      { role: "Trưởng nhóm nghiên cứu kỹ thuật", org: "VLAI", period: "2023 – 2024" },
      { role: "Trưởng nhóm nghiên cứu chuỗi thời gian", org: "AI Vietnam", period: "2022 – 2023" },
    ],
    education: "Học vấn",
    educations: [
      { degree: "Cử nhân Công nghệ Thông tin", school: "VAMK, Phần Lan" },
      { degree: "Đào tạo AI chuyên nghiệp", school: "AIO 2024" },
    ],
    links: "Liên kết",
  },
};

export default function MinimalAbout({ locale }: { locale: string }) {
  const c = locale === "vi" ? content.vi : content.en;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">Leo (Nguyễn Huy)</h1>
        <p className="text-muted-foreground text-sm mb-4">AI/ML Engineer · Trivita AI</p>
        <p className="text-base leading-relaxed">{c.bio}</p>
      </div>

      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">{c.working}</h2>
        <ul className="space-y-2">
          {c.workItems.map((item, i) => (
            <li key={i} className="text-sm leading-relaxed text-muted-foreground pl-4 border-l border-border">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-base font-semibold text-foreground mb-2">{c.stack}</h2>
        <p className="text-sm text-muted-foreground">{c.stackText}</p>
      </div>

      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">{c.experience}</h2>
        <ul className="space-y-2">
          {c.experiences.map((exp, i) => (
            <li key={i} className="text-sm flex flex-wrap gap-x-1.5">
              <span className="text-foreground font-medium">{exp.role}</span>
              <span className="text-muted-foreground">· {exp.org} · {exp.period}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">{c.education}</h2>
        <ul className="space-y-1">
          {c.educations.map((edu, i) => (
            <li key={i} className="text-sm">
              <span className="text-foreground">{edu.degree}</span>
              <span className="text-muted-foreground"> · {edu.school}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">{c.links}</h2>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/NguyenHuy190303"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm no-underline text-muted-foreground hover:text-foreground transition-colors"
          >
            <GithubIcon /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/nguyen-huy-1903"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm no-underline text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkedinIcon /> LinkedIn
          </a>
          <a
            href="/Nguyen_Huy_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm no-underline text-muted-foreground hover:text-foreground transition-colors"
          >
            <FileText className="w-4 h-4" /> CV
          </a>
        </div>
      </div>
    </div>
  );
}
