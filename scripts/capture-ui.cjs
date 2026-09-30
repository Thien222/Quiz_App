const { chromium } = require('@playwright/test');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ channel: process.env.UI_BROWSER || 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
    fs.mkdirSync('artifacts/ui', { recursive: true });
    for (const width of [390, 320, 768]) {
      await page.setViewportSize({ width, height: width === 768 ? 1024 : 844 });
      for (const route of ['welcome', '(tabs)', 'discover', 'quiz/love-style', 'premium', 'daily', 'profile', 'quiz/result/demo']) {
        await page.goto(`${process.env.UI_BASE_URL || 'http://127.0.0.1:8083'}/${route}`, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => document.body.innerText.length > 50, { timeout: 60000 });
        await page.waitForTimeout(1200);
        const name = route.replace(/[^a-z0-9]+/gi, '-');
        await page.screenshot({ path: `artifacts/ui/${name}-${width}.png` });
        await page.evaluate(() => {
          for (const el of document.querySelectorAll('div')) {
            if (['auto', 'scroll'].includes(getComputedStyle(el).overflowY) && el.scrollHeight > el.clientHeight) {
              el.scrollTop = el.scrollHeight;
            }
          }
        });
        await page.screenshot({ path: `artifacts/ui/${name}-${width}-bottom.png` });
        console.log(width, route, (await page.locator('body').innerText()).slice(0, 90).replace(/\n/g, ' '));
      }
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
