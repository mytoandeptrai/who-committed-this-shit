## ADDED Requirements

### Requirement: RSS/Atom feed tại /rss.xml

Hệ thống SHALL cung cấp RSS feed tại `/rss.xml` chứa tất cả bài viết published của locale mặc định (`vi`). Feed SHALL được sinh bởi route handler `src/app/rss.xml/route.ts` dùng thư viện `feed`.

**HTTP:**
- `GET /rss.xml`
- Response: `200 OK`, `Content-Type: application/xml`
- Body: XML hợp lệ theo chuẩn RSS 2.0 hoặc Atom 1.0

#### Scenario: Truy cập feed thành công

- **WHEN** client gọi `GET /rss.xml`
- **THEN** response trả về XML hợp lệ với các items bao gồm: `title`, `link`, `description` (excerpt), `pubDate` (ISO 8601), `guid` (URL canonical của bài)

#### Scenario: Feed chứa đúng bài published

- **WHEN** `GET /rss.xml`
- **THEN** feed chỉ chứa bài có `draft: false`, sắp xếp theo date giảm dần, tối đa 20 items gần nhất

#### Scenario: Không có bài nào published

- **WHEN** `content/posts/` trống hoặc tất cả bài là draft
- **THEN** feed trả về XML hợp lệ với `<channel>` không có `<item>`  (không trả về 404 hoặc lỗi)

#### Scenario: Feed cache

- **WHEN** `GET /rss.xml` được gọi lại trong cùng deploy
- **THEN** response SHALL có header `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` để CDN cache hợp lý
