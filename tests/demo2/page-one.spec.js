const { test, expect } = require('@playwright/test')

test.use({
  baseURL: 'http://localhost:3002',
  headless: true,
})

test('store is working', async ({ page }) => {
  await page.goto('/page-one')
  await expect(page.locator('#count')).toContainText('1')
})
