'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface SearchEntry {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  category: string;
  language: string;
}

interface SearchResult extends SearchEntry {
  score?: number;
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const indexRef = useRef<SearchEntry[] | null>(null);

  const loadIndex = useCallback(async () => {
    if (indexRef.current) return;
    try {
      const res = await fetch('/search-index.json');
      indexRef.current = await res.json();
    } catch {
      indexRef.current = [];
    }
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    const run = async () => {
      await loadIndex();
      const entries = indexRef.current ?? [];
      const q = query.toLowerCase();

      const matched = entries
        .filter((e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)) ||
          e.category.toLowerCase().includes(q)
        )
        .slice(0, 8);

      setResults(matched);
      setIsLoading(false);
    };

    const timer = setTimeout(run, 150);
    return () => clearTimeout(timer);
  }, [query, loadIndex]);

  return { query, setQuery, results, isLoading };
}
