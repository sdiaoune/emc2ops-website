# EMC2Ops website

This is the canonical source repository for [www.emc2ops.com](https://www.emc2ops.com).

The site is an Astro static site with Vercel Functions under `api/`. Vercel deploys pushes to `main` automatically. Content and repair automations use temporary clones, run the complete release guard, commit their scoped changes, and push to `main`; they do not write into the canonical checkout.

## Local development

```bash
npm ci
npm run dev
```

## Release verification

```bash
npm run blog:validate
npm run build
npm run blog:deploy-guard
npm run seo:validate
npm run test:api
npm run test:unit
npm run test:public
```

Production deploys are created by the Vercel Git integration after a successful push to `main`. Do not manually deploy an uncommitted working tree.

Operational campaign files, social publishing credentials, queues, and histories belong in the separate `automation-agency` repository and must not be copied here.
