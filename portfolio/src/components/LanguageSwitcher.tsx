'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const next = locale === 'en' ? 'vi' : 'en';

  return (
    <button
      onClick={() => router.replace(pathname, { locale: next })}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      aria-label={next === 'vi' ? 'Tiếng Việt' : 'English'}
    >
      {next.toUpperCase()}
    </button>
  );
}
