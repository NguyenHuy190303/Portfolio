import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getPostContent, getPublishedPosts } from '@/lib/notion';
import { getAllLocalPosts, getLocalPostBySlug, getLocalPostContent } from '@/lib/localPosts';
import { extractHeadings } from '@/lib/extractHeadings';
import { mdxComponents } from '@/components/mdx';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { GiscusComments } from '@/components/blog/GiscusComments';
import type { Metadata } from 'next';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import { remarkMermaid } from '@/lib/remarkMermaid';
import { rehypeCallout } from '@/lib/remarkCallout';
import rehypeKatex from 'rehype-katex';
import rehypeShiki from '@shikijs/rehype';
import 'katex/dist/katex.min.css';
import type { PostMetadata } from '@/types/notion';
import { OG_IMAGE } from '@/lib/utils';

export const revalidate = 3600;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const [enPosts, viPosts, localPosts] = await Promise.all([
    getPublishedPosts('en').catch(() => [] as PostMetadata[]),
    getPublishedPosts('vi').catch(() => [] as PostMetadata[]),
    Promise.resolve(getAllLocalPosts()),
  ]);

  const seen = new Set<string>();
  const params: { locale: string; slug: string }[] = [];

  // Local posts available in both locales
  for (const post of localPosts) {
    for (const locale of ['en', 'vi']) {
      const key = `${locale}:${post.slug}`;
      if (!seen.has(key)) {
        seen.add(key);
        params.push({ locale, slug: post.slug });
      }
    }
  }

  // Notion posts
  for (const [locale, posts] of [['en', enPosts], ['vi', viPosts]] as const) {
    for (const p of posts) {
      const key = `${locale}:${p.slug}`;
      if (!seen.has(key)) {
        seen.add(key);
        params.push({ locale, slug: p.slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const local = getLocalPostBySlug(slug);
  if (local) {
    return {
      title: local.title,
      description: local.description,
      openGraph: {
        type: 'article',
        title: local.title,
        description: local.description,
        images: [OG_IMAGE],
      },
    };
  }

  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      images: [post.coverUrl ?? OG_IMAGE],
    },
  };
}

const MDX_OPTIONS = {
  mdxOptions: {
    remarkPlugins: [remarkMermaid, remarkMath, remarkGfm],
    rehypePlugins: [
      rehypeCallout,
      rehypeKatex,
      [rehypeShiki, {
        themes: { light: 'github-light', dark: 'github-dark' },
        defaultColor: false,
      }],
    ] as Parameters<typeof MDXRemote>[0]['options']['mdxOptions']['rehypePlugins'],
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Try local post first (faster, no API call)
  const localContent = getLocalPostContent(slug);
  const localPost = localContent !== null ? getLocalPostBySlug(slug) : null;

  if (localPost && localContent !== null) {
    const headings = extractHeadings(localContent);
    const formattedDate = new Date(localPost.date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
      <BlogPostLayout headings={headings} category={localPost.category} lang={localPost.language}>
        <header className="mb-10 pb-8 border-b border-border">
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary font-sans">
              {localPost.category}
            </span>
          </div>
          <h1 className="display text-4xl leading-[1.15] md:text-5xl md:leading-[1.15] text-foreground mb-4">
            {localPost.title}
          </h1>
          {localPost.description && !localContent.replace(/\*/g, '').includes(localPost.description) && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {localPost.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mb-6">
            {localPost.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-secondary border border-border text-secondary-foreground font-sans">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground font-sans">
            <span>{localPost.authorName}</span>
            <span>·</span>
            <time dateTime={localPost.date}>{formattedDate}</time>
          </div>
        </header>

        <div className="prose-content text-[17px] leading-[1.85] text-foreground">
          <MDXRemote
            source={localContent}
            components={mdxComponents}
            options={MDX_OPTIONS}
          />
        </div>

        <GiscusComments slug={slug} />
      </BlogPostLayout>
    );
  }

  // Fall back to Notion
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const markdown = await getPostContent(post.id);
  const headings = extractHeadings(markdown);

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <BlogPostLayout headings={headings} category={post.category} lang={post.language}>
      <header className="mb-10 pb-8 border-b border-border">
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary font-sans">
            {post.category}
          </span>
          {post.lessonNumber && (
            <span className="text-xs text-muted-foreground font-sans">· Lesson #{post.lessonNumber}</span>
          )}
        </div>
        <h1 className="display text-4xl leading-[1.15] md:text-5xl md:leading-[1.15] text-foreground mb-4">
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

      <div className="prose-content text-[17px] leading-[1.85] text-foreground">
        {markdown ? (
          <MDXRemote
            source={markdown}
            components={mdxComponents}
            options={MDX_OPTIONS}
          />
        ) : (
          <p className="text-muted-foreground italic">Content not available.</p>
        )}
      </div>

      <GiscusComments slug={slug} />
    </BlogPostLayout>
  );
}
