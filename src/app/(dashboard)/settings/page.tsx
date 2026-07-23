'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  User, Lock, Bell, CreditCard, Shield, Globe,
  Trash2, Camera, Key
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Settings</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile"><User className="h-3.5 w-3.5 mr-1" /> Profile</TabsTrigger>
          <TabsTrigger value="security"><Lock className="h-3.5 w-3.5 mr-1" /> Security</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-3.5 w-3.5 mr-1" /> Notifications</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="h-3.5 w-3.5 mr-1" /> Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-violet-400 text-white text-lg">JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm"><Camera className="h-3.5 w-3.5 mr-1" /> Change Avatar</Button>
                  <p className="text-xs text-zinc-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>First Name</Label><Input defaultValue="John" /></div>
                <div className="space-y-2"><Label>Last Name</Label><Input defaultValue="Doe" /></div>
              </div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue="john@example.com" type="email" /></div>
              <div className="space-y-2"><Label>Headline</Label><Input defaultValue="Senior Frontend Engineer" /></div>
              <div className="space-y-2"><Label>Location</Label><Input defaultValue="San Francisco, CA" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>LinkedIn</Label><Input defaultValue="linkedin.com/in/johndoe" /></div>
                <div className="space-y-2"><Label>Website</Label><Input defaultValue="johndoe.dev" /></div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Password</CardTitle>
              <CardDescription>Change your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" /></div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2"><Key className="h-4 w-4" /> Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security</CardDescription>
                </div>
                <Badge variant="success">Enabled</Badge>
              </div>
            </CardHeader>
          </Card>
          <Card className="border-red-200 dark:border-red-900">
            <CardHeader>
              <CardTitle className="text-base text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-500 mb-3">Once you delete your account, there is no going back.</p>
              <Button variant="destructive" size="sm"><Trash2 className="h-3.5 w-3.5 mr-1" /> Delete Account</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Interview Reminders', desc: 'Get notified before upcoming interviews', enabled: true },
                { label: 'Application Updates', desc: 'Track changes to your job applications', enabled: true },
                { label: 'Follow-up Reminders', desc: 'Reminders to follow up on applications', enabled: true },
                { label: 'ATS Score Changes', desc: 'Notify when ATS scores are updated', enabled: false },
                { label: 'Weekly Digest', desc: 'Weekly summary of your career progress', enabled: true },
                { label: 'Product Updates', desc: 'New features and improvements', enabled: false },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.label}</p>
                    <p className="text-xs text-zinc-500">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked={item.enabled} className="peer sr-only" />
                    <div className="h-5 w-9 rounded-full bg-zinc-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full dark:bg-zinc-700" />
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-4 space-y-6">
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-violet-50 dark:border-blue-900 dark:from-blue-950/50 dark:to-violet-950/50">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="default" className="mb-2">PRO</Badge>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">$19/month</p>
                  <p className="text-xs text-zinc-500 mt-1">Billed monthly · Renews Aug 15, 2024</p>
                </div>
                <Button variant="outline">Manage Subscription</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Usage This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: 'Resumes Created', used: 3, limit: 10 },
                  { label: 'ATS Analyses', used: 8, limit: 25 },
                  { label: 'AI Requests', used: 45, limit: 100 },
                  { label: 'Cover Letters', used: 5, limit: 15 },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-600 dark:text-zinc-400">{item.label}</span>
                      <span className="text-zinc-500">{item.used}/{item.limit}</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: `${(item.used / item.limit) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
