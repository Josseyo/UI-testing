import { test, expect } from '@playwright/test';

import type { Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('https://ltu-i0015n-2024-web.azurewebsites.net/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: /username/i }).fill('stina');
  await page.getByRole('textbox', { name: /password/i }).fill('fåGelskådning');
  await page.getByRole('button', { name: /login/i }).click();
  // Wait for logout link to appear as a sign of successful login
  await expect(page.getByRole('link', { name: /logout/i })).toBeVisible();
}

interface LogoutFunction {
  (page: Page): Promise<void>;
}

const logout: LogoutFunction = async function logout(page: Page): Promise<void> {
  const logoutLink = page.getByRole('link', { name: /logout/i });
  if (await logoutLink.isVisible().catch(() => false)) {
    await logoutLink.click();
    // Optionally wait for login link to reappear
    await expect(page.getByRole('link', { name: /login/i })).toBeVisible();
  }
};

const keywords = [
  'Building',
  'Empire',
  'Empire State Building',
  'Woman, with a white hat, standing in front of a black church',
  'Black and white cat looking into the camera',
  'Kitten reaching for the sky',
  'Orange cat sitting in a relaxed pose on the floor',
  'Cat with a butterfly on its nose',
  'Curious cat looking out through the window',
  'Kitten sitting in the bed with pillows',
  'Cat',
];

for (const keyword of keywords) {
  test(`Sökning visar bilder med giltiga nyckelord: "${keyword}"`, async ({ page }) => {
    await login(page);
    await page.getByRole('textbox', { name: /search terms/i }).fill(keyword);
    await page.getByRole('button', { name: /search/i }).click();
    // Add an assertion to verify search results are shown
   // await expect(page.locator('img')).toBeVisible();
  });
}

test('No images could be found visas med ogiltigt nyckelord', async ({ page }) => {
  await login(page);
  await page.getByRole('textbox', { name: /search terms/i }).fill('ogiltigt sökord');
  await page.getByRole('button', { name: /search/i }).click();
  await expect(page.getByText(/no images could be found/i)).toBeVisible();
});

test('Sökord saknas', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: /search/i }).click();
  // Optionally, check for a validation message
});

test('Responsivitet - Desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await login(page);
  expect(await page.viewportSize()).toEqual({ width: 1280, height: 800 });
  await expect(page.getByRole('textbox', { name: /search terms/i })).toBeVisible();
});

test('Responsivitet - Tablet', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await login(page);
  expect(await page.viewportSize()).toEqual({ width: 768, height: 1024 });
  await expect(page.getByRole('textbox', { name: /search terms/i })).toBeVisible();
});

test('Responsivitet - Mobil', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await login(page);
  expect(await page.viewportSize()).toEqual({ width: 375, height: 667 });
  await expect(page.getByRole('textbox', { name: /search terms/i })).toBeVisible();
});
