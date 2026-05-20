import { getPublishedPosts } from '@/lib/notion';
import { getAllLocalPosts } from '@/lib/localPosts';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { PostGrid } from '@/components/blog/PostGrid';
import { Suspense } from 'react';
import type { PostCategory, PostMetadata } from '@/types/notion';

export const revalidate = 3600;

const CATEGORIES: PostCategory[] = ['ML/AI', 'DevOps', 'Code Tutorial', 'Personal', 'Interesting Technology'];

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  const [notionPosts, localPosts] = await Promise.all([
    getPublishedPosts(locale as 'en' | 'vi').catch(() => [] as PostMetadata[]),
    Promise.resolve(getAllLocalPosts()),
  ]);

  // Local posts take priority; deduplicate Notion posts by slug
  const localSlugs = new Set(localPosts.map(p => p.slug));
  const merged = [
    ...localPosts,
    ...notionPosts.filter(p => !localSlugs.has(p.slug)),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-[1800px] mx-auto px-12 py-12">
      {/* Header */}
      <div className="mb-10 space-y-3">
        <h1 className="font-sans font-bold text-4xl text-foreground">Blog</h1>
        <p className="text-muted-foreground text-lg">
          Notes on ML, AI, LLMs, DevOps, and engineering.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Suspense fallback={null}>
          <CategoryFilter categories={CATEGORIES} />
        </Suspense>
      </div>

      {/* Grid — client component reads searchParams and filters instantly */}
      <Suspense fallback={null}>
        <PostGrid posts={merged} />
      </Suspense>
    </div>
  );
}
