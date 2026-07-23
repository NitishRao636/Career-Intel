'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles, ArrowRight, FileText, Target, Briefcase,
  MessageSquare, Users, BarChart3, Map, Award, Zap,
  CheckCircle2, Star, Shield, Globe
} from 'lucide-react';

const features = [
  { icon: FileText, title: 'AI Resume Builder', desc: 'Create ATS-optimized resumes with AI assistance, multiple templates, and real-time scoring.' },
  { icon: Target, title: 'ATS Analyzer', desc: 'Analyze your resume against job descriptions and get keyword matching, formatting, and content scores.' },
  { icon: Briefcase, title: 'Job Tracker', desc: 'Kanban-style application tracker with pipeline management, follow-ups, and AI match scoring.' },
  { icon: MessageSquare, title: 'Cover Letter AI', desc: 'Generate tailored cover letters in seconds. Choose your tone, company, and role.' },
  { icon: Users, title: 'Interview Prep', desc: 'Practice with AI mock interviews, behavioral & technical question banks, and real-time feedback.' },
  { icon: Globe, title: 'Portfolio Builder', desc: 'Create a stunning developer portfolio with AI-powered intelligence scoring.' },
  { icon: Users, title: 'Networking CRM', desc: 'Track professional contacts, interactions, follow-ups, and referral status.' },
  { icon: Map, title: 'Career Roadmap', desc: 'Visualize your career path with milestones, skill gaps, salary projections, and AI coaching.' },
  { icon: Award, title: 'Certificate Manager', desc: 'Organize certifications, track expirations, and showcase verified credentials.' },
  { icon: BarChart3, title: 'Skill Intelligence', desc: 'Track skills with market demand data, proficiency levels, and salary benchmarks.' },
];

const stats = [
  { value: '50K+', label: 'Resumes Created' },
  { value: '92%', label: 'ATS Pass Rate' },
  { value: '10K+', label: 'Jobs Tracked' },
  { value: '4.9★', label: 'User Rating' },
];

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">CareerIntel</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <a href="#features" className="hover:text-zinc-900 dark:hover:text-zinc-50">Features</a>
            <a href="#pricing" className="hover:text-zinc-900 dark:hover:text-zinc-50">Pricing</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">Blog</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in"><Button variant="ghost" size="sm">Sign In</Button></Link>
            <Link href="/sign-up"><Button size="sm" variant="gradient">Get Started Free</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" /> AI-Powered Career Intelligence
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl">
            Your Career,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Supercharged by AI
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
            Build resumes that pass ATS, track applications, prepare for interviews, and accelerate your career growth — all in one AI-powered platform.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" variant="gradient" className="px-8">
                Start Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
          <p className="mt-4 text-xs text-zinc-400">No credit card required · Free forever plan</p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-4 gap-8">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Everything you need for career success</h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400">One platform. Every tool. AI-powered.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(feature => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-blue-100 p-2.5 dark:bg-blue-900">
                    <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{feature.title}</h3>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Simple, transparent pricing</h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400">Start free, upgrade when you need more</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { name: 'Free', price: '$0', period: '/month', features: ['1 Resume', '3 ATS Analyses/month', 'Basic Job Tracker', 'Cover Letter Templates', 'Community Support'], cta: 'Get Started' },
              { name: 'Pro', price: '$19', period: '/month', features: ['10 Resumes', 'Unlimited ATS Analyses', 'AI Resume Writer', 'Mock Interviews', 'Networking CRM', 'Priority Support'], cta: 'Start Pro Trial', popular: true },
              { name: 'Enterprise', price: '$49', period: '/month', features: ['Unlimited Everything', 'Team Features', 'API Access', 'Custom Templates', 'Dedicated Support', 'SSO & RBAC'], cta: 'Contact Sales' },
            ].map(plan => (
              <Card key={plan.name} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg' : ''}`}>
                {plan.popular && <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2">Most Popular</Badge>}
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-zinc-500">{plan.period}</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.popular ? 'gradient' : 'outline'}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 px-4 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold">CareerIntel</span>
          </div>
          <p className="text-xs text-zinc-500">© 2024 CareerIntel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
