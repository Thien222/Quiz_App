# Kiểm tra giao diện

Giữ phong cách pastel hiện có; chỉnh lại chiều rộng nội dung và lưới thẻ, nhãn thanh tab, chữ phụ, vùng bấm, thẻ chỉ số và hộp thoại dùng chung.

## Những lỗi đã xử lý

- NativeWind báo lỗi chế độ màu và che giao diện web: cấu hình Tailwind dùng `darkMode: 'class'`.
- Nội dung và phép tính lưới không cùng chiều rộng: giới hạn 580px cho phần nội dung, cộng lề bên ngoài; áp dụng cả điện thoại lớn và tablet.
- Thanh tab cắt nhãn; banner Premium bó chữ ở 320px; tên chỉ số bị rút gọn; tiêu đề, badge và tên hồ sơ dài thiếu chỗ xuống dòng.
- Quiz cần cuộn về đầu khi đổi câu; hộp thoại tạm dừng cần hoạt động cả trên web; trang chủ có nút làm tiếp bài chưa hoàn thành.
- Thẻ phân tích miễn phí mở nội dung thật trong hộp thoại. Kết quả gần nhất xuất hiện ở tab Kết quả và được giữ khi bắt đầu bài mới.
- Ngày trên trang chủ và gói hôm nay lấy ngày thiết bị.
- Premium hiển thị rõ thanh toán chưa khả dụng, thay cho thông báo kích hoạt thành công dù chưa có xử lý mua gói.

## Chạy kiểm tra

```powershell
npm run typecheck
npm run build:web
npm run test:ui
```

Bộ kiểm thử dùng Playwright với Edge có sẵn trên Windows. Có thể đổi trình duyệt qua `UI_BROWSER`. Máy chủ phục vụ thư mục `dist` được tự khởi động tại `http://127.0.0.1:8083` trong lúc kiểm thử. Build lại trước khi chạy nếu đã sửa ứng dụng.

Đã đạt 18/18 kiểm thử trên bản web production:

- 11 màn hình ở 320, 360, 375, 390, 412, 430, 768 và 1280px; kiểm tra tràn ngang và lỗi JavaScript.
- Lưới Khám phá, vùng bấm và nhãn của bốn tab ở tám kích thước.
- Luồng 20 câu hỏi, trạng thái nút chưa chọn đáp án, tạm dừng và làm tiếp, phân tích miễn phí, mở lại kết quả.
- Đổi gói Premium và đóng/mở hộp thoại thông báo.

## Xem và chụp giao diện

```powershell
npm run preview:web
```

Mở `http://127.0.0.1:8083`. Trong terminal khác, chạy `npm run ui:capture` để lưu ảnh đầu/cuối màn hình ở 320, 390 và 768px vào `artifacts/ui/` (không đưa vào Git).

Các kiểm tra trên xác nhận bản web responsive. Chưa kiểm tra trực tiếp bằng thiết bị iOS/Android, tai thỏ và cỡ chữ trợ năng của hệ điều hành. Thanh toán vẫn chưa được tích hợp; tab Kết quả hiện lưu kết quả gần nhất.
