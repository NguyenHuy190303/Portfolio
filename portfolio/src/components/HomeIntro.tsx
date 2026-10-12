import { getTranslations } from "next-intl/server";

const links = [
  { label: "GitHub", href: "https://github.com/NguyenHuy190303" },
  { label: "LinkedIn", href: "https://linkedin.com/in/nguyen-huy-1903" },
  { label: "CV", href: "/Nguyen_Huy_CV.pdf" },
];

export default async function HomeIntro() {
  const t = await getTranslations("hero");

  return (
    <div className="mb-14">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">{t("name")}</h1>
      <p className="mt-1 text-muted-foreground">{t("role")}</p>
      <p className="mt-6 text-foreground">{t("bio")}</p>
      <div className="mt-5 flex gap-5">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground decoration-foreground/30 hover:decoration-foreground"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}
