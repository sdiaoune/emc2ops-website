# Missed-call homepage preview

The reviewed homepage is commit `a04350282bddec4fad54ddb3a93565ace5810e5f` on
`review/missed-call-pilot-20261001` in `https://github.com/sdiaoune/emc2ops-website`.
The founder explicitly approved that reviewed homepage for production on October
2, 2026 at 05:24 UTC. Main auto-deploys production through Vercel Git integration.

The homepage now leads with missed-call leasing recovery for small residential
property managers without effective existing coverage. The fixed pilot covers
one leasing number, consent-appropriate text follow-up and opt-outs, basic renter
details, an existing scheduling link or staff handoff, and outcome reporting.
Maintenance intake, live AI call answering, and custom CRM development are excluded.
No new price, ROI guarantee, delivery date, or testimonial is introduced. Examples
use fictional data; existing client feedback remains qualified as implementation
feedback rather than measured leasing results.

All routes remain available. The security-deposit authority page, its schema and
AI discovery coverage, and the existing blog corpus are preserved. The Mac blog
schedulers and publishing workflow are unchanged.

## Verification

The default `npm run blog:deploy-guard` remains the production blog-only gate: it
requires the protected hero, customer operating-scale strip, and stylesheet bundle
to match production. This intentional homepage release is checked with:

```sh
npm run blog:deploy-guard -- --homepage-review-baseline docs/homepage-review-baseline.json
```

The opt-in mode requires the exact repository and authorized review branch. The
committed baseline pins normalized SHA-256 hashes of the rendered hero, pilot
offer, and entire homepage stylesheet set. Candidate changes to those hashes
fail the gate. It still compares the operating-scale strip against production
and enforces every production sitemap URL, all six deposit authority markers,
the deposit date, FAQ and HowTo schema, and the three AI discovery files.

Tests exercise the default gate and the pinned preview gate, including rejected
hero, offer, CSS, operating-scale, URL-loss, and deposit-content regressions. The
baseline is updated only as part of an explicitly authorized homepage review,
after build and visual QA. Never use this review mode for a main/blog release.

## Approved production publication

For this approved release, start from freshly fetched main and reconcile any
newer blog posts or user changes with the reviewed branch. Use a normal merge
or fast-forward, never a force push. Before pushing main, run:

```sh
npm run blog:deploy-guard -- --approved-homepage-commit a04350282bddec4fad54ddb3a93565ace5810e5f
```

This mode accepts only main in the verified repository and a candidate descended
from the explicitly approved commit. It reads the baseline directly from that
immutable Git commit, so an edited working-tree manifest cannot expand the scope.
Rendered hero, pilot offer, and stylesheet hashes must still match the reviewed
version exactly. Every production URL and all deposit/operating-scale checks
remain mandatory. The ordinary blog guard and Mac blog automation are unchanged;
after publication, ordinary blog releases compare against the new live homepage.
