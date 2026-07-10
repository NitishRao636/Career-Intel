import { relations } from "drizzle-orm";
import { boolean, index, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const memberStatusEnum = pgEnum("member_status", ["active", "invited", "suspended"]);
export const entityStatusEnum = pgEnum("entity_status", ["active", "inactive", "archived"]);
export const auditActionEnum = pgEnum("audit_action", ["create", "update", "delete", "restore", "login", "logout", "export", "approve", "reject"]);
export const notificationTypeEnum = pgEnum("notification_type", ["stock", "payment", "order", "hr", "system", "report"]);

/** Shared columns for every mutable domain aggregate. */
export const audited = () => ({
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  createdBy: text("created_by").references(() => users.id, { onDelete: "set null" }),
  updatedBy: text("updated_by").references(() => users.id, { onDelete: "set null" }),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 90 }).notNull().unique(),
  legalName: varchar("legal_name", { length: 200 }),
  gstin: varchar("gstin", { length: 15 }),
  pan: varchar("pan", { length: 10 }),
  phone: varchar("phone", { length: 30 }),
  email: varchar("email", { length: 254 }),
  logoUrl: text("logo_url"),
  timezone: varchar("timezone", { length: 64 }).notNull().default("Asia/Kolkata"),
  locale: varchar("locale", { length: 16 }).notNull().default("en-IN"),
  currencyCode: varchar("currency_code", { length: 3 }).notNull().default("INR"),
  fiscalYearStartMonth: varchar("fiscal_year_start_month", { length: 2 }).notNull().default("04"),
  settings: jsonb("settings").notNull().default({}),
  ...audited(),
});

export const memberships = pgTable("memberships", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  status: memberStatusEnum("status").notNull().default("active"),
  joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
  ...audited(),
}, (table) => [uniqueIndex("membership_org_user_uq").on(table.organizationId, table.userId), index("membership_user_idx").on(table.userId)]);

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "cascade" }),
  key: varchar("key", { length: 64 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  isSystem: boolean("is_system").notNull().default(false),
  ...audited(),
}, (table) => [uniqueIndex("roles_org_key_uq").on(table.organizationId, table.key)]);

export const permissions = pgTable("permissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  resource: varchar("resource", { length: 80 }).notNull(),
  action: varchar("action", { length: 30 }).notNull(),
  description: text("description").notNull(),
}, (table) => [uniqueIndex("permissions_resource_action_uq").on(table.resource, table.action)]);

export const rolePermissions = pgTable("role_permissions", {
  roleId: uuid("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
  permissionId: uuid("permission_id").notNull().references(() => permissions.id, { onDelete: "cascade" }),
}, (table) => [uniqueIndex("role_permission_uq").on(table.roleId, table.permissionId)]);

export const membershipRoles = pgTable("membership_roles", {
  membershipId: uuid("membership_id").notNull().references(() => memberships.id, { onDelete: "cascade" }),
  roleId: uuid("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
}, (table) => [uniqueIndex("membership_role_uq").on(table.membershipId, table.roleId)]);

export const invitations = pgTable("invitations", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  email: varchar("email", { length: 254 }).notNull(),
  tokenHash: varchar("token_hash", { length: 128 }).notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  acceptedAt: timestamp("accepted_at", { withTimezone: true }),
  invitedBy: text("invited_by").notNull().references(() => users.id, { onDelete: "restrict" }),
  ...audited(),
}, (table) => [index("invitations_org_email_idx").on(table.organizationId, table.email)]);

export const fiscalYears = pgTable("fiscal_years", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 20 }).notNull(),
  startsOn: timestamp("starts_on", { withTimezone: true }).notNull(),
  endsOn: timestamp("ends_on", { withTimezone: true }).notNull(),
  isClosed: boolean("is_closed").notNull().default(false),
  ...audited(),
}, (table) => [uniqueIndex("fiscal_year_org_name_uq").on(table.organizationId, table.name)]);

export const warehouses = pgTable("warehouses", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  code: varchar("code", { length: 30 }).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  address: jsonb("address").notNull().default({}),
  status: entityStatusEnum("status").notNull().default("active"),
  ...audited(),
}, (table) => [uniqueIndex("warehouses_org_code_uq").on(table.organizationId, table.code)]);

export const storageLocations = pgTable("storage_locations", {
  id: uuid("id").defaultRandom().primaryKey(),
  warehouseId: uuid("warehouse_id").notNull().references(() => warehouses.id, { onDelete: "cascade" }),
  parentId: uuid("parent_id"),
  code: varchar("code", { length: 50 }).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  isSellable: boolean("is_sellable").notNull().default(true),
  ...audited(),
}, (table) => [uniqueIndex("storage_location_warehouse_code_uq").on(table.warehouseId, table.code)]);

export const attachments = pgTable("attachments", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileUrl: text("file_url").notNull(),
  mimeType: varchar("mime_type", { length: 120 }).notNull(),
  byteSize: text("byte_size").notNull(),
  checksum: varchar("checksum", { length: 128 }),
  ...audited(),
}, (table) => [index("attachments_org_idx").on(table.organizationId)]);

export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 50 }).notNull(),
  color: varchar("color", { length: 9 }).notNull().default("#64748B"),
  ...audited(),
}, (table) => [uniqueIndex("tags_org_name_uq").on(table.organizationId, table.name)]);

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "cascade" }),
  actorId: text("actor_id").references(() => users.id, { onDelete: "set null" }),
  action: auditActionEnum("action").notNull(),
  entityType: varchar("entity_type", { length: 80 }).notNull(),
  entityId: text("entity_id"),
  before: jsonb("before"),
  after: jsonb("after"),
  requestId: varchar("request_id", { length: 80 }),
  ipAddress: varchar("ip_address", { length: 64 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [index("audit_org_entity_idx").on(table.organizationId, table.entityType, table.entityId), index("audit_actor_idx").on(table.actorId)]);

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: notificationTypeEnum("type").notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  body: text("body").notNull(),
  link: text("link"),
  readAt: timestamp("read_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [index("notifications_user_unread_idx").on(table.userId, table.readAt)]);

export const organizationsRelations = relations(organizations, ({ many }) => ({ memberships: many(memberships), warehouses: many(warehouses) }));
export const membershipsRelations = relations(memberships, ({ one, many }) => ({ organization: one(organizations, { fields: [memberships.organizationId], references: [organizations.id] }), user: one(users, { fields: [memberships.userId], references: [users.id] }), roles: many(membershipRoles) }));
