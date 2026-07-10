/** Permission taxonomy is centrally owned so UI, route guards, and seed data cannot drift. */
export const permissionDefinitions = [
  ["dashboard", "read"],
  ["crm", "read"], ["crm", "create"], ["crm", "update"], ["crm", "delete"], ["crm", "export"],
  ["vendors", "read"], ["vendors", "create"], ["vendors", "update"], ["vendors", "delete"], ["vendors", "export"],
  ["products", "read"], ["products", "create"], ["products", "update"], ["products", "delete"], ["products", "export"],
  ["inventory", "read"], ["inventory", "create"], ["inventory", "update"], ["inventory", "adjust"], ["inventory", "export"],
  ["sales", "read"], ["sales", "create"], ["sales", "update"], ["sales", "approve"], ["sales", "void"], ["sales", "export"],
  ["purchases", "read"], ["purchases", "create"], ["purchases", "update"], ["purchases", "approve"], ["purchases", "void"], ["purchases", "export"],
  ["finance", "read"], ["finance", "create"], ["finance", "update"], ["finance", "approve"], ["finance", "export"],
  ["hr", "read"], ["hr", "create"], ["hr", "update"], ["hr", "approve"], ["hr", "export"],
  ["projects", "read"], ["projects", "create"], ["projects", "update"], ["projects", "delete"],
  ["documents", "read"], ["documents", "create"], ["documents", "update"], ["documents", "delete"],
  ["reports", "read"], ["reports", "export"], ["reports", "schedule"],
  ["settings", "read"], ["settings", "update"], ["settings", "manage_users"], ["settings", "manage_roles"],
] as const;

export type PermissionResource = (typeof permissionDefinitions)[number][0];
export type PermissionAction = (typeof permissionDefinitions)[number][1];
export type PermissionKey = `${PermissionResource}:${PermissionAction}`;
export const permissionKey = (resource: PermissionResource, action: PermissionAction): PermissionKey => `${resource}:${action}`;

const all = permissionDefinitions.map(([resource, action]) => permissionKey(resource, action));
const only = (...resources: PermissionResource[]) => all.filter((key) => resources.includes(key.split(":")[0] as PermissionResource));

/** Initial tenant policy. Admins can change role assignments and grants from Settings later. */
export const defaultRoleGrants: Record<string, PermissionKey[]> = {
  owner: all,
  super_admin: all,
  manager: all.filter((key) => !key.startsWith("settings:manage_")),
  sales_executive: only("dashboard", "crm", "products", "sales", "documents", "reports").filter((key) => !key.endsWith(":void") && !key.endsWith(":approve") && !key.endsWith(":schedule")),
  cashier: ["dashboard:read", "crm:read", "products:read", "sales:read", "sales:create", "sales:update", "documents:read"],
  inventory_manager: only("dashboard", "products", "inventory", "vendors", "purchases", "reports").filter((key) => !key.endsWith(":approve") && !key.endsWith(":schedule")),
  accountant: only("dashboard", "finance", "sales", "purchases", "reports", "documents").filter((key) => !key.endsWith(":void") && !key.endsWith(":schedule")),
  employee: ["dashboard:read", "projects:read", "projects:update", "documents:read", "hr:read"],
  viewer: ["dashboard:read", "crm:read", "vendors:read", "products:read", "inventory:read", "sales:read", "purchases:read", "finance:read", "reports:read", "projects:read", "documents:read"],
};

export const defaultRoles = [
  ["owner", "Owner", "Full ownership, including billing and access control."],
  ["super_admin", "Super Admin", "Unrestricted operational administration."],
  ["manager", "Manager", "Cross-functional management without access-control administration."],
  ["sales_executive", "Sales Executive", "Customer and sales workflow access."],
  ["cashier", "Cashier", "Point-of-sale billing and receipt access."],
  ["inventory_manager", "Inventory Manager", "Stock, products and purchase receiving access."],
  ["accountant", "Accountant", "Finance, accounting and statutory reporting access."],
  ["employee", "Employee", "Personal work, HR and project participation access."],
  ["viewer", "Viewer", "Read-only operational visibility."],
] as const;
