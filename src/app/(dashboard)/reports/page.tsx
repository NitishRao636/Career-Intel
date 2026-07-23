'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3, TrendingUp, FileText, Briefcase, Target,
  Download, Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const applicationTrend = [
  { month: 'Feb', applied: 8, interviews: 1, offers: 0 },
  { month: 'Mar', applied: 12, interviews: 2, offers: 0 },
  { month: 'Apr', applied: 15, interviews: 3, offers: 1 },
  { month: 'May', applied: 10, interviews: 4, offers: 0 },
  { month: 'Jun', applied: 18, interviews: 5, offers: 1 },
  { month: 'Jul', applied: 14, interviews: 6, offers: 2 },
];

const atsScoreDistribution = [
  { range: '0-40', count: 1, color: 'bg-red-500' },
  { range: '41-60', count: 3, color: 'bg-orange-500' },
  { range: '61-80', count: 8, color: 'bg-amber-500' },
  { range: '81-100', count: 4, color: 'bg-emerald-500' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Reports & Analytics
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Insights into your career journey and progress
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-3.5 w-3.5 mr-1" /> Last 6 Months
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5 mr-1" /> Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Applications', value: '77', change: '+23%', up: true, icon: Briefcase },
          { label: 'Interview Rate', value: '23%', change: '+5%', up: true, icon: Target },
          { label: 'Avg ATS Score', value: '78', change: '+3pts', up: true, icon: BarChart3 },
          { label: 'Offer Rate', value: '4%', change: '+1%', up: true, icon: FileText },
        ].map(metric => (
          <Card key={metric.label}>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="h-4 w-4 text-zinc-400" />
                <span className={`text-xs font-medium flex items-center gap-0.5 ${metric.up ? 'text-emerald-600' : 'text-red-600'}`}>
                  {metric.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{metric.value}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="applications">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="ats">ATS Analysis</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Application Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Application Trend</CardTitle>
                <CardDescription>Monthly application volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applicationTrend.map(m => (
                    <div key={m.month} className="flex items-center gap-4">
                      <span className="text-xs font-medium text-zinc-500 w-8">{m.month}</span>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-6 bg-zinc-50 dark:bg-zinc-900 rounded overflow-hidden relative">
                          <div className="h-full bg-blue-500 rounded transition-all" style={{ width: `${(m.applied / 18) * 100}%` }} />
                        </div>
                        <span className="text-xs font-medium text-zinc-600 w-6">{m.applied}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-blue-500" /> Applied</span>
                </div>
              </CardContent>
            </Card>

            {/* Status Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Status Breakdown</CardTitle>
                <CardDescription>Current application pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { status: 'Saved', count: 12, total: 77, color: 'bg-zinc-400' },
                    { status: 'Applied', count: 18, total: 77, color: 'bg-blue-500' },
                    { status: 'Screening', count: 8, total: 77, color: 'bg-amber-500' },
                    { status: 'Interview', count: 6, total: 77, color: 'bg-violet-500' },
                    { status: 'Offer', count: 3, total: 77, color: 'bg-emerald-500' },
                    { status: 'Rejected', count: 28, total: 77, color: 'bg-red-500' },
                    { status: 'Withdrawn', count: 2, total: 77, color: 'bg-zinc-300' },
                  ].map(s => (
                    <div key={s.status}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-zinc-600 dark:text-zinc-400">{s.status}</span>
                        <span className="font-medium">{s.count} <span className="text-zinc-400 font-normal">({Math.round(s.count / s.total * 100)}%)</span></span>
                      </div>
                      <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <div className={`h-2 rounded-full ${s.color} transition-all`} style={{ width: `${(s.count / s.total) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ats" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {atsScoreDistribution.map(d => (
                    <div key={d.range} className="flex items-center gap-4">
                      <span className="text-sm text-zinc-500 w-12">{d.range}</span>
                      <div className="flex-1 h-8 bg-zinc-50 dark:bg-zinc-900 rounded flex items-center">
                        <div className={`h-8 ${d.color} rounded flex items-center justify-end px-2 transition-all`} style={{ width: `${(d.count / 8) * 100}%`, minWidth: '2rem' }}>
                          <span className="text-xs font-bold text-white">{d.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top Resumes by ATS Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Senior Frontend Resume', score: 87, date: '2 days ago' },
                    { name: 'Staff Engineer Resume', score: 82, date: '1 week ago' },
                    { name: 'Full Stack Resume', score: 76, date: '3 weeks ago' },
                    { name: 'Product Engineer Resume', score: 71, date: '1 month ago' },
                    { name: 'General Tech Resume', score: 65, date: '2 months ago' },
                  ].map((r, i) => (
                    <div key={r.name} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-zinc-400 w-5">#{i + 1}</span>
                        <div>
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{r.name}</p>
                          <p className="text-xs text-zinc-500">{r.date}</p>
                        </div>
                      </div>
                      <Badge variant={r.score >= 80 ? 'success' : r.score >= 60 ? 'warning' : 'destructive'}>
                        {r.score}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Skill Demand vs Your Proficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { skill: 'React', demand: 95, proficiency: 95, gap: 0 },
                  { skill: 'TypeScript', demand: 92, proficiency: 80, gap: -12 },
                  { skill: 'System Design', demand: 90, proficiency: 50, gap: -40 },
                  { skill: 'AWS', demand: 88, proficiency: 25, gap: -63 },
                  { skill: 'Next.js', demand: 88, proficiency: 80, gap: -8 },
                  { skill: 'Leadership', demand: 85, proficiency: 65, gap: -20 },
                  { skill: 'Docker', demand: 80, proficiency: 25, gap: -55 },
                  { skill: 'GraphQL', demand: 78, proficiency: 60, gap: -18 },
                ].map(s => (
                  <div key={s.skill}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium">{s.skill}</span>
                      <span className={`text-xs font-medium ${s.gap > -20 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {s.gap === 0 ? 'Aligned' : `${s.gap}% gap`}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div className="flex-1 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: `${s.demand}%` }} />
                      </div>
                      <div className="flex-1 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
                        <div className="h-2 rounded-full bg-violet-500" style={{ width: `${s.proficiency}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-4 text-xs text-zinc-500 pt-2">
                  <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-blue-500" /> Market Demand</span>
                  <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-violet-500" /> Your Level</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
