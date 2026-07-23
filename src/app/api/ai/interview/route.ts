import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const interviewQuerySchema = z.object({
  type: z.enum(['behavioral', 'technical', 'system_design', 'case']),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  role: z.string().optional(),
  company: z.string().optional(),
  count: z.number().int().min(1).max(10).default(5),
});

// POST /api/ai/interview — Generate interview questions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = interviewQuerySchema.parse(body);

    const questionsByType = {
      behavioral: [
        { question: 'Tell me about a time you had to make a difficult technical decision with incomplete information.', category: 'Decision Making', difficulty: 'hard' },
        { question: 'Describe a situation where you had to push back on a requirement from a stakeholder.', category: 'Communication', difficulty: 'medium' },
        { question: 'Give me an example of how you handled a production incident under pressure.', category: 'Problem Solving', difficulty: 'medium' },
        { question: 'Tell me about a time you mentored someone and saw them grow.', category: 'Leadership', difficulty: 'easy' },
        { question: 'Describe a project that didn\'t go as planned. What did you learn?', category: 'Self-Awareness', difficulty: 'medium' },
      ],
      technical: [
        { question: 'How would you implement a virtual scrolling component that handles 100K+ items efficiently?', category: 'Frontend', difficulty: 'hard' },
        { question: 'Explain the event loop in JavaScript and how async/await works under the hood.', category: 'JavaScript', difficulty: 'medium' },
        { question: 'How would you optimize the performance of a React application that\'s rendering slowly?', category: 'React', difficulty: 'medium' },
        { question: 'Design a state management solution for a complex form with 50+ fields and cross-field validations.', category: 'Architecture', difficulty: 'hard' },
        { question: 'What\'s the difference between SSR, SSG, and ISR? When would you use each?', category: 'Next.js', difficulty: 'easy' },
      ],
      system_design: [
        { question: 'Design a real-time collaborative document editor like Google Docs.', category: 'Collaboration', difficulty: 'hard' },
        { question: 'Design a URL shortener service that handles 100M+ URLs.', category: 'Scalability', difficulty: 'medium' },
        { question: 'Design a notification system that supports email, SMS, and push notifications.', category: 'Messaging', difficulty: 'medium' },
        { question: 'Design an analytics dashboard that processes 1M events per minute.', category: 'Data Pipeline', difficulty: 'hard' },
        { question: 'Design an A/B testing framework for a SaaS product.', category: 'Experimentation', difficulty: 'medium' },
      ],
      case: [
        { question: 'A SaaS company\'s user retention dropped 15% last quarter. How would you investigate and fix it?', category: 'Product Strategy', difficulty: 'medium' },
        { question: 'You\'re launching in a new market. How would you prioritize features?', category: 'Prioritization', difficulty: 'medium' },
        { question: 'How would you measure the success of a new onboarding flow?', category: 'Metrics', difficulty: 'easy' },
        { question: 'A competitor just launched a similar product at half the price. What do you do?', category: 'Competitive Strategy', difficulty: 'hard' },
        { question: 'How would you design a pricing model for a new B2B product?', category: 'Business Model', difficulty: 'hard' },
      ],
    };

    const questions = (questionsByType[validated.type] || questionsByType.behavioral)
      .slice(0, validated.count)
      .map((q, i) => ({ id: String(i + 1), ...q }));

    return NextResponse.json({
      questions,
      type: validated.type,
      company: validated.company,
      tips: [
        'Use the STAR method for behavioral questions',
        'Think out loud for technical questions',
        'Ask clarifying questions before diving in',
        'Consider edge cases and trade-offs',
      ],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as z.ZodError).issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 });
  }
}
