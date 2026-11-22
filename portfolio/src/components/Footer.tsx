import { SocialLinks } from '@/components/SocialLinks';

export default function Footer() {
  return (
    <footer className="bg-footer pt-20 pb-10 text-footer-foreground">
      <div className="wrap">
        <div className="display text-[clamp(44px,8vw,132px)] leading-[0.9]">
          Leo <em className="text-[var(--v4-orange)]">Nguyen</em>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-white/15 pt-6">
          <SocialLinks />
          <a href="#top" className="caps text-inherit no-underline hover:text-[var(--v4-orange)]">
            Back to top ↑
          </a>
        </div>
        <div className="mono-label mt-6 flex flex-wrap justify-between gap-x-8 gap-y-2 text-[#A9C0DE]">
          <span>Leo Nguyen / AI Lead · Products, Systems &amp; People</span>
          <span>Saigon · Vietnam</span>
        </div>
        <small className="mt-6 block text-[13px] text-[#A9C0DE]">© {new Date().getFullYear()} Leo Nguyen</small>
      </div>
    </footer>
  );
}
