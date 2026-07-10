import { index, numeric, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { products, productVariants, taxRates } from "./catalog";
import { audited, organizations, warehouses } from "./core";
import { paymentMethodEnum } from "./sales";
import { vendors } from "./parties";

export const purchaseStatusEnum = pgEnum("purchase_document_status", ["draft", "sent", "confirmed", "partially_received", "received", "cancelled"]);
export const purchaseBillStatusEnum = pgEnum("purchase_bill_status", ["draft", "received", "partially_paid", "paid", "overdue", "voided"]);

export const purchaseOrders = pgTable("purchase_orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  vendorId: uuid("vendor_id").notNull().references(() => vendors.id, { onDelete: "restrict" }),
  purchaseOrderNumber: varchar("purchase_order_number", { length: 60 }).notNull(),
  status: purchaseStatusEnum("status").notNull().default("draft"),
  orderedAt: timestamp("ordered_at", { withTimezone: true }).notNull(),
  expectedAt: timestamp("expected_at", { withTimezone: true }),
  subtotal: numeric("subtotal", { precision: 18, scale: 2 }).notNull().default("0"),
  discountTotal: numeric("discount_total", { precision: 18, scale: 2 }).notNull().default("0"),
  taxTotal: numeric("tax_total", { precision: 18, scale: 2 }).notNull().default("0"),
  grandTotal: numeric("grand_total", { precision: 18, scale: 2 }).notNull().default("0"),
  notes: text("notes"),
  ...audited(),
}, (table) => [uniqueIndex("purchase_order_org_number_uq").on(table.organizationId, table.purchaseOrderNumber), index("purchase_order_vendor_status_idx").on(table.vendorId, table.status)]);

export const purchaseOrderLines = pgTable("purchase_order_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  purchaseOrderId: uuid("purchase_order_id").notNull().references(() => purchaseOrders.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "restrict" }),
  description: text("description").notNull(),
  quantity: numeric("quantity", { precision: 18, scale: 4 }).notNull(),
  receivedQuantity: numeric("received_quantity", { precision: 18, scale: 4 }).notNull().default("0"),
  unitPrice: numeric("unit_price", { precision: 18, scale: 4 }).notNull(),
  taxRateId: uuid("tax_rate_id").references(() => taxRates.id, { onDelete: "set null" }),
  lineTotal: numeric("line_total", { precision: 18, scale: 2 }).notNull(),
  ...audited(),
});

export const goodsReceipts = pgTable("goods_receipts", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  vendorId: uuid("vendor_id").notNull().references(() => vendors.id, { onDelete: "restrict" }),
  purchaseOrderId: uuid("purchase_order_id").references(() => purchaseOrders.id, { onDelete: "set null" }),
  warehouseId: uuid("warehouse_id").notNull().references(() => warehouses.id, { onDelete: "restrict" }),
  receiptNumber: varchar("receipt_number", { length: 60 }).notNull(),
  receivedAt: timestamp("received_at", { withTimezone: true }).notNull(),
  status: purchaseStatusEnum("status").notNull().default("draft"),
  ...audited(),
}, (table) => [uniqueIndex("goods_receipt_org_number_uq").on(table.organizationId, table.receiptNumber)]);

export const goodsReceiptLines = pgTable("goods_receipt_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  goodsReceiptId: uuid("goods_receipt_id").notNull().references(() => goodsReceipts.id, { onDelete: "cascade" }),
  purchaseOrderLineId: uuid("purchase_order_line_id").references(() => purchaseOrderLines.id, { onDelete: "set null" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "restrict" }),
  quantity: numeric("quantity", { precision: 18, scale: 4 }).notNull(),
  acceptedQuantity: numeric("accepted_quantity", { precision: 18, scale: 4 }).notNull(),
  rejectedQuantity: numeric("rejected_quantity", { precision: 18, scale: 4 }).notNull().default("0"),
  unitCost: numeric("unit_cost", { precision: 18, scale: 4 }).notNull(),
  ...audited(),
});

export const purchaseBills = pgTable("purchase_bills", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  vendorId: uuid("vendor_id").notNull().references(() => vendors.id, { onDelete: "restrict" }),
  purchaseOrderId: uuid("purchase_order_id").references(() => purchaseOrders.id, { onDelete: "set null" }),
  billNumber: varchar("bill_number", { length: 60 }).notNull(),
  vendorBillNumber: varchar("vendor_bill_number", { length: 80 }),
  status: purchaseBillStatusEnum("status").notNull().default("draft"),
  billedAt: timestamp("billed_at", { withTimezone: true }).notNull(),
  dueAt: timestamp("due_at", { withTimezone: true }),
  subtotal: numeric("subtotal", { precision: 18, scale: 2 }).notNull().default("0"),
  discountTotal: numeric("discount_total", { precision: 18, scale: 2 }).notNull().default("0"),
  taxTotal: numeric("tax_total", { precision: 18, scale: 2 }).notNull().default("0"),
  grandTotal: numeric("grand_total", { precision: 18, scale: 2 }).notNull().default("0"),
  amountPaid: numeric("amount_paid", { precision: 18, scale: 2 }).notNull().default("0"),
  notes: text("notes"),
  ...audited(),
}, (table) => [uniqueIndex("purchase_bill_org_number_uq").on(table.organizationId, table.billNumber), index("purchase_bill_vendor_due_idx").on(table.vendorId, table.dueAt)]);

export const purchaseBillLines = pgTable("purchase_bill_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  purchaseBillId: uuid("purchase_bill_id").notNull().references(() => purchaseBills.id, { onDelete: "cascade" }),
  productId: uuid("product_id").references(() => products.id, { onDelete: "restrict" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "restrict" }),
  description: text("description").notNull(),
  quantity: numeric("quantity", { precision: 18, scale: 4 }).notNull(),
  unitPrice: numeric("unit_price", { precision: 18, scale: 4 }).notNull(),
  discountAmount: numeric("discount_amount", { precision: 18, scale: 2 }).notNull().default("0"),
  taxRateId: uuid("tax_rate_id").references(() => taxRates.id, { onDelete: "set null" }),
  taxAmount: numeric("tax_amount", { precision: 18, scale: 2 }).notNull().default("0"),
  lineTotal: numeric("line_total", { precision: 18, scale: 2 }).notNull(),
  ...audited(),
});

export const vendorPayments = pgTable("vendor_payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  vendorId: uuid("vendor_id").notNull().references(() => vendors.id, { onDelete: "restrict" }),
  paymentNumber: varchar("payment_number", { length: 60 }).notNull(),
  method: paymentMethodEnum("method").notNull(),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  paidAt: timestamp("paid_at", { withTimezone: true }).notNull(),
  reference: varchar("reference", { length: 120 }),
  notes: text("notes"),
  ...audited(),
}, (table) => [uniqueIndex("vendor_payment_org_number_uq").on(table.organizationId, table.paymentNumber), index("vendor_payment_vendor_date_idx").on(table.vendorId, table.paidAt)]);

export const vendorPaymentAllocations = pgTable("vendor_payment_allocations", {
  id: uuid("id").defaultRandom().primaryKey(),
  vendorPaymentId: uuid("vendor_payment_id").notNull().references(() => vendorPayments.id, { onDelete: "cascade" }),
  purchaseBillId: uuid("purchase_bill_id").notNull().references(() => purchaseBills.id, { onDelete: "restrict" }),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  ...audited(),
}, (table) => [uniqueIndex("vendor_payment_bill_uq").on(table.vendorPaymentId, table.purchaseBillId)]);

export const purchaseReturns = pgTable("purchase_returns", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  vendorId: uuid("vendor_id").notNull().references(() => vendors.id, { onDelete: "restrict" }),
  purchaseBillId: uuid("purchase_bill_id").references(() => purchaseBills.id, { onDelete: "set null" }),
  returnNumber: varchar("return_number", { length: 60 }).notNull(),
  returnedAt: timestamp("returned_at", { withTimezone: true }).notNull(),
  status: purchaseStatusEnum("status").notNull().default("draft"),
  total: numeric("total", { precision: 18, scale: 2 }).notNull().default("0"),
  ...audited(),
}, (table) => [uniqueIndex("purchase_return_org_number_uq").on(table.organizationId, table.returnNumber)]);

export const purchaseReturnLines = pgTable("purchase_return_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  purchaseReturnId: uuid("purchase_return_id").notNull().references(() => purchaseReturns.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "restrict" }),
  quantity: numeric("quantity", { precision: 18, scale: 4 }).notNull(),
  unitCost: numeric("unit_cost", { precision: 18, scale: 4 }).notNull(),
  reason: text("reason"),
  ...audited(),
});
