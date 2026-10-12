'use client';

import { Fragment } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <span className="caps flex items-center gap-1.5 text-foreground max-md:text-[11px] max-md:tracking-[0.2em]">
      {routing.locales.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span aria-hidden="true">/</span>}
          <button
            onClick={() => router.replace(pathname, { locale: l })}
            disabled={l === locale}
            aria-label={l === 'vi' ? 'Tiếng Việt' : 'English'}
            className={cn('tracking-[inherit]', l === locale ? 'underline underline-offset-[6px]' : 'hover:text-primary')}
          >
            {l.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </span>
  );
}
