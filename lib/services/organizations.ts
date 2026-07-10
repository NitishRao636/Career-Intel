import "server-only";

import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { auditLogs, fiscalYears, membershipRoles, memberships, organizations, permissions, rolePermissions, roles, warehouses } from "@/db/schema";
import { defaultRoleGrants, defaultRoles, permissionDefinitions, permissionKey } from "@/lib/permissions/catalog";
import type { CreateOrganizationInput } from "@/lib/validations/organization";

function slugify(value: string) {
  return value.toLocaleLowerCase("en-US").trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 72) || "workspace";
}

function fiscalBounds(now = new Date()) {
  const year = now.getUTCMonth() < 3 ? now.getUTCFullYear() - 1 : now.getUTCFullYear();
  return { name: `FY ${year}-${String(year + 1).slice(-2)}`, startsOn: new Date(Date.UTC(year, 3, 1)), endsOn: new Date(Date.UTC(year + 1, 2, 31, 23, 59, 59)) };
}

export async function createOrganization(input: CreateOrganizationInput, userId: string) {
  const baseSlug = slugify(input.name);
  const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 6)}`;

  return db.transaction(async (tx) => {
    await tx.insert(permissions).values(permissionDefinitions.map(([resource, action]) => ({ resource, action, description: `${action} ${resource}` }))).onConflictDoNothing();
    const permissionRows = await tx.select().from(permissions);
    const permissionIds = new Map(permissionRows.map((row) => [permissionKey(row.resource as never, row.action as never), row.id]));

    const [organization] = await tx.insert(organizations).values({
      name: input.name,
      legalName: input.legalName || null,
      slug,
      currencyCode: input.currencyCode,
      timezone: input.timezone,
      settings: { businessType: input.businessType },
      createdBy: userId,
      updatedBy: userId,
    }).returning();

    const [membership] = await tx.insert(memberships).values({ organizationId: organization.id, userId, status: "active", createdBy: userId, updatedBy: userId }).returning();
    const createdRoles = await tx.insert(roles).values(defaultRoles.map(([key, name, description]) => ({ organizationId: organization.id, key, name, description, isSystem: true, createdBy: userId, updatedBy: userId }))).returning();
    const roleByKey = new Map(createdRoles.map((role) => [role.key, role.id]));
    const grants = Object.entries(defaultRoleGrants).flatMap(([roleKey, permissionKeys]) => permissionKeys.map((key) => ({ roleId: roleByKey.get(roleKey)!, permissionId: permissionIds.get(key)! }))).filter((grant) => grant.permissionId);
    if (grants.length) await tx.insert(rolePermissions).values(grants).onConflictDoNothing();
    await tx.insert(membershipRoles).values({ membershipId: membership.id, roleId: roleByKey.get("owner")! });

    const fiscal = fiscalBounds();
    await tx.insert(fiscalYears).values({ organizationId: organization.id, ...fiscal, createdBy: userId, updatedBy: userId });
    await tx.insert(warehouses).values({ organizationId: organization.id, code: "MAIN", name: "Main Warehouse", createdBy: userId, updatedBy: userId });
    await tx.insert(auditLogs).values({ organizationId: organization.id, actorId: userId, action: "create", entityType: "organization", entityId: organization.id, after: { name: organization.name, slug: organization.slug } });
    return organization;
  });
}

export async function getUserOrganizations(userId: string) {
  return db.select({ id: organizations.id, name: organizations.name, slug: organizations.slug, logoUrl: organizations.logoUrl, currencyCode: organizations.currencyCode })
    .from(memberships).innerJoin(organizations, eq(memberships.organizationId, organizations.id))
    .where(and(eq(memberships.userId, userId), eq(memberships.status, "active")));
}
