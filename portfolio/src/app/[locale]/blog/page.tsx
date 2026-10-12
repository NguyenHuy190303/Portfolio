import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { getAllPosts, usedCategories } from '@/lib/posts';
import { PostRows } from '@/components/blog/PostList';
import { categoryId, cn, toneFor } from '@/lib/utils';

export const revalidate = 3600;

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

const em = (chunks: ReactNode) => <em>{chunks}</em>;

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const posts = await getAllPosts(locale as 'en' | 'vi');
  const t = await getTranslations('blog');
  const h = await getTranslations('home');
  const n = await getTranslations('posts');
  const categories = usedCategories(posts);
  const groups = categories.map((c) => ({ c, list: posts.filter((p) => p.category === c) }));

  return (
    <>
      <section className="tone-deep mt-8 pt-16 pb-20 lg:mt-14 lg:pt-24 lg:pb-28">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-20">
          <h1 className="display text-[clamp(52px,7vw,96px)]">{h.rich('writingTitle', { em })}</h1>
          <div>
            <p className="mb-8 max-w-[34em] text-[17px]">{t('subtitle')}</p>
            <ul className="border-t border-border">
              {groups.map(({ c, list }) => (
                <li key={c} className="border-b border-border">
                  <a
                    href={`#${categoryId(c)}`}
                    className="flex items-baseline justify-between gap-4 py-4 text-foreground no-underline transition-colors hover:text-primary"
                  >
                    <span className="font-serif text-[26px] italic leading-tight">{c}</span>
                    <span className="caps shrink-0 text-primary">{n('count', { count: list.length })}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {groups.map(({ c, list }) => (
        <section key={c} id={categoryId(c)} className={cn(toneFor(c, categories), 'py-20 lg:py-28')}>
          <div className="wrap">
            <div className="mb-6 flex items-baseline justify-between gap-6 border-b border-foreground pb-5">
              <h2 className="display text-[clamp(44px,6vw,84px)] italic">{c}</h2>
              <span className="caps shrink-0 text-primary">{n('count', { count: list.length })}</span>
            </div>
            <PostRows posts={list} className="lg:columns-2 lg:gap-x-[clamp(32px,5vw,88px)]" />
          </div>
        </section>
      ))}
    </>
  );
}
