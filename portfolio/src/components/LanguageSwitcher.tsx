'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('language');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: 'en' | 'vi') => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  const languages = {
    vi: { label: t('vietnamese'), flag: '🇻🇳', code: 'VI' },
    en: { label: t('english'), flag: '🇺🇸', code: 'EN' },
  };

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm"
        aria-label="Change language"
      >
        <span className="text-base">{languages[locale as 'en' | 'vi']?.flag ?? '🌐'}</span>
        <span className="text-xs font-semibold">{languages[locale as 'en' | 'vi']?.code ?? locale.toUpperCase()}</span>
        <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', isOpen && 'rotate-180')} />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 py-1 w-40 bg-popover text-popover-foreground border border-border/50 rounded-xl shadow-xl z-50 animate-fade-in overflow-hidden">
          {(Object.entries(languages) as [string, { label: string; flag: string; code: string }][]).map(([code, { label, flag }]) => (
            <button
              key={code}
              onClick={() => handleLocaleChange(code as 'en' | 'vi')}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent/10',
                locale === code && 'bg-accent/10 text-accent font-medium'
              )}
            >
              <span className="text-lg">{flag}</span>
              <span>{label}</span>
              {locale === code && <Check className="ml-auto w-4 h-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
