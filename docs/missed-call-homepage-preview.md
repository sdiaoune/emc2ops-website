# Missed-call homepage preview

This release is authorized only for `review/missed-call-pilot-20261001` on
`https://github.com/sdiaoune/emc2ops-website`. Main auto-deploys production and is
not a destination for this release.

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
