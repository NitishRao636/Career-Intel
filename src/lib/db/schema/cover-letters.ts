import { pgTable, uuid, varchar, text, timestamp, boolean, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const coverLetters = pgTable('cover_letters', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  resumeId: uuid('resume_id'),
  jobApplicationId: uuid('job_application_id'),
  
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  tone: varchar('tone', { length: 20 }).default('professional'),
  
  companyName: varchar('company_name', { length: 255 }),
  hiringManager: varchar('hiring_manager', { length: 255 }),
  jobTitle: varchar('job_title', { length: 255 }),
  
  aiGenerated: boolean('ai_generated').default(false),
  version: integer('version').default(1).notNull(),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => ({
  userIdx: index('cover_letters_user_id_idx').on(table.userId),
}));

export type CoverLetter = typeof coverLetters.$inferSelect;
export type NewCoverLetter = typeof coverLetters.$inferInsert;
