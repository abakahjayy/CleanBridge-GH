# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

CleanBridge GH is a waste-collection and logistics frontend for Accra, Ghana, with three user roles: customer (household), collector, and admin (operations). The repo is a single-package pnpm workspace containing only the frontend at `artifacts/cleanbridge-gh/`. The backend lives in a separate repo (see "Backend" below).

## Commands

pnpm is required. A `preinstall` hook rejects npm and yarn. Node 24.

- `pnpm run dev`: Vite dev server on http://localhost:5173 (`PORT` env overrides it; `strictPort` is on, so a stale Vite process on that port makes startup fail)
- `pnpm run build`: production build to `artifacts/cleanbridge-gh/dist/`
- `pnpm run serve`: preview the production build

There is no test runner, linter, or typecheck. The source is plain JavaScript on purpose; don't add TypeScript files.

`pnpm-workspace.yaml` sets `minimumReleaseAge: 1440` as a supply-chain guard, so pnpm refuses package versions published less than a day ago. Dependency versions are pinned in its `catalog:`. esbuild is allow-listed to run its install script (`allowBuilds`), which pnpm 11 requires before it will run any script.

## Frontend architecture (`artifacts/cleanbridge-gh`)

Almost the whole app is in `src/App.jsx`. The only runtime dependencies are React, wouter and lucide-react; styling is Tailwind v4 plus hand-written CSS.

- **Data:** a single `demoData` object at the top of `App.jsx` holds all the preview data. The frontend makes **no API calls yet**. Actions that would need a backend call `alert('… unavailable in preview mode.')`, and pages show `<PreviewNote />`.
- **Routing:** wouter. All routes are declared in `RouteView`, and the `Router` base comes from `import.meta.env.BASE_URL` (the `BASE_PATH` env var).
- **Role layouts:** `navSets` maps each role (`customer`, `collector`, `admin`) to its sidebar entries. `Shell({ role, title, subtitle })` renders the sidebar and topbar for authenticated pages, and `AdminShellPage` wraps it for admin. When you add a page, add both a `navSets` entry and a `<Route>`. `AdminTablePage({ kind })` drives the collections, customers, collectors, and routes tables from one config map.
- **Auth:** mocked. `AuthPage` submit just navigates to `/dashboard`.
- **Theming:** `ThemeContext` sets `document.documentElement.dataset.theme` and saves it to `localStorage` under `cleanbridge-theme`. Design tokens are HSL triplets on `:root` in `src/index.css`, with dark overrides under `:root[data-theme='dark']`, exposed to Tailwind via `@theme inline`. Use the semantic classes in `index.css` (`panel`, `stat-card`, `badge-*`, `btn-*`, `data-row`, …) and `hsl(var(--token))` rather than hard-coded colors.
- **Test IDs:** interactive elements carry `data-testid` attributes (`button-…`, `link-…`, `status-…`). Add them to new elements too.

## Backend

The API lives in the separate FullBackendd repo (`Desktop/VS Projects/FullBackendd-master/FullBackendd-master`, Express + MongoDB, `npm start` on port 7004), namespaced under `/api/v1/cleanbridge/*`: `auth`, `pickups`, `routes`, `vehicles`, `notifications`, `settings`, `dashboard`, `admin`. That repo's `CLAUDE.md` documents the endpoints' rules: roles, the pickup status machine, server-side pricing, and fuel snapshots. Its responses use `id` (never `_id`) and require `Authorization: Bearer <token>` from `POST /api/v1/cleanbridge/auth/login`.

When wiring the frontend to it, replace `demoData` reads with calls to those endpoints and drop the preview-mode `alert()`s and `<PreviewNote />`s as each feature goes live.
