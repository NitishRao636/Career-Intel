# Business Operations OS

A modular, multi-tenant operations platform for small and medium businesses. This repository is deliberately being built **foundation first**: normalized data model → identity and authorization → design system → functional operational modules.

## What is implemented in this foundation

- **103-table PostgreSQL / Drizzle baseline migration** spanning tenancy, CRM, vendors, catalog, inventory, sales, purchases, double-entry finance, HR, projects, documents, reporting, AI insights, notifications, audit history and Better Auth.
- **Tenant isolation by design**: business aggregates carry `organization_id`; membership and role grants are tenant-scoped; write paths are designed to resolve identity before data access.
- **Configurable RBAC**: Owner, Super Admin, Manager, Sales Executive, Cashier, Inventory Manager, Accountant, Employee and Viewer are created per workspace. The grant matrix lives centrally in `lib/permissions/catalog.ts` and persists as `roles`, `permissions`, `role_permissions` and `membership_roles`.
- **Better Auth email/password flow**: sign-up, verification, sign-in, reset password, secure cookie sessions, sign-out, password hashing through Better Auth, rate limit configuration, and transactional email delivery through a small Resend adapter boundary.
- **Secure onboarding**: a verified user can create a workspace. It atomically creates their owner membership, all default roles/grants, fiscal year and main warehouse, and records an audit event.
- **Executive dashboard**: server-backed sales, purchasing, expense, receivables/payables, stock-risk, inventory-value, invoice and product-performance data—not fixture data. It includes responsive charts, loading state, error recovery, dark mode, quick navigation and a notification drawer.

## Architecture

```text
app/
  (auth)/                 Authentication routes and lightweight auth layout
  (app)/                  Protected application shell, onboarding and dashboard
  api/auth/[...all]/      Better Auth route handler
  api/organizations/      Workspace creation/listing API
components/
  auth/                   Auth and workspace onboarding experiences
  dashboard/              Data visualisation and dashboard interactions
  layout/                 Protected shell, navigation and utility panels
  ui/                     Reusable accessible design primitives
lib/
  auth/                   Better Auth server/client setup and guards
  db/                     Postgres/Drizzle connection boundary
  permissions/            Permission taxonomy and default role matrix
  services/               Transactional business services and read models
  validations/            Zod request schemas
db/
  schema/                 Domain-owned Drizzle schema modules
  migrations/             Generated, immutable SQL migration history
```

### Domain schema map

| Module | Key schema file | Main design decisions |
| --- | --- | --- |
| Auth & tenancy | `auth.ts`, `core.ts` | Canonical Better Auth tables, organizations, memberships, roles, audit trail, attachments and notifications |
| CRM & vendors | `parties.ts` | Separate customer/vendor ledgers, contacts, addresses, documents and credit/payment terms |
| Products & stock | `catalog.ts`, `inventory.ts` | Variants, batches, serials, balances, immutable movement lines, counts and FIFO value layers |
| Commercial documents | `sales.ts`, `purchases.ts` | Header/line normalization, allocations, returns, challans and payment lifecycle states |
| Finance | `finance.ts` | Chart of accounts, balanced journal lines, bank transactions and expenses |
| People & delivery | `hr.ts`, `projects.ts` | Employees, attendance, leave, payroll, projects, tasks, comments and time entries |
| Knowledge & intelligence | `documents.ts`, `platform.ts` | Document taxonomy/tags, saved/scheduled reports, layouts and persisted AI insights |

All mutable aggregates expose `created_at`, `updated_at`, `created_by`, `updated_by` and `deleted_at`. Referential actions, unique constraints and access-pattern indexes are defined alongside the tables. The immutable `audit_logs` table retains before/after payloads and request context.

## Local setup

1. Use Node 20.9+ and a Postgres/Neon database.
2. Copy the environment template and replace values:

   ```bash
   cp .env.example .env.local
   ```

   `DATABASE_URL` and a high-entropy `BETTER_AUTH_SECRET` are mandatory for a real environment. `RESEND_API_KEY` and `EMAIL_FROM` are required for delivery of verification/reset emails in production.

3. Generate/apply the already-created migration:

   ```bash
   npm install
   npm run db:migrate
   npm run db:seed
   npm run dev
   ```

4. Open `http://localhost:3000`, sign up, verify the email, and complete workspace onboarding.

## Quality gates

```bash
npm run typecheck     # strict TypeScript
npm run db:generate   # generate a new migration after intentional schema edits
npm run db:migrate    # apply migrations
npm run build         # production Next.js build
```

`npm run build` and `npm run typecheck` pass in the baseline.

## Security boundaries

- Better Auth provides hashed credentials, session management, verification/reset tokens and origin checks for stateful auth endpoints.
- Every organization API begins with server-side identity validation; future domain routes must use `requirePermission(organizationId, resource, action)`.
- Drizzle parameterizes database operations. Zod validates untrusted JSON at route boundaries.
- Production startup refuses an environment that has `DATABASE_URL` but lacks `BETTER_AUTH_SECRET`.
- Transactional tenant setup is atomic and emits an audit event.

## Next implementation increments

The schema is intentionally ahead of UI. The next production increments are: CRM customer registry and ledger, catalog + inventory movement posting, POS/invoice document workflow, then purchase and finance posting. Each increment will add its repository/service, Zod contracts, authorized API endpoints, table screen, detail workflow, exports and audit events—not disconnected mock screens.
