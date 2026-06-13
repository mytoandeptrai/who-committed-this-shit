## 1. Dọn dẹp Web3 (Packages & Config)

- [ ] 1.1 Xóa packages: `wagmi`, `viem`, `@rainbow-me/rainbowkit` khỏi `package.json` và chạy `pnpm install`
- [ ] 1.2 Xóa file `src/config/wagmi.ts` và `src/providers/WalletContextProvider.tsx`
- [ ] 1.3 Xóa `src/stores/sessionStore.ts`, `src/stores/modalStore.ts` (các store Web3-specific)
- [ ] 1.4 Sửa `src/app/[locale]/providers.tsx`: xóa `WagmiProvider` và wagmi `QueryClientProvider` khỏi provider tree

## 2. Dọn dẹp Web3 (Pages & Components)

- [ ] 2.1 Xóa `src/app/[locale]/(app)/client-request/` và `src/app/[locale]/(app)/server-request/` pages
- [ ] 2.2 Xóa `src/app/api/_example/route.ts` và `src/api/_example/` directory
- [ ] 2.3 Xóa `src/app/[locale]/(landing)/` route group nếu không dùng cho blog
- [ ] 2.4 Xóa `src/api/axios.ts` và `src/api/interceptors.ts` nếu không còn cần API layer

## 3. Thêm Dependencies

- [ ] 3.1 Thêm packages nội dung: `next-mdx-remote`, `gray-matter`, `reading-time`
- [ ] 3.2 Thêm packages render: `shiki`, `rehype-pretty-code`, `rehype-slug`, `remark-gfm`
- [ ] 3.3 Thêm packages features: `fuse.js`, `feed`
- [ ] 3.4 Thêm packages UI: `next-themes` (dark/light mode)

## 4. Content Layer (`src/lib/posts.ts`)

- [ ] 4.1 Tạo `content/posts/getting-started/index.vi.mdx` và `index.en.mdx` làm bài mẫu với đầy đủ frontmatter (title, date, tags, series, coverImage, draft)
- [ ] 4.2 Tạo `content/pages/about.vi.mdx`, `content/pages/about.en.mdx`, `content/pages/uses.vi.mdx`, `content/pages/uses.en.mdx`
- [ ] 4.3 Implement `getAllPosts(locale)` — đọc fs, parse gray-matter, filter draft, sort by date
- [ ] 4.4 Implement `getPostBySlug(slug, locale)` — trả về `{ frontmatter, content, readingTime }` hoặc `null`
- [ ] 4.5 Implement `getPostSeries(seriesName, locale)` — trả về mảng bài cùng series, sort by part

## 5. Layout & Navbar

- [ ] 5.1 Sửa `src/app/[locale]/(app)/layout.tsx`: xóa wallet imports, áp dụng Geist font, setup `ThemeProvider` (next-themes)
- [ ] 5.2 Tạo/Sửa `src/components/layout/Navbar.tsx`: xóa ConnectButton, thêm links Blog/About/Uses, dark/light toggle, language switcher vi↔en
- [ ] 5.3 Test Navbar: active state theo route, dark/light toggle lưu localStorage, language switcher giữ đúng path

## 6. Trang /blog (Blog Listing)

- [ ] 6.1 Tạo `src/app/[locale]/(app)/blog/page.tsx` — Server Component gọi `getAllPosts(locale)`, truyền xuống client
- [ ] 6.2 Tạo `src/components/blog/PostCard.tsx` — hiển thị title, date, tags, reading time, cover image
- [ ] 6.3 Tạo `src/components/blog/PostList.tsx` — Client Component, nhận posts, render danh sách + tag cloud
- [ ] 6.4 Implement Fuse.js search trong `PostList`: search trên title + tags, update real-time khi gõ
- [ ] 6.5 Implement tag filter trong `PostList`: click tag → filter; click lại → bỏ filter; kết hợp với search

## 7. Trang /blog/[slug] (Blog Post Reader)

- [ ] 7.1 Tạo `src/app/[locale]/(app)/blog/[slug]/page.tsx` — gọi `getPostBySlug`, `notFound()` nếu null; ISR `revalidate: 3600`
- [ ] 7.2 Implement MDX renderer: dùng `next-mdx-remote` với `rehype-pretty-code` (shiki) + `rehype-slug` + `remark-gfm`
- [ ] 7.3 Tạo `src/components/blog/TOC.tsx` — parse headings từ MDX content, highlight active heading khi scroll (IntersectionObserver)
- [ ] 7.4 Tạo `src/components/blog/SeriesNav.tsx` — hiển thị danh sách bài trong series, đánh dấu bài hiện tại; ẩn nếu bài không thuộc series
- [ ] 7.5 Tạo `src/components/blog/GiscusWidget.tsx` — Client Component lazy-load Giscus script; cấu hình repo, category từ env vars
- [ ] 7.6 Implement `generateStaticParams` cho `[slug]` — trả về tất cả slugs × locales có bài published

## 8. Language Switcher & Bilingual Routing

- [ ] 8.1 Implement hàm `getAvailableLocalesForSlug(slug)` — kiểm tra file nào tồn tại để biết locale nào available
- [ ] 8.2 Truyền `availableLocales` xuống page và Navbar để disable nút locale không có bản dịch
- [ ] 8.3 Test bilingual routing: vi → en, en → vi, 404 khi locale không có file

## 9. Trang /about và /uses

- [ ] 9.1 Tạo `src/app/[locale]/(app)/about/page.tsx` — đọc `content/pages/about.<locale>.mdx`, render bằng next-mdx-remote
- [ ] 9.2 Tạo `src/app/[locale]/(app)/uses/page.tsx` — đọc `content/pages/uses.<locale>.mdx`, render bằng next-mdx-remote
- [ ] 9.3 Thêm metadata (title, description, OG tags) cho /about và /uses theo locale

## 10. RSS Feed

- [ ] 10.1 Tạo `src/app/rss.xml/route.ts` — GET handler, dùng `feed` để generate RSS 2.0, 20 bài mới nhất locale vi
- [ ] 10.2 Thêm header `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` vào response
- [ ] 10.3 Test feed: validate XML hợp lệ, đúng số items, không có bài draft

## 11. SEO

- [ ] 11.1 Implement `src/app/sitemap.ts` — list toàn bộ blog pages + bài published (cả 2 locale), exclude drafts
- [ ] 11.2 Implement `src/app/robots.ts` — Allow: /, Sitemap URL trỏ đến `NEXT_PUBLIC_APP_URL`
- [ ] 11.3 Tạo `src/app/og/route.tsx` — GET `/og?title=&date=&locale=`, trả PNG 1200×630 dùng `ImageResponse` + Geist font
- [ ] 11.4 Thêm JSON-LD `BlogPosting` vào `src/app/[locale]/(app)/blog/[slug]/page.tsx`
- [ ] 11.5 Thêm canonical URL metadata vào tất cả blog pages

## 12. Tests & Kiểm tra

- [ ] 12.1 Test content layer: `getAllPosts` filter đúng draft, sort đúng date
- [ ] 12.2 Test bilingual: slug có 2 ngôn ngữ, slug chỉ 1 ngôn ngữ → 404 đúng chỗ
- [ ] 12.3 Test series: bài có series hiển thị SeriesNav, bài không có series ẩn SeriesNav
- [ ] 12.4 Chạy `pnpm type-check` và `pnpm lint` — fix tất cả lỗi
- [ ] 12.5 Chạy `pnpm build` — đảm bảo build production thành công không có lỗi
