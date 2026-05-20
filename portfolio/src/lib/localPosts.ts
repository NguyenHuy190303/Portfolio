import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { PostMetadata, PostCategory } from '@/types/notion';

const CONTENT_DIR = path.join(process.cwd(), 'content');

interface Frontmatter {
  title?: string;
  tags?: string[];
  date?: string;
  description?: string;
  category?: PostCategory;
  language?: 'en' | 'vi';
  lessonNumber?: number;
  coverUrl?: string;
  authorName?: string;
  // ignored Obsidian-specific fields
  aliases?: string[];
  status?: string;
}

function parseFrontmatter(raw: string): { data: Frontmatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)/);
  if (!match) return { data: {}, content: raw };
  try {
    const data = (yaml.load(match[1]) as Frontmatter) ?? {};
    return { data, content: match[2] };
  } catch {
    return { data: {}, content: match[2] };
  }
}

function extractH1(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function normalizeTag(tag: string): string {
  // flatten nested tags like "llm/model-editing" → "model-editing"
  return tag.split('/').pop()!.toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

interface LocalFile {
  slug: string;
  filePath: string;
  data: Frontmatter;
  content: string;
}

function collectFiles(dir: string): LocalFile[] {
  if (!fs.existsSync(dir)) return [];
  const files: LocalFile[] = [];

  const walk = (current: string) => {
    for (const entry of fs.readdirSync(current)) {
      if (entry.startsWith('.') || entry.startsWith('._')) continue;
      const full = path.join(current, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
        const raw = fs.readFileSync(full, 'utf-8');
        const { data, content } = parseFrontmatter(raw);
        // Use filename (without extension) as slug — already normalized when copied
        const slug = entry.replace(/\.(md|mdx)$/, '');
        files.push({ slug, filePath: full, data, content });
      }
    }
  };

  walk(dir);
  return files;
}

export function getAllLocalPosts(): PostMetadata[] {
  const files = collectFiles(CONTENT_DIR);
  return files.map(({ slug, data, content }) => {
    const title =
      data.title ??
      extractH1(content) ??
      titleFromSlug(slug);

    const rawTags = data.tags ?? [];
    const tags = rawTags.map(normalizeTag);

    return {
      id: `local:${slug}`,
      title,
      slug,
      description: data.description ?? '',
      date: data.date ?? '2026-01-01',
      category: (data.category as PostCategory) ?? 'ML/AI',
      tags,
      language: data.language ?? 'vi',
      lessonNumber: data.lessonNumber,
      authorName: data.authorName ?? 'Leo Nguyen',
      coverUrl: data.coverUrl,
    };
  });
}

export function getLocalPostBySlug(slug: string): PostMetadata | null {
  return getAllLocalPosts().find(p => p.slug === slug) ?? null;
}

/**
 * Preprocess Obsidian-specific syntax that breaks MDX:
 * - [[Link|Alias]] / [[Link\|Alias]] → Alias or Link text
 * - \(...\) inline math   → $...$   (remark-math only knows $ delimiters)
 * - \[...\] display math  → $$...$$
 */
function preprocessForMdx(content: string): string {
  // Split on fenced code blocks — don't touch anything inside them
  const parts = content.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) return part; // inside a fenced block — leave untouched

    // 1. Convert LaTeX \(...\) inline math → $...$
    let out = part.replace(/\\\(([^]*?)\\\)/g, (_m, inner) => `$${inner}$`);

    // 2. Convert LaTeX \[...\] display math → $$...$$
    out = out.replace(/\\\[([^]*?)\\\]/g, (_m, inner) => `$$\n${inner}\n$$`);

    // 3. Strip Obsidian wikilinks: [[Link\|Alias]] or [[Link|Alias]] → Alias; [[Link]] → Link
    out = out.replace(/\[\[([^\]]+?)(?:\\?\|([^\]]+?))?\]\]/g, (_match, link, alias) =>
      (alias ?? link).trim()
    );

    return out;
  }).join('');
}

export function getLocalPostContent(slug: string): string | null {
  const files = collectFiles(CONTENT_DIR);
  const file = files.find(f => f.slug === slug);
  if (!file) return null;
  return preprocessForMdx(file.content);
}
