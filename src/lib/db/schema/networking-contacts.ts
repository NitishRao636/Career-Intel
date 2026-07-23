import { pgTable, uuid, varchar, text, timestamp, boolean, jsonb, pgEnum, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const contactStatusEnum = pgEnum('contact_status', ['cold', 'warm', 'hot', 'champion']);
export const relationshipEnum = pgEnum('relationship', [
  'colleague', 'manager', 'mentor', 'mentee', 'recruiter', 'referral', 'other'
]);

export const networkingContacts = pgTable('networking_contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  company: varchar('company', { length: 255 }),
  title: varchar('title', { length: 255 }),
  linkedinUrl: varchar('linkedin_url', { length: 512 }),
  
  status: contactStatusEnum('status').default('cold').notNull(),
  relationship: relationshipEnum('relationship'),
  
  notes: text('notes'),
  tags: jsonb('tags').$type<string[]>().default([]),
  
  // Interaction log
  interactions: jsonb('interactions').$type<Array<{
    id: string;
    type: 'email' | 'call' | 'meeting' | 'event' | 'message';
    date: string;
    notes: string;
    followUpDate: string | null;
  }>>().notNull().default([]),
  
  lastContactedAt: timestamp('last_contacted_at', { withTimezone: true }),
  nextFollowUpAt: timestamp('next_follow_up_at', { withTimezone: true }),
  
  referral: boolean('referral').default(false),
  
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => ({
  userIdx: index('networking_contacts_user_id_idx').on(table.userId),
  companyIdx: index('networking_contacts_company_idx').on(table.company),
  statusIdx: index('networking_contacts_status_idx').on(table.status),
}));

export type NetworkingContact = typeof networkingContacts.$inferSelect;
export type NewNetworkingContact = typeof networkingContacts.$inferInsert;
