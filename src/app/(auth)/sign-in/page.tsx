'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Sparkles, GitBranch, Globe } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-zinc-500">Sign in to your CareerIntel account</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <Globe className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" className="w-full">
              <GitBranch className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-500 dark:bg-zinc-950">or continue with email</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Password</Label>
              <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
            </div>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>

          <Button className="w-full" variant="gradient">Sign In</Button>

          <p className="text-center text-xs text-zinc-500">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:underline font-medium">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
