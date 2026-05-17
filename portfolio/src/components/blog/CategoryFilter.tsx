'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
}

const ALL = 'All';

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('category') ?? ALL;

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === ALL) {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const all = [ALL, ...categories];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {all.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200',
            active === cat
              ? 'bg-primary text-primary-foreground border-primary shadow-sm'
              : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
