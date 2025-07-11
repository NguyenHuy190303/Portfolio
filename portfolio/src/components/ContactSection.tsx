import React from "react";
export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Liên hệ với tôi</h2>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <p>
            <strong>Email:</strong> huy.ai@example.com
          </p>
          <p>
            <strong>Điện thoại:</strong> +84 123 456 789
          </p>
          <p>
            <strong>Nơi ở:</strong> TP. Hồ Chí Minh, Việt Nam
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/NguyenHuy190303" target="_blank" rel="noopener noreferrer">
              <img src="/github.svg" alt="GitHub" className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/huy-nguyen-5552b22aa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
            </a>
          </div>
        </div>
        <form
          className="space-y-4"
          action="https://formspree.io/f/moqgwgkd" // replace with actual
          method="POST"
        >
          <input
            type="text"
            name="name"
            placeholder="Họ tên"
            required
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-transparent"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-transparent"
          />
          <input
            type="text"
            name="subject"
            placeholder="Tiêu đề"
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-transparent"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Nội dung"
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded bg-teal-500 text-white hover:opacity-90"
          >
            Gửi tin nhắn
          </button>
        </form>
      </div>
    </section>
  );
} 