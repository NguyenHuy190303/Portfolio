"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section id="about" className="section-padding bg-background-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            Về tôi
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full animate-pulse"></div>
        </div>
        
        <div 
          ref={contentRef}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${
            contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="glass-effect p-8 rounded-2xl hover-lift hover:border-accent transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-accent flex items-center gap-3">
                <span className="animate-bounce">🎯</span> 
                Mục tiêu nghề nghiệp
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Một nhà nghiên cứu và phát triển AI có kỷ luật cao, đã được chứng minh
                qua khả năng kết nối giữa các mô hình lý thuyết phức tạp và các ứng
                dụng thực tế, mạnh mẽ trong lĩnh vực phân tích hình ảnh y tế.
              </p>
            </div>
            
            <div className="glass-effect p-8 rounded-2xl hover-lift hover:border-accent transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-accent flex items-center gap-3">
                <span className="animate-pulse">🚀</span> 
                Đam mê
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Tôi đam mê việc ứng dụng AI để giải quyết các vấn đề y tế thực tế,
                đặc biệt trong việc phát triển các hệ thống hỗ trợ chẩn đoán thông minh
                và cải thiện chất lượng chăm sóc sức khỏe.
              </p>
            </div>
          </div>
          
          <div className={`space-y-6 transition-all duration-1000 delay-400 ${
            contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="glass-effect p-8 rounded-2xl hover-lift hover:border-accent transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 text-accent flex items-center gap-3">
                <span className="animate-spin text-2xl">📊</span> 
                Thống kê
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center hover-scale">
                  <div className="text-3xl font-bold text-accent mb-2 animate-pulse">5+</div>
                  <div className="text-sm text-foreground-secondary">Năm kinh nghiệm</div>
                </div>
                <div className="text-center hover-scale">
                  <div className="text-3xl font-bold text-accent mb-2 animate-pulse">20+</div>
                  <div className="text-sm text-foreground-secondary">Dự án hoàn thành</div>
                </div>
                <div className="text-center hover-scale">
                  <div className="text-3xl font-bold text-accent mb-2 animate-pulse">10+</div>
                  <div className="text-sm text-foreground-secondary">Công bố khoa học</div>
                </div>
                <div className="text-center hover-scale">
                  <div className="text-3xl font-bold text-accent mb-2 animate-pulse">95%</div>
                  <div className="text-sm text-foreground-secondary">Độ chính xác mô hình</div>
                </div>
              </div>
            </div>
            
            <div className="glass-effect p-8 rounded-2xl hover-lift hover:border-accent transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-accent flex items-center gap-3">
                <span className="animate-bounce">🎓</span> 
                Học vấn
              </h3>
              <div className="space-y-3">
                <div className="hover:bg-background-tertiary/30 p-3 rounded-lg transition-colors">
                  <div className="font-semibold">Thạc sĩ Khoa học Máy tính</div>
                  <div className="text-foreground-secondary text-sm">Đại học ABC • 2020-2022</div>
                </div>
                <div className="hover:bg-background-tertiary/30 p-3 rounded-lg transition-colors">
                  <div className="font-semibold">Cử nhân Công nghệ Thông tin</div>
                  <div className="text-foreground-secondary text-sm">Đại học XYZ • 2016-2020</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 