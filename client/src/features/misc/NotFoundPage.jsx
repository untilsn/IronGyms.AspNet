import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base-100 text-base-content">
      <h1 className="font-display text-6xl font-black text-primary">404</h1>
      <p className="text-base-content/60">Không tìm thấy trang bạn cần.</p>
      <Link to="/" className="btn btn-primary btn-sm">
        Về trang chủ
      </Link>
    </div>
  );
}
