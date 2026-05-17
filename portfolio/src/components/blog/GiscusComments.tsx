'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface GiscusCommentsProps {
  slug: string;
}

export function GiscusComments({ slug }: GiscusCommentsProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repo || !repoId || !categoryId) return null;
  if (!mounted) return null;

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-xl font-sans font-semibold text-foreground mb-6">Comments</h2>
      <Giscus
        key={slug}
        repo={repo}
        repoId={repoId}
        category="General"
        categoryId={categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === 'dark' ? 'dark_dimmed' : 'light'}
        lang="en"
        loading="lazy"
      />
    </section>
  );
}
