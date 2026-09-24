# CleanBridge GH

CleanBridge GH is a Ghana-focused waste collection and logistics frontend for households, collectors, and operations teams.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/cleanbridge-gh run dev` — run the CleanBridge GH frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Frontend: React + Vite + JavaScript, Wouter, Tailwind CSS, React Hook Form, Lucide React

## Where things live

- `artifacts/cleanbridge-gh/` — frontend web app and route-aware product surfaces
- `artifacts/api-server/` — shared API service
- `lib/api-spec/openapi.yaml` — API contract source of truth
- `artifacts/cleanbridge-gh/src/index.css` — frontend theme and visual tokens

## Architecture decisions

- The CleanBridge GH artifact is frontend-only and does not modify the API server.
- Domain API calls are isolated behind the frontend adapter so real backend endpoints can replace preview data without rewriting page components.
- The frontend uses JavaScript-only source files as required by the product specification.

## Product

The frontend includes a public landing page, customer pickup flow and tracking, collector jobs/routes/earnings/vehicle views, and admin operations views for collections, people, routes, fuel, pricing, and analytics.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The current API server exposes only its health check; domain mutations are clearly marked as preview/unavailable until the user's real backend endpoints are provided.
- The web artifact's Vite config must honor the managed `PORT` and `BASE_PATH` values injected by its artifact workflow.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
