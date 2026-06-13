## Why

Project được scaffold dưới dạng Web3 dApp (RainbowKit + wagmi) nhưng mục đích thực tế là personal technical blog. Toàn bộ Web3 infrastructure là dead code; cần xóa sạch và xây blog MDX file-based để codebase phản ánh đúng mục đích sử dụng.

## What Changes

- **BREAKING** Xóa toàn bộ Web3: `wagmi`, `viem`, `@rainbow-me/rainbowkit`, wallet stores, `WalletContextProvider`
- Thêm hệ thống nội dung MDX dùng `next-mdx-remote` + `gray-matter` (posts trong `content/posts/`)
- Mỗi bài viết có 2 file: `slug.vi.mdx` và `slug.en.mdx` — route theo locale next-intl
- Trang `/blog`: list bài, tìm kiếm Fuse.js, lọc theo tag
- Trang `/blog/[slug]`: đọc bài, TOC tự động, reading time, comment Giscus, ISR
- Trang `/about` và `/uses` (static)
- RSS feed tại `/rss.xml`
- SEO: sitemap, OG image auto-gen (next/og), robots.txt, JSON-LD BlogPosting
- Ảnh bài viết host trên UploadThing, lưu URL trong frontmatter `coverImage`
- Deploy Vercel, push git là live, không cần admin UI

## Capabilities

### New Capabilities

- `blog-content-system`: Đọc, parse, serve `.vi.mdx` / `.en.mdx` từ `content/posts/` với frontmatter: `title`, `date`, `tags`, `series`, `coverImage`, `draft`
- `blog-listing-page`: Trang `/blog` — list bài published, Fuse.js search, tag filter, locale-aware
- `blog-post-reader`: Trang `/blog/[slug]` — render MDX, TOC tự sinh từ heading, reading time, Giscus, ISR `revalidate: 3600`
- `bilingual-post-routing`: next-intl routing chọn đúng `.vi.mdx` / `.en.mdx` theo locale; language switcher giữa 2 phiên bản
- `rss-feed`: Route handler `/rss.xml` sinh Atom/RSS từ bài published
- `blog-seo`: `sitemap.xml` (Next.js built-in), OG image qua `ImageResponse`, `robots.txt`, canonical URL, JSON-LD per post
- `static-pages`: `/about` và `/uses` dưới dạng MDX hoặc React thuần

### Modified Capabilities

Không có — blog là layer mới trên nền codebase đã strip.

## Non-goals

- Admin UI / dashboard quản lý bài viết
- Auth cho readers
- View count, like/reaction, newsletter subscription
- CMS headless (Sanity, Notion, Contentful)
- Trang `/projects` hoặc `/snippets`

## Impact

**Modules bị ảnh hưởng:**

| Module | Thay đổi |
|--------|----------|
| `src/modules/blog/` | Tạo mới — containers, components, hooks, lib cho toàn bộ blog |
| `src/modules/blog/lib/posts.ts` | Tạo mới — content layer (getAllPosts, getPostBySlug) |
| `src/app/[locale]/(app)/blog/` | Tạo mới — entry point, import từ modules/blog |
| `src/app/[locale]/(app)/about/` | Tạo mới — entry point |
| `src/app/[locale]/(app)/uses/` | Tạo mới — entry point |
| `src/app/api/` | Xóa BFF proxy; thêm `/rss.xml` và `/og` route handlers |
| `src/providers/` | Xóa WalletContextProvider; rebuild provider tree |
| `src/config/wagmi.ts` | Xóa |
| `src/stores/` | Xóa sessionStore, modalStore (Web3-specific) |
| `content/posts/` | Tạo mới — chứa toàn bộ MDX posts |

**Packages xóa:** `wagmi`, `viem`, `@rainbow-me/rainbowkit`, `socket.io-client`, `recharts`, `decimal.js`

**Packages thêm:** `next-mdx-remote`, `gray-matter`, `fuse.js`, `feed`, `shiki`, `rehype-pretty-code`, `reading-time`
