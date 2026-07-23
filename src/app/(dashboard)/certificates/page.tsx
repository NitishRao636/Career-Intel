'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Award, Plus, Search, Calendar, ExternalLink,
  CheckCircle2, Shield, Sparkles
} from 'lucide-react';

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
  expiresAt: string | null;
  doesExpire: boolean;
  credentialId: string;
  credentialUrl: string;
  isVerified: boolean;
  skills: string[];
}

const certificates: Certificate[] = [
  { id: '1', name: 'AWS Solutions Architect - Associate', issuer: 'Amazon Web Services', issuedAt: '2024-03-15', expiresAt: '2027-03-15', doesExpire: true, credentialId: 'AWS-SAA-12345', credentialUrl: 'https://aws.amazon.com/certification', isVerified: true, skills: ['Cloud Architecture', 'AWS', 'DevOps'] },
  { id: '2', name: 'Google Professional Cloud Developer', issuer: 'Google Cloud', issuedAt: '2023-11-20', expiresAt: null, doesExpire: false, credentialId: 'GPCD-67890', credentialUrl: 'https://cloud.google.com/certification', isVerified: true, skills: ['GCP', 'Cloud Native', 'Kubernetes'] },
  { id: '3', name: 'Meta Frontend Developer Certificate', issuer: 'Meta (Coursera)', issuedAt: '2023-06-10', expiresAt: null, doesExpire: false, credentialId: 'META-FE-11111', credentialUrl: 'https://coursera.org', isVerified: false, skills: ['React', 'JavaScript', 'UI/UX'] },
  { id: '4', name: 'Certified ScrumMaster (CSM)', issuer: 'Scrum Alliance', issuedAt: '2024-01-05', expiresAt: '2026-01-05', doesExpire: true, credentialId: 'CSM-22222', credentialUrl: 'https://scrumalliance.org', isVerified: true, skills: ['Agile', 'Scrum', 'Project Management'] },
];

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const filtered = certificates.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.issuer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Certificates
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Manage and showcase your professional certifications
          </p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="gradient">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Certificate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Certificate</DialogTitle>
              <DialogDescription>Add a professional certification</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2"><Label>Certificate Name</Label><Input placeholder="e.g., AWS Solutions Architect" /></div>
              <div className="space-y-2"><Label>Issuing Organization</Label><Input placeholder="e.g., Amazon Web Services" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Issue Date</Label><Input type="date" /></div>
                <div className="space-y-2"><Label>Expiration Date</Label><Input type="date" /></div>
              </div>
              <div className="space-y-2"><Label>Credential ID</Label><Input placeholder="Credential ID" /></div>
              <div className="space-y-2"><Label>Credential URL</Label><Input placeholder="https://..." /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setAddDialogOpen(false)}>Add Certificate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card><CardContent className="pt-5"><p className="text-sm text-zinc-500">Total Certificates</p><p className="text-2xl font-bold">{certificates.length}</p></CardContent></Card>
        <Card><CardContent className="pt-5"><p className="text-sm text-zinc-500">Verified</p><p className="text-2xl font-bold text-emerald-600">{certificates.filter(c => c.isVerified).length}</p></CardContent></Card>
        <Card><CardContent className="pt-5"><p className="text-sm text-zinc-500">Expiring Soon</p><p className="text-2xl font-bold text-amber-600">0</p></CardContent></Card>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search certificates..." className="pl-9" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map(cert => (
          <Card key={cert.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-blue-100 to-violet-100 p-2.5 dark:from-blue-900 dark:to-violet-900">
                    <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{cert.name}</h3>
                    <p className="text-xs text-zinc-500">{cert.issuer}</p>
                  </div>
                </div>
                {cert.isVerified && (
                  <div className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-[10px] font-medium">Verified</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Issued {cert.issuedAt}
                </span>
                {cert.doesExpire && (
                  <span>Expires {cert.expiresAt}</span>
                )}
                {!cert.doesExpire && (
                  <Badge variant="success" className="text-[9px] px-1.5 py-0">No Expiry</Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {cert.skills.map(skill => (
                  <Badge key={skill} variant="outline" className="text-[10px]">{skill}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" /> View Credential
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                  <Sparkles className="h-3 w-3 mr-1" /> Add to Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
