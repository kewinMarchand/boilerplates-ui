import { defineConfig, devices } from '@playwright/test'

const PORT = 3140

export default defineConfig({
  testDir: 'tests/a11y',
  testMatch: /.*\.a11y\.ts/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: `http://localhost:${PORT}`, locale: 'fr-FR' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `yarn workspace @kewinmarchand/storybook preview --port ${PORT}`,
    url: `http://localhost:${PORT}/index.json`,
    reuseExistingServer: !process.env.CI,
  },
})
