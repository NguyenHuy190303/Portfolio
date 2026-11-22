'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <span className="nav-seg" role="group" aria-label="Language">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          disabled={l === locale}
          aria-label={l === 'vi' ? 'Tiếng Việt' : 'English'}
          aria-pressed={l === locale}
          className="nav-seg__btn"
        >
          {l.toUpperCase()}
        </button>
      ))}
    </span>
  );
}
