import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().trim().min(2, "Business name must be at least 2 characters.").max(160),
  legalName: z.string().trim().max(200).optional(),
  businessType: z.enum(["retail", "wholesale", "manufacturing", "restaurant", "services", "other"]),
  currencyCode: z.string().regex(/^[A-Z]{3}$/, "Use a 3-letter currency code.").default("INR"),
  timezone: z.string().min(3).max(64).default("Asia/Kolkata"),
});
export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
