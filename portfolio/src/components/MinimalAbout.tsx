import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";
import { WorkItems } from "@/components/WorkItems";

export const content = {
  en: {
    bio: "I'm Leo (Nguyễn Huy), an AI engineer at Trivita AI building medical AI in Vietnamese. I own the full data lifecycle — from EMR ingestion through synthetic generation to versioned datasets — and the post-training and evaluation loop on an on-prem multi-node H100 cluster, with partner access to GB200 NVL72. My work sits at the intersection of Vietnamese NLP, real-world healthcare data, and large-scale compute, under international mentor lineage from Taiwan AI research.",
    working: "What I'm working on",
    workItems: [
      "MedVita — Vietnamese medical history-taking assistant: ICD-10 VN normalisation, SOCRATES-structured history-taking per department, tiered safety guardrails, integrated with a central hospital's HIS.",
      "LLM evaluation platform — started the company's self-hosted eval platform (FastAPI, Celery, Redis, Langfuse, DeepEval, DeepTeam): medical G-Eval metrics, LLM-as-judge calibration, red-teaming.",
      "Post-training loop — eval → targeted data generation → SFT/DPO with LoRA/QLoRA on an on-prem multi-node H100 cluster, day-scale iteration cycles.",
    ],
    stack: "Stack",
    stackText: "Python · FastAPI · vLLM · TGI · TensorRT-LLM · DVC · MinIO · Label Studio · Langfuse · W&B · Docker · Kubernetes · GitHub Actions",
    experience: "Experience",
    experiences: [
      { role: "AI Engineer", org: "Trivita AI", period: "Sep 2025 – present" },
      { role: "AI Researcher", org: "AIMA", period: "Jun 2024 – 2025" },
      { role: "Multi-Agent VQA Research Team Lead", org: "VLAI", period: "2023 – 2024" },
      { role: "Time-Series Research Team Lead", org: "AI VIET NAM", period: "2022 – 2023" },
    ],
    education: "Education",
    educations: [
      { degree: "B.Sc. Information Technology", school: "VAMK, Finland" },
      { degree: "Professional AI Training", school: "AIO 2024" },
    ],
  },
  vi: {
    bio: "Tôi là Leo (Nguyễn Huy), kỹ sư AI tại Trivita AI, xây dựng AI y tế tiếng Việt. Tôi cầm toàn bộ vòng đời dữ liệu — từ thu thập EMR, sinh dữ liệu tổng hợp đến dataset có version — cùng vòng lặp post-training và đánh giá trên cụm H100 nhiều node on-prem, có truy cập GB200 NVL72 qua đối tác. Công việc của tôi nằm ở giao điểm giữa NLP tiếng Việt, dữ liệu y tế thực tế và compute quy mô lớn, dưới mentor lineage quốc tế từ nghiên cứu AI Taiwan.",
    working: "Đang làm gì",
    workItems: [
      "MedVita — trợ lý hỏi bệnh sử tiếng Việt: chuẩn hoá ICD-10 VN, hỏi bệnh theo SOCRATES cho từng chuyên khoa, guardrail an toàn nhiều tầng, kết nối HIS của một bệnh viện tuyến trung ương.",
      "Nền tảng đánh giá LLM — khởi xướng nền tảng eval self-hosted của công ty (FastAPI, Celery, Redis, Langfuse, DeepEval, DeepTeam): metric G-Eval y tế, hiệu chỉnh LLM-as-judge, red-teaming.",
      "Vòng lặp post-training — eval → sinh data có mục tiêu → SFT/DPO với LoRA/QLoRA trên cụm H100 nhiều node on-prem, chu kỳ tính bằng ngày.",
    ],
    stack: "Stack",
    stackText: "Python · FastAPI · vLLM · TGI · TensorRT-LLM · DVC · MinIO · Label Studio · Langfuse · W&B · Docker · Kubernetes · GitHub Actions",
    experience: "Kinh nghiệm",
    experiences: [
      { role: "Kỹ sư AI", org: "Trivita AI", period: "Tháng 9, 2025 – nay" },
      { role: "Nghiên cứu viên AI", org: "AIMA", period: "Tháng 6, 2024 – 2025" },
      { role: "Trưởng nhóm nghiên cứu Multi-Agent VQA", org: "VLAI", period: "2023 – 2024" },
      { role: "Trưởng nhóm nghiên cứu Time-Series", org: "AI VIET NAM", period: "2022 – 2023" },
    ],
    education: "Học vấn",
    educations: [
      { degree: "Cử nhân Công nghệ Thông tin", school: "VAMK, Phần Lan" },
      { degree: "Đào tạo AI chuyên nghiệp", school: "AIO 2024" },
    ],
  },
};

export default function MinimalAbout({ locale }: { locale: string }) {
  const c = locale === "vi" ? content.vi : content.en;

  return (
    <>
      <section className="tone-deep mt-8 pt-16 pb-20 lg:mt-14 lg:pt-24 lg:pb-28">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20">
          <div>
            <h1 className="display mb-6 text-[clamp(56px,8vw,96px)]">
              Leo <em>Nguyen</em>
            </h1>
            <p className="caps mb-8 text-primary">AI Engineer · Trivita AI</p>
            <p className="max-w-[38em] text-[17px] leading-[1.8]">{c.bio}</p>
            <SocialLinks className="mt-10" />
          </div>
          <div className="relative order-first mx-auto aspect-[1/1.3] w-[64%] max-w-[380px] overflow-hidden rounded-t-full bg-block lg:order-none lg:w-full">
            <Image
              src="/images/avatar.jpg"
              alt="Leo Nguyen"
              width={960}
              height={960}
              sizes="(min-width: 1024px) 660px, 125vw"
              className="absolute bottom-0 left-[-62%] w-[173%] max-w-none"
            />
          </div>
        </div>
      </section>

      <section className="tone-band1 py-20 lg:py-28">
        <div className="wrap">
          <h2 className="display mb-12 text-[clamp(40px,5vw,64px)] lg:mb-16">{c.working}</h2>
          <WorkItems items={c.workItems} />
        </div>
      </section>

      <section className="tone-band2 py-20 lg:py-28">
        <div className="wrap grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="display mb-8 text-[clamp(36px,4vw,52px)]">{c.experience}</h2>
            <ol className="border-t border-foreground">
              {c.experiences.map((exp) => (
                <li key={exp.role} className="border-b border-border py-5">
                  <div className="font-serif text-[24px] leading-snug">{exp.role}</div>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="caps text-primary">{exp.org}</span>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-16">
            <div>
              <h2 className="display mb-8 text-[clamp(36px,4vw,52px)]">{c.education}</h2>
              <ul className="border-t border-foreground">
                {c.educations.map((edu) => (
                  <li key={edu.degree} className="border-b border-border py-5">
                    <div className="font-serif text-[22px] leading-snug">{edu.degree}</div>
                    <div className="caps mt-2 text-primary">{edu.school}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="display mb-8 text-[clamp(36px,4vw,52px)]">{c.stack}</h2>
              <ul className="flex flex-wrap gap-2">
                {c.stackText.split(" · ").map((tool) => (
                  <li key={tool} className="border border-foreground px-3 py-1.5 text-sm">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
