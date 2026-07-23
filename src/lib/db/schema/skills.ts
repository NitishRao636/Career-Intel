import { pgTable, uuid, varchar, text, timestamp, integer, jsonb, pgEnum, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const skillCategoryEnum = pgEnum('skill_category', [
  'technical', 'soft', 'language', 'tool', 'framework', 'methodology', 'domain', 'other'
]);
export const proficiencyEnum = pgEnum('proficiency', ['beginner', 'intermediate', 'advanced', 'expert']);

export const skills = pgTable('skills', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  name: varchar('name', { length: 255 }).notNull(),
  category: skillCategoryEnum('category').default('technical').notNull(),
  proficiency: proficiencyEnum('proficiency').default('intermediate').notNull(),
  
  yearsOfExperience: integer('years_of_experience'),
  lastUsedAt: timestamp('last_used_at', { withTimezone: true }),
  
  description: text('description'),
  endorsements: integer('endorsements').default(0),
  
  // Market data
  marketDemand: jsonb('market_demand').$type<{
    trend: 'rising' | 'stable' | 'declining';
    demandScore: number;
    avgSalary: number;
    jobCount: number;
  }>(),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => ({
  userIdx: index('skills_user_id_idx').on(table.userId),
  categoryIdx: index('skills_category_idx').on(table.category),
  nameIdx: index('skills_name_idx').on(table.name),
}));

export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
