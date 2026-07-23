'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription
} from '@/components/ui/dialog';
import {
  Plus, Briefcase, MapPin, DollarSign, ExternalLink,
  GripVertical, Calendar, Star, Filter, Search, LayoutGrid, List
} from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

type ApplicationStatus = 'saved' | 'applied' | 'screening' | 'interview' | 'offer' | 'rejected' | 'withdrawn' | 'accepted';

interface JobApplication {
  id: string;
  company: string;
  title: string;
  location: string;
  salary: string;
  url: string;
  status: ApplicationStatus;
  notes: string;
  appliedAt: string;
  tags: string[];
  matchScore: number;
}

const statusConfig: Record<ApplicationStatus, { label: string; color: string; bgColor: string }> = {
  saved: { label: 'Saved', color: 'bg-zinc-400', bgColor: 'bg-zinc-50 dark:bg-zinc-900' },
  applied: { label: 'Applied', color: 'bg-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-950' },
  screening: { label: 'Screening', color: 'bg-amber-500', bgColor: 'bg-amber-50 dark:bg-amber-950' },
  interview: { label: 'Interview', color: 'bg-violet-500', bgColor: 'bg-violet-50 dark:bg-violet-950' },
  offer: { label: 'Offer', color: 'bg-emerald-500', bgColor: 'bg-emerald-50 dark:bg-emerald-950' },
  rejected: { label: 'Rejected', color: 'bg-red-500', bgColor: 'bg-red-50 dark:bg-red-950' },
  withdrawn: { label: 'Withdrawn', color: 'bg-zinc-300', bgColor: 'bg-zinc-50 dark:bg-zinc-900' },
  accepted: { label: 'Accepted', color: 'bg-green-500', bgColor: 'bg-green-50 dark:bg-green-950' },
};

const mockApplications: JobApplication[] = [
  { id: '1', company: 'Stripe', title: 'Senior Frontend Engineer', location: 'San Francisco, CA', salary: '$180K - $250K', url: '', status: 'interview', notes: 'Technical round scheduled for next week', appliedAt: '2024-07-22', tags: ['Remote', 'Senior'], matchScore: 92 },
  { id: '2', company: 'Vercel', title: 'Staff Software Engineer', location: 'Remote', salary: '$190K - $270K', url: '', status: 'applied', notes: 'Applied through referral', appliedAt: '2024-07-20', tags: ['Remote', 'Staff'], matchScore: 88 },
  { id: '3', company: 'Linear', title: 'Product Engineer', location: 'San Francisco, CA', salary: '$160K - $220K', url: '', status: 'screening', notes: 'Recruiter call completed', appliedAt: '2024-07-18', tags: ['Hybrid'], matchScore: 75 },
  { id: '4', company: 'Notion', title: 'Full Stack Developer', location: 'New York, NY', salary: '$170K - $240K', url: '', status: 'offer', notes: 'Offer received! Negotiating.', appliedAt: '2024-07-15', tags: ['On-site'], matchScore: 85 },
  { id: '5', company: 'Arc', title: 'Frontend Developer', location: 'Remote', salary: '$150K - $200K', url: '', status: 'saved', notes: '', appliedAt: '2024-07-17', tags: ['Remote'], matchScore: 70 },
  { id: '6', company: 'Figma', title: 'Senior Engineer', location: 'San Francisco, CA', salary: '$185K - $260K', url: '', status: 'rejected', notes: 'Went with internal candidate', appliedAt: '2024-07-10', tags: ['Hybrid', 'Senior'], matchScore: 65 },
  { id: '7', company: 'GitHub', title: 'Principal Engineer', location: 'Remote', salary: '$200K - $300K', url: '', status: 'applied', notes: '', appliedAt: '2024-07-21', tags: ['Remote', 'Principal'], matchScore: 80 },
];

const kanbanColumns: ApplicationStatus[] = ['saved', 'applied', 'screening', 'interview', 'offer'];

export default function JobTrackerPage() {
  const [applications, setApplications] = useState<JobApplication[]>(mockApplications);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newApp, setNewApp] = useState({ company: '', title: '', location: '', salary: '', url: '', notes: '' });

  const filteredApps = useMemo(() => {
    if (!searchQuery) return applications;
    const q = searchQuery.toLowerCase();
    return applications.filter(
      app => app.company.toLowerCase().includes(q) || app.title.toLowerCase().includes(q)
    );
  }, [applications, searchQuery]);

  const addApplication = () => {
    const app: JobApplication = {
      id: Date.now().toString(),
      ...newApp,
      status: 'saved',
      appliedAt: new Date().toISOString().split('T')[0],
      tags: [],
      matchScore: Math.floor(Math.random() * 30) + 60,
    };
    setApplications([...applications, app]);
    setNewApp({ company: '', title: '', location: '', salary: '', url: '', notes: '' });
    setAddDialogOpen(false);
  };

  const moveApplication = (id: string, newStatus: ApplicationStatus) => {
    setApplications(apps =>
      apps.map(app => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const getMatchColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950';
    if (score >= 70) return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950';
    return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Job Tracker
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Track and manage your job applications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === 'kanban' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setView('kanban')}
          >
            <LayoutGrid className="h-3.5 w-3.5 mr-1" /> Kanban
          </Button>
          <Button
            variant={view === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setView('list')}
          >
            <List className="h-3.5 w-3.5 mr-1" /> List
          </Button>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="gradient">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Application
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Job Application</DialogTitle>
                <DialogDescription>Track a new job opportunity</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input value={newApp.company} onChange={(e) => setNewApp({ ...newApp, company: e.target.value })} placeholder="e.g., Stripe" />
                </div>
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input value={newApp.title} onChange={(e) => setNewApp({ ...newApp, title: e.target.value })} placeholder="e.g., Senior Frontend Engineer" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input value={newApp.location} onChange={(e) => setNewApp({ ...newApp, location: e.target.value })} placeholder="e.g., Remote" />
                  </div>
                  <div className="space-y-2">
                    <Label>Salary Range</Label>
                    <Input value={newApp.salary} onChange={(e) => setNewApp({ ...newApp, salary: e.target.value })} placeholder="e.g., $150K - $200K" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Job URL</Label>
                  <Input value={newApp.url} onChange={(e) => setNewApp({ ...newApp, url: e.target.value })} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea value={newApp.notes} onChange={(e) => setNewApp({ ...newApp, notes: e.target.value })} placeholder="Any notes about this application..." rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={addApplication} disabled={!newApp.company || !newApp.title}>Add Application</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applications..."
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-1 text-sm text-zinc-500">
          <Briefcase className="h-4 w-4" />
          {filteredApps.length} applications
        </div>
      </div>

      {/* Kanban View */}
      {view === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {kanbanColumns.map((status) => {
            const config = statusConfig[status];
            const columnApps = filteredApps.filter(app => app.status === status);
            return (
              <div key={status} className="flex-shrink-0 w-[280px]">
                <div className={`rounded-t-xl px-3 py-2 ${config.bgColor}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${config.color}`} />
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {config.label}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-400 bg-white dark:bg-zinc-800 rounded-full px-2 py-0.5">
                      {columnApps.length}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 mt-2">
                  <AnimatePresence>
                    {columnApps.map((app) => (
                      <motion.div
                        key={app.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Card className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 text-xs font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                  {app.company[0]}
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 leading-tight">
                                    {app.title}
                                  </p>
                                  <p className="text-[11px] text-zinc-500">{app.company}</p>
                                </div>
                              </div>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getMatchColor(app.matchScore)}`}>
                                {app.matchScore}%
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                              {app.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" /> {app.location}
                                </span>
                              )}
                              {app.salary && (
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" /> {app.salary}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex gap-1">
                                {app.tags.map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <span className="text-[10px] text-zinc-400">
                                {formatRelativeTime(app.appliedAt)}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {columnApps.length === 0 && (
                    <div className="rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 p-4 text-center">
                      <p className="text-xs text-zinc-400">No applications</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredApps.map((app) => {
                const config = statusConfig[app.status];
                return (
                  <div key={app.id} className="flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-sm font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        {app.company[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{app.title}</p>
                        <div className="flex items-center gap-3 text-xs text-zinc-500">
                          <span>{app.company}</span>
                          {app.location && <span>• {app.location}</span>}
                          {app.salary && <span>• {app.salary}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${getMatchColor(app.matchScore)}`}>
                        {app.matchScore}% match
                      </span>
                      <Badge variant={
                        app.status === 'offer' || app.status === 'accepted' ? 'success' :
                        app.status === 'rejected' ? 'destructive' :
                        app.status === 'interview' ? 'default' : 'secondary'
                      } className="text-xs">
                        {config.label}
                      </Badge>
                      <span className="text-xs text-zinc-400 w-20 text-right">{formatRelativeTime(app.appliedAt)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
