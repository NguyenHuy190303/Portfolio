import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24">
      {/* Two-column: Hero left, Philosophy right */}
      <div className="max-w-[1800px] mx-auto px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <HeroSection />
          <AboutSection />
        </div>
      </div>

      {/* Experience below full-width */}
      <ExperienceSection />
    </main>
  );
}
