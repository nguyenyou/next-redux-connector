const { test, expect } = require('@playwright/test')
const { SELECTORS } = require('@nrc/shared')

test.use({
  baseURL: 'http://localhost:3001',
  headless: true,
})

test('store dispatch in getServerSideProps', async ({ page }) => {
  await page.goto('/page-one')
  await expect(page.locator(SELECTORS.COUNTER_VALUE)).toContainText('1')
})
