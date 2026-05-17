import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/notion';

const BASE_URL = 'https://nguyenhuy190303.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/vi`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/en/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/vi/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/en/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/vi/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  try {
    const [enPosts, viPosts] = await Promise.all([
      getPublishedPosts('en'),
      getPublishedPosts('vi'),
    ]);

    const postRoutes: MetadataRoute.Sitemap = [
      ...enPosts.map((post) => ({
        url: `${BASE_URL}/en/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
      ...viPosts.map((post) => ({
        url: `${BASE_URL}/vi/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
    ];

    return [...staticRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
