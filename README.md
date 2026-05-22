# Pulse

Greenfield proof that a **whole app** can live in Point source and ship to **Vercel** — no Next.js, no hand-written React routes, no separate API framework.

- **UI** — `view`, `page`, `layout`, `navigation` in `src/app.point`
- **API** — `route` blocks emit a Fetch handler for Vercel Edge
- **Deploy** — static Vite bundle + serverless `/api/*`

Live demo: https://point-pulse-one.vercel.app/

## Quick start

Requires [Bun](https://bun.sh).

```bash
bun install
bun run check
bun run dev
```

Open http://localhost:5173 — UI on Vite, API on http://localhost:3456.

## How it works (Point vs web/)

| Layer | Source | Role |
|-------|--------|------|
| **Product logic** | `src/app.point` | Pages, views, routes, rules, labels — all Point |
| **UI runtime** | `generated/app.tsx` | React router + views emitted by `point build-ts` |
| **API runtime** | `generated/app.js` | Fetch handler emitted by `point build --production` |
| **Thin host** | `web/main.tsx` | 7 lines — mounts the generated app |
| **Vercel adapter** | `api/[[...path]].ts` | Edge function → `createPointRouteFetchHandler()` |

Locally, Vite proxies `/api` to `point dev` on :3456. On Vercel, the Edge handler serves `/api/*`; the UI is static files from `dist/`.

**Note:** Most playground pages run Point logic client-side (labels, rules, forms). Only `/tasks` fetches from `/api/tasks` in the browser — so a broken API rewrite shows up there first.

## Playground pages

All authored in `src/app.point`:

| Page | Point features |
|------|----------------|
| `/tasks` | `load data`, fetch routes, lists |
| `/members` | actions, dynamic `/members/:id`, modals |
| `/settings` | forms, tabs, checkboxes, modals |
| `/fortune/:name` | labels + rules |
| `/pricing` | calculations, discount rules |
| `/launch` | scoring rules in views |
| `/orders/:id` | variants + variant labels |
| `/dice/:sides` | parameterized routes |

API routes: `/api/health`, `/api/tasks`, `/api/members`, `/api/launch/demo`, `/api/launch/risky`, `/api/fortune/:name`, `/api/orders/:id`, `/api/dice/:sides`, `POST /api/echo`.

## What's in the box

| Piece | Source |
|-------|--------|
| Home + tasks pages | `src/app.point` |
| `/api/health`, `/api/tasks` | same file |
| React shell | generated from Point (`point build-ts`) |
| Vercel API | `api/[[...path]].ts` → `createPointRouteFetchHandler()` |

Tasks are in-memory sample data — no database required for this proof.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import in [Vercel](https://vercel.com/new) → **HatchingPoint/point-pulse**.
3. Use defaults from `vercel.json`:
   - **Install:** `bun install`
   - **Build:** `bun run build`
   - **Output:** `dist`
4. Deploy.

The build runs `point check` + `point build-app` (emit + Vite). API routes run on the **Edge** runtime via `api/[[...path]].ts`.

## Scripts

| Command | Description |
|---------|-------------|
| `bun run check` | Type-check `src/app.point` |
| `bun run dev` | Vite UI + Bun API (local) |
| `bun run build` | Production emit + Vite → `dist/` |
| `bun run serve` | Serve `dist/` + API locally (Bun) |
| `bun test` | CI smoke tests |

## Docs

- [Point quick start](https://hatchingpoint.com/point/guide/quick-start)
- [Deploy on Vercel](https://hatchingpoint.com/point/toolchain/deploy)

## License

MIT — Hatching Point
