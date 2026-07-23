'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import {
  FileText, Briefcase, MessageSquare, BarChart3, Users,
  Award, Map, Target, Settings, Home, Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navigationItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Resume Builder', href: '/resume' },
  { icon: Target, label: 'ATS Analyzer', href: '/ats' },
  { icon: Briefcase, label: 'Job Tracker', href: '/jobs' },
  { icon: MessageSquare, label: 'Cover Letters', href: '/cover-letter' },
  { icon: Users, label: 'Interview Prep', href: '/interview' },
  { icon: Users, label: 'Networking CRM', href: '/networking' },
  { icon: Award, label: 'Certificates', href: '/certificates' },
  { icon: BarChart3, label: 'Skills', href: '/skills' },
  { icon: Map, label: 'Career Roadmap', href: '/roadmap' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  const runCommand = React.useCallback(
    (command: () => void) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange]
  );

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      className={cn(
        'fixed inset-0 z-50',
        'flex items-start justify-center pt-[20vh]',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
      )}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div className={cn(
        'relative z-50 w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl',
        'dark:border-zinc-800 dark:bg-zinc-950'
      )}>
        <div className="flex items-center border-b border-zinc-200 px-3 dark:border-zinc-800">
          <Search className="mr-2 h-4 w-4 shrink-0 text-zinc-400" />
          <Command.Input
            placeholder="Search commands, navigate..."
            className="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed"
          />
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto p-1">
          <Command.Empty className="py-6 text-center text-sm text-zinc-500">
            No results found.
          </Command.Empty>
          <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-zinc-500">
            {navigationItems.map((item) => (
              <Command.Item
                key={item.href}
                value={item.label}
                onSelect={() => runCommand(() => router.push(item.href))}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer',
                  'data-[selected=true]:bg-zinc-100 data-[selected=true]:text-zinc-900',
                  'dark:data-[selected=true]:bg-zinc-800 dark:data-[selected=true]:text-zinc-50',
                  'text-zinc-700 dark:text-zinc-300'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
