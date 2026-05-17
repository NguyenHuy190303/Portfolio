import { getPublishedPosts, getAllTags } from '@/lib/notion';
import { PostCard } from '@/components/blog/PostCard';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export const revalidate = 3600;

interface TagPageProps {
  params: Promise<{ locale: string; tag: string }>;
}

export async function generateStaticParams() {
  const results: { locale: string; tag: string }[] = [];
  for (const locale of routing.locales) {
    const tags = await getAllTags();
    for (const tag of tags) {
      results.push({ locale, tag: encodeURIComponent(tag) });
    }
  }
  return results;
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return { title: `#${decoded} — Blog`, description: `Posts tagged with ${decoded}` };
}

export default async function TagPage({ params }: TagPageProps) {
  const { locale, tag } = await params;
  const decoded = decodeURIComponent(tag);

  const posts = await getPublishedPosts(locale as 'en' | 'vi');
  const filtered = posts.filter((p) => p.tags.includes(decoded));

  return (
    <div className="max-w-[1800px] mx-auto px-12 py-12">
      <div className="mb-10 space-y-3">
        <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← All posts
        </Link>
        <h1 className="font-sans font-bold text-4xl text-foreground">
          <span className="text-primary">#</span>{decoded}
        </h1>
        <p className="text-muted-foreground">{filtered.length} post{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-32 text-muted-foreground">
          <p className="text-xl font-medium">No posts with this tag</p>
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
