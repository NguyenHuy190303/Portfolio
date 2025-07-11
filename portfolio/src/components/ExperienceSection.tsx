import React from "react";
type Item = {
  title: string;
  org: string;
  time: string;
  desc: string;
};

const items: Item[] = [
  {
    title: "Researcher",
    org: "AIMA Research Lab",
    time: "08/2024 – Hiện tại",
    desc: "Nghiên cứu mô hình LLM và ứng dụng RAG trong lĩnh vực y sinh học.",
  },
  {
    title: "Team Lead",
    org: "UIT AI Club",
    time: "2023 – 2024",
    desc: "Dẫn dắt nhóm xây dựng hệ thống phân loại ảnh y tế sử dụng Vision Transformer.",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Kinh nghiệm &amp; Vai trò Lãnh đạo</h2>
      <div className="relative border-l border-gray-300 dark:border-gray-600">
        {items.map((it, idx) => (
          <div key={idx} className="mb-10 ml-6">
            <div className="absolute -left-[10px] top-1 w-4 h-4 bg-teal-500 rounded-full" />
            <h3 className="text-lg font-semibold">{it.title}</h3>
            <p className="text-sm opacity-80">
              {it.org} | {it.time}
            </p>
            <p className="mt-2">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 