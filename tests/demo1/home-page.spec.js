const { test, expect } = require('@playwright/test')

test.use({
  baseURL: 'http://localhost:3000',
  headless: true
})

test('store is working', async ({ page }) => {
  await page.goto('/')
  await page.click('#btn2')
  await expect(page.locator('#count')).toContainText('1')
})
