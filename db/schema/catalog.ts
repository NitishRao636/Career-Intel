import { boolean, index, integer, numeric, pgEnum, pgTable, text, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { audited, entityStatusEnum, organizations } from "./core";

export const productTypeEnum = pgEnum("product_type", ["stock", "service", "bundle", "non_stock"]);
export const valuationMethodEnum = pgEnum("valuation_method", ["fifo", "weighted_average"]);

export const units = pgTable("units", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 50 }).notNull(),
  symbol: varchar("symbol", { length: 12 }).notNull(),
  decimalPlaces: integer("decimal_places").notNull().default(0),
  ...audited(),
}, (table) => [uniqueIndex("units_org_name_uq").on(table.organizationId, table.name)]);

export const brands = pgTable("brands", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  ...audited(),
}, (table) => [uniqueIndex("brands_org_name_uq").on(table.organizationId, table.name)]);

export const productCategories = pgTable("product_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  parentId: uuid("parent_id"),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  ...audited(),
}, (table) => [uniqueIndex("product_categories_org_name_uq").on(table.organizationId, table.name), index("product_categories_parent_idx").on(table.parentId)]);

export const taxRates = pgTable("tax_rates", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 80 }).notNull(),
  rate: numeric("rate", { precision: 7, scale: 4 }).notNull(),
  cgstRate: numeric("cgst_rate", { precision: 7, scale: 4 }).notNull().default("0"),
  sgstRate: numeric("sgst_rate", { precision: 7, scale: 4 }).notNull().default("0"),
  igstRate: numeric("igst_rate", { precision: 7, scale: 4 }).notNull().default("0"),
  isInclusive: boolean("is_inclusive").notNull().default(false),
  ...audited(),
}, (table) => [uniqueIndex("tax_rates_org_name_uq").on(table.organizationId, table.name)]);

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id").references(() => productCategories.id, { onDelete: "set null" }),
  brandId: uuid("brand_id").references(() => brands.id, { onDelete: "set null" }),
  unitId: uuid("unit_id").references(() => units.id, { onDelete: "restrict" }),
  taxRateId: uuid("tax_rate_id").references(() => taxRates.id, { onDelete: "set null" }),
  sku: varchar("sku", { length: 80 }).notNull(),
  name: varchar("name", { length: 180 }).notNull(),
  description: text("description"),
  type: productTypeEnum("type").notNull().default("stock"),
  hsnSac: varchar("hsn_sac", { length: 20 }),
  purchasePrice: numeric("purchase_price", { precision: 18, scale: 4 }).notNull().default("0"),
  sellingPrice: numeric("selling_price", { precision: 18, scale: 4 }).notNull().default("0"),
  reorderLevel: numeric("reorder_level", { precision: 18, scale: 4 }).notNull().default("0"),
  minimumStock: numeric("minimum_stock", { precision: 18, scale: 4 }).notNull().default("0"),
  maximumStock: numeric("maximum_stock", { precision: 18, scale: 4 }),
  valuationMethod: valuationMethodEnum("valuation_method").notNull().default("fifo"),
  trackBatches: boolean("track_batches").notNull().default(false),
  trackSerials: boolean("track_serials").notNull().default(false),
  isTaxable: boolean("is_taxable").notNull().default(true),
  status: entityStatusEnum("status").notNull().default("active"),
  ...audited(),
}, (table) => [uniqueIndex("products_org_sku_uq").on(table.organizationId, table.sku), index("products_org_name_idx").on(table.organizationId, table.name), index("products_category_idx").on(table.categoryId)]);

export const productVariants = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  sku: varchar("sku", { length: 80 }).notNull(),
  name: varchar("name", { length: 180 }).notNull(),
  attributes: text("attributes").notNull(),
  purchasePrice: numeric("purchase_price", { precision: 18, scale: 4 }),
  sellingPrice: numeric("selling_price", { precision: 18, scale: 4 }),
  ...audited(),
}, (table) => [uniqueIndex("product_variants_sku_uq").on(table.sku), index("product_variants_product_idx").on(table.productId)]);

export const productBarcodes = pgTable("product_barcodes", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "cascade" }),
  value: varchar("value", { length: 128 }).notNull().unique(),
  format: varchar("format", { length: 30 }).notNull().default("code128"),
  ...audited(),
});

export const productImages = pgTable("product_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  altText: varchar("alt_text", { length: 200 }),
  sortOrder: integer("sort_order").notNull().default(0),
  ...audited(),
});

export const productBundles = pgTable("product_bundles", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull().unique().references(() => products.id, { onDelete: "cascade" }),
  ...audited(),
});

export const productBundleItems = pgTable("product_bundle_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  bundleId: uuid("bundle_id").notNull().references(() => productBundles.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "restrict" }),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "restrict" }),
  quantity: numeric("quantity", { precision: 18, scale: 4 }).notNull(),
  ...audited(),
}, (table) => [uniqueIndex("bundle_item_uq").on(table.bundleId, table.productId, table.variantId)]);
