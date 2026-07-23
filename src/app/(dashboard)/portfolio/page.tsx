'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import {
  Globe, Plus, ExternalLink, GitBranch, Star, Eye,
  Sparkles, Edit, Zap
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  githubUrl: string;
  technologies: string[];
  featured: boolean;
}

const portfolioProjects: Project[] = [
  { id: '1', name: 'React Dashboard Pro', description: 'An enterprise-grade dashboard built with React, TypeScript, and Tailwind CSS. Features real-time data visualization, dark mode, and responsive design.', url: 'https://dashboard-demo.dev', githubUrl: 'https://github.com/johndoe/dashboard-pro', technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'], featured: true },
  { id: '2', name: 'AI Writing Assistant', description: 'A full-stack AI-powered writing tool using GPT-4. Built with Next.js, PostgreSQL, and OpenAI API. Handles 10K+ daily active users.', url: 'https://ai-writer.dev', githubUrl: 'https://github.com/johndoe/ai-writer', technologies: ['Next.js', 'PostgreSQL', 'OpenAI', 'Vercel'], featured: true },
  { id: '3', name: 'DevTools CLI', description: 'A CLI toolkit for frontend developers. Published on npm with 5K+ weekly downloads. Automates common development workflows.', url: '', githubUrl: 'https://github.com/johndoe/devtools-cli', technologies: ['Node.js', 'TypeScript', 'Commander.js'], featured: false },
  { id: '4', name: 'Portfolio v3', description: 'This portfolio website, built with Next.js and Framer Motion. Features smooth animations and a unique design.', url: 'https://johndoe.dev', githubUrl: 'https://github.com/johndoe/portfolio', technologies: ['Next.js', 'Framer Motion', 'MDX'], featured: false },
];

export default function PortfolioPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const intelligenceScore = { overall: 82, completeness: 90, presentation: 75, impact: 80 };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Portfolio Builder
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Create and optimize your developer portfolio
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-3.5 w-3.5 mr-1" /> Preview
          </Button>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="gradient">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Project</DialogTitle>
                <DialogDescription>Add a project to your portfolio</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2"><Label>Project Name</Label><Input placeholder="My Awesome Project" /></div>
                <div className="space-y-2"><Label>Description</Label><Textarea placeholder="What does this project do?" rows={3} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Live URL</Label><Input placeholder="https://..." /></div>
                  <div className="space-y-2"><Label>GitHub URL</Label><Input placeholder="https://github.com/..." /></div>
                </div>
                <div className="space-y-2"><Label>Technologies</Label><Input placeholder="React, TypeScript, Node.js" /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setAddDialogOpen(false)}>Add Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Intelligence Score */}
      <Card className="border-violet-200 bg-gradient-to-r from-violet-50 to-blue-50 dark:border-violet-900 dark:from-violet-950/50 dark:to-blue-950/50">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-violet-600" />
                <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">Portfolio Intelligence Score</span>
              </div>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{intelligenceScore.overall}/100</p>
            </div>
            <div className="space-y-2 w-48">
              <div><div className="flex justify-between text-xs mb-0.5"><span className="text-zinc-500">Completeness</span><span>{intelligenceScore.completeness}%</span></div><Progress value={intelligenceScore.completeness} indicatorClassName="bg-emerald-500" /></div>
              <div><div className="flex justify-between text-xs mb-0.5"><span className="text-zinc-500">Presentation</span><span>{intelligenceScore.presentation}%</span></div><Progress value={intelligenceScore.presentation} indicatorClassName="bg-blue-500" /></div>
              <div><div className="flex justify-between text-xs mb-0.5"><span className="text-zinc-500">Impact</span><span>{intelligenceScore.impact}%</span></div><Progress value={intelligenceScore.impact} indicatorClassName="bg-violet-500" /></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {portfolioProjects.map(project => (
          <Card key={project.id} className={`hover:shadow-md transition-shadow ${project.featured ? 'border-blue-200 dark:border-blue-800' : ''}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{project.name}</h3>
                    {project.featured && <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />}
                  </div>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{project.description}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Edit className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.technologies.map(tech => (
                  <Badge key={tech} variant="secondary" className="text-[10px]">{tech}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {project.url && (
                  <Button variant="outline" size="sm" className="text-xs">
                    <ExternalLink className="h-3 w-3 mr-1" /> Live Demo
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" size="sm" className="text-xs">
                    <GitBranch className="h-3 w-3 mr-1" /> Source
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="text-xs text-blue-600 ml-auto">
                  <Sparkles className="h-3 w-3 mr-1" /> AI Improve
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
