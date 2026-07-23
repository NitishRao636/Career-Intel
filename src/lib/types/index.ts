import type { roleEnum, subscriptionTierEnum } from '@/lib/db/schema/users';
import type { applicationStatusEnum, jobSourceEnum } from '@/lib/db/schema/job-applications';
import type { resumeStatusEnum, templateEnum } from '@/lib/db/schema/resumes';
import type { interviewStatusEnum, interviewTypeEnum } from '@/lib/db/schema/interviews';
import type { contactStatusEnum, relationshipEnum } from '@/lib/db/schema/networking-contacts';
import type { skillCategoryEnum, proficiencyEnum } from '@/lib/db/schema/skills';

// Re-export DB types
export type Role = typeof roleEnum.enumValues[number];
export type SubscriptionTier = typeof subscriptionTierEnum.enumValues[number];
export type ApplicationStatus = typeof applicationStatusEnum.enumValues[number];
export type JobSource = typeof jobSourceEnum.enumValues[number];
export type ResumeStatus = typeof resumeStatusEnum.enumValues[number];
export type Template = typeof templateEnum.enumValues[number];
export type InterviewStatus = typeof interviewStatusEnum.enumValues[number];
export type InterviewType = typeof interviewTypeEnum.enumValues[number];
export type ContactStatus = typeof contactStatusEnum.enumValues[number];
export type Relationship = typeof relationshipEnum.enumValues[number];
export type SkillCategory = typeof skillCategoryEnum.enumValues[number];
export type Proficiency = typeof proficiencyEnum.enumValues[number];

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// UI-specific types
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SidebarItem {
  name: string;
  href: string;
  icon: string;
  badge?: string | number;
}

export interface SelectOption {
  value: string;
  label: string;
}
