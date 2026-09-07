# Qualified traffic release — September 7, 2026

## Measurement baseline

Source: `emc2ops.com-Performance-on-Search-2026-09-07.xlsx`, Google Search Console Web export, June 6–September 5, 2026. Property-level totals: 8 clicks, 5,674 impressions, 0.141% CTR. The U.S. supplied 4,636 impressions (81.7%). August 9–September 5: 6 clicks and 2,792 impressions; preceding 28 days: 1 click and 1,493 impressions. Query/page/property totals use different aggregation rules and must not be summed as unique demand. These are Google metrics, not Bing metrics.

The live Search Console query breakdown for “multifamily lead tracking” showed the apartment lead-tracking landing page with 480 impressions, one click, and average position 12.1. This supports prioritizing the existing commercial page. It does not guarantee a ranking improvement.

## First release

| Opportunity | Implementation |
| --- | --- |
| 1. Reliable production delivery | Recover the September 6 homepage, commercial navigation, discovery metadata, styles, and three live-only routes from available source. Retain the canonical repository's articles, schema repairs, operator briefs, and deployment marker. Publish only through main's Git integration. |
| 2. Admin-workload article | Deliver the already-corrected canonical article and remove duplicated template sections from this fully authored guide. |
| 3. Apartment lead-tracking landing page | Add a fictional CC-104 example and concrete source, property, ownership, stage, next-action, and exception fields. |
| 4. Apartment lead-tracking guide | Distinguish setup/testing guidance from the implementation offer; retain reciprocal links and the existing URL. |
| 5. CRM cleanup | Add ordered duplicate review, stage definitions, ownership, overdue-task reconciliation, and validation steps. |
| 6. Buildium | Add an illustrative field mapping, workflow-specific access checks, and vendor documentation links. |
| 7. AppFolio | Compare approved API/Stack, surrounding middleware, and staff-reviewed handoffs. Add a link from the AppFolio/Claude guide. No partnership or unrestricted access claim. |
| 8. Lead-to-lease | Add stage entry/exit evidence, responsible roles, review paths, and an illustrative inquiry-to-move-in example. |
| 9. Follow-up guide | Cover inquiry, post-tour, incomplete application, and no-show stages with illustrative messages, timing decisions, and pre-send stop checks. |
| 10. Guest cards | Add an inline fictional record and duplicate-resolution example; preserve source history and owner/next-action checks. |
| 30. IndexNow | After production commit verification, submit using the existing script and retain the accepted response and URL count. Non-blog changes currently submit the full sitemap. |

No new downloadable asset, booking API, or database change is included. The new optional `bodyOnly` article field suppresses repeated generated sections only for four fully authored guides; other articles retain their existing behavior. Integration examples are optional structured content on the existing integration pages.

### Production preservation

Recovered routes:
- `/services/custom-property-management-automation/`
- `/services/security-deposit-automation/`
- `/use-cases/maintenance-request-to-completion/`

The production guard still checks homepage text and structure, styles, live sitemap coverage, protected deposit content/schema, and AI discovery records. It treats booking query attribution and the equivalent fragment attribution as the same link only when parameters are limited to `workflow` and `source`. Tests reject changes to attribution values, destination, and unrelated parameters. The deposit authority page's protected content date remains August 29, 2026.

## Subsequent backlog

The second release implements these opportunities; see the [11–29 implementation record](traffic-opportunities-11-29-2026-09-07.md) for changes, preservation checks, and external profile limitations.

| # | Opportunity | Evidence and next action |
| --- | --- | --- |
| 11 | Apartment call-tracking guide | Query: 123 impressions, position 25.04. Create a distinct source-attribution and call-outcome guide. |
| 12 | Make-ready guide | 39 page impressions, position 9.51. Add dependencies, owners, and completion evidence. |
| 13 | Deposit service visibility | 38 impressions, position 11.08. Strengthen relevant internal links and verified product explanation. |
| 14 | Deposit-return article | 16 impressions, two clicks. Add an evidence checklist; avoid overinterpreting the small sample. |
| 15 | Move-out workflow | 35 impressions, position 19.03. Connect notice, inspection, vendors, review, and communication. |
| 16 | AI leasing assistant buying guide | 227 impressions, position 50.42. Add evaluation criteria and a demo script. |
| 17 | Automation overview | 502 impressions, position 62.39. Add a first-workflow prioritization guide. |
| 18 | Automation tasks | 159 impressions, position 59.91. Differentiate task reference content from the overview. |
| 19 | Follow-up service audience | 323 impressions, position 43.02. Clarify property-management buying intent. |
| 20 | Services directory | 69 impressions, position 10.8. Further clarify deliverables and next pages; preserve recovered production content. |
| 21 | Use-case directory | 179 impressions, position 62.71. Improve problem-to-workflow navigation. |
| 22 | Integrations directory | 114 impressions, position 56.57. Explain connection routes and verified examples. |
| 23 | Blog hub | 336 impressions, position 29.77. Prioritize evergreen operator guides and audience-facing metadata. |
| 24 | Owner reporting | 53 impressions, position 68.81. Add a report structure and data/approval workflow. |
| 25 | AI front desk | 53 impressions, position 28.09. Expand verified cross-channel evidence. |
| 26 | Missed-call recovery | 33 impressions, position 28.09. Distinguish recovery from call tracking. |
| 27 | Contextual links | Extend relevant article-to-service links beyond this first release. |
| 28 | Repeated blog sections | Review other articles individually before applying bodyOnly; retain substantive content. |
| 29 | Brand consistency | Google brand query has only three impressions. Audit public profile website links; no external profile changes included. |

## Release and follow-up checks

Run the build, blog validation, SEO validation, production-preservation guard, unit tests, rendered-release tests, and relevant browser regressions. Review mobile and desktop layout, working links, booking attribution, and protected routes. Test bookings use intercepted local responses; do not make a live booking for verification.

After Git deployment is Ready, verify `/deployment.json` equals the pushed commit and confirm actual changed HTML at the public URLs. Then run:

```
node scripts/submit-indexnow.mjs --from <previous-sha> --to <pushed-sha> --wait-for-deployment <pushed-sha>
```

HTTP 200 or 202 means the notification was accepted, not that pages were indexed or rankings improved. Source: https://www.bing.com/indexnow/getstarted

Compare U.S. nonbrand search clicks, impressions, CTR, query-level position, and available qualified-inquiry attribution after 28 complete days, then 56. For a September 7 launch, use September 8–October 5 and October 6–November 2 as complete 28-day windows, waiting for Search Console data to finish processing. Keep Google and Bing separate and report unavailable conversion data instead of assuming zero.
