"use client";

import React, { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const SearchModal = dynamic(() =>
  import("@/components/blog/SearchModal").then((m) => m.SearchModal)
);

const linkKeys = [
  { href: "/about", labelKey: "about" },
  { href: "/blog",  labelKey: "blog"  },
];

const item = "caps text-foreground transition-colors hover:text-primary max-md:text-[11px] max-md:tracking-[0.2em]";

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
          className="font-serif text-[26px] uppercase leading-tight tracking-[0.02em] text-foreground no-underline md:text-[34px]"
        >
          Leo Nguyen
        </Link>

        <nav className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-[22px] md:gap-x-[42px] md:pb-1.5">
          {linkKeys.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(item, pathname.startsWith(link.href) && "underline underline-offset-[6px]")}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <a href="/Nguyen_Huy_CV.pdf" target="_blank" rel="noopener noreferrer" className={item}>
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
        </nav>
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} locale={locale} />}
    </>
  );
}
