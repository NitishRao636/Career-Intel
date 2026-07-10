import { boolean, index, numeric, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { products, productVariants } from "./catalog";
import { audited, organizations, storageLocations, warehouses } from "./core";

export const stockMovementTypeEnum = pgEnum("stock_movement_type", ["opening", "purchase_receipt", "sale_delivery", "sale_return", "purchase_return", "transfer_out", "transfer_in", "adjustment_in", "adjustment_out", "production_in", "production_out"]);
export const stockMovementStatusEnum = pgEnum("stock_movement_status", ["draft", "posted", "voided"]);
export const serialStatusEnum = pgEnum("serial_status", ["available", "reserved", "sold", "returned", "scrapped"]);
export const countStatusEnum = pgEnum("count_status", ["draft", "in_progress", "approved", "posted", "cancelled"]);

export const productBatches = pgTable("product_batches", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  batchNumber: varchar("batch_number", { length: 100 }).notNull(),
  manufacturedOn: timestamp("manufactured_on", { withTimezone: true }),
  expiresOn: timestamp("expires_on", { withTimezone: true }),
  costPerUnit: numeric("cost_per_unit", { precision: 18, scale: 4 }),
  ...audited(),
}, (table) => [uniqueIndex("batches_product_number_uq").on(table.productId, table.batchNumber), index("batches_expiry_idx").on(table.organizationId, table.expiresOn)]);

export const productSerials = pgTable("product_serials", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  batchId: uuid("batch_id").references(() => productBatches.id, { onDelete: "set null" }),
  serialNumber: varchar("serial_number", { length: 150 }).notNull(),
  status: serialStatusEnum("status").notNull().default("available"),
  ...audited(),
}, (table) => [uniqueIndex("serials_org_number_uq").on(table.organizationId, table.serialNumber), index("serials_product_status_idx").on(table.productId, table.status)]);

export const stockBalances = pgTable("stock_balances", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  warehouseId: uuid("warehouse_id").notNull().references(() => warehouses.id, { onDelete: "cascade" }),
  locationId: uuid("location_id").references(() => storageLocations.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "cascade" }),
  batchId: uuid("batch_id").references(() => productBatches.id, { onDelete: "cascade" }),
  quantityOnHand: numeric("quantity_on_hand", { precision: 18, scale: 4 }).notNull().default("0"),
  quantityReserved: numeric("quantity_reserved", { precision: 18, scale: 4 }).notNull().default("0"),
  averageCost: numeric("average_cost", { precision: 18, scale: 4 }).notNull().default("0"),
  ...audited(),
}, (table) => [uniqueIndex("stock_balance_unique_location_item_batch").on(table.warehouseId, table.locationId, table.productId, table.variantId, table.batchId), index("stock_balances_org_product_idx").on(table.organizationId, table.productId)]);

export const stockMovements = pgTable("stock_movements", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  movementNumber: varchar("movement_number", { length: 60 }).notNull(),
  type: stockMovementTypeEnum("type").notNull(),
  status: stockMovementStatusEnum("status").notNull().default("draft"),
  sourceWarehouseId: uuid("source_warehouse_id").references(() => warehouses.id, { onDelete: "restrict" }),
  destinationWarehouseId: uuid("destination_warehouse_id").references(() => warehouses.id, { onDelete: "restrict" }),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
  referenceType: varchar("reference_type", { length: 60 }),
  referenceId: uuid("reference_id"),
  notes: text("notes"),
  postedAt: timestamp("posted_at", { withTimezone: true }),
  ...audited(),
}, (table) => [uniqueIndex("stock_movement_org_number_uq").on(table.organizationId, table.movementNumber), index("stock_movement_org_date_idx").on(table.organizationId, table.occurredAt), index("stock_movement_reference_idx").on(table.referenceType, table.referenceId)]);

export const stockMovementLines = pgTable("stock_movement_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  movementId: uuid("movement_id").notNull().references(() => stockMovements.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "restrict" }),
  batchId: uuid("batch_id").references(() => productBatches.id, { onDelete: "restrict" }),
  sourceLocationId: uuid("source_location_id").references(() => storageLocations.id, { onDelete: "restrict" }),
  destinationLocationId: uuid("destination_location_id").references(() => storageLocations.id, { onDelete: "restrict" }),
  quantity: numeric("quantity", { precision: 18, scale: 4 }).notNull(),
  unitCost: numeric("unit_cost", { precision: 18, scale: 4 }).notNull().default("0"),
  ...audited(),
}, (table) => [index("stock_movement_lines_product_idx").on(table.productId), index("stock_movement_lines_movement_idx").on(table.movementId)]);

export const stockMovementLineSerials = pgTable("stock_movement_line_serials", {
  stockMovementLineId: uuid("stock_movement_line_id").notNull().references(() => stockMovementLines.id, { onDelete: "cascade" }),
  serialId: uuid("serial_id").notNull().references(() => productSerials.id, { onDelete: "restrict" }),
}, (table) => [uniqueIndex("stock_movement_line_serial_uq").on(table.stockMovementLineId, table.serialId)]);

export const inventoryCounts = pgTable("inventory_counts", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  warehouseId: uuid("warehouse_id").notNull().references(() => warehouses.id, { onDelete: "restrict" }),
  countNumber: varchar("count_number", { length: 60 }).notNull(),
  status: countStatusEnum("status").notNull().default("draft"),
  countedAt: timestamp("counted_at", { withTimezone: true }),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
  ...audited(),
}, (table) => [uniqueIndex("inventory_count_org_number_uq").on(table.organizationId, table.countNumber)]);

export const inventoryCountLines = pgTable("inventory_count_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  inventoryCountId: uuid("inventory_count_id").notNull().references(() => inventoryCounts.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "restrict" }),
  batchId: uuid("batch_id").references(() => productBatches.id, { onDelete: "restrict" }),
  expectedQuantity: numeric("expected_quantity", { precision: 18, scale: 4 }).notNull(),
  countedQuantity: numeric("counted_quantity", { precision: 18, scale: 4 }),
  ...audited(),
}, (table) => [uniqueIndex("count_line_unique_item_batch").on(table.inventoryCountId, table.productId, table.variantId, table.batchId)]);

export const inventoryValueLayers = pgTable("inventory_value_layers", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "restrict" }),
  warehouseId: uuid("warehouse_id").notNull().references(() => warehouses.id, { onDelete: "restrict" }),
  sourceMovementLineId: uuid("source_movement_line_id").notNull().references(() => stockMovementLines.id, { onDelete: "restrict" }),
  originalQuantity: numeric("original_quantity", { precision: 18, scale: 4 }).notNull(),
  remainingQuantity: numeric("remaining_quantity", { precision: 18, scale: 4 }).notNull(),
  unitCost: numeric("unit_cost", { precision: 18, scale: 4 }).notNull(),
  receivedAt: timestamp("received_at", { withTimezone: true }).notNull(),
  ...audited(),
}, (table) => [index("inventory_value_layer_fifo_idx").on(table.productId, table.warehouseId, table.receivedAt)]);
