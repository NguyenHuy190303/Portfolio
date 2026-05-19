'use client';

import { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CSSProperties, ReactNode } from 'react';

export function CodeBlock({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copy = async () => {
    const text = preRef.current?.textContent ?? '';
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const language = className?.match(/language-(\w+)/)?.[1];

  return (
    <div className="group relative my-6 rounded-xl overflow-hidden border border-border/50">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--shiki-light-bg,#f6f8fa)] dark:bg-[var(--shiki-dark-bg,#24292e)] border-b border-border/30">
        <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-widest">
          {language ?? 'code'}
        </span>
        <button
          onClick={copy}
          className="rounded-md p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>

      <pre
        ref={preRef}
        className={cn('overflow-x-auto text-sm leading-relaxed p-5 m-0 rounded-none', className)}
        style={style}
      >
        {children}
      </pre>
    </div>
  );
}
