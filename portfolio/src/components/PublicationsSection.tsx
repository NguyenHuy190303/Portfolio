import React from "react";
export default function PublicationsSection() {
  const certificates = [
    {
      img: "/cert_nasa.jpg",
      alt: "NASA Certificate",
    },
    {
      img: "/cert_ai_vietnam.jpg",
      alt: "AI Vietnam Certificate",
    },
  ];

  return (
    <section id="publications" className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Công bố khoa học &amp; Chứng chỉ</h2>
      <div className="mb-12">
        <h3 className="font-semibold mb-4">Công bố khoa học</h3>
        <p>
          Nguyễn Quốc Huy et al., "Applications of Deep Learning in Cancer
          Detection", <em>AACR Conference</em>, 2024.
        </p>
      </div>
      <div>
        <h3 className="font-semibold mb-4">Chứng chỉ</h3>
        <div className="grid grid-cols-2 gap-4">
          {certificates.map((c) => (
            <img
              key={c.img}
              src={c.img}
              alt={c.alt}
              className="rounded shadow cursor-pointer hover:opacity-80"
            />
          ))}
        </div>
      </div>
    </section>
  );
} 