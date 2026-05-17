import { getPublishedPosts } from '@/lib/notion';
import { PostCard } from '@/components/blog/PostCard';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { Suspense } from 'react';
import type { PostCategory } from '@/types/notion';

export const revalidate = 3600;

const CATEGORIES: PostCategory[] = ['ML/AI', 'DevOps', 'Code Tutorial', 'Personal', 'Interesting Technology'];

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  const { category } = await searchParams;

  const posts = await getPublishedPosts(locale as 'en' | 'vi');
  const filtered = category && category !== 'All'
    ? posts.filter((p) => p.category === category)
    : posts;

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

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-32 text-muted-foreground">
          <p className="text-xl font-medium mb-2">No posts yet</p>
          <p className="text-sm">
            {posts.length === 0
              ? 'Connect a Notion database and set NOTION_TOKEN + NOTION_DATABASE_ID to publish posts.'
              : 'No posts in this category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
