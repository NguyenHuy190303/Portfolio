import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
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

export async function getPublishedPosts(locale: 'en' | 'vi'): Promise<PostMetadata[]> {
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

export async function getPostBySlug(slug: string): Promise<PostMetadata | null> {
  const notion = getClient();
  if (!notion || !DATABASE_ID) return null;

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: { property: 'Slug', rich_text: { equals: slug } },
      page_size: 1,
    });

    const page = response.results[0];
    if (!page || !('properties' in page)) return null;
    return extractMetadata(page);
  } catch {
    return null;
  }
}

export async function getPostContent(pageId: string): Promise<string> {
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

export async function getAllTags(): Promise<string[]> {
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
