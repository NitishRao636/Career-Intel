import { pgTable, uuid, varchar, text, timestamp, integer, jsonb, pgEnum, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const interviewStatusEnum = pgEnum('interview_status', ['scheduled', 'completed', 'cancelled', 'rescheduled']);
export const interviewTypeEnum = pgEnum('interview_type', ['phone', 'video', 'onsite', 'technical', 'behavioral', 'panel', 'case']);

export const interviews = pgTable('interviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  jobApplicationId: uuid('job_application_id'),
  
  title: varchar('title', { length: 255 }).notNull(),
  type: interviewTypeEnum('type').default('video').notNull(),
  status: interviewStatusEnum('status').default('scheduled').notNull(),
  
  scheduledAt: timestamp('scheduled_at', { withTimezone: true }),
  duration: integer('duration'), // minutes
  location: varchar('location', { length: 512 }),
  meetingLink: varchar('meeting_link', { length: 1024 }),
  
  interviewerName: varchar('interviewer_name', { length: 255 }),
  interviewerRole: varchar('interviewer_role', { length: 255 }),
  interviewerEmail: varchar('interviewer_email', { length: 255 }),
  
  notes: text('notes'),
  preparationNotes: text('preparation_notes'),
  feedback: text('feedback'),
  rating: integer('rating'), // 1-5
  
  // AI mock interview data
  mockInterviewData: jsonb('mock_interview_data').$type<{
    questions: Array<{ question: string; category: string; difficulty: string }>;
    answers: Array<{ questionIndex: number; answer: string; score: number; feedback: string }>;
    overallScore: number;
  }>(),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => ({
  userIdx: index('interviews_user_id_idx').on(table.userId),
  scheduledAtIdx: index('interviews_scheduled_at_idx').on(table.scheduledAt),
}));

export type Interview = typeof interviews.$inferSelect;
export type NewInterview = typeof interviews.$inferInsert;
