import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const coachQuerySchema = z.object({
  message: z.string().min(5, 'Please provide more detail'),
  context: z.enum(['interview', 'salary', 'career_change', 'skill_gap', 'resume', 'general']).default('general'),
  targetRole: z.string().optional(),
  currentRole: z.string().optional(),
});

// POST /api/ai/coach — AI Career Coach endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = coachQuerySchema.parse(body);

    // In production, this would call OpenAI/Claude API
    // For now, return structured mock response
    const responses: Record<string, string> = {
      interview: `Based on your target role as ${validated.targetRole || 'a senior engineer'}, here are my top recommendations:\n\n1. **Prepare system design fundamentals** — Focus on distributed systems, caching strategies, and data modeling\n2. **Practice behavioral questions** using the STAR method — Have 5-7 stories ready\n3. **Research the company's tech stack** — Align your experience with their tools\n4. **Mock interview practice** — I recommend at least 3 practice sessions before the real thing\n\nWould you like me to generate specific practice questions for your target company?`,
      salary: `Based on market data for ${validated.targetRole || 'your role'}:\n\n- **Base salary range**: $160K - $220K\n- **Total comp (with equity)**: $200K - $350K\n- **Median for your experience**: $185K\n\n**Negotiation tips:**\n1. Always negotiate — companies expect it\n2. Use competing offers as leverage\n3. Focus on total compensation, not just base\n4. Ask about equity refreshers and sign-on bonuses`,
      resume: `Here's my analysis of your resume optimization:\n\n1. **Quantify more achievements** — "Improved performance" → "Reduced load time by 40%, improving conversion by 15%"\n2. **Add missing keywords** — System Design, CI/CD, Cloud Architecture are in 80%+ of target job descriptions\n3. **Reorder sections** — Put your strongest, most relevant experience first\n4. **Strengthen the summary** — Make it specific to your target role, not generic\n\nWant me to rewrite specific sections?`,
      general: `I'd love to help with your career development! Here are some thoughts:\n\n1. **Set clear 6-month goals** — What specific outcome do you want?\n2. **Identify skill gaps** — Compare your current skills vs. your target role requirements\n3. **Build your network** — 80% of senior roles are filled through referrals\n4. **Track your progress** — Use the Career Roadmap feature to stay on track\n\nWhat specific area would you like to dive deeper into?`,
    };

    const response = responses[validated.context] || responses.general;

    return NextResponse.json({
      message: response,
      suggestions: [
        'Create a career roadmap',
        'Practice mock interviews',
        'Optimize your resume for ATS',
        'Research salary benchmarks',
      ],
      relatedActions: [
        { label: 'Start Mock Interview', href: '/interview' },
        { label: 'Analyze Resume ATS', href: '/ats' },
        { label: 'View Career Roadmap', href: '/roadmap' },
      ],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as z.ZodError).issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'AI coach request failed' }, { status: 500 });
  }
}
