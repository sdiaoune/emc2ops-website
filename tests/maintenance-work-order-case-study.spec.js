const { test, expect } = require("@playwright/test");
const { projectDetails, study } = require("../src/data/maintenanceWorkOrders.ts");

test("case study publishes verified results without editorial placeholders", async ({ page }) => {
  await page.goto("/resources/");
  await page.getByRole("link", { name: "Read the project case study" }).click();
  const response = await page.request.get(study.path);
  expect(response.ok()).toBe(true);
  expect(await response.text()).not.toMatch(/todo/i);
  await expect(page.locator("body")).not.toContainText(/todo/i);
  const headline = "147 repairs across 25 properties, one queue";
  const hero = page.getByRole("region", { name: headline });
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText(headline);
  await expect(hero).toContainText("96.6% of orders assigned");
  await expect(hero).not.toContainText("73.5");

  const hasVideo = Boolean(projectDetails.demoEmbedUrl?.trim());
  await expect(page.locator("section.study-demo")).toHaveCount(hasVideo ? 1 : 0);
  await expect(page.locator(".study-demo iframe")).toHaveCount(hasVideo ? 1 : 0);
  const hasTestimonial = Boolean(projectDetails.testimonial?.quote && projectDetails.testimonial.anonymizedTitle);
  await expect(page.locator("main blockquote")).toHaveCount(hasTestimonial ? 1 : 0);
  await expect(page.locator("main figcaption").filter({ hasText: "fictional details" })).toHaveCount(2);

  const workload = page.getByRole("region", { name: "Workload across the portfolio" });
  await expect(workload).toContainText("65 orders marked New on November 25, 62 had an assignee and 23 already had a written note.");
  await expect(workload).toContainText("median time to first note was 12.9 days");
  await expect(workload).toContainText("This is our baseline for the next phase.");
  await hero.getByRole("link", { name: "Explore the workflow" }).click();
  await expect(page).toHaveURL(/#workflow$/);
  const build = page.getByRole("region", { name: "How it was built" });
  await expect(build).toContainText("Claude Code and Codex");
  await expect(build).not.toContainText("Fixes recorded in the build history");

  await hero.getByRole("link", { name: "See estimated time savings" }).click();
  const estimate = page.getByRole("region", { name: "Estimated time savings" });
  await expect(estimate.getByText("73.5 hours", { exact: true })).toBeVisible();
  await expect(estimate).toContainText("147 work orders × 30 minutes = 4,410 minutes");
  await expect(estimate.locator("p").filter({ hasText: "Next: timing" })).toHaveCount(projectDetails.timingSampleSize !== undefined ? 1 : 0);
  await expect(estimate.getByRole("slider")).toHaveCount(0);

  await expect(page.locator("section.study-triage")).toHaveCount(projectDetails.triageStarted ? 1 : 0);
  const imageRoot = "https://www.emc2ops.com/assets/case-studies/maintenance-work-orders/";
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", imageRoot + "maintenance-time-saved-x.jpg");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", imageRoot + "maintenance-time-saved-linkedin.jpg");
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "627");
});
