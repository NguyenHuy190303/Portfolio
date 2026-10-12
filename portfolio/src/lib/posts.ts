import { getPublishedPosts } from '@/lib/notion';
import { getAllLocalPosts } from '@/lib/localPosts';
import type { PostCategory, PostMetadata } from '@/types/notion';

const CATEGORIES: PostCategory[] = ['ML/AI', 'DevOps', 'Code Tutorial', 'Personal', 'Interesting Technology'];

// Local posts take priority; Notion posts with the same slug are dropped.
export async function getAllPosts(locale: 'en' | 'vi'): Promise<PostMetadata[]> {
  const notionPosts = await getPublishedPosts(locale).catch(() => [] as PostMetadata[]);
  const localPosts = getAllLocalPosts();
  const localSlugs = new Set(localPosts.map((p) => p.slug));
  return [...localPosts, ...notionPosts.filter((p) => !localSlugs.has(p.slug))]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function usedCategories(posts: PostMetadata[]): PostCategory[] {
  return CATEGORIES.filter((c) => posts.some((p) => p.category === c));
}
