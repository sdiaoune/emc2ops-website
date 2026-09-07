import test from "node:test";
import assert from "node:assert/strict";
import { supplementalBlogContent } from "../src/lib/blogPresentation.mjs";

const data = { bodySections: true, problem: "Records lose context.", stakes: ["Staff repeat work."], system: ["Assign one owner.", "Review uncertain matches."], metrics: ["Confirmed tours"] };

test("removes complete duplicated statements while retaining unique instructions", () => {
  const result = supplementalBlogContent({ ...data, body: "Records lose context.\n\n- Staff repeat work.\n1. **Assign one owner.**\n- Confirmed tours" });
  assert.deepEqual(result, { problem: "", stakes: [], system: ["Review uncertain matches."], metrics: [] });
});

test("preserves negation, different amounts, and incomplete phrase matches", () => {
  const result = supplementalBlogContent({ ...data, system: ["Send the update.", "Approve $500.", "Assign one owner."], body: "Do not send the update.\nApprove $50.\nAssign one owner only after the manager reviews the case." });
  assert.deepEqual(result.system, ["Send the update.", "Approve $500.", "Assign one owner."]);
});

test("normalizes a linked statement without suppressing additional source facts", () => {
  const result = supplementalBlogContent({ ...data, body: "- Review [uncertain matches](/review/).\n" });
  assert.deepEqual(result.system, ["Assign one owner."]);
  assert.equal(result.problem, data.problem);
});

test("preserves fallback articles and honors reviewed body-only guides", () => {
  assert.deepEqual(supplementalBlogContent({ ...data, bodySections: false, body: "Records lose context." }), { problem: data.problem, stakes: data.stakes, system: data.system, metrics: data.metrics });
  assert.deepEqual(supplementalBlogContent({ ...data, bodyOnly: true }), { problem: "", stakes: [], system: [], metrics: [] });
});
