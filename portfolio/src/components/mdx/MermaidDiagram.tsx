'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

let mermaidLoaded = false;

async function getMermaid() {
  const m = await import('mermaid');
  return m.default;
}

export function MermaidDiagram({ code }: { code: string }) {
  const { resolvedTheme } = useTheme();
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = await getMermaid();

        if (!mermaidLoaded) {
          mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' });
          mermaidLoaded = true;
        }

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: resolvedTheme === 'dark' ? 'dark' : 'default',
        });

        // Unescape the code string
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

    render();
    return () => { cancelled = true; };
  }, [code, resolvedTheme]);

  if (error) return null;
  if (!svg) return (
    <div className="my-6 h-32 rounded-xl border border-border bg-secondary/30 animate-pulse" />
  );

  return (
    <div
      className="my-6 flex justify-center overflow-x-auto rounded-xl border border-border p-6 bg-card"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
