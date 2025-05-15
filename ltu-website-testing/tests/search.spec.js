test('Sökning med existerande nyckelord', async ({ page }) => {
  await page.goto('https://ltu-i0015n-2024-web.azurewebsites.net/');
  await page.fill('input[placeholder="Search term"]', 'cat');
  await page.click('button[type="submit"]');
  await expect(page.locator('.image-card')).toHaveCountGreaterThan(0);
});


test('Sökning med icke-existerande nyckelord', async ({ page }) => {
  await page.goto('https://ltu-i0015n-2024-web.azurewebsites.net/');
  await page.fill('input[placeholder="Search term"]', 'xyzabc');
  await page.click('button[type="submit"]');
  await expect(page.locator('.image-card')).toHaveCount(0);
});
