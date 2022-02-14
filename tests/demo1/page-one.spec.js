const { test, expect } = require('@playwright/test')

test.use({
  baseURL: 'http://localhost:3001',
  headless: true,
})

test('store dispatch in getServerSideProps', async ({ page }) => {
  await page.goto('/page-one')
  await expect(page.locator('#counter')).toContainText('1')
})
