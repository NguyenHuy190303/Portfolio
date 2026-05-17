import { cn } from '@/lib/utils';
import { Info, AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react';
import type { ReactNode } from 'react';

type CalloutType = 'info' | 'warning' | 'tip' | 'success';

const styles: Record<CalloutType, { container: string; icon: string; Icon: typeof Info }> = {
  info:    { container: 'bg-blue-50 border-blue-300 dark:bg-blue-950/40 dark:border-blue-700',    icon: 'text-blue-600 dark:text-blue-400',   Icon: Info },
  warning: { container: 'bg-amber-50 border-amber-300 dark:bg-amber-950/40 dark:border-amber-700', icon: 'text-amber-600 dark:text-amber-400',  Icon: AlertTriangle },
  tip:     { container: 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-700', icon: 'text-emerald-600 dark:text-emerald-400', Icon: Lightbulb },
  success: { container: 'bg-green-50 border-green-300 dark:bg-green-950/40 dark:border-green-700', icon: 'text-green-600 dark:text-green-400',  Icon: CheckCircle },
};

export function Callout({ type = 'info', children }: { type?: CalloutType; children: ReactNode }) {
  const { container, icon, Icon } = styles[type];
  return (
    <div className={cn('my-6 flex gap-3 rounded-xl border-l-4 p-4', container)}>
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', icon)} />
      <div className="text-sm leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}
