"use client";

import React, { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINKS } from "@/lib/links";
import dynamic from "next/dynamic";

const SearchModal = dynamic(() =>
  import("@/components/blog/SearchModal").then((m) => m.SearchModal)
);

const linkKeys = [
  { href: "/#domains", labelKey: "product", match: "", desktopOnly: true },
  { href: "/#work", labelKey: "systems", match: "", desktopOnly: false },
  { href: "/blog", labelKey: "blog", match: "/blog", desktopOnly: false },
  { href: "/about", labelKey: "about", match: "/about", desktopOnly: false },
];

const item = "caps text-foreground no-underline transition-colors hover:text-primary max-md:text-[11px] max-md:tracking-[0.14em]";

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="wrap relative z-10 flex flex-col items-start gap-3.5 pt-[26px] md:flex-row md:items-end md:justify-between md:gap-6 md:pt-10">
        <Link
          href="/"
          className="text-[24px] font-black uppercase leading-none tracking-[-0.08em] text-foreground no-underline md:text-[30px]"
        >
          Leo<span className="text-primary">.</span>26
        </Link>

        <nav className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-[22px] md:gap-x-[42px] md:pb-1.5">
          {linkKeys.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                item,
                link.desktopOnly && "max-md:hidden",
                link.match && pathname.startsWith(link.match) && "text-primary",
              )}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <a href={LINKS.cv} target="_blank" rel="noopener noreferrer" className={item}>
            CV
          </a>
          <button
            onClick={() => setSearchOpen(true)}
            className="text-foreground transition-colors hover:text-primary"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <ThemeSwitcher />
          <LanguageSwitcher />
          <Link
            href="/#contact"
            className="caps rounded-full border border-border px-5 py-3 text-foreground no-underline transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground max-md:hidden"
          >
            {t("connect")} ↗
          </Link>
        </nav>
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} locale={locale} />}
    </>
  );
}
