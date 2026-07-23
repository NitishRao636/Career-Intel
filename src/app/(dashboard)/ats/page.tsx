'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ATSScoreRing } from '@/components/shared/ats-score-ring';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Target, Upload, FileText, Sparkles, CheckCircle2, XCircle,
  AlertTriangle, Lightbulb, ArrowRight, BarChart3, TrendingUp
} from 'lucide-react';

interface ATSAnalysisResult {
  overallScore: number;
  keywordScore: number;
  formatScore: number;
  contentScore: number;
  foundKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
}

const mockAnalysis: ATSAnalysisResult = {
  overallScore: 72,
  keywordScore: 65,
  formatScore: 85,
  contentScore: 70,
  foundKeywords: ['React', 'TypeScript', 'JavaScript', 'Frontend', 'REST APIs', 'Git', 'Agile', 'CSS', 'HTML', 'Component Design'],
  missingKeywords: ['CI/CD', 'Testing', 'Performance Optimization', 'Accessibility', 'System Design', 'Microservices', 'Cloud', 'DevOps'],
  suggestions: [
    'Add CI/CD pipeline experience to match the job requirements',
    'Include specific testing frameworks (Jest, Cypress, React Testing Library)',
    'Mention performance optimization achievements with measurable metrics',
    'Add accessibility (a11y) experience and WCAG compliance knowledge',
    'Include system design experience for senior-level positions',
    'Quantify more achievements with specific numbers and percentages',
    'Add cloud platform experience (AWS, GCP, or Azure)',
  ],
  strengths: [
    'Strong technical skills section with relevant technologies',
    'Good use of action verbs in experience descriptions',
    'Clean formatting that ATS systems can parse easily',
    'Professional summary clearly states career level and focus',
  ],
  weaknesses: [
    'Missing several key keywords from the job description',
    'Some bullet points lack quantifiable achievements',
    'No mention of testing or quality assurance practices',
    'Cloud and DevOps experience not highlighted',
  ],
};

export default function ATSAnalyzerPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAnalysis(mockAnalysis);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            ATS Analyzer
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Optimize your resume for Applicant Tracking Systems
          </p>
        </div>
      </div>

      {!analysis ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Job Description Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  Job Description
                </CardTitle>
                <CardDescription>Paste the job description you want to optimize for</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  rows={12}
                  className="text-sm"
                />
              </CardContent>
            </Card>

            {/* Resume Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Upload className="h-4 w-4 text-violet-600" />
                  Your Resume
                </CardTitle>
                <CardDescription>Paste your resume content or upload a file</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume content here..."
                  rows={12}
                  className="text-sm"
                />
                <div className="flex items-center gap-3">
                  <div className="flex-1 border border-dashed border-zinc-300 rounded-lg p-4 text-center dark:border-zinc-700">
                    <Upload className="h-6 w-6 mx-auto text-zinc-400" />
                    <p className="text-xs text-zinc-500 mt-1">Drop PDF or DOCX</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              size="lg"
              variant="gradient"
              onClick={handleAnalyze}
              disabled={analyzing}
              className="px-12"
            >
              {analyzing ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Analyze Resume
                </>
              )}
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Score Overview */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <Card className="lg:col-span-1 flex items-center justify-center">
              <CardContent className="py-6">
                <ATSScoreRing score={analysis.overallScore} size={160} />
              </CardContent>
            </Card>
            <div className="lg:col-span-3 grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-5">
                  <p className="text-sm text-zinc-500 mb-1">Keyword Match</p>
                  <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{analysis.keywordScore}%</p>
                  <Progress value={analysis.keywordScore} className="mt-2" indicatorClassName="bg-amber-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-5">
                  <p className="text-sm text-zinc-500 mb-1">Format Score</p>
                  <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{analysis.formatScore}%</p>
                  <Progress value={analysis.formatScore} className="mt-2" indicatorClassName="bg-emerald-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-5">
                  <p className="text-sm text-zinc-500 mb-1">Content Quality</p>
                  <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{analysis.contentScore}%</p>
                  <Progress value={analysis.contentScore} className="mt-2" indicatorClassName="bg-blue-500" />
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="keywords">
            <TabsList>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="strengths">Strengths & Weaknesses</TabsTrigger>
            </TabsList>

            <TabsContent value="keywords" className="mt-4">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Found Keywords ({analysis.foundKeywords.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis.foundKeywords.map(keyword => (
                        <Badge key={keyword} variant="success" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      Missing Keywords ({analysis.missingKeywords.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missingKeywords.map(keyword => (
                        <Badge key={keyword} variant="destructive" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Optimization Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.suggestions.map((suggestion, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                          {i + 1}
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strengths" className="mt-4">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-4 w-4" />
                      Areas to Improve
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                          <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setAnalysis(null)}>
              Analyze Another Resume
            </Button>
            <Button variant="gradient">
              <Sparkles className="h-4 w-4 mr-2" />
              Auto-Optimize with AI
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
