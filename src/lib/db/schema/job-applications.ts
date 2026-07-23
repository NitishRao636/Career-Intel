import { pgTable, uuid, varchar, text, timestamp, integer, jsonb, pgEnum, index } from 'drizzle-orm/pg-core';
import { users } from './users';
import { resumes } from './resumes';

export const applicationStatusEnum = pgEnum('application_status', [
  'saved', 'applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn', 'accepted'
]);
export const jobSourceEnum = pgEnum('job_source', [
  'linkedin', 'indeed', 'glassdoor', 'company_site', 'referral', 'other'
]);

export const jobApplications = pgTable('job_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  resumeId: uuid('resume_id').references(() => resumes.id, { onDelete: 'set null' }),
  
  company: varchar('company', { length: 255 }).notNull(),
  companyId: uuid('company_id'),
  jobTitle: varchar('job_title', { length: 255 }).notNull(),
  jobUrl: varchar('job_url', { length: 1024 }),
  jobDescription: text('job_description'),
  
  status: applicationStatusEnum('status').default('saved').notNull(),
  source: jobSourceEnum('source'),
  
  location: varchar('location', { length: 255 }),
  salaryMin: integer('salary_min'),
  salaryMax: integer('salary_max'),
  salaryCurrency: varchar('salary_currency', { length: 3 }).default('USD'),
  jobType: varchar('job_type', { length: 50 }),
  remote: varchar('remote', { length: 20 }),
  
  contactPerson: varchar('contact_person', { length: 255 }),
  contactEmail: varchar('contact_email', { length: 255 }),
  
  notes: text('notes'),
  tags: jsonb('tags').$type<string[]>().default([]),
  
  // Kanban + timeline
  position: integer('position').default(0),
  appliedAt: timestamp('applied_at', { withTimezone: true }),
  deadlineAt: timestamp('deadline_at', { withTimezone: true }),
  followUpAt: timestamp('follow_up_at', { withTimezone: true }),
  
  // Interview tracking
  interviewDate: timestamp('interview_date', { withTimezone: true }),
  interviewNotes: text('interview_notes'),
  interviewType: varchar('interview_type', { length: 50 }),
  
  // AI analysis
  matchScore: integer('match_score'),
  aiInsights: jsonb('ai_insights').$type<{
    matchScore: number;
    keySkills: string[];
    missingSkills: string[];
    suggestions: string[];
  }>(),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => ({
  userIdx: index('job_applications_user_id_idx').on(table.userId),
  statusIdx: index('job_applications_status_idx').on(table.status),
  companyIdx: index('job_applications_company_idx').on(table.company),
  appliedAtIdx: index('job_applications_applied_at_idx').on(table.appliedAt),
}));

export type JobApplication = typeof jobApplications.$inferSelect;
export type NewJobApplication = typeof jobApplications.$inferInsert;
