'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription
} from '@/components/ui/dialog';
import {
  Plus, Trash2, GripVertical, FileText, Eye, Download,
  Sparkles, ChevronDown, ChevronUp, Wand2, Copy, Settings2
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { generateId } from '@/lib/utils';
import { ATSScoreRing } from '@/components/shared/ats-score-ring';

interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  bulletPoints: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  headline: string;
  summary: string;
}

const defaultPersonalInfo: PersonalInfo = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/johndoe',
  website: 'johndoe.dev',
  headline: 'Senior Frontend Engineer',
  summary: 'Passionate frontend engineer with 6+ years of experience building scalable web applications. Expert in React, TypeScript, and modern web technologies. Led teams of 5-10 engineers to deliver high-impact products at scale.',
};

const defaultExperience: Experience[] = [
  {
    id: '1',
    company: 'Stripe',
    title: 'Senior Frontend Engineer',
    location: 'San Francisco, CA',
    startDate: '2022-01',
    endDate: '',
    current: true,
    description: '',
    bulletPoints: [
      'Led the redesign of the merchant dashboard, improving user engagement by 35% and reducing support tickets by 20%',
      'Architected a component library used by 40+ engineers across 8 product teams, reducing development time by 30%',
      'Mentored 4 junior engineers and conducted 50+ technical interviews for the frontend team',
      'Implemented real-time analytics features using WebSocket connections, handling 10K+ concurrent users',
    ],
  },
  {
    id: '2',
    company: 'Vercel',
    title: 'Frontend Engineer',
    location: 'Remote',
    startDate: '2019-06',
    endDate: '2021-12',
    current: false,
    description: '',
    bulletPoints: [
      'Built and maintained the Next.js documentation site serving 2M+ monthly visitors',
      'Developed the deployment dashboard with real-time build logs and preview deployments',
      'Contributed to the Next.js framework core, shipping 5 major features adopted by 500K+ developers',
    ],
  },
];

const defaultEducation: Education[] = [
  {
    id: '1',
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: '2015-08',
    endDate: '2019-05',
    gpa: '3.8',
  },
];

export default function ResumeBuilderPage() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(defaultPersonalInfo);
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperience);
  const [education, setEducation] = useState<Education[]>(defaultEducation);
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'Tailwind CSS', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'REST APIs', 'Figma']);
  const [newSkill, setNewSkill] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [previewMode, setPreviewMode] = useState(false);
  const [expandedExp, setExpandedExp] = useState<Set<string>>(new Set(['1', '2']));
  const [aiGenerating, setAiGenerating] = useState(false);

  const addExperience = () => {
    const newExp: Experience = {
      id: generateId(),
      company: '',
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      bulletPoints: [''],
    };
    setExperiences([...experiences, newExp]);
    setExpandedExp(new Set([...expandedExp, newExp.id]));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const updateBulletPoint = (expId: string, bulletIndex: number, value: string) => {
    setExperiences(experiences.map(exp => {
      if (exp.id !== expId) return exp;
      const newBullets = [...exp.bulletPoints];
      newBullets[bulletIndex] = value;
      return { ...exp, bulletPoints: newBullets };
    }));
  };

  const addBulletPoint = (expId: string) => {
    setExperiences(experiences.map(exp => {
      if (exp.id !== expId) return exp;
      return { ...exp, bulletPoints: [...exp.bulletPoints, ''] };
    }));
  };

  const removeBulletPoint = (expId: string, bulletIndex: number) => {
    setExperiences(experiences.map(exp => {
      if (exp.id !== expId) return exp;
      return { ...exp, bulletPoints: exp.bulletPoints.filter((_, i) => i !== bulletIndex) };
    }));
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    setEducation([...education, {
      id: generateId(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    }]);
  };

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAiRewrite = async (expId: string) => {
    setAiGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAiGenerating(false);
  };

  const toggleExpExpanded = (id: string) => {
    const newSet = new Set(expandedExp);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedExp(newSet);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Resume Builder
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Build, optimize, and export your resume with AI assistance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="h-3.5 w-3.5 mr-1" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline" size="sm">
            <Settings2 className="h-3.5 w-3.5 mr-1" />
            Template
          </Button>
          <Button size="sm" variant="gradient">
            <Download className="h-3.5 w-3.5 mr-1" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Editor Panel */}
        <div className="xl:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input
                        value={personalInfo.firstName}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input
                        value={personalInfo.lastName}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>LinkedIn</Label>
                      <Input
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Professional Headline</Label>
                    <Input
                      value={personalInfo.headline}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, headline: e.target.value })}
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Professional Summary</Label>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-600">
                        <Sparkles className="h-3 w-3 mr-1" /> AI Enhance
                      </Button>
                    </div>
                    <Textarea
                      value={personalInfo.summary}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                      rows={4}
                      placeholder="Write a compelling professional summary..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-4 mt-4">
              <AnimatePresence>
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card>
                      <CardHeader className="cursor-pointer" onClick={() => toggleExpExpanded(exp.id)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <GripVertical className="h-4 w-4 text-zinc-300" />
                            <div>
                              <CardTitle className="text-sm">
                                {exp.title || 'New Experience'} at {exp.company || 'Company'}
                              </CardTitle>
                              <p className="text-xs text-zinc-500 mt-0.5">
                                {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }}
                            >
                              <Trash2 className="h-3.5 w-3.5 text-red-500" />
                            </Button>
                            {expandedExp.has(exp.id) ? (
                              <ChevronUp className="h-4 w-4 text-zinc-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-zinc-400" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      {expandedExp.has(exp.id) && (
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Job Title</Label>
                              <Input
                                value={exp.title}
                                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                placeholder="e.g., Senior Software Engineer"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                placeholder="e.g., Stripe"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Start Date</Label>
                              <Input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>End Date</Label>
                              <Input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                disabled={exp.current}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Location</Label>
                              <Input
                                value={exp.location}
                                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                placeholder="e.g., San Francisco, CA"
                              />
                            </div>
                          </div>

                          <Separator />

                          {/* Bullet Points */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>Achievements & Responsibilities</Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-blue-600"
                                onClick={() => handleAiRewrite(exp.id)}
                                disabled={aiGenerating}
                              >
                                <Wand2 className="h-3 w-3 mr-1" />
                                {aiGenerating ? 'Rewriting...' : 'AI Rewrite'}
                              </Button>
                            </div>
                            {exp.bulletPoints.map((bullet, bulletIndex) => (
                              <div key={bulletIndex} className="flex items-start gap-2">
                                <span className="mt-2.5 text-zinc-400">•</span>
                                <Textarea
                                  value={bullet}
                                  onChange={(e) => updateBulletPoint(exp.id, bulletIndex, e.target.value)}
                                  placeholder="Start with an action verb (Led, Built, Achieved...)"
                                  rows={2}
                                  className="text-sm"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="mt-1.5 h-7 w-7 shrink-0"
                                  onClick={() => removeBulletPoint(exp.id, bulletIndex)}
                                >
                                  <Trash2 className="h-3 w-3 text-zinc-400" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full mt-2"
                              onClick={() => addBulletPoint(exp.id)}
                            >
                              <Plus className="h-3 w-3 mr-1" /> Add Bullet Point
                            </Button>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button variant="outline" className="w-full" onClick={addExperience}>
                <Plus className="h-4 w-4 mr-2" /> Add Experience
              </Button>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-4 mt-4">
              {education.map((edu) => (
                <Card key={edu.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">
                        {edu.degree || 'New Degree'} in {edu.field || 'Field of Study'}
                      </CardTitle>
                      <Button variant="ghost" size="icon" className="h-7 w-7"
                        onClick={() => setEducation(education.filter(e => e.id !== edu.id))}>
                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(ev) => setEducation(education.map(item => item.id === edu.id ? { ...item, institution: ev.target.value } : item))}
                        placeholder="e.g., MIT"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Degree</Label>
                        <Input value={edu.degree} onChange={(ev) => setEducation(education.map(item => item.id === edu.id ? { ...item, degree: ev.target.value } : item))} placeholder="e.g., Bachelor of Science" />
                      </div>
                      <div className="space-y-2">
                        <Label>Field of Study</Label>
                        <Input value={edu.field} onChange={(ev) => setEducation(education.map(item => item.id === edu.id ? { ...item, field: ev.target.value } : item))} placeholder="e.g., Computer Science" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input type="month" value={edu.startDate} onChange={(ev) => setEducation(education.map(item => item.id === edu.id ? { ...item, startDate: ev.target.value } : item))} />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input type="month" value={edu.endDate} onChange={(ev) => setEducation(education.map(item => item.id === edu.id ? { ...item, endDate: ev.target.value } : item))} />
                      </div>
                      <div className="space-y-2">
                        <Label>GPA</Label>
                        <Input value={edu.gpa} onChange={(ev) => setEducation(education.map(item => item.id === edu.id ? { ...item, gpa: ev.target.value } : item))} placeholder="3.8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full" onClick={addEducation}>
                <Plus className="h-4 w-4 mr-2" /> Add Education
              </Button>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill..."
                      onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="pl-3 pr-1.5 py-1.5 text-sm gap-1.5">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <p className="text-xs text-zinc-500 mb-2">Suggested skills based on your experience:</p>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'Python', 'CI/CD', 'Kubernetes', 'Agile', 'Testing', 'System Design', 'Redis'].map(skill => (
                        <button
                          key={skill}
                          onClick={() => !skills.includes(skill) && setSkills([...skills, skill])}
                          className={`rounded-full border px-3 py-1 text-xs transition-all ${
                            skills.includes(skill)
                              ? 'border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800'
                              : 'border-dashed border-zinc-300 text-zinc-600 hover:border-blue-400 hover:text-blue-600 dark:border-zinc-600 dark:text-zinc-400'
                          }`}
                          disabled={skills.includes(skill)}
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-4 mt-4">
              <Card>
                <CardContent className="py-12">
                  <div className="flex flex-col items-center text-center">
                    <FileText className="h-8 w-8 text-zinc-300 mb-3" />
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">No projects added yet</p>
                    <p className="text-xs text-zinc-500 mt-1">Add projects to showcase your work</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel — ATS Score & Preview */}
        <div className="space-y-6">
          {/* ATS Score */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">ATS Score</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                  <Sparkles className="h-3 w-3 mr-1" /> Re-analyze
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ATSScoreRing score={87} size={130} />
              <div className="mt-4 w-full space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Keywords</span>
                  <span className="font-medium text-emerald-600">92%</span>
                </div>
                <Progress value={92} indicatorClassName="bg-emerald-500" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Formatting</span>
                  <span className="font-medium text-blue-600">88%</span>
                </div>
                <Progress value={88} indicatorClassName="bg-blue-500" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Content</span>
                  <span className="font-medium text-amber-600">78%</span>
                </div>
                <Progress value={78} indicatorClassName="bg-amber-500" />
              </div>
            </CardContent>
          </Card>

          {/* Template Selection */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {['Modern', 'Classic', 'Minimal', 'Creative'].map((template) => (
                  <button
                    key={template}
                    className={`rounded-lg border-2 p-3 text-center text-xs font-medium transition-all ${
                      template === 'Modern'
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        : 'border-zinc-200 text-zinc-500 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-400'
                    }`}
                  >
                    <div className="mx-auto mb-2 h-12 w-9 rounded border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900" />
                    {template}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">AI Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <Wand2 className="mr-2 h-3 w-3" /> Rewrite with AI
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <Copy className="mr-2 h-3 w-3" /> Duplicate Resume
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                <Sparkles className="mr-2 h-3 w-3" /> Generate Cover Letter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
