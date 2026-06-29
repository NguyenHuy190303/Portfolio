"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTranslations } from "next-intl";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";

const SearchModal = dynamic(() =>
  import("@/components/blog/SearchModal").then((m) => m.SearchModal)
);

const linkKeys = [
  { href: "/about", labelKey: "about" },
  { href: "/blog",  labelKey: "blog"  },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="w-full border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold text-foreground hover:text-primary transition-colors no-underline">
            Leo
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {linkKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors no-underline",
                  pathname === link.href
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <ThemeSwitcher />
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border">
            <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col gap-3">
              {linkKeys.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-sm py-1 transition-colors no-underline",
                    pathname === link.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <button
                onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                className="text-sm py-1 text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} locale={locale} />}
    </>
  );
}
