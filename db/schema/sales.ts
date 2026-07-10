import { boolean, index, numeric, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { products, productVariants, taxRates } from "./catalog";
import { audited, organizations } from "./core";
import { customers } from "./parties";

export const documentStatusEnum = pgEnum("sales_document_status", ["draft", "sent", "confirmed", "partially_fulfilled", "fulfilled", "cancelled", "expired"]);
export const invoiceStatusEnum = pgEnum("invoice_status", ["draft", "issued", "partially_paid", "paid", "overdue", "voided"]);
export const paymentMethodEnum = pgEnum("payment_method", ["cash", "bank_transfer", "card", "upi", "cheque", "gateway", "credit"]);

export const quotations = pgTable("quotations", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "restrict" }),
  quotationNumber: varchar("quotation_number", { length: 60 }).notNull(),
  status: documentStatusEnum("status").notNull().default("draft"),
  issuedAt: timestamp("issued_at", { withTimezone: true }).notNull(),
  validUntil: timestamp("valid_until", { withTimezone: true }),
  subtotal: numeric("subtotal", { precision: 18, scale: 2 }).notNull().default("0"),
  discountTotal: numeric("discount_total", { precision: 18, scale: 2 }).notNull().default("0"),
  taxTotal: numeric("tax_total", { precision: 18, scale: 2 }).notNull().default("0"),
  grandTotal: numeric("grand_total", { precision: 18, scale: 2 }).notNull().default("0"),
  notes: text("notes"),
  ...audited(),
}, (table) => [uniqueIndex("quotations_org_number_uq").on(table.organizationId, table.quotationNumber), index("quotations_customer_idx").on(table.customerId)]);

export const quotationLines = pgTable("quotation_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  quotationId: uuid("quotation_id").notNull().references(() => quotations.id, { onDelete: "cascade" }),
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

export const salesOrders = pgTable("sales_orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "restrict" }),
  quotationId: uuid("quotation_id").references(() => quotations.id, { onDelete: "set null" }),
  orderNumber: varchar("order_number", { length: 60 }).notNull(),
  status: documentStatusEnum("status").notNull().default("draft"),
  orderedAt: timestamp("ordered_at", { withTimezone: true }).notNull(),
  expectedDeliveryAt: timestamp("expected_delivery_at", { withTimezone: true }),
  subtotal: numeric("subtotal", { precision: 18, scale: 2 }).notNull().default("0"),
  discountTotal: numeric("discount_total", { precision: 18, scale: 2 }).notNull().default("0"),
  taxTotal: numeric("tax_total", { precision: 18, scale: 2 }).notNull().default("0"),
  grandTotal: numeric("grand_total", { precision: 18, scale: 2 }).notNull().default("0"),
  notes: text("notes"),
  ...audited(),
}, (table) => [uniqueIndex("sales_orders_org_number_uq").on(table.organizationId, table.orderNumber), index("sales_orders_customer_status_idx").on(table.customerId, table.status)]);

export const salesOrderLines = pgTable("sales_order_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  salesOrderId: uuid("sales_order_id").notNull().references(() => salesOrders.id, { onDelete: "cascade" }),
  productId: uuid("product_id").references(() => products.id, { onDelete: "restrict" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "restrict" }),
  description: text("description").notNull(),
  quantity: numeric("quantity", { precision: 18, scale: 4 }).notNull(),
  fulfilledQuantity: numeric("fulfilled_quantity", { precision: 18, scale: 4 }).notNull().default("0"),
  unitPrice: numeric("unit_price", { precision: 18, scale: 4 }).notNull(),
  taxRateId: uuid("tax_rate_id").references(() => taxRates.id, { onDelete: "set null" }),
  lineTotal: numeric("line_total", { precision: 18, scale: 2 }).notNull(),
  ...audited(),
});

export const deliveryChallans = pgTable("delivery_challans", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "restrict" }),
  salesOrderId: uuid("sales_order_id").references(() => salesOrders.id, { onDelete: "set null" }),
  challanNumber: varchar("challan_number", { length: 60 }).notNull(),
  status: documentStatusEnum("status").notNull().default("draft"),
  deliveredAt: timestamp("delivered_at", { withTimezone: true }),
  ...audited(),
}, (table) => [uniqueIndex("delivery_challans_org_number_uq").on(table.organizationId, table.challanNumber)]);

export const deliveryChallanLines = pgTable("delivery_challan_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  deliveryChallanId: uuid("delivery_challan_id").notNull().references(() => deliveryChallans.id, { onDelete: "cascade" }),
  salesOrderLineId: uuid("sales_order_line_id").references(() => salesOrderLines.id, { onDelete: "set null" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "restrict" }),
  quantity: numeric("quantity", { precision: 18, scale: 4 }).notNull(),
  ...audited(),
});

export const salesInvoices = pgTable("sales_invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "restrict" }),
  salesOrderId: uuid("sales_order_id").references(() => salesOrders.id, { onDelete: "set null" }),
  invoiceNumber: varchar("invoice_number", { length: 60 }).notNull(),
  status: invoiceStatusEnum("status").notNull().default("draft"),
  issuedAt: timestamp("issued_at", { withTimezone: true }).notNull(),
  dueAt: timestamp("due_at", { withTimezone: true }),
  billingAddress: text("billing_address").notNull(),
  shippingAddress: text("shipping_address"),
  subtotal: numeric("subtotal", { precision: 18, scale: 2 }).notNull().default("0"),
  discountTotal: numeric("discount_total", { precision: 18, scale: 2 }).notNull().default("0"),
  taxTotal: numeric("tax_total", { precision: 18, scale: 2 }).notNull().default("0"),
  roundOff: numeric("round_off", { precision: 18, scale: 2 }).notNull().default("0"),
  grandTotal: numeric("grand_total", { precision: 18, scale: 2 }).notNull().default("0"),
  amountPaid: numeric("amount_paid", { precision: 18, scale: 2 }).notNull().default("0"),
  notes: text("notes"),
  ...audited(),
}, (table) => [uniqueIndex("sales_invoice_org_number_uq").on(table.organizationId, table.invoiceNumber), index("sales_invoice_customer_status_idx").on(table.customerId, table.status), index("sales_invoice_due_idx").on(table.organizationId, table.dueAt)]);

export const salesInvoiceLines = pgTable("sales_invoice_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  salesInvoiceId: uuid("sales_invoice_id").notNull().references(() => salesInvoices.id, { onDelete: "cascade" }),
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

export const customerPayments = pgTable("customer_payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "restrict" }),
  paymentNumber: varchar("payment_number", { length: 60 }).notNull(),
  method: paymentMethodEnum("method").notNull(),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  receivedAt: timestamp("received_at", { withTimezone: true }).notNull(),
  reference: varchar("reference", { length: 120 }),
  notes: text("notes"),
  ...audited(),
}, (table) => [uniqueIndex("customer_payment_org_number_uq").on(table.organizationId, table.paymentNumber), index("customer_payment_customer_date_idx").on(table.customerId, table.receivedAt)]);

export const customerPaymentAllocations = pgTable("customer_payment_allocations", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerPaymentId: uuid("customer_payment_id").notNull().references(() => customerPayments.id, { onDelete: "cascade" }),
  salesInvoiceId: uuid("sales_invoice_id").notNull().references(() => salesInvoices.id, { onDelete: "restrict" }),
  amount: numeric("amount", { precision: 18, scale: 2 }).notNull(),
  ...audited(),
}, (table) => [uniqueIndex("customer_payment_invoice_uq").on(table.customerPaymentId, table.salesInvoiceId)]);

export const salesReturns = pgTable("sales_returns", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "restrict" }),
  salesInvoiceId: uuid("sales_invoice_id").references(() => salesInvoices.id, { onDelete: "set null" }),
  returnNumber: varchar("return_number", { length: 60 }).notNull(),
  returnedAt: timestamp("returned_at", { withTimezone: true }).notNull(),
  status: documentStatusEnum("status").notNull().default("draft"),
  total: numeric("total", { precision: 18, scale: 2 }).notNull().default("0"),
  ...audited(),
}, (table) => [uniqueIndex("sales_return_org_number_uq").on(table.organizationId, table.returnNumber)]);

export const salesReturnLines = pgTable("sales_return_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  salesReturnId: uuid("sales_return_id").notNull().references(() => salesReturns.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "restrict" }),
  quantity: numeric("quantity", { precision: 18, scale: 4 }).notNull(),
  unitPrice: numeric("unit_price", { precision: 18, scale: 4 }).notNull(),
  reason: text("reason"),
  ...audited(),
});

export const coupons = pgTable("coupons", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  code: varchar("code", { length: 40 }).notNull(),
  isPercentage: boolean("is_percentage").notNull().default(true),
  value: numeric("value", { precision: 18, scale: 2 }).notNull(),
  minimumOrderValue: numeric("minimum_order_value", { precision: 18, scale: 2 }).notNull().default("0"),
  validFrom: timestamp("valid_from", { withTimezone: true }),
  validUntil: timestamp("valid_until", { withTimezone: true }),
  usageLimit: numeric("usage_limit", { precision: 12, scale: 0 }),
  usageCount: numeric("usage_count", { precision: 12, scale: 0 }).notNull().default("0"),
  ...audited(),
}, (table) => [uniqueIndex("coupon_org_code_uq").on(table.organizationId, table.code)]);
