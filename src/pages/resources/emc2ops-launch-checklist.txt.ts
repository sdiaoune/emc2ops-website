import { customerLaunchInputs, implementationDeliverables, launchApprovalChecks, rolloutSteps } from "../../lib/homepageImplementation";
import { homepageMetadata } from "../../lib/homepageContent";

export const prerender = true;

export function GET() {
  const lines = [
    "EMC2Ops — custom automation launch checklist",
    `Updated: ${homepageMetadata.updatedAt}`,
    "https://www.emc2ops.com/#implementation",
    "",
    "YOUR TEAM SUPPLIES",
    ...customerLaunchInputs.map((item) => `[ ] ${item}`),
    "",
    "EMC2OPS DELIVERS",
    ...implementationDeliverables.map((item) => `[ ] ${item}`),
    "",
    "IMPLEMENTATION STAGES",
    ...rolloutSteps.map(([title, body], index) => `${index + 1}. ${title}: ${body}`),
    "",
    "APPROVAL CHECKS BEFORE LAUNCH",
    ...launchApprovalChecks.map((item) => `[ ] ${item}`),
    "",
    "Record the agreed scope, price, launch window, and ongoing support in the written quote.",
    "This checklist does not set a fixed price, delivery deadline, or legal compliance approval.",
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
