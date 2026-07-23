import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Only initialize DB when DATABASE_URL is available (runtime, not build time)
function createDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

// Lazy singleton — created on first call, reused after
let _instance: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_instance) {
    _instance = createDb();
  }
  return _instance;
}

export type Database = NonNullable<ReturnType<typeof getDb>>;
