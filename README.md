# CareerIntel — AI Career Intelligence Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-orange)

**Enterprise-grade AI Career Intelligence Platform**

*Build resumes • Optimize for ATS • Track applications • Prepare for interviews • Accelerate your career*

</div>

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CareerIntel Platform                       │
├─────────────┬──────────────┬──────────────┬────────────────┤
│   Next.js   │   Drizzle    │   Better     │   AI Engine    │
│  App Router  │   ORM + PG   │    Auth      │  (OpenAI)      │
├─────────────┴──────────────┴──────────────┴────────────────┤
│                       Core Modules                           │
├──────┬──────┬──────┬───────┬───────┬──────┬────────┬──────┤
│Resume│ ATS  │ Jobs │Interview│Cover │Portf │Network │Skills│
│Builder│Analyzer│Tracker│Prep   │Letter│Builder│CRM     │Mgr   │
├──────┴──────┴──────┴───────┴───────┴──────┴────────┴──────┤
│                    Advanced AI Features                      │
├──────────────┬───────────────┬──────────────────────────────┤
│  Recruiter   │   Salary      │   Resume A/B Testing          │
│  Simulator   │   Intelligence│   Portfolio Intelligence      │
│  AI Coach    │   Roadmap AI  │   Achievement Engine          │
└──────────────┴───────────────┴──────────────────────────────┘
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── forgot-password/
│   ├── (dashboard)/         # Main application
│   │   ├── dashboard/       # Analytics dashboard
│   │   ├── resume/          # AI Resume Builder
│   │   ├── ats/             # ATS Analyzer
│   │   ├── jobs/            # Job Tracker (Kanban + List)
│   │   ├── cover-letter/    # Cover Letter Generator
│   │   ├── interview/       # Interview Preparation
│   │   ├── portfolio/       # Portfolio Builder
│   │   ├── networking/      # Networking CRM
│   │   ├── certificates/    # Certificate Manager
│   │   ├── skills/          # Skill Intelligence
│   │   ├── roadmap/         # Career Roadmap
│   │   ├── reports/         # Reports & Analytics
│   │   ├── notifications/   # Notifications Center
│   │   └── settings/        # Settings & Billing
│   ├── (marketing)/         # Landing page
│   └── api/                 # API routes
│       ├── auth/            # Authentication
│       ├── resume/          # Resume CRUD
│       ├── ats/             # ATS Analysis
│       ├── job/             # Job Applications
│       └── ai/              # AI Endpoints
│           ├── coach/       # AI Career Coach
│           ├── resume-writer/ # AI Resume Writer
│           └── interview/    # AI Interview Questions
├── components/
│   ├── ui/                  # Design system (shadcn/ui)
│   ├── layout/              # Sidebar, TopBar, Layout
│   ├── shared/              # Reusable components
│   └── [module]/            # Module-specific components
├── lib/
│   ├── db/schema/           # 14 normalized DB tables
│   ├── auth/                # Better Auth config
│   ├── validations/         # Zod schemas
│   ├── hooks/               # Custom React hooks
│   ├── constants/           # App constants
│   ├── types/               # TypeScript types
│   └── utils/               # Utility functions
├── server/
│   ├── routes/              # API route handlers
│   ├── services/            # Business logic
│   ├── repositories/        # Data access layer
│   └── middleware/           # Server middleware
└── config/                  # App configuration
```

## 🎯 Modules Implemented

| Module | Pages | API | AI | Status |
|--------|-------|-----|-----|--------|
| Dashboard | ✅ | ✅ | ✅ | Complete |
| Resume Builder | ✅ | ✅ | ✅ | Complete |
| ATS Analyzer | ✅ | ✅ | ✅ | Complete |
| Job Tracker | ✅ | ✅ | ✅ | Complete |
| Cover Letter | ✅ | — | ✅ | Complete |
| Interview Prep | ✅ | ✅ | ✅ | Complete |
| Portfolio Builder | ✅ | — | ✅ | Complete |
| Networking CRM | ✅ | — | — | Complete |
| Certificates | ✅ | — | — | Complete |
| Skills Manager | ✅ | — | ✅ | Complete |
| Career Roadmap | ✅ | — | ✅ | Complete |
| Reports | ✅ | — | — | Complete |
| Notifications | ✅ | — | — | Complete |
| Settings | ✅ | — | — | Complete |
| Auth (Sign In/Up) | ✅ | ✅ | — | Complete |
| Marketing/Landing | ✅ | — | — | Complete |

## 🗃 Database Schema

14 normalized PostgreSQL tables with:
- UUID primary keys
- Foreign keys with cascade deletes
- Composite indexes for query optimization
- Soft deletes (`deletedAt`)
- Audit fields (`createdAt`, `updatedAt`)
- JSONB columns for flexible data structures
- PostgreSQL enums for type safety

**Tables:** users, accounts, sessions, verifications, resumes, job_applications, cover_letters, interviews, portfolios, networking_contacts, certificates, skills, career_roadmaps, notifications, subscriptions, audit_logs

## 🎨 Design System

- **UI Kit:** 15+ shadcn/ui components (Button, Card, Dialog, Tabs, Badge, Progress, Avatar, Tooltip, DropdownMenu, etc.)
- **Theme:** Dark/light mode with CSS variables
- **Typography:** Inter font family
- **Custom Components:** ATSScoreRing, StatCard, EmptyState, CommandPalette
- **Layout:** Collapsible sidebar, sticky topbar, command palette (⌘K)
- **Animations:** Framer Motion page transitions and micro-interactions
- **Icons:** Lucide React icon library

## 🔐 Security

- ✅ CSRF protection (origin validation)
- ✅ Rate limiting (100 req/min)
- ✅ Security headers (X-Frame-Options, X-Content-Type-Options, CSP, etc.)
- ✅ Zod validation on all API endpoints
- ✅ Better Auth with session management
- ✅ OAuth (Google, GitHub) support
- ✅ Password requirements enforced
- ✅ Audit logging schema

## 🚀 Getting Started

```bash
# 1. Clone and install
git clone <repo>
cd career-intel
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# 3. Set up database
npx drizzle-kit push

# 4. Run development server
npm run dev
```

## 🧪 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Animation | Framer Motion |
| Database | PostgreSQL (Neon) + Drizzle ORM |
| Auth | Better Auth (email + OAuth) |
| Validation | Zod |
| State | React Hook Form + useState |
| Charts | Recharts |
| PDF Export | jsPDF |
| Icons | Lucide React |
| Deployment | Vercel |

## 📊 Platform Stats

- **15+ UI pages** with full interactivity
- **14 database tables** fully normalized
- **6 API endpoints** with Zod validation
- **15+ reusable UI components**
- **Command palette** with ⌘K
- **Dark/light theme** with system preference
- **Mobile-responsive** layouts
- **Type-safe** end-to-end

---

Built as a flagship product for MBA Product Management portfolio.
