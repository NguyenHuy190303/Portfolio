import { Callout } from './Callout';
import { CodeBlock } from './CodeBlock';
import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
  Callout,
  pre: ({ children, className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock className={className} {...props}>{children}</CodeBlock>
  ),
  // Heading IDs are added by rehype-slug — these just style them
  h2: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={id} className="font-sans font-bold text-2xl mt-10 mb-4 scroll-mt-24 border-b border-border pb-2" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 id={id} className="font-sans font-semibold text-xl mt-8 mb-3 scroll-mt-24" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-5 leading-[1.85]" {...props}>{children}</p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-5 ml-6 list-disc space-y-1.5" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-5 ml-6 list-decimal space-y-1.5" {...props}>{children}</ol>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-6 border-l-4 border-primary/50 pl-5 italic text-muted-foreground" {...props}>
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props}>{children}</table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-border bg-secondary px-4 py-2 text-left font-semibold font-sans" {...props}>{children}</th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-4 py-2" {...props}>{children}</td>
  ),
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} className="text-primary underline underline-offset-3 hover:text-primary/80 transition-colors" {...props}>{children}</a>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm" {...props}>{children}</code>
  ),
};
