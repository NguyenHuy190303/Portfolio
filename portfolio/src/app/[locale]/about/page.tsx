import MinimalAbout from "@/components/MinimalAbout";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  return <MinimalAbout locale={locale} />;
}
