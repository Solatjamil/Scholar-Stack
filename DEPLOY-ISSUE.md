# Production deploy is stale — action needed in Vercel

## Symptom
`https://scholar-stack.vercel.app` serves an **old build** that predates months of work.

Evidence:

| Check | Production | Expected |
|---|---|---|
| `<title>` | `Vite + React` | `Young Scholars Pk — BISE Study Companion (9th–12th)` |
| Entry bundle | `index-BZbYugl9.js` | `index-DNEDdHpm.js` (current local build) |
| Chapter Study panels | absent | Videos / Solved Exercises / Glossary |
| Numericals hub, datesheet | absent | present |

The title alone proves the deployment predates commit `088e71f`, which set the real
`<title>` long ago.

## Not a code problem
- `origin/main` = `3374617`, local HEAD identical (`0  0` ahead/behind).
- GitHub shows a green check on `8589ebd`.
- `tsc --noEmit` → 0 errors; `vite build` → succeeds.

## Careful: 200 responses are misleading
Requesting a *new* chunk appears to succeed:

    curl -sI .../assets/index-DNEDdHpm.js   # HTTP 200

But it returns `content-type: text/html`, 459 bytes — the SPA fallback, not JS.
A deliberately fake filename (`index-TOTALLYFAKE.js`) also returns 200.
**Always check `content-type`, not the status code**, when testing whether an asset
really deployed.

## Likely causes, in order
1. **Git integration disconnected** — the repo is now *private* (lock icon in GitHub
   UI); the Vercel GitHub App may have lost access, so pushes no longer trigger builds.
2. **Production alias pinned** to an old deployment (Project → Deployments →
   "Promote to Production" on the newest one).
3. **Auto-deploy paused / branch mismatch**, or builds failing silently — check
   Project → Settings → Git.

Note `scholarstack.vercel.app` is a *different, also-stale* project
(`Scholars Stack - Premium Academic Resources`). Confirm which project owns the
domain you intend to ship.

## Fastest fix
In the Vercel dashboard: Deployments → newest → Redeploy, **or** reconnect the Git
integration and push an empty commit. A CLI deploy also works if you have a token:

    npx vercel --prod

## Also worth doing
- `/api/bise-datesheet` 404s in production — `api/` functions need the Node runtime.
- Revoke the deploy key when this work is finished.
