import HomeIntro from "@/components/HomeIntro";
import { getAllPosts, usedCategories } from "@/lib/posts";
import { PostGrid } from "@/components/blog/PostGrid";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { Suspense } from "react";

export const revalidate = 3600;

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const posts = await getAllPosts(locale as "en" | "vi");

  return (
    <>
      <HomeIntro />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Suspense fallback={null}>
          <CategoryFilter categories={usedCategories(posts)} />
        </Suspense>
        <div className="mt-6">
          <Suspense fallback={null}>
            <PostGrid posts={posts} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
