import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { unstable_cache } from 'next/cache';
import type { PostMetadata, PostCategory } from '@/types/notion';

function getClient() {
  const token = process.env.NOTION_TOKEN;
  if (!token) return null;
  return new Client({ auth: token });
}

function getN2M(client: Client) {
  return new NotionToMarkdown({ notionClient: client });
}

const DATABASE_ID = process.env.NOTION_DATABASE_ID ?? '';

async function _getPublishedPosts(locale: 'en' | 'vi'): Promise<PostMetadata[]> {
  const notion = getClient();
  if (!notion || !DATABASE_ID) return [];

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          { property: 'Status', select: { equals: 'Published' } },
          { property: 'Language', select: { equals: locale } },
        ],
      },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });

    return response.results
      .filter((page): page is typeof page & { properties: Record<string, unknown> } => 'properties' in page)
      .map((page) => extractMetadata(page));
  } catch {
    return [];
  }
}

async function _getPostBySlug(slug: string): Promise<PostMetadata | null> {
  const notion = getClient();
  if (!notion || !DATABASE_ID) return null;

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Status', select: { equals: 'Published' } },
        ],
      },
      page_size: 1,
    });

    const page = response.results[0];
    if (!page || !('properties' in page)) return null;
    return extractMetadata(page);
  } catch {
    return null;
  }
}

async function _getPostContent(pageId: string): Promise<string> {
  const notion = getClient();
  if (!notion) return '';

  try {
    const n2m = getN2M(notion);
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    return n2m.toMarkdownString(mdBlocks).parent;
  } catch {
    return '';
  }
}

async function _getAllTags(): Promise<string[]> {
  const notion = getClient();
  if (!notion || !DATABASE_ID) return [];

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: { property: 'Status', select: { equals: 'Published' } },
    });

    const tagSet = new Set<string>();
    response.results.forEach((page) => {
      if (!('properties' in page)) return;
      const tags = page.properties['Tags'];
      if (tags?.type === 'multi_select' && Array.isArray(tags.multi_select)) {
        (tags.multi_select as Array<{ name: string }>).forEach((t) => tagSet.add(t.name));
      }
    });
    return Array.from(tagSet).sort();
  } catch {
    return [];
  }
}

// Cached exports — Notion responses are memoized for 3600s across all requests
export const getPublishedPosts = unstable_cache(_getPublishedPosts, ['published-posts'], {
  revalidate: 3600,
  tags: ['posts'],
});

export const getPostBySlug = unstable_cache(_getPostBySlug, ['post-by-slug'], {
  revalidate: 3600,
  tags: ['posts'],
});

export const getPostContent = unstable_cache(_getPostContent, ['post-content'], {
  revalidate: 3600,
  tags: ['posts'],
});

export const getAllTags = unstable_cache(_getAllTags, ['all-tags'], {
  revalidate: 3600,
  tags: ['posts'],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractMetadata(page: any): PostMetadata {
  const props = page.properties;

  const title = props['Title']?.title?.[0]?.plain_text ?? props['Name']?.title?.[0]?.plain_text ?? 'Untitled';
  const slug = props['Slug']?.rich_text?.[0]?.plain_text ?? page.id;
  const description = props['Description']?.rich_text?.[0]?.plain_text ?? '';
  const date = props['Date']?.date?.start ?? new Date().toISOString().split('T')[0];
  const category = (props['Category']?.select?.name ?? 'Personal') as PostCategory;
  const tags = props['Tags']?.multi_select?.map((t: { name: string }) => t.name) ?? [];
  const language = (props['Language']?.select?.name ?? 'en') as 'en' | 'vi';
  const coverUrl = page.cover?.external?.url ?? page.cover?.file?.url;
  const lessonNumber = props['Lesson #']?.number ?? undefined;
  const authorName = props['Author']?.people?.[0]?.name ?? 'Leo Nguyen';
  const guestAuthorName = props['Guest Author Name']?.rich_text?.[0]?.plain_text ?? undefined;

  return { id: page.id, title, slug, description, date, category, tags, language, coverUrl, lessonNumber, authorName, guestAuthorName };
}
