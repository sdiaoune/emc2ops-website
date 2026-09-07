// Shared by the homepage and its static, downloadable launch checklist.
export const customerLaunchInputs = [
  "The process to automate, its trigger, inputs, desired output, and current bottleneck.",
  "Current property facts, operating rules, sample records, and approved wording.",
  "For messaging: permission-to-text records, sending rules, and opt-out instructions.",
  "Authorized software access and the record fields to update.",
  "A decision-maker, normal staff hours, and an after-hours contact.",
] as const;

export const implementationDeliverables = [
  "A configured automation with defined inputs, outputs, approvals, and exception handling.",
  "Connections that save information in the agreed record fields.",
  "Documented tests, measurement definitions, and team instructions.",
  "Launch monitoring and the support included in your written quote.",
] as const;

export const rolloutSteps = [
  ["Scope", "We document your workflow, required data, connected systems, project boundaries, and measures of success."],
  ["Configure", "We build the workflow rules, authorized connections, record updates, and staff notifications."],
  ["Test", "We check sample records, duplicates, missing details, approval gates, and connection failures; messaging tests include opt-outs."],
  ["Approve", "Your designated owner signs off on messages, test results, rules for staff review, and launch scope."],
  ["Launch and maintain", "We enable the approved workflow, monitor errors and outcomes, and maintain the solution within the agreed support scope."],
] as const;

export const launchApprovalChecks = [
  "A sample workflow reaches the intended system and responsible staff member.",
  "Required details and the next action appear in the correct record.",
  "For messaging, an opt-out or staff takeover ends automated follow-up.",
  "Unanswered questions and connection failures reach the agreed human contact.",
] as const;
