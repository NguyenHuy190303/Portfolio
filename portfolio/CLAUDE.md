# CLAUDE.md

## Project
Personal portfolio & blog — Next.js 15 app with bilingual content (EN / VI), deployed on Vercel.

## Stack
- **Framework**: Next.js 15 (App Router, Turbopack for dev)
- **Language**: TypeScript 5, React 19
- **Styling**: Tailwind CSS v4
- **i18n**: next-intl — locales `en` | `vi`, default `en`, all routes under `/[locale]/`
- **Blog sources**: dual pipeline — Notion API (primary) + local MDX files in `content/`
- **Deployment**: Vercel (auto-deploy on push to `main`)
- **Repo**: `git@github-190303:NguyenHuy190303/Portfolio.git`

## Commands

```bash
npm run dev      # Turbopack dev server
npm run build    # buildSearchIndex.ts (local + Notion) → next build
npm run start    # production server
npm run lint     # eslint
```

> `npm run build` pre-runs `scripts/buildSearchIndex.ts`. Without the Notion env vars it indexes local posts only.

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NOTION_TOKEN` | for blog / search | Notion integration token |
| `NOTION_DATABASE_ID` | for blog / search | Published posts database |
| `NEXT_PUBLIC_BASE_URL` | no | Canonical site URL for metadata, sitemap, robots, RSS. Default in `src/lib/utils.ts` (`SITE_URL`) |

Create `.env.local` locally (gitignored). On Vercel, set via dashboard.

## Blog Pipeline

Two content sources, merged by `getAllPosts(locale)` in `src/lib/posts.ts` (used by home, blog, sidebar, sitemap, RSS):

1. **Notion** (`src/lib/notion.ts`) — canonical source for published posts. Filtered by `Status = Published` + `Language`. Cached with `unstable_cache`.
2. **Local MDX** (`src/lib/localPosts.ts`) — files in `content/<category>/*.md`. Frontmatter parsed with `js-yaml`. Used as fallback / offline content.

Both return the same `PostMetadata` type (`src/types/notion.ts`).

### Local MDX Frontmatter

```yaml
---
title: "Post Title"
date: "2024-01-01"
description: "..."
tags: ["tag1", "tag2"]
category: "ai"          # matches content/ subdirectory
language: "en"          # en | vi
lessonNumber: 1         # optional, for series
coverUrl: "https://..."
authorName: "..."
---
```

Content dirs: `content/ai/`, `content/python/` (more can be added).  
Nested tags like `"llm/model-editing"` are flattened to `"model-editing"`.

## Routes

All pages live under `src/app/[locale]/`:

| Route | Page |
|---|---|
| `/` | Home |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post |
| `/about` | About |
| `/tags/[tag]` | Posts with a tag |

## Key Files

| File | Purpose |
|---|---|
| `src/lib/notion.ts` | Notion API client + post fetching |
| `src/lib/localPosts.ts` | Local MDX parsing |
| `src/lib/remarkMermaid.ts` | Mermaid → SVG (server-side render) |
| `src/i18n/routing.ts` | next-intl locale config |
| `src/i18n/request.ts` | Per-request locale resolution |
| `src/lib/posts.ts` | `getAllPosts` (local + Notion merge), `usedCategories` |
| `scripts/buildSearchIndex.ts` | Pre-build: local + Notion posts → `public/search-index.json` |
| `next.config.ts` | Cache-Control headers for images, search-index |

## Git & Deploy Workflow

```
main  ──► Vercel auto-deploy (production)
  └── feature/<name>  or  bugfix/fix-<name>
```

- Branch from `main`, PR back into `main`
- Commit prefix convention: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Vercel picks up every push to `main` automatically — no manual deploy step

## Gotchas

- **SSH host alias**: remote uses `github-190303` (custom `~/.ssh/config` alias), not `github.com`. Don't change it.
- **Turbopack**: `npm run dev` uses `--turbopack`; if something breaks in dev but not build, try `next dev` without it.
- **Search index at build time**: `public/search-index.json` is generated during `npm run build`. In dev, use a pre-built copy or set env vars so the script runs.
- **`unstable_cache`**: Notion data is cached server-side. To bust in dev, restart the server.
- **Mermaid**: rendered to SVG server-side via `src/lib/remarkMermaid.ts`, not client JS.
