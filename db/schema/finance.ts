import { sql } from "drizzle-orm";
import { boolean, check, index, numeric, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { audited, organizations } from "./core";

export const accountTypeEnum = pgEnum("account_type", ["asset", "liability", "equity", "income", "expense"]);
export const accountClassEnum = pgEnum("account_class", ["cash", "bank", "accounts_receivable", "inventory", "fixed_asset", "other_asset", "accounts_payable", "tax_payable", "loan", "other_liability", "capital", "retained_earnings", "sales", "other_income", "cogs", "operating_expense", "tax_expense"]);
export const journalStatusEnum = pgEnum("journal_status", ["draft", "posted", "voided"]);
export const bankTxnTypeEnum = pgEnum("bank_transaction_type", ["credit", "debit"]);

export const chartOfAccounts = pgTable("chart_of_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  parentId: uuid("parent_id"),
  code: varchar("code", { length: 30 }).notNull(),
  name: varchar("name", { length: 140 }).notNull(),
  type: accountTypeEnum("type").notNull(),
  class: accountClassEnum("class").notNull(),
  isSystem: boolean("is_system").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  ...audited(),
}, (table) => [uniqueIndex("coa_org_code_uq").on(table.organizationId, table.code), index("coa_org_type_idx").on(table.organizationId, table.type)]);

export const bankAccounts = pgTable("bank_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  chartAccountId: uuid("chart_account_id").notNull().unique().references(() => chartOfAccounts.id, { onDelete: "restrict" }),
  name: varchar("name", { length: 120 }).notNull(),
  bankName: varchar("bank_name", { length: 120 }),
  accountNumberMasked: varchar("account_number_masked", { length: 40 }),
  ifsc: varchar("ifsc", { length: 20 }),
  openingBalance: numeric("opening_balance", { precision: 18, scale: 2 }).notNull().default("0"),
  ...audited(),
});

export const journalEntries = pgTable("journal_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  fiscalYearId: uuid("fiscal_year_id"),
  entryNumber: varchar("entry_number", { length: 60 }).notNull(),
  status: journalStatusEnum("status").notNull().default("draft"),
  entryDate: timestamp("entry_date", { withTimezone: true }).notNull(),
  memo: text("memo"),
  sourceType: varchar("source_type", { length: 60 }),
  sourceId: uuid("source_id"),
  postedAt: timestamp("posted_at", { withTimezone: true }),
  ...audited(),
}, (table) => [uniqueIndex("journal_org_number_uq").on(table.organizationId, table.entryNumber), index("journal_org_date_idx").on(table.organizationId, table.entryDate), index("journal_source_idx").on(table.sourceType, table.sourceId)]);

export const journalLines = pgTable("journal_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  journalEntryId: uuid("journal_entry_id").notNull().references(() => journalEntries.id, { onDelete: "cascade" }),
  accountId: uuid("account_id").notNull().references(() => chartOfAccounts.id, { onDelete: "restrict" }),
  description: varchar("description", { length: 300 }),
  debit: numeric("debit", { precision: 18, scale: 2 }).notNull().default("0"),
  credit: numeric("credit", { precision: 18, scale: 2 }).notNull().default("0"),
  ...audited(),
}, (table) => [index("journal_lines_entry_idx").on(table.journalEntryId), index("journal_lines_account_idx").on(table.accountId), check("journal_line_one_side_check", sql`(debit = 0 AND credit > 0) OR (credit = 0 AND debit > 0)`)]);

export const bankTransactions = pgTable("bank_transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  bankAccountId: uuid("bank_account_id").notNull().references(() => bankAccounts.id, { onDelete: "restrict" }),
  transactionDate: timestamp("transaction_date", { withTimezone: true }).notNull(),
  type: bankTxnTypeEnum("type").notNull(),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  reference: varchar("reference", { length: 160 }),
  description: text("description"),
  journalEntryId: uuid("journal_entry_id").references(() => journalEntries.id, { onDelete: "set null" }),
  isReconciled: boolean("is_reconciled").notNull().default(false),
  ...audited(),
}, (table) => [index("bank_txn_account_date_idx").on(table.bankAccountId, table.transactionDate)]);

export const expenseCategories = pgTable("expense_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  accountId: uuid("account_id").notNull().references(() => chartOfAccounts.id, { onDelete: "restrict" }),
  name: varchar("name", { length: 100 }).notNull(),
  ...audited(),
}, (table) => [uniqueIndex("expense_category_org_name_uq").on(table.organizationId, table.name)]);

export const expenses = pgTable("expenses", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id").notNull().references(() => expenseCategories.id, { onDelete: "restrict" }),
  paidFromAccountId: uuid("paid_from_account_id").notNull().references(() => chartOfAccounts.id, { onDelete: "restrict" }),
  expenseNumber: varchar("expense_number", { length: 60 }).notNull(),
  expenseDate: timestamp("expense_date", { withTimezone: true }).notNull(),
  vendorName: varchar("vendor_name", { length: 160 }),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  taxAmount: numeric("tax_amount", { precision: 18, scale: 2 }).notNull().default("0"),
  description: text("description").notNull(),
  journalEntryId: uuid("journal_entry_id").references(() => journalEntries.id, { onDelete: "set null" }),
  ...audited(),
}, (table) => [uniqueIndex("expense_org_number_uq").on(table.organizationId, table.expenseNumber), index("expenses_org_date_idx").on(table.organizationId, table.expenseDate)]);
