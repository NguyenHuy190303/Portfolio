import type { ReactNode } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/blog/PostList";
import { SocialLinks } from "@/components/SocialLinks";
import { content as about } from "@/components/MinimalAbout";

export const revalidate = 3600;

interface Props {
  params: Promise<{ locale: string }>;
}

const em = (chunks: ReactNode) => <em>{chunks}</em>;

function SectionHead({ title, kicker }: { title: ReactNode; kicker: string }) {
  return (
    <div className="text-center">
      <h2 className="mx-auto mb-[18px] max-w-[16em] text-[clamp(36px,4.2vw,60px)] font-light leading-[1.12]">{title}</h2>
      <span className="caps">{kicker}</span>
    </div>
  );
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const posts = await getAllPosts(locale as "en" | "vi");
  const t = await getTranslations("hero");
  const h = await getTranslations("home");
  const work = (locale === "vi" ? about.vi : about.en).workItems;

  return (
    <>
      <section className="relative pt-8 pb-20 lg:pt-14 lg:pb-[120px]">
        <div aria-hidden="true" className="absolute top-0 bottom-[180px] left-0 hidden w-[31vw] bg-block lg:block" />
        <div className="wrap relative grid items-center gap-[76px] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-[clamp(32px,6vw,96px)]">
          <div className="relative before:absolute before:top-0 before:bottom-[22%] before:left-[calc(-1*clamp(20px,5vw,72px))] before:w-[64%] before:bg-block lg:before:hidden">
            <div className="relative top-8 ml-[18%] aspect-[1/1.3] w-[72%] overflow-hidden rounded-t-full bg-block lg:top-0 lg:mt-10 lg:ml-[12%] lg:w-full lg:max-w-[430px]">
              {/* Crop: face in the upper third of the arch */}
              <Image
                src="/images/avatar.jpg"
                alt="Leo Nguyen"
                width={960}
                height={960}
                priority
                sizes="(min-width: 1024px) 750px, 130vw"
                className="absolute bottom-0 left-[-62%] w-[173%] max-w-none"
              />
            </div>
          </div>
          <div>
            <div className="mb-2.5 flex items-center gap-[22px]">
              <i className="block h-px w-[84px] bg-foreground" />
              <span className="translate-y-1 font-script text-[38px] leading-none text-primary lg:text-[46px]">{t("hello")}</span>
            </div>
            <h1 className="display mb-8 text-[clamp(46px,5.9vw,88px)]">{t.rich("headline", { em })}</h1>
            <p className="caps mb-4 text-primary">{t("role")}</p>
            <p className="mb-10 max-w-[34em]">{t("lede")}</p>
            <div className="flex flex-wrap items-center gap-x-9 gap-y-5">
              <Link
                href="/blog"
                className="caps border border-foreground px-[38px] py-[21px] text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                {t("cta")}
              </Link>
              <SocialLinks className="text-foreground" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-block py-[84px] lg:pt-[120px] lg:pb-[130px]">
        <div className="wrap">
          <SectionHead title={h.rich("workTitle", { em })} kicker={h("workKicker")} />
          <div className="mt-[52px] grid gap-[clamp(28px,4vw,64px)] lg:mt-[84px] lg:grid-cols-3">
            {work.map((item, i) => {
              const [title, ...rest] = item.split(" — ");
              return (
                <div key={title} className="border-t border-foreground pt-[26px]">
                  <div className="font-serif text-[52px] font-light italic leading-none text-primary lining-nums lg:text-[64px]">0{i + 1}</div>
                  <h3 className="mt-5 mb-3 text-[26px] leading-tight">{title}</h3>
                  <p className="text-[15px] first-letter:uppercase">{rest.join(" — ")}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-[84px] lg:pt-[130px] lg:pb-[120px]">
        <div className="wrap">
          <SectionHead title={h.rich("writingTitle", { em })} kicker={h("writingKicker")} />
          <PostList posts={posts} grouped columns className="mt-[52px] lg:mt-[84px]" />
        </div>
      </section>
    </>
  );
}
