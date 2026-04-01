# Advanced CRM + Directory (Non-Sales Focused)

This repo scaffolds an advanced relationship-centric CRM / directory platform.

## What's included
- Node.js + TypeScript Express API scaffold (modular structure)
- Postgres + Prisma models for people, organizations, interactions, tasks, users
- Basic auth/RBAC hooks (header-based demo; replace with real JWT/SSO)
- Modules: Directory, Interactions, Tasks, Search
- Validation via Zod
- Healthcheck + error handling middleware
- Docker Compose with Postgres + Adminer

## Getting started (dev)
```bash
# 1) start Postgres
docker-compose up -d

# 2) env
cd backend
cp .env.example .env

# 3) install deps & generate client
npm install
npm run prisma:generate

# 4) create/migrate schema
npm run prisma:migrate

# 5) start API
npm run dev
```
Health check: http://localhost:4000/health

### Auth placeholder
Requests read `x-user-id` and `x-user-role` headers (roles: super_admin, org_admin, department_head, manager, staff, viewer, external). Replace `middleware/auth.ts` with real JWT/SSO and tie to `User` table.

### Prisma schema snapshot
Located at `backend/prisma/schema.prisma`; includes enums for Visibility, TaskStatus, InteractionKind, Role.

### Search
Simple contains-based filtering via Prisma; replace with OpenSearch for scale and relevance.

### Next steps
- Seed data and add migrations for indices/performance
- Add Row-Level Security policies (Postgres) and field-level masking in queries
- Add workflow engine + notifications via job queue (Redis)
- Build Next.js frontend (split-pane list/detail, command palette, saved views)
- Add CI/CD, tests, and IaC
