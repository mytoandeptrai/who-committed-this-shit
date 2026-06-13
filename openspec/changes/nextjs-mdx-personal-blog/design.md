## Context

Project hiện tại là Next.js 14 App Router scaffold dưới dạng Web3 dApp với RainbowKit + wagmi + viem, next-intl (localePrefix: `'never'`, locale mặc định `vi`), Zustand stores, Axios BFF proxy, và Biome cho linting. Chưa có bài viết, không có content layer. Cần xóa toàn bộ Web3 và xây blog MDX từ đầu trên nền codebase này.

## Goals / Non-Goals

**Goals:**
- Xóa sạch Web3 dependencies và infrastructure
- Xây content layer file-based MDX (fs + next-mdx-remote + gray-matter)
- Hỗ trợ song ngữ vi/en qua 2 file riêng biệt (`.vi.mdx`, `.en.mdx`)
- Trang `/blog`, `/blog/[slug]`, `/about`, `/uses` với ISR
- Features: TOC, Fuse.js search, Giscus comments, RSS feed
- SEO đầy đủ: sitemap, OG image (next/og), robots.txt, JSON-LD

**Non-Goals:**
- CMS headless (Sanity, Notion, Contentful)
- Admin UI / dashboard quản lý bài
- Auth cho readers
- View count, like/reaction
- Newsletter subscription
- `/projects` hoặc `/snippets` pages

## Decisions

### 1. Content layer: fs thuần thay vì Contentlayer/Velite

**Quyết định:** Dùng `gray-matter` + `next-mdx-remote` + Node.js `fs` trực tiếp trong Server Components.

**Lý do:** Contentlayer đã deprecated; Velite thêm abstraction layer không cần thiết cho blog cá nhân đơn giản. fs + gray-matter đủ dùng, dễ debug, không lock-in.

**Thay thế đã cân nhắc:** Velite (thêm phức tạp), Contentlayer (deprecated).

### 2. Bilingual: 2 file riêng biệt

**Quyết định:** `content/posts/<slug>/index.vi.mdx` và `content/posts/<slug>/index.en.mdx`. Không dùng frontmatter lồng nhau hay 2 thư mục riêng.

**Lý do:** Mỗi ngôn ngữ có nội dung body khác nhau hoàn toàn — không thể dùng 1 file. Cấu trúc theo slug folder dễ navigate, dễ thêm assets (ảnh) theo bài.

**Thay thế đã cân nhắc:** `content/vi/` + `content/en/` (duplicate metadata nhiều hơn); 1 file với i18n blocks (không thực tế cho nội dung dài).

### 3. Syntax highlighting: Shiki thay vì Prism

**Quyết định:** Dùng `shiki` (theme `github-dark`, `github-light`) integrate qua `rehype-pretty-code`.

**Lý do:** Shiki render server-side, không cần client JS. Output là HTML tĩnh có inline styles — không cần load CSS riêng. Chất lượng highlight tốt hơn Prism.

### 4. Search: Fuse.js client-side thay vì Algolia

**Quyết định:** Dùng `fuse.js` với index được build tại build time và nhúng vào page dưới dạng JSON prop.

**Lý do:** Blog cá nhân với vài chục bài — không cần external search service. Fuse.js bundle ~24KB gzip, chấp nhận được.

### 5. ISR với revalidate: 3600

**Quyết định:** Tất cả blog routes dùng `export const revalidate = 3600` (ISR 1 tiếng).

**Lý do:** Deploy Vercel + git push tự trigger rebuild — ISR chủ yếu là safety net. Full SSG yêu cầu `generateStaticParams` exhaustive, cần thêm code. ISR đơn giản hơn và đủ cho use case này.

### 6. Provider tree: Xóa WagmiProvider, giữ lại các provider còn lại

**Quyết định:** Provider tree sau cleanup:
```
NextIntlClientProvider
  ProgressProvider
    QueryClientProvider  (TanStack Query cho data fetching nếu cần)
      ThemeProvider
        {children}
        Toaster
```
WagmiProvider và QueryClientProvider riêng của wagmi bị xóa. QueryClientProvider app-level giữ lại nếu cần TanStack Query cho tính năng khác.

## Component Mapping

| File / Package | Thay đổi | Ghi chú |
|---|---|---|
| `src/config/wagmi.ts` | **Xóa** | |
| `src/providers/WalletContextProvider.tsx` | **Xóa** | |
| `src/app/[locale]/providers.tsx` | **Sửa** | Xóa WagmiProvider + wagmi QueryClient |
| `src/stores/sessionStore.ts` | **Xóa** | Web3 session store |
| `src/stores/modalStore.ts` | **Xóa** | Web3 modal store |
| `src/api/axios.ts` | **Xóa hoặc giữ** | Giữ nếu cần gọi API ngoài; xóa nếu không dùng |
| `src/api/_example/` | **Xóa** | Không cần API layer cho blog |
| `src/app/api/_example/` | **Xóa** | BFF proxy example |
| `src/app/[locale]/(app)/` | **Sửa** | Xóa web3 pages; thêm `/blog`, `/about`, `/uses` |
| `src/app/[locale]/(landing)/` | **Xóa hoặc giữ** | Xóa nếu không cần landing page riêng |
| `src/app/sitemap.ts` | **Sửa** | Implement sitemap thực tế |
| `src/app/robots.ts` | **Sửa** | Implement robots thực tế |
| `src/app/og/route.tsx` | **Tạo mới** | OG image ImageResponse endpoint |
| `src/app/rss.xml/route.ts` | **Tạo mới** | RSS feed route handler |
| `content/posts/` | **Tạo mới** | Thư mục chứa toàn bộ MDX posts |
| `content/pages/` | **Tạo mới** | MDX cho /about và /uses |
| `src/lib/posts.ts` | **Tạo mới** | `getAllPosts()`, `getPostBySlug()`, `getPostSeries()` |
| `src/components/blog/` | **Tạo mới** | `PostCard`, `PostList`, `TOC`, `SeriesNav`, `GiscusWidget` |
| `src/components/layout/Navbar.tsx` | **Sửa/Tạo** | Xóa ConnectButton; thêm language switcher, dark/light toggle |
| `package.json` | **Sửa** | Xóa wagmi/viem/rainbowkit; thêm next-mdx-remote, gray-matter, shiki, fuse.js, feed, reading-time |

## Risks / Trade-offs

- **ISR + song ngữ phức tạp hơn SSG thuần:** Cần đảm bảo `generateStaticParams` cover đủ vi và en slugs để tránh cold start trên Vercel free tier. → Mitigation: implement `generateStaticParams` exhaustive, ISR chỉ là fallback.

- **Fuse.js index size:** Nếu số bài tăng lên vài trăm, JSON index nhúng trong page có thể tăng đáng kể initial payload. → Mitigation: chỉ index `title` + `tags` + excerpt (không index full content); lazy-load search component.

- **Shiki bundle:** `shiki` có thể tăng server bundle. → Mitigation: dùng `createHighlighter` với chỉ các language cần thiết (js, ts, jsx, tsx, bash, json).

- **Giscus yêu cầu GitHub account để comment:** Barrier nhẹ cho readers. → Trade-off đã chấp nhận; không cần backend.

## Migration Plan

1. Xóa Web3 packages và files (`wagmi`, `viem`, `@rainbow-me/rainbowkit`)
2. Sửa provider tree, xóa các stores Web3
3. Xóa Web3 pages và components
4. Tạo `content/posts/` với một bài sample để test
5. Implement `src/lib/posts.ts` (content layer)
6. Build trang `/blog` và `/blog/[slug]`
7. Build trang `/about`, `/uses`
8. Implement RSS feed và OG image route
9. Implement sitemap, robots.txt, JSON-LD
10. Test bilingual routing (vi ↔ en)

## Open Questions

- `src/api/axios.ts` và `src/api/_example/` có giữ lại không? (Hiện tại proposal xóa sạch — confirm lại khi implement)
- Dark mode: dùng `next-themes` hay Tailwind `class` strategy với cookie? (next-themes là lựa chọn mặc định)
- Cover image placeholder khi bài chưa có `coverImage` frontmatter?
