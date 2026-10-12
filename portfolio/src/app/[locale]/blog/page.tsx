import { getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/lib/posts';
import { PostList } from '@/components/blog/PostList';

export const revalidate = 3600;

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const posts = await getAllPosts(locale as 'en' | 'vi');
  const t = await getTranslations('blog');

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-12 space-y-2">
        <h1 className="display text-6xl">{t('title')}</h1>
        <p className="text-muted-foreground">{t('subtitle')}</p>
      </div>
      <PostList posts={posts} grouped />
    </div>
  );
}
