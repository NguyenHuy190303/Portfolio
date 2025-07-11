import React from "react";
import Image from "next/image";
type Project = {
  name: string;
  image: string;
  desc: string;
  tech: string[];
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    name: "LLM-based Clinical Question Answering",
    image: "/proj1.jpg",
    desc: "Hệ thống hỏi đáp y khoa sử dụng RAG với mô hình Llama2 fine-tuned.",
    tech: ["Python", "LangChain", "LLM", "Streamlit"],
    github: "https://github.com/NguyenHuy190303/clinical-qa",
  },
  {
    name: "CT-Scan Tumor Segmentation",
    image: "/proj2.jpg",
    desc: "Mô hình UNet++ phân đoạn khối u trên ảnh CT-Scan.",
    tech: ["PyTorch", "Medical Imaging", "Computer Vision"],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Các dự án nổi bật</h2>
      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((p) => (
          <div key={p.name} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow">
            <Image src={p.image} alt={p.name} width={400} height={192} className="h-48 w-full object-cover" />
            <div className="p-6 flex flex-col gap-3">
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="text-sm opacity-80">{p.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-teal-500/10 text-teal-500 rounded text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-2">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Image src="/github.svg" alt="GitHub" width={20} height={20} className="w-5 h-5" />
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-sm underline">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 