import { pgTable, uuid, varchar, text, timestamp, boolean, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const portfolios = pgTable('portfolios', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  isPublic: boolean('is_public').default(true).notNull(),
  
  theme: varchar('theme', { length: 50 }).default('modern'),
  
  projects: jsonb('projects').$type<Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    url: string;
    githubUrl: string;
    technologies: string[];
    featured: boolean;
    order: number;
  }>>().notNull().default([]),
  
  // Portfolio Intelligence Score
  intelligenceScore: jsonb('intelligence_score').$type<{
    overall: number;
    completeness: number;
    presentation: number;
    impact: number;
    suggestions: string[];
  }>(),
  
  views: integer('views').default(0),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => ({
  userIdx: index('portfolios_user_id_idx').on(table.userId),
  slugIdx: index('portfolios_slug_idx').on(table.slug),
}));

export type Portfolio = typeof portfolios.$inferSelect;
export type NewPortfolio = typeof portfolios.$inferInsert;
