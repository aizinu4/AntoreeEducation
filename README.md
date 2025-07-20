# Sàn Giáo Dục Thương Mại Điện Tử Tích Hợp AI

## Giới thiệu
Đây là dự án Front-end mô phỏng sàn giáo dục thương mại điện tử, nơi người dùng có thể tìm kiếm, khám phá, yêu thích các khoá học/sản phẩm giáo dục (lớp học trực tuyến, giáo trình, tài liệu, ...), tích hợp gợi ý thông minh (AI) và chatbot tư vấn.

## Tính năng chính
- **Hiển thị danh sách sản phẩm:**
  - Danh sách sản phẩm với tên, giá, ảnh, mô tả ngắn, nút "Xem chi tiết".
- **Tìm kiếm & Lọc:**
  - Tìm kiếm theo tên sản phẩm.
  - Lọc theo mức giá (<500K, 500K–1 triệu, >1 triệu).
- **Gợi ý thông minh (AI):**
  - Nút "Gợi ý sản phẩm phù hợp" gọi API giả lập dựa trên hành vi người dùng (đã xem, đã thích).
  - Loading skeleton khi lấy gợi ý, xử lý lỗi API.
- **Modal chi tiết sản phẩm:**
  - Hiển thị thông tin chi tiết, ảnh lớn, mô tả dài, đánh giá.
- **Yêu thích:**
  - Đánh dấu sản phẩm yêu thích, trang riêng cho danh sách yêu thích.
- **Lịch sử xem:**
  - Ghi nhận các sản phẩm đã click xem chi tiết.
- **Chatbot AI tư vấn sản phẩm:**
  - Giao diện chat, gợi ý sản phẩm dựa trên từ khoá nhập (mock logic).

## Điểm cộng nổi bật
- Loading skeleton khi gọi API gợi ý.
- Xử lý lỗi API (hiển thị thông báo khi không lấy được gợi ý).
- Lịch sử xem sản phẩm.
- Hiệu ứng hover, transition mượt mà.
- Responsive trên mọi thiết bị.
- Thông báo toast khi thao tác yêu thích.

## Công nghệ sử dụng
- **Next.js (React)**
- **TypeScript**
- **CSS Modules**
- **Axios (mock API)**
- **Context API, useState, useEffect**

## Cấu trúc thư mục
```
├── src/
│   ├── app/                # Routing, layout, trang chính, favorites, API route
│   ├── components/         # Các component UI: ProductCard, ProductList, Modal, SearchBar, ...
│   ├── contexts/           # Context quản lý state (Favorites, ...)
│   ├── data/               # Mock data sản phẩm
│   ├── goiyAI/             # Mock API gợi ý AI
│   └── lib/                # Tiện ích chung
└── public/                 # Ảnh, icon, 3D model, ...
```

## Hướng dẫn cài đặt & chạy dự án
### 1. Clone repo
```bash
git clone <link-repo>
cd Antoree/education
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Chạy dự án local
```bash
npm run dev
```
Truy cập: [http://localhost:3000](http://localhost:3000)

### 4. Build production
```bash
npm run build
npm start
```

## Triển khai demo
- Public website: https://antoree-education.vercel.app/

## Liên hệ & đóng góp
- Nếu có thắc mắc hoặc muốn đóng góp, vui lòng tạo issue hoặc pull request.

