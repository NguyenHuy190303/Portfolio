import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { SITE_URL } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/en`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/vi`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/en/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/vi/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/en/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/vi/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const postRoutes: MetadataRoute.Sitemap = [];
  for (const locale of ['en', 'vi'] as const) {
    for (const post of await getAllPosts(locale)) {
      postRoutes.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return [...staticRoutes, ...postRoutes];
}
