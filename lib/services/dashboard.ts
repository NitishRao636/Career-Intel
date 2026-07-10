import "server-only";

import { and, desc, eq, gte, inArray, ne } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { expenses, products, purchaseBills, salesInvoiceLines, salesInvoices, salesOrders, stockBalances } from "@/db/schema";

function number(value: string | number | null | undefined) { return Number(value ?? 0); }
function dayStart(timeZone: string) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const part = (type: string) => Number(parts.find((item) => item.type === type)?.value ?? 0);
  const localNowAsUtc = Date.UTC(part("year"), part("month") - 1, part("day"), part("hour"), part("minute"), part("second"));
  const offset = localNowAsUtc - now.getTime();
  const start = new Date(Date.UTC(part("year"), part("month") - 1, part("day")) - offset);
  return { start, end: new Date(start.getTime() + 86_400_000) };
}
function monthKey(date: Date, timeZone: string) { return new Intl.DateTimeFormat("en-US", { timeZone, month: "short" }).format(date); }

export type DashboardData = Awaited<ReturnType<typeof getDashboardData>>;

export async function getDashboardData(organizationId: string, timeZone: string) {
  const { start: todayStart, end: tomorrowStart } = dayStart(timeZone);
  const sixMonthsAgo = new Date(todayStart); sixMonthsAgo.setUTCMonth(sixMonthsAgo.getUTCMonth() - 5); sixMonthsAgo.setUTCDate(1);
  const [recentInvoices, bills, currentExpenses, orders, allProducts, balances, lineItems] = await Promise.all([
    db.select().from(salesInvoices).where(and(eq(salesInvoices.organizationId, organizationId), gte(salesInvoices.issuedAt, sixMonthsAgo), ne(salesInvoices.status, "voided"))).orderBy(desc(salesInvoices.issuedAt)),
    db.select().from(purchaseBills).where(and(eq(purchaseBills.organizationId, organizationId), gte(purchaseBills.billedAt, sixMonthsAgo), ne(purchaseBills.status, "voided"))),
    db.select().from(expenses).where(and(eq(expenses.organizationId, organizationId), gte(expenses.expenseDate, sixMonthsAgo))).orderBy(desc(expenses.expenseDate)),
    db.select().from(salesOrders).where(eq(salesOrders.organizationId, organizationId)),
    db.select({ id: products.id, name: products.name, sku: products.sku, minimumStock: products.minimumStock, reorderLevel: products.reorderLevel, status: products.status }).from(products).where(and(eq(products.organizationId, organizationId), eq(products.status, "active"))),
    db.select({ productId: stockBalances.productId, quantityOnHand: stockBalances.quantityOnHand, averageCost: stockBalances.averageCost }).from(stockBalances).where(eq(stockBalances.organizationId, organizationId)),
    db.select({ productId: salesInvoiceLines.productId, quantity: salesInvoiceLines.quantity, lineTotal: salesInvoiceLines.lineTotal }).from(salesInvoiceLines).innerJoin(salesInvoices, eq(salesInvoiceLines.salesInvoiceId, salesInvoices.id)).where(and(eq(salesInvoices.organizationId, organizationId), gte(salesInvoices.issuedAt, sixMonthsAgo), ne(salesInvoices.status, "voided"))),
  ]);

  const isToday = (value: Date) => value >= todayStart && value < tomorrowStart;
  const todaySales = recentInvoices.filter((invoice) => isToday(invoice.issuedAt)).reduce((sum, invoice) => sum + number(invoice.grandTotal), 0);
  const todayPurchases = bills.filter((bill) => isToday(bill.billedAt)).reduce((sum, bill) => sum + number(bill.grandTotal), 0);
  const todayExpenses = currentExpenses.filter((expense) => isToday(expense.expenseDate)).reduce((sum, expense) => sum + number(expense.amount) + number(expense.taxAmount), 0);
  const monthlyRevenue = recentInvoices.reduce((sum, invoice) => sum + number(invoice.grandTotal), 0);
  const monthlyExpenses = currentExpenses.filter((expense) => expense.expenseDate >= new Date(todayStart.getUTCFullYear(), todayStart.getUTCMonth(), 1)).reduce((sum, expense) => sum + number(expense.amount) + number(expense.taxAmount), 0);
  const outstandingReceivables = recentInvoices.filter((invoice) => !["paid", "voided"].includes(invoice.status)).reduce((sum, invoice) => sum + Math.max(0, number(invoice.grandTotal) - number(invoice.amountPaid)), 0);
  const outstandingPayables = bills.filter((bill) => !["paid", "voided"].includes(bill.status)).reduce((sum, bill) => sum + Math.max(0, number(bill.grandTotal) - number(bill.amountPaid)), 0);

  const quantityByProduct = new Map<string, number>(); const valueByProduct = new Map<string, number>();
  for (const balance of balances) { quantityByProduct.set(balance.productId, (quantityByProduct.get(balance.productId) ?? 0) + number(balance.quantityOnHand)); valueByProduct.set(balance.productId, (valueByProduct.get(balance.productId) ?? 0) + number(balance.quantityOnHand) * number(balance.averageCost)); }
  const lowStockItems = allProducts.filter((product) => (quantityByProduct.get(product.id) ?? 0) <= (number(product.reorderLevel) || number(product.minimumStock)));
  const outOfStock = allProducts.filter((product) => (quantityByProduct.get(product.id) ?? 0) <= 0);
  const inventoryValue = [...valueByProduct.values()].reduce((sum, value) => sum + value, 0);

  const productNames = new Map(allProducts.map((product) => [product.id, product.name])); const productPerformance = new Map<string, { quantity: number; revenue: number }>();
  for (const line of lineItems) if (line.productId) { const current = productPerformance.get(line.productId) ?? { quantity: 0, revenue: 0 }; current.quantity += number(line.quantity); current.revenue += number(line.lineTotal); productPerformance.set(line.productId, current); }
  const topProducts = [...productPerformance.entries()].map(([id, value]) => ({ name: productNames.get(id) ?? "Uncatalogued item", ...value })).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  const monthlyMap = new Map<string, { label: string; revenue: number; expenses: number }>();
  for (let index = 5; index >= 0; index--) { const date = new Date(todayStart); date.setUTCMonth(date.getUTCMonth() - index); const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`; monthlyMap.set(key, { label: monthKey(date, timeZone), revenue: 0, expenses: 0 }); }
  for (const invoice of recentInvoices) { const key = `${invoice.issuedAt.getUTCFullYear()}-${invoice.issuedAt.getUTCMonth()}`; const bucket = monthlyMap.get(key); if (bucket) bucket.revenue += number(invoice.grandTotal); }
  for (const expense of currentExpenses) { const key = `${expense.expenseDate.getUTCFullYear()}-${expense.expenseDate.getUTCMonth()}`; const bucket = monthlyMap.get(key); if (bucket) bucket.expenses += number(expense.amount) + number(expense.taxAmount); }

  return {
    metrics: { todaySales, todayPurchases, todayExpenses, todayProfit: todaySales - todayPurchases - todayExpenses, monthlyRevenue, monthlyExpenses, monthlyProfit: monthlyRevenue - monthlyExpenses, outstandingReceivables, outstandingPayables, inventoryValue, lowStock: lowStockItems.length, outOfStock: outOfStock.length, pendingOrders: orders.filter((order) => ["draft", "sent", "confirmed", "partially_fulfilled"].includes(order.status)).length, completedOrders: orders.filter((order) => order.status === "fulfilled").length },
    chart: [...monthlyMap.values()],
    topProducts,
    lowStockItems: lowStockItems.slice(0, 6).map((product) => ({ id: product.id, name: product.name, sku: product.sku, available: quantityByProduct.get(product.id) ?? 0, reorderLevel: number(product.reorderLevel) || number(product.minimumStock) })),
    recentInvoices: recentInvoices.slice(0, 5).map((invoice) => ({ id: invoice.id, invoiceNumber: invoice.invoiceNumber, status: invoice.status, issuedAt: invoice.issuedAt.toISOString(), total: number(invoice.grandTotal), paid: number(invoice.amountPaid) })),
  };
}
