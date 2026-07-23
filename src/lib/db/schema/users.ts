import { pgTable, uuid, varchar, text, timestamp, boolean, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['user', 'recruiter', 'admin']);
export const subscriptionTierEnum = pgEnum('subscription_tier', ['free', 'pro', 'enterprise']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  passwordHash: text('password_hash'),
  image: text('image'),
  role: roleEnum('role').default('user').notNull(),
  subscriptionTier: subscriptionTierEnum('subscription_tier').default('free').notNull(),
  headline: varchar('headline', { length: 255 }),
  bio: text('bio'),
  phone: varchar('phone', { length: 20 }),
  location: varchar('location', { length: 255 }),
  linkedinUrl: varchar('linkedin_url', { length: 512 }),
  githubUrl: varchar('github_url', { length: 512 }),
  websiteUrl: varchar('website_url', { length: 512 }),
  emailVerified: boolean('email_verified').default(false),
  isActive: boolean('is_active').default(true).notNull(),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
