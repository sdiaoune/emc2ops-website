# EMC2Ops website repository rules

## Canonical source

- This repository is the only canonical source for `www.emc2ops.com`.
- The canonical branch is `main` on `https://github.com/sdiaoune/emc2ops-website`.
- `/Users/diaoune/automation-agency` contains operations and social state. Never write website source, blog posts, website assets, or Vercel build output there.

## Clean automation workflow

- Never let an automation edit `/Users/diaoune/emc2ops-website` directly.
- For every automated change, create a fresh temporary clone from `origin/main`, make the scoped change there, and delete the temporary clone after success or failure.
- Before editing, fetch the remote and require that the temporary clone starts at the current `origin/main` tip.
- Before pushing, require a clean index except for the intended files. Never use `git add -A`; add an explicit file list.
- Run the relevant tests, `npm run build`, `npm run blog:deploy-guard`, and `npm run seo:validate` before committing.
- Commit every intended website change and push it to `main`. Vercel Git integration performs the production deployment.
- Do not run `vercel --prod` for routine content publishing. Never deploy uncommitted or alternate-branch source.
- After pushing, verify the Git-backed Vercel deployment is Ready, the expected production URL is live, and the deployed commit SHA equals the pushed Git commit.
- End each run with both the canonical checkout and the temporary clone clean. If validation or push fails, do not deploy and do not copy partial work into the canonical checkout.

## Protected production state

- Website automations are additive. Do not delete, revert, replace, or omit existing articles or production sitemap routes.
- `npm run blog:deploy-guard` is a hard gate. It must preserve the protected homepage regions, stylesheet set, production sitemap subset, security-deposit authority page, schema, and AI discovery files.
- Keep operations-only files out of this repository, including social histories, campaign queues, OAuth connections, email suppressions, generated carousel workspaces, and acquisition-dashboard data.
