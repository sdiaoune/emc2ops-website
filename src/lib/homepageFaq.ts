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
    question: "What is included in the missed-call leasing pilot?",
    answer:
      "The pilot covers one leasing number, consent-appropriate text follow-up, basic renter inquiry capture, an existing scheduler or staff handoff, and outcome reporting. We check provider access and test stop rules before launch. Maintenance intake, live call answering, and custom CRM development are excluded.",
    cta: {
      label: "Review the pilot scope",
      href: "/services/missed-call-recovery/",
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
      "The pilot fits small residential property managers with unanswered leasing calls, ineffective follow-up, and a staff member who can handle replies. Door count alone does not determine fit. If your existing provider already handles missed calls effectively, the pilot may add little value.",
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
      "Your designated staff receive the inquiry summary and handle questions the workflow cannot answer. Your team agrees when replies will be reviewed and who owns the next action. Automated inquiry capture does not promise staffed resolution, confirmed availability, or a booked tour after hours.",
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
      label: "Review the pilot scope and cost",
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
    question: "Does the pilot include maintenance requests or live call answering?",
    answer:
      "No. This pilot follows up on missed leasing calls by text and hands inquiries to your scheduler or staff. Maintenance intake, live AI call answering, and custom CRM development are separate services. Existing guides remain available if you need to explore those workflows.",
  },
];

export const homepageFaqs = [...homepageBuyerFaqs, ...homepageSetupFaqs];
