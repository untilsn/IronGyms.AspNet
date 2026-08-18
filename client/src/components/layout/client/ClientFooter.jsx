const footerNav = [
  { label: "Trang chủ", href: "#" },
  { label: "Chương trình", href: "#programs" },
  { label: "Huấn luyện viên", href: "#trainers" },
  { label: "Bảng giá", href: "#membership" },
];

const footerSupport = [
  { label: "Chính sách bảo mật", href: "#" },
  { label: "Điều khoản dịch vụ", href: "#" },
  { label: "Câu hỏi thường gặp", href: "#" },
];

export default function ClientFooter() {
  return (
    <footer className="bg-base-300 w-full px-6 pt-10 pb-5 md:px-10">
      <div className="container grid grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <div className="font-display text-base-content mb-4 text-lg font-bold tracking-tight uppercase">
            IronGyms
          </div>
          <p className="text-base-content/50 max-w-xs text-sm leading-relaxed">
            Nơi giao thoa giữa thẩm mỹ cao cấp và hiệu suất thể chất nguyên bản. Gia nhập cộng đồng
            elite.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <h5 className="font-display text-base-content mb-2 text-xs font-bold tracking-widest uppercase">
              Điều hướng
            </h5>
            {footerNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-base-content/50 hover:text-primary text-sm transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="font-display text-base-content mb-2 text-xs font-bold tracking-widest uppercase">
              Hỗ trợ
            </h5>
            {footerSupport.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-base-content/50 hover:text-primary text-sm transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="font-display text-base-content mb-2 text-xs font-bold tracking-widest uppercase">
            Kết nối
          </h5>
          <div className="flex gap-6">
            {["Instagram", "YouTube", "TikTok"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-base-content/50 hover:text-primary text-sm font-bold tracking-tight uppercase transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-base-content/10 mx-auto mt-16 max-w-7xl border-t pt-8">
        <p className="text-base-content/30 text-xs tracking-widest uppercase">
          © 2026 IronGyms. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
