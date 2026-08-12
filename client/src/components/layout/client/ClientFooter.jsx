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
    <footer className=" w-full bg-base-300 px-6 pb-5 pt-10 md:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <div className="mb-4 font-display text-lg font-bold uppercase tracking-tight text-base-content">
            IronGyms
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-base-content/50">
            Nơi giao thoa giữa thẩm mỹ cao cấp và hiệu suất thể chất nguyên bản.
            Gia nhập cộng đồng elite.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <h5 className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-base-content">
              Điều hướng
            </h5>
            {footerNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-base-content/50 transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-base-content">
              Hỗ trợ
            </h5>
            {footerSupport.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-base-content/50 transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="mb-2 font-display text-xs font-bold uppercase tracking-widest text-base-content">
            Kết nối
          </h5>
          <div className="flex gap-6">
            {["Instagram", "YouTube", "TikTok"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm font-bold uppercase tracking-tight text-base-content/50 transition-colors hover:text-primary"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-base-content/10 pt-8">
        <p className="text-xs uppercase tracking-widest text-base-content/30">
          © 2026 IronGyms. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
