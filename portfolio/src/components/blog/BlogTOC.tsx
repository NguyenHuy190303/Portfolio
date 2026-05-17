'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Heading } from '@/types/notion';

interface BlogTOCProps {
  headings: Heading[];
}

export function BlogTOC({ headings }: BlogTOCProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="toc-sidebar">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground font-sans">
        On this page
      </p>
      <ul className="space-y-1.5 text-sm">
        {headings.map(({ id, text, depth }) => (
          <li key={id} style={{ paddingLeft: depth === 3 ? '12px' : undefined }}>
            <a
              href={`#${id}`}
              className={cn(
                'block leading-snug transition-colors duration-150 hover:text-foreground no-underline',
                activeId === id
                  ? 'text-primary font-medium border-l-2 border-primary pl-2 -ml-2'
                  : 'text-muted-foreground'
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
