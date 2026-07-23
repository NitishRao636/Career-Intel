'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Users, Plus, Search, Building2, Mail, Phone,
  Calendar, MessageSquare, Star, Filter
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  status: 'cold' | 'warm' | 'hot' | 'champion';
  relationship: 'colleague' | 'manager' | 'mentor' | 'recruiter' | 'referral' | 'other';
  lastContactedAt: string;
  nextFollowUp: string;
  notes: string;
  isReferral: boolean;
}

const contacts: Contact[] = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@stripe.com', company: 'Stripe', title: 'Engineering Manager', status: 'hot', relationship: 'recruiter', lastContactedAt: '2 days ago', nextFollowUp: 'Tomorrow', notes: 'Referred by mutual contact', isReferral: true },
  { id: '2', name: 'Alex Rivera', email: 'alex@vercel.com', company: 'Vercel', title: 'Senior Engineer', status: 'warm', relationship: 'colleague', lastContactedAt: '1 week ago', nextFollowUp: 'Next Monday', notes: 'Former colleague, good rapport', isReferral: false },
  { id: '3', name: 'Maya Patel', email: 'maya@linear.app', company: 'Linear', title: 'Head of Talent', status: 'hot', relationship: 'recruiter', lastContactedAt: 'Yesterday', nextFollowUp: 'Today', notes: 'Active conversation about PM role', isReferral: false },
  { id: '4', name: 'Jordan Kim', email: 'jordan@notion.so', company: 'Notion', title: 'Staff Engineer', status: 'warm', relationship: 'mentor', lastContactedAt: '3 days ago', nextFollowUp: 'Jul 28', notes: 'Career mentor, monthly 1:1s', isReferral: false },
  { id: '5', name: 'Chris Taylor', email: 'chris@figma.com', company: 'Figma', title: 'Tech Lead', status: 'cold', relationship: 'other', lastContactedAt: '2 weeks ago', nextFollowUp: 'Aug 1', notes: 'Met at conference', isReferral: false },
  { id: '6', name: 'Sam Wilson', email: 'sam@github.com', company: 'GitHub', title: 'VP Engineering', status: 'champion', relationship: 'referral', lastContactedAt: '1 day ago', nextFollowUp: 'Jul 25', notes: 'Strong advocate for my application', isReferral: true },
];

const statusColors: Record<string, string> = {
  cold: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  warm: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  hot: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  champion: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
};

export default function NetworkingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Networking CRM
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your professional network and track interactions
          </p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="gradient">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Contact</DialogTitle>
              <DialogDescription>Add a new professional contact</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Full Name</Label><Input placeholder="Jane Smith" /></div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="jane@company.com" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Company</Label><Input placeholder="Company" /></div>
                <div className="space-y-2"><Label>Title</Label><Input placeholder="Job Title" /></div>
              </div>
              <div className="space-y-2"><Label>Notes</Label><Textarea placeholder="How do you know this person?" rows={3} /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setAddDialogOpen(false)}>Add Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card><CardContent className="pt-5"><p className="text-sm text-zinc-500">Total Contacts</p><p className="text-2xl font-bold">{contacts.length}</p></CardContent></Card>
        <Card><CardContent className="pt-5"><p className="text-sm text-zinc-500">Hot/Champion</p><p className="text-2xl font-bold text-red-600">{contacts.filter(c => c.status === 'hot' || c.status === 'champion').length}</p></CardContent></Card>
        <Card><CardContent className="pt-5"><p className="text-sm text-zinc-500">Referrals</p><p className="text-2xl font-bold text-emerald-600">{contacts.filter(c => c.isReferral).length}</p></CardContent></Card>
        <Card><CardContent className="pt-5"><p className="text-sm text-zinc-500">Follow-ups Due</p><p className="text-2xl font-bold text-amber-600">{contacts.filter(c => c.nextFollowUp === 'Today' || c.nextFollowUp === 'Tomorrow').length}</p></CardContent></Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search contacts..." className="pl-9" />
      </div>

      {/* Contacts List */}
      <div className="space-y-3">
        {filtered.map(contact => (
          <Card key={contact.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-violet-400 text-white text-xs">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{contact.name}</h3>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize ${statusColors[contact.status]}`}>
                        {contact.status}
                      </span>
                      {contact.isReferral && (
                        <Badge variant="success" className="text-[9px] px-1.5 py-0">Referral</Badge>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500">{contact.title} at {contact.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-zinc-500">Last contact</p>
                    <p className="text-xs font-medium">{contact.lastContactedAt}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500">Follow up</p>
                    <p className={`text-xs font-medium ${
                      contact.nextFollowUp === 'Today' || contact.nextFollowUp === 'Tomorrow'
                        ? 'text-amber-600'
                        : ''
                    }`}>{contact.nextFollowUp}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MessageSquare className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
