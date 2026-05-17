import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { PostMetadata } from '@/types/notion';
import { cn } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  'ML/AI': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
  'DevOps': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
  'Code Tutorial': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
  'Personal': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
};

interface PostCardProps {
  post: PostMetadata;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block no-underline">
      <article className="h-full border border-border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
        {/* Cover image or gradient placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-secondary to-secondary/50 overflow-hidden">
          {post.coverUrl ? (
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl opacity-10 select-none font-bold text-foreground">
                {post.lessonNumber ? `#${post.lessonNumber}` : post.category.charAt(0)}
              </div>
            </div>
          )}
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={cn(
              'text-xs font-semibold px-2.5 py-1 rounded-full border uppercase tracking-wide',
              categoryColors[post.category] ?? categoryColors['Personal']
            )}>
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <h2 className="font-sans font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.lessonNumber && (
              <span className="text-primary mr-1">#{post.lessonNumber}</span>
            )}
            {post.title}
          </h2>

          {post.description && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
              {post.description}
            </p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md border border-border">
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs px-2 py-0.5 text-muted-foreground">+{post.tags.length - 3}</span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border mt-auto">
            <span>{post.guestAuthorName ?? post.authorName}</span>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </div>
      </article>
    </Link>
  );
}
