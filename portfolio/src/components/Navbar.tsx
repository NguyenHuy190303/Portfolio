"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { Menu, Search, X } from "lucide-react";
import { LINKS } from "@/lib/links";
import dynamic from "next/dynamic";

const SearchModal = dynamic(() =>
  import("@/components/blog/SearchModal").then((m) => m.SearchModal)
);

/*
 * Tabs. `path` is locale-less. The static pages (projects, strategy, feedback,
 * reliability) are not Next routes: they are served by rewrites, so they are plain
 * <a> links and never get an active state here. Only Next routes carry `match`.
 */
const tabs = [
  { path: "/projects", labelKey: "projects" },
  { path: "/strategy", labelKey: "strategy" },
  { path: "/feedback", labelKey: "feedback" },
  { path: "/reliability", labelKey: "reliability" },
  { path: "/blog", labelKey: "writing", match: ["/blog", "/tags"] },
  { path: "/about", labelKey: "about", match: ["/about"] },
] as const;

function isActive(pathname: string, match?: readonly string[]) {
  return !!match?.some((m) => pathname === m || pathname.startsWith(`${m}/`));
}

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Close the mobile panel when the route changes (state adjusted during render).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1240px)");
    const onMq = () => setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      mq.removeEventListener("change", onMq);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const home = `/${locale}`;
  const contact = `/${locale}#contact`;

  return (
    <>
      <header
        ref={headerRef}
        className="site-header"
        onBlur={(e) => {
          // Not a focus trap: leaving the header with Tab closes the panel.
          if (menuOpen && !e.currentTarget.contains(e.relatedTarget as Node | null)) setMenuOpen(false);
        }}
      >
        <div className="site-header__bar">
          <a href={home} className="site-brand">
            Leo<span>.</span>26
          </a>

          {/* Desktop: one row */}
          <nav aria-label={t("primary")} className="nav-desktop">
            {tabs.map((tab) => {
              const active = isActive(pathname, "match" in tab ? tab.match : undefined);
              return (
                <a
                  key={tab.path}
                  href={`/${locale}${tab.path}`}
                  className="nav-tab"
                  aria-current={active ? "page" : undefined}
                >
                  {t(tab.labelKey)}
                </a>
              );
            })}
            <a href={LINKS.cv} target="_blank" rel="noopener noreferrer" className="nav-tab">
              CV
            </a>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="nav-tab nav-tab--icon"
              aria-label={t("search")}
            >
              <Search aria-hidden="true" />
            </button>
            <ThemeSwitcher />
            <LanguageSwitcher />
            <a href={contact} className="nav-tab nav-tab--cta">
              {t("contact")} <span aria-hidden="true">↗</span>
            </a>
          </nav>

          {/* Mobile / tablet: MENU button + panel */}
          <button
            ref={menuButtonRef}
            type="button"
            className="nav-tab nav-menu-btn"
            aria-expanded={menuOpen}
            aria-controls={panelId}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span>{menuOpen ? t("closeMenu") : t("menu")}</span>
          </button>
        </div>

        <nav id={panelId} aria-label={t("primary")} className="nav-panel" hidden={!menuOpen}>
          <ul>
            {tabs.map((tab) => {
              const active = isActive(pathname, "match" in tab ? tab.match : undefined);
              return (
                <li key={tab.path}>
                  <a
                    href={`/${locale}${tab.path}`}
                    className="nav-tab nav-row"
                    aria-current={active ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {t(tab.labelKey)}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href={LINKS.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-tab nav-row"
                onClick={closeMenu}
              >
                CV <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li className="nav-panel__tools">
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  setSearchOpen(true);
                }}
                className="nav-tab nav-row"
                aria-label={t("search")}
              >
                <Search aria-hidden="true" />
                <span>{t("search")}</span>
              </button>
              <ThemeSwitcher />
              <LanguageSwitcher />
            </li>
            <li>
              <a href={contact} className="nav-tab nav-row nav-tab--cta" onClick={closeMenu}>
                {t("contact")} <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} locale={locale} />}
    </>
  );
}
