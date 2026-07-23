'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import {
  MessageSquare, Sparkles, Copy, Download, Wand2,
  Plus, FileText, ChevronRight, Clock
} from 'lucide-react';

const coverLetterTemplates = [
  {
    id: '1',
    name: 'Professional',
    description: 'Clean and formal cover letter for corporate roles',
    tone: 'professional',
  },
  {
    id: '2',
    name: 'Creative',
    description: 'Engaging and narrative-driven for startups and creative roles',
    tone: 'creative',
  },
  {
    id: '3',
    name: 'Technical',
    description: 'Focused on technical achievements for engineering roles',
    tone: 'technical',
  },
  {
    id: '4',
    name: 'Executive',
    description: 'Leadership-focused for senior and C-suite positions',
    tone: 'executive',
  },
];

const sampleCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Frontend Engineer position at Stripe. With over 6 years of experience building scalable web applications and a deep passion for payment technology, I believe I would be a valuable addition to your team.

In my current role at Stripe, I've led the redesign of the merchant dashboard, improving user engagement by 35% and reducing support tickets by 20%. I've architected a component library used by 40+ engineers across 8 product teams, reducing development time by 30%. These experiences have given me unique insight into building developer-friendly tools at scale.

Previously at Vercel, I contributed to the Next.js framework core, shipping 5 major features adopted by 500K+ developers. I also built and maintained the documentation site serving 2M+ monthly visitors, which taught me the importance of clear communication and user-centric design.

What excites me most about this opportunity is the chance to work on products that directly impact global commerce. I'm particularly drawn to Stripe's mission of increasing the GDP of the internet and would love to contribute to that vision.

I would welcome the opportunity to discuss how my experience and passion align with your team's goals. Thank you for your consideration.

Best regards,
John Doe`;

export default function CoverLetterPage() {
  const [activeTab, setActiveTab] = useState('write');
  const [content, setContent] = useState(sampleCoverLetter);
  const [generating, setGenerating] = useState(false);
  const [tone, setTone] = useState('professional');
  const [companyName, setCompanyName] = useState('Stripe');
  const [jobTitle, setJobTitle] = useState('Senior Frontend Engineer');

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Cover Letter Generator
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Create tailored cover letters with AI assistance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Copy className="h-3.5 w-3.5 mr-1" /> Copy
          </Button>
          <Button size="sm" variant="gradient">
            <Download className="h-3.5 w-3.5 mr-1" /> Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="write" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Input Panel */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Details</CardTitle>
                  <CardDescription>Provide context for your cover letter</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tone</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['professional', 'creative', 'technical', 'executive'].map(t => (
                        <button
                          key={t}
                          onClick={() => setTone(t)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                            tone === t
                              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                              : 'border-zinc-200 text-zinc-500 dark:border-zinc-800'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Additional Notes</Label>
                    <Textarea placeholder="Key points you want to highlight..." rows={3} />
                  </div>
                  <Button
                    className="w-full"
                    variant="gradient"
                    onClick={handleGenerate}
                    disabled={generating}
                  >
                    <Wand2 className="h-3.5 w-3.5 mr-1" />
                    {generating ? 'Generating...' : 'Generate with AI'}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">→</span>
                      Address the hiring manager by name when possible
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">→</span>
                      Reference specific projects or products of the company
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">→</span>
                      Quantify achievements with numbers and percentages
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">→</span>
                      Keep it under 400 words
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Editor */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Cover Letter</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">
                        {content.split(/\s+/).length} words
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                        <Sparkles className="h-3 w-3 mr-1" /> Improve
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={20}
                    className="text-sm leading-relaxed resize-none"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coverLetterTemplates.map(template => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow group">
                <CardContent className="p-4">
                  <div className="mb-3 h-32 rounded-lg border border-zinc-100 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="space-y-2">
                      <div className="h-2 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
                      <div className="h-1.5 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
                      <div className="h-1.5 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
                      <div className="h-1.5 w-3/4 rounded bg-zinc-100 dark:bg-zinc-800" />
                      <div className="h-1.5 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
                      <div className="h-1.5 w-5/6 rounded bg-zinc-100 dark:bg-zinc-800" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{template.name}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{template.description}</p>
                  <Button variant="outline" size="sm" className="w-full mt-3 text-xs">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardContent className="py-12 flex flex-col items-center text-center">
              <FileText className="h-8 w-8 text-zinc-300 mb-3" />
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">No cover letter history</p>
              <p className="text-xs text-zinc-500 mt-1">Your generated cover letters will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
