import { expect, test } from '@playwright/test';

// Helper: tạo context với ngôn ngữ cụ thể
const testVi = test.extend<object>({
  page: async ({ browser }, use) => {
    const ctx = await browser.newContext({ locale: 'vi-VN' });
    const page = await ctx.newPage();
    await use(page);
    await ctx.close();
  },
});

const testEn = test.extend<object>({
  page: async ({ browser }, use) => {
    const ctx = await browser.newContext({ locale: 'en-US' });
    const page = await ctx.newPage();
    await use(page);
    await ctx.close();
  },
});

// 14.1 — getAllPosts: chỉ trả về draft: false, sort đúng date giảm dần
test.describe('Blog listing', () => {
  testVi('không hiển thị bài draft', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByText('Bài nháp - không hiển thị')).not.toBeVisible();
  });

  testVi('các bài được sort theo date giảm dần', async ({ page }) => {
    await page.goto('/blog');

    const titles = await page.locator('article h2').allTextContents();

    // getting-started (2026-06-13) phải xuất hiện trước series-part-1 (2026-05-01)
    const gettingStartedIdx = titles.findIndex((t) => t.includes('Bắt đầu với blog'));
    const seriesPart1Idx = titles.findIndex((t) => t.includes('Phần 1'));

    expect(gettingStartedIdx).toBeGreaterThanOrEqual(0);
    expect(seriesPart1Idx).toBeGreaterThanOrEqual(0);
    expect(gettingStartedIdx).toBeLessThan(seriesPart1Idx);
  });
});

// 14.2 — getPostBySlug: 404 khi slug không tồn tại
test.describe('Blog post slug', () => {
  test('trả về 404 khi slug không tồn tại', async ({ page }) => {
    const response = await page.goto('/blog/slug-khong-ton-tai');
    expect(response?.status()).toBe(404);
  });

  testVi('hiển thị nội dung khi slug tồn tại (vi)', async ({ page }) => {
    await page.goto('/blog/getting-started');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

// 14.3 — Bilingual routing
test.describe('Bilingual routing', () => {
  testVi('/blog/getting-started với locale vi hiển thị nội dung tiếng Việt', async ({ page }) => {
    await page.goto('/blog/getting-started');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Bắt đầu với blog');
  });

  testEn('/blog/getting-started với locale en hiển thị nội dung tiếng Anh', async ({ page }) => {
    await page.goto('/blog/getting-started');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Getting Started');
  });

  test('404 khi slug không tồn tại', async ({ page }) => {
    const response = await page.goto('/blog/slug-khong-ton-tai');
    expect(response?.status()).toBe(404);
  });

  testVi('draft-post không accessible dù biết slug', async ({ page }) => {
    const response = await page.goto('/blog/draft-post');
    expect(response?.status()).toBe(404);
  });
});

// 14.4 — Series navigation
test.describe('Series navigation', () => {
  testVi('bài có series hiển thị SeriesNavUI', async ({ page }) => {
    await page.goto('/blog/series-part-1');
    // SeriesNavUI hiển thị tên series
    await expect(page.getByText('TypeScript từ cơ bản').first()).toBeVisible();
    // Phải có cả 2 bài trong series
    await expect(page.getByRole('listitem').filter({ hasText: 'Phần 1' })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'Phần 2' })).toBeVisible();
  });

  testVi('bài không có series không hiển thị SeriesNavUI', async ({ page }) => {
    await page.goto('/blog/getting-started');
    await expect(page.locator('aside').filter({ hasText: 'Series:' })).not.toBeVisible();
  });
});
