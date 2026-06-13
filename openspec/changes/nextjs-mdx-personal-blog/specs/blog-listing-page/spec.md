## ADDED Requirements

### Requirement: Hiển thị danh sách bài viết

Trang `/blog` SHALL hiển thị toàn bộ bài viết published (không draft) của locale hiện tại, mặc định sắp xếp theo ngày mới nhất. Mỗi item trong list SHALL hiển thị: tiêu đề, ngày đăng, tags, reading time, và cover image (nếu có).

#### Scenario: Trang blog load thành công

- **WHEN** người dùng truy cập `/blog` (locale `vi`) hoặc `/en/blog` (locale `en`)
- **THEN** trang render danh sách tất cả bài published của locale đó, sắp xếp theo date giảm dần

#### Scenario: Không có bài nào được published

- **WHEN** `content/posts/` trống hoặc tất cả bài đều `draft: true`
- **THEN** trang hiển thị trạng thái empty state (không render lỗi)

### Requirement: Tìm kiếm bài viết bằng Fuse.js

Trang `/blog` SHALL cung cấp ô search. Khi nhập từ khóa, kết quả được lọc client-side bằng Fuse.js trên các field: `title`, `tags`, nội dung tóm tắt (excerpt).

#### Scenario: Tìm kiếm có kết quả

- **WHEN** người dùng nhập từ khóa vào ô search
- **THEN** danh sách bài viết cập nhật real-time (không reload trang) chỉ hiển thị các bài có score Fuse.js vượt ngưỡng threshold

#### Scenario: Tìm kiếm không có kết quả

- **WHEN** từ khóa không khớp bài nào (score dưới threshold)
- **THEN** danh sách hiển thị empty state "Không tìm thấy bài viết phù hợp"

#### Scenario: Xóa từ khóa tìm kiếm

- **WHEN** người dùng xóa hết nội dung ô search
- **THEN** danh sách phục hồi về toàn bộ bài viết (không filter)

### Requirement: Lọc bài viết theo tag

Trang `/blog` SHALL cho phép click vào tag để filter. Filter theo tag có thể kết hợp với search.

#### Scenario: Click vào tag để filter

- **WHEN** người dùng click vào một tag bất kỳ (trên list hoặc trên tag cloud)
- **THEN** danh sách chỉ hiển thị bài viết có chứa tag đó; tag được click hiển thị trạng thái active

#### Scenario: Bỏ chọn tag đang active

- **WHEN** người dùng click lại vào tag đang active
- **THEN** filter được xóa, hiển thị toàn bộ bài viết (theo search nếu có)

#### Scenario: Kết hợp filter tag và search

- **WHEN** người dùng đang filter theo tag VÀ nhập từ khóa search
- **THEN** kết quả là giao của 2 bộ lọc (bài phải khớp cả tag lẫn từ khóa)
