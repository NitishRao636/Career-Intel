'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Reset password</h1>
        <p className="mt-1 text-sm text-zinc-500">Enter your email and we&apos;ll send you a reset link</p>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="john@example.com" />
          </div>
          <Button className="w-full" variant="gradient">Send Reset Link</Button>
          <p className="text-center text-xs text-zinc-500">
            <Link href="/sign-in" className="text-blue-600 hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Back to sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
