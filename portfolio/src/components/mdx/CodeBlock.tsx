'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function CodeBlock({ children, className }: { children: ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = typeof children === 'string' ? children : '';
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6">
      <button
        onClick={copy}
        className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-zinc-400 opacity-0 transition-opacity hover:text-zinc-200 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre className={cn('overflow-x-auto rounded-xl text-sm leading-relaxed', className)}>
        <code>{children}</code>
      </pre>
    </div>
  );
}
