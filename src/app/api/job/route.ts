import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const jobCreateSchema = z.object({
  company: z.string().min(1).max(255),
  jobTitle: z.string().min(1).max(255),
  jobUrl: z.string().url().optional().or(z.literal('')),
  jobDescription: z.string().optional(),
  status: z.enum(['saved', 'applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn', 'accepted']).default('saved'),
  source: z.enum(['linkedin', 'indeed', 'glassdoor', 'company_site', 'referral', 'other']).optional(),
  location: z.string().max(255).optional(),
  salaryMin: z.number().int().positive().optional(),
  salaryMax: z.number().int().positive().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

// GET /api/job — List all job applications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Mock response — in production, query from database with filters
    const applications = [
      { id: '1', company: 'Stripe', jobTitle: 'Senior Frontend Engineer', status: 'interview', location: 'San Francisco, CA', matchScore: 92, appliedAt: '2024-07-22' },
      { id: '2', company: 'Vercel', jobTitle: 'Staff Software Engineer', status: 'applied', location: 'Remote', matchScore: 88, appliedAt: '2024-07-20' },
      { id: '3', company: 'Linear', jobTitle: 'Product Engineer', status: 'screening', location: 'San Francisco, CA', matchScore: 75, appliedAt: '2024-07-18' },
    ];

    return NextResponse.json({ applications });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

// POST /api/job — Create a job application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = jobCreateSchema.parse(body);

    const application = {
      id: crypto.randomUUID(),
      ...validated,
      matchScore: Math.floor(Math.random() * 30) + 60,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as z.ZodError).issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 });
  }
}
