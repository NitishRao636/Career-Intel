export const APP_NAME = 'CareerIntel';
export const APP_DESCRIPTION = 'AI Career Intelligence Platform';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    limits: {
      resumes: 1,
      atsAnalyses: 3,
      aiRequests: 10,
      coverLetters: 3,
      mockInterviews: 1,
    },
  },
  pro: {
    name: 'Pro',
    price: 19,
    limits: {
      resumes: 10,
      atsAnalyses: Infinity,
      aiRequests: 200,
      coverLetters: 25,
      mockInterviews: 10,
    },
  },
  enterprise: {
    name: 'Enterprise',
    price: 49,
    limits: {
      resumes: Infinity,
      atsAnalyses: Infinity,
      aiRequests: Infinity,
      coverLetters: Infinity,
      mockInterviews: Infinity,
    },
  },
} as const;

export const APPLICATION_STATUSES = [
  { value: 'saved', label: 'Saved', color: '#a1a1aa' },
  { value: 'applied', label: 'Applied', color: '#3b82f6' },
  { value: 'screening', label: 'Screening', color: '#f59e0b' },
  { value: 'interview', label: 'Interview', color: '#8b5cf6' },
  { value: 'offer', label: 'Offer', color: '#10b981' },
  { value: 'rejected', label: 'Rejected', color: '#ef4444' },
  { value: 'withdrawn', label: 'Withdrawn', color: '#d4d4d8' },
  { value: 'accepted', label: 'Accepted', color: '#22c55e' },
] as const;

export const RESUME_TEMPLATES = [
  { value: 'modern', label: 'Modern', description: 'Clean, contemporary design' },
  { value: 'classic', label: 'Classic', description: 'Traditional, professional layout' },
  { value: 'minimal', label: 'Minimal', description: 'Simple, content-focused' },
  { value: 'creative', label: 'Creative', description: 'Bold, unique design' },
  { value: 'executive', label: 'Executive', description: 'Senior-level, distinguished' },
  { value: 'tech', label: 'Tech', description: 'Optimized for engineering roles' },
] as const;

export const SKILL_CATEGORIES = [
  { value: 'technical', label: 'Technical' },
  { value: 'soft', label: 'Soft Skills' },
  { value: 'language', label: 'Languages' },
  { value: 'tool', label: 'Tools' },
  { value: 'framework', label: 'Frameworks' },
  { value: 'methodology', label: 'Methodologies' },
  { value: 'domain', label: 'Domain' },
  { value: 'other', label: 'Other' },
] as const;

export const PROFICIENCY_LEVELS = [
  { value: 'beginner', label: 'Beginner', score: 25 },
  { value: 'intermediate', label: 'Intermediate', score: 50 },
  { value: 'advanced', label: 'Advanced', score: 75 },
  { value: 'expert', label: 'Expert', score: 100 },
] as const;

export const KEYBOARD_SHORTCUTS = [
  { keys: ['⌘', 'K'], description: 'Open command palette' },
  { keys: ['⌘', 'N'], description: 'Create new item' },
  { keys: ['⌘', 'S'], description: 'Save current item' },
  { keys: ['⌘', '/'], description: 'Show keyboard shortcuts' },
  { keys: ['⌘', 'D'], description: 'Go to dashboard' },
  { keys: ['⌘', 'E'], description: 'Toggle sidebar' },
] as const;
