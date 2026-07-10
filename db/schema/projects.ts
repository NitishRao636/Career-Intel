import { index, numeric, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { attachments, audited, organizations } from "./core";
import { users } from "./auth";
import { customers } from "./parties";

export const projectStatusEnum = pgEnum("project_status", ["planned", "active", "on_hold", "completed", "cancelled"]);
export const taskStatusEnum = pgEnum("task_status", ["backlog", "todo", "in_progress", "in_review", "done", "cancelled"]);
export const taskPriorityEnum = pgEnum("task_priority", ["urgent", "high", "medium", "low", "none"]);

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  customerId: uuid("customer_id").references(() => customers.id, { onDelete: "set null" }),
  code: varchar("code", { length: 40 }).notNull(),
  name: varchar("name", { length: 180 }).notNull(),
  description: text("description"),
  status: projectStatusEnum("status").notNull().default("planned"),
  startsOn: timestamp("starts_on", { withTimezone: true }),
  dueOn: timestamp("due_on", { withTimezone: true }),
  budget: numeric("budget", { precision: 18, scale: 2 }),
  ...audited(),
}, (table) => [uniqueIndex("project_org_code_uq").on(table.organizationId, table.code), index("projects_org_status_idx").on(table.organizationId, table.status)]);

export const projectMembers = pgTable("project_members", {
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 50 }).notNull().default("member"),
  ...audited(),
}, (table) => [uniqueIndex("project_member_uq").on(table.projectId, table.userId)]);

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }),
  parentTaskId: uuid("parent_task_id"),
  taskNumber: varchar("task_number", { length: 40 }).notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  description: text("description"),
  status: taskStatusEnum("status").notNull().default("backlog"),
  priority: taskPriorityEnum("priority").notNull().default("none"),
  assigneeId: text("assignee_id").references(() => users.id, { onDelete: "set null" }),
  reporterId: text("reporter_id").references(() => users.id, { onDelete: "set null" }),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  dueAt: timestamp("due_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  sortOrder: numeric("sort_order", { precision: 18, scale: 4 }).notNull().default("0"),
  ...audited(),
}, (table) => [uniqueIndex("task_org_number_uq").on(table.organizationId, table.taskNumber), index("tasks_project_status_idx").on(table.projectId, table.status), index("tasks_assignee_idx").on(table.assigneeId)]);

export const taskComments = pgTable("task_comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  taskId: uuid("task_id").notNull().references(() => tasks.id, { onDelete: "cascade" }),
  authorId: text("author_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  body: text("body").notNull(),
  ...audited(),
}, (table) => [index("task_comments_task_idx").on(table.taskId)]);

export const taskAttachments = pgTable("task_attachments", {
  taskId: uuid("task_id").notNull().references(() => tasks.id, { onDelete: "cascade" }),
  attachmentId: uuid("attachment_id").notNull().references(() => attachments.id, { onDelete: "cascade" }),
  ...audited(),
}, (table) => [uniqueIndex("task_attachment_uq").on(table.taskId, table.attachmentId)]);

export const timeEntries = pgTable("time_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }),
  taskId: uuid("task_id").references(() => tasks.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  minutes: numeric("minutes", { precision: 8, scale: 0 }).notNull(),
  description: text("description"),
  ...audited(),
}, (table) => [index("time_entries_project_date_idx").on(table.projectId, table.startedAt), index("time_entries_user_date_idx").on(table.userId, table.startedAt)]);
