import { absoluteUrl, organizationSchema, siteUrl, websiteSchema } from "./site";
import { auditHref, type AuditCta, type BeforeAfter, type InstallableItem } from "./conversion";

export interface ServicePage {
  slug: string;
  updatedAt?: string;
  eyebrow: string;
  title: string;
  seoTitle: string;
  description: string;
  summary: string;
  auditFocus: string;
  operatorBrief?: {
    title: string;
    intro: string;
    scenarios: Array<{ title: string; description: string }>;
    boundary: string;
  };
  auditCta: AuditCta;
  installables: InstallableItem[];
  beforeAfter: BeforeAfter;
  bestFit: string[];
  notFit: string[];
  outcomes: string[];
  workflow: string[];
  metrics: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedUseCases: Array<{ label: string; href: string; description: string }>;
  relatedPosts: string[];
}

export const servicePages: ServicePage[] = [
{
  "slug": "custom-property-management-automation",
  "eyebrow": "Custom automation",
  "title": "Custom property management automation, built for your team",
  "seoTitle": "Custom Property Management Automation",
  "description": "EMC2Ops designs, builds, integrates, tests, and maintains custom property management automations around your existing processes and software.",
  "updatedAt": "2026-09-13",
  "summary": "EMC2Ops builds custom property management automation around your existing processes and software. Bring the workflow that slows your team down: leasing follow-up, maintenance handoffs, CRM updates, resident communication, or deposit review. We design, integrate, test, and maintain the agreed solution.",
  "auditFocus": "Define the trigger, input records, business rules, approvals, destination systems, and desired outcome. A custom engagement can connect several steps without replacing your property management system.",
  "auditCta": {
    "label": "Book a 15-minute consultation",
    "title": "Bring the workflow you want to automate.",
    "body": "Tell us the process, software, and desired result. We will outline a plan to build your solution and confirm the access, approvals, and ongoing support it needs."
  },
  "installables": [
    {
      "title": "A documented workflow",
      "description": "We map the current process, required fields, decisions, software access, exception owners, and acceptance checks before configuring the automation."
    },
    {
      "title": "The automation itself",
      "description": "Approved rules handle intake, record updates, follow-up, notifications, scheduling, or voice and text assistance as needed for your scope."
    },
    {
      "title": "Connected systems",
      "description": "Authorized integrations move the agreed fields between tools. If direct access is unavailable, a reviewed form, inbox, import, or staff task carries the handoff."
    },
    {
      "title": "Testing and launch",
      "description": "Sample records exercise normal work, missing information, duplicates, denied access, and connection failures. Your designated owner approves the test evidence."
    },
    {
      "title": "Documentation and handoff",
      "description": "Your team receives operating instructions, escalation contacts, measurement definitions, and a walkthrough of the approved workflow."
    },
    {
      "title": "Maintenance and improvement",
      "description": "The engagement includes a 30-day post-launch optimization window. Monitoring, support, reporting, and further automations follow the agreed ongoing scope."
    }
  ],
  "beforeAfter": {
    "before": [
      "Staff re-enter the same details across forms, spreadsheets, inboxes, and property records.",
      "A process depends on someone remembering the next step.",
      "Failures and exceptions have no consistent owner."
    ],
    "after": [
      "Approved inputs move through a documented process with recorded outputs.",
      "Rules assign the next action and send the agreed reminders.",
      "Exceptions enter a review queue with an owner and a recovery path."
    ]
  },
  "bestFit": [
    "Property management companies that can describe the process and outcome they want.",
    "Teams with authorized access to the required systems and someone to approve business rules.",
    "Operators looking for implementation and maintenance rather than a do-it-yourself platform."
  ],
  "notFit": [
    "Work that requires unavailable software permissions or prohibited access.",
    "Replacing professional judgment, emergency response, or legal decisions with unchecked automation.",
    "An unlimited development engagement without a defined scope."
  ],
  "outcomes": [
    "A solution configured to your approved workflow, not a generic software subscription.",
    "Clear responsibility for approvals, exceptions, system access, and support.",
    "Test evidence and a maintenance plan your team can review before launch."
  ],
  "workflow": [
    "Scope: supply the current process, sample input and output records, system names, restrictions, and a decision-maker.",
    "Design: agree field mappings, rules, approvals, destinations, failure handling, and success measures.",
    "Build: configure the trigger, automation steps, authorized integrations, and staff notifications.",
    "Test: follow a sample record through normal completion, duplicate handling, missing details, and failed connections.",
    "Approve and launch: your owner signs off; we enable the agreed scope and observe the initial runs.",
    "Maintain: review errors and results, resolve in-scope issues, and agree future workflow improvements."
  ],
  "metrics": [
    "Completion rate: eligible runs that reach the approved end state divided by eligible runs in the same date range.",
    "Exception rate: runs requiring human review divided by eligible runs; record the reason and resolution.",
    "Processing time: elapsed time from accepted input to the recorded destination output.",
    "Data completeness: reviewed output records containing every required field, owner, and next action."
  ],
  "faqs": [
    {
      "question": "Can you automate a process that is not on your website?",
      "answer": "Yes. The listed services are examples. Describe the trigger, current steps, software, and result you want. We confirm feasibility, required access, human approvals, and support before committing to a build."
    },
    {
      "question": "Do we need to replace our property management software?",
      "answer": "Not solely to add automation. We work with supported connections and authorized records in your existing tools. Direct access is confirmed during scoping; a reviewed handoff is an option when the required action is unavailable."
    },
    {
      "question": "What should we bring to the consultation?",
      "answer": "Bring the process you want to automate, the software involved, a sample input and desired output, and the decisions that must remain with staff. Do not send resident personal information in the initial inquiry."
    },
    {
      "question": "What determines cost and timing?",
      "answer": "Your proposal defines the workflow complexity, integrations, testing, rollout, and ongoing support. Access dependencies and approvals affect the schedule. Provider usage costs are identified separately; work starts against an agreed scope."
    },
    {
      "question": "Who maintains the automation?",
      "answer": "EMC2Ops maintains the solution within the agreed support scope. The handoff identifies monitoring, issue reporting, ownership, and change procedures. New processes and expanded requirements are scoped before implementation."
    }
  ],
  "relatedUseCases": [
    {
      "label": "Maintenance request to completion",
      "href": "/use-cases/maintenance-request-to-completion/",
      "description": "Connect intake, vendor coordination, completion evidence, and closure."
    },
    {
      "label": "Security deposit workflow",
      "href": "/use-cases/security-deposit-automation/",
      "description": "Collect evidence and route disposition decisions for human review."
    },
    {
      "label": "Resident, owner, and vendor communication",
      "href": "/use-cases/resident-owner-vendor-communication-automation/",
      "description": "Keep updates, approvals, and next actions tied to the operating record."
    }
  ],
  "relatedPosts": []
},
{
  "slug": "security-deposit-automation",
    operatorBrief: {
      "title": "What reviewers see in a deposit evidence case",
      "intro": "The existing product preview illustrates a fictional case. The implementation connects that review model to your authorized records; it does not certify charges, determine legal deadlines, or move money by default.",
      "scenarios": [
        {
          "title": "Evidence is traceable to the case",
          "description": "The reviewer sees the property/unit reference, inspection dates, evidence links, proposed itemization, and source balance. Missing or conflicting condition evidence stays labeled as unresolved."
        },
        {
          "title": "Approval belongs to a version",
          "description": "Store the reviewed values, decision, reviewer, and approval time. New evidence or changed charges return the affected version to review before downstream preparation continues."
        },
        {
          "title": "Handoff is distinct from completion",
          "description": "Disposition preparation, approved delivery, payment assignment, and confirmed payment have separate statuses. A failed send or missing payment confirmation remains an owned exception."
        }
      ],
      "boundary": "Authorized staff decide charges, applicable requirements, release approval, and payment authorization. The workflow makes the evidence and pending decisions visible."
    },
  "eyebrow": "Security deposit automation",
  "title": "Security deposit automation, built and maintained for your team",
  "seoTitle": "Security Deposit Automation Services",
  "description": "Connect deposit evidence, charge review, approval, disposition preparation, and refund tracking with a custom EMC2Ops implementation for property managers.",
  "updatedAt": "2026-09-07",
  "summary": "EMC2Ops builds the connections and review process behind security deposit operations. Bring your move-out records, approved policies, and current systems; we configure evidence collection, staff approval, disposition preparation, and recorded handoffs.",
  "auditFocus": "The service covers implementation: data mapping, evidence links, review rules, access controls, testing, and maintenance. Your authorized staff decide allowable charges, approve the disposition, and authorize payment.",
  "auditCta": {
    "label": "Book a 15-minute consultation",
    "title": "Plan your security deposit automation.",
    "body": "Tell us the process, software, and desired result. We will outline a plan to build your solution and confirm the access, approvals, and ongoing support it needs."
  },
  "installables": [
    {
      "title": "Case and record mapping",
      "description": "Connect the property, unit, resident reference, move-out date, deposit balance, and source record ID so each case can be traced."
    },
    {
      "title": "Evidence collection",
      "description": "Attach approved inspection links, photos, invoices, and notes to the correct case. Flag missing evidence for a person to resolve."
    },
    {
      "title": "Review and approval gates",
      "description": "Route proposed charges and exceptions to your authorized reviewer. Do not release a disposition or payment without the approvals your policy requires."
    },
    {
      "title": "Disposition preparation",
      "description": "Prepare the approved itemization and communication from reviewed data. Preserve the source values, reviewer, approval time, and final version."
    },
    {
      "title": "System handoffs",
      "description": "Write supported statuses to authorized records or create a reviewable task when access is limited. Track refund handoff separately from confirmed payment."
    },
    {
      "title": "Testing and support",
      "description": "Test missing invoices, duplicate cases, revised charges, rejected approvals, and failed updates. Document operating instructions and maintain the agreed workflow."
    }
  ],
  "beforeAfter": {
    "before": [
      "Staff rebuild cases from disconnected inspection photos, ledgers, and spreadsheets.",
      "Proposed charges circulate without a consistent evidence or approval trail.",
      "A sent task can be mistaken for a completed refund."
    ],
    "after": [
      "One case links the source records, supporting evidence, and review state.",
      "Authorized staff approve the itemization before the next step proceeds.",
      "Preparation, approval, handoff, and confirmed completion have distinct states."
    ]
  },
  "bestFit": [
    "Teams processing recurring deposit cases with documented review responsibilities.",
    "Operators with approved policies and authorized access to evidence and accounting records."
  ],
  "notFit": [
    "Automated legal determinations or charge approval without human review.",
    "Promising a universal legal deadline or transferring money without separate authorization."
  ],
  "outcomes": [
    "A repeatable path from source records to an approved disposition.",
    "Reviewable evidence and a named owner for exceptions.",
    "Clear separation between refund preparation, payment handoff, and confirmed payment."
  ],
  "workflow": [
    "Scope the source fields, reviewer responsibilities, approved templates, deadline rules, and output records.",
    "Connect authorized records and attach evidence using a stable case identifier.",
    "Configure missing-data checks and route proposed charges to the authorized reviewer.",
    "Prepare the disposition from approved values; send only through the agreed approval gate.",
    "Record the handoff and update payment status only from a confirmed source.",
    "Test revised and rejected cases, document the process, and monitor errors after launch."
  ],
  "metrics": [
    "Case readiness: cases with every required field and evidence item divided by reviewed cases.",
    "Review time: elapsed time from a complete case entering review to recorded approval or rejection.",
    "Exception rate: cases blocked by missing evidence, disputed values, or connection failures divided by processed cases.",
    "Refund tracking completeness: approved cases with a recorded payment handoff and confirmed source status."
  ],
  "faqs": [
    {
      "question": "Does the system decide deductions or legal deadlines?",
      "answer": "No. Your authorized team approves charge policies, deadline rules, and case decisions. Automation organizes evidence and executes the approved process; it is not legal advice and does not replace qualified review."
    },
    {
      "question": "Can this connect to our property management system?",
      "answer": "We verify supported records and your account permissions during scoping. Direct connections require authorized access. Where an action is unavailable, a reviewed export, form, or assigned task can preserve the handoff."
    },
    {
      "question": "Does this automatically send refunds?",
      "answer": "Not by default. Preparing a refund, assigning payment work, and confirming payment are separate states. Any payment-system action requires explicit scope, permissions, and your approval controls."
    },
    {
      "question": "What does EMC2Ops deliver?",
      "answer": "We deliver the agreed field mappings, evidence workflow, approval gates, integrations, tests, documentation, and maintenance arrangement. The operational use-case guide shows how staff move an individual case through review."
    }
  ],
  "relatedUseCases": [
    {
      "label": "Security deposit review walkthrough",
      "href": "/use-cases/security-deposit-automation/",
      "description": "See the operational workflow, fictional example, and human review responsibilities."
    },
    {
      "label": "Resident and owner communication",
      "href": "/use-cases/resident-owner-vendor-communication-automation/",
      "description": "Keep approved messages and replies connected to the case."
    }
  ],
  "relatedPosts": [
      "property-management-security-deposit-return-automation",
      "property-management-move-out-automation",
      "property-management-make-ready-automation"
    ]
},
  {
    slug: "missed-call-recovery",
    updatedAt: "2026-09-13",
    eyebrow: "Missed-call recovery",
    title: "Apartment call tracking and missed-call recovery",
    seoTitle: "Apartment Call Tracking & Missed-Call Recovery",
    description:
      "Connect apartment call tracking to missed-call texts, renter details, staff ownership, and confirmed tour outcomes in your existing CRM.",
    summary:
      "EMC2Ops installs apartment call tracking and the complete missed-call-to-showing workflow: detect the unanswered call, text the renter, capture leasing intent, offer an approved booking path, and record the confirmed next step.",
    auditFocus:
      "We map your unanswered-call trigger, first SMS, renter qualification fields, approved showing inventory, booking handoff, CRM writeback, stop rules, and staff escalation path.",
    operatorBrief: {
      "title": "What apartment call tracking should tell your team",
      "intro": "Track the path from a phone event to a renter conversation and a verified next step. A call count alone cannot show which inquiry needs attention.",
      "scenarios": [
        {
          "title": "Which property and source received the call",
          "description": "Keep the provider call ID, timestamp, called number, property, and answered or missed status. Attribute a marketing source only when a verified tracking-number or source mapping supports it; leave unknown sources explicit."
        },
        {
          "title": "Whether it is a new or returning renter",
          "description": "Match the confirmed phone number and property context to the existing lead. Preserve the original inquiry source, append the call as an activity, and send uncertain identity matches for review."
        },
        {
          "title": "What happened after the missed call",
          "description": "Record a permitted text-back, provider acceptance, renter reply, assigned staff task, and confirmed tour as separate events. Measure recovered inquiries by two-way replies and booked tours by confirmed calendar records."
        }
      ],
      "boundary": "Number provisioning, call recording, transcription, and advertising attribution are separately scoped against your provider’s capabilities and approved policies."
    },
    auditCta: {
      label: "Book my missed-call audit",
      title: "Want missed leasing calls routed before they go cold?",
      body: "Bring your phone system, CRM, and current missed-call process. We will identify the first recoverable workflow and the safest handoff rules.",
    },
    installables: [
      {
        title: "Missed-call trigger",
        description: "A phone or call-routing event that starts follow-up only when a leasing call is actually missed.",
      },
      {
        title: "Renter detail capture",
        description: "Move date, unit interest, budget, pets, tour intent, and property interest collected before staff step in.",
      },
      {
        title: "Text-back sequence",
        description: "Short branded SMS prompts that recover the conversation without pretending to be a human agent.",
      },
      {
        title: "Showing and staff route",
        description: "Approved showing options for schedule-ready renters, plus an owned staff task when pricing, fit, or availability needs judgment.",
      },
      {
        title: "Stop rules",
        description: "Suppression when a prospect replies, books, opts out, becomes unqualified, or a human takes over.",
      },
      {
        title: "Escalation path",
        description: "Rules for high-intent renters, unclear questions, fair-housing-sensitive replies, and urgent staff review.",
      },
    ],
    beforeAfter: {
      before: [
        "Missed calls create voicemail, sticky notes, and delayed callbacks.",
        "Managers cannot tell which calls became real prospects.",
        "CRM records depend on whoever remembers to type the update.",
      ],
      after: [
        "Every missed leasing call receives a fast, branded next step.",
        "Qualified replies reach an approved showing path or a clearly owned staff task.",
        "The CRM shows whether the renter booked, needs follow-up, or reached a stop condition.",
      ],
    },
    bestFit: [
      "You miss renter calls during tours, lunch breaks, evenings, or weekends.",
      "Your phone system and CRM do not share enough follow-up context.",
      "You want a narrow first automation with measurable reply and booking impact.",
    ],
    notFit: [
      "You only need a phone tree or answering service with no CRM handoff.",
      "Your team cannot define who should own a recovered prospect.",
      "You are not ready to review opt-out, consent, and staff handoff rules.",
    ],
    outcomes: [
      "Text prospects back automatically after missed calls.",
      "Collect move date, unit interest, budget, pets, and showing intent.",
      "Offer approved showing options or route a staff-owned next step.",
      "Write the booking, owner, stage, summary, and stop state back to the CRM.",
    ],
    workflow: [
      "Confirm the leasing call was missed and check the number against existing lead, staff-takeover, and suppression records.",
      "Send a branded text-back that identifies the property team and gives the renter one clear reply path.",
      "Capture property interest, move date, unit fit, budget, pets, occupancy, and showing intent in structured fields.",
      "Offer only approved showing availability when the renter is schedule-ready; otherwise assign the right leasing owner with context.",
      "Confirm the selected showing and send the approved confirmation or reminder details.",
      "Write the source, conversation summary, showing, owner, stage, task, and stop state to the CRM.",
    ],
    metrics: ["missed calls recovered", "time to first response", "qualified replies", "call-to-showing rate"],
    faqs: [
      {
        question: "Does apartment call tracking identify every advertising source?",
        answer: "Only where a verified mapping connects the called number or source event to that campaign. We scope the provider data and attribution rules first. Calls with no reliable source remain unknown; repeat calls stay attached to the original lead history.",
      },
      {
        question: "Is missed-call recovery an answering service?",
        answer: "Missed-call recovery starts after an unanswered phone event and follows up through an approved channel. An answering service handles the live call. EMC2Ops can scope AI call answering separately when you need both workflows.",
      },
      {
        question: "What automation should I install first if my leasing team misses calls?",
        answer:
          "Start with a missed-call-to-showing workflow: verify the missed call, send an approved text-back, capture renter intent, offer supported showing availability or assign staff, and write the confirmed outcome and stop state to the CRM.",
      },
      {
        question: "How fast does missed-call recovery respond?",
        answer:
          "The workflow is designed to respond as soon as the connected phone provider supplies an eligible missed-call event. Actual timing depends on provider delivery, workflow configuration, and channel availability, so EMC2Ops measures the timestamps instead of promising a universal response time.",
      },
      {
        question: "Can it stop when a human responds?",
        answer: "Yes. We design stop rules so automation does not fight the leasing team once a human takes over.",
      },
      {
        question: "Can a recovered caller book a showing without staff copy-paste?",
        answer: "Yes, when approved availability can be read from your scheduling process. The workflow records the booking and routes pricing, availability, accommodation, or other exceptions to staff.",
      },
      {
        question: "How does apartment call tracking work after a missed leasing call?",
        answer:
          "Apartment call tracking connects the phone event to the renter, property, source, qualification details, staff owner, follow-up status, and CRM outcome instead of leaving the call as an isolated voicemail.",
      },
    ],
    relatedUseCases: [
      {
        label: "Leasing intake and routing automation",
        href: "/use-cases/leasing-intake-routing-automation/",
        description: "Normalize calls, texts, forms, and ILS inquiries before ownership, booking, and CRM writeback.",
      },
      {
        label: "Apartment lead tracking",
        href: "/use-cases/apartment-lead-tracking/",
        description: "Capture renter source, qualification details, ownership, and booked-tour next steps.",
      },
      {
        label: "Real estate lead follow-up automation",
        href: "/use-cases/real-estate-lead-follow-up-automation/",
        description: "Recover missed or stale leasing inquiries with stage-aware follow-up.",
      },
      {
        label: "Lead-to-lease automation",
        href: "/use-cases/lead-to-lease-automation/",
        description: "Connect inquiry, tour, application, approval, and move-in handoff.",
      },
    ],
    relatedPosts: ["missed-call-text-back-property-management", "missed-leasing-calls-property-management"],
  },
  {
    slug: "leasing-follow-up",
    updatedAt: "2026-09-13",
    eyebrow: "Leasing follow-up",
    title: "AI leasing assistant for renter follow-up",
    seoTitle: "AI Leasing Assistant & Follow-Up Automation",
    description:
      "An AI leasing assistant configured for renter inquiries, tour reminders, no-show follow-up, and CRM updates, with clear rules for staff takeover.",
    summary:
      "EMC2Ops configures an AI leasing assistant to keep renter follow-up moving after an inquiry, missed call, tour, no-show, or incomplete application. This leasing lead automation works with your existing tools, approved messages, and staff handoff rules.",
    auditFocus:
      "We audit the first inquiry, tour, no-show, stale reply, application, and handoff stages so follow-up moves leads forward without over-messaging.",
    operatorBrief: {
      "title": "What your AI leasing assistant does between inquiry and tour",
      "intro": "Each step uses the renter’s current stage and your approved information. We agree the messages, timing, booking access, and stop conditions before implementation.",
      "scenarios": [
        {
          "title": "Answer and collect renter details",
          "description": "Capture property interest, move date, budget, unit preference, and requested tour time. Use an approved source for answers. When pricing or availability cannot be confirmed, create a staff task with the question and conversation summary."
        },
        {
          "title": "Follow up on the next action",
          "description": "Leasing automation can send an approved reminder, offer a supported rebooking path after a no-show, or flag an incomplete application. A reply, booking, opt-out, or staff takeover changes or stops the sequence."
        },
        {
          "title": "Keep the leasing record current",
          "description": "Save the lead’s stage, staff owner, last meaningful response, and next task through an authorized connection. Record a confirmed tour separately from a tour request; send failed updates to an owned review queue."
        }
      ],
      "boundary": "Staff retain screening, accommodation, pricing-exception, and application-approval decisions. The assistant gathers information and supports the next step."
    },
    auditCta: {
      label: "Book my leasing follow-up audit",
      title: "Want leasing follow-up that knows when to stop?",
      body: "We will review your lead sources, stage timing, message rules, CRM updates, and human takeover points before recommending the first sequence.",
    },
    installables: [
      {
        title: "Stage triggers",
        description: "Rules for missed inquiry, stale reply, booked tour, no-show, incomplete application, and stalled approval moments.",
      },
      {
        title: "Context fields",
        description: "Property, source, move date, unit fit, last action, consent status, owner, and next required step captured before outreach.",
      },
      {
        title: "Follow-up automations",
        description: "SMS, email, reminders, rebooking paths, and task creation matched to the renter's current stage.",
      },
      {
        title: "CRM writebacks",
        description: "Concise notes, tags, tasks, and stage updates that show what happened without flooding the record.",
      },
      {
        title: "Stop rules",
        description: "Automation pauses when a renter replies, books, applies, opts out, is disqualified, or a staff member takes ownership.",
      },
      {
        title: "Escalation paths",
        description: "Questions about pricing, accommodations, complaints, approvals, or unusual situations go to a human with context.",
      },
    ],
    beforeAfter: {
      before: [
        "Every lead gets similar follow-up regardless of stage or urgency.",
        "No-shows and incomplete applications wait for manual attention.",
        "The CRM shows activity but not a trustworthy next action.",
      ],
      after: [
        "Follow-up changes by stage, source, timing, and last renter action.",
        "Stalled renters get a clear booking, rebooking, or application path.",
        "Staff see concise tasks and know when automation already handled the next touch.",
      ],
    },
    bestFit: [
      "You have enough renter volume that missed second touches cost real leases.",
      "Your team needs SMS, email, CRM tasks, and human handoffs working together.",
      "You want automation that respects bookings, opt-outs, staff replies, and sensitive questions.",
    ],
    notFit: [
      "You want one generic drip sequence for every lead source and property.",
      "You do not have a clear leasing stage model or owner assignment rule.",
      "You are looking for a bulk outbound campaign instead of workflow follow-up.",
    ],
    outcomes: [
      "Recover prospects who stopped replying after first contact, tour requests, or application links.",
      "Send showing reminders, confirmations, no-show recovery prompts, and rebooking paths.",
      "Update CRM stages, tasks, owners, and suppression rules when a prospect replies, books, no-shows, applies, or opts out.",
    ],
    workflow: [
      "A renter lead enters your CRM, inbox, phone system, or form stack.",
      "The workflow checks stage, source, timing, consent, last touch, and whether staff already took over.",
      "Prospects receive short, branded prompts to book, confirm, reschedule, complete an application, or clarify interest.",
      "Replies, stop signals, bookings, no-shows, and owner handoffs are synced back to the operating system of record.",
    ],
    metrics: ["lead-to-showing rate", "reply rate", "no-show recovery", "stale leads reactivated"],
    faqs: [
      {
        question: "Is an AI leasing assistant the same as a virtual leasing assistant?",
        answer: "Virtual leasing assistant can mean an automated assistant or a remote staff member. EMC2Ops implements the automated workflow: approved responses, intake, follow-up, scheduling handoffs, and CRM updates. Your designated people handle questions and decisions outside that scope.",
      },
      {
        question: "Does this replace our leasing software?",
        answer: "The implementation connects supported features in your existing leasing software, phone system, forms, calendar, and CRM. It does not supply a complete lease-accounting or property management platform. We verify the required read and write access before promising a connection.",
      },
      {
        question: "Can the sequence use SMS and email?",
        answer: "Yes. The channel mix depends on your tools, consent language, and where the prospect entered the funnel.",
      },
      {
        question: "Will every lead receive the same message?",
        answer: "No. Strong workflows vary by stage, timing, source, and the last known prospect action.",
      },
      {
        question: "Can follow-up stop when a prospect books or staff replies?",
        answer: "Yes. Stop rules are core to the workflow so automation pauses when a prospect books, applies, opts out, becomes unqualified, or a human takes over.",
      },
    ],
    relatedUseCases: [
      {
        label: "Real estate lead follow-up automation",
        href: "/use-cases/real-estate-lead-follow-up-automation/",
        description: "Automate speed-to-lead, stale lead recovery, no-show follow-up, and handoff rules.",
      },
      {
        label: "Lead-to-lease automation",
        href: "/use-cases/lead-to-lease-automation/",
        description: "Keep every renter next step visible from first inquiry through move-in.",
      },
      {
        label: "Apartment lead tracking",
        href: "/use-cases/apartment-lead-tracking/",
        description: "Track lead source, renter fit, ownership, and CRM completion.",
      },
      {
        label: "CRM follow-up cleanup",
        href: "/use-cases/real-estate-crm-follow-up-mess/",
        description: "Fix messy stages, tasks, duplicate records, and follow-up ownership.",
      },
    ],
    relatedPosts: ["ai-leasing-follow-up-property-management", "reduce-showing-no-shows-property-management"],
  },
  {
    slug: "maintenance-intake-automation",
    updatedAt: "2026-09-06",
    eyebrow: "Maintenance intake",
    title: "Maintenance intake automation for property managers",
    seoTitle: "Maintenance Intake Automation",
    description:
      "Collect maintenance details, urgency, access notes, photos, and routing context before requests reach your team.",
    summary:
      "EMC2Ops installs maintenance intake workflows that gather the issue, urgency, access notes, supported photos or video, and resident availability before routing a usable work-order record.",
    auditFocus:
      "We review request channels, required work-order details, emergency indicators, access notes, photo handling, vendor routing, and approval rules.",
    operatorBrief: {
      title: "What a dispatch-ready maintenance request actually contains",
      intro:
        "A resident message that says “the sink is leaking” is not yet a usable work order. The coordinator still needs the exact fixture, when the leak started, whether water is actively spreading, access permission, pets, prior repair history, and evidence the vendor can review before accepting the job.",
      scenarios: [
        {
          title: "The 10:47 p.m. no-cooling message",
          description:
            "The workflow checks the unit and property, asks for the indoor temperature and symptoms, compares the answer with the approved emergency policy, and routes the request to the on-call path or the next-business-day queue. It does not invent an emergency classification.",
        },
        {
          title: "The photo that changes the route",
          description:
            "A clear image can separate a dripping supply line from water around an appliance, but staff still control the diagnosis and dispatch rule. The useful automation step is attaching the right media to the right record so the coordinator and vendor see the same evidence.",
        },
        {
          title: "The access note a vendor needs",
          description:
            "“Anytime Tuesday” is incomplete when a resident has a dog, requires a call before entry, or has not granted permission. A good intake path records those constraints before scheduling so the handoff does not create another round of calls.",
        },
      ],
      boundary:
        "Maintenance automation should gather facts, apply documented routing rules, and make ownership visible. Staff retain control over emergency decisions, habitability questions, repair approval, vendor choice, resident disputes, and any request where the evidence conflicts.",
    },
    auditCta: {
      label: "Book my maintenance intake audit",
      title: "Want cleaner maintenance requests before staff touch them?",
      body: "We will map the first intake workflow that can collect missing details, identify exceptions, and route a usable summary.",
    },
    installables: [
      {
        title: "Request triggers",
        description: "Inbox, form, SMS, resident portal, or phone events that begin intake without forcing staff to retype the request.",
      },
      {
        title: "Details and media",
        description: "Issue type, exact location, urgency, access notes, resident availability, supported photos or video, pets, and prior attempts.",
      },
      {
        title: "Intake automations",
        description: "Follow-up prompts that gather missing details and create a readable maintenance summary.",
      },
      {
        title: "Work-order handoff",
        description: "Summary, category, urgency, property, media links, access context, and next step routed to the work-order tool, coordinator, or approved vendor path.",
      },
      {
        title: "Stop rules",
        description: "Automation stops when the request is complete, staff take over, a resident opts out, or an emergency path activates.",
      },
      {
        title: "Escalation paths",
        description: "Emergency terms, habitability concerns, repeat issues, approval thresholds, and unclear resident answers route to staff.",
      },
    ],
    beforeAfter: {
      before: [
        "Coordinators chase basic details before a request can be routed.",
        "Urgent and routine requests arrive in the same queue.",
        "Vendors receive incomplete context and send avoidable follow-up questions.",
      ],
      after: [
        "Residents are prompted for the details and supported photos staff normally have to chase.",
        "Emergency and exception signals route separately from routine intake.",
        "Coordinators, vendors, and approval owners receive the right context with the next action attached.",
      ],
    },
    bestFit: [
      "Your team receives repetitive maintenance requests through several channels.",
      "Staff spend time chasing photos, access notes, and basic troubleshooting details.",
      "You need exception handling before expanding to vendor dispatch automation.",
    ],
    notFit: [
      "You want automation to approve costly repairs without human review.",
      "Emergency handling policies are undefined or inconsistent by property.",
      "Residents must only use a locked portal and no adjacent intake path is allowed.",
    ],
    outcomes: [
      "Capture issue type, exact location, urgency, access notes, resident availability, and supported photos or video.",
      "Separate emergencies from standard maintenance requests.",
      "Route dispatch-ready summaries to coordinators, approved vendors, owner-approval queues, or the work-order system.",
      "Acknowledge the resident and record the expected next update after routing.",
    ],
    workflow: [
      "Match the resident, property, unit, contact channel, and any related open work order.",
      "Check emergency and habitability indicators first so urgent requests bypass routine intake.",
      "Collect the issue category, exact location, symptoms, timing, access permission, pets, and resident availability.",
      "Request supported photos or video and attach each file or secure media link to the correct request.",
      "Apply property, trade, coverage, warranty, urgency, approval, and preferred-vendor routing rules.",
      "Create or update the work order, acknowledge the resident, and log the coordinator, vendor, or approval owner and next update time.",
    ],
    metrics: ["intake completion", "photo completion", "dispatch readiness", "time to route"],
    faqs: [
      {
        question: "How do I automate tenant maintenance intake with photos and routing?",
        answer:
          "Connect the approved resident channel to a structured intake that verifies the property and unit, checks emergency indicators, collects issue details and supported media, applies approval and routing rules, creates or updates the work order, and records who owns the next update.",
      },
      {
        question: "Can this handle emergency maintenance?",
        answer: "It can identify emergency indicators and escalate, but final emergency handling rules should match your operating policy.",
      },
      {
        question: "Can residents send photos?",
        answer: "Yes, when the selected messaging channel and maintenance system support media. The implementation defines file limits, retention, access controls, and how each photo or link attaches to the work order.",
      },
      {
        question: "Can the workflow route directly to a vendor?",
        answer: "Only for categories, properties, vendors, and approval thresholds your team defines. Emergencies, high-cost work, unclear access, duplicate requests, and other exceptions route to staff.",
      },
    ],
    relatedUseCases: [
      { label: "Maintenance request to completion", href: "/use-cases/maintenance-request-to-completion/", description: "Follow the complete journey through vendor coordination, completion evidence, and approved closure." },
      {
        label: "Resident, owner, and vendor communication automation",
        href: "/use-cases/resident-owner-vendor-communication-automation/",
        description: "Coordinate acknowledgements, dispatch, approvals, status relays, and closure without merging private threads.",
      },
      {
        label: "How to automate property management",
        href: "/use-cases/how-to-automate-property-management/",
        description: "Choose the first measurable workflow and define the trigger, exception path, and final record.",
      },
      {
        label: "CRM follow-up cleanup",
        href: "/use-cases/real-estate-crm-follow-up-mess/",
        description: "Keep maintenance intake handoffs, follow-up tasks, and status updates out of messy CRM notes.",
      },
    ],
    relatedPosts: ["property-management-maintenance-intake-automation", "automate-tenant-maintenance-requests"],
  },
  {
    slug: "crm-workflow-automation",
    updatedAt: "2026-09-13",
    eyebrow: "CRM workflow automation",
    title: "Property management CRM setup and automation",
    seoTitle: "Property Management CRM Setup & Automation",
    description:
      "Improve your property management CRM with leasing stages, lead routing, duplicate checks, follow-up tasks, and authorized call, text, and email updates.",
    summary:
      "EMC2Ops provides property management CRM setup and workflow automation for the tools your team already uses. We connect renter inquiries, calls, texts, and tasks so each record shows the current stage, responsible person, and next action.",
    auditFocus:
      "We inspect how conversations become CRM records, where duplicate records appear, what fields matter, and which tasks or stages should update automatically.",
    operatorBrief: {
      "title": "Make your leasing CRM useful for the next shift",
      "intro": "A leasing CRM needs more than a contact list. Agree what each stage means, who owns the renter, and what should happen when a call or message changes the record.",
      "scenarios": [
        {
          "title": "Property management CRM setup",
          "description": "Map inquiry, contacted, tour requested, tour confirmed, application started, and closed stages to your process. Define required fields, a staff owner, a next-action date, and the evidence needed to move a record."
        },
        {
          "title": "Multifamily CRM routing",
          "description": "For a portfolio, keep property interest and the assigned leasing team attached to each inquiry. Match repeat contacts before creating another record; send uncertain matches to review and preserve the original lead source."
        },
        {
          "title": "Apartment CRM follow-up",
          "description": "Connect supported call, text, email, and calendar events to concise notes and tasks. Stop conflicting reminders when staff take over, a tour is confirmed, or the renter opts out. Keep failed updates visible until someone resolves them."
        }
      ],
      "boundary": "This is an implementation service for your existing CRM. Supported integrations, field changes, and access are confirmed during scoping."
    },
    auditCta: {
      label: "Book my CRM workflow audit",
      title: "Want your CRM to show the real next step?",
      body: "We will review your current stages, fields, notes, duplicate rules, task triggers, and reporting gaps before proposing the first cleanup workflow.",
    },
    installables: [
      {
        title: "Workflow triggers",
        description: "Calls, texts, forms, inbox events, bookings, no-shows, approvals, and status changes that should update the CRM.",
      },
      {
        title: "Data captured",
        description: "Source, stage, owner, outcome, next step, due time, lead identity, property, and exception notes.",
      },
      {
        title: "Automation rules",
        description: "Task creation, stage movement, tagging, dedupe checks, summary generation, and owner assignment.",
      },
      {
        title: "CRM writebacks",
        description: "Clean notes and structured fields instead of raw conversation dumps or disconnected task lists.",
      },
      {
        title: "Stop rules",
        description: "Guards for duplicate updates, staff-owned conversations, closed leads, opted-out contacts, and system sync conflicts.",
      },
      {
        title: "Escalation paths",
        description: "Exception queues for unclear ownership, conflicting records, sensitive replies, and updates that need human approval.",
      },
    ],
    beforeAfter: {
      before: [
        "The CRM has stale stages, duplicate contacts, and inconsistent notes.",
        "Staff keep separate reminders because they do not trust tasks.",
        "Reports lag behind what happened in calls, texts, and inboxes.",
      ],
      after: [
        "Important workflow outcomes update the CRM in a consistent shape.",
        "Tasks, stages, and ownership rules match how the team actually works.",
        "Managers can see which records need attention without manual reconciliation.",
      ],
    },
    bestFit: [
      "Your team is considering a CRM switch because follow-up feels messy.",
      "You have duplicate leads, stale stages, and missing ownership rules.",
      "You need CRM updates tied to actual renter, resident, owner, or vendor workflows.",
    ],
    notFit: [
      "You want every raw message copied into the CRM with no filtering.",
      "Your CRM fields, stages, and ownership rules cannot be changed.",
      "You need a full CRM replacement before workflow cleanup can begin.",
    ],
    outcomes: [
      "Log summaries from calls, SMS, forms, and leasing conversations.",
      "Create tasks and update pipeline stages from workflow outcomes.",
      "Reduce duplicate records and stale CRM notes.",
    ],
    workflow: [
      "A leasing, tenant, owner, or vendor conversation reaches a defined outcome.",
      "The workflow converts that interaction into a clean summary and next step.",
      "CRM fields, tasks, tags, and notes update based on your rules.",
      "Staff can review exceptions without retyping the entire conversation.",
    ],
    metrics: ["CRM completeness", "manual updates avoided", "task creation accuracy", "duplicate records reduced"],
    faqs: [
      {
        question: "Can you improve a multifamily CRM without changing platforms?",
        answer: "Often, yes. We first review the stages, property assignments, duplicate rules, and follow-up tasks in the existing platform. If your account supports the required changes and connections, the work can stay there. Missing access may require an approved import, reviewed task, or separately scoped alternative.",
      },
      {
        question: "What should an apartment CRM record contain?",
        answer: "At minimum, record the lead source, contact reference, property interest, current leasing stage, assigned staff member, last action, next task, and due time. Add message permission and stop status for automated outreach, plus a confirmed event reference when a tour is booked.",
      },
      {
        question: "Which CRMs can EMC2Ops connect?",
        answer: "We verify your platform, account permissions, and the exact fields or actions required. Supported APIs, webhooks, middleware, approved imports, or staff-reviewed handoffs may provide the connection. A tool name alone does not establish access.",
      },
      {
        question: "Can the workflow avoid noisy notes?",
        answer: "Yes. We define field rules so the CRM gets outcomes, summaries, and next steps instead of raw conversation clutter.",
      },
    ],
    relatedUseCases: [
      {
        label: "CRM follow-up cleanup",
        href: "/use-cases/real-estate-crm-follow-up-mess/",
        description: "Clean up stages, notes, tasks, duplicates, and follow-up ownership rules.",
      },
      {
        label: "Apartment lead tracking",
        href: "/use-cases/apartment-lead-tracking/",
        description: "Keep renter source, qualification, ownership, and CRM next steps visible.",
      },
      {
        label: "How to automate property management",
        href: "/use-cases/how-to-automate-property-management/",
        description: "Define the operating workflow before adding AI, Zapier, or CRM logic.",
      },
    ],
    relatedPosts: ["property-management-crm-workflow-automation", "property-management-lead-deduplication-routing"],
  },
  {
    slug: "owner-update-automation",
    eyebrow: "Owner communication",
    title: "Owner update automation for property managers",
    seoTitle: "Owner Update Automation",
    description:
      "Automate owner status updates for leasing, maintenance, renewals, and open issues without adding staff workload.",
    summary:
      "EMC2Ops helps property teams send proactive owner updates from real workflow data instead of rewriting the same status notes manually.",
    auditFocus:
      "We identify repeatable owner-update moments, the source data behind them, which messages need approval, and how completed updates should be logged.",
    operatorBrief: {
      title: "The owner update staff should not have to rewrite",
      intro:
        "Most owner updates are assembled from facts the team already recorded: the last leasing activity, the repair status, the approval still needed, the person responsible, and the promised next check-in. The waste comes from finding those facts again and turning them into a readable message every time an owner asks.",
      scenarios: [
        {
          title: "A vacant unit with active leasing",
          description:
            "An owner-ready note can state the inquiry count, tours completed, applications in progress, current asking rent, and next follow-up date. It should not claim a likely lease or recommend a pricing change unless the responsible manager has approved that judgment.",
        },
        {
          title: "A repair waiting on approval",
          description:
            "The useful update names the issue, evidence received, quote amount, approval threshold, resident impact, and decision deadline. The workflow can prepare and log that summary; the owner or manager still makes the spending decision.",
        },
        {
          title: "A closeout that slipped",
          description:
            "When a vendor misses the promised completion date, the next message should explain what changed, who is following up, and when the owner will hear back. A generic “still in progress” email hides the operating problem instead of reducing it.",
        },
      ],
      boundary:
        "Owner-update automation is best for verified status and agreed next steps. Financial interpretation, disputes, complaints, legal questions, material delays, and relationship-sensitive explanations remain review-required messages.",
    },
    auditCta: {
      label: "Book my owner update audit",
      title: "Want owner updates without rewriting status notes?",
      body: "We will map the recurring owner questions, status triggers, review gates, and logging path that can safely become an update workflow.",
    },
    installables: [
      {
        title: "Status triggers",
        description: "Leasing, maintenance, renewal, vacancy, repair approval, and open-issue events that should create an owner-facing update.",
      },
      {
        title: "Data captured",
        description: "Property, owner, issue status, renter or resident context, next step, approval need, and sensitive details to exclude.",
      },
      {
        title: "Update automations",
        description: "Drafts, reminders, approval queues, and send rules matched to owner communication policies.",
      },
      {
        title: "System writebacks",
        description: "Sent status, reviewer, timestamp, summary, and next follow-up logged to your CRM, inbox, or property management system.",
      },
      {
        title: "Stop rules",
        description: "Suppression for sensitive updates, active staff conversations, already-sent notices, legal questions, and owner opt-outs.",
      },
      {
        title: "Escalation paths",
        description: "Human review for costs, complaints, delays, approval requests, financial issues, and relationship-sensitive messages.",
      },
    ],
    beforeAfter: {
      before: [
        "Owners ask for updates because status is not proactively communicated.",
        "Staff rewrite the same leasing and maintenance summaries by hand.",
        "Sensitive updates depend on memory instead of a clear review gate.",
      ],
      after: [
        "Repeatable owner updates are drafted from workflow data.",
        "Staff review only the messages that need judgment.",
        "Sent updates and follow-up commitments are logged where the team can see them.",
      ],
    },
    bestFit: [
      "Owners ask the same leasing, maintenance, and renewal status questions repeatedly.",
      "Your team wants proactive updates but still needs review for sensitive topics.",
      "You have reliable workflow data that can support owner-facing summaries.",
    ],
    notFit: [
      "You want automation to handle owner disputes or financial decisions without staff review.",
      "Status data is not available in any consistent system, inbox, or workflow.",
      "Owner communication rules vary so much that no repeatable update path exists.",
    ],
    outcomes: [
      "Send structured owner updates before owners have to ask.",
      "Summarize leasing, maintenance, and renewal progress.",
      "Keep sensitive exceptions routed to staff for review.",
    ],
    workflow: [
      "A relevant status changes in leasing, maintenance, renewal, or operations.",
      "The workflow prepares an owner-friendly summary.",
      "Human review is kept for sensitive or high-stakes updates.",
      "Approved updates are sent and logged.",
    ],
    metrics: ["owner check-ins reduced", "status update coverage", "review time", "open issue visibility"],
    faqs: [
      {
        question: "Should every owner update be automated?",
        answer: "No. Use automation for repeatable status updates and keep human review for sensitive, financial, or relationship-heavy messages.",
      },
      {
        question: "Can updates be held for approval?",
        answer: "Yes. Approval steps are recommended when the message affects owner trust, cost, or policy.",
      },
    ],
    relatedUseCases: [
      { label: "Maintenance request to completion", href: "/use-cases/maintenance-request-to-completion/", description: "Follow the complete journey through vendor coordination, completion evidence, and approved closure." },
      {
        label: "How to automate property management",
        href: "/use-cases/how-to-automate-property-management/",
        description: "Start with a workflow that has clear events, owner visibility, and human review gates.",
      },
      {
        label: "CRM follow-up cleanup",
        href: "/use-cases/real-estate-crm-follow-up-mess/",
        description: "Use cleaner stages, notes, and tasks so owner updates come from reliable workflow data.",
      },
    ],
    relatedPosts: ["owner-updates-property-management-automation", "how-property-managers-get-new-owners"],
  },
  {
    slug: "vendor-dispatch-automation",
    updatedAt: "2026-09-06",
    eyebrow: "Vendor dispatch",
    title: "Vendor dispatch automation for property managers",
    seoTitle: "Vendor Dispatch Automation",
    description:
      "Route maintenance requests to vendors with issue context, urgency, property details, approvals, and CRM status updates.",
    summary:
      "EMC2Ops installs vendor dispatch workflows that reduce coordination loops while preserving approvals and escalation rules.",
    auditFocus:
      "We review maintenance categories, vendor rules, approval thresholds, resident access notes, dispatch channels, and status logging.",
    auditCta: {
      label: "Book my vendor dispatch audit",
      title: "Want vendor handoffs with fewer coordination loops?",
      body: "We will map which requests can dispatch automatically, which need approval, and how vendor status should return to your operating record.",
    },
    installables: [
      {
        title: "Dispatch triggers",
        description: "Qualified maintenance categories, property rules, urgency levels, and approval states that can start vendor routing.",
      },
      {
        title: "Data captured",
        description: "Trade, property, unit, resident access, photos, urgency, owner threshold, preferred vendor, and dispatch notes.",
      },
      {
        title: "Routing automations",
        description: "Vendor selection, message creation, coordinator alerts, reminder timing, and fallback routing for no response.",
      },
      {
        title: "Writebacks",
        description: "Dispatch status, vendor response, delay, approval, completion, and exception summaries logged to the work-order record.",
      },
      {
        title: "Stop rules",
        description: "Automation pauses when approval is required, staff take over, a vendor declines, or resident context changes.",
      },
      {
        title: "Escalation paths",
        description: "Human review for emergencies, high-cost repairs, owner approvals, resident complaints, and vendor exceptions.",
      },
    ],
    beforeAfter: {
      before: [
        "Coordinators manually copy request details into vendor messages.",
        "Approval thresholds are checked late or inconsistently.",
        "Vendor delays require manual reminders and status hunting.",
      ],
      after: [
        "Qualified requests route with the details vendors need to respond.",
        "Approval and emergency rules are checked before dispatch.",
        "Vendor status and exceptions return to the work-order record.",
      ],
    },
    bestFit: [
      "Your maintenance team repeats the same vendor routing steps every day.",
      "Vendors need better context before accepting or scheduling work.",
      "Approval thresholds and exception rules can be defined by property, owner, or trade.",
    ],
    notFit: [
      "You want automation to approve repairs outside your policy.",
      "Vendor lists, rates, and approval thresholds are not documented anywhere.",
      "Your current request intake does not collect enough details to route safely.",
    ],
    outcomes: [
      "Route categorized requests to the right vendor or staff path.",
      "Attach issue context, access notes, resident details, and urgency.",
      "Track dispatch status and update the CRM or work order record.",
    ],
    workflow: [
      "A maintenance request is categorized and ready for routing.",
      "The workflow checks trade, property, urgency, owner approval, and vendor rules.",
      "A clean dispatch summary is sent to the right path.",
      "Completion, delays, and exceptions are logged for staff visibility.",
    ],
    metrics: ["time to dispatch", "vendor response", "approval cycle time", "open work order visibility"],
    faqs: [
      {
        question: "Can dispatch rules vary by property?",
        answer: "Yes. Vendor lists, approval thresholds, and escalation rules can be configured by property, owner, trade, or urgency.",
      },
      {
        question: "Does automation approve repairs?",
        answer: "No. Expensive or policy-sensitive repairs should keep human approval before vendor action.",
      },
    ],
    relatedUseCases: [
      {
        label: "How to automate property management",
        href: "/use-cases/how-to-automate-property-management/",
        description: "Pick a narrow maintenance or vendor handoff before expanding automation.",
      },
      {
        label: "CRM follow-up cleanup",
        href: "/use-cases/real-estate-crm-follow-up-mess/",
        description: "Keep vendor dispatch ownership, exceptions, and status updates visible in the operating record.",
      },
    ],
    relatedPosts: ["automate-vendor-dispatch-property-management", "property-management-repair-approval-automation"],
  },
  {
    slug: "ai-front-desk-property-management",
    updatedAt: "2026-09-13",
    eyebrow: "AI front desk",
    title: "AI property management answering service with staff handoffs",
    seoTitle: "AI Property Management Answering Service",
    description:
      "Custom AI property management answering service setup for leasing calls, resident intake, staff routing, and CRM updates using your approved rules.",
    summary:
      "EMC2Ops builds an AI property management answering service around your phone system and operating rules. The AI front desk answers approved questions, collects caller details, and routes leasing inquiries, resident requests, and follow-up tasks to the right staff member.",
    auditFocus:
      "We scope the calls to answer, coverage hours, approved information, transfer destinations, and records to update. Your proposal defines the voice provider, usage costs, integration access, monitoring, and the staff fallback when an automated path cannot finish.",
    operatorBrief: {
      "title": "What happens in a real front-desk conversation",
      "intro": "The existing PM Ops screenshot demonstrates fictional workflow data. For your implementation, each enabled channel must produce an identifiable event, a usable record, and an accountable next owner.",
      "scenarios": [
        {
          "title": "Captured: call facts and renter intent",
          "description": "A fictional Cedar Court caller asks about a two-bedroom tour. Capture the call ID, received time, source/property, confirmed contact, requested move date, unit preference, and next question. Recording or transcription is separately scoped; metadata and staff dispositions can also support the record."
        },
        {
          "title": "Routed: an owned conversation",
          "description": "The leasing queue receives the summary, current stage, requested action, and source record. A maintenance report moves to the documented maintenance route; emergencies, sensitive questions, and approvals reach the designated staff path. For a resident reporting water on the floor, collect the unit and concise facts, activate the documented escalation rule, and avoid improvised safety instructions."
        },
        {
          "title": "Recorded: SMS and CRM outcomes",
          "description": "An approved follow-up text uses the confirmed contact and current permission state. Store provider acceptance, delivery, reply, and saved CRM activity separately. A booked tour needs a confirmed calendar event; a failed write leaves a visible review task. An owner asking about a delayed repair reaches the portfolio manager with the work order, last vendor update, pending approval, and promised response time."
        }
      ],
      "boundary": "People retain screening, accommodations, emergency assessment, financial decisions, and policy exceptions. Staff takeover stops conflicting messages across the enabled channels."
    },
    auditCta: {
      label: "Book my AI front desk audit",
      title: "Want an AI front desk that starts with one useful workflow?",
      body: "We will help pick the first measurable front-desk workflow and define the controls needed before expanding across channels.",
    },
    installables: [
      {
        title: "Channel triggers",
        description: "Voice, SMS, form, inbox, or portal events that begin a leasing, resident, owner, or vendor workflow.",
      },
      {
        title: "Context capture",
        description: "Caller identity, property, intent, urgency, contact details, prior status, and the next step staff need.",
      },
      {
        title: "Front-desk automations",
        description: "Triage, routing, scheduling prompts, intake questions, reminders, and status updates built around your operating rules.",
      },
      {
        title: "System writebacks",
        description: "Summaries, tasks, notes, stage updates, and alerts routed to the CRM or system of record.",
      },
      {
        title: "Stop rules",
        description: "Hand-off guards for staff takeover, opt-outs, sensitive questions, emergencies, and unclear answers.",
      },
      {
        title: "Escalation paths",
        description: "Human review for fair-housing-sensitive questions, complaints, emergencies, owner issues, payments, and approval decisions.",
      },
    ],
    beforeAfter: {
      before: [
        "AI is discussed as a chatbot instead of a measurable operating workflow.",
        "Inbound calls and messages scatter across staff, inboxes, and CRM notes.",
        "Teams worry automation will create risk or duplicate work.",
      ],
      after: [
        "The first AI front-desk workflow has a trigger, owner, record, and exception path.",
        "Staff receive clean context instead of starting from scratch.",
        "Expansion happens after the first workflow is measured and tuned.",
      ],
    },
    bestFit: [
      "You want AI across front-desk communication but need a controlled first rollout.",
      "Your team has repeatable leasing, resident, owner, or vendor requests.",
      "You need human gates for sensitive questions and system-of-record updates.",
    ],
    notFit: [
      "You want an unsupervised chatbot to answer every property question.",
      "Your team is not ready to pick a first workflow or define escalation rules.",
      "You need a marketing demo rather than an operating workflow tied to records.",
    ],
    outcomes: [
      "Respond faster across leasing, tenant, owner, and vendor workflows.",
      "Collect the right context before staff step in.",
      "Keep CRM records, tasks, and alerts current without manual retyping.",
    ],
    workflow: [
      "Capture the provider event ID, channel, property, contact reference, stated intent, and permission state. Treat uncertain matches as review tasks.",
      "Answer from approved current sources and collect the fields needed for the specific leasing, resident, owner, or vendor handoff.",
      "Route the conversation to the designated staff owner with a concise summary, source references, pending question, and acknowledgement requirement.",
      "If an approved SMS follow-up is needed after a voice call, link it to the same confirmed record and recheck suppression, staff takeover, and the current stage before sending.",
      "Write the supported summary, status, and task to the CRM; confirm the saved record rather than treating a sent request as completion.",
      "Monitor failed deliveries, denied writes, duplicate events, and unacknowledged escalations. Keep an owned retry or manual-review path without duplicate messages."
    ],
    metrics: ["response speed", "workflow volume", "manual work removed", "booked next steps"],
    faqs: [
      {
        question: "Can this work as an apartment answering service after hours?",
        answer: "Yes, when your phone provider and agreed configuration support after-hours routing. We define which leasing questions the AI may answer, where resident requests go, and who receives escalations. Coverage depends on the configured services and a reachable staff fallback; we do not provide a staffed call center.",
      },
      {
        question: "What does a leasing answering service need before launch?",
        answer: "Bring the property numbers, call types, coverage schedule, approved answers, tour-booking process, and staff escalation contacts. We test ordinary calls, missing information, unanswered transfers, duplicate events, and failed record updates before the agreed launch.",
      },
      {
        question: "Can we keep our existing answering service or phone number?",
        answer: "We first check your provider’s forwarding and integration options. An AI front desk can handle defined intake steps or pass summaries to your current team or answering provider when supported. Keeping a number, transferring calls, and connecting records must be verified for your setup.",
      },
      {
        question: "How is an AI answering service priced?",
        answer: "EMC2Ops scopes implementation, testing, and maintenance for your workflow. Voice minutes, phone numbers, messaging, and other provider charges depend on the chosen services and usage. The written proposal separates those costs and defines the included work.",
      },
      {
        question: "Is this a chatbot subscription?",
        answer: "No. EMC2Ops installs operating workflows across voice, SMS, routing, CRM updates, and reporting.",
      },
      {
        question: "What should property managers automate first?",
        answer: "Most teams should start with missed-call recovery, leasing follow-up, maintenance intake, or CRM logging because those are easy to measure.",
      },
    ],
    relatedUseCases: [
      {"label": "Compare AI answering and a staffed call center", "href": "/compare/ai-front-desk-vs-call-center/", "description": "Compare coverage, staff handoffs, and which conversations need a person."},
      {
        label: "How to automate property management",
        href: "/use-cases/how-to-automate-property-management/",
        description: "Choose the first workflow for an AI front desk rollout without creating another mess.",
      },
      {
        label: "Real estate lead follow-up automation",
        href: "/use-cases/real-estate-lead-follow-up-automation/",
        description: "Connect AI front desk intake to practical leasing follow-up and CRM updates.",
      },
    ],
    relatedPosts: [
      "ai-leasing-assistant",
      "ai-front-desk-loop-not-chatbot",
      "missed-call-text-back-property-management",
      "property-management-ai-automation-vs-chatbots"
    ],
  },
];

export function serviceUrl(service: ServicePage) {
  return `/services/${service.slug}/`;
}

export function serviceSchema(service: ServicePage) {
  const url = absoluteUrl(serviceUrl(service));
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: service.title,
        description: service.description,
        ...(service.updatedAt ? { dateModified: service.updatedAt } : {}),
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        inLanguage: "en-US",
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        serviceType: service.eyebrow,
        provider: { "@id": `${siteUrl}/#organization` },
        description: service.description,
        areaServed: "United States",
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Property management companies and multifamily operators",
        },
        serviceOutput: service.outcomes,
        potentialAction: {
          "@type": "ScheduleAction",
          target: `${siteUrl}${auditHref(service.slug, "service")}`,
          name: service.auditCta.label,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services/` },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
