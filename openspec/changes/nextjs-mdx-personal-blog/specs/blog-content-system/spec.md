## ADDED Requirements

### Requirement: Đọc và parse file MDX theo locale

Hệ thống SHALL đọc các file `.vi.mdx` và `.en.mdx` từ thư mục `content/posts/<slug>/` trên filesystem. Mỗi file SHALL được parse bởi `gray-matter` để tách frontmatter và body content.

Frontmatter schema bắt buộc:
```ts
{
  title: string        // tiêu đề bài viết
  date: string         // ISO 8601, ví dụ "2026-06-13"
  tags: string[]       // danh sách tag
  draft: boolean       // true = không hiển thị trên production
  coverImage?: string  // URL UploadThing (optional)
  series?: {
    name: string       // tên series, ví dụ "React Deep Dive"
    part: number       // số thứ tự, bắt đầu từ 1
  }
}
```

#### Scenario: Lấy danh sách bài viết published

- **WHEN** hàm `getAllPosts(locale)` được gọi với locale hợp lệ (`"vi"` hoặc `"en"`)
- **THEN** trả về mảng các post objects, chỉ gồm bài có `draft: false`, sắp xếp theo `date` giảm dần

#### Scenario: Lấy nội dung một bài cụ thể

- **WHEN** hàm `getPostBySlug(slug, locale)` được gọi với slug và locale hợp lệ
- **THEN** trả về `{ frontmatter, content, readingTime }` của file `content/posts/<slug>/index.<locale>.mdx`

#### Scenario: File MDX không tồn tại

- **WHEN** `getPostBySlug("non-existent", "vi")` được gọi
- **THEN** trả về `null`; page gọi hàm này SHALL render `notFound()`

#### Scenario: File tồn tại nhưng `draft: true` trên production

- **WHEN** `getAllPosts("vi")` được gọi trong môi trường `NODE_ENV === "production"`
- **THEN** các bài có `draft: true` KHÔNG xuất hiện trong kết quả trả về

#### Scenario: Bài viết thuộc series

- **WHEN** `getPostBySlug(slug, locale)` trả về bài có `series` trong frontmatter
- **THEN** frontmatter SHALL bao gồm `series.name` và `series.part` nguyên vẹn để UI render navigation

### Requirement: Tính reading time

Hệ thống SHALL tính reading time cho mỗi bài viết dựa trên word count của markdown content (không tính frontmatter), sử dụng thư viện `reading-time`.

#### Scenario: Tính reading time thành công

- **WHEN** `getPostBySlug(slug, locale)` được gọi
- **THEN** kết quả trả về SHALL bao gồm `readingTime.text` (ví dụ `"5 min read"`) và `readingTime.minutes` (number)

#### Scenario: Bài viết rất ngắn (dưới 1 phút)

- **WHEN** bài viết có nội dung dưới ~200 từ
- **THEN** `readingTime.text` SHALL hiển thị `"1 min read"` (không nhỏ hơn 1)
