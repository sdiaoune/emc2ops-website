const { test, expect } = require("@playwright/test");

test("resource hub opens the case study and the time estimate follows the selected minutes", async ({ page }) => {
  await page.goto("/resources/");
  await page.getByRole("link", { name: "Read the project case study" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("One repair queue for 25 properties");
  await page.getByRole("link", { name: "Estimate time saved" }).click();

  const slider = page.getByRole("slider", { name: "Minutes saved per work order" });
  const result = page.getByRole("status", { name: "Estimated time saved across the study" });
  await expect(result).toHaveText("12 h 15 min");
  await slider.focus();
  await slider.press("Home");
  await expect(result).toHaveText("0 min");
  await slider.press("ArrowRight");
  await expect(result).toHaveText("2 h 27 min");
  await slider.press("End");
  await expect(result).toHaveText("49 h");
  await expect(page.getByText("147 orders × 20 minutes = 2,940 minutes")).toBeVisible();
});
