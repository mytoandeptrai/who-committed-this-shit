## ADDED Requirements

### Requirement: Trang /about

Trang `/about` SHALL hiển thị thông tin giới thiệu tác giả. Nội dung SHALL được viết dưới dạng MDX tại `content/pages/about.<locale>.mdx` hoặc hardcode React component — lựa chọn tùy implementation.

#### Scenario: Truy cập trang /about (locale vi)

- **WHEN** người dùng truy cập `/about`
- **THEN** trang render với metadata (title `"Về tôi"`, canonical URL, OG tags) và nội dung giới thiệu đầy đủ

#### Scenario: Truy cập trang /about (locale en)

- **WHEN** người dùng truy cập `/en/about`
- **THEN** trang render bản tiếng Anh (title `"About"`) với nội dung phù hợp locale

### Requirement: Trang /uses

Trang `/uses` SHALL hiển thị danh sách công cụ và setup hiện tại của tác giả (hardware, software, editor). Nội dung SHALL được viết dưới dạng MDX tại `content/pages/uses.<locale>.mdx`.

#### Scenario: Truy cập trang /uses (locale vi)

- **WHEN** người dùng truy cập `/uses`
- **THEN** trang render với metadata (title `"Công cụ tôi dùng"`) và danh sách công cụ

#### Scenario: Truy cập trang /uses (locale en)

- **WHEN** người dùng truy cập `/en/uses`
- **THEN** trang render bản tiếng Anh (title `"Uses"`) với cùng danh sách công cụ

### Requirement: Navigation bar

Navbar SHALL xuất hiện trên tất cả các trang (layout cấp `[locale]`). Navbar SHALL bao gồm: logo/tên tác giả (link về `/`), links đến `/blog`, `/about`, `/uses`, dark/light mode toggle, và language switcher (vi ↔ en).

#### Scenario: Navbar hiển thị đúng route active

- **WHEN** người dùng đang ở `/blog`
- **THEN** nav item "Blog" SHALL có class/style active; các item còn lại không active

#### Scenario: Dark/light mode toggle

- **WHEN** người dùng click dark/light toggle
- **THEN** theme thay đổi ngay lập tức; preference được lưu vào `localStorage` và persist qua reload

#### Scenario: Language switcher trên trang không phải blog post

- **WHEN** người dùng ở `/about` và click chuyển sang en
- **THEN** navigate đến `/en/about` giữ nguyên path, không về trang chủ
