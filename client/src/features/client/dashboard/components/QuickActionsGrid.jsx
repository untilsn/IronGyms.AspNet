import { Link } from "react-router-dom";
import { ScanLine, CalendarPlus, CreditCard, Receipt } from "lucide-react";

const actions = [
  {
    label: "Check-in ngay",
    desc: "Ghi nhận buổi tập",
    icon: ScanLine,
    to: "/dashboard/checkin",
  },
  {
    label: "Đặt lịch PT",
    desc: "Chọn HLV & giờ tập",
    icon: CalendarPlus,
    to: "/dashboard/schedule",
  },
  {
    label: "Gói tập",
    desc: "Xem hoặc gia hạn",
    icon: CreditCard,
    to: "/dashboard/membership",
  },
  {
    label: "Thanh toán",
    desc: "Lịch sử giao dịch",
    icon: Receipt,
    to: "/dashboard/payments",
  },
];

export default function QuickActionsGrid() {
  return (
    <div className="surface-card rounded-box p-6">
      <h3 className="font-display text-base-content/60 mb-4 text-sm font-bold tracking-widest uppercase">
        Thao tác nhanh
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {actions.map(({ label, desc, icon: Icon, to }) => (
          <Link
            key={to}
            to={to}
            className="rounded-field border-base-content/5 hover:border-primary/30 hover:bg-primary/5 flex flex-col items-center gap-2 border p-4 text-center transition-colors"
          >
            <span className="bg-primary/15 text-primary flex h-11 w-11 items-center justify-center rounded-full">
              <Icon size={20} />
            </span>
            <span className="text-base-content text-sm font-semibold">{label}</span>
            <span className="text-base-content/50 text-xs">{desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
