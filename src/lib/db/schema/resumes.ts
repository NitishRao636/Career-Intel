import { pgTable, uuid, varchar, text, timestamp, boolean, integer, jsonb, pgEnum, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const resumeStatusEnum = pgEnum('resume_status', ['draft', 'complete', 'archived']);
export const templateEnum = pgEnum('template', ['modern', 'classic', 'minimal', 'creative', 'executive', 'tech']);

export const resumes = pgTable('resumes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  status: resumeStatusEnum('status').default('draft').notNull(),
  template: templateEnum('template').default('modern').notNull(),
  
  // Structured resume data
  personalInfo: jsonb('personal_info').$type<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    headline: string;
    summary: string;
  }>(),
  
  experience: jsonb('experience').$type<Array<{
    id: string;
    company: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    description: string;
    bulletPoints: string[];
  }>>().notNull().default([]),
  
  education: jsonb('education').$type<Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
    honors: string[];
  }>>().notNull().default([]),
  
  skills: jsonb('skills').$type<Array<{
    id: string;
    category: string;
    items: string[];
  }>>().notNull().default([]),
  
  projects: jsonb('projects').$type<Array<{
    id: string;
    name: string;
    description: string;
    url: string;
    technologies: string[];
    startDate: string;
    endDate: string;
  }>>().notNull().default([]),
  
  certifications: jsonb('certifications').$type<Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate: string;
    credentialId: string;
    url: string;
  }>>().notNull().default([]),
  
  languages: jsonb('languages').$type<Array<{
    id: string;
    language: string;
    proficiency: string;
  }>>().notNull().default([]),
  
  // ATS and scoring
  atsScore: integer('ats_score'),
  atsAnalysis: jsonb('ats_analysis').$type<{
    score: number;
    keywords: { found: string[]; missing: string[] };
    suggestions: string[];
    formatting: { score: number; issues: string[] };
    content: { score: number; issues: string[] };
  }>(),
  
  // Meta
  version: integer('version').default(1).notNull(),
  isPrimary: boolean('is_primary').default(false).notNull(),
  colorTheme: varchar('color_theme', { length: 20 }).default('#2563eb'),
  fontSize: integer('font_size').default(11),
  fontFamily: varchar('font_family', { length: 50 }).default('Inter'),
  spacing: varchar('spacing', { length: 10 }).default('normal'),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => ({
  userIdx: index('resumes_user_id_idx').on(table.userId),
  slugIdx: index('resumes_slug_idx').on(table.slug),
  statusIdx: index('resumes_status_idx').on(table.status),
}));

export type Resume = typeof resumes.$inferSelect;
export type NewResume = typeof resumes.$inferInsert;
