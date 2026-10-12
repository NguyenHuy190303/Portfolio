import { SocialLinks } from '@/components/SocialLinks';

export default function Footer() {
  return (
    <footer className="bg-footer pt-[84px] pb-12 text-footer-foreground">
      <div className="wrap flex flex-wrap items-end justify-between gap-8">
        <div className="font-serif text-[clamp(40px,6vw,92px)] font-light uppercase leading-none tracking-[0.01em]">
          Leo <em className="normal-case">Nguyen</em>
        </div>
        <SocialLinks />
        <small className="mt-4 block w-full text-[13px]">© {new Date().getFullYear()} Leo Nguyen</small>
      </div>
    </footer>
  );
}
