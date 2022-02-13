const { test, expect } = require('@playwright/test')

test.use({
  baseURL: 'http://localhost:3003',
  headless: true,
})

test('counter slice state is replace by server state', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#count')).toContainText('1')
})
