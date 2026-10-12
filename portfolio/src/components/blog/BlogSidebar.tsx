import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { categoryId, cn } from '@/lib/utils';
import { getAllPosts, usedCategories } from '@/lib/posts';

interface BlogSidebarProps {
  currentCategory?: string;
}

export async function BlogSidebar({ currentCategory }: BlogSidebarProps) {
  const locale = (await getLocale()) as 'en' | 'vi';
  const categories = usedCategories(await getAllPosts(locale));
  return (
    <nav aria-label="Blog navigation" className="sidebar-nav">
      <div className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground font-sans">
          Categories
        </p>
        <ul className="space-y-1 text-sm">
          <li>
            <Link
              href="/blog"
              className={cn(
                'block px-2 py-1 rounded-md no-underline transition-colors',
                !currentCategory
                  ? 'text-primary font-semibold bg-primary/8'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              All posts
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                href={`/blog#${categoryId(cat)}`}
                className={cn(
                  'block px-2 py-1 rounded-md no-underline transition-colors',
                  currentCategory === cat
                    ? 'text-primary font-semibold bg-primary/8'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
