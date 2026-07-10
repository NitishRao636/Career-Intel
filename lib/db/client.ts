import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const connectionString = process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:5432/business_ops";
// This inert development fallback permits type-checking and production builds without credentials.
// Any server request that needs persistence still requires DATABASE_URL to point at Neon/Postgres.

/** One pooled client per server process; Neon pooled URLs work in serverless runtimes. */
const globalForDb = globalThis as unknown as { sql?: postgres.Sql };
export const sql = globalForDb.sql ?? postgres(connectionString, { max: 10, prepare: false });
if (process.env.NODE_ENV !== "production") globalForDb.sql = sql;

export const db = drizzle({ client: sql, schema });
export type Database = typeof db;
