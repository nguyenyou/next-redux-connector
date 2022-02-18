const { test, expect } = require('@playwright/test')

test.use({
  baseURL: 'http://localhost:3002',
  headless: true,
})

test('store is working', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#count')).toContainText('0')
})
