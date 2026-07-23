'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Map, Target, TrendingUp, Lightbulb, Sparkles, CheckCircle2,
  Circle, ChevronRight, Rocket, GraduationCap, Briefcase, Award
} from 'lucide-react';

const roadmapMilestones = [
  {
    id: '1',
    title: 'Strengthen Core Skills',
    description: 'Build deep expertise in system design and advanced frontend patterns',
    targetDate: 'Q3 2024',
    completed: true,
    progress: 100,
    tasks: [
      { id: 't1', title: 'Complete system design course', completed: true },
      { id: 't2', title: 'Build 3 side projects with complex state', completed: true },
      { id: 't3', title: 'Contribute to open-source React projects', completed: true },
    ],
    skills: ['System Design', 'React Patterns', 'State Management'],
  },
  {
    id: '2',
    title: 'Leadership & Mentoring',
    description: 'Develop leadership skills and start mentoring junior engineers',
    targetDate: 'Q4 2024',
    completed: false,
    progress: 65,
    tasks: [
      { id: 't4', title: 'Lead a cross-team project', completed: true },
      { id: 't5', title: 'Mentor 2 junior engineers', completed: true },
      { id: 't6', title: 'Write technical blog posts', completed: false },
      { id: 't7', title: 'Give tech talks at meetups', completed: false },
    ],
    skills: ['Technical Leadership', 'Mentoring', 'Communication'],
  },
  {
    id: '3',
    title: 'Industry Recognition',
    description: 'Build industry presence through speaking, writing, and open-source',
    targetDate: 'Q1 2025',
    completed: false,
    progress: 30,
    tasks: [
      { id: 't8', title: 'Speak at a conference', completed: false },
      { id: 't9', title: 'Publish 10 technical articles', completed: false },
      { id: 't10', title: 'Maintain a popular OSS project', completed: true },
    ],
    skills: ['Public Speaking', 'Technical Writing', 'Open Source'],
  },
  {
    id: '4',
    title: 'Staff Engineer Role',
    description: 'Target and secure a Staff/Principal engineer position',
    targetDate: 'Q2 2025',
    completed: false,
    progress: 10,
    tasks: [
      { id: 't11', title: 'Update resume for Staff level', completed: true },
      { id: 't12', title: 'Network with 10 Staff+ engineers', completed: false },
      { id: 't13', title: 'Prepare for Staff-level interviews', completed: false },
    ],
    skills: ['Architecture', 'Strategy', 'Influence'],
  },
];

const salaryData = {
  current: { title: 'Senior Frontend Engineer', salary: 180000 },
  target: { title: 'Staff Engineer', salary: 280000 },
  growth: 55,
};

export default function CareerRoadmapPage() {
  const [milestones, setMilestones] = useState(roadmapMilestones);

  const toggleTask = (milestoneId: string, taskId: string) => {
    setMilestones(milestones.map(m => {
      if (m.id !== milestoneId) return m;
      const newTasks = m.tasks.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      const completedCount = newTasks.filter(t => t.completed).length;
      const progress = Math.round((completedCount / newTasks.length) * 100);
      return { ...m, tasks: newTasks, progress, completed: progress === 100 };
    }));
  };

  const overallProgress = Math.round(
    milestones.reduce((acc, m) => acc + m.progress, 0) / milestones.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Career Roadmap
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Your path from Senior Engineer to Staff Engineer
          </p>
        </div>
        <Button variant="gradient" size="sm">
          <Sparkles className="h-3.5 w-3.5 mr-1" /> AI Regenerate
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-2.5 dark:bg-blue-900">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{overallProgress}%</p>
                <p className="text-xs text-zinc-500">Overall Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-2.5 dark:bg-emerald-900">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {milestones.filter(m => m.completed).length}/{milestones.length}
                </p>
                <p className="text-xs text-zinc-500">Milestones Done</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-2.5 dark:bg-amber-900">
                <TrendingUp className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">+{salaryData.growth}%</p>
                <p className="text-xs text-zinc-500">Salary Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-violet-100 p-2.5 dark:bg-violet-900">
                <Rocket className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">9 mo</p>
                <p className="text-xs text-zinc-500">Est. Timeline</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Projection */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-violet-50 dark:border-blue-900 dark:from-blue-950/50 dark:to-violet-950/50">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Salary Projection</p>
              <div className="flex items-center gap-4 mt-2">
                <div>
                  <p className="text-xs text-zinc-500">Current</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">$180K</p>
                  <p className="text-[10px] text-zinc-500">Senior Frontend Engineer</p>
                </div>
                <ChevronRight className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-xs text-zinc-500">Target</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">$280K</p>
                  <p className="text-[10px] text-zinc-500">Staff Engineer</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">+55%</p>
              <p className="text-xs text-zinc-500">Potential increase</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones Timeline */}
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={milestone.completed ? 'border-emerald-200 dark:border-emerald-800' : ''}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      milestone.completed
                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900'
                        : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800'
                    }`}>
                      {milestone.completed ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full min-h-[40px] bg-zinc-200 dark:bg-zinc-800 mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                          {milestone.title}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-0.5">{milestone.description}</p>
                      </div>
                      <Badge variant={milestone.completed ? 'success' : 'secondary'} className="text-[10px]">
                        {milestone.targetDate}
                      </Badge>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-zinc-500">Progress</span>
                        <span className="font-medium">{milestone.progress}%</span>
                      </div>
                      <Progress
                        value={milestone.progress}
                        indicatorClassName={milestone.completed ? 'bg-emerald-500' : 'bg-blue-500'}
                      />
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {milestone.skills.map(skill => (
                        <Badge key={skill} variant="outline" className="text-[10px]">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Tasks */}
                    <div className="mt-3 space-y-1.5">
                      {milestone.tasks.map(task => (
                        <button
                          key={task.id}
                          onClick={() => toggleTask(milestone.id, task.id)}
                          className="flex items-center gap-2 text-xs w-full text-left group"
                        >
                          <div className={`h-3.5 w-3.5 rounded border flex items-center justify-center transition-colors ${
                            task.completed
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-zinc-300 dark:border-zinc-700 group-hover:border-blue-400'
                          }`}>
                            {task.completed && <CheckCircle2 className="h-2.5 w-2.5" />}
                          </div>
                          <span className={task.completed ? 'text-zinc-400 line-through' : 'text-zinc-700 dark:text-zinc-300'}>
                            {task.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
