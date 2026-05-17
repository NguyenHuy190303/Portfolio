import { BlogSidebar } from './BlogSidebar';
import { BlogTOC } from './BlogTOC';
import type { Heading } from '@/types/notion';
import type { ReactNode } from 'react';

interface BlogPostLayoutProps {
  children: ReactNode;
  headings: Heading[];
  category?: string;
}

export function BlogPostLayout({ children, headings, category }: BlogPostLayoutProps) {
  return (
    <div className="article-layout">
      {/* Left: Category Nav */}
      <aside>
        <BlogSidebar currentCategory={category} />
      </aside>

      {/* Center: Article content */}
      <main className="min-w-0">
        <div className="article-content mx-auto">
          {children}
        </div>
      </main>

      {/* Right: TOC */}
      <aside>
        <BlogTOC headings={headings} />
      </aside>
    </div>
  );
}
