import { db, sql } from "@/lib/db/client";
import { permissions } from "@/db/schema";
import { permissionDefinitions } from "@/lib/permissions/catalog";

async function seed() {
  await db.insert(permissions).values(permissionDefinitions.map(([resource, action]) => ({ resource, action, description: `${action} ${resource}` }))).onConflictDoNothing();
  console.info(`Seeded ${permissionDefinitions.length} permission definitions.`);
  await sql.end();
}

seed().catch(async (error) => { console.error(error); await sql.end({ timeout: 2 }); process.exitCode = 1; });
