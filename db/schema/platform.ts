import { boolean, index, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { audited, organizations } from "./core";
import { users } from "./auth";

export const reportFormatEnum = pgEnum("report_format", ["pdf", "xlsx", "csv"]);
export const reportScheduleEnum = pgEnum("report_schedule", ["daily", "weekly", "monthly"]);

export const dashboardLayouts = pgTable("dashboard_layouts", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  layout: jsonb("layout").notNull().default([]),
  isDefault: boolean("is_default").notNull().default(false),
  ...audited(),
}, (table) => [uniqueIndex("dashboard_layout_user_uq").on(table.organizationId, table.userId)]);

export const savedReports = pgTable("saved_reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 160 }).notNull(),
  reportType: varchar("report_type", { length: 80 }).notNull(),
  filters: jsonb("filters").notNull().default({}),
  columns: jsonb("columns").notNull().default([]),
  createdByUserId: text("created_by_user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  ...audited(),
}, (table) => [index("saved_reports_org_type_idx").on(table.organizationId, table.reportType)]);

export const scheduledReports = pgTable("scheduled_reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  savedReportId: uuid("saved_report_id").notNull().references(() => savedReports.id, { onDelete: "cascade" }),
  format: reportFormatEnum("format").notNull(),
  schedule: reportScheduleEnum("schedule").notNull(),
  recipients: jsonb("recipients").notNull().default([]),
  nextRunAt: timestamp("next_run_at", { withTimezone: true }).notNull(),
  isEnabled: boolean("is_enabled").notNull().default(true),
  ...audited(),
}, (table) => [index("scheduled_reports_next_run_idx").on(table.nextRunAt)]);

export const aiInsights = pgTable("ai_insights", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  category: varchar("category", { length: 80 }).notNull(),
  title: varchar("title", { length: 250 }).notNull(),
  body: text("body").notNull(),
  confidence: varchar("confidence", { length: 12 }),
  data: jsonb("data").notNull().default({}),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  ...audited(),
}, (table) => [index("ai_insights_org_category_idx").on(table.organizationId, table.category)]);
