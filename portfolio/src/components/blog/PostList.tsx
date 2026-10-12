import { Link } from '@/i18n/navigation';
import { categoryId } from '@/lib/utils';
import type { PostMetadata } from '@/types/notion';

export function PostList({ posts, grouped = false }: { posts: PostMetadata[]; grouped?: boolean }) {
  const groups = grouped
    ? [...new Set(posts.map((p) => p.category))].map((c) => ({ c, list: posts.filter((p) => p.category === c) }))
    : [{ c: null, list: posts }];

  return (
    <div className="space-y-12">
      {groups.map(({ c, list }) => (
        <section key={c ?? 'all'} id={c ? categoryId(c) : undefined} className="scroll-mt-20">
          {c && <h2 className="mb-3 font-serif text-xl font-semibold">{c}</h2>}
          <ul className="border-t border-border">
            {list.map((post) => (
              <li key={post.id} className="border-b border-border">
                <Link href={`/blog/${post.slug}`} className="group block py-3 no-underline">
                  <span className="block text-foreground transition-colors group-hover:text-primary">{post.title}</span>
                  {post.description && (
                    <span className="mt-0.5 line-clamp-2 text-[0.95rem] text-muted-foreground sm:line-clamp-1">{post.description}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
