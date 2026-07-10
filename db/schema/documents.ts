import { index, pgEnum, pgTable, text, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { attachments, audited, organizations, tags } from "./core";

export const documentTypeEnum = pgEnum("document_type", ["contract", "invoice", "report", "receipt", "other"]);

export const documentFolders = pgTable("document_folders", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  parentId: uuid("parent_id"),
  name: varchar("name", { length: 140 }).notNull(),
  ...audited(),
}, (table) => [index("document_folders_org_parent_idx").on(table.organizationId, table.parentId)]);

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  folderId: uuid("folder_id").references(() => documentFolders.id, { onDelete: "set null" }),
  attachmentId: uuid("attachment_id").notNull().references(() => attachments.id, { onDelete: "restrict" }),
  type: documentTypeEnum("type").notNull().default("other"),
  title: varchar("title", { length: 250 }).notNull(),
  summary: text("summary"),
  sourceType: varchar("source_type", { length: 60 }),
  sourceId: uuid("source_id"),
  ...audited(),
}, (table) => [index("documents_org_type_idx").on(table.organizationId, table.type), index("documents_source_idx").on(table.sourceType, table.sourceId)]);

export const documentTags = pgTable("document_tags", {
  documentId: uuid("document_id").notNull().references(() => documents.id, { onDelete: "cascade" }),
  tagId: uuid("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
}, (table) => [uniqueIndex("document_tag_uq").on(table.documentId, table.tagId)]);
