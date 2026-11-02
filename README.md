# Nói Đi! – App luyện nói tiếng Anh giao tiếp (iPhone)

App web cài lên màn hình chính iPhone (PWA). Mỗi ngày nói vài phút: học câu khẩu ngữ song ngữ → nói theo (shadowing) có ghi âm & chấm điểm → nhập vai hội thoại ngắn.

Giáo viên trong app là **cô Mây – nhân vật hư cấu**. App chỉ lấy cảm hứng từ phong cách dạy khẩu ngữ thân mật, song ngữ; không dùng tên, hình, giọng hay nội dung của người thật nào.

## 1. Vì sao chọn PWA

| Cách | Ưu | Nhược |
|---|---|---|
| **PWA (đang dùng)** | Không cần Mac, Node, quyền admin. Chỉ là file HTML/JS. Cài lên màn hình chính qua Safari. Miễn phí. Chạy offline (giao diện + bài học). | Nhận diện giọng nói trên iOS phụ thuộc Safari/Siri; khi mở từ màn hình chính có thể bị chặn ở vài phiên bản iOS → app tự báo và cho tự chấm. Cần host HTTPS (GitHub Pages miễn phí). |
| Expo (React Native) + Expo Go | Gần app thật, có thư viện nhận diện giọng nói native. | Phải cài Node (portable). Một số module giọng nói không chạy trong Expo Go → cần build riêng (cần tài khoản Apple). |
| App Store thật | Trải nghiệm tốt nhất. | Cần Mac/Xcode hoặc build cloud + **Apple Developer 99 USD/năm**. |

Kết luận: làm PWA trước để học được ngay; nếu sau này cần nhiều hơn thì chuyển Expo.

### Các tính năng giọng nói trên iPhone
- **Giọng đọc mẫu**: giọng máy có sẵn của iPhone (tiếng Anh Mỹ), chạy offline. Muốn giọng hay hơn: Cài đặt → Trợ năng → Nội dung được đọc → Giọng nói → English → tải "Ava (Nâng cao)" hoặc "Samantha".
- **Nhận diện giọng nói** (để chấm điểm): dùng dịch vụ của Apple trong Safari. Cần bật **Siri** và **Đọc chính tả**. Thường cần mạng.
- **Ghi âm & nghe lại**: chạy trên iOS 14.3 trở lên.
- **Chấm điểm**: so câu máy nghe được với câu mẫu, tô xanh/vàng/đỏ từng từ. Đây là chấm "người nghe có hiểu không" (nói rõ, đủ âm cuối là điểm cao), chưa phải chấm từng âm như giáo viên.

## 2. Đưa lên iPhone (làm 1 lần, ~10 phút)

Micro chỉ chạy khi trang được mở qua **HTTPS**, nên cần đưa app lên GitHub Pages (miễn phí):

1. Tạo tài khoản ở https://github.com (nếu chưa có), rồi tạo repo mới tên `noi-di`, chọn **Public**.
2. Mở PowerShell trong `D:\Projects\English_Speaking_App` và chạy (thay `TEN_BAN` bằng tên GitHub):
   ```
   git init -b main
   git add .
   git commit -m "Nói Đi! bản đầu"
   git remote add origin https://github.com/TEN_BAN/noi-di.git
   git push -u origin main
   ```
   Lần đầu push sẽ hiện cửa sổ đăng nhập GitHub.
3. Trên GitHub: repo `noi-di` → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, thư mục `/ (root)` → Save. Đợi 1–2 phút.
4. Trên iPhone mở **Safari** → vào `https://TEN_BAN.github.io/noi-di/`
5. Bấm nút **Chia sẻ** → **Thêm vào MH chính**. Xong!

Lần đầu bấm micro, iPhone hỏi quyền micro và nhận diện giọng nói → chọn **Cho phép**.
Nếu khi mở từ màn hình chính mà máy không chấm điểm được, hãy mở bằng Safari (app sẽ nhắc).

Cập nhật bài mới sau này: sửa file → `git add . ; git commit -m "..." ; git push`. Nhớ tăng `VERSION` trong `sw.js`.

## 3. Chạy thử trên máy tính

```
python -m http.server 8765
```
Mở http://localhost:8765 bằng Chrome/Edge (Chrome có nhận diện giọng nói).

## 4. Nội dung & lộ trình A2 → B1

Mỗi bài: 6–7 câu khẩu ngữ, có phụ đề Việt, ký hiệu nối âm (‿) và chỗ ngắt hơi (/), lời nhắn của cô Mây; sau đó nhập vai 3–4 lượt.

| # | Cấp | Chủ đề | Trạng thái |
|---|---|---|---|
| 1 | A2 | Làm quen ở chỗ mới | ✅ |
| 2 | A2 | Gọi đồ uống, đồ ăn | ✅ |
| 3 | A2 | Small talk ở chỗ làm | ✅ |
| 4 | A2 | Hỏi đường & đi lại | sắp có |
| 5 | A2 | Mua sắm, hỏi giá, đổi size | sắp có |
| 6 | A2 | Sở thích & cuối tuần | sắp có |
| 7 | A2+ | Kể chuyện đã xảy ra | sắp có |
| 8 | A2+ | Rủ rê, hẹn giờ, đổi lịch | sắp có |
| 9 | A2+ | Gọi điện, đặt bàn, đặt lịch | sắp có |
| 10 | B1 | Nêu ý kiến, đồng ý/phản đối khéo | sắp có |
| 11 | B1 | Xử lý sự cố: phàn nàn, đổi trả | sắp có |
| 12 | B1 | Giới thiệu công việc, phỏng vấn | sắp có |

Thêm bài: chép một khối trong `lessons.js`, đổi `id`, rồi gắn `id` vào dòng tương ứng trong `ROADMAP`.

**Cách app kéo người lười nói**: mục tiêu nhỏ mỗi ngày (mặc định 20 câu), đếm số câu đã nói, chuỗi ngày liên tiếp, nút "⚡ Nói nhanh 3 phút" (6 câu, ưu tiên câu điểm thấp), câu mẫu tự phát khi sang câu mới để chỉ cần bấm micro.

## 5. AI hội thoại (tùy chọn, chưa làm)

Có thể thêm chế độ "nói chuyện tự do" với AI: app gửi câu bạn nói (dạng chữ) tới một mô hình AI nhỏ, AI trả lời ngắn ở mức A2 và sửa lỗi bằng tiếng Việt. Gửi chữ (không gửi âm thanh) rất rẻ – 15 phút/ngày với mô hình nhỏ thường chỉ vài USD/tháng, nằm trong ngân sách 20 USD. Khóa API sẽ do bạn nhập và chỉ lưu trên điện thoại. Tính năng này để tắt mặc định.

## 6. Cấu trúc file

- `index.html`, `styles.css` – giao diện
- `app.js` – các màn hình và lưu tiến độ (lưu trên điện thoại, không gửi đi đâu)
- `speech.js` – giọng đọc mẫu, nhận diện giọng nói, ghi âm, chấm điểm
- `lessons.js` – nội dung bài học + lộ trình
- `sw.js`, `manifest.webmanifest`, `icons/` – để cài lên màn hình chính và chạy offline
- `tools/make_icons.py` – tạo lại icon

## Thử thách 30 ngày (bản 2)

Mỗi ngày ~20–25 phút, mở app bấm **📅 Ngày N** rồi làm từ trên xuống:
1. **🔁 Ôn thẻ** – câu đã học được hẹn ôn lại theo lịch (nói tốt thì lâu mới ôn, nói dở thì ôn sớm).
2. **🎧 Luyện nghe** – 10 câu: nghe chọn nghĩa, nghe điền từ, nghe rồi chọn câu đáp. Có 🐢 chậm và ⚡ tốc độ thật.
3. **📘 Bài mới** (hoặc **🎭 ôn nhập vai** giấu câu mẫu).
4. **🗣 Nói tự do** 60–120 giây theo đề, máy đếm số từ, từ/phút và khung câu đã dùng. Ngày 1, 7, 14, 21, 28, 30 lưu bản thu để so với ngày 1.

16 bài A2 → B1, có 4 bài cho công việc ở nhà máy: hỏi lại khi nghe không kịp, họp giao ban báo tiến độ, báo sự cố trên chuyền, chỉ việc/giải thích quy trình.
Ngoài app: mỗi tuần nói chuyện thật với người 2–3 lần (đồng nghiệp, gia sư online), 15 phút cũng được.
