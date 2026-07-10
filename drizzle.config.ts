import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL ?? "postgresql://neondb_owner:npg_dQOEf2tT3KYl@ep-nameless-shape-atcfcsyz-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" },
  strict: true,
  verbose: true,
});
