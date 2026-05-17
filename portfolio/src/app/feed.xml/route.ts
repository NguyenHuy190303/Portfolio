import { getPublishedPosts } from '@/lib/notion';

const BASE_URL = 'https://nguyenhuy190303.vercel.app';

export async function GET() {
  const posts = await getPublishedPosts('en');

  const items = posts
    .map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/en/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/en/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description ?? ''}]]></description>
      <author>${post.authorName}</author>
      <category>${post.category}</category>
    </item>`)
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Huy Nguyen — Blog</title>
    <link>${BASE_URL}/en/blog</link>
    <description>Notes on ML, AI, LLMs, DevOps, and engineering by Huy Nguyen.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
