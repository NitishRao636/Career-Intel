'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ATSScoreRing } from '@/components/shared/ats-score-ring';
import {
  FileText, Target, Briefcase, MessageSquare, TrendingUp,
  Calendar, Clock, ArrowRight, Sparkles, Zap, Award, BarChart3, Users
} from 'lucide-react';
import Link from 'next/link';

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const recentJobs = [
  { company: 'Stripe', title: 'Senior Frontend Engineer', status: 'interview', date: 'Jul 24' },
  { company: 'Vercel', title: 'Staff Software Engineer', status: 'applied', date: 'Jul 22' },
  { company: 'Linear', title: 'Product Engineer', status: 'screening', date: 'Jul 20' },
  { company: 'Notion', title: 'Full Stack Developer', status: 'offer', date: 'Jul 18' },
  { company: 'Arc', title: 'Frontend Developer', status: 'saved', date: 'Jul 17' },
];

const statusColors: Record<string, string> = {
  saved: 'secondary',
  applied: 'info',
  screening: 'warning',
  interview: 'default',
  offer: 'success',
  rejected: 'destructive',
};

const upcomingEvents = [
  { type: 'interview', title: 'Technical Interview — Stripe', time: 'Tomorrow, 2:00 PM', icon: Users },
  { type: 'followup', title: 'Follow up with Vercel recruiter', time: 'Jul 25, 10:00 AM', icon: Clock },
  { type: 'deadline', title: 'Submit portfolio project', time: 'Jul 27, EOD', icon: Calendar },
];

export default function DashboardPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome Header */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Good morning, John 👋
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Here&apos;s what&apos;s happening with your career journey.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Zap className="h-3.5 w-3.5 mr-1" />
            Quick Action
          </Button>
          <Button size="sm" variant="gradient">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            AI Resume Writer
          </Button>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Applications"
          value="47"
          change={{ value: '12% from last month', trend: 'up' }}
          icon={Briefcase}
          iconColor="text-blue-600"
        />
        <StatCard
          title="Interview Rate"
          value="23%"
          change={{ value: '5% from last month', trend: 'up' }}
          icon={Target}
          iconColor="text-emerald-600"
        />
        <StatCard
          title="ATS Avg Score"
          value="78"
          change={{ value: '3pts from last week', trend: 'up' }}
          icon={BarChart3}
          iconColor="text-violet-600"
        />
        <StatCard
          title="Active Resumes"
          value="5"
          change={{ value: '2 new this week', trend: 'neutral' }}
          icon={FileText}
          iconColor="text-amber-600"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Application Pipeline */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base">Application Pipeline</CardTitle>
                <CardDescription>Track your job applications</CardDescription>
              </div>
              <Link href="/jobs">
                <Button variant="ghost" size="sm" className="text-xs">
                  View All <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {/* Pipeline Bar */}
              <div className="mb-6 grid grid-cols-5 gap-2">
                {[
                  { label: 'Saved', count: 12, color: 'bg-zinc-400' },
                  { label: 'Applied', count: 18, color: 'bg-blue-500' },
                  { label: 'Screening', count: 8, color: 'bg-amber-500' },
                  { label: 'Interview', count: 6, color: 'bg-violet-500' },
                  { label: 'Offer', count: 3, color: 'bg-emerald-500' },
                ].map((stage) => (
                  <div key={stage.label} className="text-center">
                    <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{stage.count}</div>
                    <div className="text-xs text-zinc-500">{stage.label}</div>
                    <div className={cn('mt-1 h-1 rounded-full', stage.color)} />
                  </div>
                ))}
              </div>

              {/* Recent Applications */}
              <div className="space-y-3">
                {recentJobs.map((job) => (
                  <div
                    key={job.company}
                    className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-sm font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        {job.company[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{job.title}</p>
                        <p className="text-xs text-zinc-500">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={statusColors[job.status] as any} className="text-[10px]">
                        {job.status}
                      </Badge>
                      <span className="text-xs text-zinc-400">{job.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* ATS Score Overview */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Best ATS Score</CardTitle>
                <CardDescription>Your top-performing resume</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ATSScoreRing score={87} size={130} />
                <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  Senior Frontend Resume
                </p>
                <p className="text-xs text-zinc-500">Updated 2 days ago</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Upcoming</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                      <event.icon className="h-4 w-4 text-zinc-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{event.title}</p>
                      <p className="text-xs text-zinc-500">{event.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Coach Quick Actions */}
          <motion.div variants={fadeInUp}>
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-violet-50 dark:border-blue-900 dark:from-blue-950/50 dark:to-violet-950/50">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <CardTitle className="text-base">AI Career Coach</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <MessageSquare className="mr-2 h-3 w-3" /> Prepare for Stripe interview
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <TrendingUp className="mr-2 h-3 w-3" /> Analyze salary range
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Award className="mr-2 h-3 w-3" /> Suggest skill improvements
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Career Progress */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Career Roadmap Progress</CardTitle>
            <CardDescription>Path to Staff Engineer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'System Design', progress: 85 },
                { label: 'Leadership Skills', progress: 65 },
                { label: 'Technical Depth', progress: 78 },
                { label: 'Communication', progress: 72 },
                { label: 'Industry Knowledge', progress: 90 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{item.label}</span>
                    <span className="text-sm text-zinc-500">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function cn(...args: any[]) {
  return args.filter(Boolean).join(' ');
}
