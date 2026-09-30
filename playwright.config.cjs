const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/ui',
  timeout: 180000,
  expect: { timeout: 15000 },
  workers: 2,
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: process.env.UI_BASE_URL || 'http://127.0.0.1:8083',
    channel: process.env.UI_BROWSER || 'msedge',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/serve-web.cjs',
    url: 'http://127.0.0.1:8083',
    reuseExistingServer: true,
  },
});
