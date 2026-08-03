import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Trang chủ", href: "#" },
  { label: "Chương trình", href: "#programs" },
  { label: "Huấn luyện viên", href: "#trainers" },
  { label: "Bảng giá", href: "#membership" },
];

export default function MarketingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-base-100/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <span className="font-display text-2xl font-bold uppercase tracking-tight text-primary">
          Iron<span className="text-base-content">Gyms</span>
        </span>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-display text-sm uppercase tracking-wide text-base-content/70 transition-colors hover:text-base-content"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="btn btn-ghost btn-sm hidden md:inline-flex"
          >
            Đăng nhập
          </Link>
          <Link
            to="/register"
            className="btn btn-primary btn-sm hidden md:inline-flex"
          >
            Đăng ký
          </Link>
          <button
            className="btn btn-ghost btn-square btn-sm md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-base-300 bg-base-100 px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-2 font-display text-sm uppercase tracking-wide text-base-content/70"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex gap-3">
            <Link to="/login" className="btn btn-ghost btn-sm flex-1">
              Đăng nhập
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm flex-1">
              Đăng ký
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
