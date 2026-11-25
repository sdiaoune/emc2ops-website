const { test, expect } = require("@playwright/test");

test("case study leads with measured results and labels its estimates and missing material", async ({ page }) => {
  await page.goto("/resources/");
  await page.getByRole("link", { name: "Read the project case study" }).click();
  const headline = "147 repairs across 25 properties, one queue";
  const hero = page.getByRole("region", { name: headline });
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText(headline);
  await expect(hero).toContainText("96.6% of orders assigned");
  await expect(hero).toContainText("with Claude Code and Codex");
  await expect(hero).not.toContainText("73.5");

  const demo = page.getByRole("region", { name: "Workflow demo" });
  await expect(demo).toContainText("TODO — add the 60–90 second screen recording");
  await expect(demo.locator("iframe")).toHaveCount(0);
  await expect(page.locator("main blockquote")).toHaveCount(0);
  await expect(page.locator("main figcaption").filter({ hasText: "fictional details" })).toHaveCount(2);

  const workload = page.getByRole("region", { name: "Workload across the portfolio" });
  await expect(workload).toContainText("65 orders marked New on November 25, 62 had an assignee and 23 already had a written note.");
  await expect(workload).toContainText("median time to first note was 12.9 days");
  await expect(workload).toContainText("This is our baseline for the next phase.");
  await hero.getByRole("link", { name: "Explore the workflow" }).click();
  await expect(page).toHaveURL(/#workflow$/);
  await expect(page.getByRole("region", { name: "How it was built" })).toContainText("Agent skills I wrote");

  await hero.getByRole("link", { name: "See estimated time savings" }).click();
  const estimate = page.getByRole("region", { name: "Estimated time savings" });
  await expect(estimate.getByText("73.5 hours", { exact: true })).toBeVisible();
  await expect(estimate).toContainText("147 work orders × 30 minutes = 4,410 minutes");
  await expect(estimate).toContainText("Next: timing [TODO] real orders before and after to replace this estimate.");
  await expect(estimate.getByRole("slider")).toHaveCount(0);

  const triage = page.getByRole("region", { name: "What's next: AI triage" });
  await expect(triage).toContainText("In progress");
  await expect(triage).toContainText("Results coming [TODO — month].");
  const imageRoot = "https://www.emc2ops.com/assets/case-studies/maintenance-work-orders/";
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", imageRoot + "maintenance-time-saved-x.jpg");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", imageRoot + "maintenance-time-saved-linkedin.jpg");
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "627");
});
