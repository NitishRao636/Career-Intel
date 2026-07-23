import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from '@/lib/db';
import * as schema from '@/lib/db/schema';

export function createAuth() {
  const db = getDb();
  if (!db) {
    throw new Error('Database not available. Set DATABASE_URL environment variable.');
  }

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: schema as any,
    }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
    rateLimit: {
      enabled: true,
      max: 100,
      window: 60,
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;
