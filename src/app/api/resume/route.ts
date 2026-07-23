import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const resumeCreateSchema = z.object({
  title: z.string().min(1).max(255),
  template: z.enum(['modern', 'classic', 'minimal', 'creative', 'executive', 'tech']).default('modern'),
});

// GET /api/resume — List all resumes for the user
export async function GET(request: NextRequest) {
  try {
    // In production, get userId from auth session
    const userId = request.headers.get('x-user-id') || 'demo-user';

    // Mock response — in production, query from database
    const resumes = [
      {
        id: '1',
        title: 'Senior Frontend Resume',
        template: 'modern',
        status: 'complete',
        atsScore: 87,
        isPrimary: true,
        updatedAt: '2024-07-20T10:00:00Z',
      },
      {
        id: '2',
        title: 'Staff Engineer Resume',
        template: 'executive',
        status: 'draft',
        atsScore: 72,
        isPrimary: false,
        updatedAt: '2024-07-18T15:00:00Z',
      },
      {
        id: '3',
        title: 'Full Stack Resume',
        template: 'modern',
        status: 'complete',
        atsScore: 78,
        isPrimary: false,
        updatedAt: '2024-07-10T12:00:00Z',
      },
    ];

    return NextResponse.json({ resumes });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 });
  }
}

// POST /api/resume — Create a new resume
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = resumeCreateSchema.parse(body);

    // In production, insert into database
    const resume = {
      id: crypto.randomUUID(),
      ...validated,
      status: 'draft',
      atsScore: null,
      isPrimary: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ resume }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as z.ZodError).issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create resume' }, { status: 500 });
  }
}
