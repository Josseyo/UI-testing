import { test, expect, Page } from '@playwright/test';

// Helper function for login
async function login(page: Page, username = 'stina', password = 'fåGelskådning') {
  await page.goto('https://ltu-i0015n-2024-web.azurewebsites.net/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill(username);
  await page.getByRole('textbox', { name: 'Password:' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

test('Lyckad inloggning med korrekta uppgifter', async ({ page }) => {
  await login(page);
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});

test('Lyckad inloggning med användare johan', async ({ page }) => {
  await login(page, 'johan', 'FotoGrafeRing1!');
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});

test('Misslyckad inloggning med felaktiga uppgifter', async ({ page }) => {
  await login(page, 'felAnvändare', 'felLösenord');
  // Should be added, check for an error message
  // await expect(page.getByText('Wrong username or password')).toBeVisible();
});

test('Logout', async ({ page }) => {
  await login(page);
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});

// Responsivitetstester
test('Responsivitet - Desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await login(page);
  expect(await page.viewportSize()).toEqual({ width: 1280, height: 800 });
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});

test('Responsivitet - Tablet', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await login(page);
  expect(await page.viewportSize()).toEqual({ width: 768, height: 1024 });
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});

test('Responsivitet - Mobil', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await login(page);
  expect(await page.viewportSize()).toEqual({ width: 375, height: 667 });
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});


