'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useSearch } from '@/hooks/useSearch';
import { Search, X } from 'lucide-react';

interface SearchModalProps {
  onClose: () => void;
  locale: string;
}

export function SearchModal({ onClose, locale }: SearchModalProps) {
  const { query, setQuery, results, isLoading } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const navigate = (slug: string) => {
    router.push(`/blog/${slug}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground text-base outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">ESC</kbd>
        </div>

        {/* Results */}
        {query && (
          <div className="max-h-96 overflow-y-auto py-2">
            {isLoading ? (
              <div className="px-5 py-8 text-center text-muted-foreground text-sm">Searching…</div>
            ) : results.length === 0 ? (
              <div className="px-5 py-8 text-center text-muted-foreground text-sm">
                No results for &quot;{query}&quot;
              </div>
            ) : (
              results.map((post) => (
                <button
                  key={post.id}
                  onClick={() => navigate(post.slug)}
                  className="w-full text-left px-5 py-3 hover:bg-secondary transition-colors flex flex-col gap-1 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">{post.category}</span>
                    {post.language !== locale && (
                      <span className="text-xs text-muted-foreground">{post.language}</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{post.title}</p>
                  {post.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">{post.description}</p>
                  )}
                </button>
              ))
            )}
          </div>
        )}

        {!query && (
          <div className="px-5 py-8 text-center text-muted-foreground text-sm">
            Start typing to search posts
          </div>
        )}
      </div>
    </div>
  );
}
