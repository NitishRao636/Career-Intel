import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const resumeWriterSchema = z.object({
  section: z.enum(['summary', 'experience', 'skills', 'education', 'full']),
  context: z.string().min(10, 'Please provide more context'),
  tone: z.enum(['professional', 'creative', 'technical', 'executive']).default('professional'),
  targetRole: z.string().optional(),
  currentContent: z.string().optional(),
});

// POST /api/ai/resume-writer — AI Resume Writer endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = resumeWriterSchema.parse(body);

    // In production, call OpenAI/Claude API
    const generatedContent: Record<string, string> = {
      summary: `Results-driven Senior Frontend Engineer with 6+ years of experience architecting and delivering scalable web applications at high-growth technology companies. Proven track record of leading cross-functional teams to ship products that improve user engagement by 35%+ and reduce operational costs. Expert in React, TypeScript, and modern web architecture with deep expertise in building design systems and developer tools adopted by hundreds of engineers.`,
      experience: `• Led the redesign of the merchant analytics dashboard serving 100K+ businesses, improving user engagement by 35% and reducing time-to-insight by 60%\n• Architected a shared component library adopted by 40+ engineers across 8 product teams, reducing feature development time by 30% and ensuring visual consistency\n• Designed and implemented real-time data visualization features using WebSocket connections and D3.js, handling 10K+ concurrent users with 99.9% uptime\n• Mentored 4 junior engineers through structured 1:1s and code reviews, resulting in 2 promotions within 18 months`,
    };

    return NextResponse.json({
      content: generatedContent[validated.section] || generatedContent.summary,
      section: validated.section,
      tone: validated.tone,
      wordCount: (generatedContent[validated.section] || generatedContent.summary).split(/\s+/).length,
      suggestions: [
        'Add specific metrics and numbers to quantify impact',
        'Use strong action verbs (Led, Architected, Delivered)',
        'Tailor keywords to match the target job description',
      ],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as z.ZodError).issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'AI resume generation failed' }, { status: 500 });
  }
}
