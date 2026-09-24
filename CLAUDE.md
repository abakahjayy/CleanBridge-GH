# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

CleanBridge GH is a waste-collection and logistics frontend for Accra, Ghana, with three user roles: customer (household), collector, and admin (operations). It lives in a pnpm workspace scaffolded by Replit. `replit.md` holds the Replit agent's notes, and the original product spec was in `.conversation/attached_assets/` (now deleted from the working tree, but still in git history).

## Commands

pnpm is required. A `preinstall` hook rejects npm and yarn. Node 24.

- `pnpm --filter @workspace/cleanbridge-gh run dev`: frontend dev server (Vite, port from `PORT`, default 5173)
- `pnpm --filter @workspace/cleanbridge-gh run build`: production build of the frontend
- `pnpm --filter @workspace/api-server run dev`: build and start the Express API. `PORT` is required; the server throws without it.
- `pnpm run typecheck`: runs `tsc --build` on the libs, then `typecheck` in every artifact and in `scripts`. The frontend is plain JS and has no typecheck script, so this skips it.
- `pnpm run build`: typecheck, then build every package
- `pnpm --filter @workspace/api-spec run codegen`: regenerates `lib/api-client-react/src/generated` and `lib/api-zod/src/generated` from `lib/api-spec/openapi.yaml`
- `pnpm --filter @workspace/db run push`: pushes the Drizzle schema. Needs `DATABASE_URL`.

There is no test runner, linter, or ESLint config. Prettier is installed at the root but has no script.

## Layout

- `artifacts/cleanbridge-gh/`: **the product**. A React + Vite app written in **JavaScript only** (`.jsx`/`.js`). The product spec requires this, so don't add TypeScript files here.
- `artifacts/api-server/`: Express 5 + pino, bundled with esbuild (`build.mjs`). It only exposes `GET /api/healthz`.
- `artifacts/mockup-sandbox/`: Replit's component-preview sandbox (TS). It is not part of the product.
- `lib/api-spec`: the OpenAPI contract, which is the source of truth for the API, plus the Orval config.
- `lib/api-zod`, `lib/api-client-react`: **generated** Zod schemas and react-query hooks. Edit `openapi.yaml` and rerun codegen; never edit `generated/` by hand. Orval is pinned to Zod v3 syntax to match the catalog version (see the comment in `orval.config.ts`).
- `lib/db`: the Drizzle ORM schema and client.
- `scripts/post-merge.sh`: Replit runs this after a merge (frozen install plus `db push`).

Shared dependency versions are set in `pnpm-workspace.yaml` (`catalog:`). That file also sets `minimumReleaseAge` as a supply-chain guard, which can block installing very new package versions. Its many `overrides` entries strip non-linux-x64 native binaries (esbuild, rollup, lightningcss, tailwind oxide). **As a result, installs and builds may fail on Windows or macOS**; the workspace targets Replit's Linux runtime.

## Frontend architecture (`artifacts/cleanbridge-gh`)

Almost the whole app is in `src/App.jsx`. `src/components/ui`, `hooks/`, `lib/` and `pages/` are empty placeholders.

- **Data:** a single `demoData` object at the top of `App.jsx` holds all the preview data (user, pickups, jobs, routes, collectors, fuel, pricing). The frontend makes no API calls. `replit.md` mentions a "frontend adapter" that isolates API calls, but none exists yet. Any action that would need a backend calls `alert('… unavailable in preview mode.')`, and pages show `<PreviewNote />`. Keep that convention until real endpoints exist.
- **Routing:** wouter. All routes are declared in `RouteView`. The `Router` base comes from `import.meta.env.BASE_URL`, which Vite sets from the `BASE_PATH` env var. The Vite config must keep honoring the injected `PORT` and `BASE_PATH`.
- **Role layouts:** `navSets` maps each role (`customer`, `collector`, `admin`) to its sidebar entries. `Shell({ role, title, subtitle })` renders the sidebar and topbar for authenticated pages, and `AdminShellPage` wraps it for admin. When you add a page, add both a `navSets` entry and a `<Route>`.
- **Shared admin tables:** `AdminTablePage({ kind })` drives the collections, customers, collectors, and routes pages from one config map.
- **Auth:** mocked. `AuthPage` submit just navigates to `/dashboard`.
- **Theming:** `ThemeContext` in `App.jsx` sets `document.documentElement.dataset.theme` and saves it to `localStorage` under `cleanbridge-theme`. Design tokens are HSL triplets on `:root` in `src/index.css`, with dark overrides under `:root[data-theme='dark']`. They are exposed to Tailwind v4 via `@theme inline`. Styling mixes semantic CSS classes from `index.css` (`panel`, `stat-card`, `badge-*`, `btn-*`, `data-row`, etc.) with inline styles. Use the existing classes and `hsl(var(--token))` rather than hard-coded colors.
- **Test IDs:** interactive elements carry `data-testid` attributes (`button-…`, `link-…`, `status-…`). Keep adding them to new elements.

## Deployment gotcha

`artifacts/cleanbridge-gh/.replit-artifact/artifact.toml` serves production static files from `dist/public`, but `vite.config.js` doesn't set `build.outDir`, so Vite writes to `dist/`. If production serving breaks, check this first.
