const { test, expect } = require('@playwright/test')

test.use({
  baseURL: 'http://localhost:3000',
  headless: true,
})

test('counter slice state is replace by server state', async ({ page }) => {
  await page.goto('/')
  await page.click('#btn')
  await page.click('#btn')
  await page.click('#btn')
  await expect(page.locator('#count')).toContainText('3')
  await page.goto('/page-one')
  await expect(page.locator('#count')).toContainText('2')
})
