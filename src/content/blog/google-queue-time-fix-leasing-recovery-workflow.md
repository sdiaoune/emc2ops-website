---
slug: "google-queue-time-fix-leasing-recovery-workflow"
order: 181
pillar: "Leasing Automation"
keyword: "leasing lead requeue SLA measurement workflow"
title: "Google's Queue-Time Fix Exposes Leasing's Hidden Clock Problem"
seoTitle: "Leasing Lead Requeue SLA Measurement Workflow"
meta: "Google fixed queue metrics that missed returned callers. Property managers need separate clocks for current work and the renter's full response journey."
publishedAt: "2026-09-09"
updatedAt: "2026-09-09"
h1: "A recovered leasing lead should not get a brand-new clock"
problem: "Leasing dashboards can make service look faster by restarting the timer when a missed caller, failed message, transferred inquiry, or after-hours lead returns to an active queue, even though the renter has been waiting across the full journey."
stakes:
  - "Google Cloud's September 8, 2026 contact-center release notes say a real-time dashboard omitted callers returned to queue after an automated-answer detection miss and measured current wait from the original entry instead of the most recent reentry."
  - "The corrections concern Google Cloud Contact Center as a Service, not property management software, but they expose a universal reporting risk: one customer journey can contain several queue segments with different clocks."
  - "For property managers managing 50+ doors, a restarted or blended timer can hide missed-call recovery delays, failed handoffs, duplicate lead records, and broken callback promises."
  - "A trustworthy workflow should preserve the original inquiry timestamp while separately measuring each recovery attempt, queue segment, assigned task, and useful response."
system:
  - "Create one durable renter journey ID and retain the original verified inquiry timestamp across calls, texts, forms, transfers, retries, and CRM record merges."
  - "Track a lifecycle response clock from first inquiry to first useful response and a segment clock for the current queue, callback, or recovery attempt."
  - "Return failed automated answers, missed callbacks, undelivered messages, and abandoned handoffs to a visible owned queue without erasing their prior wait."
  - "Match identity, property interest, source, contact permission, requested timing, and existing ownership before creating a new lead or restarting follow-up."
  - "Write every queue entry, exit reason, owner change, recovery attempt, useful response, and exception back to the CRM or PMS-adjacent record."
  - "Escalate fair housing questions, accommodations, lease interpretation, complaints, emergencies, uncertain identity, and policy exceptions to trained staff."
metrics:
  - "first useful response time from the original inquiry"
  - "current queue-segment wait time"
  - "returned leads visible in the active queue"
  - "recovery attempts completed inside SLA"
  - "lead journeys split across duplicate records"
  - "owner transfers that preserve the original clock"
  - "failed delivery and callback exceptions still unresolved"
cta: "If this news cycle has you thinking about AI front desk workflows, book a 15-minute workflow audit. EMC2Ops will map the first leasing, maintenance, owner update, vendor handoff, or CRM workflow worth automating."
bodySections: true
relatedUseCases:
  - label: "Apartment lead tracking"
    href: "/use-cases/apartment-lead-tracking/"
    description: "Keep the original source, timestamps, ownership, next action, and outcome attached to one renter journey."
  - label: "Lead-to-lease automation"
    href: "/use-cases/lead-to-lease-automation/"
    description: "Carry response clocks and handoff context through tours, applications, approvals, and move-in."
relatedServices:
  - label: "Leasing follow-up automation"
    href: "/services/leasing-follow-up/"
    description: "Run timely follow-up with durable timers, delivery-aware recovery, stop rules, and human escalation."
faqs:
  - question: "What did Google Cloud change in its September 8 contact-center notes?"
    answer: "Google said a real-time queue dashboard had omitted callers returned after an automated-answer detection miss and had measured current maximum and average wait from the original entry rather than the most recent queue reentry."
  - question: "Is EMC2Ops integrated with or endorsed by Google Cloud CCaaS?"
    answer: "No. The release note is an operations signal, not an integration, endorsement, reseller relationship, or claim that Google Cloud CCaaS is a property management product."
  - question: "Which clock should a leasing team use after a missed-call recovery?"
    answer: "Use both: preserve a lifecycle clock from the original verified inquiry to the first useful response, and track a separate segment clock for the current callback, queue entry, or recovery task."
  - question: "When should a recovered leasing inquiry go to a person?"
    answer: "Route fair housing questions, accommodations, lease interpretation, complaints, screening or pricing exceptions, uncertain identity, conflicting records, emergencies, and repeated automation failures to trained staff."
related:
  - "apartment-lead-response-sla-workflow"
  - "missed-call-text-back-property-management"
  - "apartment-call-tracking"
  - "property-management-leasing-shift-handoff-workflow"
  - "property-management-multichannel-lead-intake-workflow"
  - "property-management-lead-deduplication-routing"
  - "leasing-message-delivery-failure-workflow"
  - "ai-outage-leasing-workflow-recovery-property-management"
socialHook: "Google just fixed a queue clock. Leasing dashboards may still restart yours."
socialImage: "/blog/social-assets/google-queue-time-fix-leasing-recovery-workflow.png"
---

Google Cloud's [September 8, 2026 Contact Center AI Platform release notes](https://docs.cloud.google.com/contact-center/ccai-platform/docs/release-notes) describe a small dashboard correction with a large operational lesson. The company says its real-time calls-queued view did not include callers returned to the queue after an automated-answer detection miss. It also says current maximum and average queue waits were measured from a caller's original entry instead of the most recent return.

That correction is about Google Cloud Contact Center as a Service, not property management software. EMC2Ops is not integrated with or endorsed by Google Cloud CCaaS. But the distinction between an original entry and a return to queue matters anywhere a customer journey can fail, transfer, retry, or resume.

For property managers managing 50+ doors, the lesson is simple: a recovered leasing lead should not receive a brand-new history, and the current queue should not inherit a misleading timer. Keep two clocks—one for the renter's full journey and one for the current work segment.

## Why property managers should care about two clocks

A prospect calls after hours, reaches an automated answer, and disconnects before completing intake. The workflow sends a text. The text fails. A coordinator calls the next morning, gets voicemail, and schedules another attempt. Later, the renter submits an ILS form using the same phone number.

That is one renter journey with several operational segments. If the dashboard starts the response clock from the new form, the team appears fast while hiding the overnight delay. If it measures the current callback queue from the original call, the live queue appears older than it really is and becomes harder to staff. Both views are useful, but they answer different questions.

This is why the P0 [apartment lead tracking workflow](/use-cases/apartment-lead-tracking/) needs durable identity, source events, ownership, and timestamps. A single "created at" field cannot explain the full journey.

It is also a practical example of [how to automate property management](/use-cases/how-to-automate-property-management/): choose one bounded handoff, define its clocks and completion state, and measure it before expanding.

## What the Google correction does not mean

The release note does not prove that a particular property management dashboard is wrong. It does not set a universal response-time target, and it does not mean every transfer or retry is a service failure. A renter may request a callback tomorrow, pause a search, or contact a different property with a separate question.

The useful signal is narrower: metric definitions shape what teams notice. Google's [contact-center data dictionary](https://docs.cloud.google.com/contact-center/ccai-platform/docs/data-dictionary) distinguishes queue entries, queue interactions, queue duration, and live queued counts. Property managers should be equally explicit about first inquiry, recovery segment, useful response, owner transfer, and final disposition.

Do not compress those states into one average. The [apartment lead response SLA workflow](/blog/apartment-lead-response-sla-workflow/) should measure the promise made to the renter, while the active queue metric should help the team manage the work waiting now.

## Preserve the journey; reset only the segment

Build the workflow around one durable journey ID. Keep the original verified inquiry timestamp even when the renter changes channel, the record moves between properties, a message fails, or staff merge duplicates.

Then record each work segment separately:

1. **Entry:** channel, timestamp, property interest, source, and event type.
2. **Match:** existing renter journey, confidence, and any merge or review decision.
3. **Queue segment:** assigned queue, entry time, owner, due time, and reason.
4. **Exit:** useful response, transfer, failure, abandonment, requested delay, opt-out, or another documented state.
5. **Recovery:** next approved action, new segment start, retained original clock, and backup owner.
6. **Writeback:** event history, current status, next step, and final disposition in the CRM or PMS-adjacent record.

A [multichannel lead intake workflow](/blog/property-management-multichannel-lead-intake-workflow/) provides the common event model. [Lead deduplication and routing](/blog/property-management-lead-deduplication-routing/) keeps the ILS form from becoming a second guest card that hides the missed call.

## Make returned work visible

Google's note is especially useful because one bug omitted callers returned after an automated-answer detection miss. Property managers face parallel failure modes: a voicemail transcription fails, an SMS is undelivered, a tour handoff has no owner, or a CRM writeback times out.

The workflow should return that item to a visible queue with an exception reason. It should not count an attempted automation as a useful response. It should not mark a handoff complete because another system accepted a request. And it should not let a failed channel make the renter appear unresponsive.

Use [missed-call text-back automation](/blog/missed-call-text-back-property-management/) to acknowledge intent quickly, then use a [message delivery failure workflow](/blog/leasing-message-delivery-failure-workflow/) to detect whether the acknowledgment actually arrived. If the lead changes shifts or properties, preserve the original clock through the [leasing shift handoff workflow](/blog/property-management-leasing-shift-handoff-workflow/).

The production [missed-call recovery workflow](/services/missed-call-recovery/) should connect that acknowledgment to an owned callback, a visible exception path, and reliable CRM follow-through.

## What to automate and what to keep human-led

Automate identity matching, channel and consent checks, event timestamps, queue assignment, approved acknowledgments, callback tasks, duplicate detection, delivery-state monitoring, SLA alerts, CRM writeback, and suppression when a renter replies or opts out.

Keep fair housing questions, accommodations, lease interpretation, complaints, screening decisions, pricing or concession exceptions, emergencies, and uncertain identity with trained staff. Automation can preserve context and make the wait visible. It should not improvise policy or use sensitive attributes to prioritize people.

Human review is also required when two records conflict, a renter asks for a delay that changes the SLA, a transfer loses ownership, or repeated failures make the automatic path unreliable. The escalation package should include the original inquiry, every segment, attempted channels, delivery results, current property interest, and promised next step.

## Related workflows to review next

Once the two-clock model is clear, strengthen the surrounding operating chain:

- Use [apartment call tracking](/blog/apartment-call-tracking/) to connect call source and outcome without treating raw call volume as success.
- Review [property management AI automation versus chatbots](/blog/property-management-ai-automation-vs-chatbots/) when conversations look polished but queue state and ownership remain disconnected.
- Apply [CRM workflow automation](/blog/property-management-crm-workflow-automation/) so retries, transfers, and exceptions write back to one trusted record.
- Test the [AI outage recovery workflow](/blog/ai-outage-leasing-workflow-recovery-property-management/) when queued events must survive degraded service and reconcile safely afterward.
- Compare candidates with [property management automation tasks](/blog/property-management-automation-tasks/) before expanding beyond one measurable recovery path.

Each link answers a different question, but the governing rule stays the same: preserve history, identify the work waiting now, and make every exception owned.

## Metrics that reveal hidden waits

Track first useful response time from the original inquiry, current queue-segment wait, returned leads visible in the active queue, recovery attempts completed inside SLA, journeys split across duplicate records, owner transfers that preserve the original clock, and unresolved callback or delivery failures.

Review percentiles and exceptions, not only averages. An average can improve while the oldest recovered leads disappear from view. Audit a sample from original event through final CRM state. Confirm that each timer starts and stops on the documented event, not on whatever timestamp happens to be easiest to query.

## Roll out one recovery path first

Choose one bounded case, such as missed after-hours leasing calls. Define the original inquiry event, acknowledgment rule, identity match, current segment timer, callback owner, delivery checks, handoff rule, useful-response definition, writeback fields, and escalation path. Test an answer-detection miss, undelivered text, duplicate ILS form, shift change, requested callback delay, opt-out, and failed CRM update.

Google's dashboard correction is technical and narrow. The evergreen operating lesson is broader: good reporting separates the customer's total wait from the team's current queue without erasing either one.

If this news cycle has you thinking about AI front desk workflows, book a 15-minute workflow audit. EMC2Ops will map the first leasing, maintenance, owner update, vendor handoff, or CRM workflow worth automating.

## Sources

- [Google Cloud Contact Center AI Platform release notes](https://docs.cloud.google.com/contact-center/ccai-platform/docs/release-notes)
- [Google Cloud Contact Center AI Platform data dictionary](https://docs.cloud.google.com/contact-center/ccai-platform/docs/data-dictionary)
- [Google Cloud real-time operations and monitoring guidance](https://docs.cloud.google.com/contact-center/ccai-platform/docs/dashboards-real-time-operations-and-monitoring)
