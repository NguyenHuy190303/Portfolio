'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Heading } from '@/types/notion';

const SCROLL_OFFSET = 96; // navbar height + buffer

export function BlogTOC({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (headings.length === 0) return;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY + SCROLL_OFFSET;
        let current = headings[0].id;

        for (const { id } of headings) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollY) current = id;
        }

        setActiveId(current);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET + 8;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveId(id);
  };

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="toc-sidebar">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground font-sans">
        On this page
      </p>
      <ul className="space-y-0.5 text-sm">
        {headings.map(({ id, text, depth }) => {
          const isActive = activeId === id;
          return (
            <li key={id} style={{ paddingLeft: depth === 3 ? '12px' : undefined }}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={cn(
                  'block py-1 leading-snug no-underline transition-all duration-200',
                  'border-l-2 pl-3 -ml-px',
                  isActive
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                )}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
