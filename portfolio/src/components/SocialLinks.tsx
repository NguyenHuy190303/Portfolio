import { cn } from '@/lib/utils';
import { LINKS } from '@/lib/links';

const links = [
  { label: 'GitHub', href: LINKS.github },
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'CV', href: LINKS.cv },
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
          className="caps border-b border-current/30 pb-[5px] text-inherit no-underline transition-colors hover:border-current"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
