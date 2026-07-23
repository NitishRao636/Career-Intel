'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: { value: string; trend: 'up' | 'down' | 'neutral' };
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

export function StatCard({ title, value, change, icon: Icon, iconColor = 'text-blue-600', className }: StatCardProps) {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
            <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{value}</p>
            {change && (
              <p className={cn(
                'text-xs font-medium',
                change.trend === 'up' && 'text-emerald-600',
                change.trend === 'down' && 'text-red-600',
                change.trend === 'neutral' && 'text-zinc-500'
              )}>
                {change.trend === 'up' && '↑'}
                {change.trend === 'down' && '↓'}
                {change.value}
              </p>
            )}
          </div>
          <div className={cn('rounded-xl bg-zinc-100 p-2.5 dark:bg-zinc-800', iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
      {/* Decorative gradient */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/5 to-violet-500/5" />
    </Card>
  );
}
