const { expect, test } = require("@playwright/test");

test("homepage and booking page keep the EMC2Ops theme controls", async ({ page }) => {
  await page.addInitScript(() => {
    if (!window.localStorage.getItem("emc2ops-theme")) {
      window.localStorage.setItem("emc2ops-theme", "light");
    }
  });

  for (const route of ["/", "/book-demo/"]) {
    await page.goto(route);
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await expect(page.locator("[data-theme-toggle]").first()).toHaveAttribute(
      "aria-label",
      "Switch to dark theme",
    );
  }

  await page.goto("/");
  await expect(page.locator("#pricing")).toHaveCount(1);
  await expect(page.locator(".offer-features > li")).toHaveCount(4);
  await expect(page.locator("#services")).toContainText("One number. One recovery workflow.");
  const quoteLink = page.locator("#contact .btn-primary");
  await expect(quoteLink).toHaveAttribute("href", "/book-demo/#workflow=missed-call-recovery&source=homepage");
  await quoteLink.click();
  await expect(page).toHaveURL(/\/book-demo\/#workflow=missed-call-recovery&source=homepage$/);

  await page.goto("/");
  await expect(page.locator("header").getByRole("link", { name: "Review my missed-call pilot" })).toBeVisible();

  await page.goto("/book-demo/");
  await expect(page.locator("h1")).toContainText("Tell us what you want to automate");
  await expect(page.locator("#audit-form")).toContainText("Book your 15-minute consultation");

  await page.goto("/");
  await page.locator("[data-theme-toggle]").first().click();
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.goto("/book-demo/");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.locator("[data-theme-toggle]").first()).toHaveAttribute(
    "aria-label",
    "Switch to light theme",
  );
});
