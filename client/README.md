# IronGyms — Frontend (React + Tailwind, no TypeScript)

Frontend tách rời cho IronGyms, gọi vào ASP.NET Core 8 Web API (đổi sang PostgreSQL) qua JWT lưu trong HttpOnly cookie.

## Stack
- React 19 + Vite (JavaScript, không TypeScript)
- Tailwind CSS v4
- React Router v6
- TanStack Query (server state / caching)
- Zustand (client state: user info, sidebar collapse — có persist)
- Axios (withCredentials: true để gửi cookie JWT)
- React Hook Form + Zod (form & validation)
- Chart.js (qua react-chartjs-2)
- lucide-react (icon), react-hot-toast (toast)

## Chạy dự án

```bash
npm install
cp .env.example .env   # chỉnh VITE_API_URL trỏ đúng API
npm run dev
```

## Cấu trúc thư mục

```
src/
  api/            axiosClient + các file gọi API theo module (membersApi, checkinsApi, ...)
  components/
    layout/        Sidebar, Topbar, MainLayout
  features/        1 thư mục / module nghiệp vụ (auth, dashboard, members, trainers, checkins, plans, registrations, users)
  lib/             formatters.js (thay cho FormatHelper cũ)
  routes/          AppRoutes, ProtectedRoute
  store/           useAuthStore, useUiStore (zustand)
```

## Việc cần làm ở BACKEND để FE chạy được

1. **CORS**: cho phép origin của FE (vd `http://localhost:5173`) với `AllowCredentials()`, KHÔNG dùng `AllowAnyOrigin()` khi có credentials.

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});
// ...
app.UseCors("AllowFrontend");
```

2. **Cookie JWT**: đảm bảo cookie set với `SameSite=None; Secure` nếu FE/BE khác domain khi lên production (localhost dev có thể dùng `SameSite=Lax`).

3. Thêm endpoint `GET /auth/me` trả về thông tin user đã decode từ token (id, fullName, email, role) — FE dùng để hiển thị Topbar, không tự decode JWT ở client.

4. Các endpoint còn lại nên theo REST chuẩn để khớp với `createCrudApi.js`: `GET/POST /resource`, `GET/PUT/DELETE /resource/:id`.

## Module đã có sẵn khung
- **Dashboard**: stat cards + biểu đồ doanh thu (Chart.js), gọi `/dashboard/stats` và `/dashboard/revenue-chart`.
- **Members**: `MembersListPage.jsx` — dùng làm **pattern mẫu** để bạn tự dựng Trainers, Users theo đúng phong cách (bạn nói sẽ tự làm 3 module này).
- **CheckIns, Plans, Registrations, Users, Trainers**: đã có route + file `*Api.js` sẵn, trang UI mới là placeholder "Module đang được xây dựng" — bạn điền tiếp theo pattern của Members.

## Ghi chú quan trọng
- Validate số tiền thanh toán theo giá plan: nên viết chung 1 hàm `zod.refine()` trong schema của form Payment, đồng thời **validate lại ở Controller/Service phía backend** — client-side chỉ là UX, không phải bảo mật.
- Không dùng `localStorage` để lưu JWT — cookie HttpOnly vẫn là lựa chọn đúng, giữ nguyên như thiết kế cũ.
