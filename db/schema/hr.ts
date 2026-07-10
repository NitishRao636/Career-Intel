import { boolean, index, numeric, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { attachments, audited, entityStatusEnum, organizations } from "./core";

export const employmentStatusEnum = pgEnum("employment_status", ["active", "on_leave", "notice_period", "terminated"]);
export const attendanceStatusEnum = pgEnum("attendance_status", ["present", "absent", "half_day", "leave", "holiday"]);
export const leaveStatusEnum = pgEnum("leave_status", ["pending", "approved", "rejected", "cancelled"]);
export const payrollStatusEnum = pgEnum("payroll_status", ["draft", "approved", "paid", "cancelled"]);
export const salaryComponentTypeEnum = pgEnum("salary_component_type", ["earning", "deduction"]);

export const departments = pgTable("departments", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  ...audited(),
}, (table) => [uniqueIndex("department_org_name_uq").on(table.organizationId, table.name)]);

export const designations = pgTable("designations", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  ...audited(),
}, (table) => [uniqueIndex("designation_org_name_uq").on(table.organizationId, table.name)]);

export const employees = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: text("user_id"),
  employeeCode: varchar("employee_code", { length: 40 }).notNull(),
  firstName: varchar("first_name", { length: 80 }).notNull(),
  lastName: varchar("last_name", { length: 80 }),
  workEmail: varchar("work_email", { length: 254 }),
  phone: varchar("phone", { length: 30 }),
  departmentId: uuid("department_id").references(() => departments.id, { onDelete: "set null" }),
  designationId: uuid("designation_id").references(() => designations.id, { onDelete: "set null" }),
  managerId: uuid("manager_id"),
  joinedOn: timestamp("joined_on", { withTimezone: true }).notNull(),
  status: employmentStatusEnum("status").notNull().default("active"),
  ...audited(),
}, (table) => [uniqueIndex("employee_org_code_uq").on(table.organizationId, table.employeeCode), index("employee_org_name_idx").on(table.organizationId, table.firstName, table.lastName)]);

export const employeeDocuments = pgTable("employee_documents", {
  employeeId: uuid("employee_id").notNull().references(() => employees.id, { onDelete: "cascade" }),
  attachmentId: uuid("attachment_id").notNull().references(() => attachments.id, { onDelete: "cascade" }),
  category: varchar("category", { length: 60 }).notNull(),
  ...audited(),
}, (table) => [uniqueIndex("employee_document_uq").on(table.employeeId, table.attachmentId)]);

export const attendance = pgTable("attendance", {
  id: uuid("id").defaultRandom().primaryKey(),
  employeeId: uuid("employee_id").notNull().references(() => employees.id, { onDelete: "cascade" }),
  date: timestamp("date", { withTimezone: true }).notNull(),
  status: attendanceStatusEnum("status").notNull(),
  checkInAt: timestamp("check_in_at", { withTimezone: true }),
  checkOutAt: timestamp("check_out_at", { withTimezone: true }),
  notes: text("notes"),
  ...audited(),
}, (table) => [uniqueIndex("attendance_employee_date_uq").on(table.employeeId, table.date)]);

export const leaveTypes = pgTable("leave_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 60 }).notNull(),
  annualAllowance: numeric("annual_allowance", { precision: 5, scale: 1 }).notNull(),
  isPaid: boolean("is_paid").notNull().default(true),
  ...audited(),
}, (table) => [uniqueIndex("leave_type_org_name_uq").on(table.organizationId, table.name)]);

export const leaveRequests = pgTable("leave_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  employeeId: uuid("employee_id").notNull().references(() => employees.id, { onDelete: "cascade" }),
  leaveTypeId: uuid("leave_type_id").notNull().references(() => leaveTypes.id, { onDelete: "restrict" }),
  startsOn: timestamp("starts_on", { withTimezone: true }).notNull(),
  endsOn: timestamp("ends_on", { withTimezone: true }).notNull(),
  days: numeric("days", { precision: 5, scale: 1 }).notNull(),
  reason: text("reason"),
  status: leaveStatusEnum("status").notNull().default("pending"),
  approverId: text("approver_id"),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
  ...audited(),
}, (table) => [index("leave_request_employee_status_idx").on(table.employeeId, table.status)]);

export const salaryComponents = pgTable("salary_components", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 80 }).notNull(),
  type: salaryComponentTypeEnum("type").notNull(),
  isTaxable: boolean("is_taxable").notNull().default(false),
  ...audited(),
}, (table) => [uniqueIndex("salary_component_org_name_uq").on(table.organizationId, table.name)]);

export const employeeSalaryComponents = pgTable("employee_salary_components", {
  employeeId: uuid("employee_id").notNull().references(() => employees.id, { onDelete: "cascade" }),
  salaryComponentId: uuid("salary_component_id").notNull().references(() => salaryComponents.id, { onDelete: "restrict" }),
  monthlyAmount: numeric("monthly_amount", { precision: 18, scale: 2 }).notNull(),
  ...audited(),
}, (table) => [uniqueIndex("employee_salary_component_uq").on(table.employeeId, table.salaryComponentId)]);

export const payrollRuns = pgTable("payroll_runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  periodStart: timestamp("period_start", { withTimezone: true }).notNull(),
  periodEnd: timestamp("period_end", { withTimezone: true }).notNull(),
  status: payrollStatusEnum("status").notNull().default("draft"),
  ...audited(),
}, (table) => [uniqueIndex("payroll_run_org_period_uq").on(table.organizationId, table.periodStart, table.periodEnd)]);

export const payrollItems = pgTable("payroll_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  payrollRunId: uuid("payroll_run_id").notNull().references(() => payrollRuns.id, { onDelete: "cascade" }),
  employeeId: uuid("employee_id").notNull().references(() => employees.id, { onDelete: "restrict" }),
  grossPay: numeric("gross_pay", { precision: 18, scale: 2 }).notNull(),
  deductions: numeric("deductions", { precision: 18, scale: 2 }).notNull().default("0"),
  netPay: numeric("net_pay", { precision: 18, scale: 2 }).notNull(),
  ...audited(),
}, (table) => [uniqueIndex("payroll_item_employee_run_uq").on(table.payrollRunId, table.employeeId)]);
