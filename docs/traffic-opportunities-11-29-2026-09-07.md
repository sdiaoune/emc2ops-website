# Qualified traffic release: opportunities 11–29

This release builds on Git commit `d1a31b0520efdce47c53fc62b8968184fefb8b74`, the verified September 7 release of opportunities 1–10. The pre-release production sitemap contained 216 URLs. Preserve those URLs and the protected homepage, stylesheet bundles, deposit authority content/schema, and AI discovery files. The new guide adds one sitemap URL.

## Implementation record

| # | Opportunity | Delivered change |
| --- | --- | --- |
| 11 | Apartment call tracking | New `/blog/apartment-call-tracking/` guide explains source mapping, event versus lead counts, missed-call outcomes, CRM matching, ownership, and a fictional worked example. Includes six contextual article links and the existing commercial offer. |
| 12 | Make-ready | Inspection-to-rent-ready checklist with dependencies, accountable owners, evidence, failure handling, and separate forecast/verified readiness dates. |
| 13 | Deposit service | Adds an evidence-review brief covering case identity, versioned approval, and separate delivery/payment states. Adds related articles and relevant inbound links. The protected authority page and product preview remain intact. |
| 14 | Deposit return guide | Adds a review evidence checklist and fictional missing-condition-evidence case. No universal deadline, automatic deduction decision, or compliance promise. |
| 15 | Move-out | Adds a responsibility table across notice, inspection, vendor work, deposit review, communication, and readiness; links to turn and deposit resources. |
| 16 | AI leasing assistant | Adds a capability/access/evidence checklist and seven-step vendor-demo exercise. Removes the unsupported launch-in-days claim and links implementation options. |
| 17 | Automation overview | Existing use-case URL becomes a first-workflow prioritization guide with frequency, active staff effort, access, exceptions, acceptance criteria, and an illustrative comparison. Example effort totals are not savings claims. |
| 18 | Automation tasks | Retains all fifteen task sections and adds input, output, prerequisite, and human-approval specifications for each. Introduction distinguishes the reference from the prioritization guide. |
| 19 | Follow-up implementation audience | Separates renter leasing and owner-service inquiry paths, field requirements, accountable teams, test cases, and engagement deliverables. |
| 20 | Services directory | Adds concise deliverables for every service, descriptive service links, and a voice/SMS decision path. |
| 21 | Use-case directory | Prioritizes leasing capture, CRM cleanup, maintenance completion, and deposit review in decision links and cards; preserves every existing destination. |
| 22 | Integrations directory | Explains direct APIs, middleware/events, and staff-reviewed handoffs. Links platform-specific examples and adds a documented LeadSimple owner-inquiry example. |
| 23 | Blog hub | Removes internal SEO language from visible copy and schema; features six evergreen implementation guides ahead of the remaining article archive without duplicating or dropping cards. |
| 24 | Owner reporting | Adds a sample report/source/reviewer table, freshness checks, versioned approval, and a fictional work-order example linked to the implementation service. |
| 25 | AI front desk | Expands the protected operator brief and workflow with captured fields, cross-channel identity, staff routing, provider/CRM outcomes, and exception ownership. Retains existing verified product evidence. |
| 26 | Missed-call recovery | Adds a fictional call-to-response-to-CRM example and distinguishes recovery actions from call attribution. Replaces the “Voicemail is dead” heading with a concrete recovery heading. |
| 27 | Contextual links | Connects call routing, lead tracking, post-tour follow-up, Buildium handoffs, deposits, and reporting to the matching guides and commercial pages. Existing relevant AppFolio and guest-card links remain. |
| 28 | Repeated blog sections | Uses the existing body-only option for reviewed full guides. Elsewhere removes only complete repeated statements from supplemental sections, retaining unique instructions. In the reviewed corpus this suppresses 478 exact repeats across 79 existing articles. Removes generic rollout/diagram additions from authored-body articles and keeps a fallback for articles without an authored body. Navigation points only to rendered sections. |
| 29 | Brand and attribution | Verifies existing Organization, WebSite, Open Graph identity, canonicals, social references, and apex redirect. Adds a regression check and a separate public-profile correction worksheet. External fields that could not be retrieved remain explicitly unverified. |

## Preservation and validation

No booking API or database changes. Existing workflow/source attribution remains in booking links. All current routes and articles remain present, and the deposit authority page retains its protected date, evidence rules, schema, and discovery coverage. Blog checklist tables receive scoped styling and anchor spacing for mobile reading; homepage styles remain protected.

Run the production build, blog validation, new-article content preflight, deployment guard, SEO validation, unit tests, article-rendering tests, and browser regressions. Inspect representative desktop/mobile pages and booking navigation without making a booking. After the Git deployment is Ready, verify the exact commit through `/deployment.json`, all 216 previous sitemap routes, the new guide, updated pages, and protected content. Submit IndexNow only after this verification and record its accepted HTTP response and full-sitemap count.

The original Google Search Console metrics describe opportunity, not results from this release. Keep the scheduled 28-day and 56-day measurement windows from the first release; both releases occurred on September 7. Attribute changes to the combined release period rather than claiming the individual edits caused a ranking or inquiry change. Keep Google and Bing reporting separate.

## Sources and review notes

- [Buildium Open API](https://www.buildium.com/features/open-api/) and [AppFolio Stack APIs](https://www.appfolio.com/stack/partners/api) support the access distinctions; they do not establish EMC2Ops partnership or access to a customer's account.
- [LeadSimple REST API access](https://training.leadsimple.com/en/articles/14803573-find-or-rotate-your-rest-api-key) and [lead creation/import documentation](https://training.leadsimple.com/en/collections/10312002-creating-importing-syncing-leads) support the available connection choices. The specific field/action must still be checked during scoping.
- The AI leasing guide labels the linked [HUD 2024 announcement](https://archives.hud.gov/news/2024/pr24-098.cfm) as historical material and leaves current legal requirements to qualified review.
- [Public profile findings and prepared corrections](public-profile-corrections-2026-09-07.md) distinguish verified website identity from unavailable external profile settings.
