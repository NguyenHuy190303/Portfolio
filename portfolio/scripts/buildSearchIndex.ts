import { Client } from '@notionhq/client';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

interface SearchEntry {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  category: string;
  language: string;
}

async function buildIndex() {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!token || !databaseId) {
    console.log('NOTION_TOKEN or NOTION_DATABASE_ID missing — skipping search index build');
    writeFileSync(join(process.cwd(), 'public', 'search-index.json'), '[]');
    return;
  }

  const notion = new Client({ auth: token });

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: { property: 'Status', status: { equals: 'Published' } },
  });

  const entries: SearchEntry[] = response.results
    .filter((page): page is typeof page & { properties: Record<string, unknown> } => page.object === 'page')
    .map((page) => {
      const props = (page as { properties: Record<string, { type: string; [k: string]: unknown }> }).properties;

      const getTitle = (p: { type: string; title?: Array<{ plain_text: string }> }) =>
        p?.title?.map((t) => t.plain_text).join('') ?? '';
      const getRichText = (p: { type: string; rich_text?: Array<{ plain_text: string }> }) =>
        p?.rich_text?.map((t) => t.plain_text).join('') ?? '';
      const getSelect = (p: { type: string; select?: { name: string } | null }) =>
        p?.select?.name ?? '';
      const getMultiSelect = (p: { type: string; multi_select?: Array<{ name: string }> }) =>
        p?.multi_select?.map((s) => s.name) ?? [];

      return {
        id: page.id,
        title: getTitle(props.Title as { type: string; title?: Array<{ plain_text: string }> }),
        slug: getRichText(props.Slug as { type: string; rich_text?: Array<{ plain_text: string }> }),
        description: getRichText(props.Description as { type: string; rich_text?: Array<{ plain_text: string }> }),
        tags: getMultiSelect(props.Tags as { type: string; multi_select?: Array<{ name: string }> }),
        category: getSelect(props.Category as { type: string; select?: { name: string } | null }),
        language: getSelect(props.Language as { type: string; select?: { name: string } | null }),
      };
    });

  mkdirSync(join(process.cwd(), 'public'), { recursive: true });
  writeFileSync(
    join(process.cwd(), 'public', 'search-index.json'),
    JSON.stringify(entries, null, 2)
  );

  console.log(`Search index built: ${entries.length} posts`);
}

buildIndex().catch(console.error);
