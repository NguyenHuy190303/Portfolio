import HomeIntro from "@/components/HomeIntro";
import FlowPanel from "@/components/FlowPanel";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/blog/PostList";

export const revalidate = 3600;

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const posts = await getAllPosts(locale as "en" | "vi");

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 lg:py-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
      <div className="order-2 lg:order-1 min-w-0">
        <HomeIntro />
        <PostList posts={posts} grouped />
      </div>
      <aside className="order-1 lg:order-2 lg:sticky lg:top-8 lg:self-start">
        <FlowPanel className="h-40 sm:h-56 lg:h-[calc(100dvh-8rem)]" />
      </aside>
    </div>
  );
}
