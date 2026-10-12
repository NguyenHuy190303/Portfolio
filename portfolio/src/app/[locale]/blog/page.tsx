import { getTranslations } from 'next-intl/server';
import { getAllPosts, usedCategories } from '@/lib/posts';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { PostGrid } from '@/components/blog/PostGrid';
import { Suspense } from 'react';

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
      {/* Header */}
      <div className="mb-10 space-y-3">
        <h1 className="font-sans font-bold text-4xl text-foreground">{t('title')}</h1>
        <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Suspense fallback={null}>
          <CategoryFilter categories={usedCategories(posts)} />
        </Suspense>
      </div>

      {/* Grid — client component reads searchParams and filters instantly */}
      <Suspense fallback={null}>
        <PostGrid posts={posts} />
      </Suspense>
    </div>
  );
}
