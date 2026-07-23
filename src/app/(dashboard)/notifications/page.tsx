'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, Calendar, Target, Briefcase, Star, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';

const notifications = [
  { id: '1', type: 'interview_reminder', title: 'Interview Tomorrow', message: 'You have a technical interview with Stripe at 2:00 PM', read: false, time: '2 hours ago', icon: Calendar },
  { id: '2', type: 'application_update', title: 'Application Status Updated', message: 'Your Vercel Staff Engineer application moved to "Under Review"', read: false, time: '5 hours ago', icon: Briefcase },
  { id: '3', type: 'follow_up', title: 'Follow-up Reminder', message: 'It\'s been 3 days since your interview with Linear. Send a follow-up?', read: false, time: '1 day ago', icon: Target },
  { id: '4', type: 'ats_score', title: 'ATS Score Improved', message: 'Your resume "Senior Frontend" score increased from 72 to 87!', read: true, time: '2 days ago', icon: Star },
  { id: '5', type: 'achievement', title: 'Achievement Unlocked!', message: 'You\'ve applied to 10 jobs this week. Keep it up! 🎉', read: true, time: '3 days ago', icon: CheckCircle2 },
  { id: '6', type: 'skill_suggestion', title: 'New Skill Suggestion', message: 'Based on your target roles, consider learning "System Design" — it\'s in 85% of Staff Engineer job postings', read: true, time: '4 days ago', icon: TrendingUp },
  { id: '7', type: 'system', title: 'Welcome to CareerIntel!', message: 'Complete your profile to unlock personalized career recommendations', read: true, time: '1 week ago', icon: Sparkles },
];

const typeColors: Record<string, string> = {
  interview_reminder: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
  application_update: 'bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-400',
  follow_up: 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400',
  ats_score: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400',
  achievement: 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-400',
  skill_suggestion: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-400',
  system: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
};

export default function NotificationsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Notifications</h1>
          <p className="text-sm text-zinc-500 mt-1">Stay updated on your career journey</p>
        </div>
        <Button variant="outline" size="sm">Mark All Read</Button>
      </div>

      <div className="space-y-2">
        {notifications.map(n => (
          <Card key={n.id} className={`${!n.read ? 'border-l-4 border-l-blue-500' : ''} hover:shadow-sm transition-shadow`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`rounded-lg p-2 ${typeColors[n.type]}`}>
                  <n.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{n.title}</h3>
                    {!n.read && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">{n.message}</p>
                  <p className="text-[10px] text-zinc-400 mt-1">{n.time}</p>
                </div>
                {!n.read && (
                  <Button variant="ghost" size="sm" className="text-xs shrink-0">Dismiss</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
