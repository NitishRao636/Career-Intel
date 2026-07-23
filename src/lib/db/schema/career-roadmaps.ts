import { pgTable, uuid, varchar, text, timestamp, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const careerRoadmaps = pgTable('career_roadmaps', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  title: varchar('title', { length: 255 }).notNull(),
  currentRole: varchar('current_role', { length: 255 }),
  targetRole: varchar('target_role', { length: 255 }),
  targetIndustry: varchar('target_industry', { length: 255 }),
  timeline: varchar('timeline', { length: 50 }),
  
  milestones: jsonb('milestones').$type<Array<{
    id: string;
    title: string;
    description: string;
    targetDate: string;
    completed: boolean;
    completedAt: string | null;
    tasks: Array<{
      id: string;
      title: string;
      completed: boolean;
    }>;
    skills: string[];
    resources: Array<{
      title: string;
      url: string;
      type: 'course' | 'book' | 'article' | 'video' | 'project';
    }>;
  }>>().notNull().default([]),
  
  // AI-generated insights
  aiInsights: jsonb('ai_insights').$type<{
    readinessScore: number;
    skillsGap: string[];
    recommendations: string[];
    salaryProjection: { current: number; target: number; growth: number };
    industryTrends: string[];
  }>(),
  
  progress: integer('progress').default(0),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => ({
  userIdx: index('career_roadmaps_user_id_idx').on(table.userId),
}));

export type CareerRoadmap = typeof careerRoadmaps.$inferSelect;
export type NewCareerRoadmap = typeof careerRoadmaps.$inferInsert;
