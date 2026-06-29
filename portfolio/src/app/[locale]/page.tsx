import HomeIntro from "@/components/HomeIntro";
import { getPublishedPosts } from "@/lib/notion";
import { getAllLocalPosts } from "@/lib/localPosts";
import { PostGrid } from "@/components/blog/PostGrid";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { Suspense } from "react";
import type { PostCategory, PostMetadata } from "@/types/notion";

export const revalidate = 3600;

const CATEGORIES: PostCategory[] = ["ML/AI", "DevOps", "Code Tutorial", "Personal", "Interesting Technology"];

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const [notionPosts, localPosts] = await Promise.all([
    getPublishedPosts(locale as "en" | "vi").catch(() => [] as PostMetadata[]),
    Promise.resolve(getAllLocalPosts()),
  ]);

  const localSlugs = new Set(localPosts.map((p) => p.slug));
  const merged = [
    ...localPosts,
    ...notionPosts.filter((p) => !localSlugs.has(p.slug)),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <HomeIntro />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Suspense fallback={null}>
          <CategoryFilter categories={CATEGORIES} />
        </Suspense>
        <div className="mt-6">
          <Suspense fallback={null}>
            <PostGrid posts={merged} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
