import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const atsAnalyzeSchema = z.object({
  resumeText: z.string().min(50, 'Resume text is too short'),
  jobDescription: z.string().min(50, 'Job description is too short'),
});

// POST /api/ats — Analyze resume against job description
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = atsAnalyzeSchema.parse(body);

    // In production, this would call OpenAI API for deep analysis
    // For now, we do a keyword-matching analysis
    const resumeWords = new Set(validated.resumeText.toLowerCase().split(/\s+/));
    const jdWords = validated.jobDescription.toLowerCase().split(/\s+/);
    const jdKeywords = [...new Set(jdWords.filter(w => w.length > 4))];

    const foundKeywords = jdKeywords.filter(w => resumeWords.has(w));
    const missingKeywords = jdKeywords.filter(w => !resumeWords.has(w));

    const keywordScore = Math.round((foundKeywords.length / jdKeywords.length) * 100);
    const formatScore = 85; // Simulated
    const contentScore = 70; // Simulated
    const overallScore = Math.round(keywordScore * 0.4 + formatScore * 0.3 + contentScore * 0.3);

    const analysis = {
      overallScore,
      keywordScore,
      formatScore,
      contentScore,
      foundKeywords: foundKeywords.slice(0, 15),
      missingKeywords: missingKeywords.slice(0, 10),
      suggestions: [
        'Add missing keywords from the job description',
        'Quantify more achievements with specific metrics',
        'Include relevant technical skills mentioned in the JD',
        'Use standard section headings for ATS compatibility',
        'Ensure consistent date formatting throughout',
      ],
      strengths: [
        'Good use of action verbs',
        'Clean formatting structure',
        'Relevant technical skills listed',
      ],
      weaknesses: [
        'Missing key keywords from job description',
        'Some bullet points lack quantifiable results',
        'Could benefit from more industry-specific terminology',
      ],
    };

    return NextResponse.json({ analysis });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as z.ZodError).issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'ATS analysis failed' }, { status: 500 });
  }
}
