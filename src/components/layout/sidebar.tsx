'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  FileText, Target, Briefcase, MessageSquare, Users,
  Award, BarChart3, Map, Settings, Home, ChevronLeft,
  Sparkles, Globe, Bell, Shield
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Resumes', href: '/resume', icon: FileText },
  { name: 'ATS Analyzer', href: '/ats', icon: Target },
  { name: 'Job Tracker', href: '/jobs', icon: Briefcase },
  { name: 'Cover Letters', href: '/cover-letter', icon: MessageSquare },
  { name: 'Interviews', href: '/interview', icon: Users },
  { name: 'Portfolio', href: '/portfolio', icon: Globe },
  { name: 'Networking', href: '/networking', icon: Users },
  { name: 'Certificates', href: '/certificates', icon: Award },
  { name: 'Skills', href: '/skills', icon: BarChart3 },
  { name: 'Career Roadmap', href: '/roadmap', icon: Map },
];

const bottomNavigation = [
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Admin', href: '/admin', icon: Shield },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, onCollapsedChange }: SidebarProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-zinc-200 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950',
          collapsed ? 'w-[68px]' : 'w-[240px]'
        )}
      >
        {/* Logo */}
        <div className={cn(
          'flex h-14 items-center border-b border-zinc-200 px-4 dark:border-zinc-800',
          collapsed ? 'justify-center' : 'gap-3'
        )}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">CareerIntel</span>
              <span className="text-[10px] font-medium text-zinc-400">AI Career Platform</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const link = (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50'
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50',
                  collapsed && 'justify-center px-2'
                )}
              >
                <item.icon className={cn('h-4 w-4 shrink-0', isActive && 'text-blue-600 dark:text-blue-400')} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              );
            }
            return link;
          })}
        </nav>

        <Separator />

        {/* Bottom Navigation */}
        <div className="space-y-1 px-2 py-3">
          {bottomNavigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const link = (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50'
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50',
                  collapsed && 'justify-center px-2'
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              );
            }
            return link;
          })}
        </div>

        {/* Collapse Toggle */}
        <div className="border-t border-zinc-200 p-2 dark:border-zinc-800">
          <button
            onClick={() => onCollapsedChange(!collapsed)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-500 transition-all hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50',
              collapsed && 'justify-center px-2'
            )}
          >
            <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
