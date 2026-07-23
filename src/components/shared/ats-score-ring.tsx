'use client';

import { cn } from '@/lib/utils';

interface ATSScoreRingProps {
  score: number;
  size?: number;
  className?: string;
  showLabel?: boolean;
}

export function ATSScoreRing({ score, size = 120, className, showLabel = true }: ATSScoreRingProps) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return { stroke: '#10b981', text: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (s >= 60) return { stroke: '#f59e0b', text: 'text-amber-600', bg: 'bg-amber-50' };
    if (s >= 40) return { stroke: '#f97316', text: 'text-orange-600', bg: 'bg-orange-50' };
    return { stroke: '#ef4444', text: 'text-red-600', bg: 'bg-red-50' };
  };

  const colors = getColor(score);

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-zinc-100 dark:text-zinc-800"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className={cn('text-3xl font-bold', colors.text)}>{score}</span>
            <span className="text-sm text-zinc-400">/100</span>
          </div>
        </div>
      </div>
      {showLabel && (
        <div className={cn('rounded-full px-3 py-1 text-xs font-medium', colors.bg, colors.text)}>
          {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Needs Work' : 'Poor'}
        </div>
      )}
    </div>
  );
}
