import { boolean, index, numeric, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { attachments, audited, entityStatusEnum, organizations } from "./core";

export const partyTypeEnum = pgEnum("party_type", ["customer", "vendor"]);
export const addressTypeEnum = pgEnum("address_type", ["billing", "shipping", "office", "warehouse"]);
export const ledgerEntryTypeEnum = pgEnum("party_ledger_entry_type", ["invoice", "payment", "credit_note", "debit_note", "adjustment", "opening_balance"]);

export const customerGroups = pgTable("customer_groups", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  ...audited(),
}, (table) => [uniqueIndex("customer_groups_org_name_uq").on(table.organizationId, table.name)]);

export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  groupId: uuid("group_id").references(() => customerGroups.id, { onDelete: "set null" }),
  code: varchar("code", { length: 40 }).notNull(),
  displayName: varchar("display_name", { length: 180 }).notNull(),
  legalName: varchar("legal_name", { length: 200 }),
  email: varchar("email", { length: 254 }),
  phone: varchar("phone", { length: 30 }),
  gstin: varchar("gstin", { length: 15 }),
  pan: varchar("pan", { length: 10 }),
  creditLimit: numeric("credit_limit", { precision: 18, scale: 2 }).notNull().default("0"),
  paymentTermsDays: numeric("payment_terms_days", { precision: 4, scale: 0 }).notNull().default("0"),
  openingBalance: numeric("opening_balance", { precision: 18, scale: 2 }).notNull().default("0"),
  status: entityStatusEnum("status").notNull().default("active"),
  ...audited(),
}, (table) => [uniqueIndex("customers_org_code_uq").on(table.organizationId, table.code), index("customers_org_name_idx").on(table.organizationId, table.displayName), index("customers_org_phone_idx").on(table.organizationId, table.phone)]);

export const customerContacts = pgTable("customer_contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
  firstName: varchar("first_name", { length: 80 }).notNull(),
  lastName: varchar("last_name", { length: 80 }),
  designation: varchar("designation", { length: 100 }),
  email: varchar("email", { length: 254 }),
  phone: varchar("phone", { length: 30 }),
  isPrimary: boolean("is_primary").notNull().default(false),
  ...audited(),
}, (table) => [index("customer_contacts_customer_idx").on(table.customerId)]);

export const customerAddresses = pgTable("customer_addresses", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
  type: addressTypeEnum("type").notNull(),
  label: varchar("label", { length: 80 }).notNull(),
  line1: varchar("line1", { length: 180 }).notNull(),
  line2: varchar("line2", { length: 180 }),
  city: varchar("city", { length: 80 }).notNull(),
  state: varchar("state", { length: 80 }).notNull(),
  countryCode: varchar("country_code", { length: 2 }).notNull().default("IN"),
  postalCode: varchar("postal_code", { length: 20 }).notNull(),
  isDefault: boolean("is_default").notNull().default(false),
  ...audited(),
});

export const customerNotes = pgTable("customer_notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  ...audited(),
}, (table) => [index("customer_notes_customer_idx").on(table.customerId)]);

export const customerDocuments = pgTable("customer_documents", {
  customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
  attachmentId: uuid("attachment_id").notNull().references(() => attachments.id, { onDelete: "cascade" }),
  ...audited(),
}, (table) => [uniqueIndex("customer_document_uq").on(table.customerId, table.attachmentId)]);

export const customerLedgerEntries = pgTable("customer_ledger_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "restrict" }),
  entryType: ledgerEntryTypeEnum("entry_type").notNull(),
  referenceType: varchar("reference_type", { length: 50 }).notNull(),
  referenceId: uuid("reference_id").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
  debit: numeric("debit", { precision: 18, scale: 2 }).notNull().default("0"),
  credit: numeric("credit", { precision: 18, scale: 2 }).notNull().default("0"),
  runningBalance: numeric("running_balance", { precision: 18, scale: 2 }).notNull(),
  remarks: text("remarks"),
  ...audited(),
}, (table) => [index("customer_ledger_customer_date_idx").on(table.customerId, table.occurredAt), index("customer_ledger_reference_idx").on(table.referenceType, table.referenceId)]);

export const vendors = pgTable("vendors", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  code: varchar("code", { length: 40 }).notNull(),
  displayName: varchar("display_name", { length: 180 }).notNull(),
  legalName: varchar("legal_name", { length: 200 }),
  email: varchar("email", { length: 254 }),
  phone: varchar("phone", { length: 30 }),
  gstin: varchar("gstin", { length: 15 }),
  pan: varchar("pan", { length: 10 }),
  paymentTermsDays: numeric("payment_terms_days", { precision: 4, scale: 0 }).notNull().default("0"),
  rating: numeric("rating", { precision: 2, scale: 1 }),
  openingBalance: numeric("opening_balance", { precision: 18, scale: 2 }).notNull().default("0"),
  status: entityStatusEnum("status").notNull().default("active"),
  ...audited(),
}, (table) => [uniqueIndex("vendors_org_code_uq").on(table.organizationId, table.code), index("vendors_org_name_idx").on(table.organizationId, table.displayName)]);

export const vendorContacts = pgTable("vendor_contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  vendorId: uuid("vendor_id").notNull().references(() => vendors.id, { onDelete: "cascade" }),
  firstName: varchar("first_name", { length: 80 }).notNull(),
  lastName: varchar("last_name", { length: 80 }),
  designation: varchar("designation", { length: 100 }),
  email: varchar("email", { length: 254 }),
  phone: varchar("phone", { length: 30 }),
  ...audited(),
});

export const vendorAddresses = pgTable("vendor_addresses", {
  id: uuid("id").defaultRandom().primaryKey(),
  vendorId: uuid("vendor_id").notNull().references(() => vendors.id, { onDelete: "cascade" }),
  type: addressTypeEnum("type").notNull(),
  label: varchar("label", { length: 80 }).notNull(),
  line1: varchar("line1", { length: 180 }).notNull(),
  line2: varchar("line2", { length: 180 }),
  city: varchar("city", { length: 80 }).notNull(),
  state: varchar("state", { length: 80 }).notNull(),
  countryCode: varchar("country_code", { length: 2 }).notNull().default("IN"),
  postalCode: varchar("postal_code", { length: 20 }).notNull(),
  ...audited(),
});

export const vendorDocuments = pgTable("vendor_documents", {
  vendorId: uuid("vendor_id").notNull().references(() => vendors.id, { onDelete: "cascade" }),
  attachmentId: uuid("attachment_id").notNull().references(() => attachments.id, { onDelete: "cascade" }),
  ...audited(),
}, (table) => [uniqueIndex("vendor_document_uq").on(table.vendorId, table.attachmentId)]);

export const vendorLedgerEntries = pgTable("vendor_ledger_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  vendorId: uuid("vendor_id").notNull().references(() => vendors.id, { onDelete: "restrict" }),
  entryType: ledgerEntryTypeEnum("entry_type").notNull(),
  referenceType: varchar("reference_type", { length: 50 }).notNull(),
  referenceId: uuid("reference_id").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
  debit: numeric("debit", { precision: 18, scale: 2 }).notNull().default("0"),
  credit: numeric("credit", { precision: 18, scale: 2 }).notNull().default("0"),
  runningBalance: numeric("running_balance", { precision: 18, scale: 2 }).notNull(),
  remarks: text("remarks"),
  ...audited(),
}, (table) => [index("vendor_ledger_vendor_date_idx").on(table.vendorId, table.occurredAt), index("vendor_ledger_reference_idx").on(table.referenceType, table.referenceId)]);
