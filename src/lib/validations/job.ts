import { z } from 'zod';

export const jobApplicationSchema = z.object({
  company: z.string().min(1, 'Company is required').max(255),
  jobTitle: z.string().min(1, 'Job title is required').max(255),
  jobUrl: z.string().url().optional().or(z.literal('')),
  jobDescription: z.string().optional(),
  status: z.enum(['saved', 'applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn', 'accepted']).default('saved'),
  source: z.enum(['linkedin', 'indeed', 'glassdoor', 'company_site', 'referral', 'other']).optional(),
  location: z.string().max(255).optional(),
  salaryMin: z.number().int().positive().optional(),
  salaryMax: z.number().int().positive().optional(),
  notes: z.string().optional(),
  contactPerson: z.string().max(255).optional(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  appliedAt: z.string().optional(),
});

export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
