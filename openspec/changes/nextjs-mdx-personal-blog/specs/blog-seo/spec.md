## ADDED Requirements

### Requirement: Sitemap tự động

Hệ thống SHALL export `sitemap()` từ `src/app/sitemap.ts` (đã tồn tại nhưng cần implement). Sitemap SHALL bao gồm trang `/blog`, `/about`, `/uses`, và từng `/blog/[slug]` cho mỗi locale published.

#### Scenario: Sitemap chứa đúng URLs

- **WHEN** Googlebot hoặc client truy cập `/sitemap.xml`
- **THEN** trả về XML hợp lệ với `<url>` cho: `/blog`, `/en/blog`, `/about`, `/en/about`, `/uses`, `/en/uses`, và mỗi bài published theo cả 2 locale (nếu có cả 2 file)

#### Scenario: Bài draft không xuất hiện trong sitemap

- **WHEN** sitemap được generate
- **THEN** bài có `draft: true` KHÔNG có URL trong sitemap

### Requirement: OG Image tự động cho bài viết

Mỗi trang `/blog/[slug]` SHALL có OG image được sinh động bởi `next/og` (`ImageResponse`) tại route `src/app/og/route.tsx`. OG image SHALL bao gồm: tiêu đề bài, tên tác giả, và ngày đăng.

**HTTP:**
- `GET /og?title=<encoded>&date=<encoded>&locale=<locale>`
- Response: `200 OK`, `Content-Type: image/png`, kích thước `1200x630`

#### Scenario: Generate OG image thành công

- **WHEN** `GET /og?title=How+React+Fiber+Works&date=2026-06-13&locale=en`
- **THEN** response trả về PNG `1200x630` với text title, date và author name render bằng Geist font

#### Scenario: Title quá dài

- **WHEN** title vượt quá khoảng ~80 ký tự
- **THEN** text SHALL được truncate với ellipsis, không overflow khỏi image boundary

### Requirement: robots.txt

File `src/app/robots.ts` SHALL export `robots()` cho phép tất cả crawlers index toàn bộ blog, và trỏ đến sitemap.

#### Scenario: robots.txt hợp lệ

- **WHEN** `GET /robots.txt`
- **THEN** response chứa `User-agent: *`, `Allow: /`, và `Sitemap: <NEXT_PUBLIC_APP_URL>/sitemap.xml`

### Requirement: JSON-LD BlogPosting cho trang bài viết

Trang `/blog/[slug]` SHALL nhúng JSON-LD `BlogPosting` schema trong `<head>`. Các field bắt buộc: `headline`, `datePublished`, `author`, `url`, `image` (coverImage hoặc OG image URL).

#### Scenario: JSON-LD render đúng

- **WHEN** người dùng (hoặc crawler) truy cập `/blog/react-fiber`
- **THEN** HTML SHALL chứa `<script type="application/ld+json">` với object `BlogPosting` hợp lệ bao gồm đầy đủ các field bắt buộc

### Requirement: Canonical URL

Mỗi trang SHALL có `<link rel="canonical">` trỏ về URL chuẩn (không trailing slash, scheme `https`, domain từ `NEXT_PUBLIC_APP_URL`).

#### Scenario: Canonical URL đúng

- **WHEN** crawler đọc metadata của `/blog/react-fiber`
- **THEN** `<link rel="canonical" href="https://<domain>/blog/react-fiber" />` xuất hiện trong `<head>`
