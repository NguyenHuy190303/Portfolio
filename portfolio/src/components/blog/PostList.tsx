import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { categoryId, cn } from '@/lib/utils';
import type { PostMetadata } from '@/types/notion';

export function PostRows({ posts, className }: { posts: PostMetadata[]; className?: string }) {
  return (
    <ul className={className}>
      {posts.map((post, i) => (
        <li key={post.id} className="break-inside-avoid border-b border-border">
          <Link
            href={`/blog/${post.slug}`}
            className="group grid grid-cols-[44px_minmax(0,1fr)] gap-x-2 py-5 text-foreground no-underline"
          >
            <span className="text-[13px] leading-8 tracking-[0.12em] text-primary">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-serif text-[21px] leading-snug lining-nums transition-colors group-hover:text-primary lg:text-[23px]">
              {post.title}
            </span>
            {post.description && (
              <span className="col-start-2 mt-1 line-clamp-2 text-[14.5px] leading-relaxed">{post.description}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function PostList({
  posts,
  grouped = false,
  columns = false,
  className,
}: {
  posts: PostMetadata[];
  grouped?: boolean;
  columns?: boolean;
  className?: string;
}) {
  const t = await getTranslations('posts');
  const groups = grouped
    ? [...new Set(posts.map((p) => p.category))].map((c) => ({ c, list: posts.filter((p) => p.category === c) }))
    : [{ c: null, list: posts }];

  return (
    <div className={cn('grid gap-16', columns && 'lg:grid-cols-2 lg:gap-[clamp(32px,5vw,88px)]', className)}>
      {groups.map(({ c, list }) => (
        <section key={c ?? 'all'} id={c ? categoryId(c) : undefined} className="min-w-0 scroll-mt-20">
          <div className={cn('flex items-baseline justify-between gap-4 border-b border-foreground', c && 'pb-4')}>
            {c && <h2 className="text-[34px] italic leading-tight lg:text-[38px]">{c}</h2>}
            {c && <span className="caps shrink-0 text-primary">{t('count', { count: list.length })}</span>}
          </div>
          <PostRows posts={list} />
        </section>
      ))}
    </div>
  );
}
