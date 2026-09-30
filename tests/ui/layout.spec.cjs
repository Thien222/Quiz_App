const { test, expect } = require('@playwright/test');

async function openScreen(page, route, text) {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await expect(page.getByText(text, { exact: true }).first()).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

async function expectNoOverflow(page) {
  const overflow = await page.evaluate(() => {
    const problems = [];
    for (const el of document.querySelectorAll('div, a, button')) {
      if (!el.getClientRects().length) continue;
      if (el.closest('[aria-hidden="true"]')) continue;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      // Horizontal carousels intentionally extend beyond their viewport.
      let carousel = false;
      for (let parent = el.parentElement; parent; parent = parent.parentElement) {
        if (['auto', 'scroll'].includes(getComputedStyle(parent).overflowX)) carousel = true;
      }
      if (carousel) continue;
      if (rect.left < -2 || rect.right > innerWidth + 2) {
        problems.push({ text: el.innerText?.slice(0, 70), left: rect.left, right: rect.right });
      }
    }
    return problems.slice(0, 12);
  });
  expect(overflow, 'Content extends past the screen edges').toEqual([]);
}

for (const width of [320, 360, 375, 390, 412, 430, 768, 1280]) {
  test(`screens fit ${width}px without runtime errors`, async ({ page }) => {
    await page.setViewportSize({ width, height: width >= 768 ? 1024 : 844 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [route, text] of [
      ['/welcome', 'Bắt đầu ngay'],
      ['/(tabs)', 'Chào Bạn xinh ✨'],
      ['/discover', 'Quiz đang được yêu thích'],
      ['/history', 'Một kết quả xinh đang chờ'],
      ['/profile', 'Hồ sơ của bạn'],
      ['/daily', 'Một chút dễ thương dành riêng cho bạn'],
      ['/future-partner', 'AI'],
      ['/notifications', 'Hộp thư đang thật yên'],
      ['/premium', 'Chọn gói mở khóa'],
      ['/quiz/love-style', 'Bắt đầu làm quiz'],
      ['/quiz/result/demo', 'Kết quả của bạn ✨'],
    ]) {
      await openScreen(page, route, text);
      await expectNoOverflow(page);
    }
    expect(errors).toEqual([]);
  });

  test(`discovery grid and tab labels at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await openScreen(page, '/discover', 'Quiz đang được yêu thích');
    const first = await page.getByRole('button', { name: 'Bạn yêu như thế nào?', exact: true }).boundingBox();
    const second = await page.getByRole('button', { name: 'Red flag khi yêu', exact: true }).boundingBox();
    expect(Math.abs(first.y - second.y)).toBeLessThan(2);
    expect(second.x).toBeGreaterThan(first.x + first.width);
    const tabs = page.getByRole('tab');
    await expect(tabs).toHaveCount(4);
    for (const tab of await tabs.all()) {
      const box = await tab.boundingBox();
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
      const clipped = await tab.evaluate(el => [...el.querySelectorAll('span')].filter(child => {
        const rect = child.getBoundingClientRect();
        const parent = child.parentElement.getBoundingClientRect();
        return rect.bottom > parent.bottom + 1 || rect.right > parent.right + 1;
      }).map(el => el.textContent));
      expect(clipped).toEqual([]);
    }
  });
}

test('quiz selection, resume, results, insight and history work end to end', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openScreen(page, '/quiz/love-style', 'Bắt đầu làm quiz');
  await page.getByRole('button', { name: /Bắt đầu làm quiz/ }).click();
  const next = page.getByRole('button', { name: /Tiếp tục/ });
  await expect(next).toBeDisabled();
  await page.getByRole('radio').first().click();
  await page.getByRole('button', { name: 'Quay lại', exact: true }).click();
  await expect(page.getByText('Tạm dừng một chút?')).toBeVisible();
  await page.getByRole('button', { name: 'Về trang chủ', exact: true }).click();
  await page.getByRole('button', { name: 'Tiếp tục quiz đang làm', exact: true }).click();
  await expect(page.getByRole('radio').first()).toBeChecked();
  for (let index = 0; index < 20; index++) {
    await expect(page.getByText(`${index + 1}/20`, { exact: true })).toBeVisible();
    await page.getByRole('radio').first().click();
    await page.getByRole('button', { name: index === 19 ? /Xem kết quả/ : /Tiếp tục/ }).click();
  }
  await expect(page.getByText('Kết quả của bạn ✨')).toBeVisible();
  await expectNoOverflow(page);
  await page.getByRole('button').filter({ hasText: 'Kiểu yêu của bạn' }).click();
  await expect(page.getByRole('button', { name: 'Đóng', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Đóng', exact: true }).click();
  await page.goto('/history');
  await expect(page.getByText('KẾT QUẢ GẦN NHẤT')).toBeVisible();
  await page.getByRole('button', { name: /^Xem kết quả / }).click();
  await expect(page.getByText('Kết quả của bạn ✨')).toBeVisible();
});

test('premium plan selection and unavailable payment feedback', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await openScreen(page, '/premium', 'Chọn gói mở khóa');
  await page.getByRole('radio').filter({ hasText: 'Mở một kết quả' }).click();
  await page.getByRole('button', { name: /Mở khóa ngay.*10.000đ/ }).click();
  await expect(page.getByText('Premium sắp sẵn sàng')).toBeVisible();
  await expectNoOverflow(page);
  await page.getByRole('button', { name: 'Đóng', exact: true }).click();
  await expect(page.getByText('Premium sắp sẵn sàng')).not.toBeVisible();
});
