'use client';

import { useSearchParams } from 'next/navigation';
import { PostCard } from './PostCard';
import type { PostMetadata } from '@/types/notion';

export function PostGrid({ posts }: { posts: PostMetadata[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const filtered =
    category && category !== 'All'
      ? posts.filter((p) => p.category === category)
      : posts;

  if (filtered.length === 0) {
    return (
      <div className="text-center py-32 text-muted-foreground">
        <p className="text-xl font-medium mb-2">No posts yet</p>
        <p className="text-sm">
          {posts.length === 0
            ? 'Connect a Notion database and set NOTION_TOKEN + NOTION_DATABASE_ID to publish posts.'
            : 'No posts in this category.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
      {filtered.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
