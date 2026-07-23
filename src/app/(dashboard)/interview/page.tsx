'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Mic, Video, MessageSquare, Star, Sparkles, Clock,
  BookOpen, Target, Brain, ChevronRight, Play, CheckCircle2
} from 'lucide-react';

interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tips: string[];
  sampleAnswer: string;
}

const behavioralQuestions: InterviewQuestion[] = [
  {
    id: '1',
    question: 'Tell me about a time you led a project with tight deadlines.',
    category: 'Leadership',
    difficulty: 'medium',
    tips: ['Use the STAR method', 'Quantify your impact', 'Focus on your leadership role'],
    sampleAnswer: 'At Stripe, I led the merchant dashboard redesign with a 6-week deadline. I broke the project into 2-week sprints, assigned clear ownership, and implemented daily standups. We delivered on time, improving user engagement by 35% and reducing support tickets by 20%.',
  },
  {
    id: '2',
    question: 'Describe a conflict you had with a teammate and how you resolved it.',
    category: 'Conflict Resolution',
    difficulty: 'medium',
    tips: ['Stay professional', 'Focus on the resolution', 'Show empathy'],
    sampleAnswer: 'A teammate and I disagreed on the architecture for a feature. I proposed we create a lightweight prototype for each approach and present both to the team with pros/cons. This data-driven approach led to a consensus and strengthened our working relationship.',
  },
  {
    id: '3',
    question: 'What is your greatest weakness?',
    category: 'Self-Awareness',
    difficulty: 'easy',
    tips: ['Be genuine', 'Show growth', 'Avoid clichés'],
    sampleAnswer: 'I used to struggle with delegation, wanting to handle everything myself. I\'ve since learned that effective delegation multiplies team output. I now use frameworks to identify tasks that others can own and invest time in clear documentation and mentoring.',
  },
];

const technicalQuestions: InterviewQuestion[] = [
  {
    id: '4',
    question: 'How would you design a real-time collaboration system like Google Docs?',
    category: 'System Design',
    difficulty: 'hard',
    tips: ['Discuss OT vs CRDT', 'Consider scalability', 'Address conflict resolution'],
    sampleAnswer: 'I would use Operational Transformation (OT) for consistency. The architecture would include: WebSocket connections for real-time sync, a central OT server to transform operations, and client-side buffers for optimistic updates. For scalability, I\'d shard by document and use presence servers for cursor tracking.',
  },
  {
    id: '5',
    question: 'Explain the virtual DOM and reconciliation in React.',
    category: 'Frontend',
    difficulty: 'medium',
    tips: ['Explain the diffing algorithm', 'Discuss fiber architecture', 'Mention performance implications'],
    sampleAnswer: 'The virtual DOM is a lightweight JS representation of the actual DOM. When state changes, React creates a new virtual DOM tree and diffs it against the previous one using a heuristic O(n) algorithm. It then batches and applies only the necessary changes to the real DOM. React Fiber enables incremental rendering and priority-based updates.',
  },
];

export default function InterviewPage() {
  const [activeTab, setActiveTab] = useState('prepare');
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSample, setShowSample] = useState(false);
  const [mockActive, setMockActive] = useState(false);
  const [currentMockQ, setCurrentMockQ] = useState(0);

  const mockQuestions = [...behavioralQuestions, ...technicalQuestions].slice(0, 5);

  const getDifficultyColor = (d: string) => {
    if (d === 'easy') return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950';
    if (d === 'medium') return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950';
    return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Interview Preparation
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Practice questions, mock interviews, and AI coaching
          </p>
        </div>
        <Button variant="gradient" onClick={() => { setMockActive(true); setActiveTab('mock'); }}>
          <Mic className="h-3.5 w-3.5 mr-1" /> Start Mock Interview
        </Button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-2.5 dark:bg-emerald-900">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">24</p>
                <p className="text-xs text-zinc-500">Questions Practiced</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-2.5 dark:bg-blue-900">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">78%</p>
                <p className="text-xs text-zinc-500">Readiness Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-violet-100 p-2.5 dark:bg-violet-900">
                <Video className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">5</p>
                <p className="text-xs text-zinc-500">Mock Interviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="prepare">
            <BookOpen className="h-3.5 w-3.5 mr-1" /> Question Bank
          </TabsTrigger>
          <TabsTrigger value="mock">
            <Mic className="h-3.5 w-3.5 mr-1" /> Mock Interview
          </TabsTrigger>
          <TabsTrigger value="resources">
            <Brain className="h-3.5 w-3.5 mr-1" /> AI Coach
          </TabsTrigger>
        </TabsList>

        {/* Question Bank */}
        <TabsContent value="prepare" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Question List */}
            <div className="lg:col-span-2 space-y-2">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Behavioral Questions</h3>
              {behavioralQuestions.map(q => (
                <button
                  key={q.id}
                  onClick={() => { setSelectedQuestion(q); setShowSample(false); setUserAnswer(''); }}
                  className={`w-full text-left rounded-lg border p-3 transition-all ${
                    selectedQuestion?.id === q.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 line-clamp-1">{q.question}</p>
                    <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="secondary" className="text-[10px]">{q.category}</Badge>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                  </div>
                </button>
              ))}

              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3 mt-6">Technical Questions</h3>
              {technicalQuestions.map(q => (
                <button
                  key={q.id}
                  onClick={() => { setSelectedQuestion(q); setShowSample(false); setUserAnswer(''); }}
                  className={`w-full text-left rounded-lg border p-3 transition-all ${
                    selectedQuestion?.id === q.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 line-clamp-1">{q.question}</p>
                    <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="secondary" className="text-[10px]">{q.category}</Badge>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Practice Area */}
            <div className="lg:col-span-3">
              {selectedQuestion ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{selectedQuestion.category}</Badge>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                        {selectedQuestion.difficulty}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{selectedQuestion.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Tips */}
                    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/50 p-3">
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">💡 Tips</p>
                      <ul className="space-y-1">
                        {selectedQuestion.tips.map((tip, i) => (
                          <li key={i} className="text-xs text-amber-600 dark:text-amber-300">• {tip}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Practice Answer */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Your Answer</p>
                        <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                          <Sparkles className="h-3 w-3 mr-1" /> AI Feedback
                        </Button>
                      </div>
                      <Textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your answer here... Use the STAR method for behavioral questions."
                        rows={6}
                      />
                    </div>

                    {/* Sample Answer */}
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSample(!showSample)}
                      >
                        {showSample ? 'Hide' : 'Show'} Sample Answer
                      </Button>
                      {showSample && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 p-4"
                        >
                          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Sample Answer</p>
                          <p className="text-sm text-emerald-600 dark:text-emerald-300">{selectedQuestion.sampleAnswer}</p>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-16 flex flex-col items-center text-center">
                    <BookOpen className="h-8 w-8 text-zinc-300 mb-3" />
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Select a question to practice</p>
                    <p className="text-xs text-zinc-500 mt-1">Choose from the question bank on the left</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Mock Interview */}
        <TabsContent value="mock" className="mt-4">
          {mockActive ? (
            <Card>
              <CardContent className="py-8">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                    <Mic className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      Question {currentMockQ + 1} of {mockQuestions.length}
                    </p>
                    <p className="text-zinc-500 text-sm mt-2">{mockQuestions[currentMockQ]?.question}</p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentMockQ(Math.max(0, currentMockQ - 1))}
                      disabled={currentMockQ === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() => {
                        if (currentMockQ < mockQuestions.length - 1) {
                          setCurrentMockQ(currentMockQ + 1);
                        } else {
                          setMockActive(false);
                          setCurrentMockQ(0);
                        }
                      }}
                    >
                      {currentMockQ === mockQuestions.length - 1 ? 'Finish Interview' : 'Next Question'}
                    </Button>
                  </div>
                  <Progress value={(currentMockQ / mockQuestions.length) * 100} className="max-w-md mx-auto" />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-16 flex flex-col items-center text-center">
                <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 p-6 dark:from-blue-900 dark:to-violet-900">
                  <Mic className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">AI Mock Interview</h3>
                <p className="mt-1 max-w-md text-sm text-zinc-500">
                  Practice with our AI interviewer. Get real-time feedback on your answers, tone, and delivery.
                </p>
                <Button variant="gradient" className="mt-4" onClick={() => setMockActive(true)}>
                  <Play className="h-4 w-4 mr-2" /> Start Interview
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* AI Coach */}
        <TabsContent value="resources" className="mt-4">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-violet-50 dark:border-blue-900 dark:from-blue-950/50 dark:to-violet-950/50">
            <CardContent className="py-8">
              <div className="max-w-lg mx-auto text-center space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  <Sparkles className="h-3 w-3" /> AI Career Coach
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Your personal interview coach
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Get personalized coaching based on your target companies, role level, and interview history.
                </p>
                <Textarea
                  placeholder="Ask me anything about interview preparation... e.g., 'How should I prepare for a Stripe technical interview?'"
                  rows={3}
                />
                <Button variant="gradient">
                  <Sparkles className="h-4 w-4 mr-2" /> Ask AI Coach
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
