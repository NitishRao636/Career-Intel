import "server-only";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db/client";
import { membershipRoles, memberships, permissions, rolePermissions, roles } from "@/db/schema";
import type { PermissionAction, PermissionResource } from "@/lib/permissions/catalog";

export class AuthorizationError extends Error {
  constructor(message = "You do not have permission to perform this action.") { super(message); }
}

export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new AuthorizationError("Please sign in to continue.");
  return session;
}

export async function requireOrganizationMember(organizationId: string, userId?: string) {
  const resolvedUserId = userId ?? (await requireSession()).user.id;
  const [membership] = await db.select().from(memberships).where(and(eq(memberships.organizationId, organizationId), eq(memberships.userId, resolvedUserId), eq(memberships.status, "active"))).limit(1);
  if (!membership) throw new AuthorizationError("You are not an active member of this workspace.");
  return membership;
}

export async function requirePermission(organizationId: string, resource: PermissionResource, action: PermissionAction) {
  const session = await requireSession();
  const membership = await requireOrganizationMember(organizationId, session.user.id);
  const grant = await db
    .select({ id: permissions.id })
    .from(membershipRoles)
    .innerJoin(roles, eq(membershipRoles.roleId, roles.id))
    .innerJoin(rolePermissions, eq(roles.id, rolePermissions.roleId))
    .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
    .where(and(eq(membershipRoles.membershipId, membership.id), eq(permissions.resource, resource), eq(permissions.action, action)))
    .limit(1);
  if (!grant[0]) throw new AuthorizationError();
  return { session, membership };
}
