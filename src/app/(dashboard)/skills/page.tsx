'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3, TrendingUp, TrendingDown, Minus, Plus,
  Sparkles, Search, Award, Zap
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language' | 'tool' | 'framework' | 'methodology';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience: number;
  demand: { trend: 'rising' | 'stable' | 'declining'; score: number; avgSalary: number };
}

const skillsData: Skill[] = [
  { id: '1', name: 'React', category: 'framework', proficiency: 'expert', yearsOfExperience: 6, demand: { trend: 'stable', score: 95, avgSalary: 165000 } },
  { id: '2', name: 'TypeScript', category: 'language', proficiency: 'advanced', yearsOfExperience: 5, demand: { trend: 'rising', score: 92, avgSalary: 170000 } },
  { id: '3', name: 'Next.js', category: 'framework', proficiency: 'advanced', yearsOfExperience: 4, demand: { trend: 'rising', score: 88, avgSalary: 175000 } },
  { id: '4', name: 'Node.js', category: 'framework', proficiency: 'intermediate', yearsOfExperience: 3, demand: { trend: 'stable', score: 85, avgSalary: 160000 } },
  { id: '5', name: 'GraphQL', category: 'tool', proficiency: 'intermediate', yearsOfExperience: 2, demand: { trend: 'rising', score: 78, avgSalary: 168000 } },
  { id: '6', name: 'System Design', category: 'methodology', proficiency: 'intermediate', yearsOfExperience: 2, demand: { trend: 'rising', score: 90, avgSalary: 200000 } },
  { id: '7', name: 'AWS', category: 'tool', proficiency: 'beginner', yearsOfExperience: 1, demand: { trend: 'stable', score: 88, avgSalary: 180000 } },
  { id: '8', name: 'CSS/Tailwind', category: 'technical', proficiency: 'expert', yearsOfExperience: 6, demand: { trend: 'stable', score: 75, avgSalary: 145000 } },
  { id: '9', name: 'PostgreSQL', category: 'tool', proficiency: 'intermediate', yearsOfExperience: 3, demand: { trend: 'stable', score: 82, avgSalary: 165000 } },
  { id: '10', name: 'Docker', category: 'tool', proficiency: 'beginner', yearsOfExperience: 1, demand: { trend: 'rising', score: 80, avgSalary: 170000 } },
  { id: '11', name: 'Communication', category: 'soft', proficiency: 'advanced', yearsOfExperience: 6, demand: { trend: 'rising', score: 85, avgSalary: 0 } },
  { id: '12', name: 'Leadership', category: 'soft', proficiency: 'intermediate', yearsOfExperience: 2, demand: { trend: 'rising', score: 88, avgSalary: 0 } },
];

const categoryColors: Record<string, string> = {
  technical: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  soft: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  language: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
  tool: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  framework: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
  methodology: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
};

const proficiencyOrder = ['beginner', 'intermediate', 'advanced', 'expert'];

export default function SkillsPage() {
  const [skills, setSkills] = useState(skillsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [newSkill, setNewSkill] = useState('');

  const filteredSkills = skills.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || s.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryCounts = skills.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getProficiencyColor = (p: string) => {
    if (p === 'expert') return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950';
    if (p === 'advanced') return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950';
    if (p === 'intermediate') return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950';
    return 'text-zinc-600 bg-zinc-50 dark:text-zinc-400 dark:bg-zinc-950';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'rising') return <TrendingUp className="h-3 w-3 text-emerald-500" />;
    if (trend === 'declining') return <TrendingDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-zinc-400" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Skills Manager</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Track, analyze, and grow your skill set
          </p>
        </div>
        <Button variant="gradient" size="sm">
          <Sparkles className="h-3.5 w-3.5 mr-1" /> AI Skill Suggestions
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-zinc-500">Total Skills</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{skills.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-zinc-500">Expert Level</p>
            <p className="text-2xl font-bold text-emerald-600">{skills.filter(s => s.proficiency === 'expert').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-zinc-500">Rising Demand</p>
            <p className="text-2xl font-bold text-blue-600">{skills.filter(s => s.demand.trend === 'rising').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-zinc-500">Avg Market Score</p>
            <p className="text-2xl font-bold text-violet-600">
              {Math.round(skills.reduce((a, s) => a + s.demand.score, 0) / skills.length)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="pl-9"
          />
        </div>
        <div className="flex gap-1">
          {['all', ...Object.keys(categoryCounts)].map(cat => (
            <Button
              key={cat}
              variant={filterCategory === cat ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFilterCategory(cat)}
              className="text-xs capitalize"
            >
              {cat} {cat !== 'all' && `(${categoryCounts[cat]})`}
            </Button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSkills.map(skill => (
          <Card key={skill.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{skill.name}</h3>
                  <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${categoryColors[skill.category]}`}>
                    {skill.category}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(skill.demand.trend)}
                  <span className="text-xs font-medium text-zinc-500">{skill.demand.score}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Proficiency</span>
                  <span className={`font-medium capitalize px-1.5 py-0.5 rounded ${getProficiencyColor(skill.proficiency)}`}>
                    {skill.proficiency}
                  </span>
                </div>
                <Progress
                  value={(proficiencyOrder.indexOf(skill.proficiency) + 1) / proficiencyOrder.length * 100}
                  className="h-1.5"
                />

                <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
                  <span>{skill.yearsOfExperience} yr{skill.yearsOfExperience !== 1 ? 's' : ''} experience</span>
                  {skill.demand.avgSalary > 0 && (
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      ${(skill.demand.avgSalary / 1000).toFixed(0)}K avg
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Skill */}
      <Card className="border-dashed">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newSkill) {
                  setSkills([...skills, {
                    id: Date.now().toString(),
                    name: newSkill,
                    category: 'technical',
                    proficiency: 'beginner',
                    yearsOfExperience: 0,
                    demand: { trend: 'stable', score: 50, avgSalary: 0 },
                  }]);
                  setNewSkill('');
                }
              }}
            />
            <Button
              onClick={() => {
                if (newSkill) {
                  setSkills([...skills, {
                    id: Date.now().toString(),
                    name: newSkill,
                    category: 'technical',
                    proficiency: 'beginner',
                    yearsOfExperience: 0,
                    demand: { trend: 'stable', score: 50, avgSalary: 0 },
                  }]);
                  setNewSkill('');
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
