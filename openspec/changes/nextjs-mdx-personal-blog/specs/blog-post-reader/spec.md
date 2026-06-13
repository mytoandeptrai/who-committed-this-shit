## ADDED Requirements

### Requirement: Render nội dung bài viết MDX

Trang `/blog/[slug]` SHALL render nội dung MDX bằng `next-mdx-remote`. Code blocks SHALL được highlight bằng `shiki`. Trang SHALL dùng ISR với `revalidate: 3600`.

#### Scenario: Truy cập bài viết tồn tại

- **WHEN** người dùng truy cập `/blog/react-fiber` (hoặc `/en/blog/react-fiber`)
- **THEN** trang render nội dung MDX đầy đủ với syntax highlighting, cover image, reading time, và metadata (title, date, tags)

#### Scenario: Truy cập slug không tồn tại

- **WHEN** người dùng truy cập `/blog/slug-khong-ton-tai`
- **THEN** Next.js SHALL gọi `notFound()` → render trang 404

#### Scenario: Truy cập bài draft trên production

- **WHEN** người dùng truy cập URL của bài có `draft: true` trên production
- **THEN** trang SHALL trả về 404 (không hiển thị nội dung)

### Requirement: Table of Contents tự động

Trang `/blog/[slug]` SHALL hiển thị TOC được sinh tự động từ các heading `## ` và `### ` trong nội dung MDX. TOC SHALL highlight heading đang trong viewport khi scroll.

#### Scenario: Bài viết có nhiều heading

- **WHEN** bài MDX chứa các heading `##` và `###`
- **THEN** TOC hiển thị cây heading với indent tương ứng; click vào item SHALL scroll smooth đến heading đó

#### Scenario: Bài viết không có heading

- **WHEN** nội dung MDX không có heading nào
- **THEN** TOC component không render (hoặc ẩn)

#### Scenario: Scroll qua các section

- **WHEN** người dùng scroll trang
- **THEN** TOC SHALL highlight active item tương ứng với heading đang visible nhất trong viewport

### Requirement: Comments Giscus

Trang `/blog/[slug]` SHALL nhúng Giscus comment widget ở cuối bài, liên kết với GitHub Discussions. Widget SHALL lazy-load (chỉ load khi người dùng scroll gần đến cuối).

#### Scenario: Hiển thị comment widget

- **WHEN** người dùng scroll đến cuối bài viết
- **THEN** Giscus widget SHALL load và hiển thị; người dùng cần đăng nhập GitHub để bình luận

#### Scenario: Không có comment

- **WHEN** bài viết chưa có comment nào trên GitHub Discussions
- **THEN** widget hiển thị trạng thái empty state của Giscus (không lỗi)

### Requirement: Navigation bài trong series

Nếu bài viết thuộc một series, trang SHALL hiển thị danh sách toàn bộ bài trong series và đánh dấu bài hiện tại.

#### Scenario: Bài viết thuộc series

- **WHEN** frontmatter có `series.name` và `series.part`
- **THEN** trang hiển thị series box với tên series, danh sách các part (có link), và đánh dấu bài hiện tại là active

#### Scenario: Bài viết không thuộc series

- **WHEN** frontmatter không có trường `series`
- **THEN** series box không render
