## 1. Web3 Cleanup — Packages & Config

- [x] 1.1 Xóa packages khỏi `package.json`: `wagmi`, `viem`, `@rainbow-me/rainbowkit`, `socket.io-client`, `recharts`, `decimal.js` → chạy `pnpm install`
- [x] 1.2 Xóa file `src/config/wagmi.ts`
- [x] 1.3 Xóa file `src/providers/WalletContextProvider.tsx`
- [x] 1.4 Xóa file `src/stores/sessionStore.ts` và `src/stores/modalStore.ts`
- [x] 1.5 Sửa `src/app/[locale]/providers.tsx`: xóa import WagmiProvider, xóa wagmi QueryClientProvider khỏi provider tree

## 2. Web3 Cleanup — Pages & Routes

- [x] 2.1 Xóa thư mục `src/app/[locale]/(app)/client-request/`
- [x] 2.2 Xóa thư mục `src/app/[locale]/(app)/server-request/`
- [x] 2.3 Xóa thư mục `src/app/[locale]/(landing)/`
- [x] 2.4 Xóa thư mục `src/app/api/_example/`
- [x] 2.5 Xóa thư mục `src/api/` (axios.ts, interceptors.ts, _example/)

## 3. Dependencies mới

- [x] 3.1 Thêm vào `package.json`: `next-mdx-remote`, `gray-matter`, `reading-time`
- [x] 3.2 Thêm vào `package.json`: `shiki`, `rehype-pretty-code`, `rehype-slug`, `remark-gfm`
- [x] 3.3 Thêm vào `package.json`: `fuse.js`, `feed`
- [x] 3.4 Chạy `pnpm install` và kiểm tra `pnpm type-check` không có lỗi mới

## 4. modules/blog/lib — Content Layer

- [x] 4.1 Tạo `content/posts/getting-started/index.vi.mdx` với frontmatter đầy đủ: title, date, tags, series, coverImage, draft: false
- [x] 4.2 Tạo `content/posts/getting-started/index.en.mdx` tương tự bài trên
- [x] 4.3 Tạo `content/pages/about.vi.mdx`, `content/pages/about.en.mdx`, `content/pages/uses.vi.mdx`, `content/pages/uses.en.mdx`
- [x] 4.4 Tạo `src/modules/blog/lib/posts.ts`: implement `getAllPosts(locale)` — đọc fs, parse gray-matter, filter draft, sort by date
- [x] 4.5 Tạo `src/modules/blog/lib/posts.ts`: implement `getPostBySlug(slug, locale)` — trả về `{ frontmatter, content, readingTime }` hoặc `null`
- [x] 4.6 Tạo `src/modules/blog/lib/posts.ts`: implement `getPostSeries(seriesName, locale)` — trả về mảng bài cùng series, sort by part
- [x] 4.7 Tạo `src/modules/blog/lib/posts.ts`: implement `getAvailableLocalesForSlug(slug)` — kiểm tra file nào tồn tại
- [x] 4.8 Tạo `src/modules/blog/lib/search-index.ts`: build Fuse.js index từ `getAllPosts()`, chỉ index title + tags + excerpt

## 5. modules/blog/hooks

- [x] 5.1 Tạo `src/modules/blog/hooks/use-blog-search.ts`: nhận posts + query, trả về filtered posts dùng Fuse.js
- [x] 5.2 Tạo `src/modules/blog/hooks/use-toc-observer.ts`: dùng IntersectionObserver để track heading đang active trong viewport

## 6. modules/blog/components — Blog Listing UI

- [x] 6.1 Tạo `src/modules/blog/components/post-card-ui/post-card-ui.tsx`: hiển thị cover image, title, date, reading time, tags (Badge), excerpt — nhận props thuần, không gọi API
- [x] 6.2 Tạo `src/modules/blog/components/post-card-ui/index.ts`: re-export PostCardUI
- [x] 6.3 Tạo `src/modules/blog/components/post-list-ui/post-list-ui.tsx`: render danh sách PostCardUI + search Input + tag cloud filter
- [x] 6.4 Tạo `src/modules/blog/components/post-list-ui/index.ts`: re-export PostListUI

## 7. modules/blog/containers — Blog Listing Logic

- [x] 7.1 Tạo `src/modules/blog/containers/blog-list-container/blog-list-container.tsx`: gọi `getAllPosts(locale)`, manage search state + tag filter state, truyền xuống PostListUI
- [x] 7.2 Tạo `src/modules/blog/containers/blog-list-container/index.ts`: re-export BlogListContainer

## 8. modules/blog/components — Blog Post Reader UI

- [x] 8.1 Tạo `src/modules/blog/components/toc-ui/toc-ui.tsx`: render cây heading, dùng ScrollArea, highlight active item từ `useTocObserver`
- [x] 8.2 Tạo `src/modules/blog/components/toc-ui/index.ts`: re-export TocUI
- [x] 8.3 Tạo `src/modules/blog/components/series-nav-ui/series-nav-ui.tsx`: render list bài trong series, highlight bài hiện tại; ẩn nếu không có series
- [x] 8.4 Tạo `src/modules/blog/components/series-nav-ui/index.ts`: re-export SeriesNavUI
- [x] 8.5 Tạo `src/modules/blog/components/giscus-widget-ui/giscus-widget-ui.tsx`: Client Component, lazy-load Giscus script, cấu hình từ env vars
- [x] 8.6 Tạo `src/modules/blog/components/giscus-widget-ui/index.ts`: re-export GiscusWidgetUI

## 9. modules/blog/containers — Blog Post Reader Logic

- [x] 9.1 Tạo `src/modules/blog/containers/blog-detail-container/blog-detail-container.tsx`: nhận slug + locale, gọi `getPostBySlug`, parse TOC từ headings, gọi `getAvailableLocalesForSlug`, render MDX bằng `next-mdx-remote` với rehype-pretty-code + rehype-slug
- [x] 9.2 Tạo `src/modules/blog/containers/blog-detail-container/index.ts`: re-export BlogDetailContainer

## 10. modules/layout — Navbar

- [x] 10.1 Sửa `src/components/layouts/MainLayout/components/Header/index.tsx`: xóa ConnectButton
- [x] 10.2 Sửa `src/components/layouts/MainLayout/components/Header/NavLinks/index.tsx`: đổi nav links sang Blog/About/Uses, xóa ConnectButton
- [x] 10.3 Sửa `src/utils/routes.ts`: thay SWAP/CLIENT_REQUEST/SERVER_REQUEST bằng BLOG/ABOUT/USES
- [x] 10.4 Sửa `src/app/[locale]/(app)/layout.tsx`: giữ MainLayout, không còn wallet imports

## 11. App Entry Points

- [x] 11.1 Tạo `src/app/[locale]/(app)/blog/page.tsx`: Server Component, import BlogListContainer, thêm metadata (title, description)
- [x] 11.2 Tạo `src/app/[locale]/(app)/blog/[slug]/page.tsx`: Server Component, import BlogDetailContainer, `generateStaticParams`, `notFound()` nếu slug null, ISR `revalidate: 3600`
- [x] 11.3 Tạo `src/app/[locale]/(app)/about/page.tsx`: đọc `content/pages/about.<locale>.mdx`, render bằng next-mdx-remote, metadata
- [x] 11.4 Tạo `src/app/[locale]/(app)/uses/page.tsx`: đọc `content/pages/uses.<locale>.mdx`, render bằng next-mdx-remote, metadata

## 12. RSS Feed & OG Image

- [x] 12.1 Tạo `src/app/rss.xml/route.ts`: GET handler, dùng `feed` để generate RSS 2.0 từ `getAllPosts('vi')`, 20 bài mới nhất, header Cache-Control
- [x] 12.2 Tạo `src/app/og/route.tsx`: GET `/og?title=&date=&locale=`, trả PNG 1200×630 dùng `ImageResponse` + Geist font

## 13. SEO

- [x] 13.1 Sửa `src/app/sitemap.ts`: list `/blog`, `/about`, `/uses` + mọi slug published theo cả 2 locale, exclude drafts
- [x] 13.2 Sửa `src/app/robots.ts`: `Allow: /`, trỏ Sitemap đến `NEXT_PUBLIC_APP_URL/sitemap.xml`
- [x] 13.3 Sửa `src/app/[locale]/(app)/blog/[slug]/page.tsx`: thêm JSON-LD BlogPosting (headline, datePublished, author, url, image)
- [x] 13.4 Thêm canonical URL metadata vào `blog/page.tsx`, `blog/[slug]/page.tsx`, `about/page.tsx`, `uses/page.tsx`

## 14. Tests & Kiểm tra

- [x] 14.1 Test `getAllPosts`: chỉ trả về draft: false, sort đúng date giảm dần
- [x] 14.2 Test `getPostBySlug`: trả null khi slug không tồn tại; trả null khi locale không có file
- [x] 14.3 Test bilingual routing: `/blog/slug` (vi) → index.vi.mdx; `/en/blog/slug` → index.en.mdx; 404 khi file không tồn tại
- [x] 14.4 Test series: bài có series → SeriesNavUI render; bài không có series → SeriesNavUI không render
- [x] 14.5 Chạy `pnpm type-check` — 0 lỗi
- [x] 14.6 Chạy `pnpm lint` — 0 lỗi
- [x] 14.7 Chạy `pnpm build` — build production thành công
