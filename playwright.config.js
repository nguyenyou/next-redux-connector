const { devices } = require('@playwright/test')

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  retries: 1,
  workers: 5,
  use: {
    headless: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'Pixel 4',
    //   use: {
    //     browserName: 'chromium',
    //     ...devices['Pixel 4'],
    //   },
    // },
    // {
    //   name: 'iPhone 11',
    //   use: {
    //     browserName: 'webkit',
    //     ...devices['iPhone 11'],
    //   },
    // },
  ],
}

module.exports = config
