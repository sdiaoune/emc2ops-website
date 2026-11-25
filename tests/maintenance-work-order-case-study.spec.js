const { test, expect } = require("@playwright/test");

test("case study shows the fixed time estimate and platform-specific share cards", async ({ page }) => {
  await page.goto("/resources/");
  await page.getByRole("link", { name: "Read the project case study" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("One repair queue for 25 properties");
  await page.getByRole("link", { name: "See the time savings" }).click();

  const estimate = page.getByRole("region", { name: "Time saved on coordination" });
  await expect(estimate.getByText("73.5 hours", { exact: true })).toBeVisible();
  await expect(estimate).toContainText("147 work orders × 30 minutes = 4,410 minutes");
  await expect(estimate.getByRole("slider")).toHaveCount(0);

  const imageRoot = "https://www.emc2ops.com/assets/case-studies/maintenance-work-orders/";
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", imageRoot + "maintenance-time-saved-x.jpg");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", imageRoot + "maintenance-time-saved-linkedin.jpg");
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "627");
});
