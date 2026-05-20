'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

let mermaidInitialized = false;

async function getMermaid() {
  const m = await import('mermaid');
  return m.default;
}

export function MermaidDiagram({ code }: { code: string }) {
  const { resolvedTheme } = useTheme();
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsNearViewport(true); },
      { rootMargin: '300px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isNearViewport) return;
    let cancelled = false;

    async function render() {
      try {
        const mermaid = await getMermaid();

        if (!mermaidInitialized) {
          mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' });
          mermaidInitialized = true;
        }

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: resolvedTheme === 'dark' ? 'dark' : 'default',
        });

        const raw = code
          .replace(/\\`/g, '`')
          .replace(/\\\$/g, '$')
          .replace(/\\\\/g, '\\');

        const { svg } = await mermaid.render(idRef.current, raw);
        if (!cancelled) setSvg(svg);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(() => render());
      return () => { cancelled = true; cancelIdleCallback(id); };
    } else {
      render();
      return () => { cancelled = true; };
    }
  }, [isNearViewport, code, resolvedTheme]);

  if (error) return null;

  return (
    <div ref={containerRef}>
      {!svg ? (
        <div className="my-6 h-32 rounded-xl border border-border bg-secondary/30 animate-pulse" />
      ) : (
        <div
          className="my-6 flex justify-center overflow-x-auto rounded-xl border border-border p-6 bg-card"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  );
}
