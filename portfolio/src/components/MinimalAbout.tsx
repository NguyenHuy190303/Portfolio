import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";
import { WorkItems } from "@/components/WorkItems";

export const content = {
  en: {
    role: "AI Lead · Trivita AI",
    bio: "I'm Leo (Nguyễn Huy), AI Lead at Trivita AI in Vietnam. I started as a software engineer and moved into AI, so I fix problems at the layer where they live instead of reaching for a bigger model. My strongest area is designing AI agents, evaluating them and keeping them reliable: I started the company's LLM evaluation platform, own a real-time exam-proctoring service, and built the Vietnamese medical data and post-training pipeline behind MedVita on an on-prem multi-node H100 cluster. I also coordinate across product, QC, software and AI teams, and mentor the engineers around me.",
    working: "What I do",
    workItems: [
      "Agent evaluation & reliability — started the company's self-hosted LLM and agent evaluation platform (now developed by three engineers), a 65-case agent test suite, medical G-Eval and LLM-as-judge metrics, red-teaming and Langfuse tracing.",
      "MedVita & medical data — Vietnamese medical history-taking assistant with ICD-10 VN normalisation and tiered safety guardrails, plus the EMR-to-versioned-dataset pipeline and an SFT/DPO post-training loop on 2×8×H100.",
      "Serving & platforms — real-time proctoring service (5.6× throughput, 3-hour load test with zero restarts), a 6,448-hour Vietnamese speech corpus and a dataset registry that makes any training run reproducible.",
    ],
    stack: "Stack",
    stackText: "Python · FastAPI · LangGraph · Langfuse · DeepEval · vLLM · Triton · TensorRT-LLM · PyTorch · Kafka · LiveKit · PostgreSQL · MLflow · DVC · MinIO · Label Studio · Docker · Kubernetes · Helm · ArgoCD · Prometheus · Grafana · Sentry · GitHub Actions",
    experience: "Experience",
    experiences: [
      { role: "AI Engineer → AI Lead", org: "Trivita AI", period: "Sep 2025 – present" },
      { role: "AI Researcher", org: "AIMA", period: "Jun 2024 – 2025" },
      { role: "Multi-Agent VQA Research Team Lead", org: "VLAI", period: "2023 – 2024" },
      { role: "Time-Series Research Team Lead", org: "AI VIET NAM", period: "2022 – 2023" },
    ],
    education: "Education",
    educations: [
      { degree: "B.Sc. Information Technology", school: "VAMK, Finland · 2021 – 2025" },
      { degree: "AIO 2024 certificate: GenAI & LLMs, CV & NLP, DL & ML", school: "AI VIET NAM" },
    ],
  },
  vi: {
    role: "AI Lead · Trivita AI",
    bio: "Tôi là Leo (Nguyễn Huy), AI Lead tại Trivita AI (Việt Nam). Tôi bắt đầu là kỹ sư phần mềm rồi chuyển sang AI, nên tôi sửa vấn đề ở đúng tầng có lỗi thay vì mặc định dùng model lớn hơn. Mảng mạnh nhất của tôi là thiết kế AI agent, đánh giá và giữ cho chúng đáng tin cậy: tôi khởi xướng nền tảng đánh giá LLM của công ty, là owner của dịch vụ giám sát thi thời gian thực, và xây pipeline dữ liệu y tế tiếng Việt cùng vòng post-training phía sau MedVita trên cụm H100 nhiều node on-prem. Tôi cũng điều phối giữa các nhóm product, QC, phần mềm và AI, và kèm cặp các kỹ sư xung quanh.",
    working: "Tôi làm gì",
    workItems: [
      "Đánh giá & độ tin cậy của agent — khởi xướng nền tảng đánh giá LLM và agent self-hosted của công ty (nay do ba kỹ sư phát triển), bộ test agent 65 ca, metric G-Eval y tế và LLM-as-judge, red-teaming và tracing bằng Langfuse.",
      "MedVita & dữ liệu y tế — trợ lý hỏi bệnh sử tiếng Việt với chuẩn hoá ICD-10 VN và guardrail an toàn nhiều tầng, cùng pipeline từ EMR đến dataset có version và vòng post-training SFT/DPO trên 2×8×H100.",
      "Serving & nền tảng — dịch vụ giám sát thi thời gian thực (throughput 5.6×, load test 3 giờ không restart lần nào), kho dữ liệu giọng nói tiếng Việt 6.448 giờ và registry dataset giúp tái lập mọi lần huấn luyện.",
    ],
    stack: "Stack",
    stackText: "Python · FastAPI · LangGraph · Langfuse · DeepEval · vLLM · Triton · TensorRT-LLM · PyTorch · Kafka · LiveKit · PostgreSQL · MLflow · DVC · MinIO · Label Studio · Docker · Kubernetes · Helm · ArgoCD · Prometheus · Grafana · Sentry · GitHub Actions",
    experience: "Kinh nghiệm",
    experiences: [
      { role: "Kỹ sư AI → AI Lead", org: "Trivita AI", period: "09/2025 – nay" },
      { role: "Nghiên cứu viên AI", org: "AIMA", period: "06/2024 – 2025" },
      { role: "Trưởng nhóm nghiên cứu Multi-Agent VQA", org: "VLAI", period: "2023 – 2024" },
      { role: "Trưởng nhóm nghiên cứu Time-Series", org: "AI VIET NAM", period: "2022 – 2023" },
    ],
    education: "Học vấn",
    educations: [
      { degree: "Cử nhân Công nghệ Thông tin", school: "VAMK, Phần Lan · 2021 – 2025" },
      { degree: "Chứng chỉ AIO 2024: GenAI & LLMs, CV & NLP, DL & ML", school: "AI VIET NAM" },
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
            <p className="caps mb-8 text-primary">{c.role}</p>
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
