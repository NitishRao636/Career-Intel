import { pgTable, uuid, varchar, text, timestamp, boolean, jsonb, pgEnum, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const notificationTypeEnum = pgEnum('notification_type', [
  'interview_reminder', 'application_update', 'follow_up', 'ats_score', 'system', 'achievement',
  'subscription', 'roadmap_milestone', 'skill_suggestion', 'job_match'
]);

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  type: notificationTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  
  read: boolean('read').default(false).notNull(),
  actionUrl: varchar('action_url', { length: 1024 }),
  
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  userIdx: index('notifications_user_id_idx').on(table.userId),
  readIdx: index('notifications_read_idx').on(table.read),
}));

export type Notification = typeof notifications.$inferSelect;
