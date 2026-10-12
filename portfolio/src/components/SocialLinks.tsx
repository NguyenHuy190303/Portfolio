import { cn } from '@/lib/utils';

const links = [
  { label: 'GitHub', href: 'https://github.com/NguyenHuy190303' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nguyen-huy-1903' },
  { label: 'CV', href: '/Nguyen_Huy_CV.pdf' },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-[26px]', className)}>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="caps border-b border-current/30 pb-[5px] text-inherit transition-colors hover:border-current"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
