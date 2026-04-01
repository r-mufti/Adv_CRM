# Advanced CRM + Directory (Non-Sales Focused)

This repo scaffolds an advanced relationship-centric CRM / directory platform.

## What's included
- Node.js + TypeScript Express API scaffold (modular structure)
- Initial modules: Directory, Interactions, Tasks, Search
- In-memory demo data + validation via Zod
- Basic role constants (placeholder for real RBAC)
- Healthcheck + error handling middleware

## Quick start
```bash
cd backend
npm install
npm run dev
```
Then visit http://localhost:4000/health.

## Next steps
- Add Postgres + Prisma (or TypeORM) with Row-Level Security policies
- Implement real RBAC + auth (JWT/SSO) and field-level masking
- Wire Elasticsearch/OpenSearch for search endpoints
- Add workflow engine + notifications
- Build Next.js frontend (split-pane list/detail, command palette, saved views)
- Add CI/CD, tests, and infra-as-code
