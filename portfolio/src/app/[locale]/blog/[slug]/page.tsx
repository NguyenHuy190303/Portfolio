import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getPostContent, getPublishedPosts } from '@/lib/notion';
import { extractHeadings } from '@/lib/extractHeadings';
import { mdxComponents } from '@/components/mdx';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { GiscusComments } from '@/components/blog/GiscusComments';
import type { Metadata } from 'next';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export const revalidate = 3600;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const enPosts = await getPublishedPosts('en');
  const viPosts = await getPublishedPosts('vi');
  return [
    ...enPosts.map((p) => ({ locale: 'en', slug: p.slug })),
    ...viPosts.map((p) => ({ locale: 'vi', slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverUrl ? [{ url: post.coverUrl }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const markdown = await getPostContent(post.id);
  const headings = extractHeadings(markdown);

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css" />
      <BlogPostLayout headings={headings} category={post.category}>
        {/* Article header */}
        <header className="mb-10 pb-8 border-b border-border">
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary font-sans">
              {post.category}
            </span>
            {post.lessonNumber && (
              <span className="text-xs text-muted-foreground font-sans">· Lesson #{post.lessonNumber}</span>
            )}
          </div>

          <h1 className="font-sans font-bold text-3xl md:text-4xl leading-tight text-foreground mb-4">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {post.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-secondary border border-border text-secondary-foreground font-sans">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground font-sans">
            <span>{post.guestAuthorName ?? post.authorName}</span>
            <span>·</span>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </header>

        {/* Article body */}
        <div className="prose-content text-[18px] leading-[1.85] text-foreground">
          {markdown ? (
            <MDXRemote
              source={markdown}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkMath],
                  rehypePlugins: [rehypeKatex],
                },
              }}
            />
          ) : (
            <p className="text-muted-foreground italic">Content not available.</p>
          )}
        </div>

        <GiscusComments slug={slug} />
      </BlogPostLayout>
    </>
  );
}
