const { expect, test } = require('@playwright/test');

const servicePath = '/services/missed-call-recovery/';

test('homepage surfaces the focused pilot without replacing the main positioning', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Custom automations for property management companies.');
  const pilot = page.locator('#missed-call-pilot');
  await expect(pilot).toContainText('Start with one missed-call workflow');
  await expect(pilot.getByRole('link', { name: 'Explore missed-call text-back' })).toHaveAttribute('href', servicePath);
  await expect(page.locator('#overview').getByRole('link', { name: 'See the pilot scope and fit' })).toHaveAttribute('href', servicePath);
});

test('pilot service explains scope, fit, safeguards and the existing booking destination', async ({ page }) => {
  await page.goto(servicePath);
  const main = page.locator('main');
  await expect(page.locator('h1')).toHaveText('Missed-call text-back for small property management teams');
  for (const copy of ['one leasing phone number', 'already handles missed calls effectively', 'Maintenance intake, live AI call answering, and custom CRM development are outside this pilot', 'consent', 'opt-out', 'staff take over', 'existing scheduling link', 'two-way replies']) {
    await expect(main).toContainText(copy);
  }
  await expect(page.locator('.hero-actions a').first()).toHaveAttribute('href', '/book-demo/#workflow=missed-call-recovery&source=service');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.emc2ops.com/services/missed-call-recovery/');
  await expect(page.locator('.workflow-integration-card')).toHaveCount(6);
  await expect(main).not.toContainText('Every missed leasing call receives');
});

for (const width of [390, 1024, 1280]) {
  test(`navigation reaches the pilot without horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    const homepageUrl = page.url();
    let nav = page.getByRole('navigation', { name: 'Primary', exact: true });
    if (width < 901) {
      await page.locator('[data-mobile-menu-toggle]').click();
      nav = page.getByRole('navigation', { name: 'Mobile primary', exact: true });
    }
    await nav.getByRole('link', { name: 'Missed-call text-back', exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${servicePath}$`));
    await expect(page.locator('h1')).toContainText('Missed-call text-back');
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)).toBe(false);
    await page.goBack();
    await expect(page).toHaveURL(homepageUrl);
    await expect(page.locator('h1')).toHaveText('Custom automations for property management companies.');
    await expect(page.locator('#sales-chatbot-panel')).toBeHidden();
    if (width < 901) await expect(page.locator('[data-mobile-menu-panel]')).toBeHidden();
  });
}
