import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db/client";
import * as schema from "@/db/schema";
import { passwordResetEmail, sendTransactionalEmail, verificationEmail } from "@/lib/services/email";

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
const secret = process.env.BETTER_AUTH_SECRET ?? "local-build-only-secret-change-before-deploying-5d9e4ba1";

if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL && !process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is required when DATABASE_URL is configured for production.");
}

export const auth = betterAuth({
  baseURL,
  secret,
  database: drizzleAdapter(db, { provider: "pg", schema, usePlural: true }),
  trustedOrigins: [baseURL],
  session: {
    expiresIn: 60 * 60 * 24 * 14,
    updateAge: 60 * 60 * 24,
    cookieCache: { enabled: true, maxAge: 60 * 5 },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    maxPasswordLength: 128,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendTransactionalEmail({ to: user.email, subject: "Reset your Business Operations OS password", html: passwordResetEmail(url) });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendTransactionalEmail({ to: user.email, subject: "Verify your Business Operations OS email", html: verificationEmail(url) });
    },
  },
  rateLimit: { enabled: true, window: 60, max: 10 },
  advanced: { cookiePrefix: "boos", useSecureCookies: process.env.NODE_ENV === "production" },
});
