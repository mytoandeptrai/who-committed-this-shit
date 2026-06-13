## ADDED Requirements

### Requirement: Route bài viết theo locale

Hệ thống SHALL dùng next-intl routing để map locale → file MDX tương ứng. URL `/blog/[slug]` (locale `vi`) SHALL serve `content/posts/<slug>/index.vi.mdx`; URL locale `en` SHALL serve `index.en.mdx`.

next-intl hiện được cấu hình `localePrefix: 'never'` — locale `vi` là default (không có prefix); locale `en` có prefix `/en`.

#### Scenario: Truy cập bài viết locale mặc định (vi)

- **WHEN** người dùng truy cập `/blog/react-fiber` không có prefix
- **THEN** hệ thống đọc `content/posts/react-fiber/index.vi.mdx` và render nội dung tiếng Việt

#### Scenario: Truy cập bài viết locale en

- **WHEN** người dùng truy cập `/en/blog/react-fiber`
- **THEN** hệ thống đọc `content/posts/react-fiber/index.en.mdx` và render nội dung tiếng Anh

#### Scenario: Bài có bản vi nhưng không có bản en

- **WHEN** người dùng truy cập `/en/blog/slug-chi-co-vi` (file `.en.mdx` không tồn tại)
- **THEN** trang SHALL trả về 404 (không fallback về bản vi)

#### Scenario: Bài có bản en nhưng không có bản vi

- **WHEN** người dùng truy cập `/blog/slug-chi-co-en` (file `.vi.mdx` không tồn tại)
- **THEN** trang SHALL trả về 404 (không fallback về bản en)

### Requirement: Language switcher trên trang bài viết

Trang `/blog/[slug]` SHALL hiển thị language switcher cho phép chuyển giữa `.vi.mdx` và `.en.mdx` của cùng slug. Nếu bản dịch không tồn tại, nút chuyển ngôn ngữ SHALL bị disabled.

#### Scenario: Bài có đủ 2 ngôn ngữ

- **WHEN** tồn tại cả `index.vi.mdx` và `index.en.mdx` cho slug hiện tại
- **THEN** language switcher hiển thị 2 nút active; click SHALL navigate đến locale tương ứng (giữ nguyên slug)

#### Scenario: Bài chỉ có 1 ngôn ngữ

- **WHEN** chỉ tồn tại một trong hai file `.vi.mdx` hoặc `.en.mdx`
- **THEN** nút ngôn ngữ còn lại SHALL disabled (có tooltip giải thích "Bản dịch chưa có")

### Requirement: Trang /blog list chỉ hiển thị bài của locale hiện tại

Trang `/blog` (vi) và `/en/blog` (en) SHALL mỗi trang chỉ list bài viết của locale tương ứng — không mix hai ngôn ngữ.

#### Scenario: List bài viết theo locale

- **WHEN** người dùng vào `/blog`
- **THEN** chỉ hiển thị bài có file `.vi.mdx` (published); bài chỉ có `.en.mdx` không xuất hiện

#### Scenario: Một bài có cả 2 ngôn ngữ

- **WHEN** slug có cả `index.vi.mdx` và `index.en.mdx`
- **THEN** bài xuất hiện trong cả `/blog` (vi) lẫn `/en/blog` (en), mỗi trang dùng title/metadata của locale đó
