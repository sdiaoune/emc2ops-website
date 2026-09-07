export type HomepageFaq = {
  question: string;
  answer: string;
  cta?: {
    label: string;
    href: string;
  };
};

export const homepageBuyerFaqs: HomepageFaq[] = [
  {
    question: "Can you build a workflow that is not listed, including live calls or missed-call replies?",
    answer:
      "Yes. Bring the process, systems, and result you have in mind. We design and build custom automations, including live voice answering and missed-call text follow-up. Scoping confirms the access, rules, approvals, and support your solution needs.",
    cta: {
      label: "Explore custom implementation",
      href: "/services/custom-property-management-automation/",
    },
  },
  {
    question: "How quickly can we launch—and how much work will my team do?",
    answer:
      "Your written scope sets the launch window after access and registration requirements are checked. Prepare property information, software permissions, and a decision-maker. EMC2Ops builds and tests the process; your designated owner reviews the results before launch.",
    cta: {
      label: "Review the rollout approach",
      href: "/blog/property-management-ai-implementation-timeline/",
    },
  },
  {
    question: "What happens after the first reply or workflow step?",
    answer:
      "The workflow follows your approved rules: collect more information, update a record, request approval, or assign a staff task. For leasing, that can include an approved booking path. Opt-outs and staff takeover stop automated messages; uncertain cases reach a person.",
    cta: {
      label: "See the lead-to-lease path",
      href: "/use-cases/lead-to-lease-automation/",
    },
  },
  {
    question: "Which property types and portfolio sizes are the best fit?",
    answer:
      "The best fit is a property management, apartment, or rental team with repeatable operational work and someone responsible for approvals. Door count alone does not determine fit. First confirm that property information is reliable and staff can handle exceptions.",
    cta: {
      label: "Check the launch requirements",
      href: "/#implementation",
    },
  },
  {
    question: "How is the AI customized for each property and brand?",
    answer:
      "We use your property facts, brand wording, renter questions, and staff instructions. Your team tests and approves sample answers. The assistant must refer questions about unconfirmed availability, prices, policies, or legal issues to a person instead of inventing an answer.",
    cta: {
      label: "Compare custom and off-the-shelf AI",
      href: "/compare/custom-automation-vs-off-the-shelf-property-management-ai/",
    },
  },
  {
    question: "Who handles exceptions after hours?",
    answer:
      "Your designated on-call team handles urgent exceptions; the next-business-day team handles requests assigned to normal hours. The system records and routes each request. Automated 24/7 intake means collecting requests, not guaranteed staffed resolution or a replacement for emergency services.",
    cta: {
      label: "Map an after-hours workflow",
      href: "/blog/after-hours-leasing-automation/",
    },
  },
  {
    question: "Why choose EMC2Ops instead of EliseAI, a chatbot, a call center, or PMS-native AI?",
    answer:
      "Choose EMC2Ops for implementation across tools you already use. Compare a built-in property-system assistant, EliseAI, a chatbot, or a call center when one product or staffed service covers the requirement. Existing tools do not need replacing solely to add automation.",
    cta: {
      label: "Compare the buying options",
      href: "/compare/",
    },
  },
  {
    question: "Which languages are supported?",
    answer:
      "English is the default. Additional languages require testing with the selected voice or text service and property-specific answers. Your team reviews wording and accuracy before support is confirmed; unclear or sensitive questions still go to a person.",
    cta: {
      label: "See the language testing steps",
      href: "/#language-testing",
    },
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing is quote-based. Your proposal separates the implementation, ongoing support, and any additional provider charges. It records included work, assumptions, and exclusions so you can evaluate the scope before approving it. Additional properties or processes are scoped separately.",
    cta: {
      label: "Review the custom automation offer",
      href: "/#pricing",
    },
  },
];

export const homepageSetupFaqs: HomepageFaq[] = [
  {
    question: "Does this replace my team?",
    answer:
      "No. It handles repeatable requests and record updates so staff receive a prepared next task. People retain decisions, negotiations, exceptions, sensitive conversations, and emergency response. Staff takeover stops automated replies rather than running a competing conversation.",
  },
  {
    question: "Can it connect to my CRM or property-management system?",
    answer:
      "We verify the records and actions your account permits before committing to a direct connection. If access is limited, an agreed inbox, form, or staff task carries the request. The integration comparison explains the options for each platform.",
  },
  {
    question: "What about SMS compliance?",
    answer:
      "We configure permission-to-text checks, requests to stop messages, and permitted sending hours. Your business approves the policies and satisfies legal and provider requirements. Software setup alone does not establish compliance; review the messaging safeguards before approving launch.",
    cta: {
      label: "Review the messaging safeguards",
      href: "/#messaging-safeguards",
    },
  },
  {
    question: "Can it handle maintenance requests through completion?",
    answer:
      "Yes. We can connect intake, staff review, vendor coordination, status updates, completion evidence, and closure records. Your team approves dispatch and verifies completion. Automation does not diagnose faults, perform repairs, or replace emergency procedures.",
  },
];

export const homepageFaqs = [...homepageBuyerFaqs, ...homepageSetupFaqs];
