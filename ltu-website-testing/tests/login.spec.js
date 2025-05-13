const { test, expect } = require('@playwright/test');

test('Inloggning med korrekta uppgifter', async ({ page }) => {
  await page.goto('https://ltu-i0015n-2024-web.azurewebsites.net/');
  await page.click('text=Logga in');
  await page.fill('input[name="username"]', 'stina');
  await page.fill('input[name="password"]', 'fåGelskådning');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/.*dashboard|.*startsida/);
});

test('Inloggning med felaktiga uppgifter', async ({ page }) => {
  await page.goto('https://ltu-i0015n-2024-web.azurewebsites.net/');
  await page.click('text=Logga in');
  await page.fill('input[name="username"]', 'stina');
  await page.fill('input[name="password"]', 'felLösen');
  await page.click('button[type="submit"]');
  await expect(page.locator('.error-message')).toBeVisible();
});
